import React from 'react';

interface KeyEngineeringProps {
  items: string[];
}

export const KeyEngineering: React.FC<KeyEngineeringProps> = ({ items }) => (
  <div className="min-w-0">
    <p className="mb-2.5 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
      Key Implementation
    </p>
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex min-w-0 items-start gap-2 text-sm leading-[1.55] text-[var(--text-secondary)]"
        >
          <span className="text-[var(--accent)] shrink-0 mt-[1px] font-bold">›</span>
          <span className="break-safe">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);
