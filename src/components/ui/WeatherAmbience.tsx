import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';

interface Particle {
  x: number;
  y: number;
  speedY: number;
  speedX: number;
  length?: number;
  size?: number;
  opacity: number;
  angle?: number;
  oscillation?: number;
}

export const WeatherAmbience: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { activeWeatherMood, resolvedTheme } = useTheme();

  useEffect(() => {
    // Disable if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const isDark = resolvedTheme === 'dark';

    // Particle pools
    const particles: Particle[] = [];
    const count =
      activeWeatherMood === 'rainy'
        ? 55
        : activeWeatherMood === 'storm'
        ? 75
        : activeWeatherMood === 'sunny'
        ? 28
        : activeWeatherMood === 'cloudy'
        ? 15
        : 35; // night

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speedY:
          activeWeatherMood === 'rainy'
            ? 7 + Math.random() * 6
            : activeWeatherMood === 'storm'
            ? 12 + Math.random() * 8
            : activeWeatherMood === 'sunny'
            ? -0.3 - Math.random() * 0.5
            : activeWeatherMood === 'cloudy'
            ? 0.1 + Math.random() * 0.2
            : (Math.random() - 0.5) * 0.1,
        speedX:
          activeWeatherMood === 'rainy'
            ? -1 - Math.random() * 1.5
            : activeWeatherMood === 'storm'
            ? -2 - Math.random() * 2
            : activeWeatherMood === 'sunny'
            ? (Math.random() - 0.5) * 0.4
            : 0.3 + Math.random() * 0.5,
        length: 12 + Math.random() * 16,
        size:
          activeWeatherMood === 'cloudy'
            ? 80 + Math.random() * 100
            : activeWeatherMood === 'sunny'
            ? 1.5 + Math.random() * 2.5
            : 1 + Math.random() * 1.5,
        opacity: Math.random() * 0.6 + 0.2,
        oscillation: Math.random() * Math.PI * 2,
      });
    }

    let lightningTimer = 0;
    let lightningFlash = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Storm lightning ambient flash
      if (activeWeatherMood === 'storm') {
        lightningTimer++;
        if (lightningTimer > 280 && Math.random() < 0.015) {
          lightningFlash = 0.08;
          lightningTimer = 0;
        }
        if (lightningFlash > 0) {
          ctx.fillStyle = `rgba(129, 140, 248, ${lightningFlash})`;
          ctx.fillRect(0, 0, width, height);
          lightningFlash *= 0.88;
          if (lightningFlash < 0.005) lightningFlash = 0;
        }
      }

      // Rain / Storm
      if (activeWeatherMood === 'rainy' || activeWeatherMood === 'storm') {
        const dropColor = isDark
          ? activeWeatherMood === 'storm'
            ? 'rgba(129, 140, 248, 0.45)'
            : 'rgba(56, 189, 248, 0.4)'
          : 'rgba(2, 132, 199, 0.3)';

        ctx.strokeStyle = dropColor;
        ctx.lineWidth = activeWeatherMood === 'storm' ? 1.5 : 1.2;
        ctx.beginPath();

        for (const p of particles) {
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.speedX * 2, p.y + (p.length || 15));

          p.y += p.speedY;
          p.x += p.speedX;

          if (p.y > height) {
            p.y = -20;
            p.x = Math.random() * (width + 100);
          }
          if (p.x < -20) {
            p.x = width + 20;
          }
        }
        ctx.stroke();
      }

      // Sunny (floating warm sunlight motes)
      else if (activeWeatherMood === 'sunny') {
        for (const p of particles) {
          p.oscillation = (p.oscillation || 0) + 0.02;
          p.y += p.speedY;
          p.x += p.speedX + Math.sin(p.oscillation) * 0.3;

          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }

          const alpha = (Math.sin(p.oscillation) * 0.2 + 0.4) * p.opacity;
          const moteColor = isDark
            ? `rgba(245, 158, 11, ${alpha * 0.7})`
            : `rgba(217, 119, 6, ${alpha * 0.5})`;

          ctx.fillStyle = moteColor;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size || 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Cloudy (soft drifting fog puffs)
      else if (activeWeatherMood === 'cloudy') {
        for (const p of particles) {
          p.x += p.speedX;
          if (p.x > width + 150) {
            p.x = -150;
            p.y = Math.random() * (height * 0.85);
          }

          const grad = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            p.size || 80
          );
          const cloudTint = isDark
            ? 'rgba(148, 163, 184, 0.035)'
            : 'rgba(71, 85, 105, 0.03)';
          grad.addColorStop(0, cloudTint);
          grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size || 80, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Clear Night (subtle twinkling celestial stars)
      else if (activeWeatherMood === 'night') {
        for (const p of particles) {
          p.oscillation = (p.oscillation || 0) + 0.03;
          const alpha = (Math.sin(p.oscillation) * 0.35 + 0.45) * p.opacity;
          const starColor = isDark
            ? `rgba(165, 180, 252, ${alpha})`
            : `rgba(67, 56, 202, ${alpha * 0.5})`;

          ctx.fillStyle = starColor;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size || 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [activeWeatherMood, resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full select-none"
    />
  );
};

export default WeatherAmbience;
