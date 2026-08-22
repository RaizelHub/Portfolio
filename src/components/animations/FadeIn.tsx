import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

const directionMap = {
  up: { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 } },
  down: { initial: { opacity: 0, y: -24 }, animate: { opacity: 1, y: 0 } },
  left: { initial: { opacity: 0, x: 24 }, animate: { opacity: 1, x: 0 } },
  right: { initial: { opacity: 0, x: -24 }, animate: { opacity: 1, x: 0 } },
  none: { initial: { opacity: 0 }, animate: { opacity: 1 } },
};

export const FadeIn = ({
  children,
  className,
  delay = 0,
  duration = 0.6,
  direction = 'up',
}: FadeInProps) => {
  const prefersReducedMotion = useReducedMotion();
  const variants = directionMap[direction];

  return (
    <motion.div
      className={className}
      initial={prefersReducedMotion ? { opacity: 0 } : variants.initial}
      whileInView={prefersReducedMotion ? { opacity: 1 } : variants.animate}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: prefersReducedMotion ? 0.01 : duration, delay: prefersReducedMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};
