import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Download, Mail, Github, Linkedin, MapPin } from 'lucide-react';
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
    link.download = 'Suelto-Janmark-Resume.pdf';
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
    <SectionContainer id="home" className="relative pt-8 pb-16 lg:pt-12 lg:pb-20 border-b border-[#DCE1E7] dark:border-[#242B33]">
      {/* Top Location Metadata Line */}
      <motion.div
        {...entrance(0)}
        className="flex items-center justify-between gap-3 text-xs font-mono pb-6 mb-10 border-b border-[#DCE1E7] dark:border-[#242B33]"
      >
        <div className="flex items-center gap-2 text-[#5F6873] dark:text-[#A7B0BA] text-[11px]">
          <MapPin className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#60A5FA] shrink-0" />
          <span>Bukidnon, Philippines (GMT+8)</span>
        </div>
      </motion.div>

      {/* Main Grid: Content & Portrait */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column: Headline, Positioning, Actions */}
        <div className="lg:col-span-8 flex flex-col space-y-6">
          <motion.div {...entrance(0.08)} className="space-y-3">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#2563EB] dark:text-[#60A5FA] block">
              Janmark Suelto
            </span>

            <h1
              className="font-sans font-bold tracking-tight text-[#111318] dark:text-[#F4F6F8] leading-[1.08]"
              style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.75rem)' }}
            >
              Software Developer
            </h1>

            <p className="font-mono text-xs sm:text-sm font-semibold tracking-wide text-[#5F6873] dark:text-[#A7B0BA] uppercase pt-1">
              Web &bull; Mobile &bull; Backend &bull; Automation
            </p>
          </motion.div>

          <motion.p
            {...entrance(0.14)}
            className="text-base sm:text-lg text-[#111318] dark:text-[#F4F6F8] leading-relaxed max-w-2xl font-sans"
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
              className="px-5 py-3 bg-[#2563EB] hover:bg-[#1D4ED8] dark:bg-[#2563EB] dark:hover:bg-[#1D4ED8] text-white rounded-lg transition-colors flex items-center gap-2 tracking-wide font-sans shadow-xs"
            >
              <span>View my work</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={openContact}
              onMouseEnter={playHover}
              className="px-5 py-3 bg-[#FFFFFF] dark:bg-[#11151A] hover:bg-[#F1F3F5] dark:hover:bg-[#171C22] text-[#111318] dark:text-[#F4F6F8] border border-[#DCE1E7] dark:border-[#343D48] rounded-lg transition-colors flex items-center gap-2 tracking-wide font-sans"
            >
              <Mail className="w-3.5 h-3.5 text-[#5F6873] dark:text-[#A7B0BA]" />
              <span>Contact me</span>
            </button>

            <button
              onClick={handleDownloadResume}
              onMouseEnter={playHover}
              className="px-3 py-3 text-[#5F6873] dark:text-[#A7B0BA] hover:text-[#111318] dark:hover:text-[#F4F6F8] transition-colors flex items-center gap-1 font-mono text-[11px]"
              title="Download Resume PDF"
            >
              <span>View résumé</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#60A5FA]" />
            </button>

            <div className="h-4 w-px bg-[#DCE1E7] dark:border-[#242B33] hidden sm:block mx-1" />

            <div className="flex items-center gap-1.5">
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHover}
                onClick={playClick}
                className="p-2.5 rounded-lg border border-[#DCE1E7] dark:border-[#242B33] text-[#5F6873] dark:text-[#A7B0BA] hover:text-[#111318] dark:hover:text-[#F4F6F8] hover:border-[#C5CCD5] dark:hover:border-[#343D48] bg-[#FFFFFF] dark:bg-[#11151A] transition-colors"
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
                className="p-2.5 rounded-lg border border-[#DCE1E7] dark:border-[#242B33] text-[#5F6873] dark:text-[#A7B0BA] hover:text-[#111318] dark:hover:text-[#F4F6F8] hover:border-[#C5CCD5] dark:hover:border-[#343D48] bg-[#FFFFFF] dark:bg-[#11151A] transition-colors"
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
            className="w-full max-w-[250px] sm:max-w-[270px]"
          >
            <div className="relative rounded-xl p-2 bg-[#FFFFFF] dark:bg-[#11151A] border border-[#DCE1E7] dark:border-[#242B33] shadow-xs">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-[#F1F3F5] dark:bg-[#171C22]">
                <img
                  src={profile.profileImage}
                  alt="Janmark Suelto"
                  className="w-full h-full object-cover object-top grayscale contrast-105 transition-all duration-300"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionContainer>
  );
};