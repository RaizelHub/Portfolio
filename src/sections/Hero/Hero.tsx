import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
  FileText,
  Download,
  MapPin,
  Cpu,
  Layers,
} from 'lucide-react';
import { SectionContainer } from '../../components/layout/SectionContainer';
import { profile } from '../../data/profile';
import { useSound } from '../../context/SoundContext';
import { LocalTimeWeather } from '../../components/ui/LocalTimeWeather';

export const Hero: React.FC = () => {
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

  const entrance = (delay = 0) =>
    prefersReducedMotion
      ? {}
      : {
        initial: { opacity: 0, y: 24, scale: 0.98 },
        animate: { opacity: 1, y: 0, scale: 1 },
        transition: {
          duration: 0.9,
          delay,
          ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        },
      };

  return (
    <SectionContainer id="home" className="pt-6 pb-12 lg:pt-10 lg:pb-16 font-mono select-none">
      {/* ── CYBER-MINIMALIST BENTO GRID ── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-5">

        {/* Bento Cell 1: Cyber Portrait Showcase (Swapped to Left & Clean Borderless: Span 4 cols on desktop) */}
        <motion.div
          {...entrance(0.04)}
          className="group relative md:col-span-5 lg:col-span-4 rounded-3xl border-0 bg-[var(--surface)] shadow-xl shadow-black/5 dark:shadow-2xl dark:shadow-black/50 hover:-translate-y-1 hover:shadow-2xl dark:hover:shadow-black/70 transition-all duration-300 overflow-hidden flex items-center justify-center min-h-[360px] md:min-h-0"
        >
          <img
            src={profile.profileImage}
            alt="Janmark Suelto"
            width={320}
            height={400}
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105 select-none pointer-events-none"
          />
        </motion.div>

        {/* Bento Cell 2: Main Identity & Hero Pitch (Swapped to Right: Span 8 cols on desktop) */}
        <motion.div
          {...entrance(0.16)}
          className="group relative md:col-span-7 lg:col-span-8 flex flex-col justify-between p-6 sm:p-8 lg:p-10 rounded-3xl border-0 bg-[var(--surface)] shadow-xl shadow-black/5 dark:shadow-2xl dark:shadow-black/50 hover:-translate-y-1 hover:shadow-2xl dark:hover:shadow-black/70 transition-all duration-300 overflow-hidden"
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs text-[var(--text-muted)] font-mono font-bold tracking-tight">
                Full-Stack Dev &bull; AI Automation Specialist
              </span>
            </div>

            <h1 className="font-title text-[var(--text-primary)] text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] mb-5">
              Just building secure software that works.
            </h1>

            <p className="font-sans text-sm sm:text-base text-[var(--text-secondary)] font-medium max-w-[56ch] leading-relaxed">
              I build full-stack platforms, autonomous AI workflows, and scalable web applications. Focused on clean database schemas, transactional integrity, and refined interfaces.
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3 text-xs font-mono">
            <button
              type="button"
              onClick={() => scrollToSection('projects')}
              onMouseEnter={playHover}
              className="flex min-h-11 items-center justify-center gap-2 rounded-full border-0 bg-black dark:bg-white text-white dark:text-black px-6 py-2.5 font-bold shadow-md shadow-black/10 dark:shadow-white/10 hover:opacity-90 active:scale-95 transition-all cursor-pointer"
            >
              <span>Explore Work</span>
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </button>

            <button
              type="button"
              onClick={openContact}
              onMouseEnter={playHover}
              className="flex min-h-11 items-center justify-center gap-2 rounded-full border-0 bg-[var(--surface-elevated)] text-[var(--text-primary)] px-6 py-2.5 font-bold shadow-sm hover:bg-[var(--surface-hover)] active:scale-95 transition-all cursor-pointer"
            >
              <Mail className="h-4 w-4" />
              <span>Contact Me</span>
            </button>
          </div>
        </motion.div>

        {/* Bento Cell 3: Origin & Pure Visual Weather (Span 4 cols) */}
        <motion.div
          {...entrance(0.28)}
          className="group relative md:col-span-6 lg:col-span-4 p-6 rounded-3xl border-0 bg-[var(--surface)] shadow-xl shadow-black/5 dark:shadow-2xl dark:shadow-black/50 hover:-translate-y-1 hover:shadow-2xl dark:hover:shadow-black/70 transition-all duration-300 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">
              <MapPin className="h-3.5 w-3.5 text-[var(--accent)]" />
              <span>Location &bull; Atmosphere</span>
            </div>
            {/* Pure Visual Weather Glyph (No numbers, no text, no dots) */}
            <LocalTimeWeather />
          </div>

          <div>
            <div className="font-bold text-sm text-[var(--text-primary)]">
              {profile.location}
            </div>
            <div className="text-[11px] text-[var(--text-muted)] mt-0.5">
              Available for Global Remote Roles
            </div>
          </div>
        </motion.div>

        {/* Bento Cell 4: Core Focus Matrix (Span 4 cols) */}
        <motion.div
          {...entrance(0.40)}
          className="group relative md:col-span-6 lg:col-span-4 p-6 rounded-3xl border-0 bg-[var(--surface)] shadow-xl shadow-black/5 dark:shadow-2xl dark:shadow-black/50 hover:-translate-y-1 hover:shadow-2xl dark:hover:shadow-black/70 transition-all duration-300 flex flex-col justify-between"
        >
          <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-4">
            <Layers className="h-3.5 w-3.5 text-[var(--accent)]" />
            <span>Core Focus</span>
          </div>

          <div className="space-y-2 text-xs font-bold text-[var(--text-primary)]">
            <div className="rounded-2xl border-0 px-4 py-3 bg-[var(--background)] flex items-center justify-between shadow-sm">
              <span>Full-Stack Development</span>
              <Cpu className="h-3.5 w-3.5 text-[var(--accent)]" />
            </div>
            <div className="rounded-2xl border-0 px-4 py-3 bg-[var(--background)] flex items-center justify-between shadow-sm">
              <span>AI Automation </span>
              <Cpu className="h-3.5 w-3.5 text-[var(--accent)]" />
            </div>
          </div>
        </motion.div>

        {/* Bento Cell 5: Instant Connect & Resume (Span 4 cols) */}
        <motion.div
          {...entrance(0.52)}
          className="group relative md:col-span-12 lg:col-span-4 p-6 rounded-3xl border-0 bg-[var(--surface)] shadow-xl shadow-black/5 dark:shadow-2xl dark:shadow-black/50 hover:-translate-y-1 hover:shadow-2xl dark:hover:shadow-black/70 transition-all duration-300 flex flex-col justify-between"
        >
          <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-4">
            <FileText className="h-3.5 w-3.5 text-[var(--accent)]" />
            <span>Connect &bull; Dossier</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              onClick={playClick}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border-0 bg-[var(--background)] p-2.5 text-xs font-bold hover:bg-[var(--surface-hover)] shadow-sm transition-all active:scale-95"
              aria-label="GitHub"
            >
              <Github className="h-3.5 w-3.5" />
              <span>GitHub</span>
            </a>

            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              onClick={playClick}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border-0 bg-[var(--background)] p-2.5 text-xs font-bold hover:bg-[var(--surface-hover)] shadow-sm transition-all active:scale-95"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-3.5 w-3.5" />
              <span>LinkedIn</span>
            </a>

            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              onClick={playClick}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border-0 bg-black dark:bg-white text-white dark:text-black p-2.5 text-xs font-bold shadow-sm transition-all active:scale-95"
              title="Download Résumé PDF"
            >
              <Download className="h-3.5 w-3.5" />
              <span>PDF</span>
            </a>
          </div>
        </motion.div>

      </div>
    </SectionContainer>
  );
};

export default Hero;
