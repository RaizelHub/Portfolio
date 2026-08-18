import React from 'react';

interface KeyEngineeringProps {
  items: string[];
}

export const KeyEngineering: React.FC<KeyEngineeringProps> = ({ items }) => (
  <div>
    <p className="text-[10px] font-mono font-semibold uppercase tracking-[0.14em] text-[var(--accent)] mb-2.5">
      Key Implementation
    </p>
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-2 text-[12px] text-[var(--text-secondary)] font-mono leading-snug"
        >
          <span className="text-[var(--accent)] shrink-0 mt-[1px] font-bold">›</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);
