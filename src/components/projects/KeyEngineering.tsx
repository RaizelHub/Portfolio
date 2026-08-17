import React from 'react';

interface KeyEngineeringProps {
  items: string[];
}

export const KeyEngineering: React.FC<KeyEngineeringProps> = ({ items }) => (
  <div>
    <p className="text-[10px] font-mono font-bold uppercase tracking-[0.14em] text-[#2563EB] dark:text-[#60A5FA] mb-2.5">
      Key Implementation
    </p>
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-2 text-[12px] text-[#5F6873] dark:text-[#A7B0BA] font-mono leading-snug"
        >
          <span className="text-[#2563EB] dark:text-[#60A5FA] shrink-0 mt-[1px] font-bold">›</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);
