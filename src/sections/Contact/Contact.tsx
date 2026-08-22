import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check, Copy, ArrowUpRight, Github, Linkedin, MapPin, Clock } from 'lucide-react';
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
    <SectionContainer id="contact" className="border-b border-[var(--border-subtle)] py-[var(--section-space)]">
      <motion.div {...entrance()}>
        <h2
          className="section-heading mb-5 font-title text-[var(--text-primary)]"
        >
          Contact
        </h2>

        <p className="body-copy mb-12 text-[var(--text-secondary)]">
          Open to software development and automation opportunities. Let’s talk about your roadmap, integrations, or developer roles.
        </p>

        {/* Action Cards */}
        <div className="grid grid-cols-1 items-stretch border-t border-[var(--border-subtle)] md:grid-cols-12">
          {/* Email Card */}
          <div className="flex flex-col justify-between space-y-8 border-b border-[var(--border-subtle)] py-8 md:col-span-7 md:border-r md:px-8 md:pl-0">
            <div className="space-y-2">
              <span className="block font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                Direct Email
              </span>
              <p className="break-safe font-mono text-sm font-semibold text-[var(--text-primary)] sm:text-base">
                {profile.email}
              </p>
              <p className="text-xs text-[var(--text-secondary)] font-sans">
                Typically response within 24 hours.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={`mailto:${profile.email}`}
                onMouseEnter={playHover}
                onClick={playClick}
                className="inline-flex min-h-11 cursor-pointer items-center gap-2 bg-[var(--accent)] px-5 py-2.5 font-sans text-sm font-semibold text-[var(--on-accent)] transition-all duration-200 hover:-translate-y-px hover:bg-[var(--accent-hover)]"
              >
                <span>Email me</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                onMouseEnter={playHover}
                className="inline-flex min-h-11 cursor-pointer items-center gap-2 border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-2.5 font-mono text-sm text-[var(--text-primary)] transition-colors hover:border-[var(--accent)]"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span className="text-[var(--accent)] font-semibold">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Socials & Location Card */}
          <div className="flex flex-col justify-between md:col-span-5 md:pl-8">
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              onClick={playClick}
              className="group flex min-h-20 min-w-0 items-center justify-between gap-3 border-b border-[var(--border-subtle)] py-4 transition-colors hover:border-[var(--accent)]"
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <div className="p-2 text-[var(--accent)]">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="font-sans text-xs font-bold text-[var(--text-primary)] block">
                    LinkedIn
                  </span>
                  <span className="break-safe font-mono text-xs text-[var(--text-secondary)]">
                    janmark-suelto
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors" />
            </a>

            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              onClick={playClick}
              className="group flex min-h-20 min-w-0 items-center justify-between gap-3 border-b border-[var(--border-subtle)] py-4 transition-colors hover:border-[var(--accent)]"
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <div className="p-2 text-[var(--accent)]">
                  <Github className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="font-sans text-xs font-bold text-[var(--text-primary)] block">
                    GitHub
                  </span>
                  <span className="break-safe font-mono text-xs text-[var(--text-secondary)]">
                    @RaizelHub
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors" />
            </a>

            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-3 py-4 font-mono text-xs text-[var(--text-secondary)]">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[var(--accent)]" />
                Bukidnon, PH
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[var(--accent)]" />
                GMT+8
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </SectionContainer>
  );
};
