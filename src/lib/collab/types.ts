export type Direction = 'up' | 'down' | 'left' | 'right';
export type CharacterId = 'male_01' | 'female_01';

export type PlayerState = {
  x: number;
  y: number;
  direction: Direction;
  moving: boolean;
};

export type PublicCollabVisitor = {
  visitorId: string;
  name: string;
  avatar: string;
  characterId: CharacterId;
  joinedAt: number;
};

export type RemotePlayerState = PublicCollabVisitor & PlayerState & {
  sequence: number;
  timestamp: number;
  reaction?: string | null;
  speech?: string | null;
  speechExpiresAt?: number | null;
};

export type WorldCheckpoint = {
  characterId: CharacterId;
  lastX: number;
  lastY: number;
  lastDirection: Direction;
  lastBuildingId?: string | null;
  worldVersion: string;
  updatedAt?: string;
};

export type WorldReaction = {
  visitorId: string;
  type: 'wave' | 'heart' | 'sparkle';
  timestamp: number;
};

export type WorldSpeech = {
  visitorId: string;
  text: string;
  timestamp: number;
  expiresAt: number;
};

export type WorldSettings = {
  worldEnabled: boolean;
  multiplayerEnabled: boolean;
  visitorMessagesEnabled: boolean;
  canvasEnabled: boolean;
  temporaryChatEnabled: boolean;
  maxContributionsPerVisitor: number;
};

export type ContributionType = 'text' | 'note' | 'drawing';

export type DrawingPoint = { x: number; y: number };

export type ContributionContent = {
  text?: string;
  points?: DrawingPoint[];
};

export type ContributionStyle = {
  color?: string;
  strokeWidth?: number;
  background?: string;
};

export type CollabContribution = {
  id: string;
  ownerId: string;
  ownerName: string;
  ownerAvatar: string;
  type: ContributionType;
  content: ContributionContent;
  x: number;
  y: number;
  width: number;
  height: number;
  style: ContributionStyle;
  createdAt: string;
  updatedAt: string;
  isLocal?: boolean;
};

export type CollabMessage = {
  id: string;
  ownerId: string;
  ownerName: string;
  ownerAvatar: string;
  message: string;
  createdAt: string;
  isLocal?: boolean;
};

export type Interactable = {
  id: string;
  type: 'building';
  x: number;
  y: number;
  width: number;
  height: number;
  interactionRadius: number;
  buildingId: string;
};

export type QuickAccessItem = {
  id: string;
  label: string;
  category: string;
  buildingId?: string;
  slug?: string;
  action?: 'building' | 'canvas' | 'visitorWall' | 'developer' | 'exit';
};
