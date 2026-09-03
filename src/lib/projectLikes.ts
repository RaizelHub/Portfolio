import { supabase } from './supabase';

const USER_LIKES_KEY = 'portfolio_user_liked_slugs_v1';
const LIKES_CACHE_KEY = 'portfolio_project_like_counts_v1';

/**
 * Get map of projects liked by this visitor on this browser: { [slug: string]: boolean }
 */
export function getUserLikedSlugs(): Record<string, boolean> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(USER_LIKES_KEY);
    return raw ? JSON.parse(raw) : {};
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
  return Boolean(userLikes[slug]);
}

/**
 * Get cached likes from memory/localStorage
 */
export function getCachedLikeCounts(): Record<string, number> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(LIKES_CACHE_KEY);
    return raw ? JSON.parse(raw) : {};
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

/**
 * Fetch real like count for a project from Supabase database
 */
export async function fetchProjectLikeCount(slug: string): Promise<number> {
  if (!supabase) {
    const cache = getCachedLikeCounts();
    return cache[slug] ?? 0;
  }

  try {
    const { data, error } = await supabase
      .from('project_likes')
      .select('like_count')
      .eq('project_slug', slug)
      .maybeSingle();

    if (!error && data && typeof data.like_count === 'number') {
      const count = Math.max(0, Number(data.like_count));
      setCachedLikeCount(slug, count);
      return count;
    }
  } catch (err) {
    console.error('Error fetching project likes for', slug, err);
  }

  const cache = getCachedLikeCounts();
  return cache[slug] ?? 0;
}

/**
 * Fetch all project likes in a single query
 */
export async function fetchAllProjectLikes(): Promise<Record<string, number>> {
  const result: Record<string, number> = {};

  if (!supabase) {
    return getCachedLikeCounts();
  }

  try {
    const { data, error } = await supabase
      .from('project_likes')
      .select('project_slug, like_count');

    if (!error && data) {
      data.forEach((row) => {
        result[row.project_slug] = Math.max(0, Number(row.like_count));
      });
      try {
        localStorage.setItem(LIKES_CACHE_KEY, JSON.stringify(result));
      } catch {
        // ignore
      }
      return result;
    }
  } catch (err) {
    console.error('Error fetching all project likes', err);
  }

  return getCachedLikeCounts();
}

/**
 * Like a project (Strictly 1 like per person / visitor)
 */
export async function toggleProjectLike(slug: string): Promise<{ newCount: number; isLiked: boolean }> {
  const userLikes = getUserLikedSlugs();
  const currentlyLiked = Boolean(userLikes[slug]);

  // Strictly 1 like per person. If already liked, keep it liked
  if (currentlyLiked) {
    const currentCount = await fetchProjectLikeCount(slug);
    return {
      newCount: currentCount,
      isLiked: true,
    };
  }

  // Mark as liked locally
  userLikes[slug] = true;
  saveUserLikedSlugs(userLikes);

  // Optimistic count increment
  const cached = getCachedLikeCounts();
  const currentCount = cached[slug] ?? 0;
  const optimisticCount = currentCount + 1;
  setCachedLikeCount(slug, optimisticCount);

  if (supabase) {
    const client = supabase;
    try {
      // 1. Call atomic increment RPC in Supabase
      const { data, error } = await client.rpc('increment_project_like', {
        slug_param: slug,
      });

      if (!error && typeof data === 'number') {
        const finalCount = Math.max(0, data);
        setCachedLikeCount(slug, finalCount);
        return {
          newCount: finalCount,
          isLiked: true,
        };
      }

      if (error) {
        console.warn('RPC increment_project_like error:', error);
      }
    } catch (err) {
      console.error('Error calling increment_project_like:', err);
    }
  }

  return {
    newCount: optimisticCount,
    isLiked: true,
  };
}

/**
 * Subscribe to realtime live updates for a project
 */
export function subscribeToProjectLikes(slug: string, onUpdate: (newCount: number) => void): () => void {
  const client = supabase;
  if (!client) return () => {};

  try {
    const channelId = `project_likes_${slug}_${Math.random().toString(36).substring(2, 9)}`;
    const channel = client
      .channel(channelId)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'project_likes',
          filter: `project_slug=eq.${slug}`,
        },
        (payload) => {
          const newRow = payload.new as { like_count?: number } | undefined;
          if (newRow && typeof newRow.like_count === 'number') {
            const count = Math.max(0, Number(newRow.like_count));
            setCachedLikeCount(slug, count);
            onUpdate(count);
          }
        }
      )
      .subscribe();

    return () => {
      try {
        client.removeChannel(channel);
      } catch {
        // Safe channel cleanup
      }
    };
  } catch (err) {
    console.error('Error subscribing to project likes:', err);
    return () => {};
  }
}
