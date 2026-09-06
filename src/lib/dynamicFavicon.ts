import type { WeatherMood } from './weather';

export function getFaviconSvg(mood: WeatherMood): string {
  switch (mood) {
    case 'sunny':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#16130c"/>
  <rect x="3" y="3" width="58" height="58" rx="11" fill="none" stroke="#f59e0b" stroke-width="3"/>
  <circle cx="32" cy="32" r="13" fill="#f59e0b"/>
  <path d="M32 7v6M32 51v6M7 32h6M51 32h6M14.3 14.3l4.2 4.2M45.5 45.5l4.2 4.2M14.3 49.7l4.2-4.2M45.5 18.5l4.2-4.2" stroke="#fbbf24" stroke-width="4" stroke-linecap="round"/>
</svg>`;

    case 'rainy':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#080f1a"/>
  <rect x="3" y="3" width="58" height="58" rx="11" fill="none" stroke="#38bdf8" stroke-width="3"/>
  <path d="M22 35h20a9 9 0 0 0 0-18 12 12 0 0 0-22 3A7 7 0 0 0 22 35z" fill="#38bdf8"/>
  <path d="M21 41l-3 7M31 41l-3 7M41 41l-3 7" stroke="#0284c7" stroke-width="3.5" stroke-linecap="round"/>
</svg>`;

    case 'cloudy':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#0d1117"/>
  <rect x="3" y="3" width="58" height="58" rx="11" fill="none" stroke="#94a3b8" stroke-width="3"/>
  <path d="M20 38h24a10 10 0 0 0 0-20 13 13 0 0 0-24 4A8 8 0 0 0 20 38z" fill="#cbd5e1"/>
  <path d="M15 44h22a8 8 0 0 0 0-16 11 11 0 0 0-20 3A7 7 0 0 0 15 44z" fill="#94a3b8" opacity="0.9"/>
</svg>`;

    case 'storm':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#0a0a1a"/>
  <rect x="3" y="3" width="58" height="58" rx="11" fill="none" stroke="#818cf8" stroke-width="3"/>
  <path d="M20 30h22a9 9 0 0 0 0-18 12 12 0 0 0-22 3A7 7 0 0 0 20 30z" fill="#818cf8"/>
  <path d="M32 30l-5 13h7l-3 13 12-16h-7l4-10z" fill="#facc15" stroke="#fef08a" stroke-width="1.2" stroke-linejoin="round"/>
</svg>`;

    case 'night':
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#060714"/>
  <rect x="3" y="3" width="58" height="58" rx="11" fill="none" stroke="#a5b4fc" stroke-width="3"/>
  <path d="M37 17a17 17 0 1 0 9 30 15 15 0 1 1-9-30z" fill="#c7d2fe"/>
  <path d="M47 16c0 3-3 5-3 5s3 2 3 5c0-3 3-5 3-5s-3-2-3-5z" fill="#ffffff"/>
</svg>`;
  }
}

export function updateFavicon(mood: WeatherMood) {
  if (typeof document === 'undefined') return;

  let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }

  link.type = 'image/svg+xml';
  const svg = getFaviconSvg(mood);
  link.href = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
