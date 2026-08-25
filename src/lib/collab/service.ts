import type { RealtimeChannel, User } from '@supabase/supabase-js';
import { supabase } from '../supabase';
import type { VisitorProfile } from '../analytics/visitorProfile';
import {
  CHECKPOINT_AUTOSAVE_MS,
  MOVEMENT_BROADCAST_MS,
  SPEECH_DURATION_MS,
  WORLD_VERSION,
} from './constants';
import type {
  CharacterId,
  CollabContribution,
  CollabMessage,
  ContributionContent,
  ContributionStyle,
  ContributionType,
  Direction,
  PublicCollabVisitor,
  RemotePlayerState,
  WorldCheckpoint,
  WorldReaction,
  WorldSpeech,
} from './types';

const LOCAL_CHECKPOINT_KEY = 'portfolio_world_local_checkpoint';
const LOCAL_CONTRIBUTIONS_KEY = 'portfolio_collab_local_contributions';
const LOCAL_MESSAGES_KEY = 'portfolio_collab_local_messages';

type ContributionRow = {
  id: string;
  owner_id: string;
  owner_name: string;
  owner_avatar: string;
  type: ContributionType;
  content: ContributionContent;
  x: number;
  y: number;
  width: number;
  height: number;
  style: ContributionStyle;
  created_at: string;
  updated_at: string;
};

type MessageRow = {
  id: string;
  owner_id: string;
  owner_name: string;
  owner_avatar: string;
  message: string;
  created_at: string;
};

