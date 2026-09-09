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
    <SectionContainer id="contact" className="border-b-2 border-neutral-300 dark:border-neutral-700 py-6 sm:py-8">
      <motion.div {...entrance()}>
        <div className="mb-6 max-w-3xl">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="flex h-5 w-5 items-center justify-center rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-700">
              <MapPin className="h-3 w-3" />
            </div>
            <span className="font-title text-xs font-bold tracking-wider uppercase text-neutral-900 dark:text-white">
              Get In Touch
            </span>
          </div>
          <h2 className="font-title text-xl sm:text-2xl font-black tracking-tight text-neutral-900 dark:text-white leading-[1.1] mb-1.5">
            Contact
          </h2>
          <p className="text-xs text-neutral-600 dark:text-neutral-300 font-normal leading-relaxed max-w-2xl">
            Open to software development and automation opportunities. Let’s talk about your roadmap, integrations, or developer roles.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-12">
          {/* Email Card */}
          <div className="flex flex-col justify-between space-y-6 rounded-2xl border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#161822] p-5 shadow-xs md:col-span-7">
            <div className="space-y-1.5">
              <span className="block font-title text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
                Direct Email
              </span>
              <p className="break-safe font-mono text-sm sm:text-base font-bold text-neutral-900 dark:text-white">
                {profile.email}
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 font-sans">
                Typically responds within 24 hours.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 pt-3 border-t border-neutral-200 dark:border-neutral-800">
              <a
                href={`mailto:${profile.email}`}
                onMouseEnter={playHover}
                onClick={playClick}
                className="btn-pill-black inline-flex min-h-9 cursor-pointer items-center gap-1.5 px-4 py-1.5 font-title text-xs font-semibold shadow-xs transition-all duration-120"
              >
                <span>Email me</span>
                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.5} />
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                onMouseEnter={playHover}
                className="btn-pill-white inline-flex min-h-9 cursor-pointer items-center gap-1.5 px-3.5 py-1.5 font-title text-xs font-semibold shadow-2xs transition-all duration-120"
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
          <div className="flex flex-col justify-between gap-2.5 md:col-span-5">
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              onClick={playClick}
              className="group flex min-h-14 min-w-0 items-center justify-between gap-3 rounded-xl border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#161822] p-3.5 shadow-xs transition-all duration-120 hover:-translate-y-0.5 hover:border-neutral-400 dark:hover:border-neutral-600"
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <div className="p-1.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
                  <Linkedin className="w-4 h-4 text-neutral-900 dark:text-white" />
                </div>
                <div className="min-w-0">
                  <span className="font-title text-xs font-bold text-neutral-900 dark:text-white block">
                    LinkedIn
                  </span>
                  <span className="break-safe font-mono text-xs text-neutral-500 dark:text-neutral-400">
                    janmark-suelto
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" strokeWidth={2.5} />
            </a>

            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              onClick={playClick}
              className="group flex min-h-14 min-w-0 items-center justify-between gap-3 rounded-xl border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#161822] p-3.5 shadow-xs transition-all duration-120 hover:-translate-y-0.5 hover:border-neutral-400 dark:hover:border-neutral-600"
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <div className="p-1.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
                  <Github className="w-4 h-4 text-neutral-900 dark:text-white" />
                </div>
                <div className="min-w-0">
                  <span className="font-title text-xs font-bold text-neutral-900 dark:text-white block">
                    GitHub
                  </span>
                  <span className="break-safe font-mono text-xs text-neutral-500 dark:text-neutral-400">
                    @RaizelHub
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" strokeWidth={2.5} />
            </a>

            <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/80 p-3 font-mono text-xs font-medium text-neutral-600 dark:text-neutral-400">
              <span className="flex items-center gap-1.5 text-neutral-900 dark:text-white font-semibold">
                <MapPin className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300" strokeWidth={2.5} />
                Bukidnon, Philippines
              </span>
              <span className="flex items-center gap-1 text-[10px] text-neutral-500 dark:text-neutral-400">
                Remote &amp; Contract
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </SectionContainer>
  );
};
