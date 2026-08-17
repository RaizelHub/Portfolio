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
  floatDelay = 0,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const isPrimary = priority === 'primary';

  return (
    <motion.div
      // Continuous floating
      animate={
        prefersReducedMotion
          ? undefined
          : { y: [0, isPrimary ? -7 : -4, 0] }
      }
      transition={
        prefersReducedMotion
          ? undefined
          : {
              duration: isPrimary ? 4.2 : 3.6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: floatDelay,
            }
      }
      // Hover lift
      whileHover={prefersReducedMotion ? undefined : { y: isPrimary ? -11 : -6 }}
      style={{ rotate: rotation }}
      className={`relative select-none flex-shrink-0 ${
        isPrimary
          ? 'w-[158px] sm:w-[172px] lg:w-[188px]'
          : 'w-[136px] sm:w-[148px] lg:w-[160px]'
      }`}
    >
      {/* Phone shell */}
      <div
        className={`relative rounded-[2.5rem] overflow-hidden bg-[#14120E]
          ${
            isPrimary
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
