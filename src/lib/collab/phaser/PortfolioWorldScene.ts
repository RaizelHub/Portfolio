import Phaser from 'phaser';
import {
  getBuildingEntranceSpawn,
  PLAYER_SPEED,
  SPEECH_DURATION_MS,
  WORLD_HEIGHT,
  WORLD_WIDTH,
  isPositionSafe,
} from '../constants';
import type {
  CharacterId,
  Direction,
  RemotePlayerState,
  WorldReaction,
  WorldSpeech,
} from '../types';
import type { Project } from '../../../types';
import type { WorldBuilding } from '../worldConfig';
import { buildCampusEnvironment } from './campusEnvironment';
import {
  buildBuildingInteriorEnvironment,
  INTERIOR_HEIGHT,
  INTERIOR_WIDTH,
} from './buildingInteriorEnvironment';
import { generateCharacterTextures } from './spriteGenerator';
import { sanitizeUserText } from '../service';

export type WorldSceneEvents = {
  onBuildingProximity: (building: WorldBuilding | null) => void;
  onProjectBranchProximity: (data: { project: Project; isWIP: boolean } | null) => void;
  onExitDoorwayProximity: (nearExit: boolean) => void;
  onBudgetBeggarProximity: (nearBeggar: boolean) => void;
  onBasketballProximity?: (near: boolean) => void;
  onGamingLoungeProximity?: (near: boolean) => void;
  onCoffeeCartProximity?: (near: boolean) => void;
  onArcadeCabinetProximity?: (near: boolean) => void;
  onAiJanmarkProximity?: (near: boolean) => void;
  onQuestStampFound?: (stampId: string) => void;
  onPlayerMoved: (x: number, y: number, direction: Direction, moving: boolean) => void;
  onCheckpointTrigger: (x: number, y: number, direction: Direction) => void;
  onFootstep?: (stepIndex: number) => void;
};

type RemotePlayerEntity = {
  sprite: Phaser.Physics.Arcade.Sprite;
  nameLabel: Phaser.GameObjects.Text;
  bubbleContainer: Phaser.GameObjects.Container;
  bubbleText?: Phaser.GameObjects.Text;
  emoteText?: Phaser.GameObjects.Text;
  targetX: number;
  targetY: number;
  currentDirection: Direction;
  isMoving: boolean;
  lastUpdate: number;
  speechTimer?: Phaser.Time.TimerEvent;
};

export class PortfolioWorldScene extends Phaser.Scene {
  private localCharacterId: CharacterId = 'male_01';
  private localVisitorName = 'Visitor';
  private spawnCoordinates = { x: 1100, y: 640 };
  private initialDirection: Direction = 'down';

  private player!: Phaser.Physics.Arcade.Sprite;
  private playerNameLabel!: Phaser.GameObjects.Text;
  private playerBubbleContainer!: Phaser.GameObjects.Container;
  private currentDirection: Direction = 'down';
  private isMoving = false;

  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasdKeys!: {
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
  };

  // Environment Mode ('campus' | 'interior')
  private currentMode: 'campus' | 'interior' = 'campus';
  private currentInteriorBuilding: WorldBuilding | null = null;

  // Campus Structures
  private collisionGroup!: Phaser.Physics.Arcade.StaticGroup;
  private playerCollider: Phaser.Physics.Arcade.Collider | null = null;
  private buildingZones: Array<{ building: WorldBuilding; zone: Phaser.GameObjects.Zone }> = [];
  private budgetBeggarZones: Phaser.GameObjects.Zone[] = [];
  private basketballCourtZone: Phaser.GameObjects.Zone | null = null;
  private gamingLoungeZone: Phaser.GameObjects.Zone | null = null;
  private coffeeCartZone: Phaser.GameObjects.Zone | null = null;
  private arcadeCabinetZone: Phaser.GameObjects.Zone | null = null;
  private aiJanmarkZone: Phaser.GameObjects.Zone | null = null;
  private questStampZones: Array<{ id: string; zone: Phaser.GameObjects.Zone }> = [];

  private activeNearBuilding: WorldBuilding | null = null;
  private isNearBudgetBeggar = false;
  private isNearBasketball = false;
  private isNearGamingLounge = false;
  private isNearCoffeeCart = false;
  private isNearArcadeCabinet = false;
  private isNearAiJanmark = false;

  // Scavenger Hunt: tracks stamps already emitted this session so we only fire once
  private emittedQuestStamps = new Set<string>();

