import React from 'react';

interface KeyEngineeringProps {
  items: string[];
}

export const KeyEngineering: React.FC<KeyEngineeringProps> = ({ items }) => (
  <div>
    <p className="text-[10px] font-mono font-bold uppercase tracking-[0.14em] text-[#C7462D] dark:text-[#E25235] mb-2.5">
      Key Engineering
    </p>
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-2.5 text-[12px] text-[#6B6862] dark:text-[#A9A39A] font-mono leading-snug"
        >
          <span className="text-[#C7462D] dark:text-[#E25235] shrink-0 mt-[1px] font-bold">›</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);
