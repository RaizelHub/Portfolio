import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Folder, FolderOpen, ChevronDown } from 'lucide-react';
import { useSound } from '../../context/SoundContext';

interface CertificateFolderProps {
  isOpen: boolean;
  onToggle: () => void;
  count: number;
}

export const CertificateFolder: React.FC<CertificateFolderProps> = ({
  isOpen,
  onToggle,
  count,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { playHover, playClick } = useSound();
  const prefersReducedMotion = useReducedMotion();

  const isExpanded = isOpen || isHovered;

  return (
    <div className="flex flex-col items-center justify-center my-6 select-none">
      <button
        type="button"
        onClick={() => {
          playClick();
          onToggle();
        }}
        onMouseEnter={() => {
          playHover();
          setIsHovered(true);
        }}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        aria-expanded={isOpen}
        aria-controls="certificate-list"
        aria-label={isOpen ? 'Close certificates folder' : 'Open certificates folder'}
        className="group relative flex flex-col items-center p-4 sm:p-6 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] cursor-pointer transition-transform duration-200"
        style={{
          transform: !prefersReducedMotion && isHovered ? 'translateY(-3px)' : 'none',
        }}
      >
        {/* Title above folder */}
        <span className="font-sans text-base sm:text-lg font-bold text-[#111318] dark:text-[#F4F6F8] group-hover:text-[#2563EB] dark:group-hover:text-[#60A5FA] transition-colors mb-4">
          Certificates
        </span>

        {/* ── Interactive 3D Graphite Folder Container ── */}
        <div
          className="relative w-36 h-28 sm:w-44 sm:h-32 flex items-end justify-center perspective-[800px]"
          style={{ perspective: '800px' }}
        >
          {/* Back folder tab + backplate */}
          <div
            className={`absolute inset-0 rounded-xl bg-[#E5E9EE] dark:bg-[#171C22] border transition-colors duration-200 ${
              isOpen || isHovered
                ? 'border-[#2563EB]/60 dark:border-[#60A5FA]/60 shadow-xs'
                : 'border-[#C5CCD5] dark:border-[#242B33]'
            }`}
          >
            {/* Top folder tab */}
            <div
              className={`absolute -top-3 left-3 w-14 sm:w-16 h-4 rounded-t-md bg-[#E5E9EE] dark:bg-[#171C22] border-t border-x transition-colors duration-200 ${
                isOpen || isHovered
                  ? 'border-[#2563EB]/60 dark:border-[#60A5FA]/60'
                  : 'border-[#C5CCD5] dark:border-[#242B33]'
              }`}
            />
          </div>

          {/* ── Document Sheets Rising from Inside ── */}
          <div className="absolute inset-x-3 bottom-2 h-20 sm:h-24 flex items-center justify-center pointer-events-none">
            {/* Sheet 1 (Left tilt) */}
            <motion.div
              initial={false}
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      y: isExpanded ? -24 : -4,
                      rotate: isExpanded ? -7 : -2,
                      scale: isExpanded ? 0.98 : 0.94,
                    }
              }
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute w-24 sm:w-28 h-18 sm:h-22 rounded bg-[#FFFFFF] dark:bg-[#20262E] border border-[#DCE1E7] dark:border-[#343D48] shadow-xs p-2 flex flex-col gap-1.5"
            >
              <div className="w-8 h-1 rounded-full bg-[#2563EB]/40 dark:bg-[#60A5FA]/40" />
              <div className="w-full h-1 rounded-full bg-[#E5E9EE] dark:bg-[#2A323D]" />
              <div className="w-4/5 h-1 rounded-full bg-[#E5E9EE] dark:bg-[#2A323D]" />
            </motion.div>

            {/* Sheet 2 (Right tilt) */}
            <motion.div
              initial={false}
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      y: isExpanded ? -26 : -3,
                      rotate: isExpanded ? 7 : 2,
                      scale: isExpanded ? 0.98 : 0.94,
                    }
              }
              transition={{ duration: 0.27, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute w-24 sm:w-28 h-18 sm:h-22 rounded bg-[#FFFFFF] dark:bg-[#20262E] border border-[#DCE1E7] dark:border-[#343D48] shadow-xs p-2 flex flex-col gap-1.5"
            >
              <div className="w-7 h-1 rounded-full bg-[#78828D]/50 dark:bg-[#7F8994]/50" />
              <div className="w-full h-1 rounded-full bg-[#E5E9EE] dark:bg-[#2A323D]" />
              <div className="w-3/4 h-1 rounded-full bg-[#E5E9EE] dark:bg-[#2A323D]" />
            </motion.div>

            {/* Sheet 3 (Center foreground paper) */}
            <motion.div
              initial={false}
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      y: isExpanded ? -32 : -2,
                      scale: isExpanded ? 1 : 0.96,
                    }
              }
              transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute w-26 sm:w-30 h-18 sm:h-22 rounded bg-[#FFFFFF] dark:bg-[#2A323D] border border-[#C5CCD5] dark:border-[#343D48] shadow-sm p-2.5 flex flex-col gap-1.5 z-10"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-1.5 rounded-full bg-[#2563EB] dark:bg-[#60A5FA]" />
                <div className="w-3 h-3 rounded-full border border-[#2563EB]/40 dark:border-[#60A5FA]/40 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB] dark:bg-[#60A5FA]" />
                </div>
              </div>
              <div className="w-full h-1 rounded-full bg-[#E5E9EE] dark:bg-[#1E232B]" />
              <div className="w-5/6 h-1 rounded-full bg-[#E5E9EE] dark:bg-[#1E232B]" />
              <div className="w-2/3 h-1 rounded-full bg-[#E5E9EE] dark:bg-[#1E232B]" />
            </motion.div>
          </div>

          {/* ── Front Folder Flap (Rotates forward on hover/open) ── */}
          <motion.div
            initial={false}
            animate={
              prefersReducedMotion
                ? {}
                : {
                    rotateX: isOpen ? -38 : isHovered ? -24 : 0,
                    y: isOpen ? 2 : 0,
                  }
            }
            transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ transformOrigin: 'bottom center', transformStyle: 'preserve-3d' }}
            className={`relative z-20 w-full h-22 sm:h-26 rounded-xl bg-[#DCE1E7] dark:bg-[#20262E] border flex flex-col justify-between p-3 transition-colors duration-200 ${
              isOpen || isHovered
                ? 'border-[#2563EB]/70 dark:border-[#60A5FA]/70 shadow-md'
                : 'border-[#B8C2CC] dark:border-[#343D48] shadow-xs'
            }`}
          >
            {/* Folder spine / subtle inner glow */}
            <div className="flex items-center justify-between">
              <div className="w-2.5 h-2.5 rounded-sm bg-[#B8C2CC] dark:bg-[#171C22] border border-[#9CA8B6] dark:border-[#343D48]" />
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-[#2563EB] dark:bg-[#60A5FA] opacity-80" />
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-[#5F6873] dark:text-[#A7B0BA]">
              <span className="font-semibold uppercase tracking-wider text-[9px]">
                {count} Docs
              </span>
              {isOpen ? (
                <FolderOpen className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#60A5FA]" />
              ) : (
                <Folder className="w-3.5 h-3.5" />
              )}
            </div>
          </motion.div>
        </div>

        {/* Count & Status below folder */}
        <div className="mt-4 flex items-center gap-1.5 text-xs font-mono text-[#5F6873] dark:text-[#A7B0BA]">
          <span className="font-semibold text-[#111318] dark:text-[#F4F6F8]">
            {count} {count === 1 ? 'credential' : 'credentials'}
          </span>
          <span>&bull;</span>
          <span className="text-[11px] text-[#2563EB] dark:text-[#60A5FA] inline-flex items-center gap-0.5">
            {isOpen ? 'Click to close' : 'Click to open'}
            <ChevronDown
              className={`w-3 h-3 transition-transform duration-200 ${
                isOpen ? 'rotate-180 text-[#2563EB] dark:text-[#60A5FA]' : ''
              }`}
            />
          </span>
        </div>
      </button>
    </div>
  );
};
