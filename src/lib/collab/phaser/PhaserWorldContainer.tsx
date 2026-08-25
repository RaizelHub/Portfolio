import { useEffect, useImperativeHandle, useRef, forwardRef } from 'react';
import Phaser from 'phaser';
import type {
  CharacterId,
  Direction,
  RemotePlayerState,
  WorldReaction,
  WorldSpeech,
} from '../types';
import type { Project } from '../../../types';
import type { WorldBuilding } from '../worldConfig';
import { PortfolioWorldScene } from './PortfolioWorldScene';

export type PhaserWorldHandle = {
  setCharacter: (characterId: CharacterId) => void;
  handleRemoteMove: (remote: RemotePlayerState) => void;
  removeRemotePlayer: (visitorId: string) => void;
  showLocalReaction: (type?: 'wave' | 'heart' | 'sparkle') => void;
  showRemoteReaction: (reaction: WorldReaction) => void;
  showLocalSpeech: (text: string) => void;
  showRemoteSpeech: (speech: WorldSpeech) => void;
  enterBuilding: (building: WorldBuilding) => void;
  exitToCampus: () => void;
  teleportToBuildingEntrance: (buildingId: string) => void;
};

type Props = {
  characterId: CharacterId;
  visitorName: string;
  spawnX?: number;
  spawnY?: number;
  direction?: Direction;
  onBuildingProximity: (building: WorldBuilding | null) => void;
  onProjectBranchProximity: (data: { project: Project; isWIP: boolean } | null) => void;
  onExitDoorwayProximity: (nearExit: boolean) => void;
  onBudgetBeggarProximity: (nearBeggar: boolean) => void;
  onBasketballProximity?: (near: boolean) => void;
  onGamingLoungeProximity?: (near: boolean) => void;
  onPlayerMoved: (x: number, y: number, direction: Direction, moving: boolean) => void;
  onCheckpointTrigger: (x: number, y: number, direction: Direction) => void;
  onFootstep?: (stepIndex: number) => void;
};

export const PhaserWorldContainer = forwardRef<PhaserWorldHandle, Props>(function PhaserWorldContainer(
  {
    characterId,
    visitorName,
    spawnX,
    spawnY,
    direction = 'down',
    onBuildingProximity,
    onProjectBranchProximity,
    onExitDoorwayProximity,
    onBudgetBeggarProximity,
    onBasketballProximity,
    onGamingLoungeProximity,
    onPlayerMoved,
    onCheckpointTrigger,
    onFootstep,
  },
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gameRef = useRef<Phaser.Game | null>(null);
  const sceneRef = useRef<PortfolioWorldScene | null>(null);

  useImperativeHandle(ref, () => ({
    setCharacter: (newChar) => {
      sceneRef.current?.setLocalCharacter(newChar);
    },
    handleRemoteMove: (remote) => {
      sceneRef.current?.handleRemotePlayerMove(remote);
    },
    removeRemotePlayer: (visitorId) => {
      sceneRef.current?.removeRemotePlayer(visitorId);
    },
    showLocalReaction: (type = 'wave') => {
      sceneRef.current?.showLocalReaction(type);
    },
    showRemoteReaction: (reaction) => {
      sceneRef.current?.showRemoteReaction(reaction);
    },
    showLocalSpeech: (text) => {
      sceneRef.current?.showLocalSpeech(text);
    },
    showRemoteSpeech: (speech) => {
      sceneRef.current?.showRemoteSpeech(speech);
    },
    enterBuilding: (building) => {
      sceneRef.current?.enterBuilding(building);
    },
    exitToCampus: () => {
      sceneRef.current?.exitToCampus();
    },
    teleportToBuildingEntrance: (_buildingId) => {
      // Handled via spawn coordinates
    },
  }));

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new PortfolioWorldScene();
    sceneRef.current = scene;

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent: containerRef.current,
      width: containerRef.current.clientWidth || window.innerWidth,
      height: containerRef.current.clientHeight || (window.innerHeight - 64),
      backgroundColor: '#ffffff',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { x: 0, y: 0 },
          debug: false,
        },
      },
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      render: {
        antialias: true,
        pixelArt: false,
        roundPixels: true,
      },
      scene: [scene],
    };

    const game = new Phaser.Game(config);
    gameRef.current = game;

    // Pass initialization parameters to scene
    game.events.once('ready', () => {
      scene.scene.start('PortfolioWorldScene', {
        characterId,
        visitorName,
        spawnX,
        spawnY,
        direction,
        events: {
          onBuildingProximity,
          onProjectBranchProximity,
          onExitDoorwayProximity,
          onBudgetBeggarProximity,
          onBasketballProximity,
          onGamingLoungeProximity,
          onPlayerMoved,
          onCheckpointTrigger,
          onFootstep,
        },
      });
    });

    const handleResize = () => {
      if (gameRef.current && containerRef.current) {
        const w = containerRef.current.clientWidth;
        const h = containerRef.current.clientHeight;
        gameRef.current.scale.resize(w, h);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      game.destroy(true);
      gameRef.current = null;
      sceneRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden select-none outline-none touch-none"
      style={{ touchAction: 'none' }}
    />
  );
});
