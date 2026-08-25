import type { Interactable } from './types';
import { worldBuildings } from './worldConfig';

export const WORLD_WIDTH = 2200;
export const WORLD_HEIGHT = 1400;
export const WORLD_VERSION = 'v1';

export const PLAYER_SPEED = 240;
export const PLAYER_RADIUS = 20;
export const MOVEMENT_BROADCAST_MS = 60; // ~16 updates/sec
export const REMOTE_PLAYER_TIMEOUT_MS = 14_000;
export const CHECKPOINT_AUTOSAVE_MS = 20_000; // Autosave location every 20s

export const CANVAS_WIDTH = 1400;
export const CANVAS_HEIGHT = 900;
export const MAX_TEXT_LENGTH = 160;
export const MAX_MESSAGE_LENGTH = 160;
export const MAX_DRAWING_POINTS = 300;
export const MAX_SPEECH_LENGTH = 90;
export const SPEECH_DURATION_MS = 6000;

export const SPAWN_POINT = { x: 1100, y: 640 };

export const COLLISION_RECTS = worldBuildings.map(({ x, y, width, height }) => ({
  x,
  y,
  width,
  height,
}));

export function buildInteractables(): Interactable[] {
  return worldBuildings.map((building) => ({
    id: `door-${building.id}`,
    type: 'building' as const,
    buildingId: building.id,
    x: building.x + building.width / 2 - 40,
    y: building.y + building.height - 6,
    width: 80,
    height: 24,
    interactionRadius: 96,
  }));
}

/**
 * Validates if coordinates are in a walk-safe zone (within world bounds and not inside buildings)
 */
export function isPositionSafe(x: number, y: number, buffer = 24): boolean {
  if (x < buffer || x > WORLD_WIDTH - buffer || y < buffer || y > WORLD_HEIGHT - buffer) {
    return false;
  }
  for (const rect of COLLISION_RECTS) {
    if (
      x >= rect.x - buffer &&
      x <= rect.x + rect.width + buffer &&
      y >= rect.y - buffer &&
      y <= rect.y + rect.height + buffer
    ) {
      return false;
    }
  }
  return true;
}

/**
 * Returns safe spawn position for a building entrance or fallback spawn point
 */
export function getBuildingEntranceSpawn(buildingId?: string | null): { x: number; y: number } {
  if (!buildingId) return SPAWN_POINT;
  const building = worldBuildings.find((b) => b.id === buildingId);
  if (!building) return SPAWN_POINT;
  return {
    x: building.x + building.width / 2,
    y: building.y + building.height + 40,
  };
}
