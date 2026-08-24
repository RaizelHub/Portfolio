import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface DeviceMockupProps {
  src: string;
  alt: string;
  priority?: 'primary' | 'secondary';
  rotation?: number;
  floatDelay?: number;
}

export const DeviceMockup: React.FC<DeviceMockupProps> = ({
  src,
  alt,
  priority = 'secondary',
  rotation = 0,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const isPrimary = priority === 'primary';

  return (
    <motion.div
      whileHover={prefersReducedMotion ? undefined : { y: isPrimary ? -5 : -3 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotate: rotation }}
      className={`relative select-none flex-shrink-0 ${isPrimary
        ? 'w-[clamp(9.5rem,26vw,11.75rem)] max-w-full'
        : 'w-[clamp(8rem,23vw,10rem)] max-w-full'
        }`}
    >
      {/* Phone shell */}
      <div
        className={`relative rounded-[2.5rem] overflow-hidden bg-[#14120E]
          ${isPrimary
            ? 'border border-[#38342E] shadow-[0_28px_72px_rgba(0,0,0,0.24)] dark:shadow-[0_28px_72px_rgba(0,0,0,0.60)]'
            : 'border border-[#2C2926] opacity-80 dark:opacity-65 shadow-[0_16px_48px_rgba(0,0,0,0.16)] dark:shadow-[0_16px_48px_rgba(0,0,0,0.48)]'
          }`}
      >
        {/* Status bar (decorative notch area) */}
        <div className="h-6 bg-[#14120E] flex items-center justify-center">
          <div className="w-[60px] h-[12px] bg-[#0A0908] rounded-full" />
        </div>

        {/* Screenshot area */}
        <div className="aspect-[9/18] overflow-hidden bg-[#111]">
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Home indicator */}
        <div className="h-5 bg-[#14120E] flex items-center justify-center">
          <div className="w-16 h-[3px] bg-[#38342E] rounded-full" />
        </div>
      </div>
    </motion.div>
  );
};
