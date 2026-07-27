import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, X, ExternalLink } from 'lucide-react';
import { SectionContainer } from '../../components/layout/SectionContainer';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { certifications } from '../../data/certifications';
import type { Certificate } from '../../types';

export const Certificates = () => {
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveCert(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <SectionContainer id="certifications">
      <SectionHeading
        tag="06 / Certifications"
        title="Professional Certifications"
        subtitle="Industry certifications and official training credentials."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
        {certifications.map((cert) => {
          const hasImage = Boolean(cert.image);
          return (
            <div
              key={cert.id}
              onClick={() => hasImage && setActiveCert(cert)}
              className={`group relative bg-navy-800/20 border border-navy-700/50 rounded-xl overflow-hidden flex flex-col transition-all duration-300 ${
                hasImage ? 'cursor-pointer hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/5 hover:-translate-y-0.5' : 'cursor-default hover:border-navy-600/60'
              }`}
            >
              {hasImage ? (
                <div className="relative overflow-hidden bg-navy-950 border-b border-navy-700/40" style={{ height: '160px' }}>
                  <img
                    src={`/${cert.image}`}
                    alt={`${cert.name} certificate`}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-navy-950/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs font-semibold text-white bg-emerald-500/90 px-3 py-1.5 rounded-full flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5" /> View Certificate
                    </span>
                  </div>
                </div>
              ) : (
                <div className="h-[160px] bg-gradient-to-br from-navy-900 to-navy-950 border-b border-navy-700/40 flex items-center justify-center">
                  <span className="text-4xl font-black text-navy-700 select-none group-hover:text-navy-600 transition-colors">
                    {cert.abbreviation}
                  </span>
                </div>
              )}

              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xl font-black text-emerald-400 group-hover:text-emerald-300 transition-colors select-none">
                      {cert.abbreviation}
                    </span>
                    {cert.year && (
                      <span className="text-[10px] font-mono font-bold text-slate-500 bg-navy-900 border border-navy-800 px-2 py-0.5 rounded shrink-0">
                        {cert.year}
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-bold text-white block mb-1 leading-snug">
                    {cert.name}
                  </span>
                  <span className="text-xs text-slate-400">{cert.issuer}</span>
                </div>

                <div className="mt-3 pt-3 border-t border-navy-700/30 flex items-center justify-between">
                  {hasImage ? (
                    <span className="text-[11px] font-mono text-emerald-500/80 flex items-center gap-1">
                      <Award className="w-3 h-3" /> View Certificate
                    </span>
                  ) : (
                    <span className="text-[11px] font-mono text-slate-500">Verified Credential</span>
                  )}
                  {cert.verifyUrl && (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-[11px] font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                    >
                      <span>Verify</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <AnimatePresence>
        {activeCert && activeCert.image && (
          <motion.div
            key="cert-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8 bg-navy-950/90 backdrop-blur-sm"
            onClick={() => setActiveCert(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative max-w-3xl w-full bg-navy-900 border border-navy-700 rounded-2xl overflow-hidden shadow-2xl shadow-navy-950/80"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-navy-800 bg-navy-950/60">
                <div>
                  <span className="text-sm font-bold text-white">{activeCert.name}</span>
                  <span className="text-xs text-slate-400 block">{activeCert.issuer}</span>
                </div>
                <button
                  onClick={() => setActiveCert(null)}
                  className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-navy-800 transition-colors"
                  aria-label="Close certificate viewer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-white p-4 flex items-center justify-center">
                <img
                  src={`/${activeCert.image}`}
                  alt={`${activeCert.name} certificate`}
                  className="w-full h-auto max-h-[70vh] object-contain"
                />
              </div>

              <div className="px-5 py-3 border-t border-navy-800 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500">Click outside or &times; to close</span>
                <div className="flex items-center gap-3">
                  {activeCert.verifyUrl && (
                    <a
                      href={activeCert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded font-semibold transition-colors flex items-center gap-1.5"
                    >
                      <span>Verify Credential</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  <a
                    href={`/${activeCert.image}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-white transition-colors font-semibold"
                  >
                    Open full size &rarr;
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionContainer>
  );
};