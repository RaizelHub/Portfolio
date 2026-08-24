import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Mail, Github, Linkedin, MapPin } from 'lucide-react';
import { SectionContainer } from '../../components/layout/SectionContainer';
import { profile } from '../../data/profile';
import { useSound } from '../../context/SoundContext';

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
    <SectionContainer id="home" className="relative border-b border-[var(--border-subtle)] pb-[var(--section-space)] pt-8 lg:pt-12">
      {/* Top Location Metadata Line */}
      <motion.div
        {...entrance(0)}
        className="mb-12 flex items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-5 font-mono text-xs lg:mb-16"
      >
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.08em] text-[var(--text-muted)]">
          <MapPin className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
          <span>Bukidnon, Philippines</span>
        </div>
      </motion.div>

      {/* Main Grid: Content & Portrait */}
      <div className="grid min-w-0 grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-20">
        {/* Left Column: Headline, Positioning, Actions */}
        <div className="flex min-w-0 flex-col lg:col-span-7">
          <motion.div {...entrance(0.08)} className="space-y-4">
            <span className="block font-mono text-xs font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
              Janmark Suelto
            </span>

            <h1
              className="hero-title font-title text-[var(--text-primary)] whitespace-nowrap"
            >
              Software Developer
            </h1>

            <p className="pt-2 font-mono text-xs font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
              Web / Mobile / Automation
            </p>
          </motion.div>

          <motion.p
            {...entrance(0.14)}
            className="body-copy mt-7 max-w-[50ch] border-l border-[var(--accent)] pl-5 text-[var(--text-secondary)]"
          >
            I build software across web, mobile, backend systems, and automation. Focused on practical products, integrations, and systems built with modern web technologies.
          </motion.p>

          {/* Primary Action Buttons */}
          <motion.div
            {...entrance(0.22)}
            className="mt-8 flex min-w-0 flex-wrap items-center gap-3 text-xs"
          >
            <button
              onClick={() => scrollToSection('projects')}
              onMouseEnter={playHover}
              className="flex min-h-11 w-full cursor-pointer select-none items-center justify-center gap-2 bg-[var(--accent)] px-5 py-3 font-nav text-xs font-semibold tracking-tight text-[var(--on-accent)] transition-all duration-200 hover:-translate-y-px hover:bg-[var(--accent-hover)] active:translate-y-0 active:scale-[0.98] sm:w-auto"
            >
              <span>View my work</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={openContact}
              onMouseEnter={playHover}
              className="flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 border border-[var(--border)] bg-transparent px-5 py-3 font-nav text-xs font-semibold tracking-tight text-[var(--text-primary)] transition-all duration-200 hover:-translate-y-px hover:bg-[var(--surface)] active:translate-y-0 active:scale-[0.98] sm:w-auto"
            >
              <Mail className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
              <span>Contact me</span>
            </button>

            <button
              onClick={handleDownloadResume}
              onMouseEnter={playHover}
              className="flex min-h-11 cursor-pointer items-center gap-1 px-3 py-3 font-mono text-xs font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
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
                className="border border-[var(--border-subtle)] p-3 text-[var(--text-secondary)] transition-all duration-200 hover:-translate-y-px hover:border-[var(--border)] hover:bg-[var(--surface)] hover:text-[var(--text-primary)]"
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
                className="border border-[var(--border-subtle)] p-3 text-[var(--text-secondary)] transition-all duration-200 hover:-translate-y-px hover:border-[var(--border)] hover:bg-[var(--surface)] hover:text-[var(--text-primary)]"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Portrait Presentation */}
        <div className="flex min-w-0 flex-col items-center lg:col-span-5 lg:items-end">
          <motion.div
            {...entrance(0.15)}
            className="flex w-full max-w-[330px] flex-col items-center lg:items-end xl:max-w-[380px]"
          >
            <div className="relative flex aspect-[4/5] w-full items-end justify-center overflow-hidden bg-transparent border-0 outline-none shadow-none select-none pointer-events-none">
              <img
                src={profile.profileImage}
                alt="Janmark Suelto"
                className="h-full w-full object-cover object-top border-0 outline-none shadow-none"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </SectionContainer>
  );
};
