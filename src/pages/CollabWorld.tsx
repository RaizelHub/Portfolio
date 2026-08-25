import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import {
  ArrowLeft,
  Compass,
  DoorOpen,
  MessageCircle,
  MoreVertical,
  RotateCcw,
  Sparkles,
  User,
  Users,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { CharacterSelect } from '../components/collab/CharacterSelect';
import { CollabCanvas } from '../components/collab/CollabCanvas';
import { VisitorWallOverlay } from '../components/collab/VisitorWallOverlay';
import { ProjectCartGuide } from '../components/collab/ProjectCartGuide';
import { BudgetBeggarModal } from '../components/collab/BudgetBeggarModal';
import { HobbiesModal } from '../components/collab/HobbiesModal';
import { WorldRadar } from '../components/collab/WorldRadar';
import { WorldTerminalModal } from '../components/collab/WorldTerminalModal';
import { EmoteWheel } from '../components/collab/EmoteWheel';
import { VisitorAvatar } from '../components/ui/VisitorAvatar';
import { useSound } from '../context/SoundContext';
import { getOrCreateLocalVisitorProfile } from '../lib/analytics/visitorProfile';
import {
  getBuildingEntranceSpawn,
  isPositionSafe,
  MAX_SPEECH_LENGTH,
  SPAWN_POINT,
  WORLD_VERSION,
} from '../lib/collab/constants';
import {
  PhaserWorldContainer,
  type PhaserWorldHandle,
} from '../lib/collab/phaser/PhaserWorldContainer';
import {
  ensureCollabUser,
  fetchWorldCheckpoint,
  resetVisitorSession,
  sanitizeUserText,
  saveWorldCheckpoint,
  SpatialMultiplayerClient,
} from '../lib/collab/service';
import type {
  CharacterId,
  Direction,
  PublicCollabVisitor,
  QuickAccessItem,
  RemotePlayerState,
  WorldReaction,
  WorldSpeech,
} from '../lib/collab/types';
import type { Project } from '../types';
import { worldBuildings, type WorldBuilding } from '../lib/collab/worldConfig';
import './CollabWorld.css';

const quickAccessItems: QuickAccessItem[] = [
  { id: 'qa-subora', label: 'Subora (Mobile Product)', category: 'Project', buildingId: 'subora-building' },
  { id: 'qa-vocara', label: 'Vocara (Mobile AI)', category: 'Project', buildingId: 'vocara-building' },
  { id: 'qa-smartpipe', label: 'Smart Pipe (IoT)', category: 'Project', buildingId: 'smart-pipe-building' },
  { id: 'qa-collab', label: 'Collab HQ (Shared Space)', category: 'Community', buildingId: 'collab-hq' },
  { id: 'qa-web', label: 'Web & Desktop Studio', category: 'Collection', buildingId: 'web-desktop-studio' },
  { id: 'qa-automation', label: 'Automation Lab', category: 'Collection', buildingId: 'automation-lab' },
  { id: 'qa-dev', label: 'Developer Studio (About & Resume)', category: 'Profile', buildingId: 'developer-studio' },
];

export default function CollabWorld() {
  const navigate = useNavigate();
  const {
    soundEnabled,
    toggleSound,
    playClick,
    playHover,
    playDoorSlide,
    playEmoteChime,
    playTeleportChime,
    playFootstep,
  } = useSound();
  const visitorProfile = useMemo(() => getOrCreateLocalVisitorProfile(), []);

  const [characterId, setCharacterId] = useState<CharacterId | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [spawnCoords, setSpawnCoords] = useState<{ x: number; y: number; direction: Direction }>({
    x: SPAWN_POINT.x,
    y: SPAWN_POINT.y,
    direction: 'down',
  });

  // Player position state for Radar
  const [playerCoords, setPlayerCoords] = useState({ x: SPAWN_POINT.x, y: SPAWN_POINT.y });

  // Spatial Proximity States
  const [activeBuildingNear, setActiveBuildingNear] = useState<WorldBuilding | null>(null);
  const [insideBuilding, setInsideBuilding] = useState<WorldBuilding | null>(null);
  const [activeProjectBranchNear, setActiveProjectBranchNear] = useState<{ project: Project; isWIP: boolean } | null>(null);
  const [isNearExitDoorway, setIsNearExitDoorway] = useState(false);
  const [isNearBudgetBeggar, setIsNearBudgetBeggar] = useState(false);
  const [isNearBasketball, setIsNearBasketball] = useState(false);
  const [isNearGamingLounge, setIsNearGamingLounge] = useState(false);

  // Modals & Overlays
  const [openedProjectModal, setOpenedProjectModal] = useState<{ project: Project; isWIP: boolean } | null>(null);
  const [isBudgetBeggarOpen, setIsBudgetBeggarOpen] = useState(false);
  const [openedHobbiesModal, setOpenedHobbiesModal] = useState<'basketball' | 'gaming' | null>(null);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isEmoteWheelOpen, setIsEmoteWheelOpen] = useState(false);
  const [isCanvasOpen, setIsCanvasOpen] = useState(false);
  const [isVisitorWallOpen, setIsVisitorWallOpen] = useState(false);
  const [isEscMenuOpen, setIsEscMenuOpen] = useState(false);
  const [isQuickAccessOpen, setIsQuickAccessOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  const [welcomeToast, setWelcomeToast] = useState<string | null>(null);
  const [activeVisitors, setActiveVisitors] = useState<PublicCollabVisitor[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showControlsHint, setShowControlsHint] = useState(true);

  const phaserRef = useRef<PhaserWorldHandle | null>(null);
  const multiplayerRef = useRef<SpatialMultiplayerClient | null>(null);
  const lastChatTimeRef = useRef(0);
  const lastReactionTimeRef = useRef(0);
  const currentPosRef = useRef<{ x: number; y: number; direction: Direction }>({
    x: SPAWN_POINT.x,
    y: SPAWN_POINT.y,
    direction: 'down',
  });

  // 1. Initialize anonymous auth session, checkpoint & visitor state
  useEffect(() => {
    let mounted = true;

    async function initSession() {
      await ensureCollabUser(visitorProfile);
      const checkpoint = await fetchWorldCheckpoint(visitorProfile.anonymousId);

      if (!mounted) return;

      if (checkpoint && checkpoint.characterId) {
        setCharacterId(checkpoint.characterId);

        let sx = checkpoint.lastX;
        let sy = checkpoint.lastY;
        const dir = checkpoint.lastDirection || 'down';

        // Safe resume: If was inside a building, spawn outside its doorway
        if (checkpoint.lastBuildingId) {
          const doorSpawn = getBuildingEntranceSpawn(checkpoint.lastBuildingId);
          sx = doorSpawn.x;
          sy = doorSpawn.y;
        } else if (!isPositionSafe(sx, sy)) {
          sx = SPAWN_POINT.x;
          sy = SPAWN_POINT.y;
        }

        setSpawnCoords({ x: sx, y: sy, direction: dir });
        setPlayerCoords({ x: sx, y: sy });
        currentPosRef.current = { x: sx, y: sy, direction: dir };

        setWelcomeToast(`Welcome back, ${visitorProfile.displayName}.`);
        setTimeout(() => {
          if (mounted) setWelcomeToast(null);
        }, 2400);
      }

      setInitialLoading(false);
    }

    void initSession();

    return () => {
      mounted = false;
    };
  }, [visitorProfile]);

  // 2. Connect to Spatial Multiplayer Channel
  useEffect(() => {
    if (!characterId || initialLoading) return;

    const publicVisitor: PublicCollabVisitor = {
      visitorId: visitorProfile.anonymousId,
      name: visitorProfile.displayName,
      avatar: visitorProfile.avatarUrl,
      characterId,
      joinedAt: Date.now(),
    };

    const client = new SpatialMultiplayerClient({
      onRemoteMove: (remote: RemotePlayerState) => {
        phaserRef.current?.handleRemoteMove(remote);
      },
      onRemoteLeave: (visitorId: string) => {
        phaserRef.current?.removeRemotePlayer(visitorId);
      },
      onRemoteReaction: (reaction: WorldReaction) => {
        playEmoteChime();
        phaserRef.current?.showRemoteReaction(reaction);
      },
      onRemoteSpeech: (speech: WorldSpeech) => {
        phaserRef.current?.showRemoteSpeech(speech);
      },
      onPresenceSync: (visitors: PublicCollabVisitor[]) => {
        setActiveVisitors(visitors);
      },
    });

    client.join(publicVisitor);
    multiplayerRef.current = client;

    return () => {
      client.leave();
      multiplayerRef.current = null;
    };
  }, [characterId, initialLoading, visitorProfile]);

  // 3. Global Keyboard Shortcuts (E = Enter building/cart, Q = Emotes, T = CLI Terminal, ESC = Menu)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === 'Escape') {
        if (openedProjectModal) {
          setOpenedProjectModal(null);
        } else if (isBudgetBeggarOpen) {
          setIsBudgetBeggarOpen(false);
        } else if (isTerminalOpen) {
          setIsTerminalOpen(false);
        } else if (isEmoteWheelOpen) {
          setIsEmoteWheelOpen(false);
        } else if (isCanvasOpen) {
          setIsCanvasOpen(false);
        } else if (isVisitorWallOpen) {
          setIsVisitorWallOpen(false);
        } else if (isQuickAccessOpen) {
          setIsQuickAccessOpen(false);
        } else {
          setIsEscMenuOpen((prev) => !prev);
        }
      } else if (e.key === 'e' || e.key === 'E') {
        if (openedProjectModal || isBudgetBeggarOpen || isTerminalOpen || isEmoteWheelOpen || isCanvasOpen || isVisitorWallOpen) return;

        // Inside building near a project branch cart
        if (insideBuilding && activeProjectBranchNear) {
          e.preventDefault();
          playClick();
          setOpenedProjectModal(activeProjectBranchNear);
        }
        // Inside building near exit doorway
        else if (insideBuilding && isNearExitDoorway) {
          e.preventDefault();
          handleExitToCampus();
        }
        // Outside near budget beggar developer easter egg
        else if (!insideBuilding && isNearBudgetBeggar) {
          e.preventDefault();
          playClick();
          setIsBudgetBeggarOpen(true);
        }
        // Outside near basketball court
        else if (!insideBuilding && isNearBasketball) {
          e.preventDefault();
          playClick();
          setOpenedHobbiesModal('basketball');
        }
        // Outside near gaming lounge
        else if (!insideBuilding && isNearGamingLounge) {
          e.preventDefault();
          playClick();
          setOpenedHobbiesModal('gaming');
        }
        // Outside near a building doorway
        else if (!insideBuilding && activeBuildingNear) {
          e.preventDefault();
          handleEnterBuilding(activeBuildingNear);
        }
      } else if (e.key === 'q' || e.key === 'Q') {
        if (openedProjectModal || isTerminalOpen || isCanvasOpen || isVisitorWallOpen) return;
        e.preventDefault();
        playClick();
        setIsEmoteWheelOpen((prev) => !prev);
      } else if (e.key === 't' || e.key === 'T') {
        if (openedProjectModal || isCanvasOpen || isVisitorWallOpen) return;
        e.preventDefault();
        playClick();
        setIsTerminalOpen((prev) => !prev);
      } else if (e.key === '1') {
        e.preventDefault();
        handleSendReaction('wave');
      } else if (e.key === '2') {
        e.preventDefault();
        handleSendReaction('sparkle');
      } else if (e.key === '3') {
        e.preventDefault();
        handleSendReaction('heart');
      } else if (e.key === 'Enter') {
        if (openedProjectModal || isTerminalOpen || isCanvasOpen || isVisitorWallOpen) return;
        e.preventDefault();
        setIsChatOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  // 4. Autosave on visibility change or page exit
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && characterId) {
        const pos = currentPosRef.current;
        void saveWorldCheckpoint(
          {
            characterId,
            lastX: pos.x,
            lastY: pos.y,
            lastDirection: pos.direction,
            lastBuildingId: insideBuilding?.id || null,
            worldVersion: WORLD_VERSION,
          },
          true,
          visitorProfile.anonymousId,
        );
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [characterId, insideBuilding, visitorProfile.anonymousId]);

  // ── Callbacks from Phaser Scene ──

  const handlePlayerMoved = useCallback((x: number, y: number, direction: Direction, moving: boolean) => {
    currentPosRef.current = { x, y, direction };
    setPlayerCoords({ x, y });
    if (showControlsHint && moving) {
      setShowControlsHint(false);
    }
    multiplayerRef.current?.broadcastMovement(x, y, direction, moving);
  }, [showControlsHint]);

  const handleCheckpointTrigger = useCallback((x: number, y: number, direction: Direction) => {
    if (!characterId) return;
    void saveWorldCheckpoint(
      {
        characterId,
        lastX: x,
        lastY: y,
        lastDirection: direction,
        lastBuildingId: insideBuilding?.id || null,
        worldVersion: WORLD_VERSION,
      },
      false,
      visitorProfile.anonymousId,
    );
  }, [characterId, insideBuilding, visitorProfile.anonymousId]);

  const handleBuildingProximity = useCallback((building: WorldBuilding | null) => {
    setActiveBuildingNear(building);
  }, []);

  const handleProjectBranchProximity = useCallback((data: { project: Project; isWIP: boolean } | null) => {
    setActiveProjectBranchNear(data);
  }, []);

  const handleExitDoorwayProximity = useCallback((nearExit: boolean) => {
    setIsNearExitDoorway(nearExit);
  }, []);

  const handleBudgetBeggarProximity = useCallback((nearBeggar: boolean) => {
    setIsNearBudgetBeggar(nearBeggar);
  }, []);

  const handleBasketballProximity = useCallback((near: boolean) => {
    setIsNearBasketball(near);
  }, []);

  const handleGamingLoungeProximity = useCallback((near: boolean) => {
    setIsNearGamingLounge(near);
  }, []);

  // ── User Actions ──

  const handleCharacterChosen = async (selected: CharacterId) => {
    playClick();
    setCharacterId(selected);
    phaserRef.current?.setCharacter(selected);

    const pos = currentPosRef.current;
    await saveWorldCheckpoint(
      {
        characterId: selected,
        lastX: pos.x,
        lastY: pos.y,
        lastDirection: pos.direction,
        worldVersion: WORLD_VERSION,
      },
      true,
      visitorProfile.anonymousId,
    );
  };

  const handleEnterBuilding = (building: WorldBuilding) => {
    playDoorSlide();
    setInsideBuilding(building);
    phaserRef.current?.enterBuilding(building);

    if (characterId) {
      void saveWorldCheckpoint(
        {
          characterId,
          lastX: currentPosRef.current.x,
          lastY: currentPosRef.current.y,
          lastDirection: currentPosRef.current.direction,
          lastBuildingId: building.id,
          worldVersion: WORLD_VERSION,
        },
        false,
        visitorProfile.anonymousId,
      );
    }
  };

  const handleExitToCampus = () => {
    playDoorSlide();
    setInsideBuilding(null);
    setActiveProjectBranchNear(null);
    setOpenedProjectModal(null);
    phaserRef.current?.exitToCampus();
  };

  const handleSendReaction = (type: 'wave' | 'heart' | 'sparkle') => {
    const now = Date.now();
    if (now - lastReactionTimeRef.current < 350) return;
    lastReactionTimeRef.current = now;

    playEmoteChime();
    phaserRef.current?.showLocalReaction(type);
    multiplayerRef.current?.broadcastReaction(type);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    const now = Date.now();
    if (now - lastChatTimeRef.current < 500) return;
    lastChatTimeRef.current = now;

    const clean = sanitizeUserText(chatInput, MAX_SPEECH_LENGTH);
    if (!clean) return;

    phaserRef.current?.showLocalSpeech(clean);
    multiplayerRef.current?.broadcastSpeech(clean);
    setChatInput('');
    setIsChatOpen(false);
  };

  const handleQuickAccessSelect = (item: QuickAccessItem) => {
    playTeleportChime();
    setIsQuickAccessOpen(false);

    if (item.buildingId) {
      const b = worldBuildings.find((building) => building.id === item.buildingId);
      if (b) handleEnterBuilding(b);
    }
  };

  const handleResetVisitor = () => {
    resetVisitorSession();
    window.location.reload();
  };

  if (initialLoading) {
    return (
      <div className="collab-shell flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-3">
          <div className="h-6 w-6 animate-spin border-2 border-black border-t-transparent rounded-full" />
          <span className="font-mono text-xs text-black font-bold tracking-wider uppercase">Loading Campus World…</span>
        </div>
      </div>
    );
  }

  return (
    <div className="collab-shell">
      {/* 1. First Visit Character Selection Modal */}
      {!characterId && (
        <CharacterSelect
          visitorName={visitorProfile.displayName}
          onContinue={handleCharacterChosen}
        />
      )}

      {/* 2. Top Navigation Bar */}
      <header className="collab-topbar">
        <div className="flex items-center gap-2.5">
          {insideBuilding ? (
            <button
              type="button"
              onClick={handleExitToCampus}
              className="flex items-center gap-1.5 border border-black bg-white px-3 py-1.5 text-xs font-mono font-bold uppercase text-black hover:bg-black hover:text-white transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Exit to Campus</span>
            </button>
          ) : (
            <Link
              to="/"
              onClick={playClick}
              onMouseEnter={playHover}
              className="collab-exit group"
              aria-label="Return to portfolio"
            >
              <ArrowLeft className="transition-transform group-hover:-translate-x-1" />
              <span>Portfolio</span>
            </Link>
          )}

          <div className="hidden sm:flex items-center gap-1.5 border border-black bg-black px-2.5 py-1 text-[10px] font-mono font-bold uppercase text-white">
            <span>{insideBuilding ? `🏛️ ${insideBuilding.label}` : '📍 Campus Plaza'}</span>
          </div>

          <button
            type="button"
            onClick={() => {
              playClick();
              setIsQuickAccessOpen(true);
            }}
            onMouseEnter={playHover}
            className="hidden sm:flex items-center gap-1.5 border border-black bg-white px-2.5 py-1 text-[10px] font-mono text-black hover:bg-black hover:text-white transition-colors"
          >
            <Compass className="h-3.5 w-3.5" />
            <span>Directory</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playClick();
              setIsTerminalOpen(true);
            }}
            onMouseEnter={playHover}
            className="hidden sm:flex items-center border border-black bg-white px-2.5 py-1 text-[10px] font-mono font-bold text-black hover:bg-black hover:text-white transition-colors"
          >
            <span>CLI [T]</span>
          </button>
        </div>

        <div className="collab-presence flex items-center gap-2">
          <Users className="h-3.5 w-3.5 text-black" />
          <span>
            {activeVisitors.length <= 1
              ? 'Exploring world'
              : `${activeVisitors.length} exploring now`}
          </span>
        </div>

        <div className="collab-identity flex items-center gap-2.5">
          <div className="flex items-center gap-2">
            <VisitorAvatar
              displayName={visitorProfile.displayName}
              avatarUrl={visitorProfile.avatarUrl}
              avatarSeed={visitorProfile.avatarSeed}
              size="xs"
            />
            <span className="hidden md:inline font-mono text-[11px] font-semibold text-black">
              {visitorProfile.displayName}
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              playClick();
              toggleSound();
            }}
            aria-label={soundEnabled ? 'Mute sound' : 'Enable sound'}
            className="grid h-8 w-8 place-items-center border border-black bg-white text-black hover:bg-black hover:text-white transition-colors"
          >
            {soundEnabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
          </button>

          <button
            type="button"
            onClick={() => {
              playClick();
              setIsEscMenuOpen(true);
            }}
            aria-label="Open menu"
            className="grid h-8 w-8 place-items-center border border-black bg-white text-black hover:bg-black hover:text-white transition-colors"
          >
            <MoreVertical className="h-3.5 w-3.5" />
          </button>
        </div>
      </header>

      {/* 3. Returning Visitor Toast */}
      {welcomeToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 border border-black bg-white px-4 py-2 text-xs font-mono font-bold text-black shadow-xl animate-fade-in">
          <Sparkles className="h-3.5 w-3.5 text-black" />
          <span>{welcomeToast}</span>
        </div>
      )}

      {/* 4. Phaser 2D World Viewport */}
      <main className="collab-viewport">
        {characterId && (
          <PhaserWorldContainer
            ref={phaserRef}
            characterId={characterId}
            visitorName={visitorProfile.displayName}
            spawnX={spawnCoords.x}
            spawnY={spawnCoords.y}
            direction={spawnCoords.direction}
            onBuildingProximity={handleBuildingProximity}
            onProjectBranchProximity={handleProjectBranchProximity}
            onExitDoorwayProximity={handleExitDoorwayProximity}
            onBudgetBeggarProximity={handleBudgetBeggarProximity}
            onBasketballProximity={handleBasketballProximity}
            onGamingLoungeProximity={handleGamingLoungeProximity}
            onPlayerMoved={handlePlayerMoved}
            onCheckpointTrigger={handleCheckpointTrigger}
            onFootstep={playFootstep}
          />
        )}
      </main>

      {/* 5. Mini-Map Radar (Collapsible in Corner) */}
      <WorldRadar
        playerX={playerCoords.x}
        playerY={playerCoords.y}
        activeVisitors={activeVisitors}
        insideBuilding={insideBuilding}
        onSelectBuilding={(b) => handleEnterBuilding(b)}
      />

      {/* 6. Contextual Proximity Prompts [E] */}
      
      {/* 6a. Outside Building Entrance Prompt */}
      {!insideBuilding && activeBuildingNear && (
        <button
          type="button"
          onClick={() => handleEnterBuilding(activeBuildingNear)}
          className="interaction-prompt cursor-pointer hover:bg-black hover:text-white transition-all"
        >
          <kbd>E</kbd>
          <span>Enter {activeBuildingNear.label} Hall</span>
        </button>
      )}

      {/* 6b. Inside Building: Project Branch / Cart Proximity Prompt */}
      {insideBuilding && activeProjectBranchNear && !openedProjectModal && (
        <button
          type="button"
          onClick={() => setOpenedProjectModal(activeProjectBranchNear)}
          className="interaction-prompt cursor-pointer hover:bg-black hover:text-white transition-all"
        >
          <kbd>E</kbd>
          <span>
            {activeProjectBranchNear.isWIP
              ? `Inspect [${activeProjectBranchNear.project.title}] & Talk to Builder`
              : `Enter [${activeProjectBranchNear.project.title}] & Talk to Guide`}
          </span>
        </button>
      )}

      {/* 6c. Inside Building: Exit Doorway Proximity Prompt */}
      {insideBuilding && isNearExitDoorway && !activeProjectBranchNear && !openedProjectModal && (
        <button
          type="button"
          onClick={handleExitToCampus}
          className="interaction-prompt cursor-pointer hover:bg-black hover:text-white transition-all"
        >
          <kbd>E</kbd>
          <span>Exit to Campus Plaza</span>
        </button>
      )}

      {/* 6d. Outside: Budget Beggar Proximity Prompt */}
      {!insideBuilding && isNearBudgetBeggar && !activeBuildingNear && !isBudgetBeggarOpen && (
        <button
          type="button"
          onClick={() => {
            playClick();
            setIsBudgetBeggarOpen(true);
          }}
          className="interaction-prompt cursor-pointer hover:bg-black hover:text-white transition-all"
        >
          <kbd>E</kbd>
          <span>Talk to Budget-Seeking Developer</span>
        </button>
      )}

      {/* 6e. Outside: Basketball Court Proximity Prompt */}
      {!insideBuilding && isNearBasketball && !activeBuildingNear && !isNearBudgetBeggar && !openedHobbiesModal && (
        <button
          type="button"
          onClick={() => {
            playClick();
            setOpenedHobbiesModal('basketball');
          }}
          className="interaction-prompt cursor-pointer hover:bg-black hover:text-white transition-all"
        >
          <kbd>E</kbd>
          <span>Play Basketball & View Hobbies</span>
        </button>
      )}

      {/* 6f. Outside: Gaming Lounge Proximity Prompt */}
      {!insideBuilding && isNearGamingLounge && !activeBuildingNear && !isNearBudgetBeggar && !openedHobbiesModal && (
        <button
          type="button"
          onClick={() => {
            playClick();
            setOpenedHobbiesModal('gaming');
          }}
          className="interaction-prompt cursor-pointer hover:bg-black hover:text-white transition-all"
        >
          <kbd>E</kbd>
          <span>Join Esports Lounge & Online Games</span>
        </button>
      )}

      {/* 7. Quick Movement Controls Hint */}
      {showControlsHint &&
        !activeBuildingNear &&
        !activeProjectBranchNear &&
        !isNearBudgetBeggar &&
        !isNearBasketball &&
        !isNearGamingLounge && (
          <div className="movement-hint">
            <span>WASD / Arrow Keys or Tap to Walk · E to Interact · Q for Emotes · T for CLI</span>
          </div>
        )}

      {/* 8. Bottom Action Bar */}
      <div className="collab-shortcuts">
        <button
          type="button"
          onClick={() => setIsEmoteWheelOpen(true)}
          title="Express reaction (Hotkey: Q)"
          className="cursor-pointer"
        >
          <span>✨ Emotes [Q]</span>
        </button>

        <button
          type="button"
          onClick={() => setIsChatOpen((prev) => !prev)}
          title="Say something (Hotkey: Enter)"
          className="cursor-pointer"
        >
          <MessageCircle className="h-3.5 w-3.5 mr-1" />
          <span>Chat</span>
        </button>

        <button
          type="button"
          onClick={() => setIsTerminalOpen(true)}
          title="Developer CLI Terminal (Hotkey: T)"
          className="cursor-pointer"
        >
          <span>CLI [T]</span>
        </button>

        <button
          type="button"
          onClick={() => setIsQuickAccessOpen(true)}
          className="cursor-pointer sm:hidden"
        >
          <Compass className="h-3.5 w-3.5 mr-1" />
          <span>Directory</span>
        </button>

        {insideBuilding && (
          <button
            type="button"
            onClick={handleExitToCampus}
            className="cursor-pointer font-bold bg-black text-white hover:bg-[#333333]"
          >
            <DoorOpen className="h-3.5 w-3.5 mr-1" />
            <span>Exit</span>
          </button>
        )}
      </div>

      {/* 9. Temporary Speech Input Bar */}
      {isChatOpen && (
        <form
          onSubmit={handleSendChat}
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 flex w-[90vw] max-w-md items-center gap-2 border border-black bg-white p-2 shadow-2xl"
        >
          <input
            autoFocus
            type="text"
            value={chatInput}
            maxLength={MAX_SPEECH_LENGTH}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => e.stopPropagation()}
            placeholder="Say something to visitors near you…"
            className="flex-1 bg-transparent px-3 py-1.5 text-xs text-black outline-none font-sans"
          />
          <button
            type="submit"
            disabled={!chatInput.trim()}
            className="border border-black bg-black px-3 py-1.5 text-[10px] font-mono font-bold uppercase text-white disabled:opacity-30"
          >
            Say
          </button>
          <button
            type="button"
            onClick={() => setIsChatOpen(false)}
            className="p-1 text-black hover:opacity-50"
          >
            <X className="h-4 w-4" />
          </button>
        </form>
      )}

      {/* 10. Emote Wheel Modal */}
      {isEmoteWheelOpen && (
        <EmoteWheel
          onSelectReaction={(type) => handleSendReaction(type)}
          onClose={() => setIsEmoteWheelOpen(false)}
        />
      )}

      {/* 11. Interactive Developer CLI Terminal Kiosk Modal */}
      {isTerminalOpen && (
        <WorldTerminalModal
          visitorName={visitorProfile.displayName}
          onClose={() => setIsTerminalOpen(false)}
        />
      )}

      {/* 11b. Budget Beggar Developer Easter Egg Modal */}
      {isBudgetBeggarOpen && (
        <BudgetBeggarModal onClose={() => setIsBudgetBeggarOpen(false)} />
      )}

      {/* 11c. Hobbies & Passions (Basketball & Gaming) Modal */}
      {openedHobbiesModal && (
        <HobbiesModal
          initialTab={openedHobbiesModal}
          onClose={() => setOpenedHobbiesModal(null)}
        />
      )}

      {/* 12. Interactive Project Exhibition & Guide Dialogue Modal */}
      {openedProjectModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto"
          onClick={() => setOpenedProjectModal(null)}
        >
          <div
            className="w-full max-w-5xl max-h-[90vh] overflow-y-auto border-2 border-black bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-black pb-3 mb-6">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold uppercase text-black">
                  Project Cart Exhibition · {openedProjectModal.project.title}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setOpenedProjectModal(null)}
                className="flex items-center gap-1 border border-black bg-black px-3 py-1 text-xs font-mono font-bold uppercase text-white hover:bg-[#333333]"
              >
                <span>Close [ESC]</span>
                <X className="h-4 w-4" />
              </button>
            </div>

            <ProjectCartGuide
              project={openedProjectModal.project}
              isWIP={openedProjectModal.isWIP}
            />
          </div>
        </div>
      )}

      {/* 13. Collab Canvas Modal */}
      {isCanvasOpen && (
        <CollabCanvas
          visitorId={visitorProfile.anonymousId}
          visitorName={visitorProfile.displayName}
          visitorAvatar={visitorProfile.avatarUrl}
          liveAvailable={true}
          onClose={() => setIsCanvasOpen(false)}
        />
      )}

      {/* 14. Visitor Wall Modal */}
      {isVisitorWallOpen && (
        <VisitorWallOverlay
          visitorId={visitorProfile.anonymousId}
          visitorName={visitorProfile.displayName}
          visitorAvatar={visitorProfile.avatarUrl}
          onClose={() => setIsVisitorWallOpen(false)}
        />
      )}

      {/* 15. Quick Access Directory Drawer */}
      {isQuickAccessOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4"
          onClick={() => setIsQuickAccessOpen(false)}
        >
          <div
            className="w-full max-w-md border border-black bg-white p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-black pb-3 mb-4">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-widest text-[#666666]">Campus Directory</p>
                <h3 className="font-title text-xl font-semibold text-black">Direct Quick Access</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsQuickAccessOpen(false)}
                className="text-black hover:opacity-60"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-1.5 max-h-[60vh] overflow-y-auto">
              {quickAccessItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleQuickAccessSelect(item)}
                  className="flex w-full items-center justify-between border border-[#e0e0e0] bg-[#fafafa] p-3 text-left hover:border-black hover:bg-black hover:text-white group transition-colors"
                >
                  <div>
                    <strong className="block text-xs font-sans text-black group-hover:text-white">{item.label}</strong>
                    <span className="font-mono text-[9px] uppercase text-[#666666] group-hover:text-[#cccccc]">{item.category}</span>
                  </div>
                  <span className="font-mono text-[9px] uppercase text-black group-hover:text-white">Open →</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 16. ESC / World Options Menu */}
      {isEscMenuOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4"
          onClick={() => setIsEscMenuOpen(false)}
        >
          <div
            className="w-full max-w-sm border border-black bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-black pb-3 mb-5">
              <h3 className="font-title text-xl font-semibold text-black">World Options</h3>
              <button
                type="button"
                onClick={() => setIsEscMenuOpen(false)}
                className="text-black hover:opacity-60"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setIsEscMenuOpen(false)}
                className="w-full border border-black bg-white p-3 text-left font-mono text-xs font-semibold text-black hover:bg-black hover:text-white transition-colors"
              >
                Resume Exploring
              </button>

              {insideBuilding && (
                <button
                  type="button"
                  onClick={() => {
                    setIsEscMenuOpen(false);
                    handleExitToCampus();
                  }}
                  className="w-full border border-black bg-white p-3 text-left font-mono text-xs font-semibold text-black hover:bg-black hover:text-white transition-colors"
                >
                  Exit to Campus Plaza
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  setIsEscMenuOpen(false);
                  setIsTerminalOpen(true);
                }}
                className="flex w-full items-center justify-between border border-black bg-white p-3 text-left font-mono text-xs font-semibold text-black hover:bg-black hover:text-white transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span>Developer CLI Terminal</span>
                </div>
                <span className="text-[10px] text-[#666666]">[T]</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsEscMenuOpen(false);
                  setCharacterId(null);
                }}
                className="flex w-full items-center justify-between border border-black bg-white p-3 text-left font-mono text-xs font-semibold text-black hover:bg-black hover:text-white transition-colors group"
              >
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Change Character</span>
                </div>
                <span className="text-[10px] text-[#666666] group-hover:text-white">{characterId}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsEscMenuOpen(false);
                  setIsQuickAccessOpen(true);
                }}
                className="flex w-full items-center justify-between border border-black bg-white p-3 text-left font-mono text-xs font-semibold text-black hover:bg-black hover:text-white transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Compass className="h-4 w-4" />
                  <span>Campus Directory</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsEscMenuOpen(false);
                  setIsResetConfirmOpen(true);
                }}
                className="flex w-full items-center justify-between border border-[#cc0000] bg-white p-3 text-left font-mono text-xs font-semibold text-[#cc0000] hover:bg-[#cc0000] hover:text-white transition-colors"
              >
                <div className="flex items-center gap-2">
                  <RotateCcw className="h-4 w-4" />
                  <span>Reset Visitor Identity</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => navigate('/')}
                className="flex w-full items-center justify-between border border-black bg-black p-3 text-left font-mono text-xs font-bold uppercase text-white hover:bg-[#222222] transition-colors"
              >
                <span>Back to Portfolio</span>
                <ArrowLeft className="h-4 w-4 rotate-180" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 17. Reset Visitor Confirmation Modal */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm border border-black bg-white p-6 shadow-2xl">
            <h3 className="font-title text-xl font-semibold text-black mb-2">Reset Anonymous Identity?</h3>
            <p className="text-xs text-[#555555] leading-relaxed mb-5 font-sans">
              This will clear your local visitor profile and checkpoint. You will receive a new generated identity next visit.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setIsResetConfirmOpen(false)}
                className="flex-1 border border-black bg-white py-2 text-xs font-mono text-black hover:bg-[#f0f0f0]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleResetVisitor}
                className="flex-1 border border-black bg-black py-2 text-xs font-mono font-bold text-white uppercase hover:bg-[#333333]"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
