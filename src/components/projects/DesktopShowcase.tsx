import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Lock, ZoomIn, X } from 'lucide-react';
import { useSound } from '../../context/SoundContext';

interface DesktopShowcaseProps {
  images?: string[];
  projectName?: string;
  demoUrl?: string;
}

const defaultImages = [
  {
    src: 'img/collab.png',
    title: 'Multiplayer Whiteboard Canvas',
    subtitle: 'Real-time drawing, shapes, and live cursor presence',
  },
  {
    src: 'img/collab1.png',
    title: 'Workspace & Permissions',
    subtitle: 'Role-based access control, sharing, and board settings',
  },
  {
    src: 'img/collab2.png',
    title: 'Snapshots & Asset Export',
    subtitle: 'R2-backed asset management and accessible exports',
  },
];

export const DesktopShowcase: React.FC<DesktopShowcaseProps> = ({
  projectName = 'Collab',
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const { playHover, playClick } = useSound();
  const prefersReducedMotion = useReducedMotion();

  const currentImage = defaultImages[activeTab];

  return (
    <div className="w-full">
      {/* Browser Shell Mockup */}
      <div className="rounded-xl overflow-hidden border border-[#DCE1E7] dark:border-[#242B33] bg-[#FFFFFF] dark:bg-[#11151A] shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.50)] transition-all duration-200">
        {/* Top Browser Bar / Window Controls */}
        <div className="px-4 py-3 bg-[#F1F3F5] dark:bg-[#171C22] border-b border-[#DCE1E7] dark:border-[#242B33] flex items-center justify-between gap-3">
          {/* Traffic Lights */}
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="w-3 h-3 rounded-full bg-[#EF4444]/80 border border-[#DC2626]/40" />
            <div className="w-3 h-3 rounded-full bg-[#F59E0B]/80 border border-[#D97706]/40" />
            <div className="w-3 h-3 rounded-full bg-[#10B981]/80 border border-[#059669]/40" />
          </div>

          {/* Browser Address Bar */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-[#FFFFFF] dark:bg-[#0B0D10] border border-[#DCE1E7] dark:border-[#242B33] text-[11px] font-mono text-[#5F6873] dark:text-[#A7B0BA] max-w-sm sm:max-w-md w-full mx-auto justify-center sm:justify-start">
            <Lock className="w-3 h-3 text-[#10B981] shrink-0" />
            <span className="truncate">collab.live/board/live-workspace</span>
            <span className="hidden sm:inline-block ml-auto text-[9px] uppercase px-1.5 py-0.2 bg-[#2563EB]/10 text-[#2563EB] dark:text-[#60A5FA] font-bold rounded">
              DURABLE OBJECTS
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                playClick();
                setIsZoomed(true);
              }}
              onMouseEnter={playHover}
              title="Inspect high-res screen"
              className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/5 text-[#5F6873] dark:text-[#A7B0BA] hover:text-[#111318] dark:hover:text-[#F4F6F8] transition-colors"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Tab / View selector bar */}
        <div className="flex items-center gap-1 px-3 py-2 bg-[#F7F8FA] dark:bg-[#0E1116] border-b border-[#DCE1E7] dark:border-[#242B33] overflow-x-auto">
          {defaultImages.map((tab, idx) => {
            const isActive = activeTab === idx;
            return (
              <button
                key={tab.src}
                type="button"
                onMouseEnter={playHover}
                onClick={() => {
                  playClick();
                  setActiveTab(idx);
                }}
                className={`px-3 py-1.5 rounded-md text-[11px] font-mono whitespace-nowrap transition-all duration-150 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#FFFFFF] dark:bg-[#171C22] text-[#2563EB] dark:text-[#60A5FA] font-semibold border border-[#DCE1E7] dark:border-[#242B33] shadow-2xs'
                    : 'text-[#5F6873] dark:text-[#A7B0BA] hover:text-[#111318] dark:hover:text-[#F4F6F8]'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
                <span>{tab.title}</span>
              </button>
            );
          })}
        </div>

        {/* Browser Content Area / Screenshot */}
        <div
          onClick={() => {
            playClick();
            setIsZoomed(true);
          }}
          className="group relative cursor-pointer overflow-hidden bg-[#0B0D10] aspect-[16/10] sm:aspect-[16/9.5] flex items-center justify-center"
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

          {/* Hover overlay hint */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-[#111318]/90 text-white text-xs font-mono px-3.5 py-1.5 rounded-md backdrop-blur-xs flex items-center gap-1.5 shadow-lg">
              <ZoomIn className="w-3.5 h-3.5 text-[#60A5FA]" />
              Click to expand screenshot
            </span>
          </div>

          {/* Bottom badge */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <span className="bg-[#111318]/80 dark:bg-[#0B0D10]/90 text-white/90 text-[10px] font-mono px-2.5 py-1 rounded backdrop-blur-xs border border-white/10">
              {currentImage.subtitle}
            </span>
            <span className="bg-[#2563EB]/90 text-white text-[10px] font-mono px-2 py-0.5 rounded font-semibold">
              Live Web App
            </span>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
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
              className="relative max-w-5xl w-full bg-[#FFFFFF] dark:bg-[#11151A] border border-[#DCE1E7] dark:border-[#242B33] rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 py-3 border-b border-[#DCE1E7] dark:border-[#242B33] bg-[#F1F3F5] dark:bg-[#171C22]">
                <div>
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#111318] dark:text-[#F4F6F8]">
                    {projectName} — {currentImage.title}
                  </h4>
                  <p className="text-[10px] font-mono text-[#5F6873] dark:text-[#A7B0BA]">
                    {currentImage.subtitle}
                  </p>
                </div>
                <button
                  onClick={() => setIsZoomed(false)}
                  className="p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/5 text-[#5F6873] dark:text-[#A7B0BA]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-3 max-h-[78vh] overflow-auto flex items-center justify-center bg-[#0B0D10]">
                <img
                  src={`/${currentImage.src}`}
                  alt={currentImage.title}
                  className="w-full h-auto object-contain rounded"
                />
              </div>

              <div className="px-5 py-2.5 border-t border-[#DCE1E7] dark:border-[#242B33] bg-[#F1F3F5] dark:bg-[#171C22] flex items-center justify-between text-xs font-mono text-[#5F6873] dark:text-[#A7B0BA]">
                <span>
                  Tab {activeTab + 1} of {defaultImages.length}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      setActiveTab((prev) =>
                        prev === 0 ? defaultImages.length - 1 : prev - 1
                      )
                    }
                    className="px-2.5 py-1 rounded bg-[#FFFFFF] dark:bg-[#11151A] border border-[#DCE1E7] dark:border-[#242B33] hover:text-[#2563EB] dark:hover:text-[#60A5FA]"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() =>
                      setActiveTab((prev) => (prev + 1) % defaultImages.length)
                    }
                    className="px-2.5 py-1 rounded bg-[#2563EB] text-white hover:bg-[#1D4ED8]"
                  >
                    Next
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
