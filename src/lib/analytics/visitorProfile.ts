/**
 * Anonymous Visitor Profile & Deterministic Identity Engine
 *
 * Generates consistent, friendly, and non-personal anonymous identities
 * (Adjective + Animal) and deterministic avatar seeds based on a secure random UUID.
 *
 * Privacy & Architecture Principles:
 * - NEVER identifies real people or asks for personal data.
 * - Non-invasive: uses standard browser properties (screen, userAgent) without intrusive fingerprinting.
 * - Same visitor UUID consistently resolves to the exact same display name and avatar.
 */

// ── Curated Professional & Non-Offensive Adjectives (60) ──
const ADJECTIVES = [
  'Quiet', 'Silver', 'Misty', 'Golden', 'Calm', 'Swift', 'Soft', 'Blue',
  'Cloud', 'Hidden', 'Solar', 'Lunar', 'Amber', 'Cobalt', 'Emerald', 'Shadow',
  'Arctic', 'Cosmic', 'Radiant', 'Lucid', 'Cedar', 'Iron', 'Stellar', 'Noble',
  'Sage', 'Zenith', 'Echo', 'Crimson', 'Frost', 'Velvet', 'Atlas', 'Nova',
  'Breeze', 'Dawn', 'Haven', 'Orion', 'Pulse', 'Ridge', 'Terra', 'Vesper',
  'Alpine', 'Beacon', 'Canyon', 'Delta', 'Glacier', 'Harbor', 'Meadow', 'Oasis',
  'Prairie', 'Quartz', 'Reef', 'Summit', 'Tide', 'Valley', 'Willow', 'Zephyr',
  'Boreal', 'Dune', 'Haven', 'Pine'
];

// ── Friendly, Distinctive Wildlife & Avian Animals (60) ──
const ANIMALS = [
  'Falcon', 'Panda', 'Fox', 'Sparrow', 'Otter', 'Raven', 'Lynx', 'Heron',
  'Bear', 'Wolf', 'Badger', 'Hawk', 'Eagle', 'Deer', 'Dolphin', 'Owl',
  'Tiger', 'Leopard', 'Seal', 'Penguin', 'Crane', 'Beaver', 'Bison', 'Osprey',
  'Jaguar', 'Puffin', 'Koala', 'Kestrel', 'Cheetah', 'Robin', 'Elk', 'Moose',
  'Finch', 'Swift', 'Caribou', 'Lark', 'Marlin', 'Plover', 'Quail', 'Sable',
  'Ibex', 'Kite', 'Lemur', 'Marten', 'Nighthawk', 'Ocelot', 'Pelican', 'Rook',
  'Starling', 'Tern', 'Vireo', 'Wolverine', 'Albatross', 'Curlew', 'Egret', 'Gannet',
  'Harrier', 'Merlin', 'Petrel', 'Shrike'
];

export interface VisitorProfile {
  anonymousId: string;
  shortId: string;
  displayName: string;
  avatarSeed: string;
  avatarUrl: string;
  firstSeenAt: string;
  lastSeenAt: string;
  visitCount: number;
  isReturning: boolean;
  deviceType: 'desktop' | 'mobile' | 'tablet';
  browser: string;
  os: string;
  referrer: string;
  country?: string;
  pagesViewed: string[];
}

const STORAGE_KEYS = {
  VISITOR_ID: 'portfolio_anonymous_visitor_id',
  VISITOR_PROFILE: 'portfolio_anonymous_visitor_profile',
  SESSION_RECORDED: 'portfolio_visit_recorded',
} as const;

/**
 * Deterministic 32-bit FNV-1a hash function for strings
 */
function hashString(str: string): number {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return hash >>> 0;
}

/**
 * Deterministically generates a friendly Adjective + Animal name from a visitor UUID
 */
export function generateVisitorName(uuid: string): string {
  const hash = hashString(uuid);
  const adjIndex = hash % ADJECTIVES.length;
  const animalIndex = Math.floor(hash / ADJECTIVES.length) % ANIMALS.length;
  return `${ADJECTIVES[adjIndex]} ${ANIMALS[animalIndex]}`;
}

/**
 * Converts a UUID like "550e8400-e29b-41d4-a716-446655440000" into a short tag like "#550E"
 */
export function generateShortVisitorId(uuid: string): string {
  const clean = uuid.replace(/-/g, '').toUpperCase();
  return `#${clean.substring(0, 4)}`;
}

/**
 * Generates an illustrated anime / cartoon character avatar URL using DiceBear Adventurer collection
 */
