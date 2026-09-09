import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface SectionHeadingProps {
  tag?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  tag,
  title,
  subtitle,
  align = 'left',
}) => {
  const prefersReducedMotion = useReducedMotion();
  const isLeft = align === 'left';

  const anim = (delay = 0) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 12 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true as const, margin: '-50px' },
          transition: { duration: 0.4, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
        };

  return (
    <div className={`mb-6 max-w-3xl ${isLeft ? 'text-left' : 'mx-auto text-center'}`}>
      {tag && (
        <motion.span
          {...anim(0)}
          className="mb-1 block font-title text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-200"
        >
          {tag}
        </motion.span>
      )}

      <motion.h2
        {...anim(0.05)}
        className="font-title text-xl sm:text-2xl font-black tracking-tight text-neutral-900 dark:text-white leading-[1.1] mb-1.5"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          {...anim(0.1)}
          className="text-xs text-neutral-600 dark:text-neutral-300 font-normal leading-relaxed max-w-2xl"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};
