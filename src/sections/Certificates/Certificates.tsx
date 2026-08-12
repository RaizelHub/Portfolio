import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, X, ShieldCheck } from 'lucide-react';
import { SectionContainer } from '../../components/layout/SectionContainer';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { certifications } from '../../data/certifications';
import type { Certificate } from '../../types';
import { useSound } from '../../context/SoundContext';

export const Certificates = () => {
  const [activeCert, setActiveCert] = useState<Certificate | null>(null);
  const { playHover, playClick } = useSound();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveCert(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <SectionContainer id="certifications" className="py-16 border-b border-[#D5D0C7] dark:border-[#34312B]">
      <SectionHeading
        tag="06"
        title="certifications & training"
        subtitle="Technical certifications and training across networking, systems, and information security."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {certifications.map((cert) => {
          const hasImage = Boolean(cert.image);
          const hasVerifyUrl = Boolean(cert.verifyUrl);

          return (
            <div
              key={cert.id}
              onMouseEnter={playHover}
              onClick={() => {
                playClick();
                if (hasImage) {
                  setActiveCert(cert);
                } else if (hasVerifyUrl) {
                  window.open(cert.verifyUrl, '_blank', 'noopener,noreferrer');
                }
              }}
              className="group bg-[#EFEBE4] dark:bg-[#1D1C18] border border-[#D5D0C7] dark:border-[#34312B] hover:border-[#171717] dark:hover:border-[#F2EEE6] rounded-xl p-6 sm:p-7 flex flex-col justify-between space-y-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-md cursor-pointer select-none"
            >
              <div className="space-y-3">
                {/* Top Category & Year Header */}
                <div className="flex items-center justify-between border-b border-[#D5D0C7]/80 dark:border-[#34312B]/80 pb-3">
                  <span className="font-mono text-[11px] font-bold text-[#6B6862] dark:text-[#A9A39A] uppercase tracking-wider">
                    {cert.category}
                  </span>
                  <span className="font-mono text-xs font-bold text-[#171717] dark:text-[#F2EEE6] bg-[#F4F1EA] dark:bg-[#151411] border border-[#D5D0C7] dark:border-[#34312B] px-2.5 py-0.5 rounded-md">
                    {cert.year}
                  </span>
                </div>

                {/* Credential Title */}
                <h3 className="font-amarna text-lg sm:text-xl font-bold text-[#171717] dark:text-[#F2EEE6] group-hover:text-[#C7462D] dark:group-hover:text-[#E25235] transition-colors uppercase tracking-wide pt-1">
                  {cert.name}
                </h3>

                {/* Issuer */}
                <p className="text-xs sm:text-sm text-[#6B6862] dark:text-[#A9A39A] font-pt-sans font-medium">
                  {cert.issuer}
                </p>
              </div>

              {/* Bottom Action CTA */}
              <div className="pt-4 border-t border-[#D5D0C7]/80 dark:border-[#34312B]/80 flex items-center justify-between font-pt-sans text-xs font-bold text-[#171717] dark:text-[#F2EEE6]">
                <span className="group-hover:text-[#C7462D] dark:group-hover:text-[#E25235] flex items-center gap-1.5 transition-colors uppercase tracking-wider">
                  <Award className="w-4 h-4 text-[#C7462D] dark:text-[#E25235]" />
                  <span>VIEW CREDENTIAL ↗</span>
                </span>

                {cert.verifyUrl && (
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      e.stopPropagation();
                      playClick();
                    }}
                    className="text-[#6B6862] dark:text-[#A9A39A] hover:text-[#171717] dark:hover:text-[#F2EEE6] transition-colors p-1"
                    title="Verify Badge"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Certificate Viewer Lightbox */}
      <AnimatePresence>
        {activeCert && activeCert.image && (
          <motion.div
            key="cert-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#171717]/70 dark:bg-[#151411]/85 backdrop-blur-sm"
            onClick={() => setActiveCert(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-3xl w-full bg-[#F4F1EA] dark:bg-[#151411] border-2 border-[#171717] dark:border-[#34312B] rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#D5D0C7] dark:border-[#34312B] bg-[#EFEBE4] dark:bg-[#1D1C18]">
                <div>
                  <h4 className="font-amarna text-base font-bold text-[#171717] dark:text-[#F2EEE6] uppercase">
                    {activeCert.name}
                  </h4>
                  <span className="text-xs text-[#6B6862] dark:text-[#A9A39A] font-pt-sans block">{activeCert.issuer} ({activeCert.year})</span>
                </div>
                <button
                  onClick={() => {
                    playClick();
                    setActiveCert(null);
                  }}
                  className="p-1.5 rounded-lg border border-[#D5D0C7] dark:border-[#34312B] text-[#171717] dark:text-[#F2EEE6] hover:bg-[#F4F1EA] dark:hover:bg-[#151411] transition-colors"
                  aria-label="Close viewer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="bg-[#F4F1EA] dark:bg-[#151411] p-4 flex items-center justify-center max-h-[75vh] overflow-auto">
                <img
                  src={`/${activeCert.image}`}
                  alt={`${activeCert.name} certificate`}
                  className="w-full h-auto object-contain border border-[#D5D0C7] dark:border-[#34312B] rounded-lg shadow-sm"
                />
              </div>

              {activeCert.verifyUrl && (
                <div className="px-5 py-3 border-t border-[#D5D0C7] dark:border-[#34312B] bg-[#EFEBE4] dark:bg-[#1D1C18] flex justify-end">
                  <a
                    href={activeCert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClick}
                    className="px-4 py-2 bg-[#171717] dark:bg-[#F2EEE6] hover:bg-[#C7462D] dark:hover:bg-[#E25235] text-[#F4F1EA] dark:text-[#151411] text-xs font-pt-sans font-bold rounded-xl transition-all flex items-center gap-1.5 uppercase tracking-wider"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#C7462D] dark:text-[#E25235]" />
                    <span>Verify Credential Badge ↗</span>
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