export function mapContribution(row: ContributionRow): CollabContribution {
  return {
    id: row.id,
    ownerId: row.owner_id,
    ownerName: row.owner_name,
    ownerAvatar: row.owner_avatar,
    type: row.type,
    content: row.content || {},
    x: Number(row.x),
    y: Number(row.y),
    width: Number(row.width),
    height: Number(row.height),
    style: row.style || {},
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function mapMessage(row: MessageRow): CollabMessage {
  return {
    id: row.id,
    ownerId: row.owner_id,
    ownerName: row.owner_name,
    ownerAvatar: row.owner_avatar,
    message: row.message,
    createdAt: row.created_at,
  };
}

function readLocal<T>(key: string): T[] {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
}

function writeLocal<T>(key: string, values: T[]) {
  try {
    localStorage.setItem(key, JSON.stringify(values));
  } catch {
    // Degraded storage fallback
  }
}

export async function ensureCollabUser(profile: VisitorProfile): Promise<User | null> {
  if (!supabase) return null;

  try {
    const sessionResult = await supabase.auth.getSession();
    if (sessionResult.data.session?.user) return sessionResult.data.session.user;

    const result = await supabase.auth.signInAnonymously({
      options: {
        data: {
          display_name: profile.displayName,
          avatar_url: profile.avatarUrl,
        },
      },
    });

    if (result.error) return null;
    return result.data.user;
  } catch {
    return null;
  }
}

// ── World Checkpoint & Resume System ─────────────────────────

export async function fetchWorldCheckpoint(visitorId?: string): Promise<WorldCheckpoint | null> {
  if (supabase) {
    try {
      const vid = visitorId || localStorage.getItem('janmark_portfolio_visitor_id') || undefined;
      if (vid) {
        const { data, error } = await supabase
          .from('world_checkpoints')
          .select('character_id,last_x,last_y,last_direction,last_building_id,world_version,updated_at')
          .eq('visitor_id', vid)
          .maybeSingle();

        if (!error && data && data.character_id) {
          const cp: WorldCheckpoint = {
            characterId: data.character_id as CharacterId,
            lastX: Number(data.last_x),
            lastY: Number(data.last_y),
            lastDirection: (data.last_direction as Direction) || 'down',
            lastBuildingId: data.last_building_id || null,
            worldVersion: data.world_version || WORLD_VERSION,
            updatedAt: data.updated_at,
          };
          try {
            localStorage.setItem(LOCAL_CHECKPOINT_KEY, JSON.stringify(cp));
          } catch {
            // ignore
          }
          return cp;
        }
      }
    } catch {
      // fallback to local
    }
  }

  try {
    const raw = localStorage.getItem(LOCAL_CHECKPOINT_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // ignore
  }

  return null;
}

let lastSavedCheckpointTime = 0;
let pendingCheckpoint: WorldCheckpoint | null = null;
let checkpointSaveTimer: ReturnType<typeof setTimeout> | null = null;

export async function saveWorldCheckpoint(
  checkpoint: WorldCheckpoint,
  immediate = false,
  visitorId?: string,
): Promise<boolean> {
  pendingCheckpoint = checkpoint;
  try {
    localStorage.setItem(LOCAL_CHECKPOINT_KEY, JSON.stringify(checkpoint));
  } catch {
    // ignore
  }

  const now = Date.now();
  if (!immediate && now - lastSavedCheckpointTime < CHECKPOINT_AUTOSAVE_MS) {
    if (!checkpointSaveTimer) {
      checkpointSaveTimer = setTimeout(() => {
        checkpointSaveTimer = null;
        if (pendingCheckpoint) {
          void saveWorldCheckpoint(pendingCheckpoint, true, visitorId);
        }
      }, CHECKPOINT_AUTOSAVE_MS - (now - lastSavedCheckpointTime));
    }
    return true;
  }

  lastSavedCheckpointTime = now;
  if (checkpointSaveTimer) {
    clearTimeout(checkpointSaveTimer);
    checkpointSaveTimer = null;
  }

  if (supabase) {
    try {
      const vid = visitorId || localStorage.getItem('janmark_portfolio_visitor_id') || undefined;
      if (vid) {
        const { error } = await supabase
          .from('world_checkpoints')
          .upsert({
            visitor_id: vid,
            character_id: checkpoint.characterId,
            last_x: checkpoint.lastX,
            last_y: checkpoint.lastY,
            last_direction: checkpoint.lastDirection,
            last_building_id: checkpoint.lastBuildingId || null,
            world_version: checkpoint.worldVersion || WORLD_VERSION,
            updated_at: new Date().toISOString(),
          }, { onConflict: 'visitor_id' });
        return !error;
      }
    } catch {
      return false;
    }
  }

  return true;
}

export function resetVisitorSession(): void {
  try {
    localStorage.removeItem('portfolio_anonymous_visitor_id');
    localStorage.removeItem('portfolio_anonymous_visitor_profile');
    localStorage.removeItem(LOCAL_CHECKPOINT_KEY);
    localStorage.removeItem('portfolio_visit_recorded');
  } catch {
    // ignore
  }
}

// ── Realtime Spatial Multiplayer Channel ───────────────────────

export function sanitizeUserText(input: string, maxLength = 140): string {
  if (!input || typeof input !== 'string') return '';
  return input
    .replace(/<[^>]*>?/gm, '') // Strip HTML markup
    .replace(/javascript:/gi, '') // Strip script execution scheme
    .replace(/on\w+=/gi, '') // Strip inline event attributes
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // Strip non-printable control characters
    .trim()
    .slice(0, maxLength);
}

export function isValidCoordinate(n: unknown, min: number, max: number): boolean {
  return typeof n === 'number' && Number.isFinite(n) && n >= min && n <= max;
}

export type MultiplayerCallbacks = {
  onRemoteMove: (remote: RemotePlayerState) => void;
  onRemoteLeave: (visitorId: string) => void;
  onRemoteReaction: (reaction: WorldReaction) => void;
  onRemoteSpeech: (speech: WorldSpeech) => void;
  onPresenceSync: (visitors: PublicCollabVisitor[]) => void;
};

export class SpatialMultiplayerClient {
  private channel: RealtimeChannel | null = null;
  private localVisitor: PublicCollabVisitor | null = null;
  private sequence = 0;
  private lastBroadcast = 0;
  private lastSpeechBroadcast = 0;
  private lastReactionBroadcast = 0;
  private callbacks: MultiplayerCallbacks;

  private isSubscribed = false;

  constructor(callbacks: MultiplayerCallbacks) {
    this.callbacks = callbacks;
  }

  public join(visitor: PublicCollabVisitor): boolean {
    if (!supabase) return false;
    this.localVisitor = {
      ...visitor,
      name: sanitizeUserText(visitor.name, 32) || 'Visitor',
    };
    this.isSubscribed = false;

    const channel = supabase.channel('portfolio-world-spatial', {
      config: {
        presence: { key: visitor.visitorId },
      },
    });

    channel
      .on('presence', { event: 'sync' }, () => {
        const presenceState = channel.presenceState();
        const active: PublicCollabVisitor[] = [];
        for (const key of Object.keys(presenceState)) {
          const metas = presenceState[key];
          if (metas && metas[0]) {
            const raw = metas[0] as unknown as PublicCollabVisitor;
            if (raw && typeof raw.visitorId === 'string') {
              active.push({
                ...raw,
                name: sanitizeUserText(raw.name, 32) || 'Visitor',
              });
            }
          }
        }
        this.callbacks.onPresenceSync(active);
      })
      .on('presence', { event: 'leave' }, ({ leftPresences }) => {
        for (const p of leftPresences) {
          const v = p as unknown as PublicCollabVisitor;
          if (v?.visitorId && typeof v.visitorId === 'string') {
            this.callbacks.onRemoteLeave(v.visitorId);
          }
        }
      })
      .on('broadcast', { event: 'player_move' }, ({ payload }) => {
        const state = payload as RemotePlayerState;
        if (
          state &&
          typeof state.visitorId === 'string' &&
          state.visitorId !== this.localVisitor?.visitorId &&
          isValidCoordinate(state.x, -200, 3000) &&
          isValidCoordinate(state.y, -200, 2000)
        ) {
          this.callbacks.onRemoteMove({
            ...state,
            name: sanitizeUserText(state.name, 32) || 'Visitor',
          });
        }
      })
      .on('broadcast', { event: 'player_reaction' }, ({ payload }) => {
        const reaction = payload as WorldReaction;
        const validTypes = ['wave', 'heart', 'sparkle'];
        if (
          reaction &&
          typeof reaction.visitorId === 'string' &&
          reaction.visitorId !== this.localVisitor?.visitorId &&
          validTypes.includes(reaction.type)
        ) {
          this.callbacks.onRemoteReaction(reaction);
        }
      })
      .on('broadcast', { event: 'player_speech' }, ({ payload }) => {
        const speech = payload as WorldSpeech;
        if (
          speech &&
          typeof speech.visitorId === 'string' &&
          speech.visitorId !== this.localVisitor?.visitorId &&
          typeof speech.text === 'string'
        ) {
          const safeText = sanitizeUserText(speech.text, 90);
          if (safeText) {
            this.callbacks.onRemoteSpeech({
              ...speech,
              text: safeText,
            });
          }
        }
      })
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED' && this.localVisitor) {
          this.isSubscribed = true;
          try {
            await channel.track(this.localVisitor);
          } catch {
            // ignore
          }
        } else if (status === 'CLOSED' || status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
          this.isSubscribed = false;
        }
      });

    this.channel = channel;
    return true;
  }

  public broadcastMovement(
    x: number,
    y: number,
    direction: Direction,
    moving: boolean,
    force = false,
  ): void {
    if (!this.channel || !this.localVisitor || !this.isSubscribed) return;
    if (this.channel.state !== 'joined') return;
    if (!isValidCoordinate(x, -200, 3000) || !isValidCoordinate(y, -200, 2000)) return;

    const now = Date.now();
    if (!force && now - this.lastBroadcast < MOVEMENT_BROADCAST_MS) return;

    this.lastBroadcast = now;
    this.sequence++;

    const payload: RemotePlayerState = {
      ...this.localVisitor,
      x: Math.round(x * 10) / 10,
      y: Math.round(y * 10) / 10,
      direction,
      moving,
      sequence: this.sequence,
      timestamp: now,
    };

    try {
      void this.channel.send({
        type: 'broadcast',
        event: 'player_move',
        payload,
      });
    } catch {
      // ignore
    }
  }

  public broadcastReaction(type: 'wave' | 'heart' | 'sparkle' = 'wave'): void {
    if (!this.channel || !this.localVisitor || !this.isSubscribed) return;
    if (this.channel.state !== 'joined') return;
    const now = Date.now();
    // Rate limit reaction spam (max 1 per 350ms)
    if (now - this.lastReactionBroadcast < 350) return;
    this.lastReactionBroadcast = now;

    const payload: WorldReaction = {
      visitorId: this.localVisitor.visitorId,
      type,
      timestamp: now,
    };
    try {
      void this.channel.send({
        type: 'broadcast',
        event: 'player_reaction',
        payload,
      });
    } catch {
      // ignore
    }
  }

  public broadcastSpeech(text: string): void {
    if (!this.channel || !this.localVisitor || !this.isSubscribed) return;
    if (this.channel.state !== 'joined') return;
    const clean = sanitizeUserText(text, 90);
    if (!clean) return;

    const now = Date.now();
    // Rate limit speech spam (max 1 per 500ms)
    if (now - this.lastSpeechBroadcast < 500) return;
    this.lastSpeechBroadcast = now;

    const payload: WorldSpeech = {
      visitorId: this.localVisitor.visitorId,
      text: clean,
      timestamp: now,
      expiresAt: now + SPEECH_DURATION_MS,
    };

    try {
      void this.channel.send({
        type: 'broadcast',
        event: 'player_speech',
        payload,
      });
    } catch {
      // ignore
    }
  }

  public leave(): void {
    this.isSubscribed = false;
    if (this.channel) {
      void this.channel.untrack().catch(() => {});
      void this.channel.unsubscribe().catch(() => {});
      this.channel = null;
    }
  }
}

