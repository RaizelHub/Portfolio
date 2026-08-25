// Lightweight particle burst utility using native Canvas & DOM
export type ParticleType = 'star' | 'heart' | 'coin' | 'confetti' | 'sparkle';

export function spawnParticleBurst(
  x: number,
  y: number,
  options: {
    type?: ParticleType;
    count?: number;
    spread?: number;
    colors?: string[];
  } = {},
): void {
  const count = options.count || 18;
  const spread = options.spread || 60;
  const colors = options.colors || ['#f59e0b', '#ef4444', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'];
  const type = options.type || 'sparkle';

  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.left = `${x}px`;
  container.style.top = `${y}px`;
  container.style.pointerEvents = 'none';
  container.style.zIndex = '9999';
  document.body.appendChild(container);

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4;
    const distance = spread * (0.6 + Math.random() * 0.8);
    const destX = Math.cos(angle) * distance;
    const destY = Math.sin(angle) * distance - 20;
    const size = 6 + Math.random() * 6;
    const color = colors[i % colors.length];

    el.style.position = 'absolute';
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;
    el.style.borderRadius = type === 'coin' || type === 'sparkle' ? '50%' : '2px';
    el.style.backgroundColor = color;
    el.style.left = '0px';
    el.style.top = '0px';
    el.style.opacity = '1';
    el.style.boxShadow = `0 0 8px ${color}`;
    el.style.transition = 'all 0.65s cubic-bezier(0.25, 1, 0.5, 1)';
    el.style.transform = 'translate(-50%, -50%) scale(1)';

    if (type === 'heart') {
      el.innerText = '❤️';
      el.style.backgroundColor = 'transparent';
      el.style.boxShadow = 'none';
      el.style.fontSize = `${size + 4}px`;
    } else if (type === 'star') {
      el.innerText = '⭐';
      el.style.backgroundColor = 'transparent';
      el.style.boxShadow = 'none';
      el.style.fontSize = `${size + 4}px`;
    } else if (type === 'coin') {
      el.innerText = '🪙';
      el.style.backgroundColor = 'transparent';
      el.style.boxShadow = 'none';
      el.style.fontSize = `${size + 6}px`;
    }

    container.appendChild(el);

    // Trigger animation in next frame
    requestAnimationFrame(() => {
      el.style.transform = `translate(${destX}px, ${destY}px) scale(${0.3 + Math.random() * 0.3}) rotate(${Math.random() * 360}deg)`;
      el.style.opacity = '0';
    });
  }

  // Cleanup after animation completes
  setTimeout(() => {
    container.remove();
  }, 750);
}

export function spawnFullScreenConfetti(): void {
  const count = 75;
  const colors = ['#f59e0b', '#ef4444', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#f97316'];

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    const startX = Math.random() * window.innerWidth;
    const startY = -20;
    const endX = startX + (Math.random() - 0.5) * 300;
    const endY = window.innerHeight + 50;
    const size = 6 + Math.random() * 8;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const duration = 1.6 + Math.random() * 1.5;

    el.style.position = 'fixed';
    el.style.left = `${startX}px`;
    el.style.top = `${startY}px`;
    el.style.width = `${size}px`;
    el.style.height = `${size * 1.4}px`;
    el.style.backgroundColor = color;
    el.style.borderRadius = '2px';
    el.style.zIndex = '10000';
    el.style.pointerEvents = 'none';
    el.style.transform = `rotate(${Math.random() * 360}deg)`;
    el.style.transition = `all ${duration}s cubic-bezier(0.2, 0.8, 0.4, 1)`;
    el.style.opacity = '1';

    document.body.appendChild(el);

    requestAnimationFrame(() => {
      el.style.top = `${endY}px`;
      el.style.left = `${endX}px`;
      el.style.transform = `rotate(${Math.random() * 720}deg) scale(0.6)`;
      el.style.opacity = '0';
    });

    setTimeout(() => {
      el.remove();
    }, duration * 1000 + 100);
  }
}
