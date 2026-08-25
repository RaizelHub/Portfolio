import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  Gamepad2,
  Trophy,
  RotateCcw,
  X,
  Play,
} from 'lucide-react';
import { useSound } from '../../context/SoundContext';

type Brick = {
  x: number;
  y: number;
  w: number;
  h: number;
  color: string;
  points: number;
  intact: boolean;
};

const HIGH_SCORE_KEY = 'portfolio_arcade_breakout_highscore';

export const ArcadeCabinetModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState<number>(() => {
    try {
      return Number(localStorage.getItem(HIGH_SCORE_KEY)) || 0;
    } catch {
      return 0;
    }
  });
  const [lives, setLives] = useState(3);

  const { playCoinChime, playClick } = useSound();

  // Game loop state refs to avoid React re-renders in animation frame
  const stateRef = useRef({
    paddleX: 160,
    paddleW: 70,
    paddleH: 10,
    paddleSpeed: 7,
    ballX: 200,
    ballY: 280,
    ballVx: 3.5,
    ballVy: -3.5,
    ballR: 5,
    keys: { left: false, right: false },
    bricks: [] as Brick[],
  });

  const initBricks = useCallback(() => {
    const rows = 4;
    const cols = 7;
    const padX = 8;
    const padY = 8;
    const topOffset = 40;
    const brickW = 46;
    const brickH = 14;
    const colors = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6'];
    const pointValues = [40, 30, 20, 10];

    const bricks: Brick[] = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = 12 + c * (brickW + padX);
        const y = topOffset + r * (brickH + padY);
        bricks.push({
          x,
          y,
          w: brickW,
          h: brickH,
          color: colors[r],
          points: pointValues[r],
          intact: true,
        });
      }
    }
    stateRef.current.bricks = bricks;
  }, []);

  const startGame = () => {
    playClick();
    setScore(0);
    setLives(3);
    setGameOver(false);
    setGameWon(false);
    initBricks();
    stateRef.current.paddleX = 165;
    stateRef.current.ballX = 200;
    stateRef.current.ballY = 280;
    stateRef.current.ballVx = (Math.random() > 0.5 ? 1 : -1) * 3.5;
    stateRef.current.ballVy = -3.5;
    setIsPlaying(true);
  };

  useEffect(() => {
    initBricks();
  }, [initBricks]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        stateRef.current.keys.left = true;
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        stateRef.current.keys.right = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        stateRef.current.keys.left = false;
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        stateRef.current.keys.right = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Mouse / Touch paddle tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const scaleX = canvas.width / rect.width;
    stateRef.current.paddleX = Math.max(0, Math.min(canvas.width - stateRef.current.paddleW, mouseX * scaleX - stateRef.current.paddleW / 2));
  };

  // Main Canvas Render & Physics Loop
  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      const state = stateRef.current;

      // 1. Clear background
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw CRT scanlines effect
      ctx.fillStyle = 'rgba(255, 255, 255, 0.03)';
      for (let y = 0; y < canvas.height; y += 4) {
        ctx.fillRect(0, y, canvas.width, 1);
      }

      // 2. Draw Bricks
      let remainingBricks = 0;
      state.bricks.forEach((b) => {
        if (!b.intact) return;
        remainingBricks++;
        ctx.fillStyle = b.color;
        ctx.fillRect(b.x, b.y, b.w, b.h);
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.strokeRect(b.x, b.y, b.w, b.h);

        // Highlight
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fillRect(b.x + 1, b.y + 1, b.w - 2, 2);
      });

      // 3. Draw Paddle
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(state.paddleX, canvas.height - 24, state.paddleW, state.paddleH);
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(state.paddleX + 2, canvas.height - 22, state.paddleW - 4, state.paddleH - 4);

      // 4. Draw Ball
      ctx.beginPath();
      ctx.arc(state.ballX, state.ballY, state.ballR, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.closePath();

      // If game is active, update physics
      if (isPlaying && !gameOver && !gameWon) {
        // Paddle movement by keys
        if (state.keys.left) {
          state.paddleX = Math.max(0, state.paddleX - state.paddleSpeed);
        }
        if (state.keys.right) {
          state.paddleX = Math.min(canvas.width - state.paddleW, state.paddleX + state.paddleSpeed);
        }

        // Ball movement
        state.ballX += state.ballVx;
        state.ballY += state.ballVy;

        // Wall collisions
        if (state.ballX - state.ballR <= 0) {
          state.ballX = state.ballR;
          state.ballVx = Math.abs(state.ballVx);
        } else if (state.ballX + state.ballR >= canvas.width) {
          state.ballX = canvas.width - state.ballR;
          state.ballVx = -Math.abs(state.ballVx);
        }

        if (state.ballY - state.ballR <= 0) {
          state.ballY = state.ballR;
          state.ballVy = Math.abs(state.ballVy);
        }

        // Paddle collision
        const paddleY = canvas.height - 24;
        if (
          state.ballY + state.ballR >= paddleY &&
          state.ballY - state.ballR <= paddleY + state.paddleH &&
          state.ballX >= state.paddleX &&
          state.ballX <= state.paddleX + state.paddleW
        ) {
          state.ballVy = -Math.abs(state.ballVy);
          // Angle modifier depending on where ball struck paddle
          const hitOffset = (state.ballX - (state.paddleX + state.paddleW / 2)) / (state.paddleW / 2);
          state.ballVx = hitOffset * 4.5;
        }

        // Brick collisions
        state.bricks.forEach((b) => {
          if (!b.intact) return;
          if (
            state.ballX + state.ballR >= b.x &&
            state.ballX - state.ballR <= b.x + b.w &&
            state.ballY + state.ballR >= b.y &&
            state.ballY - state.ballR <= b.y + b.h
          ) {
            b.intact = false;
            state.ballVy = -state.ballVy;
            setScore((prev) => {
              const newScore = prev + b.points;
              if (newScore > highScore) {
                setHighScore(newScore);
                try {
                  localStorage.setItem(HIGH_SCORE_KEY, String(newScore));
                } catch {
                  // ignore
                }
              }
              return newScore;
            });
          }
        });

        // Win condition
        if (remainingBricks === 0) {
          setGameWon(true);
          setIsPlaying(false);
          playCoinChime();
        }

        // Bottom death collision
        if (state.ballY - state.ballR > canvas.height) {
          setLives((prevLives) => {
            const nextLives = prevLives - 1;
            if (nextLives <= 0) {
              setGameOver(true);
              setIsPlaying(false);
            } else {
              // Reset ball position
              state.ballX = 200;
              state.ballY = 250;
              state.ballVx = (Math.random() > 0.5 ? 1 : -1) * 3.5;
              state.ballVy = -3.5;
            }
            return nextLives;
          });
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, gameOver, gameWon, highScore, playCoinChime]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg border-2 border-black bg-zinc-950 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Arcade Cabinet Top Bezel */}
        <div className="flex items-center justify-between border-b border-zinc-800 bg-black px-5 py-3.5 text-white">
          <div className="flex items-center gap-2.5">
            <Gamepad2 className="h-5 w-5 text-amber-400" />
            <div>
              <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-amber-400">
                ESPORTS ARCADE · BUG BREAKER 1984
              </h2>
              <p className="text-[10px] font-mono text-zinc-400">
                Mouse / Arrow Keys to move paddle · Clear all syntax bugs
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1 border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-xs font-mono font-bold uppercase text-white hover:bg-zinc-800 transition-colors"
          >
            <span>Close [ESC]</span>
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Score & Lives HUD */}
        <div className="border-b border-zinc-800 bg-zinc-900 px-5 py-2.5 flex items-center justify-between font-mono text-xs">
          <div className="flex items-center gap-4 text-white">
            <span>SCORE: <strong className="text-amber-400">{score}</strong></span>
            <span>LIVES: <strong className="text-red-400">{'❤️'.repeat(Math.max(0, lives))}</strong></span>
          </div>
          <div className="flex items-center gap-1 text-zinc-400">
            <Trophy className="h-3.5 w-3.5 text-amber-400" />
            <span>BEST: <strong className="text-white">{highScore}</strong></span>
          </div>
        </div>

        {/* Game Canvas Container */}
        <div className="relative p-4 flex justify-center bg-black">
          <canvas
            ref={canvasRef}
            width={390}
            height={380}
            onMouseMove={handleMouseMove}
            className="border-2 border-zinc-800 cursor-crosshair rounded-xs shadow-inner"
          />

          {/* Start Screen Overlay */}
          {!isPlaying && !gameOver && !gameWon && (
            <div className="absolute inset-4 flex flex-col items-center justify-center bg-black/80 backdrop-blur-2xs text-white">
              <h3 className="font-mono text-xl font-bold uppercase text-amber-400 mb-1">
                DEV BUG BREAKER
              </h3>
              <p className="font-mono text-xs text-zinc-300 mb-6 text-center max-w-xs">
                Smash bugs, keep the ball bouncing, and set the high score!
              </p>
              <button
                type="button"
                onClick={startGame}
                className="flex items-center gap-2 border-2 border-amber-400 bg-amber-400 px-6 py-2.5 font-mono text-sm font-black uppercase text-black hover:bg-amber-300 active:scale-95 transition-all cursor-pointer shadow-lg"
              >
                <Play className="h-4 w-4 fill-current" />
                <span>Insert Coin · Play Game</span>
              </button>
            </div>
          )}

          {/* Game Over Screen */}
          {gameOver && (
            <div className="absolute inset-4 flex flex-col items-center justify-center bg-red-950/85 backdrop-blur-2xs text-white">
              <h3 className="font-mono text-xl font-bold uppercase text-red-400 mb-1">
                GAME OVER!
              </h3>
              <p className="font-mono text-xs text-zinc-200 mb-2">
                Final Score: <strong className="text-amber-400">{score}</strong>
              </p>
              <button
                type="button"
                onClick={startGame}
                className="flex items-center gap-2 border-2 border-white bg-white px-5 py-2 font-mono text-xs font-bold uppercase text-black hover:bg-zinc-200 active:scale-95 transition-all cursor-pointer mt-4"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Try Again</span>
              </button>
            </div>
          )}

          {/* Game Won Screen */}
          {gameWon && (
            <div className="absolute inset-4 flex flex-col items-center justify-center bg-emerald-950/85 backdrop-blur-2xs text-white">
              <h3 className="font-mono text-xl font-bold uppercase text-emerald-400 mb-1">
                STAGE CLEARED! 🌟
              </h3>
              <p className="font-mono text-xs text-zinc-200 mb-2">
                All bugs smashed! Final Score: <strong className="text-amber-400">{score}</strong>
              </p>
              <button
                type="button"
                onClick={startGame}
                className="flex items-center gap-2 border-2 border-amber-400 bg-amber-400 px-5 py-2 font-mono text-xs font-black uppercase text-black hover:bg-amber-300 active:scale-95 transition-all cursor-pointer mt-4"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Play Again</span>
              </button>
            </div>
          )}
        </div>

        {/* Arcade Controls Hint Footer */}
        <div className="border-t border-zinc-800 bg-zinc-900 px-5 py-3 flex items-center justify-between text-[11px] font-mono text-zinc-400">
          <span>Controls: [A] / [D] or Mouse to steer paddle</span>
          <span className="text-zinc-500">Janmark Arcade Systems</span>
        </div>
      </div>
    </div>
  );
};
