import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, ShieldCheck } from 'lucide-react';
import { SectionContainer } from '../../components/layout/SectionContainer';
import { certifications } from '../../data/certifications';
import type { Certificate } from '../../types';

export const Certificates: React.FC = () => {
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);
  const prefersReducedMotion = useReducedMotion();

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
          transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
        };

  return (
    <SectionContainer id="certifications" className="border-b border-[var(--border-subtle)] py-[var(--section-space)]">
      {/* ── Section Header ── */}
      <motion.div {...entrance()} className="mb-10 grid max-w-none gap-5 md:grid-cols-12 md:items-end">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3 mb-4">
            <span className="section-number">06</span>
            <div className="h-px w-6 bg-[var(--border)]" />
            <span className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-[var(--text-muted)]">
              Credentials
            </span>
          </div>
          <h2 className="section-heading font-title text-[var(--text-primary)]">
            Certificates
          </h2>
        </div>

        <p className="body-copy text-[var(--text-secondary)] md:col-span-6 md:col-start-7">
          Credentials that support my technical work.
        </p>
      </motion.div>

      {/* ── Compact Certificate List ── */}
      <div className="border-t border-[var(--border-subtle)]">
        {certifications.map((cert, idx) => {
          const hasImage = Boolean(cert.image);
          const hasVerifyUrl = Boolean(cert.verifyUrl);

          return (
            <motion.div
              key={cert.id}
              {...entrance(idx * 0.05)}
              className="grid gap-4 border-b border-[var(--border-subtle)] py-5 sm:grid-cols-12 sm:items-center sm:gap-6"
            >
              {/* Year */}
              <span className="font-mono text-xs font-medium text-[var(--accent)] sm:col-span-1">
                {cert.year}
              </span>

              {/* Name + Issuer */}
              <div className="sm:col-span-7">
                <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                  {cert.name}
                </h3>
                <span className="text-xs text-[var(--text-secondary)]">
                  {cert.issuer}
                </span>
              </div>

              {/* Category */}
              <span className="hidden font-mono text-xs text-[var(--text-muted)] sm:col-span-2 sm:block">
                {cert.category}
              </span>

              {/* Action */}
              <div className="sm:col-span-2 sm:text-right">
                {hasImage ? (
                  <button
                    type="button"
                    onClick={() => setActiveCert(cert)}
                    className="font-mono text-xs font-medium text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--accent)] cursor-pointer"
                  >
                    Preview ↗
                  </button>
                ) : hasVerifyUrl ? (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs font-medium text-[var(--text-secondary)] transition-colors duration-200 hover:text-[var(--accent)]"
                  >
                    Verify ↗
                  </a>
                ) : (
                  <span className="font-mono text-xs text-[var(--text-muted)]">Verified</span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Certificate Image Lightbox ── */}
      <AnimatePresence>
        {activeCert && activeCert.image && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setActiveCert(null)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="relative max-w-3xl w-full overflow-hidden border border-[var(--border)] bg-[var(--surface)] p-5"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[var(--border-subtle)]">
                <div>
                  <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                    {activeCert.name}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] font-mono">
                    {activeCert.issuer} · {activeCert.year}
                  </p>
                </div>
                <button
                  onClick={() => setActiveCert(null)}
                  className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex justify-center bg-[var(--background)] p-4 border border-[var(--border-subtle)]">
                <img
                  src={activeCert.image}
                  alt={activeCert.name}
                  className="max-h-[60vh] object-contain"
                />
              </div>

              {activeCert.verifyUrl && (
                <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex justify-end">
                  <a
                    href={activeCert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--on-accent)] font-mono text-xs font-semibold transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Verify Credential</span>
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
