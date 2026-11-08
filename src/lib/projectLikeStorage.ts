const USER_LIKES_KEY = 'portfolio_user_liked_slugs_v1';
export const LIKES_CACHE_KEY = 'portfolio_project_like_counts_v1';

/**
 * Get map of projects liked by this visitor on this browser: { [slug: string]: boolean }
 */
export function getUserLikedSlugs(): Record<string, boolean> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(USER_LIKES_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : null;
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
    return Object.fromEntries(
      Object.entries(parsed).filter(([, value]) => typeof value === 'boolean'),
    );
  } catch {
    return {};
  }
}

export function saveUserLikedSlugs(likedMap: Record<string, boolean>) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(USER_LIKES_KEY, JSON.stringify(likedMap));
  } catch {
    // ignore
  }
}

/**
 * Check if the current visitor has already liked this project
 */
export function hasUserLiked(slug: string): boolean {
  const userLikes = getUserLikedSlugs();
  return Object.hasOwn(userLikes, slug) && userLikes[slug] === true;
}

/**
 * Get cached likes from memory/localStorage
 */
export function getCachedLikeCounts(): Record<string, number> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(LIKES_CACHE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : null;
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
    return Object.fromEntries(
      Object.entries(parsed).filter(([, value]) =>
        typeof value === 'number' && Number.isSafeInteger(value) && value >= 0,
      ),
    );
  } catch {
    return {};
  }
}

export function setCachedLikeCount(slug: string, count: number) {
  if (typeof window === 'undefined') return;
  try {
    const cache = getCachedLikeCounts();
    cache[slug] = Math.max(0, count);
    localStorage.setItem(LIKES_CACHE_KEY, JSON.stringify(cache));
  } catch {
    // ignore
  }
}