export function generateAvatarUrl(seed: string): string {
  // Uses DiceBear Adventurer collection for vibrant, expressive anime/cartoon character portraits
  return `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(seed)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;
}

/**
 * Detects device category safely
 */
export function detectDeviceType(): 'desktop' | 'mobile' | 'tablet' {
  if (typeof window === 'undefined') return 'desktop';
  const ua = navigator.userAgent.toLowerCase();
  const width = window.innerWidth || screen.width;

  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua) || (width >= 768 && width <= 1024)) {
    return 'tablet';
  }
  if (/mobile|iphone|ipod|blackberry|opera mini|iemobile|wpdesktop/i.test(ua) || width < 768) {
    return 'mobile';
  }
  return 'desktop';
}

/**
 * Detects browser name cleanly
 */
export function detectBrowser(): string {
  if (typeof window === 'undefined') return 'Unknown';
  const ua = navigator.userAgent;

  if (ua.indexOf('Firefox') > -1) return 'Firefox';
  if (ua.indexOf('Opera') > -1 || ua.indexOf('OPR') > -1) return 'Opera';
  if (ua.indexOf('Edge') > -1 || ua.indexOf('Edg') > -1) return 'Edge';
  if (ua.indexOf('Chrome') > -1) return 'Chrome';
  if (ua.indexOf('Safari') > -1) return 'Safari';
  return 'Browser';
}

/**
 * Detects operating system cleanly
 */
export function detectOS(): string {
  if (typeof window === 'undefined') return 'Unknown';
  const ua = navigator.userAgent;

  if (ua.indexOf('Win') > -1) return 'Windows';
  if (ua.indexOf('Mac') > -1 && ua.indexOf('iPhone') === -1 && ua.indexOf('iPad') === -1) return 'macOS';
  if (ua.indexOf('Android') > -1) return 'Android';
  if (ua.indexOf('iPhone') > -1 || ua.indexOf('iPad') > -1) return 'iOS';
  if (ua.indexOf('Linux') > -1) return 'Linux';
  return 'OS';
}

/**
 * Cleanly categorizes referrer traffic source
 */
export function detectReferrer(): string {
  if (typeof document === 'undefined' || !document.referrer) return 'Direct';
  const ref = document.referrer.toLowerCase();

  try {
    const url = new URL(document.referrer);
    const host = url.hostname.toLowerCase();

    if (host.includes('linkedin.com') || ref.includes('linkedin')) return 'LinkedIn';
    if (host.includes('github.com') || ref.includes('github')) return 'GitHub';
    if (host.includes('google.') || ref.includes('google')) return 'Google';
    if (host.includes('twitter.com') || host.includes('x.com') || ref.includes('t.co')) return 'X / Twitter';
    if (host.includes('facebook.com') || host.includes('instagram.com')) return 'Social';
    if (host === window.location.hostname) return 'Internal';

    return host.replace(/^www\./, '');
  } catch {
    return 'Web Referrer';
  }
}

/**
 * Generates a standard cryptographically random UUID v4
 */
export function generateUUID(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  // Fallback RFC4122 v4
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Retrieves or initializes the local persistent anonymous visitor identity
 */
export function getOrCreateLocalVisitorProfile(): VisitorProfile {
  const now = new Date().toISOString();
  let anonymousId = '';

  try {
    anonymousId = localStorage.getItem(STORAGE_KEYS.VISITOR_ID) || '';
  } catch {
    // Storage unavailable
  }

  let isNew = false;
  if (!anonymousId) {
    anonymousId = generateUUID();
    isNew = true;
    try {
      localStorage.setItem(STORAGE_KEYS.VISITOR_ID, anonymousId);
    } catch {
      // Ignore storage errors
    }
  }

  const displayName = generateVisitorName(anonymousId);
  const shortId = generateShortVisitorId(anonymousId);
  const avatarSeed = `seed-${anonymousId.substring(0, 8)}`;
  const avatarUrl = generateAvatarUrl(avatarSeed);
  const deviceType = detectDeviceType();
  const browser = detectBrowser();
  const os = detectOS();
  const referrer = detectReferrer();

  let existingProfile: Partial<VisitorProfile> | null = null;
  try {
    const cached = localStorage.getItem(STORAGE_KEYS.VISITOR_PROFILE);
    if (cached) existingProfile = JSON.parse(cached);
  } catch {
    // Ignore
  }

  const visitCount = existingProfile?.visitCount ? existingProfile.visitCount + (isNew ? 0 : 0) : 1;
  const firstSeenAt = existingProfile?.firstSeenAt || now;
  const pagesViewed = Array.isArray(existingProfile?.pagesViewed) ? existingProfile.pagesViewed : ['/'];

  const profile: VisitorProfile = {
    anonymousId,
    shortId,
    displayName,
    avatarSeed,
    avatarUrl,
    firstSeenAt,
    lastSeenAt: now,
    visitCount,
    isReturning: !isNew && visitCount > 1,
    deviceType,
    browser,
    os,
    referrer,
    pagesViewed,
  };

  try {
    localStorage.setItem(STORAGE_KEYS.VISITOR_PROFILE, JSON.stringify(profile));
  } catch {
    // Ignore
  }

  return profile;
}

/**
 * Adds a visited page slug to local visitor history
 */
export function recordVisitedPage(pageSlug: string): void {
  try {
    const cached = localStorage.getItem(STORAGE_KEYS.VISITOR_PROFILE);
    if (!cached) return;
    const profile: VisitorProfile = JSON.parse(cached);
    if (!profile.pagesViewed) profile.pagesViewed = [];

    const normalized = pageSlug.trim();
    if (normalized && !profile.pagesViewed.includes(normalized)) {
      profile.pagesViewed.push(normalized);
      localStorage.setItem(STORAGE_KEYS.VISITOR_PROFILE, JSON.stringify(profile));
    }
  } catch {
    // Ignore
  }
}
