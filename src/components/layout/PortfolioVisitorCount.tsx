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
        className="flex items-center justify-between font-mono text-xs text-[#64748B] py-1 select-none cursor-default"
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
              className="rounded-full border border-black/20 dark:border-white/20"
            />
          )}
          <Eye className="w-3.5 h-3.5 text-black dark:text-white shrink-0" strokeWidth={2} />
          <span>Portfolio visits</span>
        </span>
        <span className="font-semibold text-[#0F172A] dark:text-[#F8FAFC]" aria-hidden="true">
          {number}
        </span>
      </div>
    );
  }

  return (
    <span
      className="flex items-center gap-1.5 text-[11px] font-mono text-[#64748B] py-1 select-none cursor-default"
      aria-label={`${count} portfolio visits`}
      title={visitor ? `${visitor.displayName} (${visitor.shortId}) · ${number} portfolio visits` : `${number} portfolio visits`}
    >
      {visitor && (
        <VisitorAvatar
          displayName={visitor.displayName}
          avatarUrl={visitor.avatarUrl}
          avatarSeed={visitor.avatarSeed}
          size="2xs"
          className="rounded-full border border-black/20 dark:border-white/20"
        />
      )}
      <Eye className="w-3.5 h-3.5 text-black dark:text-white shrink-0" aria-hidden="true" strokeWidth={2} />
      <span className="font-medium text-[#0F172A] dark:text-[#F8FAFC]">{number}</span>
      <span className="hidden lg:inline">{word}</span>
    </span>
  );
};

export default PortfolioVisitorCount;