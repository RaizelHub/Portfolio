import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSound } from '../../context/SoundContext';

interface DesktopShowcaseProps {
  projectName?: string;
}

const showcaseImages = [
  {
    src: 'img/collab.png',
    title: 'Multiplayer Whiteboard Canvas',
    subtitle: 'Real-time vector drawing, shape rendering, and live cursor presence',
  },
  {
    src: 'img/collab1.png',
    title: 'Workspace & Permissions',
    subtitle: 'Role-based sharing (Owner, Editor, Viewer) with secure invite links',
  },
  {
    src: 'img/collab2.png',
    title: 'Snapshots & Asset Export',
    subtitle: 'Automated state persistence and Cloudflare R2 asset storage',
  },
];

export const DesktopShowcase: React.FC<DesktopShowcaseProps> = ({
  projectName = 'Collab',
}) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const { playHover, playClick } = useSound();
  const prefersReducedMotion = useReducedMotion();

  const currentImage = showcaseImages[activeIdx];

  return (
    <div className="w-full">
      {/* ── Neutral Portfolio Frame for Screenshot ── */}
      <div
        onClick={() => {
          playClick();
          setIsZoomed(true);
        }}
        onMouseEnter={playHover}
        className="group relative cursor-pointer rounded-xl overflow-hidden border border-[var(--border-subtle)] hover:border-[var(--border)] bg-[var(--surface)] shadow-lg transition-all duration-300 aspect-[16/10] sm:aspect-[16/9.5] flex items-center justify-center"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImage.src}
            src={`/${currentImage.src}`}
            alt={`${projectName} — ${currentImage.title}`}
            loading="lazy"
            decoding="async"
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            animate={prefersReducedMotion ? {} : { opacity: 1 }}
            exit={prefersReducedMotion ? {} : { opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="w-full h-full object-cover object-top group-hover:scale-[1.01] transition-transform duration-300"
          />
        </AnimatePresence>

        {/* Hover hint */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors flex items-center justify-center pointer-events-none">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-[var(--surface-elevated)]/95 text-[var(--text-primary)] border border-[var(--border)] text-xs font-mono px-3 py-1.5 rounded-md backdrop-blur-sm flex items-center gap-2 shadow-lg">
            <ZoomIn className="w-3.5 h-3.5 text-[var(--accent)]" />
            Expand screenshot
          </span>
        </div>

        {/* Dot Switcher Indicator */}
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--surface-elevated)]/85 backdrop-blur-md border border-[var(--border-subtle)]"
        >
          {showcaseImages.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                playClick();
                setActiveIdx(i);
              }}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${activeIdx === i
                ? 'w-5 bg-[var(--accent)]'
                : 'w-1.5 bg-[var(--text-muted)]/40 hover:bg-[var(--text-primary)]'
                }`}
              aria-label={`View screen ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ── High-Resolution Lightbox Modal ── */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs"
            onClick={() => setIsZoomed(false)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="relative max-w-5xl w-full bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-subtle)] bg-[var(--surface-elevated)]">
                <div>
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                    {projectName} &mdash; {currentImage.title}
                  </h4>
                  <p className="text-[11px] font-mono text-[var(--text-secondary)]">
                    {currentImage.subtitle}
                  </p>
                </div>
                <button
                  onClick={() => setIsZoomed(false)}
                  className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Image Canvas */}
              <div className="p-4 max-h-[75vh] overflow-auto flex items-center justify-center bg-[var(--background)]">
                <img
                  src={`/${currentImage.src}`}
                  alt={currentImage.title}
                  className="w-full h-auto object-contain rounded-md"
                />
              </div>

              {/* Modal Footer Controls */}
              <div className="px-6 py-3 border-t border-[var(--border-subtle)] bg-[var(--surface-elevated)] flex items-center justify-between text-xs font-mono text-[var(--text-secondary)]">
                <span>
                  Screenshot {activeIdx + 1} of {showcaseImages.length}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      setActiveIdx((prev) =>
                        prev === 0 ? showcaseImages.length - 1 : prev - 1
                      )
                    }
                    className="px-3 py-1.5 rounded-md bg-[var(--surface)] border border-[var(--border-subtle)] hover:border-[var(--border)] text-[var(--text-primary)] flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Previous</span>
                  </button>
                  <button
                    onClick={() =>
                      setActiveIdx((prev) => (prev + 1) % showcaseImages.length)
                    }
                    className="px-3 py-1.5 rounded-md bg-[var(--accent)] text-[var(--on-accent)] font-semibold hover:bg-[var(--accent-hover)] flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
