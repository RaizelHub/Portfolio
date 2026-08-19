import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Mail, Github, Linkedin, MapPin } from 'lucide-react';
import { SectionContainer } from '../../components/layout/SectionContainer';
import { profile } from '../../data/profile';
import { useSound } from '../../context/SoundContext';

export const Hero: React.FC = () => {
  const [showRealProfile, setShowRealProfile] = useState(false);
  const { playHover, playClick } = useSound();
  const prefersReducedMotion = useReducedMotion();

  const scrollToSection = (id: string) => {
    playClick();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const openContact = () => {
    playClick();
    window.dispatchEvent(new CustomEvent('open-contact-modal'));
  };

  const handleDownloadResume = () => {
    playClick();
    const link = document.createElement('a');
    link.href = profile.resumeUrl;
    link.download = 'Suelto-Janmark-Software Developer.Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const entrance = (delay = 0) =>
    prefersReducedMotion
      ? {}
      : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
      };

  return (
    <SectionContainer id="home" className="relative pt-8 pb-16 lg:pt-12 lg:pb-20 border-b border-[var(--border-subtle)]">
      {/* Top Location Metadata Line */}
      <motion.div
        {...entrance(0)}
        className="flex items-center justify-between gap-3 text-xs font-mono pb-6 mb-10 border-b border-[var(--border-subtle)]"
      >
        <div className="flex items-center gap-2 text-[var(--text-muted)] text-[11px]">
          <MapPin className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
          <span>Bukidnon, Philippines (GMT+8)</span>
        </div>
      </motion.div>

      {/* Main Grid: Content & Portrait */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column: Headline, Positioning, Actions */}
        <div className="lg:col-span-8 flex flex-col space-y-6">
          <motion.div {...entrance(0.08)} className="space-y-3">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)] block">
              Janmark Suelto
            </span>

            <h1
              className="font-title font-bold tracking-tight text-[var(--text-primary)] leading-[1.08]"
              style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.75rem)' }}
            >
              Software Developer
            </h1>

            <p className="font-mono text-xs sm:text-sm font-medium tracking-wide text-[var(--text-muted)] uppercase pt-1">
              Web / Mobile / Automation
            </p>
          </motion.div>

          <motion.p
            {...entrance(0.14)}
            className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl font-sans"
          >
            I build software across web, mobile, backend systems, and automation. Focused on practical products, integrations, and systems built with modern web technologies.
          </motion.p>

          {/* Primary Action Buttons */}
          <motion.div
            {...entrance(0.22)}
            className="flex flex-wrap items-center gap-3 pt-3 text-xs font-semibold"
          >
            <button
              onClick={() => scrollToSection('projects')}
              onMouseEnter={playHover}
              className="px-5 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--on-accent)] rounded-lg transition-colors flex items-center gap-2 tracking-wide font-sans cursor-pointer font-semibold select-none active:scale-[0.98]"
            >
              <span>View my work</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={openContact}
              onMouseEnter={playHover}
              className="px-5 py-3 bg-[var(--surface)] hover:bg-[var(--surface-hover)] text-[var(--text-primary)] border border-[var(--border)] rounded-lg transition-colors flex items-center gap-2 tracking-wide font-sans cursor-pointer active:scale-[0.98]"
            >
              <Mail className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
              <span>Contact me</span>
            </button>

            <button
              onClick={handleDownloadResume}
              onMouseEnter={playHover}
              className="px-3 py-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1 font-mono text-[11px] cursor-pointer"
              title="Download Resume PDF"
            >
              <span>View résumé</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[var(--accent)]" />
            </button>

            <div className="h-4 w-px bg-[var(--border-subtle)] hidden sm:block mx-1" />

            <div className="flex items-center gap-1.5">
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHover}
                onClick={playClick}
                className="p-2.5 rounded-lg border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHover}
                onClick={playClick}
                className="p-2.5 rounded-lg border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Controlled Portrait Presentation */}
        <div className="lg:col-span-4 flex flex-col items-center lg:items-end">
          <motion.div
            {...entrance(0.15)}
            className="w-full max-w-[240px] sm:max-w-[270px] flex flex-col items-center lg:items-end"
          >
            <button
              type="button"
              onClick={() => {
                playClick();
                setShowRealProfile((prev) => !prev);
              }}
              onMouseEnter={playHover}
              className="group relative cursor-pointer select-none focus:outline-none transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
              title={showRealProfile ? 'Click to show anime avatar' : 'Click to reveal real portrait'}
              aria-label="Toggle profile portrait"
            >
              <div className="relative w-full flex items-center justify-center overflow-hidden rounded-xl">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={showRealProfile ? 'real-profile' : 'anime-profile'}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    src={showRealProfile ? profile.profileImage : (profile.animeProfileImage || '/img/Anime.jpg')}
                    alt={showRealProfile ? 'Janmark Suelto - Real Portrait' : 'Janmark Suelto - Anime Avatar'}
                    className={`w-full h-auto max-h-[340px] object-contain object-bottom ${showRealProfile ? 'grayscale contrast-105' : 'rounded-xl'
                      } transition-all duration-300`}
                  />
                </AnimatePresence>
              </div>
            </button>
          </motion.div>
        </div>
      </div>
    </SectionContainer>
  );
};