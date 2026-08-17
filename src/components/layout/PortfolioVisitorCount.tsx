import React, { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';
import { formatVisitCount, registerPortfolioVisit } from '../../lib/analytics/portfolioVisitors';

type PortfolioVisitorCountProps = {
  variant?: 'desktop' | 'mobile';
};

/**
 * Subtle aggregate portfolio visitor counter.
 * Hidden entirely while loading or when the backend is unavailable,
 * so it never flashes a fake "0" and never breaks layout.
 */
export const PortfolioVisitorCount: React.FC<PortfolioVisitorCountProps> = ({
  variant = 'desktop',
}) => {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    registerPortfolioVisit().then((value) => {
      if (!cancelled) setCount(value);
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
        className="flex items-center justify-between font-mono text-xs text-[#5F6873] dark:text-[#A7B0BA] py-1 select-none"
        role="status"
        aria-label={`${number} portfolio visits`}
      >
        <span className="flex items-center gap-2" aria-hidden="true">
          <Eye className="w-3.5 h-3.5" strokeWidth={1.8} />
          Portfolio visits
        </span>
        <span className="font-semibold text-[#111318] dark:text-[#F4F6F8]" aria-hidden="true">
          {number}
        </span>
      </div>
    );
  }

  return (
    <span
      className="flex items-center gap-1.5 text-[11px] font-mono text-[#5F6873] dark:text-[#A7B0BA] py-1 cursor-default select-none"
      aria-label={`${count} portfolio visits`}
      title={`${number} portfolio visits`}
    >
      <Eye className="w-3.5 h-3.5" aria-hidden="true" strokeWidth={1.8} />
      <span className="font-medium text-[#111318] dark:text-[#F4F6F8]">{number}</span>
      <span className="hidden lg:inline">{word}</span>
    </span>
  );
};

export default PortfolioVisitorCount;