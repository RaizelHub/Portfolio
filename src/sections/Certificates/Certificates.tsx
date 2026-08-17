import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, ShieldCheck, Award } from 'lucide-react';
import { SectionContainer } from '../../components/layout/SectionContainer';
import Folder from '../../components/ui/Folder/Folder';
import { certifications } from '../../data/certifications';
import type { Certificate } from '../../types';
import { useSound } from '../../context/SoundContext';

export const Certificates: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);
  const { playHover, playClick } = useSound();
  const prefersReducedMotion = useReducedMotion();

  // Keyboard Escape listener for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveCert(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const entrance = (delay = 0) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true as const, margin: '-60px' },
          transition: { duration: 0.45, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
        };

  // Mini paper contents rendered directly inside the React Bits Folder
  const paperItems = certifications.slice(0, 3).map((cert) => {
    const hasImage = Boolean(cert.image);
    const hasVerifyUrl = Boolean(cert.verifyUrl);

    return (
      <div
        key={cert.id}
        onClick={(e) => {
          if (!isOpen) return;
          e.stopPropagation();
          playClick();
          if (hasImage) {
            setActiveCert(cert);
          } else if (hasVerifyUrl) {
            window.open(cert.verifyUrl, '_blank', 'noopener,noreferrer');
          }
        }}
        className="w-full h-full p-2.5 flex flex-col justify-between select-none cursor-pointer bg-[#FFFFFF] dark:bg-[#1E232B] hover:bg-[#F8FAFC] dark:hover:bg-[#252B35] transition-colors border border-[#DCE1E7]/60 dark:border-[#343D48]/60"
      >
        <div className="flex items-center justify-between border-b border-[#DCE1E7] dark:border-[#343D48] pb-1">
          <span className="text-[9px] font-mono font-bold text-[#2563EB] dark:text-[#60A5FA] uppercase tracking-wider">
            {cert.category}
          </span>
          <span className="text-[8px] font-mono text-[#78828D] dark:text-[#7F8994]">
            {cert.year}
          </span>
        </div>

        <div className="space-y-0.5 my-auto">
          <p className="text-[9px] font-sans font-bold text-[#111318] dark:text-[#F4F6F8] leading-tight line-clamp-2">
            {cert.name}
          </p>
          <p className="text-[8px] text-[#5F6873] dark:text-[#A7B0BA] font-mono truncate">
            {cert.issuer}
          </p>
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-[#DCE1E7] dark:border-[#343D48] text-[8px] font-mono text-[#2563EB] dark:text-[#60A5FA]">
          <span className="font-semibold flex items-center gap-0.5">
            {hasVerifyUrl ? 'Verify ↗' : hasImage ? 'Preview ↗' : 'Verified'}
          </span>
          {hasImage && <Award className="w-3 h-3 shrink-0" />}
        </div>
      </div>
    );
  });

  return (
    <SectionContainer id="certifications" className="py-16 border-b border-[#DCE1E7] dark:border-[#242B33]">
      {/* ── Section Header ── */}
      <motion.div {...entrance()} className="max-w-3xl mb-10">
        <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#2563EB] dark:text-[#60A5FA] block mb-3">
          CREDENTIALS
        </span>

        <h2
          className="font-sans font-bold text-[#111318] dark:text-[#F4F6F8] leading-[1.12] mb-3"
          style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.1rem)' }}
        >
          Certificates &amp; technical training.
        </h2>

        <p className="text-sm sm:text-base text-[#5F6873] dark:text-[#A7B0BA] leading-relaxed max-w-xl font-sans">
          Credentials that support my software development and technical work.
        </p>
      </motion.div>

      {/* ── React Bits Interactive Folder (All credentials contained inside) ── */}
      <div className="my-10 flex flex-col items-center justify-center">
        <span className="font-sans text-sm sm:text-base font-bold text-[#111318] dark:text-[#F4F6F8] mb-4">
          Certificates &amp; Credentials Folder
        </span>

        <div className="w-full min-h-[260px] sm:min-h-[310px] flex items-center justify-center py-6 overflow-visible">
          <Folder
            size={2.2}
            color="#2563EB"
            isOpen={isOpen}
            onToggle={() => {
              playClick();
              setIsOpen((prev) => !prev);
            }}
            items={paperItems}
          />
        </div>

        {/* Count & Toggle Prompt */}
        <button
          type="button"
          onClick={() => {
            playClick();
            setIsOpen((prev) => !prev);
          }}
          onMouseEnter={playHover}
          className="mt-6 inline-flex items-center gap-2 text-xs font-mono text-[#5F6873] dark:text-[#A7B0BA] hover:text-[#2563EB] dark:hover:text-[#60A5FA] transition-colors cursor-pointer bg-[#FFFFFF] dark:bg-[#11151A] border border-[#DCE1E7] dark:border-[#242B33] hover:border-[#2563EB] dark:hover:border-[#60A5FA] px-4 py-2 rounded-lg shadow-2xs"
        >
          <span className="font-semibold text-[#111318] dark:text-[#F4F6F8]">
            {certifications.length} credentials
          </span>
          <span>&bull;</span>
          <span className="text-[11px] text-[#2563EB] dark:text-[#60A5FA] font-medium">
            {isOpen ? 'Click to close folder' : 'Click to open folder'}
          </span>
        </button>
      </div>

      {/* ── Clean Certificate Image Lightbox Modal ── */}
      <AnimatePresence>
        {activeCert && activeCert.image && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs"
            onClick={() => setActiveCert(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="relative max-w-3xl w-full bg-[#FFFFFF] dark:bg-[#11151A] border border-[#DCE1E7] dark:border-[#242B33] rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-[#DCE1E7] dark:border-[#242B33] bg-[#F1F3F5] dark:bg-[#171C22]">
                <div>
                  <h4 className="font-sans text-sm font-bold text-[#111318] dark:text-[#F4F6F8]">
                    {activeCert.name}
                  </h4>
                  <span className="text-xs text-[#5F6873] dark:text-[#A7B0BA] font-sans">
                    {activeCert.issuer} ({activeCert.year})
                  </span>
                </div>
                <button
                  onClick={() => setActiveCert(null)}
                  className="p-1 rounded-md text-[#5F6873] dark:text-[#A7B0BA] hover:bg-black/5 dark:hover:bg-white/5"
                  aria-label="Close certificate viewer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-4 flex items-center justify-center max-h-[75vh] overflow-auto bg-[#F7F8FA] dark:bg-[#0B0D10]">
                <img
                  src={`/${activeCert.image}`}
                  alt={`${activeCert.name} certificate`}
                  className="w-full h-auto object-contain rounded-lg border border-[#DCE1E7] dark:border-[#242B33]"
                />
              </div>

              {/* Modal Footer */}
              {activeCert.verifyUrl && (
                <div className="px-5 py-3 border-t border-[#DCE1E7] dark:border-[#242B33] bg-[#F1F3F5] dark:bg-[#171C22] flex justify-end">
                  <a
                    href={activeCert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClick}
                    className="px-4 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-sans font-semibold rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verify Credential ↗</span>
                  </a>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionContainer>
  );
};