// ── Collab Contributions & Messages ──────────────────────────

export async function fetchContributions(): Promise<CollabContribution[]> {
  if (!supabase) return readLocal<CollabContribution>(LOCAL_CONTRIBUTIONS_KEY);
  const { data, error } = await supabase
    .from('collab_contributions')
    .select('id,owner_id,owner_name,owner_avatar,type,content,x,y,width,height,style,created_at,updated_at')
    .eq('is_hidden', false)
    .order('created_at', { ascending: true })
    .limit(300);

  if (error) return readLocal<CollabContribution>(LOCAL_CONTRIBUTIONS_KEY);
  return (data as ContributionRow[]).map(mapContribution);
}

export async function createContribution(
  ownerId: string,
  ownerName: string,
  ownerAvatar: string,
  input: {
    type: ContributionType;
    content: ContributionContent;
    x: number;
    y: number;
    width: number;
    height: number;
    style: ContributionStyle;
  },
): Promise<CollabContribution> {
  const safeOwnerName = sanitizeUserText(ownerName, 48) || 'Visitor';
  let safeContent = input.content;
  if ((input.type === 'text' || input.type === 'note') && input.content.text) {
    safeContent = {
      ...input.content,
      text: sanitizeUserText(input.content.text, 250),
    };
  }

  if (supabase) {
    try {
      // 1. Try RPC
      const rpcResult = await supabase.rpc('create_collab_contribution', {
        p_type: input.type,
        p_content: safeContent,
        p_x: input.x,
        p_y: input.y,
        p_width: input.width,
        p_height: input.height,
        p_style: input.style,
        p_owner_name: safeOwnerName,
        p_owner_avatar: ownerAvatar,
        p_owner_id: ownerId,
      });
      if (!rpcResult.error && rpcResult.data) {
        return mapContribution(rpcResult.data as ContributionRow);
      }

      // 2. Direct table insert fallback
      const tableResult = await supabase
        .from('collab_contributions')
        .insert({
          owner_id: ownerId,
          owner_name: ownerName,
          owner_avatar: ownerAvatar,
          type: input.type,
          content: input.content,
          x: input.x,
          y: input.y,
          width: input.width,
          height: input.height,
          style: input.style,
        })
        .select()
        .single();

      if (!tableResult.error && tableResult.data) {
        return mapContribution(tableResult.data as ContributionRow);
      }

      if (tableResult.error) {
        console.warn('[Collab Live Contribution Error]', tableResult.error);
      }
    } catch (err) {
      console.warn('[Collab Live Sync Failed]', err);
    }
  }

  const now = new Date().toISOString();
  const local: CollabContribution = {
    id: `local-${crypto.randomUUID()}`,
    ownerId,
    ownerName,
    ownerAvatar,
    ...input,
    createdAt: now,
    updatedAt: now,
    isLocal: true,
  };
  const values = [...readLocal<CollabContribution>(LOCAL_CONTRIBUTIONS_KEY), local].slice(-80);
  writeLocal(LOCAL_CONTRIBUTIONS_KEY, values);
  return local;
}

