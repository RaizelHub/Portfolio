import { supabase } from '../supabase';

const SESSION_KEY = 'portfolio_visit_recorded';

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

async function fetchCount(): Promise<number | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('portfolio_stats')
    .select('total_visits')
    .eq('id', 1)
    .maybeSingle();

  if (error) return null;
  return typeof data?.total_visits === 'number' ? data.total_visits : null;
}

/**
 * Registers a visit for the current browser session and returns the count.
 *
 * The sessionStorage flag is set BEFORE the RPC fires, so overlapping effects
 * (React StrictMode double-mount, remounts) can never increment twice.
 * The database remains the source of truth; sessionStorage only deduplicates.
 *
 * Returns null when the service is unavailable or not configured —
 * callers should hide the counter rather than render a fake value.
 */
export async function registerPortfolioVisit(): Promise<number | null> {
  if (!supabase) return null;

  let alreadyRecorded = false;
  try {
    alreadyRecorded = sessionStorage.getItem(SESSION_KEY) === '1';
  } catch {
    // sessionStorage unavailable; proceed with the backend call
  }

  if (alreadyRecorded) {
    return fetchCount();
  }

  try {
    sessionStorage.setItem(SESSION_KEY, '1');
  } catch {
    // ignore — deduplication only fails, the counter stays safe
  }

  try {
    const { data, error } = await supabase.rpc('register_visit');
    if (error) return fetchCount();
    return typeof data === 'number' ? data : null;
  } catch {
    return null;
  }
}