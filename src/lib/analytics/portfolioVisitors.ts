import { supabase } from '../supabase';
import {
  getOrCreateLocalVisitorProfile,
  recordVisitedPage,
  generateShortVisitorId,
  generateAvatarUrl,
  type VisitorProfile,
} from './visitorProfile';

const SESSION_KEY = 'portfolio_visit_recorded';

export interface AnalyticsSummary {
  totalVisits: number;
  profiledVisitors: number;
  returningVisitors: number;
  historicalVisits: number;
  recentVisitors: VisitorProfileRecord[];
}

export interface VisitorProfileRecord {
  id: string;
  anonymousId: string;
  shortId: string;
  displayName: string;
  avatarSeed: string;
  avatarUrl: string;
  deviceType: 'desktop' | 'mobile' | 'tablet';
  browser: string;
  os: string;
  referrer: string;
  country?: string;
  visitCount: number;
  firstSeenAt: string;
  lastSeenAt: string;
  pagesViewed: string[];
}

/**
 * Compact, readable visit counts.
 * 0 -> "0" | 999 -> "999" | 1000 -> "1k" | 1284 -> "1.2k"
 * 15000 -> "15k" | 1000000 -> "1M" | 1200000 -> "1.2M"
 */
export function formatVisitCount(count: number): string {
  if (!Number.isFinite(count) || count < 0) return '0';

  if (count < 1000) return String(Math.floor(count));

  const divisor = count < 1_000_000 ? 1000 : 1_000_000;
  const suffix = divisor === 1000 ? 'k' : 'M';
  const value = count / divisor;

  const whole = Math.floor(value);
  if (value >= 100) return `${whole}${suffix}`;

  const tenth = Math.floor(value * 10) / 10;
  return `${whole === tenth ? whole : tenth}${suffix}`;
}

/**
 * Fetches the current aggregate visit count without recording a visit.
 */
export async function fetchTotalVisits(): Promise<number | null> {
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('portfolio_stats')
      .select('total_visits')
      .eq('id', 1)
      .maybeSingle();

    if (error) return null;
    return typeof data?.total_visits === 'number' ? data.total_visits : null;
  } catch {
    return null;
  }
}

/**
 * Registers a visit for the current browser session and returns the total count.
 *
 * 1. Checks sessionStorage to deduplicate within the same browser session.
 * 2. Retrieves or generates the anonymous visitor profile.
 * 3. Calls the new `register_anonymous_visitor_visit` RPC in Supabase.
 * 4. Falls back gracefully to `register_visit` or `portfolio_stats` if the migration is pending.
 * 5. Returns the updated total visits count.
 */
export async function registerPortfolioVisit(page: string = '/'): Promise<number | null> {
  if (!supabase) return null;

  const profile = getOrCreateLocalVisitorProfile();
  recordVisitedPage(page);

  let alreadyRecordedInSession = false;
  try {
    alreadyRecordedInSession = sessionStorage.getItem(SESSION_KEY) === '1';
  } catch {
    // sessionStorage unavailable
  }

  if (alreadyRecordedInSession) {
    return fetchTotalVisits();
  }

  try {
    sessionStorage.setItem(SESSION_KEY, '1');
  } catch {
    // ignore
  }

  try {
    // Attempt the new extended anonymous visitor registration RPC
    const { data, error } = await supabase.rpc('register_anonymous_visitor_visit', {
      p_anonymous_id: profile.anonymousId,
      p_display_name: profile.displayName,
      p_avatar_seed: profile.avatarSeed,
      p_device_type: profile.deviceType,
      p_browser: profile.browser,
      p_os: profile.os,
      p_referrer: profile.referrer,
      p_page: page,
      p_country: profile.country || null,
    });

    if (!error && data && typeof data.total_visits === 'number') {
      // Update local profile with latest server stats
      profile.visitCount = typeof data.visit_count === 'number' ? data.visit_count : profile.visitCount;
      profile.isReturning = Boolean(data.is_returning);
      try {
        localStorage.setItem('portfolio_anonymous_visitor_profile', JSON.stringify(profile));
      } catch {
        // Ignore
      }
      return data.total_visits;
    }

    // Backward-compatible fallback: call original register_visit()
    const legacyRes = await supabase.rpc('register_visit');
    if (!legacyRes.error && typeof legacyRes.data === 'number') {
      return legacyRes.data;
    }

    return fetchTotalVisits();
  } catch {
    return fetchTotalVisits();
  }
}

