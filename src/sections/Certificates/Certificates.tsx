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
        className="w-full h-full p-2.5 flex flex-col justify-between select-none cursor-pointer bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] transition-colors border border-[var(--border-subtle)]"
      >
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-1">
          <span className="text-[9px] font-mono font-semibold text-[var(--accent)] uppercase tracking-wider">
            {cert.category}
          </span>
          <span className="text-[8px] font-mono text-[var(--text-muted)]">
            {cert.year}
          </span>
        </div>

        <div className="space-y-0.5 my-auto">
          <p className="text-[9px] font-sans font-bold text-[var(--text-primary)] leading-tight line-clamp-2">
            {cert.name}
          </p>
          <p className="text-[8px] text-[var(--text-secondary)] font-mono truncate">
            {cert.issuer}
          </p>
        </div>

        <div className="flex items-center justify-between pt-1 border-t border-[var(--border-subtle)] text-[8px] font-mono text-[var(--accent)]">
          <span className="font-medium flex items-center gap-0.5">
            {hasVerifyUrl ? 'Verify ↗' : hasImage ? 'Preview ↗' : 'Verified'}
          </span>
          {hasImage && <Award className="w-3 h-3 shrink-0 text-[var(--accent)]" />}
        </div>
      </div>
    );
  });

  return (
    <SectionContainer id="certifications" className="border-b border-[var(--border-subtle)] py-[var(--section-space)]">
      {/* ── Section Header ── */}
      <motion.div {...entrance()} className="mb-12 grid max-w-none gap-5 md:grid-cols-12 md:items-end">
        <h2
          className="section-heading font-title text-[var(--text-primary)] md:col-span-5 md:mb-0"
        >
          Certificates &amp; Credentials
        </h2>

        <p className="body-copy text-[var(--text-secondary)] md:col-span-6 md:col-start-7">
          Credentials that support my software development and technical work.
        </p>
      </motion.div>

      {/* ── React Bits Interactive Folder (Signature Graphite + Copper detail) ── */}
      <div className="flex flex-col items-center justify-center border-y border-[var(--border-subtle)] py-12">
        <span className="font-sans text-sm sm:text-base font-bold text-[var(--text-primary)] mb-4">
          Certificates &amp; Credentials Folder
        </span>

        <div className="w-full min-h-[260px] sm:min-h-[310px] flex items-center justify-center py-6 overflow-visible">
          <Folder
            size={2.2}
            color="#141820"
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
          className="mt-6 inline-flex min-h-11 cursor-pointer items-center gap-2 border border-[var(--border)] bg-[var(--surface)] px-4 py-2 font-mono text-xs text-[var(--text-secondary)] transition-all duration-200 hover:-translate-y-px hover:border-[var(--accent)] hover:text-[var(--text-primary)]"
        >
          <span className="font-semibold text-[var(--text-primary)]">
            {certifications.length} credentials
          </span>
          <span>&bull;</span>
          <span className="text-[11px] text-[var(--accent)] font-medium">
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs"
            onClick={() => setActiveCert(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-3xl w-full bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden shadow-2xl p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[var(--border-subtle)]">
                <div>
                  <h3 className="font-sans font-bold text-sm text-[var(--text-primary)]">
                    {activeCert.name}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] font-mono">
                    {activeCert.issuer} &bull; {activeCert.year}
                  </p>
                </div>
                <button
                  onClick={() => setActiveCert(null)}
                  className="p-1 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex justify-center bg-[var(--background)] p-4 rounded-lg border border-[var(--border-subtle)]">
                <img
                  src={activeCert.image}
                  alt={activeCert.name}
                  className="max-h-[60vh] object-contain rounded-md"
                />
              </div>

              {activeCert.verifyUrl && (
                <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex justify-end">
                  <a
                    href={activeCert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--on-accent)] font-mono text-xs font-semibold rounded-lg transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Verify Credential Online</span>
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
