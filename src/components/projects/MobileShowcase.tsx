import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { DeviceMockup } from './DeviceMockup';

interface MobileShowcaseProps {
  /** Up to 3 image paths (relative to public root, e.g. "img/subora1 (1).jpg") */
  images: string[];
  projectName: string;
}

export const MobileShowcase: React.FC<MobileShowcaseProps> = ({ images, projectName }) => {
  const prefersReducedMotion = useReducedMotion();
  const [img0, img1, img2] = images;

  const sideEntrance = (xFrom: number, delay: number) =>
    prefersReducedMotion
      ? {}
      : {
        initial: { opacity: 0, x: xFrom },
        whileInView: { opacity: 1, x: 0 },
        viewport: { once: true as const, margin: '-60px' },
        transition: {
          duration: 0.55,
          ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
          delay,
        },
      };

  const centerEntrance = prefersReducedMotion
    ? {}
    : {
      initial: { opacity: 0, y: 28 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true as const, margin: '-60px' },
      transition: {
        duration: 0.55,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
        delay: 0.18,
      },
    };

  return (
    /* Outer container — constrains width, clips overflow, centers cluster */
    <div className="relative flex items-end justify-center px-4 py-6 w-full">
      {/* ── Left phone (desktop/tablet only) ── */}
      {img0 && (
        <motion.div
          {...sideEntrance(-24, 0.08)}
          /* Negative right margin creates overlap with centre phone */
          className="hidden sm:block -mr-5 lg:-mr-7 translate-y-6 z-0"
        >
          <DeviceMockup
            src={`/${img0}`}
            alt={`${projectName} — screen 1`}
            priority="secondary"
            rotation={-5}
            floatDelay={0.9}
          />
        </motion.div>
      )}

      {/* ── Centre phone (always visible) ── */}
      {img1 && (
        <motion.div {...centerEntrance} className="relative z-10">
          <DeviceMockup
            src={`/${img1}`}
            alt={`${projectName} — main screen`}
            priority="primary"
            rotation={0}
            floatDelay={0}
          />
        </motion.div>
      )}

      {/* ── Right phone (desktop/tablet only) ── */}
      {img2 && (
        <motion.div
          {...sideEntrance(24, 0.08)}
          /* Negative left margin creates overlap with centre phone */
          className="hidden sm:block -ml-5 lg:-ml-7 translate-y-6 z-0"
        >
          <DeviceMockup
            src={`/${img2}`}
            alt={`${projectName} — screen 3`}
            priority="secondary"
            rotation={5}
            floatDelay={1.3}
          />
        </motion.div>
      )}
    </div>
  );
};
