import type Phaser from 'phaser';
import { projects } from '../../../data/projects';
import type { Project } from '../../../types';
import type { WorldBuilding } from '../worldConfig';

export const INTERIOR_WIDTH = 1200;
export const INTERIOR_HEIGHT = 750;

export type ProjectBranchZone = {
  project: Project;
  isWIP: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type InteriorEnvironmentResult = {
  projectZones: Array<{ project: Project; isWIP: boolean; zone: Phaser.GameObjects.Zone }>;
  exitZone: Phaser.GameObjects.Zone;
  npcSprites: Phaser.GameObjects.Sprite[];
};

/**
 * Builds a walkable 2D interior exhibition hall in crisp Black & White:
 * - Gallery floor with architectural coordinate lines & wall perimeters
 * - Entrance/Exit doorway at bottom center
 * - Project exhibition carts/booths with human guide NPCs for each project branch
 * - Unfinished/WIP projects rendered with scaffolding, hazard tape & construction NPCs
 */
export function buildBuildingInteriorEnvironment(
  scene: Phaser.Scene,
  collisionGroup: Phaser.Physics.Arcade.StaticGroup,
  building: WorldBuilding,
): InteriorEnvironmentResult {
  const g = scene.add.graphics();
  const npcSprites: Phaser.GameObjects.Sprite[] = [];
  const projectZones: Array<{ project: Project; isWIP: boolean; zone: Phaser.GameObjects.Zone }> = [];

  // 1. Interior Floor (Pure White with Light Drafting Grid)
  g.fillStyle(0xffffff, 1);
  g.fillRect(0, 0, INTERIOR_WIDTH, INTERIOR_HEIGHT);

  g.lineStyle(1, 0xededed, 1);
  const gridSize = 40;
  for (let x = 0; x < INTERIOR_WIDTH; x += gridSize) {
    g.lineBetween(x, 0, x, INTERIOR_HEIGHT);
  }
  for (let y = 0; y < INTERIOR_HEIGHT; y += gridSize) {
    g.lineBetween(0, y, INTERIOR_WIDTH, y);
  }

  // 2. Central Walkway Carpet (Off-White with Black Border)
  g.fillStyle(0xf7f7f7, 1);
  g.fillRect(100, 80, INTERIOR_WIDTH - 200, INTERIOR_HEIGHT - 180);
  g.lineStyle(2, 0x000000, 1);
  g.strokeRect(100, 80, INTERIOR_WIDTH - 200, INTERIOR_HEIGHT - 180);

  // 3. Perimeter Boundary Walls (Solid 2px Black Line + Collision Bodies)
  g.lineStyle(3, 0x000000, 1);
  g.strokeRect(40, 40, INTERIOR_WIDTH - 80, INTERIOR_HEIGHT - 80);

  // Add Wall Static Colliders (Top, Left, Right, Bottom-Left, Bottom-Right)
  const addWallCollider = (x: number, y: number, w: number, h: number) => {
    const wall = scene.add.rectangle(x + w / 2, y + h / 2, w, h);
    scene.physics.add.existing(wall, true);
    collisionGroup.add(wall);
  };

  // Top Wall
  addWallCollider(40, 40, INTERIOR_WIDTH - 80, 20);
  // Left Wall
  addWallCollider(40, 40, 20, INTERIOR_HEIGHT - 80);
  // Right Wall
  addWallCollider(INTERIOR_WIDTH - 60, 40, 20, INTERIOR_HEIGHT - 80);
  // Bottom Left Wall
  addWallCollider(40, INTERIOR_HEIGHT - 60, 500, 20);
  // Bottom Right Wall
  addWallCollider(660, INTERIOR_HEIGHT - 60, 500, 20);

  // 4. Room Header Banner Plaque
  g.fillStyle(0x000000, 1);
  g.fillRect(INTERIOR_WIDTH / 2 - 220, 48, 440, 36);
  g.lineStyle(1, 0x000000, 1);
  g.strokeRect(INTERIOR_WIDTH / 2 - 220, 48, 440, 36);

  scene.add.text(INTERIOR_WIDTH / 2, 54, `${building.label} INTERIOR HALL`, {
    fontFamily: 'var(--font-title), sans-serif',
    fontSize: '14px',
    fontStyle: 'bold',
    color: '#ffffff',
  }).setOrigin(0.5, 0).setDepth(10);

  scene.add.text(INTERIOR_WIDTH / 2, 70, building.isWIP ? '🚧 PROTOTYPE WORKBENCH & ACTIVE BUILD 🚧' : 'EXHIBITION GALLERY & PROJECT BRANCHES', {
    fontFamily: 'monospace',
    fontSize: '8px',
    color: '#cccccc',
  }).setOrigin(0.5, 0).setDepth(10);

  // 5. Exit Doorway (Bottom Center)
  const exitDoorX = INTERIOR_WIDTH / 2 - 50;
  const exitDoorY = INTERIOR_HEIGHT - 70;
  const exitDoorW = 100;
  const exitDoorH = 30;

  g.fillStyle(0x000000, 1);
  g.fillRect(exitDoorX, exitDoorY, exitDoorW, exitDoorH);

  scene.add.text(INTERIOR_WIDTH / 2, exitDoorY + 8, '▼ EXIT TO PLAZA', {
    fontFamily: 'monospace',
    fontSize: '9px',
    fontStyle: 'bold',
    color: '#ffffff',
  }).setOrigin(0.5, 0).setDepth(10);

  const exitZone = scene.add.zone(INTERIOR_WIDTH / 2, exitDoorY + 10, exitDoorW + 20, 50);
  scene.physics.add.existing(exitZone, true);

  // 6. Gather Building Projects
  const buildingProjectList = building.projectSlugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is Project => Boolean(p));

  // Determine Branch Cart Positions
  // If 1 project: Center cart (x: 600, y: 220)
  // If 2 projects: Left (x: 360, y: 240), Right (x: 840, y: 240)
  // If 3 projects: Left (x: 260, y: 240), Center (x: 600, y: 240), Right (x: 940, y: 240)
  const cartPositions = getBranchPositions(buildingProjectList.length);

  buildingProjectList.forEach((proj, idx) => {
    const pos = cartPositions[idx] || { x: 600, y: 240, w: 260, h: 220 };
    const isWIP = Boolean(building.isWIP || proj.status?.toLowerCase().includes('development') || proj.status?.toLowerCase().includes('wip'));

    const cg = scene.add.graphics();
    cg.setDepth(5);

    // Cart Drop Shadow
    cg.fillStyle(0x000000, 0.1);
    cg.fillRect(pos.x - pos.w / 2 + 6, pos.y - pos.h / 2 + 6, pos.w, pos.h);

    // Cart Body (White or WIP striped)
    cg.fillStyle(0xffffff, 1);
    cg.lineStyle(2, 0x000000, 1);
    cg.fillRect(pos.x - pos.w / 2, pos.y - pos.h / 2, pos.w, pos.h);
    cg.strokeRect(pos.x - pos.w / 2, pos.y - pos.h / 2, pos.w, pos.h);

    // Cart Striped Canopy Awning (Top)
    const canopyY = pos.y - pos.h / 2;
    const stripeCount = 6;
    const stripeWidth = pos.w / stripeCount;
    for (let s = 0; s < stripeCount; s++) {
      cg.fillStyle(s % 2 === 0 ? 0x000000 : 0xffffff, 1);
      cg.fillRect(pos.x - pos.w / 2 + s * stripeWidth, canopyY, stripeWidth, 22);
      cg.lineStyle(1, 0x000000, 1);
      cg.strokeRect(pos.x - pos.w / 2 + s * stripeWidth, canopyY, stripeWidth, 22);
    }

    // Scaffolding & Hazard Stripes if WIP
    if (isWIP) {
      cg.lineStyle(1, 0x000000, 0.7);
      // Diagonal cross-bracing
      cg.lineBetween(pos.x - pos.w / 2, canopyY + 22, pos.x + pos.w / 2, canopyY + 90);
      cg.lineBetween(pos.x - pos.w / 2, canopyY + 90, pos.x + pos.w / 2, canopyY + 22);

      // Hazard banner
      cg.fillStyle(0x000000, 1);
      cg.fillRect(pos.x - pos.w / 2 + 10, canopyY + 26, pos.w - 20, 18);
      scene.add.text(pos.x, canopyY + 30, '🚧 75% BUILT · IN DEV 🚧', {
        fontFamily: 'monospace',
        fontSize: '8px',
        fontStyle: 'bold',
        color: '#ffffff',
      }).setOrigin(0.5, 0).setDepth(8);
    }

    // Project Name & Category Header
    cg.fillStyle(0x000000, 1);
    cg.fillRect(pos.x - pos.w / 2 + 10, pos.y - 15, pos.w - 20, 32);
    cg.lineStyle(1, 0x000000, 1);
    cg.strokeRect(pos.x - pos.w / 2 + 10, pos.y - 15, pos.w - 20, 32);

    scene.add.text(pos.x, pos.y - 10, proj.title.toUpperCase(), {
      fontFamily: 'var(--font-title), sans-serif',
      fontSize: '10px',
      fontStyle: 'bold',
      color: '#ffffff',
    }).setOrigin(0.5, 0).setDepth(8);

    scene.add.text(pos.x, pos.y + 4, `${proj.category} · ${proj.status}`, {
      fontFamily: 'monospace',
      fontSize: '7px',
      color: '#cccccc',
    }).setOrigin(0.5, 0).setDepth(8);

    // Cart Wheels (Bottom Left & Right)
    const wheelRadius = 14;
    const wheelY = pos.y + pos.h / 2;
    // Left wheel
    cg.fillStyle(0xffffff, 1);
    cg.fillCircle(pos.x - pos.w / 2 + 25, wheelY, wheelRadius);
    cg.lineStyle(2, 0x000000, 1);
    cg.strokeCircle(pos.x - pos.w / 2 + 25, wheelY, wheelRadius);
    cg.fillStyle(0x000000, 1);
    cg.fillCircle(pos.x - pos.w / 2 + 25, wheelY, 4);

    // Right wheel
    cg.fillStyle(0xffffff, 1);
    cg.fillCircle(pos.x + pos.w / 2 - 25, wheelY, wheelRadius);
    cg.lineStyle(2, 0x000000, 1);
    cg.strokeCircle(pos.x + pos.w / 2 - 25, wheelY, wheelRadius);
    cg.fillStyle(0x000000, 1);
    cg.fillCircle(pos.x + pos.w / 2 - 25, wheelY, 4);

    // Cart Static Physics Collider
    const collider = scene.add.rectangle(pos.x, pos.y, pos.w, pos.h - 10);
    scene.physics.add.existing(collider, true);
    collisionGroup.add(collider);

    // Standing Human Guide NPC Sprite
    const npcX = pos.x + pos.w / 2 + 18;
    const npcY = pos.y + 20;
    const npc = scene.add.sprite(npcX, npcY, 'char_male_01_down_0');
    npc.setDepth(12);
    npcSprites.push(npc);

    // NPC Name Tag
    scene.add.text(npcX, npcY - 32, isWIP ? '👷 Engineer' : '👨‍💻 Guide', {
      fontFamily: 'monospace',
      fontSize: '8px',
      fontStyle: 'bold',
      color: '#000000',
      backgroundColor: '#ffffff',
      padding: { x: 3, y: 1 },
    }).setOrigin(0.5).setDepth(13);

    // Interaction Prompt Mat outside booth
    cg.fillStyle(0x000000, 1);
    cg.fillRect(pos.x - 45, pos.y + pos.h / 2 + 12, 90, 20);
    scene.add.text(pos.x, pos.y + pos.h / 2 + 16, '[E] TALK & ENTER', {
      fontFamily: 'monospace',
      fontSize: '7px',
      fontStyle: 'bold',
      color: '#ffffff',
    }).setOrigin(0.5, 0).setDepth(8);

    // Interactive Proximity Zone
    const pZone = scene.add.zone(pos.x, pos.y + pos.h / 2 + 30, pos.w + 30, 80);
    scene.physics.add.existing(pZone, true);
    projectZones.push({ project: proj, isWIP, zone: pZone });
  });

  return {
    projectZones,
    exitZone,
    npcSprites,
  };
}

function getBranchPositions(count: number): Array<{ x: number; y: number; w: number; h: number }> {
  if (count <= 1) {
    return [{ x: 600, y: 260, w: 320, h: 220 }];
  }
  if (count === 2) {
    return [
      { x: 380, y: 260, w: 260, h: 220 },
      { x: 820, y: 260, w: 260, h: 220 },
    ];
  }
  return [
    { x: 260, y: 260, w: 230, h: 220 },
    { x: 600, y: 260, w: 230, h: 220 },
    { x: 940, y: 260, w: 230, h: 220 },
  ];
}
