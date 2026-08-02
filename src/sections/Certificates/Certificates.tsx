import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, X } from 'lucide-react';
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
    <SectionContainer id="certifications" className="py-16 border-b border-[#D5D0C7]">
      <SectionHeading
        tag="05 // CREDENTIALS & CERTIFICATIONS"
        title="Professional Certifications"
        subtitle="Industry certifications, CCNA training, and official technical credentials."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
        {certifications.map((cert) => {
          const hasImage = Boolean(cert.image);
          return (
            <div
              key={cert.id}
              onClick={() => hasImage && setActiveCert(cert)}
              className={`group relative bg-[#EFEBE4] border border-[#D5D0C7] rounded-[2px] overflow-hidden flex flex-col transition-all duration-200 ${
                hasImage ? 'cursor-pointer hover:border-[#171717]' : 'cursor-default'
              }`}
            >
              {hasImage ? (
                <div className="relative overflow-hidden bg-[#F4F1EA] border-b border-[#D5D0C7]" style={{ height: '160px' }}>
                  <img
                    src={`/${cert.image}`}
                    alt={`${cert.name} certificate`}
                    className="w-full h-full object-cover object-top transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-[#171717]/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="text-xs font-mono font-semibold text-[#F4F1EA] bg-[#C7462D] px-3 py-1 rounded-[1px] flex items-center gap-1.5 uppercase">
                      <Award className="w-3.5 h-3.5" /> View Credential
                    </span>
                  </div>
                </div>
              ) : (
                <div className="h-[160px] bg-[#F4F1EA] border-b border-[#D5D0C7] flex items-center justify-center font-mono">
                  <span className="text-3xl font-bold text-[#6B6862]">
                    {cert.abbreviation}
                  </span>
                </div>
              )}

              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xl font-mono font-bold text-[#C7462D]">
                      {cert.abbreviation}
                    </span>
                    {cert.year && (
                      <span className="text-[10px] font-mono font-bold text-[#171717] bg-[#F4F1EA] border border-[#D5D0C7] px-2 py-0.5 rounded-[1px]">
                        {cert.year}
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-bold text-[#171717] block mb-1 leading-snug uppercase">
                    {cert.name}
                  </span>
                  <span className="text-xs text-[#6B6862] font-mono">{cert.issuer}</span>
                </div>

                <div className="mt-4 pt-3 border-t border-[#D5D0C7] flex items-center justify-between font-mono text-xs">
                  {hasImage ? (
                    <span className="text-[#171717] hover:text-[#C7462D] flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-[#C7462D]" /> INSPECT ↗
                    </span>
                  ) : (
                    <span className="text-[#6B6862]">VERIFIED RECORD</span>
                  )}
                  {cert.verifyUrl && (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-[#C7462D] font-bold hover:underline flex items-center gap-1"
                    >
                      <span>VERIFY ↗</span>
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
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#171717]/70 backdrop-blur-sm"
            onClick={() => setActiveCert(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-3xl w-full bg-[#F4F1EA] border-2 border-[#171717] rounded-[2px] overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 py-3 border-b border-[#D5D0C7] bg-[#EFEBE4] font-mono">
                <div>
                  <span className="text-sm font-bold text-[#171717]">{activeCert.name}</span>
                  <span className="text-xs text-[#6B6862] block">{activeCert.issuer}</span>
                </div>
                <button
                  onClick={() => setActiveCert(null)}
                  className="p-1 rounded border border-[#D5D0C7] text-[#171717] hover:bg-[#F4F1EA]"
                  aria-label="Close viewer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-[#F4F1EA] p-4 flex items-center justify-center">
                <img
                  src={`/${activeCert.image}`}
                  alt={`${activeCert.name} certificate`}
                  className="w-full h-auto max-h-[70vh] object-contain border border-[#D5D0C7]"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionContainer>
  );
};