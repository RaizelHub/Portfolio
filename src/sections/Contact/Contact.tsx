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
    <SectionContainer id="contact" className="py-20 border-b border-[var(--border-subtle)]">
      <motion.div {...entrance()} className="max-w-3xl">
        <h2
          className="font-title text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] mb-3"
        >
          Contact
        </h2>

        <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-xl font-sans mb-10">
          Open to software development and automation opportunities. Let’s talk about your roadmap, integrations, or developer roles.
        </p>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
          {/* Email Card */}
          <div className="md:col-span-7 bg-[var(--surface)] border border-[var(--border-subtle)] rounded-xl p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-xs">
            <div className="space-y-2">
              <span className="font-mono text-[11px] font-semibold text-[var(--text-muted)] uppercase tracking-wider block">
                Direct Email
              </span>
              <p className="font-mono text-base sm:text-lg font-bold text-[var(--text-primary)] break-all">
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
                className="px-5 py-2.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--on-accent)] text-xs font-sans font-semibold rounded-lg transition-colors inline-flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <span>Email me</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                onMouseEnter={playHover}
                className="px-4 py-2.5 bg-[var(--surface-elevated)] border border-[var(--border-subtle)] hover:border-[var(--border)] text-[var(--text-primary)] text-xs font-mono rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer"
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
          <div className="md:col-span-5 flex flex-col justify-between gap-3">
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              onClick={playClick}
              className="group p-4 bg-[var(--surface)] border border-[var(--border-subtle)] hover:border-[var(--border)] rounded-xl transition-colors flex items-center justify-between shadow-xs"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[var(--surface-elevated)] rounded-lg text-[var(--accent)]">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-sans text-xs font-bold text-[var(--text-primary)] block">
                    LinkedIn
                  </span>
                  <span className="text-[11px] text-[var(--text-secondary)] font-mono">
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
              className="group p-4 bg-[var(--surface)] border border-[var(--border-subtle)] hover:border-[var(--border)] rounded-xl transition-colors flex items-center justify-between shadow-xs"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[var(--surface-elevated)] rounded-lg text-[var(--accent)]">
                  <Github className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-sans text-xs font-bold text-[var(--text-primary)] block">
                    GitHub
                  </span>
                  <span className="text-[11px] text-[var(--text-secondary)] font-mono">
                    @RaizelHub
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors" />
            </a>

            <div className="p-3 bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-xl flex items-center justify-between text-xs font-mono text-[var(--text-secondary)]">
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