import React, { useState, useEffect, useMemo } from 'react';
import { Github, ExternalLink, Calendar } from 'lucide-react';
import { SectionContainer } from '../../components/layout/SectionContainer';
import { useSound } from '../../context/SoundContext';

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

interface ApiResponse {
  total: Record<string, number>;
  contributions: ContributionDay[];
}

export const GithubActivity: React.FC = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);
  const { playHover, playClick } = useSound();

  useEffect(() => {
    let isMounted = true;
    fetch('https://github-contributions-api.jogruber.de/v4/RaizelHub?y=last')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch contributions');
        return res.json();
      })
      .then((json: ApiResponse) => {
        if (isMounted) {
          setData(json);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Organize days into weeks (columns of 7)
  const { weeks, monthLabels, totalContributions, maxStreak, activeDays } = useMemo(() => {
    if (!data?.contributions || data.contributions.length === 0) {
      return { weeks: [], monthLabels: [], totalContributions: 0, maxStreak: 0, activeDays: 0 };
    }

    const days = data.contributions;
    const total = data.total?.lastYear ?? days.reduce((sum, d) => sum + d.count, 0);

    let streak = 0;
    let maxS = 0;
    let active = 0;

    days.forEach((day) => {
      if (day.count > 0) {
        active++;
        streak++;
        if (streak > maxS) maxS = streak;
      } else {
        streak = 0;
      }
    });

    // Group into weeks
    const w: ContributionDay[][] = [];
    let currentWeek: ContributionDay[] = [];

    // Pad first week if it doesn't start on Sunday
    const firstDayIndex = new Date(days[0].date).getDay();
    for (let i = 0; i < firstDayIndex; i++) {
      currentWeek.push({ date: '', count: -1, level: -1 });
    }

    days.forEach((day) => {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        w.push(currentWeek);
        currentWeek = [];
      }
    });

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push({ date: '', count: -1, level: -1 });
      }
      w.push(currentWeek);
    }

    // Generate Month Labels
    const months: { label: string; colIndex: number }[] = [];
    let lastMonth = -1;

    w.forEach((week, colIdx) => {
      const validDay = week.find((d) => d.count >= 0);
      if (validDay) {
        const d = new Date(validDay.date);
        const m = d.getMonth();
        if (m !== lastMonth) {
          months.push({
            label: d.toLocaleString('en-US', { month: 'short' }),
            colIndex: colIdx,
          });
          lastMonth = m;
        }
      }
    });

    return {
      weeks: w,
      monthLabels: months,
      totalContributions: total,
      maxStreak: maxS,
      activeDays: active,
    };
  }, [data]);

  const getColor = (level: number) => {
    switch (level) {
      case 1:
        return 'var(--accent-level-1, rgba(215, 161, 91, 0.35))';
      case 2:
        return 'var(--accent-level-2, rgba(215, 161, 91, 0.60))';
      case 3:
        return 'var(--accent-level-3, rgba(215, 161, 91, 0.85))';
      case 4:
        return 'var(--accent, #d7a15b)';
      default:
        return 'var(--surface-elevated, #191e27)';
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <SectionContainer id="github-activity" className="border-b-2 border-black dark:border-white py-[var(--section-space)]">
      {/* ── Section Header ── */}
      <div className="mb-12 grid gap-5 md:grid-cols-12 md:items-end">
        <h2 className="section-heading font-title text-[var(--text-primary)] font-black md:col-span-5">
          GitHub Activity
        </h2>
        <p className="body-copy text-[var(--text-secondary)] font-medium md:col-span-6 md:col-start-7">
          Live open-source contributions and development frequency from @RaizelHub.
        </p>
      </div>

      {/* ── Activity Card Container ── */}
      <div className="space-y-8 border-y-2 border-black dark:border-white py-8">
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-black dark:border-white pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center border-2 border-black dark:border-white bg-[var(--surface-elevated)] text-[var(--text-primary)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <span className="font-title font-black text-sm text-[var(--text-primary)] block">
                Janmark Suelto (@RaizelHub)
              </span>
              <span className="text-xs text-[var(--text-secondary)] font-mono font-bold">
                github.com/RaizelHub
              </span>
            </div>
          </div>

          <a
            href="https://github.com/RaizelHub"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playHover}
            onClick={playClick}
            className="inline-flex min-h-11 cursor-pointer items-center gap-2 border-2 border-black dark:border-white bg-black dark:bg-white px-4 py-2 font-mono text-xs font-bold text-white dark:text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] transition-all duration-120 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          >
            <span>View GitHub Profile</span>
            <ExternalLink className="w-3.5 h-3.5" strokeWidth={2.5} />
          </a>
        </div>

        {/* ── Activity Metric Highlights ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="space-y-1 border-2 border-black dark:border-white bg-[var(--surface-elevated)] p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]">
            <span className="text-xs text-[var(--text-muted)] font-mono font-bold uppercase block">
              Past Year Commits
            </span>
            <p className="text-xl font-black font-mono text-[var(--text-primary)]">
              {loading ? '...' : `${totalContributions} contributions`}
            </p>
          </div>

          <div className="space-y-1 border-2 border-black dark:border-white bg-[var(--surface-elevated)] p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]">
            <span className="text-xs text-[var(--text-muted)] font-mono font-bold uppercase block">
              Active Commit Days
            </span>
            <p className="text-xl font-black font-mono text-[var(--text-primary)]">
              {loading ? '...' : `${activeDays} days`}
            </p>
          </div>

          <div className="col-span-2 space-y-1 border-2 border-black dark:border-white bg-[var(--surface-elevated)] p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] sm:col-span-1">
            <span className="text-xs text-[var(--text-muted)] font-mono font-bold uppercase block">
              Longest Streak
            </span>
            <p className="text-xl font-black font-mono text-[var(--text-primary)]">
              {loading ? '...' : `${maxStreak} days`}
            </p>
          </div>
        </div>

        {/* ── High-Contrast Native Contribution Heatmap ── */}
        <div className="space-y-3 font-sans">
          <div className="flex flex-col items-start gap-2 text-xs font-bold text-[var(--text-primary)] sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
            <span className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-[var(--accent)]" strokeWidth={2.5} />
              Contribution Calendar (Last 12 Months)
            </span>
            <span className="break-safe font-mono text-[11px] font-bold text-[var(--text-muted)]">
              {hoveredDay && hoveredDay.count >= 0
                ? `${hoveredDay.count} ${hoveredDay.count === 1 ? 'contribution' : 'contributions'} on ${formatDate(hoveredDay.date)}`
                : 'Hover squares to view details'}
            </span>
          </div>

          {/* SVG Heatmap Container */}
          <div className="bg-[var(--background)] border-2 border-black dark:border-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] overflow-x-auto">
            {loading ? (
              <div className="h-32 flex items-center justify-center text-xs font-mono font-bold text-[var(--text-muted)]">
                Loading GitHub contribution telemetry...
              </div>
            ) : weeks.length > 0 ? (
              <div className="min-w-[720px] max-w-full">
                {/* Month Labels */}
                <div className="flex text-[10px] font-mono font-bold text-[var(--text-muted)] mb-2 pl-6">
                  {monthLabels.map((m, i) => (
                    <span
                      key={i}
                      style={{
                        marginLeft: i === 0 ? `${m.colIndex * 14}px` : undefined,
                        width: i < monthLabels.length - 1 ? `${(monthLabels[i + 1].colIndex - m.colIndex) * 14}px` : 'auto',
                      }}
                      className="inline-block truncate"
                    >
                      {m.label}
                    </span>
                  ))}
                </div>

                {/* Day Labels + Grid Columns */}
                <div className="flex gap-2">
                  {/* Day of Week Labels */}
                  <div className="flex flex-col justify-between text-[9px] font-mono font-bold text-[var(--text-muted)] py-0.5 select-none w-4">
                    <span>Mon</span>
                    <span>Wed</span>
                    <span>Fri</span>
                  </div>

                  {/* Heatmap Columns */}
                  <div className="flex gap-[3px] flex-1">
                    {weeks.map((week, colIdx) => (
                      <div key={colIdx} className="flex flex-col gap-[3px]">
                        {week.map((day, rowIdx) => {
                          if (day.count === -1) {
                            return <div key={rowIdx} className="w-[11px] h-[11px] opacity-0" />;
                          }

                          const isHovered = hoveredDay?.date === day.date;

                          return (
                            <div
                              key={rowIdx}
                              onMouseEnter={() => {
                                playHover();
                                setHoveredDay(day);
                              }}
                              onMouseLeave={() => setHoveredDay(null)}
                              style={{
                                backgroundColor: getColor(day.level),
                              }}
                              className={`w-[11px] h-[11px] border border-black/40 dark:border-white/40 transition-all cursor-pointer ${isHovered ? 'scale-135 z-10 ring-2 ring-black dark:ring-white border-black dark:border-white' : ''
                                }`}
                              title={`${day.count} contributions on ${day.date}`}
                            />
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-xs font-mono font-bold text-[var(--text-secondary)]">
                Live activity visible on{' '}
                <a
                  href="https://github.com/RaizelHub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent)] underline font-bold"
                >
                  GitHub @RaizelHub
                </a>
              </div>
            )}
          </div>

          {/* Heatmap Legend */}
          <div className="flex items-center justify-between text-[11px] font-mono font-bold text-[var(--text-muted)] pt-1 px-1">
            <span className="text-[10px]">Direct API feed</span>
            <div className="flex items-center gap-1.5">
              <span>Less</span>
              <div className="flex gap-[3px]">
                {[0, 1, 2, 3, 4].map((lvl) => (
                  <div
                    key={lvl}
                    style={{ backgroundColor: getColor(lvl) }}
                    className="w-[10px] h-[10px] border border-black/40 dark:border-white/40"
                  />
                ))}
              </div>
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};