export async function updateContribution(
  contribution: CollabContribution,
  patch: { content?: ContributionContent; x?: number; y?: number },
): Promise<CollabContribution> {
  if (supabase && !contribution.isLocal) {
    try {
      const { data, error } = await supabase
        .from('collab_contributions')
        .update({
          content: patch.content ?? contribution.content,
          x: patch.x ?? contribution.x,
          y: patch.y ?? contribution.y,
          updated_at: new Date().toISOString(),
        })
        .eq('id', contribution.id)
        .select()
        .single();
      if (!error && data) return mapContribution(data as ContributionRow);
    } catch {
      // fallback
    }
  }

  const updated = { ...contribution, ...patch, updatedAt: new Date().toISOString(), isLocal: true };
  writeLocal(
    LOCAL_CONTRIBUTIONS_KEY,
    readLocal<CollabContribution>(LOCAL_CONTRIBUTIONS_KEY).map((item) =>
      item.id === updated.id ? updated : item,
    ),
  );
  return updated;
}

export async function deleteContribution(contribution: CollabContribution): Promise<boolean> {
  if (supabase && !contribution.isLocal) {
    try {
      const { error } = await supabase
        .from('collab_contributions')
        .delete()
        .eq('id', contribution.id);
      if (!error) return true;
    } catch {
      // fallback
    }
  }
  writeLocal(
    LOCAL_CONTRIBUTIONS_KEY,
    readLocal<CollabContribution>(LOCAL_CONTRIBUTIONS_KEY).filter(
      (item) => item.id !== contribution.id,
    ),
  );
  return true;
}

