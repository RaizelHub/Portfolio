import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, Check, Copy, ArrowUpRight, Github, Linkedin, MapPin, Clock } from 'lucide-react';
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
    <SectionContainer id="contact" className="py-20 border-b border-[#DCE1E7] dark:border-[#242B33]">
      <motion.div {...entrance()} className="max-w-3xl">
        <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#2563EB] dark:text-[#60A5FA] block mb-3">
          Contact
        </span>

        <h2
          className="font-sans font-bold text-[#111318] dark:text-[#F4F6F8] leading-[1.12] mb-3"
          style={{ fontSize: 'clamp(1.65rem, 2.8vw, 2.35rem)' }}
        >
          Let's build something useful.
        </h2>

        <p className="text-base sm:text-lg text-[#5F6873] dark:text-[#A7B0BA] leading-relaxed max-w-xl font-sans mb-10">
          Open to software development and automation opportunities. Let’s talk about your roadmap, integrations, or developer roles.
        </p>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
          {/* Email Card */}
          <div className="md:col-span-7 bg-[#FFFFFF] dark:bg-[#11151A] border border-[#DCE1E7] dark:border-[#242B33] rounded-xl p-6 sm:p-7 flex flex-col justify-between space-y-6 shadow-xs">
            <div className="space-y-2">
              <span className="font-mono text-[11px] font-semibold text-[#78828D] dark:text-[#7F8994] uppercase tracking-wider block">
                Direct Email
              </span>
              <p className="font-mono text-base sm:text-lg font-bold text-[#111318] dark:text-[#F4F6F8] break-all">
                {profile.email}
              </p>
              <p className="text-xs text-[#5F6873] dark:text-[#A7B0BA] font-sans">
                Typically response within 24 hours.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={`mailto:${profile.email}`}
                onMouseEnter={playHover}
                onClick={playClick}
                className="px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-sans font-semibold rounded-lg transition-colors inline-flex items-center gap-2 shadow-xs"
              >
                <span>Email me</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                onMouseEnter={playHover}
                className="px-4 py-2.5 bg-[#F7F8FA] dark:bg-[#171C22] border border-[#DCE1E7] dark:border-[#343D48] hover:border-[#C5CCD5] dark:hover:border-[#4B5563] text-[#111318] dark:text-[#F4F6F8] text-xs font-mono rounded-lg transition-colors inline-flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#60A5FA]" />
                    <span className="text-[#2563EB] dark:text-[#60A5FA] font-semibold">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#5F6873] dark:text-[#A7B0BA]" />
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
              className="group p-4 bg-[#FFFFFF] dark:bg-[#11151A] border border-[#DCE1E7] dark:border-[#242B33] hover:border-[#2563EB]/50 dark:hover:border-[#60A5FA]/50 rounded-xl transition-colors flex items-center justify-between shadow-xs"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[#F1F3F5] dark:bg-[#171C22] rounded-lg text-[#2563EB] dark:text-[#60A5FA]">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-sans text-xs font-bold text-[#111318] dark:text-[#F4F6F8] block">
                    LinkedIn
                  </span>
                  <span className="text-[11px] text-[#5F6873] dark:text-[#A7B0BA] font-mono">
                    janmark-suelto
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#78828D] dark:text-[#7F8994] group-hover:text-[#2563EB] dark:group-hover:text-[#60A5FA] transition-colors" />
            </a>

            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              onClick={playClick}
              className="group p-4 bg-[#FFFFFF] dark:bg-[#11151A] border border-[#DCE1E7] dark:border-[#242B33] hover:border-[#2563EB]/50 dark:hover:border-[#60A5FA]/50 rounded-xl transition-colors flex items-center justify-between shadow-xs"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-[#F1F3F5] dark:bg-[#171C22] rounded-lg text-[#2563EB] dark:text-[#60A5FA]">
                  <Github className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-sans text-xs font-bold text-[#111318] dark:text-[#F4F6F8] block">
                    GitHub
                  </span>
                  <span className="text-[11px] text-[#5F6873] dark:text-[#A7B0BA] font-mono">
                    @RaizelHub
                  </span>
                </div>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#78828D] dark:text-[#7F8994] group-hover:text-[#2563EB] dark:group-hover:text-[#60A5FA] transition-colors" />
            </a>

            <div className="p-3 bg-[#F1F3F5] dark:bg-[#171C22] border border-[#DCE1E7] dark:border-[#242B33] rounded-xl flex items-center justify-between text-xs font-mono text-[#5F6873] dark:text-[#A7B0BA]">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#60A5FA]" />
                Bukidnon, PH
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                GMT+8
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </SectionContainer>
  );
};