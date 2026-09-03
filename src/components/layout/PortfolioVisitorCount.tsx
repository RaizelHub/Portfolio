import React, { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';
import {
  formatVisitCount,
  registerPortfolioVisit,
  getCurrentVisitorProfile,
} from '../../lib/analytics/portfolioVisitors';
import { VisitorAvatar } from '../ui/VisitorAvatar';

type PortfolioVisitorCountProps = {
  variant?: 'desktop' | 'mobile';
};

/**
 * Subtle aggregate portfolio visitor counter with black eye icon
 * and the recent anonymous visitor avatar profile preview.
 */
export const PortfolioVisitorCount: React.FC<PortfolioVisitorCountProps> = ({
  variant = 'desktop',
}) => {
  const [count, setCount] = useState<number | null>(null);
  const [visitor, setVisitor] = useState(() => getCurrentVisitorProfile());

  useEffect(() => {
    let cancelled = false;

    registerPortfolioVisit().then((value) => {
      if (!cancelled) {
        setCount(value);
        setVisitor(getCurrentVisitorProfile());
      }
    });

    return () => {
      cancelled = true;
    };
  }, []);

  if (count === null) return null;

  const word = count === 1 ? 'visit' : 'visits';
  const number = formatVisitCount(count);

  if (variant === 'mobile') {
    return (
      <div
        className="flex cursor-default select-none items-center justify-between border-2 border-black dark:border-white bg-[var(--surface)] px-2.5 py-1.5 font-mono text-xs text-[var(--text-secondary)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
        role="status"
        aria-label={`${number} portfolio visits`}
      >
        <span className="flex items-center gap-1.5" aria-hidden="true">
          {visitor && (
            <VisitorAvatar
              displayName={visitor.displayName}
              avatarUrl={visitor.avatarUrl}
              avatarSeed={visitor.avatarSeed}
              size="2xs"
              className="rounded-none border border-black dark:border-white"
            />
          )}
          <Eye className="w-3.5 h-3.5 text-black dark:text-white shrink-0" strokeWidth={2.5} />
          <span className="font-bold text-[var(--text-primary)]">Portfolio visits</span>
        </span>
        <span className="font-bold text-[var(--text-primary)]" aria-hidden="true">
          {number}
        </span>
      </div>
    );
  }

  return (
    <div
      className="flex cursor-default select-none items-center justify-between border-2 border-black dark:border-white bg-[var(--surface)] px-2.5 py-1.5 font-mono text-xs text-[var(--text-secondary)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
      aria-label={`${count} portfolio visits`}
      title={visitor ? `${visitor.displayName} (${visitor.shortId}) · ${number} portfolio visits` : `${number} portfolio visits`}
    >
      <span className="flex items-center gap-1.5">
        {visitor && (
          <VisitorAvatar
            displayName={visitor.displayName}
            avatarUrl={visitor.avatarUrl}
            avatarSeed={visitor.avatarSeed}
            size="2xs"
            className="rounded-none border border-black dark:border-white"
          />
        )}
        <Eye className="w-3.5 h-3.5 text-black dark:text-white shrink-0" aria-hidden="true" strokeWidth={2.5} />
        <span className="font-bold text-[var(--text-primary)]">{number}</span>
        <span className="hidden lg:inline">{word}</span>
      </span>
    </div>
  );
};

export default PortfolioVisitorCount;