export async function fetchMessages(): Promise<CollabMessage[]> {
  if (!supabase) return readLocal<CollabMessage>(LOCAL_MESSAGES_KEY);
  const { data, error } = await supabase
    .from('collab_messages')
    .select('id,owner_id,owner_name,owner_avatar,message,created_at')
    .eq('is_hidden', false)
    .order('created_at', { ascending: false })
    .limit(24);
  if (error) return readLocal<CollabMessage>(LOCAL_MESSAGES_KEY);
  return (data as MessageRow[]).map(mapMessage);
}

export async function createMessage(
  ownerId: string,
  ownerName: string,
  ownerAvatar: string,
  message: string,
): Promise<CollabMessage> {
  const safeOwnerName = sanitizeUserText(ownerName, 48) || 'Visitor';
  const safeMessage = sanitizeUserText(message, 180);

  if (supabase) {
    try {
      // 1. Try RPC
      const rpcResult = await supabase.rpc('create_collab_message', {
        p_message: safeMessage,
        p_owner_name: safeOwnerName,
        p_owner_avatar: ownerAvatar,
        p_owner_id: ownerId,
      });
      if (!rpcResult.error && rpcResult.data) {
        return mapMessage(rpcResult.data as MessageRow);
      }

      // 2. Direct table insert fallback
      const tableResult = await supabase
        .from('collab_messages')
        .insert({
          owner_id: ownerId,
          owner_name: safeOwnerName,
          owner_avatar: ownerAvatar,
          message: safeMessage,
        })
        .select()
        .single();

      if (!tableResult.error && tableResult.data) {
        return mapMessage(tableResult.data as MessageRow);
      }

      if (tableResult.error) {
        console.warn('[Collab Live Message Error]', tableResult.error);
      }
    } catch (err) {
      console.warn('[Collab Live Sync Failed]', err);
    }
  }

  const local: CollabMessage = {
    id: `local-${crypto.randomUUID()}`,
    ownerId,
    ownerName,
    ownerAvatar,
    message,
    createdAt: new Date().toISOString(),
    isLocal: true,
  };
  writeLocal(
    LOCAL_MESSAGES_KEY,
    [local, ...readLocal<CollabMessage>(LOCAL_MESSAGES_KEY)].slice(0, 24),
  );
  return local;
}

export async function reportItem(kind: 'contribution' | 'message', id: string): Promise<boolean> {
  if (!supabase || id.startsWith('local-')) return false;
  const { error } = await supabase.rpc('report_collab_item', {
    p_item_type: kind,
    p_item_id: id,
    p_reason: 'inappropriate',
  });
  return !error;
}

export function subscribeToContributions(
  onInsert: (contribution: CollabContribution) => void,
  onUpdate: (contribution: CollabContribution) => void,
  onDelete: (id: string) => void,
): RealtimeChannel | null {
  if (!supabase) return null;
  return supabase
    .channel('portfolio-collab-content')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'collab_contributions' },
      (payload) => onInsert(mapContribution(payload.new as ContributionRow)),
    )
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'collab_contributions' },
      (payload) => {
        const row = payload.new as ContributionRow & { is_hidden?: boolean };
        if (row.is_hidden) onDelete(row.id);
        else onUpdate(mapContribution(row));
      },
    )
    .on(
      'postgres_changes',
      { event: 'DELETE', schema: 'public', table: 'collab_contributions' },
      (payload) => onDelete((payload.old as { id: string }).id),
    )
    .subscribe();
}

export function subscribeToMessages(
  onInsert: (message: CollabMessage) => void,
  onUpdate: (message: CollabMessage | null, id: string) => void,
): RealtimeChannel | null {
  if (!supabase) return null;
  return supabase
    .channel('portfolio-collab-messages')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'collab_messages' },
      (payload) => onInsert(mapMessage(payload.new as MessageRow)),
    )
    .on(
      'postgres_changes',
      { event: 'UPDATE', schema: 'public', table: 'collab_messages' },
      (payload) => {
        const row = payload.new as MessageRow & { is_hidden?: boolean };
        onUpdate(row.is_hidden ? null : mapMessage(row), row.id);
      },
    )
    .on(
      'postgres_changes',
      { event: 'DELETE', schema: 'public', table: 'collab_messages' },
      (payload) => {
        const id = (payload.old as { id: string }).id;
        onUpdate(null, id);
      },
    )
    .subscribe();
}