  // Developer Fuel Speed Buff & Trail
  private activeSpeedMultiplier = 1;
  private speedBuffExpiresAt = 0;
  private activeTrailColor = 0xf59e0b;
  private trailTimer = 0;

  // Interior Hall Structures
  private interiorProjectZones: Array<{ project: Project; isWIP: boolean; zone: Phaser.GameObjects.Zone }> = [];
  private interiorExitZone: Phaser.GameObjects.Zone | null = null;
  private activeNearProjectBranch: { project: Project; isWIP: boolean } | null = null;
  private isNearExitDoorway = false;

  private eventsBridge: WorldSceneEvents | null = null;
  private remotePlayers = new Map<string, RemotePlayerEntity>();
  private targetPointer: { x: number; y: number } | null = null;
  private tapIndicator!: Phaser.GameObjects.Graphics;

  private lastBroadcastX = 0;
  private lastBroadcastY = 0;
  private lastBroadcastMoving = false;
  private lastBroadcastDirection: Direction = 'down';

  private lastFootstepTime = 0;
  private footstepCounter = 0;
  private activeKeys = new Set<string>();
  private isModalPaused = false;

  private handleWindowKeyDown = (e: KeyboardEvent) => {
    const activeEl = document.activeElement;
    if (
      activeEl instanceof HTMLInputElement ||
      activeEl instanceof HTMLTextAreaElement ||
      (activeEl && activeEl.getAttribute('contenteditable') === 'true')
    ) {
      return;
    }
    const key = e.key.toLowerCase();
    const code = e.code.toLowerCase();
    if (
      ['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key) ||
      ['keyw', 'keya', 'keys', 'keyd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(code)
    ) {
      this.activeKeys.add(code);
      this.activeKeys.add(key);
    }
  };

  private handleWindowKeyUp = (e: KeyboardEvent) => {
    const key = e.key.toLowerCase();
    const code = e.code.toLowerCase();
    this.activeKeys.delete(code);
    this.activeKeys.delete(key);
  };

  private handleWindowBlur = () => {
    this.activeKeys.clear();
  };

  constructor() {
    super({ key: 'PortfolioWorldScene' });
  }

  public init(data: {
    characterId: CharacterId;
    visitorName: string;
    spawnX?: number;
    spawnY?: number;
    direction?: Direction;
    events: WorldSceneEvents;
  }): void {
    this.localCharacterId = data.characterId || 'male_01';
    this.localVisitorName = data.visitorName || 'Visitor';
    this.currentDirection = data.direction || 'down';
    this.initialDirection = data.direction || 'down';
    this.eventsBridge = data.events;

    if (typeof data.spawnX === 'number' && typeof data.spawnY === 'number') {
      if (isPositionSafe(data.spawnX, data.spawnY)) {
        this.spawnCoordinates = { x: data.spawnX, y: data.spawnY };
      }
    }
  }

  public preload(): void {
    generateCharacterTextures(this);
  }

  public create(): void {
    // Attach window keyboard listeners for 100% reliable movement across modals & DOM blur
    window.addEventListener('keydown', this.handleWindowKeyDown, { passive: true });
    window.addEventListener('keyup', this.handleWindowKeyUp, { passive: true });
    window.addEventListener('blur', this.handleWindowBlur);

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      window.removeEventListener('keydown', this.handleWindowKeyDown);
      window.removeEventListener('keyup', this.handleWindowKeyUp);
      window.removeEventListener('blur', this.handleWindowBlur);
    });

    this.events.once(Phaser.Scenes.Events.DESTROY, () => {
      window.removeEventListener('keydown', this.handleWindowKeyDown);
      window.removeEventListener('keyup', this.handleWindowKeyUp);
      window.removeEventListener('blur', this.handleWindowBlur);
    });

    // 1. Static Physics Collision Group
    this.collisionGroup = this.physics.add.staticGroup();

    // 2. Register Animations
    this.createCharacterAnimations('male_01');
    this.createCharacterAnimations('female_01');

    // 3. Build Initial Campus Environment
    this.buildCampusMode();

    // 4. Create Local Player
    this.createLocalPlayer();

    // 5. Tap-to-move Indicator
    this.tapIndicator = this.add.graphics().setDepth(3);
    this.tapIndicator.setVisible(false);

    // 6. Keyboard Controls
    if (this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
      this.wasdKeys = this.input.keyboard.addKeys('W,A,S,D') as typeof this.wasdKeys;
      // Clear key capture so typing in CLI or Chat inputs is never blocked
      this.input.keyboard.clearCaptures();
    }

    // 7. Pointer Tap-to-Move
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      if (this.isModalPaused) return;
      if (pointer.button === 0) {
        const worldPoint = this.cameras.main.getWorldPoint(pointer.x, pointer.y);
        this.setMoveTarget(worldPoint.x, worldPoint.y);
      }
    });

    // 8. Checkpoint Timer
    this.time.addEvent({
      delay: 15_000,
      loop: true,
      callback: () => {
        if (this.player && this.eventsBridge) {
          this.eventsBridge.onCheckpointTrigger(
            Math.round(this.player.x),
            Math.round(this.player.y),
            this.currentDirection,
          );
        }
      },
    });
  }

  private buildCampusMode(): void {
    this.currentMode = 'campus';
    this.currentInteriorBuilding = null;
    this.interiorProjectZones = [];
    this.interiorExitZone = null;

    // Reset physics bounds to outdoor map
    this.physics.world.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);
    this.cameras.main.setBounds(0, 0, WORLD_WIDTH, WORLD_HEIGHT);

    // Build Campus Graphics & Colliders
    const {
      buildingZones,
      budgetBeggarZones,
      basketballCourtZone,
      gamingLoungeZone,
      coffeeCartZone,
      arcadeCabinetZone,
      aiJanmarkZone,
      questStampZones,
    } = buildCampusEnvironment(this, this.collisionGroup);

    this.buildingZones = buildingZones;
    this.budgetBeggarZones = budgetBeggarZones;
    this.basketballCourtZone = basketballCourtZone;
    this.gamingLoungeZone = gamingLoungeZone;
    this.coffeeCartZone = coffeeCartZone;
    this.arcadeCabinetZone = arcadeCabinetZone;
    this.aiJanmarkZone = aiJanmarkZone;
    this.questStampZones = questStampZones;
  }

  public setModalOpen(isOpen: boolean): void {
    this.isModalPaused = isOpen;
    this.resetInputs();
  }

  public resetInputs(): void {
    this.activeKeys.clear();
    this.targetPointer = null;
    this.tapIndicator?.setVisible(false);
    if (this.input?.keyboard) {
      this.input.keyboard.resetKeys();
    }
    if (this.player) {
      this.player.setVelocity(0, 0);
      if (this.isMoving) {
        this.isMoving = false;
        this.player.play(`${this.localCharacterId}_idle_${this.currentDirection}`, true);
      }
    }
  }

  public setSpeedMultiplier(multiplier: number, trailColor: number, durationMs: number): void {
    this.activeSpeedMultiplier = multiplier;
    this.activeTrailColor = trailColor;
    this.speedBuffExpiresAt = Date.now() + durationMs;
  }

  public enterBuilding(building: WorldBuilding): void {
    this.currentMode = 'interior';
    this.currentInteriorBuilding = building;
    this.activeNearBuilding = null;
    this.eventsBridge?.onBuildingProximity(null);

    // 1. Clear previous non-player game objects and colliders
    this.clearWorldObjects();

    // 2. Set Physics & Camera Bounds for Interior Hall
    this.physics.world.setBounds(0, 0, INTERIOR_WIDTH, INTERIOR_HEIGHT);
    this.cameras.main.setBounds(0, 0, INTERIOR_WIDTH, INTERIOR_HEIGHT);

    // 3. Build Interior Exhibition Room
    const result = buildBuildingInteriorEnvironment(this, this.collisionGroup, building);
    this.interiorProjectZones = result.projectZones;
    this.interiorExitZone = result.exitZone;

    // 4. Place Player at Interior Doorway Entrance facing UP
    if (this.player) {
      this.player.setPosition(INTERIOR_WIDTH / 2, INTERIOR_HEIGHT - 120);
      this.currentDirection = 'up';
      this.player.setVelocity(0, 0);
      this.player.play(`${this.localCharacterId}_idle_up`, true);
      this.targetPointer = null;
      this.tapIndicator.setVisible(false);
    }
  }

  public exitToCampus(): void {
    if (!this.currentInteriorBuilding) {
      this.buildCampusMode();
      return;
    }

    const prevBuilding = this.currentInteriorBuilding;
    const doorSpawn = getBuildingEntranceSpawn(prevBuilding.id);

    // 1. Clear interior objects
    this.clearWorldObjects();

    // 2. Rebuild Campus Environment
    this.buildCampusMode();

    // 3. Place Player Outside Building Doorway
    if (this.player) {
      this.player.setPosition(doorSpawn.x, doorSpawn.y);
      this.currentDirection = 'down';
      this.player.setVelocity(0, 0);
      this.player.play(`${this.localCharacterId}_idle_down`, true);
      this.targetPointer = null;
      this.tapIndicator.setVisible(false);
    }

    this.eventsBridge?.onProjectBranchProximity(null);
    this.eventsBridge?.onExitDoorwayProximity(false);
  }

  private clearWorldObjects(): void {
    // Clear static collision bodies
    this.collisionGroup.clear(true, true);

    // Safely destroy and clear all remote players so updateRemotePlayers never accesses destroyed objects
    this.remotePlayers.forEach((entity) => {
      try {
        if (entity.sprite?.active) entity.sprite.destroy();
        if (entity.nameLabel?.active) entity.nameLabel.destroy();
        if (entity.bubbleContainer?.active) entity.bubbleContainer.destroy();
      } catch {
        // ignore
      }
    });
    this.remotePlayers.clear();

    // Destroy all other graphics/text/zones except player, name, bubble and tapIndicator
    const children = this.children.getChildren().slice();
    children.forEach((child) => {
      if (
        child !== this.player &&
        child !== this.playerNameLabel &&
        child !== this.playerBubbleContainer &&
        child !== this.tapIndicator
      ) {
        try {
          child.destroy();
        } catch {
          // ignore
        }
      }
    });
  }

  private createCharacterAnimations(characterId: CharacterId): void {
    const directions = ['down', 'up', 'left', 'right'] as const;

    directions.forEach((direction) => {
      const idleKey = `${characterId}_idle_${direction}`;
      if (!this.anims.exists(idleKey)) {
        this.anims.create({
          key: idleKey,
          frames: [{ key: `char_${characterId}_${direction}_0` }],
          frameRate: 1,
        });
      }

      const walkKey = `${characterId}_walk_${direction}`;
      if (!this.anims.exists(walkKey)) {
        this.anims.create({
          key: walkKey,
          frames: [
            { key: `char_${characterId}_${direction}_1` },
            { key: `char_${characterId}_${direction}_0` },
            { key: `char_${characterId}_${direction}_3` },
            { key: `char_${characterId}_${direction}_2` },
          ],
          frameRate: 8,
          repeat: -1,
        });
      }
    });
  }

  private createLocalPlayer(): void {
    this.player = this.physics.add.sprite(
      this.spawnCoordinates.x,
      this.spawnCoordinates.y,
      `char_${this.localCharacterId}_${this.initialDirection}_0`,
    );

    this.player.setDepth(15);
    this.player.setCollideWorldBounds(true);
    this.player.body?.setSize(22, 18);
    this.player.body?.setOffset(9, 36);

    if (this.playerCollider) {
      this.physics.world.removeCollider(this.playerCollider);
      this.playerCollider = null;
    }
    this.playerCollider = this.physics.add.collider(this.player, this.collisionGroup);

    // Player Name Badge
    this.playerNameLabel = this.add.text(this.player.x, this.player.y - 36, this.localVisitorName, {
      fontFamily: 'monospace',
      fontSize: '11px',
      fontStyle: 'bold',
      color: '#000000',
      backgroundColor: '#ffffff',
      padding: { x: 5, y: 2 },
    }).setOrigin(0.5).setDepth(25);
    this.playerNameLabel.setShadow(0, 1, 'rgba(0,0,0,0.2)', 2);

    this.playerBubbleContainer = this.add.container(this.player.x, this.player.y - 54).setDepth(26);
    this.player.play(`${this.localCharacterId}_idle_${this.initialDirection}`);

    // Camera follow
    this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
    this.cameras.main.setZoom(1);
  }

  public setLocalCharacter(characterId: CharacterId): void {
    if (this.localCharacterId === characterId) return;
    this.localCharacterId = characterId;
    if (this.player) {
      const animKey = `${characterId}_${this.isMoving ? 'walk' : 'idle'}_${this.currentDirection}`;
      this.player.play(animKey, true);
    }
  }

  public setMoveTarget(targetX: number, targetY: number): void {
    const maxX = this.currentMode === 'campus' ? WORLD_WIDTH : INTERIOR_WIDTH;
    const maxY = this.currentMode === 'campus' ? WORLD_HEIGHT : INTERIOR_HEIGHT;

    const clampedX = Phaser.Math.Clamp(targetX, 20, maxX - 20);
    const clampedY = Phaser.Math.Clamp(targetY, 20, maxY - 20);
    this.targetPointer = { x: clampedX, y: clampedY };

    this.tapIndicator.clear();
    this.tapIndicator.lineStyle(2, 0x000000, 0.9);
    this.tapIndicator.strokeCircle(clampedX, clampedY, 14);
    this.tapIndicator.fillStyle(0x000000, 0.2);
    this.tapIndicator.fillCircle(clampedX, clampedY, 6);
    this.tapIndicator.setPosition(0, 0);
    this.tapIndicator.setVisible(true);

    this.tweens.add({
      targets: this.tapIndicator,
      alpha: { from: 1, to: 0 },
      scale: { from: 0.8, to: 1.4 },
      duration: 500,
      onComplete: () => {
        this.tapIndicator.setVisible(false);
        this.tapIndicator.setAlpha(1);
        this.tapIndicator.setScale(1);
      },
    });
  }

  public update(): void {
    if (!this.player) return;

    if (this.isModalPaused) {
      this.player.setVelocity(0, 0);
      if (this.isMoving) {
        this.isMoving = false;
        this.player.play(`${this.localCharacterId}_idle_${this.currentDirection}`, true);
      }
      return;
    }

    // If an input/textarea (like CLI or Chat) is focused in the DOM, do not move player
    const activeEl = document.activeElement;
    const isInputFocused =
      activeEl instanceof HTMLInputElement ||
      activeEl instanceof HTMLTextAreaElement ||
      (activeEl && activeEl.getAttribute('contenteditable') === 'true');

    if (isInputFocused) {
      this.player.setVelocity(0, 0);
      if (this.isMoving) {
        this.isMoving = false;
        this.player.play(`${this.localCharacterId}_idle_${this.currentDirection}`, true);
      }
      return;
    }

    let vx = 0;
    let vy = 0;

    // Check speed buff expiration
    if (this.speedBuffExpiresAt > 0 && Date.now() > this.speedBuffExpiresAt) {
      this.activeSpeedMultiplier = 1;
      this.speedBuffExpiresAt = 0;
    }
    const currentSpeed = PLAYER_SPEED * this.activeSpeedMultiplier;

    const left =
      this.activeKeys.has('keya') ||
      this.activeKeys.has('arrowleft') ||
      this.activeKeys.has('a') ||
      Boolean(this.cursors?.left?.isDown) ||
      Boolean(this.wasdKeys?.A?.isDown);

    const right =
      this.activeKeys.has('keyd') ||
      this.activeKeys.has('arrowright') ||
      this.activeKeys.has('d') ||
      Boolean(this.cursors?.right?.isDown) ||
      Boolean(this.wasdKeys?.D?.isDown);

    const up =
      this.activeKeys.has('keyw') ||
      this.activeKeys.has('arrowup') ||
      this.activeKeys.has('w') ||
      Boolean(this.cursors?.up?.isDown) ||
      Boolean(this.wasdKeys?.W?.isDown);

    const down =
      this.activeKeys.has('keys') ||
      this.activeKeys.has('arrowdown') ||
      this.activeKeys.has('s') ||
      Boolean(this.cursors?.down?.isDown) ||
      Boolean(this.wasdKeys?.S?.isDown);

    if (left || right || up || down) {
      this.targetPointer = null;
      if (left) vx -= currentSpeed;
      if (right) vx += currentSpeed;
      if (up) vy -= currentSpeed;
      if (down) vy += currentSpeed;

      if (vx !== 0 && vy !== 0) {
        vx *= 0.7071;
        vy *= 0.7071;
      }
    } else if (this.targetPointer) {
      const dx = this.targetPointer.x - this.player.x;
      const dy = this.targetPointer.y - this.player.y;
      const dist = Math.hypot(dx, dy);

      if (dist > 8) {
        vx = (dx / dist) * currentSpeed;
        vy = (dy / dist) * currentSpeed;
      } else {
        this.targetPointer = null;
      }
    }

    this.player.setVelocity(vx, vy);

    const moving = vx !== 0 || vy !== 0;
    let newDirection = this.currentDirection;

    // Speed buff trailing particle effect
    if (moving && this.activeSpeedMultiplier > 1) {
      const now = Date.now();
      if (now - this.trailTimer > 90) {
        this.trailTimer = now;
        const trailDot = this.add.circle(
          this.player.x + (Math.random() - 0.5) * 8,
          this.player.y + 6 + (Math.random() - 0.5) * 4,
          3,
          this.activeTrailColor,
        ).setDepth(11);
        this.tweens.add({
          targets: trailDot,
          alpha: 0,
          scale: 0.2,
          duration: 350,
          onComplete: () => trailDot.destroy(),
        });
      }
    }

    if (moving) {
      if (Math.abs(vx) > Math.abs(vy)) {
        newDirection = vx > 0 ? 'right' : 'left';
      } else {
        newDirection = vy > 0 ? 'down' : 'up';
      }

      // Footstep sound cadence (~270ms interval)
      const now = Date.now();
      if (now - this.lastFootstepTime >= 270) {
        this.lastFootstepTime = now;
        this.footstepCounter++;
        this.eventsBridge?.onFootstep?.(this.footstepCounter);
      }
    }

    const stateChanged = moving !== this.isMoving || newDirection !== this.currentDirection;
    this.isMoving = moving;
    this.currentDirection = newDirection;

    if (stateChanged) {
      const animKey = `${this.localCharacterId}_${moving ? 'walk' : 'idle'}_${newDirection}`;
      this.player.play(animKey, true);
    }

    this.playerNameLabel.setPosition(this.player.x, this.player.y - 36);
    this.playerBubbleContainer.setPosition(this.player.x, this.player.y - 54);

    // Mode-specific Proximity Checks
    if (this.currentMode === 'campus') {
      this.checkBuildingProximity();
    } else {
      this.checkInteriorProximity();
    }

    // Broadcast movement updates
    const movedFar =
      Math.hypot(this.player.x - this.lastBroadcastX, this.player.y - this.lastBroadcastY) > 3;
    if (movedFar || moving !== this.lastBroadcastMoving || newDirection !== this.lastBroadcastDirection) {
      this.lastBroadcastX = this.player.x;
      this.lastBroadcastY = this.player.y;
      this.lastBroadcastMoving = moving;
      this.lastBroadcastDirection = newDirection;

      this.eventsBridge?.onPlayerMoved(
        Math.round(this.player.x),
        Math.round(this.player.y),
        newDirection,
        moving,
      );
    }

    this.updateRemotePlayers();
  }

  private checkBuildingProximity(): void {
    let nearestBuilding: WorldBuilding | null = null;
    const px = this.player.x;
    const py = this.player.y;

    for (const bz of this.buildingZones) {
      const bounds = bz.zone.getBounds();
      if (bounds.contains(px, py)) {
        nearestBuilding = bz.building;
        break;
      }
    }

    if (nearestBuilding !== this.activeNearBuilding) {
      this.activeNearBuilding = nearestBuilding;
      this.eventsBridge?.onBuildingProximity(nearestBuilding);
    }

    // Check Budget Beggar Easter Egg Proximity (outside Subora & Vocara)
    let nearBeggar = false;
    for (const bz of this.budgetBeggarZones) {
      const bBounds = bz.getBounds();
      if (bBounds.contains(px, py)) {
        nearBeggar = true;
        break;
      }
    }

    if (nearBeggar !== this.isNearBudgetBeggar) {
      this.isNearBudgetBeggar = nearBeggar;
      this.eventsBridge?.onBudgetBeggarProximity(nearBeggar);
    }

    // Check Basketball Court Proximity
    let nearBball = false;
    if (this.basketballCourtZone) {
      if (this.basketballCourtZone.getBounds().contains(px, py)) {
        nearBball = true;
      }
    }
    if (nearBball !== this.isNearBasketball) {
      this.isNearBasketball = nearBball;
      this.eventsBridge?.onBasketballProximity?.(nearBball);
    }

    // Check Gaming Lounge Proximity
    let nearGaming = false;
    if (this.gamingLoungeZone) {
      if (this.gamingLoungeZone.getBounds().contains(px, py)) {
        nearGaming = true;
      }
    }
    if (nearGaming !== this.isNearGamingLounge) {
      this.isNearGamingLounge = nearGaming;
      this.eventsBridge?.onGamingLoungeProximity?.(nearGaming);
    }

    // Check Coffee / Boba Cart Proximity
    let nearCoffee = false;
    if (this.coffeeCartZone) {
      if (this.coffeeCartZone.getBounds().contains(px, py)) {
        nearCoffee = true;
      }
    }
    if (nearCoffee !== this.isNearCoffeeCart) {
      this.isNearCoffeeCart = nearCoffee;
      this.eventsBridge?.onCoffeeCartProximity?.(nearCoffee);
    }

    // Check Arcade Cabinet Proximity
    let nearArcade = false;
    if (this.arcadeCabinetZone) {
      if (this.arcadeCabinetZone.getBounds().contains(px, py)) {
        nearArcade = true;
      }
    }
    if (nearArcade !== this.isNearArcadeCabinet) {
      this.isNearArcadeCabinet = nearArcade;
      this.eventsBridge?.onArcadeCabinetProximity?.(nearArcade);
    }

    // Check AI Janmark Digital Clone Proximity
    let nearAi = false;
    if (this.aiJanmarkZone) {
      if (this.aiJanmarkZone.getBounds().contains(px, py)) {
        nearAi = true;
      }
    }
    if (nearAi !== this.isNearAiJanmark) {
      this.isNearAiJanmark = nearAi;
      this.eventsBridge?.onAiJanmarkProximity?.(nearAi);
    }

    // Check Scavenger Hunt Stamp Zones — fire only ONCE per stamp (not every frame)
    for (const qz of this.questStampZones) {
      if (!this.emittedQuestStamps.has(qz.id) && qz.zone.getBounds().contains(px, py)) {
        this.emittedQuestStamps.add(qz.id);
        this.eventsBridge?.onQuestStampFound?.(qz.id);
      }
    }
  }

  private checkInteriorProximity(): void {
    const px = this.player.x;
    const py = this.player.y;

    // 1. Check Project Branch Booths
    let foundZone: { project: Project; isWIP: boolean } | null = null;
    for (const pz of this.interiorProjectZones) {
      const bounds = pz.zone.getBounds();
      if (bounds.contains(px, py)) {
        foundZone = { project: pz.project, isWIP: pz.isWIP };
        break;
      }
    }

    const prevId = this.activeNearProjectBranch?.project?.id ?? null;
    const nextId = foundZone?.project?.id ?? null;

    if (prevId !== nextId) {
      this.activeNearProjectBranch = foundZone;
      this.eventsBridge?.onProjectBranchProximity(foundZone);
    }

    // 2. Check Exit Doorway
    let nearExit = false;
    if (this.interiorExitZone) {
      const exitBounds = this.interiorExitZone.getBounds();
      if (exitBounds.contains(px, py)) {
        nearExit = true;
      }
    }

    if (nearExit !== this.isNearExitDoorway) {
      this.isNearExitDoorway = nearExit;
      this.eventsBridge?.onExitDoorwayProximity(nearExit);
    }
  }

  public handleRemotePlayerMove(remote: RemotePlayerState): void {
    if (!remote || !remote.visitorId || typeof remote.visitorId !== 'string') return;

    try {
      const isInterior = this.currentMode === 'interior';
      const maxX = isInterior ? INTERIOR_WIDTH - 20 : WORLD_WIDTH - 20;
      const maxY = isInterior ? INTERIOR_HEIGHT - 20 : WORLD_HEIGHT - 20;

      // Coordinate bounds validation & clamping
      const targetX = Math.max(20, Math.min(maxX, Number(remote.x) || 1100));
      const targetY = Math.max(20, Math.min(maxY, Number(remote.y) || 640));
      const safeName = sanitizeUserText(remote.name || 'Visitor', 24) || 'Visitor';

      let entity = this.remotePlayers.get(remote.visitorId);
      if (entity && (!entity.sprite?.active || !entity.nameLabel?.active || !entity.bubbleContainer?.active)) {
        this.remotePlayers.delete(remote.visitorId);
        entity = undefined;
      }

      if (!entity) {
        // Enforce maximum remote players in scene (anti-DoS limit)
        if (this.remotePlayers.size >= 40) return;

        const charId: CharacterId = remote.characterId === 'female_01' ? 'female_01' : 'male_01';
        const sprite = this.physics.add.sprite(
          targetX,
          targetY,
          `char_${charId}_${remote.direction || 'down'}_0`,
        );
        sprite.setDepth(14);

        const nameLabel = this.add.text(targetX, targetY - 36, safeName, {
          fontFamily: 'monospace',
          fontSize: '10px',
          color: '#000000',
          backgroundColor: '#ffffff',
          padding: { x: 4, y: 1 },
        }).setOrigin(0.5).setDepth(24);
        nameLabel.setShadow(0, 1, 'rgba(0,0,0,0.2)', 2);

        const bubbleContainer = this.add.container(targetX, targetY - 54).setDepth(26);

        entity = {
          sprite,
          nameLabel,
          bubbleContainer,
          targetX,
          targetY,
          currentDirection: remote.direction || 'down',
          isMoving: Boolean(remote.moving),
          lastUpdate: Date.now(),
        };

        this.remotePlayers.set(remote.visitorId, entity);
      } else {
        // Anti-warp / smooth snap if packet jump is excessively large
        if (Math.hypot(targetX - entity.sprite.x, targetY - entity.sprite.y) > 600) {
          entity.sprite.setPosition(targetX, targetY);
        }

        entity.targetX = targetX;
        entity.targetY = targetY;
        entity.isMoving = Boolean(remote.moving);
        entity.currentDirection = remote.direction || 'down';
        entity.lastUpdate = Date.now();
      }
    } catch {
      // Gracefully ignore corrupt remote packet
    }
  }

  public removeRemotePlayer(visitorId: string): void {
    const entity = this.remotePlayers.get(visitorId);
    if (entity) {
      try {
        if (entity.sprite?.active) entity.sprite.destroy();
        if (entity.nameLabel?.active) entity.nameLabel.destroy();
        if (entity.bubbleContainer?.active) entity.bubbleContainer.destroy();
      } catch {
        // ignore
      }
      this.remotePlayers.delete(visitorId);
    }
  }

  private updateRemotePlayers(): void {
    const now = Date.now();
    const staleIds: string[] = [];

    this.remotePlayers.forEach((entity, id) => {
      // Guard against destroyed or inactive entities
      if (
        !entity ||
        !entity.sprite ||
        !entity.sprite.active ||
        !entity.nameLabel ||
        !entity.nameLabel.active ||
        !entity.bubbleContainer ||
        !entity.bubbleContainer.active
      ) {
        staleIds.push(id);
        return;
      }

      // Stale player garbage collection (disconnected ungracefully)
      if (now - entity.lastUpdate > 25000) {
        staleIds.push(id);
        return;
      }

      const dx = entity.targetX - entity.sprite.x;
      const dy = entity.targetY - entity.sprite.y;

      if (Math.hypot(dx, dy) > 2) {
        entity.sprite.x += dx * 0.2;
        entity.sprite.y += dy * 0.2;
      }

      entity.nameLabel.setPosition(entity.sprite.x, entity.sprite.y - 36);
      entity.bubbleContainer.setPosition(entity.sprite.x, entity.sprite.y - 54);

      const animKey = `male_01_${entity.isMoving ? 'walk' : 'idle'}_${entity.currentDirection}`;
      if (this.anims.exists(animKey)) {
        entity.sprite.play(animKey, true);
      }
    });

    // Remove stale entities from memory
    for (const staleId of staleIds) {
      this.removeRemotePlayer(staleId);
    }
  }

  public showLocalReaction(type: 'wave' | 'heart' | 'sparkle' = 'wave'): void {
    const emojiMap = { wave: '👋', heart: '❤️', sparkle: '✨' };
    this.spawnSpeechBubble(this.playerBubbleContainer, emojiMap[type] || '👋', 2200);
  }

  public showRemoteReaction(reaction: WorldReaction): void {
    const entity = this.remotePlayers.get(reaction.visitorId);
    if (entity && entity.bubbleContainer?.active) {
      const emojiMap = { wave: '👋', heart: '❤️', sparkle: '✨' };
      this.spawnSpeechBubble(entity.bubbleContainer, emojiMap[reaction.type] || '👋', 2200);
    }
  }

  public showLocalSpeech(text: string): void {
    this.spawnSpeechBubble(this.playerBubbleContainer, text, SPEECH_DURATION_MS);
  }

  public showRemoteSpeech(speech: WorldSpeech): void {
    const entity = this.remotePlayers.get(speech.visitorId);
    if (entity && entity.bubbleContainer?.active) {
      this.spawnSpeechBubble(entity.bubbleContainer, speech.text, SPEECH_DURATION_MS);
    }
  }

  private spawnSpeechBubble(container: Phaser.GameObjects.Container, text: string, duration: number): void {
    if (!container || !container.active) return;
    container.removeAll(true);
    const cleanText = sanitizeUserText(text, 90);
    if (!cleanText) return;

    const txt = this.add.text(0, 0, cleanText, {
      fontFamily: 'monospace',
      fontSize: '11px',
      fontStyle: 'bold',
      color: '#000000',
      align: 'center',
      wordWrap: { width: 150, useAdvancedWrap: true },
    }).setOrigin(0.5);

    const padX = 12;
    const padY = 6;
    const bgW = txt.width + padX * 2;
    const bgH = txt.height + padY * 2;

    const bubbleBg = this.add.graphics();
    bubbleBg.fillStyle(0xffffff, 0.98);
    bubbleBg.lineStyle(1.5, 0x000000, 1);
    bubbleBg.fillRoundedRect(-bgW / 2, -bgH / 2, bgW, bgH, 4);
    bubbleBg.strokeRoundedRect(-bgW / 2, -bgH / 2, bgW, bgH, 4);

    container.add([bubbleBg, txt]);
    container.setVisible(true);

    this.time.delayedCall(duration, () => {
      if (container && container.active) {
        container.removeAll(true);
      }
    });
  }
}