/**
 * Returns current visitor's persistent profile
 */
export function getCurrentVisitorProfile(): VisitorProfile {
  return getOrCreateLocalVisitorProfile();
}

/**
 * Records page view for ongoing navigation
 */
export function trackPageView(pageSlug: string): void {
  recordVisitedPage(pageSlug);
}

/**
 * Fetches private analytics data for the admin dashboard.
 * If backend RPC is unavailable or in development, constructs a structured
 * report combining real Supabase totals with active local session telemetry.
 */
export async function fetchAnalyticsDashboard(): Promise<AnalyticsSummary> {
  const localProfile = getCurrentVisitorProfile();
  let totalVisits = 0;

  // 1. Fetch total count from Supabase
  if (supabase) {
    try {
      const { data: overview, error: rpcErr } = await supabase.rpc('get_portfolio_analytics_overview');
      if (!rpcErr && overview) {
        const recent: VisitorProfileRecord[] = Array.isArray(overview.recentVisitors)
          ? overview.recentVisitors.map((v: any) => ({
              id: v.id || v.anonymousId,
              anonymousId: v.anonymousId,
              shortId: generateShortVisitorId(v.anonymousId),
              displayName: v.displayName,
              avatarSeed: v.avatarSeed || v.anonymousId,
              avatarUrl: generateAvatarUrl(v.avatarSeed || v.anonymousId),
              deviceType: v.deviceType || 'desktop',
              browser: v.browser || 'Chrome',
              os: v.os || 'Windows',
              referrer: v.referrer || 'Direct',
              country: v.country || 'Philippines',
              visitCount: v.visitCount || 1,
              firstSeenAt: v.firstSeenAt || new Date().toISOString(),
              lastSeenAt: v.lastSeenAt || new Date().toISOString(),
              pagesViewed: Array.isArray(v.pagesViewed) ? v.pagesViewed : ['/'],
            }))
          : [];

        return {
          totalVisits: Number(overview.totalVisits) || 0,
          profiledVisitors: Number(overview.profiledVisitors) || recent.length,
          returningVisitors: Number(overview.returningVisitors) || 0,
          historicalVisits: Number(overview.historicalVisits) || 0,
          recentVisitors: recent,
        };
      }
    } catch {
      // Fallback
    }

    const fetchedCount = await fetchTotalVisits();
    if (fetchedCount !== null) {
      totalVisits = fetchedCount;
    }
  }

  // Fallback construction preserving exact total visits
  const currentVisitorRecord: VisitorProfileRecord = {
    id: localProfile.anonymousId,
    anonymousId: localProfile.anonymousId,
    shortId: localProfile.shortId,
    displayName: localProfile.displayName,
    avatarSeed: localProfile.avatarSeed,
    avatarUrl: localProfile.avatarUrl,
    deviceType: localProfile.deviceType,
    browser: localProfile.browser,
    os: localProfile.os,
    referrer: localProfile.referrer,
    country: 'Philippines',
    visitCount: localProfile.visitCount,
    firstSeenAt: localProfile.firstSeenAt,
    lastSeenAt: localProfile.lastSeenAt,
    pagesViewed: localProfile.pagesViewed,
  };

  const profiledCount = 1;
  const historical = Math.max(0, totalVisits - profiledCount);

  return {
    totalVisits,
    profiledVisitors: profiledCount,
    returningVisitors: localProfile.isReturning ? 1 : 0,
    historicalVisits: historical,
    recentVisitors: [currentVisitorRecord],
  };
}