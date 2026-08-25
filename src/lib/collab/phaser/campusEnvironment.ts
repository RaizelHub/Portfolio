import type Phaser from 'phaser';
import {
  WORLD_HEIGHT,
  WORLD_WIDTH,
} from '../constants';
import {
  campusPaths,
  wayfindingSigns,
  worldBuildings,
  type WorldBuilding,
} from '../worldConfig';

/**
 * Builds the modern digital campus environment in inverted Black & White (White World / Black Structures):
 * - Pure white drafting paper canvas & subtle light coordinate grid
 * - High-contrast black architectural borders, walkways, and compass
 * - Pristine white high-rise towers with black glass curtain framing & rooftop spires
 * - Crisp black signage plaques, minimalist benches, and stone landscaping
 */
export function buildCampusEnvironment(
  scene: Phaser.Scene,
  collisionGroup: Phaser.Physics.Arcade.StaticGroup,
): {
  buildingZones: Array<{ building: WorldBuilding; zone: Phaser.GameObjects.Zone }>;
  budgetBeggarZones: Phaser.GameObjects.Zone[];
  basketballCourtZone: Phaser.GameObjects.Zone;
  gamingLoungeZone: Phaser.GameObjects.Zone;
  coffeeCartZone: Phaser.GameObjects.Zone;
  arcadeCabinetZone: Phaser.GameObjects.Zone;
  aiJanmarkZone: Phaser.GameObjects.Zone;
  questStampZones: Array<{ id: string; zone: Phaser.GameObjects.Zone }>;
} {
  const g = scene.add.graphics();

  // 1. Base Ground (Crisp Pure White)
  g.fillStyle(0xffffff, 1);
  g.fillRect(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

  // 2. Architectural Coordinate Grid (Light Drafting Lines)
  g.lineStyle(1, 0xe8e8e8, 1);
  const gridSize = 40;
  for (let x = 0; x < WORLD_WIDTH; x += gridSize) {
    g.lineBetween(x, 0, x, WORLD_HEIGHT);
  }
  for (let y = 0; y < WORLD_HEIGHT; y += gridSize) {
    g.lineBetween(0, y, WORLD_WIDTH, y);
  }

  // 3. Central Visitor Plaza & Courtyard (Off-White with Bold Black Border)
  g.fillStyle(0xf8f8f8, 1);
  g.lineStyle(2, 0x000000, 1);
  g.strokeRect(520, 480, 1160, 320);
  g.fillRect(520, 480, 1160, 320);

  // Plaza Center Inlay
  g.fillStyle(0xeeeeee, 1);
  g.fillRect(840, 550, 520, 180);
  g.lineStyle(1, 0x000000, 1);
  g.strokeRect(840, 550, 520, 180);

  // Compass Center Circle
  g.fillStyle(0xffffff, 1);
  g.fillCircle(1100, 640, 40);
  g.lineStyle(2, 0x000000, 1);
  g.strokeCircle(1100, 640, 40);

  // Campus Center Typography (Crisp Bold Black)
  scene.add.text(1100, 640, 'JANMARK SUELTO\nPORTFOLIO CAMPUS', {
    fontFamily: 'monospace',
    fontSize: '9px',
    fontStyle: 'bold',
    color: '#000000',
    align: 'center',
  }).setOrigin(0.5).setDepth(2);

  // 4. Paved Pedestrian Corridors (Clean Light Paths with Black Outlines)
  campusPaths.forEach((path) => {
    g.fillStyle(0xf4f4f4, 1);
    g.fillRect(path.x, path.y, path.width, path.height);
    g.lineStyle(1, 0x000000, 1);
    g.strokeRect(path.x, path.y, path.width, path.height);
  });

  // 5. Landscaping Planters (Crisp White Planters with Black Topiary)
  const planterLocations = [
    { x: 500, y: 500, w: 45, h: 80 },
    { x: 1655, y: 500, w: 45, h: 80 },
    { x: 500, y: 700, w: 45, h: 80 },
    { x: 1655, y: 700, w: 45, h: 80 },
    { x: 600, y: 430, w: 80, h: 40 },
    { x: 1520, y: 430, w: 80, h: 40 },
    { x: 530, y: 860, w: 80, h: 40 },
    { x: 1590, y: 860, w: 80, h: 40 },
  ];

  planterLocations.forEach((p) => {
    // Planter box
    g.fillStyle(0xffffff, 1);
    g.lineStyle(1, 0x000000, 1);
    g.fillRect(p.x, p.y, p.w, p.h);
    g.strokeRect(p.x, p.y, p.w, p.h);

    // Light stone gravel fill
    g.fillStyle(0xededed, 1);
    g.fillRect(p.x + 4, p.y + 4, p.w - 8, p.h - 8);

    // Modern geometric topiary circle (Solid Black)
    const treeX = p.x + p.w / 2;
    const treeY = p.y + p.h / 2;
    g.fillStyle(0x000000, 1);
    g.fillCircle(treeX, treeY, Math.min(p.w, p.h) * 0.35);
    g.lineStyle(1, 0x333333, 1);
    g.strokeCircle(treeX, treeY, Math.min(p.w, p.h) * 0.35);
  });

  // 6. Minimalist Black & White Benches
  const benches = [
    { x: 580, y: 520, w: 40, h: 14 },
    { x: 1580, y: 520, w: 40, h: 14 },
    { x: 580, y: 740, w: 40, h: 14 },
    { x: 1580, y: 740, w: 40, h: 14 },
  ];
  benches.forEach((b) => {
    g.fillStyle(0x000000, 0.08);
    g.fillRect(b.x + 2, b.y + 2, b.w, b.h);
    g.fillStyle(0xffffff, 1);
    g.lineStyle(1, 0x000000, 1);
    g.fillRect(b.x, b.y, b.w, b.h);
    g.strokeRect(b.x, b.y, b.w, b.h);
  });

  // 7. Wayfinding Signposts (Crisp Black Badges on White Ground)
  wayfindingSigns.forEach((sign) => {
    g.fillStyle(0x000000, 1);
    g.fillRect(sign.x - 3, sign.y - 3, 6, 6);

    const signText = scene.add.text(sign.x, sign.y - 14, sign.text, {
      fontFamily: 'monospace',
      fontSize: '9px',
      fontStyle: 'bold',
      color: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 6, y: 3 },
    }).setOrigin(0.5).setDepth(4);
    signText.setShadow(0, 1, 'rgba(0,0,0,0.2)', 2);
  });

  // 8. Thin, Tall Architectural Skyscraper Buildings in Inverted Black & White
  const buildingZones: Array<{ building: WorldBuilding; zone: Phaser.GameObjects.Zone }> = [];

  worldBuildings.forEach((b) => {
    const bg = scene.add.graphics();
    bg.setDepth(5);

    // Subtle building shadow
    bg.fillStyle(0x000000, 0.12);
    bg.fillRect(b.x + 8, b.y + 8, b.width, b.height);

    // Rooftop Spire & Antenna (Solid Black)
    bg.fillStyle(0x000000, 1);
    bg.fillRect(b.x + b.width / 2 - 1.5, b.y - 20, 3, 20);
    bg.fillCircle(b.x + b.width / 2, b.y - 22, 4);

    // Rooftop Penthouse Crown
    bg.fillStyle(0xffffff, 1);
    bg.lineStyle(1, 0x000000, 1);
    bg.fillRect(b.x + 20, b.y - 8, b.width - 40, 8);
    bg.strokeRect(b.x + 20, b.y - 8, b.width - 40, 8);

    // Outer architectural tower body (Crisp White with Bold Black Outline)
    bg.fillStyle(0xffffff, 1);
    bg.lineStyle(2, 0x000000, 1);
    bg.fillRect(b.x, b.y, b.width, b.height);
    bg.strokeRect(b.x, b.y, b.width, b.height);

    // Vertical Solid Black Architectural Edge Fins
    bg.fillStyle(0x000000, 1);
    bg.fillRect(b.x, b.y, 4, b.height);
    bg.fillRect(b.x + b.width - 4, b.y, 4, b.height);

    // Top Cornice Accent (Solid Black)
    bg.fillRect(b.x, b.y, b.width, 5);

    // Multi-Floor Glass Curtain Wall Windows (Crisp Monochrome Grid)
    const glassX = b.x + 12;
    const glassY = b.y + 20;
    const glassWidth = b.width - 24;
    const glassHeight = b.height - 75;

    bg.fillStyle(0xf8f8f8, 1);
    bg.fillRect(glassX, glassY, glassWidth, glassHeight);
    bg.lineStyle(1, 0x000000, 1);
    bg.strokeRect(glassX, glassY, glassWidth, glassHeight);

    // 8 Stacked Floors (Horizontal Spandrel Dividers)
    const floorCount = 8;
    const floorHeight = glassHeight / floorCount;
    for (let f = 1; f < floorCount; f++) {
      const fy = glassY + f * floorHeight;
      bg.fillStyle(0xededed, 1);
      bg.fillRect(glassX, fy - 2, glassWidth, 4);
      bg.lineStyle(1, 0x000000, 0.8);
      bg.lineBetween(glassX, fy, glassX + glassWidth, fy);
    }

    // Vertical Window Mullions
    const colCount = 4;
    const colWidth = glassWidth / colCount;
    for (let c = 1; c < colCount; c++) {
      const cx = glassX + c * colWidth;
      bg.lineStyle(1, 0x000000, 0.4);
      bg.lineBetween(cx, glassY, cx, glassY + glassHeight);
    }

    // 9. If building is Under Construction (isWIP), draw Scaffolding & Rooftop Crane
    if (b.isWIP) {
      // Scaffolding Cross-Bracing across glass façade
      bg.lineStyle(1, 0x000000, 0.6);
      for (let f = 0; f < floorCount; f++) {
        const fy1 = glassY + f * floorHeight;
        const fy2 = fy1 + floorHeight;
        bg.lineBetween(glassX, fy1, glassX + glassWidth, fy2);
        bg.lineBetween(glassX, fy2, glassX + glassWidth, fy1);
      }

      // Construction Crane Jib on Rooftop
      bg.lineStyle(2, 0x000000, 1);
      bg.lineBetween(b.x + b.width / 2, b.y - 28, b.x + b.width + 16, b.y - 28); // Horizontal boom
      bg.lineBetween(b.x + b.width / 2, b.y - 28, b.x + b.width / 2 - 14, b.y - 18); // Counter-jib
      bg.lineStyle(1, 0x000000, 0.8);
      bg.lineBetween(b.x + b.width + 10, b.y - 28, b.x + b.width + 10, b.y - 8); // Cable hoist

      // Construction Hazard Badge
      const wipBadge = scene.add.text(b.x + b.width / 2, b.y + 68, '🚧 IN DEV 🚧', {
        fontFamily: 'monospace',
        fontSize: '8px',
        fontStyle: 'bold',
        color: '#ffffff',
        backgroundColor: '#000000',
        padding: { x: 4, y: 2 },
      }).setOrigin(0.5).setDepth(7);
      wipBadge.setShadow(0, 1, 'rgba(0,0,0,0.3)', 2);
    }

    // Top Signage Banner on Skyscraper (Solid Black with White Text)
    const bannerX = b.x + 14;
    const bannerY = b.y + 26;
    const bannerWidth = b.width - 28;
    const bannerHeight = 36;

    bg.fillStyle(0x000000, 1);
    bg.lineStyle(1, 0x000000, 1);
    bg.fillRect(bannerX, bannerY, bannerWidth, bannerHeight);
    bg.strokeRect(bannerX, bannerY, bannerWidth, bannerHeight);

    // Building Title & Subtitle (Crisp White & Silver on Black Banner)
    scene.add.text(bannerX + bannerWidth / 2, bannerY + 6, b.label, {
      fontFamily: 'var(--font-title), sans-serif',
      fontSize: '13px',
      fontStyle: 'bold',
      color: '#ffffff',
    }).setOrigin(0.5, 0).setDepth(6);

    scene.add.text(bannerX + bannerWidth / 2, bannerY + 22, b.subtitle, {
      fontFamily: 'monospace',
      fontSize: '8px',
      color: '#cccccc',
    }).setOrigin(0.5, 0).setDepth(6);

    // Ground Floor Entrance Lobby (Bottom Center)
    const doorWidth = 60;
    const doorHeight = 42;
    const doorX = b.x + (b.width - doorWidth) / 2;
    const doorY = b.y + b.height - doorHeight;

    // Lobby glass and frame
    bg.fillStyle(0xffffff, 1);
    bg.fillRect(doorX, doorY, doorWidth, doorHeight);
    bg.lineStyle(1, 0x000000, 1);
    bg.strokeRect(doorX, doorY, doorWidth, doorHeight);

    // Entrance Canopy Overhang (Solid Black Accent)
    bg.fillStyle(0x000000, 1);
    bg.fillRect(doorX - 6, doorY - 4, doorWidth + 12, 5);

    // Welcome mat outside
    bg.fillStyle(0x000000, 1);
    bg.fillRect(doorX + 4, b.y + b.height, doorWidth - 8, 8);

    // Doorway Label
    scene.add.text(doorX + doorWidth / 2, doorY + 12, 'ENTER', {
      fontFamily: 'monospace',
      fontSize: '8px',
      fontStyle: 'bold',
      color: '#000000',
    }).setOrigin(0.5).setDepth(6);

    // Static Physics Collision Footprint
    const collider = scene.add.rectangle(
      b.x + b.width / 2,
      b.y + (b.height - 10) / 2,
      b.width,
      b.height - 10,
    );
    scene.physics.add.existing(collider, true);
    collisionGroup.add(collider);

    // Interactive Proximity Zone
    const zone = scene.add.zone(
      doorX + doorWidth / 2,
      doorY + doorHeight + 10,
      doorWidth + 40,
      50,
    );
    scene.physics.add.existing(zone, true);
    buildingZones.push({ building: b, zone });
  });

  // 9. Easter Egg: Sitting Smelly/Stinky Budget-Seeking Developer NPCs (Outside Subora & Vocara)
  const beggarLocations = [
    { x: 390, y: 525, signTitle: 'WILL CODE 4 BUDGET', badge: 'STINKY DEV · Subora Cloud Fund' },
    { x: 1900, y: 525, signTitle: 'NEED GROQ AI BUDGET', badge: 'STINKY DEV · Vocara Cloud Fund' },
  ];

  const budgetBeggarZones: Phaser.GameObjects.Zone[] = [];

  beggarLocations.forEach((loc, idx) => {
    const beggarX = loc.x;
    const beggarY = loc.y;

    const beggarGraphics = scene.add.graphics();
    beggarGraphics.setDepth(6);

    // Dirty cardboard mat on ground (where he sits)
    beggarGraphics.fillStyle(0xd9cbb0, 1);
    beggarGraphics.lineStyle(1.5, 0x555555, 1);
    beggarGraphics.fillRect(beggarX - 26, beggarY - 4, 52, 28);
    beggarGraphics.strokeRect(beggarX - 26, beggarY - 4, 52, 28);

    // Sitting Character Body (Slumped on ground with crossed/outstretched legs)
    // Legs stretched on ground
    beggarGraphics.fillStyle(0x333333, 1);
    beggarGraphics.fillRect(beggarX - 14, beggarY + 10, 28, 8);
    // Torn patches on jeans
    beggarGraphics.fillStyle(0x888888, 1);
    beggarGraphics.fillRect(beggarX - 8, beggarY + 12, 5, 4);

    // Slumped Torso / Worn Dark Hoodie
    beggarGraphics.fillStyle(0x1a1a1a, 1);
    beggarGraphics.fillRect(beggarX - 12, beggarY - 6, 24, 18);

    // Slumped Head / Face
    beggarGraphics.fillStyle(0xd4a373, 1);
    beggarGraphics.fillRect(beggarX - 6, beggarY - 14, 12, 10);

    // Messy unwashed hair & 5 o'clock debug shadow
    beggarGraphics.fillStyle(0x222222, 1);
    beggarGraphics.fillRect(beggarX - 8, beggarY - 18, 16, 6);
    beggarGraphics.fillRect(beggarX - 7, beggarY - 10, 14, 4);

    // Tired eyes (slumped / sleeping / debugging)
    beggarGraphics.fillStyle(0x000000, 1);
    beggarGraphics.fillRect(beggarX - 4, beggarY - 12, 2, 2);
    beggarGraphics.fillRect(beggarX + 2, beggarY - 12, 2, 2);

    // Cardboard sign propped up against his knees
    beggarGraphics.fillStyle(0xf0e6ce, 1);
    beggarGraphics.lineStyle(1.5, 0x000000, 1);
    beggarGraphics.fillRect(beggarX - 30, beggarY + 10, 60, 20);
    beggarGraphics.strokeRect(beggarX - 30, beggarY + 10, 60, 20);

    // Tip jar with coins
    beggarGraphics.fillStyle(0x000000, 1);
    beggarGraphics.fillRect(beggarX + 32, beggarY + 10, 12, 14);
    beggarGraphics.fillStyle(0xffffff, 1);
    beggarGraphics.fillRect(beggarX + 33, beggarY + 11, 10, 3);
    // Gold coin in jar
    beggarGraphics.fillStyle(0xffd700, 1);
    beggarGraphics.fillCircle(beggarX + 38, beggarY + 18, 3);

    // Cardboard text
    scene.add.text(beggarX, beggarY + 16, loc.signTitle, {
      fontFamily: 'monospace',
      fontSize: '5px',
      fontStyle: 'bold',
      color: '#000000',
    }).setOrigin(0.5).setDepth(8);

    scene.add.text(beggarX, beggarY + 24, 'ANY AMOUNT APPRECIATED', {
      fontFamily: 'monospace',
      fontSize: '4px',
      fontStyle: 'bold',
      color: '#2e7d32',
    }).setOrigin(0.5).setDepth(8);

    // Animated Green Stink / Odor Wisps (Rising from his head)
    const stinkWisp1 = scene.add.text(beggarX - 8, beggarY - 26, '♨', {
      fontFamily: 'monospace',
      fontSize: '14px',
      fontStyle: 'bold',
      color: '#2e7d32',
    }).setOrigin(0.5).setDepth(14);

    const stinkWisp2 = scene.add.text(beggarX + 8, beggarY - 28, '♨', {
      fontFamily: 'monospace',
      fontSize: '12px',
      fontStyle: 'bold',
      color: '#388e3c',
    }).setOrigin(0.5).setDepth(14);

    const stinkWisp3 = scene.add.text(beggarX, beggarY - 32, '♨', {
      fontFamily: 'monospace',
      fontSize: '16px',
      fontStyle: 'bold',
      color: '#1b5e20',
    }).setOrigin(0.5).setDepth(14);

    // Looping Wavy Stink Animation
    scene.tweens.add({
      targets: [stinkWisp1, stinkWisp2, stinkWisp3],
      y: '-=12',
      alpha: { from: 1, to: 0.1 },
      duration: 1500 + idx * 200,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    // Animated Buzzing Fly
    const fly = scene.add.text(beggarX - 12, beggarY - 20, '•', {
      fontSize: '10px',
      color: '#000000',
    }).setOrigin(0.5).setDepth(15);

    scene.tweens.add({
      targets: fly,
      x: beggarX + 14,
      y: beggarY - 28,
      duration: 900 + idx * 150,
      yoyo: true,
      repeat: -1,
      ease: 'Quad.easeInOut',
    });

    // Floating speech badge
    const beggarBadge = scene.add.text(beggarX, beggarY - 44, loc.badge, {
      fontFamily: 'monospace',
      fontSize: '7.5px',
      fontStyle: 'bold',
      color: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 5, y: 2 },
    }).setOrigin(0.5).setDepth(16);
    beggarBadge.setShadow(0, 1, 'rgba(0,0,0,0.3)', 2);

    // Proximity Zone
    const zone = scene.add.zone(beggarX, beggarY + 6, 80, 80);
    scene.physics.add.existing(zone, true);
    budgetBeggarZones.push(zone);
  });

  // 10. Full-Court 5v5 Moving Basketball Match (Janmark's Hobbies: Basketball)
  const courtX = 580;
  const courtY = 240;

  const courtG = scene.add.graphics();
  courtG.setDepth(4);

  // Full-Court Asphalt Ground
  courtG.fillStyle(0xf0f0f0, 1);
  courtG.lineStyle(2, 0x000000, 1);
  courtG.fillRect(courtX - 110, courtY - 130, 220, 260);
  courtG.strokeRect(courtX - 110, courtY - 130, 220, 260);

  // Half-Court Division Line
  courtG.lineStyle(1.5, 0x000000, 1);
  courtG.lineBetween(courtX - 110, courtY, courtX + 110, courtY);
  // Center Jump Circle
  courtG.strokeCircle(courtX, courtY, 26);

  // North Key & Free-Throw Lane
  courtG.fillStyle(0xe2e2e2, 1);
  courtG.fillRect(courtX - 28, courtY - 130, 56, 65);
  courtG.strokeRect(courtX - 28, courtY - 130, 56, 65);
  courtG.strokeCircle(courtX, courtY - 65, 22);

  // North 3-Point Arc
  courtG.beginPath();
  courtG.arc(courtX, courtY - 130, 75, 0.2, Math.PI - 0.2, false);
  courtG.strokePath();

  // South Key & Free-Throw Lane
  courtG.fillRect(courtX - 28, courtY + 65, 56, 65);
  courtG.strokeRect(courtX - 28, courtY + 65, 56, 65);
  courtG.strokeCircle(courtX, courtY + 65, 22);

  // South 3-Point Arc
  courtG.beginPath();
  courtG.arc(courtX, courtY + 130, 75, Math.PI + 0.2, 2 * Math.PI - 0.2, false);
  courtG.strokePath();

  // North Hoop (Backboard, Rim, Net, Pole)
  courtG.fillStyle(0x000000, 1);
  courtG.fillRect(courtX - 2, courtY - 140, 4, 15);
  courtG.fillStyle(0xffffff, 1);
  courtG.lineStyle(1.5, 0x000000, 1);
  courtG.fillRect(courtX - 20, courtY - 130, 40, 4);
  courtG.strokeRect(courtX - 20, courtY - 130, 40, 4);
  courtG.lineStyle(2, 0xd35400, 1);
  courtG.strokeCircle(courtX, courtY - 118, 7);
  courtG.lineStyle(1, 0x888888, 1);
  courtG.strokeRect(courtX - 5, courtY - 118, 10, 8);

  // South Hoop (Backboard, Rim, Net, Pole)
  courtG.fillStyle(0x000000, 1);
  courtG.fillRect(courtX - 2, courtY + 125, 4, 15);
  courtG.fillStyle(0xffffff, 1);
  courtG.lineStyle(1.5, 0x000000, 1);
  courtG.fillRect(courtX - 20, courtY + 126, 40, 4);
  courtG.strokeRect(courtX - 20, courtY + 126, 40, 4);
  courtG.lineStyle(2, 0xd35400, 1);
  courtG.strokeCircle(courtX, courtY + 118, 7);
  courtG.lineStyle(1, 0x888888, 1);
  courtG.strokeRect(courtX - 5, courtY + 110, 10, 8);

  // Court Title Sign
  const courtBadge = scene.add.text(courtX, courtY - 144, '🏀 FULL-COURT 5v5 · Team White vs Team Black', {
    fontFamily: 'monospace',
    fontSize: '7px',
    fontStyle: 'bold',
    color: '#ffffff',
    backgroundColor: '#000000',
    padding: { x: 5, y: 2 },
  }).setOrigin(0.5).setDepth(16);
  courtBadge.setShadow(0, 1, 'rgba(0,0,0,0.3)', 2);

  // Helper to build an individual pixel player container
  const createPlayerContainer = (
    _name: string,
    jerseyNum: string,
    isWhiteTeam: boolean,
    startX: number,
    startY: number,
  ) => {
    const container = scene.add.container(startX, startY).setDepth(10);
    const pg = scene.add.graphics();

    // Shorts
    pg.fillStyle(isWhiteTeam ? 0x111111 : 0xffffff, 1);
    pg.fillRect(-6, 4, 12, 8);

    // Jersey
    pg.fillStyle(isWhiteTeam ? 0xffffff : 0x111111, 1);
    pg.lineStyle(1, isWhiteTeam ? 0x000000 : 0xffffff, 1);
    pg.fillRect(-7, -8, 14, 12);
    pg.strokeRect(-7, -8, 14, 12);

    // Head / Face
    pg.fillStyle(0xd4a373, 1);
    pg.fillRect(-4, -16, 8, 8);

    // Hair
    pg.fillStyle(0x000000, 1);
    pg.fillRect(-5, -19, 10, 4);

    container.add(pg);

    // Number label on back
    const numLabel = scene.add.text(0, -2, jerseyNum, {
      fontFamily: 'monospace',
      fontSize: '6px',
      fontStyle: 'bold',
      color: isWhiteTeam ? '#000000' : '#ffffff',
    }).setOrigin(0.5);
    container.add(numLabel);

    return container;
  };

  // 10 Moving Players: 5 Team White (Offense) & 5 Team Black (Defense)
  // Team White (Offense)
  const w1 = createPlayerContainer('Janmark', '7', true, courtX, courtY + 20); // PG Janmark
  const w2 = createPlayerContainer('Shooter', '23', true, courtX - 60, courtY - 10); // SG Left Wing
  const w3 = createPlayerContainer('Slasher', '30', true, courtX + 60, courtY - 10); // SF Right Wing
  const w4 = createPlayerContainer('Forward', '11', true, courtX - 35, courtY - 55); // PF High Post
  const w5 = createPlayerContainer('Center', '34', true, courtX + 25, courtY - 70); // C Paint Rebounder

  // Team Black (Defense)
  const b1 = createPlayerContainer('Guard D', '8', false, courtX, courtY); // Defending PG
  const b2 = createPlayerContainer('Wing D1', '24', false, courtX - 52, courtY - 25); // Defending SG
  const b3 = createPlayerContainer('Wing D2', '13', false, courtX + 52, courtY - 25); // Defending SF
  const b4 = createPlayerContainer('Post D', '21', false, courtX - 25, courtY - 65); // Defending PF
  const b5 = createPlayerContainer('Rim D', '15', false, courtX + 15, courtY - 82); // Defending C

  // Autonomous Player Movement Tweens (Players continuously shuffle, cut, set screens & play lateral defense)
  // PG Janmark Dribble Drive
  scene.tweens.add({
    targets: w1,
    x: { from: courtX - 15, to: courtX + 15 },
    y: { from: courtY + 25, to: courtY + 5 },
    duration: 1800,
    yoyo: true,
    repeat: -1,
    ease: 'Sine.easeInOut',
  });

  scene.tweens.add({
    targets: b1,
    x: { from: courtX - 10, to: courtX + 18 },
    y: { from: courtY + 5, to: courtY - 12 },
    duration: 1800,
    yoyo: true,
    repeat: -1,
    ease: 'Sine.easeInOut',
  });

  // Wing SG Cut (w2)
  scene.tweens.add({
    targets: [w2, b2],
    x: '-=20',
    y: '-=15',
    duration: 2200,
    yoyo: true,
    repeat: -1,
    ease: 'Quad.easeInOut',
  });

  // Wing SF Cut (w3)
  scene.tweens.add({
    targets: [w3, b3],
    x: '+=18',
    y: '-=20',
    duration: 2000,
    yoyo: true,
    repeat: -1,
    ease: 'Quad.easeInOut',
  });

  // Big Men in Paint (w4, w5, b4, b5)
  scene.tweens.add({
    targets: [w4, b4],
    x: '+=15',
    duration: 1600,
    yoyo: true,
    repeat: -1,
    ease: 'Sine.easeInOut',
  });

  scene.tweens.add({
    targets: [w5, b5],
    y: '+=12',
    duration: 1400,
    yoyo: true,
    repeat: -1,
    ease: 'Sine.easeInOut',
  });

  // The Basketball Sprite
  const ball = scene.add.circle(courtX, courtY + 15, 4.5, 0xe67e22).setDepth(20);
  ball.setStrokeStyle(1, 0x000000);

  // Shout Speech Bubble (initialized with non-empty string to ensure WebGL canvas context allocation)
  const shoutBubble = scene.add.text(courtX, courtY - 50, 'YES!', {
    fontFamily: 'monospace',
    fontSize: '9px',
    fontStyle: 'bold',
    color: '#ffffff',
    backgroundColor: '#000000',
    padding: { x: 5, y: 2 },
  }).setOrigin(0.5).setDepth(30).setAlpha(0).setVisible(false);

  // Continuous 5v5 Basketball Play Loop (Passing -> Driving -> Shooting -> "YES!" or "YAWA WALA!")
  const run5v5BasketballLoop = () => {
    if (!scene.sys || !ball.active || !shoutBubble.active) return;

    // 1. Pass to Open Shooter on Wing (w2)
    ball.setPosition(w1.x, w1.y - 12);
    ball.setAlpha(1);

    scene.tweens.add({
      targets: ball,
      x: w2.x,
      y: w2.y - 12,
      duration: 500,
      ease: 'Linear',
      onComplete: () => {
        if (!scene.sys || !ball.active) return;

        // 2. Shooter jumps and shoots towards North Rim
        scene.tweens.add({
          targets: w2,
          y: '-=10',
          duration: 300,
          yoyo: true,
        });

        // Defender leaps to contest
        scene.tweens.add({
          targets: b2,
          y: '-=12',
          duration: 350,
          yoyo: true,
        });

        // 3. Ball launches in high arc to Rim
        scene.tweens.add({
          targets: ball,
          x: courtX,
          y: courtY - 118,
          duration: 1100,
          ease: 'Quad.easeOut',
          onComplete: () => {
            if (!scene.sys || !ball.active || !shoutBubble.active) return;

            const isMake = Math.random() > 0.5;

            if (isMake) {
              // Swish! Ball drops through net
              scene.tweens.add({
                targets: ball,
                y: courtY - 90,
                duration: 400,
                ease: 'Bounce.easeOut',
              });

              // Shout "YES!"
              shoutBubble.setPosition(w2.x, w2.y - 30);
              shoutBubble.setText('YES!');
              shoutBubble.setBackgroundColor('#1b5e20');
              shoutBubble.setVisible(true);
              shoutBubble.setAlpha(1);

              // Team celebration hop
              scene.tweens.add({
                targets: [w1, w2, w3],
                y: '-=8',
                duration: 250,
                yoyo: true,
                repeat: 1,
              });
            } else {
              // Brick! Ball clanks off rim with side rebound
              const bounceX = Math.random() > 0.5 ? courtX + 28 : courtX - 28;
              scene.tweens.add({
                targets: ball,
                x: bounceX,
                y: courtY - 75,
                duration: 500,
                ease: 'Bounce.easeOut',
              });

              // Shout "YAWA WALA!"
              shoutBubble.setPosition(w2.x, w2.y - 30);
              shoutBubble.setText('YAWA WALA!');
              shoutBubble.setBackgroundColor('#b71c1c');
              shoutBubble.setVisible(true);
              shoutBubble.setAlpha(1);

              // Center b5 grabs rebound
              scene.tweens.add({
                targets: b5,
                x: bounceX,
                y: courtY - 78,
                duration: 400,
              });
            }

            // Fade out shout bubble
            scene.time.delayedCall(2200, () => {
              if (!scene.sys || !shoutBubble.active) return;
              scene.tweens.add({
                targets: shoutBubble,
                alpha: 0,
                duration: 300,
                onComplete: () => {
                  if (shoutBubble.active) shoutBubble.setVisible(false);
                },
              });
            });

            // Schedule next 5v5 possession in 4.5 seconds
            scene.time.delayedCall(4500, () => {
              if (scene.sys && ball.active) {
                run5v5BasketballLoop();
              }
            });
          },
        });
      },
    });
  };

  // Start 5v5 match loop after 1.5s
  scene.time.delayedCall(1500, () => {
    if (scene.sys && ball.active) {
      run5v5BasketballLoop();
    }
  });

  // Basketball Court Proximity Zone
  const basketballCourtZone = scene.add.zone(courtX, courtY, 230, 270);
  scene.physics.add.existing(basketballCourtZone, true);

  // 11. Outdoor Esports & Gaming Lounge (Janmark's Hobbies: Online Gaming)
  const loungeX = 1480;
  const loungeY = 240;

  const loungeG = scene.add.graphics();
  loungeG.setDepth(4);

  // Pergola Platform Floor
  loungeG.fillStyle(0xf8f8f8, 1);
  loungeG.lineStyle(2, 0x000000, 1);
  loungeG.fillRect(loungeX - 80, loungeY - 60, 160, 120);
  loungeG.strokeRect(loungeX - 80, loungeY - 60, 160, 120);

  // Gaming Desks
  loungeG.fillStyle(0x000000, 1);
  loungeG.fillRect(loungeX - 60, loungeY - 15, 120, 16);

  // PC Monitors with glowing blue/purple screens
  loungeG.fillStyle(0x1a1a1a, 1);
  loungeG.fillRect(loungeX - 45, loungeY - 40, 28, 20);
  loungeG.fillRect(loungeX + 15, loungeY - 40, 28, 20);

  loungeG.fillStyle(0x2196f3, 1);
  loungeG.fillRect(loungeX - 43, loungeY - 38, 24, 16);
  loungeG.fillStyle(0x9c27b0, 1);
  loungeG.fillRect(loungeX + 17, loungeY - 38, 24, 16);

  // Gaming Chairs & Gamers
  const gamer1X = loungeX - 32;
  const gamer1Y = loungeY + 8;
  loungeG.fillStyle(0x333333, 1);
  loungeG.fillRect(gamer1X - 6, gamer1Y, 12, 10);
  loungeG.fillStyle(0xd4a373, 1);
  loungeG.fillRect(gamer1X - 4, gamer1Y - 8, 8, 8);
  // Headset
  loungeG.fillStyle(0x000000, 1);
  loungeG.fillRect(gamer1X - 6, gamer1Y - 9, 12, 3);
  loungeG.fillRect(gamer1X - 6, gamer1Y - 9, 2, 7);
  loungeG.fillRect(gamer1X + 4, gamer1Y - 9, 2, 7);

  const gamer2X = loungeX + 28;
  const gamer2Y = loungeY + 8;
  loungeG.fillStyle(0x1a1a1a, 1);
  loungeG.fillRect(gamer2X - 6, gamer2Y, 12, 10);
  loungeG.fillStyle(0xd4a373, 1);
  loungeG.fillRect(gamer2X - 4, gamer2Y - 8, 8, 8);
  // Headset
  loungeG.fillStyle(0x000000, 1);
  loungeG.fillRect(gamer2X - 6, gamer2Y - 9, 12, 3);
  loungeG.fillRect(gamer2X - 6, gamer2Y - 9, 2, 7);
  loungeG.fillRect(gamer2X + 4, gamer2Y - 9, 2, 7);

  // Lounge Badge
  const loungeBadge = scene.add.text(loungeX, loungeY - 75, '🎮 ESPORTS LOUNGE · Dota 2 · Valorant · ML', {
    fontFamily: 'monospace',
    fontSize: '7px',
    fontStyle: 'bold',
    color: '#ffffff',
    backgroundColor: '#000000',
    padding: { x: 5, y: 2 },
  }).setOrigin(0.5).setDepth(16);
  loungeBadge.setShadow(0, 1, 'rgba(0,0,0,0.3)', 2);

  // Gaming Chat Bubble
  const gamingChat = scene.add.text(loungeX, loungeY - 54, 'DEFEND MID!', {
    fontFamily: 'monospace',
    fontSize: '8px',
    fontStyle: 'bold',
    color: '#ffffff',
    backgroundColor: '#000000',
    padding: { x: 4, y: 2 },
  }).setOrigin(0.5).setDepth(20);

  const gamePhrases = ['DEFEND MID!', 'GG WP!', 'G PA!', 'RUSH B!', 'STACK CAMPS!', 'NICE CLUTCH!'];
  let phraseIdx = 0;
  scene.time.addEvent({
    delay: 3000,
    loop: true,
    callback: () => {
      if (!scene.sys || !gamingChat.active) return;
      phraseIdx = (phraseIdx + 1) % gamePhrases.length;
      gamingChat.setText(gamePhrases[phraseIdx]);
    },
  });

  // Gaming Lounge Proximity Zone
  const gamingLoungeZone = scene.add.zone(loungeX, loungeY, 170, 130);
  scene.physics.add.existing(gamingLoungeZone, true);

  // 11b. Arcade Cabinet in Gaming Lounge
  const arcadeX = 1535;
  const arcadeY = 230;
  const arcG = scene.add.graphics();
  arcG.setDepth(6);
  // Cabinet body
  arcG.fillStyle(0x111111, 1);
  arcG.lineStyle(1.5, 0xf59e0b, 1);
  arcG.fillRect(arcadeX - 12, arcadeY - 24, 24, 36);
  arcG.strokeRect(arcadeX - 12, arcadeY - 24, 24, 36);
  // Screen
  arcG.fillStyle(0x000000, 1);
  arcG.fillRect(arcadeX - 9, arcadeY - 18, 18, 16);
  arcG.fillStyle(0x22c55e, 1);
  arcG.fillRect(arcadeX - 6, arcadeY - 14, 12, 8);
  // Marquee
  arcG.fillStyle(0xf59e0b, 1);
  arcG.fillRect(arcadeX - 10, arcadeY - 23, 20, 4);

  const arcadeBadge = scene.add.text(arcadeX, arcadeY - 34, '🕹️ PLAY RETRO ARCADE', {
    fontFamily: 'monospace',
    fontSize: '6.5px',
    fontStyle: 'bold',
    color: '#ffffff',
    backgroundColor: '#000000',
    padding: { x: 4, y: 1.5 },
  }).setOrigin(0.5).setDepth(16);
  arcadeBadge.setShadow(0, 1, 'rgba(0,0,0,0.3)', 2);

  const arcadeCabinetZone = scene.add.zone(arcadeX, arcadeY + 4, 60, 60);
  scene.physics.add.existing(arcadeCabinetZone, true);

  // 12. Developer Fuel Coffee & Boba Cart (Central Plaza Left: x: 820, y: 560)
  const cafeX = 820;
  const cafeY = 560;
  const cafeG = scene.add.graphics();
  cafeG.setDepth(6);

  // Wooden Cart Base
  cafeG.fillStyle(0x27272a, 1);
  cafeG.lineStyle(1.5, 0x000000, 1);
  cafeG.fillRect(cafeX - 25, cafeY - 10, 50, 26);
  cafeG.strokeRect(cafeX - 25, cafeY - 10, 50, 26);

  // Striped Awning (Amber & White)
  for (let s = 0; s < 5; s++) {
    cafeG.fillStyle(s % 2 === 0 ? 0xf59e0b : 0xffffff, 1);
    cafeG.fillRect(cafeX - 25 + s * 10, cafeY - 26, 10, 10);
  }
  cafeG.strokeRect(cafeX - 25, cafeY - 26, 50, 10);

  // Awning Poles
  cafeG.fillStyle(0x000000, 1);
  cafeG.fillRect(cafeX - 24, cafeY - 16, 2, 12);
  cafeG.fillRect(cafeX + 22, cafeY - 16, 2, 12);

  // Espresso Machine & Cups
  cafeG.fillStyle(0xd4d4d8, 1);
  cafeG.fillRect(cafeX - 16, cafeY - 16, 12, 10);
  cafeG.fillStyle(0xffffff, 1);
  cafeG.fillRect(cafeX + 4, cafeY - 12, 5, 6);
  cafeG.fillRect(cafeX + 11, cafeY - 12, 5, 6);

  // Animated Rising Coffee Steam (☕)
  const steam = scene.add.text(cafeX - 10, cafeY - 22, '♨️', {
    fontSize: '9px',
  }).setOrigin(0.5).setDepth(15);
  scene.tweens.add({
    targets: steam,
    y: cafeY - 30,
    alpha: { from: 1, to: 0.2 },
    duration: 1200,
    repeat: -1,
    ease: 'Sine.easeOut',
  });

  const cafeBadge = scene.add.text(cafeX, cafeY - 38, '☕ DEVELOPER FUEL · Coffee & Boba Cart', {
    fontFamily: 'monospace',
    fontSize: '6.5px',
    fontStyle: 'bold',
    color: '#ffffff',
    backgroundColor: '#000000',
    padding: { x: 4, y: 1.5 },
  }).setOrigin(0.5).setDepth(16);
  cafeBadge.setShadow(0, 1, 'rgba(0,0,0,0.3)', 2);

  const coffeeCartZone = scene.add.zone(cafeX, cafeY + 5, 80, 80);
  scene.physics.add.existing(coffeeCartZone, true);

  // 13. AI Janmark Digital Clone Standing Desk (Right edge exterior of Collab HQ: x: 1290, y: 260)
  const npcX = 1290;
  const npcY = 260;
  const npcG = scene.add.graphics();
  npcG.setDepth(6);

  // Modern Standing Desk
  npcG.fillStyle(0x18181b, 1);
  npcG.lineStyle(1.5, 0x000000, 1);
  npcG.fillRect(npcX - 22, npcY - 8, 44, 18);
  npcG.strokeRect(npcX - 22, npcY - 8, 44, 18);

  // Dual Glowing Monitors
  npcG.fillStyle(0x38bdf8, 1);
  npcG.fillRect(npcX - 16, npcY - 24, 14, 12);
  npcG.fillStyle(0xa855f7, 1);
  npcG.fillRect(npcX + 2, npcY - 24, 14, 12);

  // Janmark NPC Character
  npcG.fillStyle(0x111111, 1); // Dark shirt
  npcG.fillRect(npcX - 6, npcY - 2, 12, 14);
  npcG.fillStyle(0xd4a373, 1); // Face
  npcG.fillRect(npcX - 4, npcY - 10, 8, 8);
  npcG.fillStyle(0x000000, 1); // Hair
  npcG.fillRect(npcX - 5, npcY - 13, 10, 4);

  const aiBadge = scene.add.text(npcX, npcY - 38, '💬 TALK TO AI JANMARK (Digital Clone)', {
    fontFamily: 'monospace',
    fontSize: '7px',
    fontStyle: 'bold',
    color: '#ffffff',
    backgroundColor: '#000000',
    padding: { x: 5, y: 2 },
  }).setOrigin(0.5).setDepth(16);
  aiBadge.setShadow(0, 1, 'rgba(0,0,0,0.3)', 2);

  const aiJanmarkZone = scene.add.zone(npcX, npcY + 5, 80, 80);
  scene.physics.add.existing(aiJanmarkZone, true);

  // 14. Scavenger Hunt 4 Collectibles (Campus Explorer Quest)
  const questItems = [
    { id: 'golden-git', label: '⭐ Golden Git Commit', x: 180, y: 150, color: 0xf59e0b },
    { id: 'supabase-token', label: '⚡ Supabase Token', x: 1980, y: 150, color: 0x10b981 },
    { id: 'basketball-trophy', label: '🏆 3v3 Trophy', x: 690, y: 280, color: 0xeab308 },
    { id: 'missing-semicolon', label: '🔣 Missing Semicolon', x: 1580, y: 300, color: 0x3b82f6 },
  ];

  const questStampZones: Array<{ id: string; zone: Phaser.GameObjects.Zone }> = [];

  questItems.forEach((item) => {
    const itemG = scene.add.graphics();
    itemG.setDepth(6);
    itemG.fillStyle(item.color, 1);
    itemG.lineStyle(1.5, 0x000000, 1);
    itemG.fillCircle(item.x, item.y, 7);
    itemG.strokeCircle(item.x, item.y, 7);

    const badge = scene.add.text(item.x, item.y - 16, item.label, {
      fontFamily: 'monospace',
      fontSize: '6px',
      fontStyle: 'bold',
      color: '#ffffff',
      backgroundColor: '#000000',
      padding: { x: 3, y: 1 },
    }).setOrigin(0.5).setDepth(16);

    // Subtle bobbing animation
    scene.tweens.add({
      targets: badge,
      y: item.y - 20,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    });

    const qZone = scene.add.zone(item.x, item.y, 60, 60);
    scene.physics.add.existing(qZone, true);
    questStampZones.push({ id: item.id, zone: qZone });
  });

  return {
    buildingZones,
    budgetBeggarZones,
    basketballCourtZone,
    gamingLoungeZone,
    coffeeCartZone,
    arcadeCabinetZone,
    aiJanmarkZone,
    questStampZones,
  };
}

