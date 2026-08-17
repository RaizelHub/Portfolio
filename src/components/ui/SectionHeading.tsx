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
    <div className={`mb-10 max-w-3xl ${isLeft ? 'text-left' : 'mx-auto text-center'}`}>
      {tag && (
        <motion.span
          {...anim(0)}
          className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#2563EB] dark:text-[#60A5FA] block mb-3"
        >
          {tag}
        </motion.span>
      )}

      <motion.h2
        {...anim(0.05)}
        className="font-sans text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#111318] dark:text-[#F4F6F8] mb-3"
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          {...anim(0.1)}
          className="text-sm sm:text-base text-[#5F6873] dark:text-[#A7B0BA] font-sans leading-relaxed max-w-xl"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};
