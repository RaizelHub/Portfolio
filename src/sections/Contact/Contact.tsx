import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check, Copy, ArrowUpRight, Github, Linkedin, MapPin } from 'lucide-react';
import { SectionContainer } from '../../components/layout/SectionContainer';
import { profile } from '../../data/profile';
import { useSound } from '../../context/SoundContext';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const { playHover, playClick } = useSound();
  const prefersReducedMotion = useReducedMotion();

  const handleCopyEmail = () => {
    playClick();
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const entrance = (delay = 0) =>
    prefersReducedMotion
      ? {}
      : {
        initial: { opacity: 0, y: 14 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true as const, margin: '-60px' },
        transition: { duration: 0.45, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
      };

  return (
    <SectionContainer id="contact" className="border-b-2 border-black dark:border-white py-[var(--section-space)]">
      <motion.div {...entrance()}>
        <h2
          className="section-heading mb-5 font-title text-[var(--text-primary)] font-black"
        >
          Contact
        </h2>

        <p className="body-copy mb-10 text-[var(--text-secondary)] font-medium">
          Open to software development and automation opportunities. Let’s talk about your roadmap, integrations, or developer roles.
        </p>

        {/* Action Cards */}
        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-12">
          {/* Email Card */}
          <div className="flex flex-col justify-between space-y-8 border-2 border-black dark:border-white bg-[var(--surface)] p-6 sm:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] md:col-span-7">
            <div className="space-y-2">
              <span className="block font-mono text-xs font-black uppercase tracking-wider text-[var(--text-muted)]">
                Direct Email
              </span>
              <p className="break-safe font-mono text-base font-black text-[var(--text-primary)] sm:text-lg">
                {profile.email}
              </p>
              <p className="text-xs text-[var(--text-secondary)] font-mono font-bold">
                Typically response within 24 hours.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-3 border-t-2 border-black dark:border-white">
              <a
                href={`mailto:${profile.email}`}
                onMouseEnter={playHover}
                onClick={playClick}
                className="inline-flex min-h-11 cursor-pointer items-center gap-2 border-2 border-black dark:border-white bg-black dark:bg-white px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-tight text-white dark:text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] transition-all duration-120 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              >
                <span>Email me</span>
                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.5} />
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                onMouseEnter={playHover}
                className="inline-flex min-h-11 cursor-pointer items-center gap-2 border-2 border-black dark:border-white bg-[var(--surface-elevated)] px-4 py-2.5 font-mono text-xs font-bold text-[var(--text-primary)] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] transition-all duration-120 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-600" strokeWidth={3} />
                    <span className="text-green-600 font-bold">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" strokeWidth={2} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Socials & Location Card */}
          <div className="flex flex-col justify-between gap-4 md:col-span-5">
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              onClick={playClick}
              className="group flex min-h-16 min-w-0 items-center justify-between gap-3 border-2 border-black dark:border-white bg-[var(--surface)] p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] transition-all duration-120 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <div className="p-1.5 border border-black dark:border-white bg-[var(--surface-elevated)] text-[var(--accent)] shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:shadow-[1px_1px_0px_0px_rgba(255,255,255,1)]">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="font-title text-xs font-black text-[var(--text-primary)] block">
                    LinkedIn
                  </span>
                  <span className="break-safe font-mono text-xs text-[var(--text-secondary)] font-bold">
                    janmark-suelto
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[var(--text-primary)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" strokeWidth={2.5} />
            </a>

            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              onClick={playClick}
              className="group flex min-h-16 min-w-0 items-center justify-between gap-3 border-2 border-black dark:border-white bg-[var(--surface)] p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] transition-all duration-120 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <div className="p-1.5 border border-black dark:border-white bg-[var(--surface-elevated)] text-[var(--accent)] shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:shadow-[1px_1px_0px_0px_rgba(255,255,255,1)]">
                  <Github className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="font-title text-xs font-black text-[var(--text-primary)] block">
                    GitHub
                  </span>
                  <span className="break-safe font-mono text-xs text-[var(--text-secondary)] font-bold">
                    @RaizelHub
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-[var(--text-primary)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" strokeWidth={2.5} />
            </a>

            <div className="flex flex-wrap items-center justify-between gap-2 border-2 border-black dark:border-white bg-[var(--surface-elevated)] p-4 font-mono text-xs font-bold text-[var(--text-secondary)] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]">
              <span className="flex items-center gap-1.5 text-[var(--text-primary)]">
                <MapPin className="w-3.5 h-3.5 text-[var(--accent)]" strokeWidth={2.5} />
                Bukidnon, Philippines
              </span>
              <span className="flex items-center gap-1.5 text-[var(--text-muted)]">
                Remote &amp; Contract
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </SectionContainer>
  );
};
