import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ExternalLink, Award, GraduationCap, BookOpen } from 'lucide-react';
import {
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiPython,
} from 'react-icons/si';
import { projects } from '../../data/projects';
import { certifications } from '../../data/certifications';
import { profile } from '../../data/profile';
import { useSound } from '../../context/SoundContext';

export const TactileGrid: React.FC = () => {
  const { playClick, playHover } = useSound();

  // Pick the top 3 projects for the Key Projects showcase matching reference
  const showcaseProjects = [
    {
      id: 'studio-ecommerce',
      slug: 'studio-ecommerce',
      title: 'Studio E-Commerce',
      referenceTitle: 'Quantum Dashboard',
      image: '/img/studio/01_home_hero.png',
      badge: 'React & Django REST',
      liveUrl: projects.find((p) => p.slug === 'studio-ecommerce')?.liveUrl || '#',
      githubUrl: projects.find((p) => p.slug === 'studio-ecommerce')?.githubUrl || profile.githubUrl,
    },
    {
      id: 'vocara',
      slug: 'vocara',
      title: 'VOCARA AI Coach',
      referenceTitle: 'Mobile AI Coach',
      image: '/img/vocara1 (2).jpg',
      badge: 'React Native & Groq AI',
      isMobile: true,
      liveUrl: projects.find((p) => p.slug === 'vocara')?.liveUrl || '#',
      githubUrl: projects.find((p) => p.slug === 'vocara')?.githubUrl || profile.githubUrl,
    },
    {
      id: 'collabcanvas',
      slug: 'collabcanvas',
      title: 'CollabCanvas',
      referenceTitle: 'Real-Time Whiteboard',
      image: '/img/collab.png',
      badge: 'Real-Time System',
      isMobile: false,
      liveUrl: projects.find((p) => p.slug === 'collabcanvas')?.liveUrl || 'https://collab-canvas-web-beta.vercel.app/',
      githubUrl: projects.find((p) => p.slug === 'collabcanvas')?.githubUrl || profile.githubUrl,
    },
  ];

  // Core Skills Keys matching the reference (JS, React, Node, Python)
  const coreSkills = [
    {
      id: 'js',
      label: 'JavaScript',
      short: 'JS',
      icon: SiJavascript,
      iconColor: '#F7DF1E',
      textColor: '#000000',
      bgGrad: 'from-amber-300 to-yellow-400',
      sub: 'ES6+ / Async',
    },
    {
      id: 'react',
      label: 'React 19',
      short: 'React',
      icon: SiReact,
      iconColor: '#00D8FF',
      textColor: '#00D8FF',
      bgGrad: 'from-cyan-400 to-sky-500',
      sub: 'Next.js / Hooks',
    },
    {
      id: 'node',
      label: 'Node.js',
      short: 'JS',
      icon: SiNodedotjs,
      iconColor: '#539E43',
      textColor: '#539E43',
      bgGrad: 'from-emerald-400 to-green-500',
      sub: 'Express / APIs',
    },
    {
      id: 'python',
      label: 'Python',
      short: 'Py',
      icon: SiPython,
      iconColor: '#3776AB',
      textColor: '#FFD43B',
      bgGrad: 'from-blue-400 to-indigo-500',
      sub: 'Django / AI Workflows',
    },
  ];

  const handleOpenContact = () => {
    playClick();
    window.dispatchEvent(new CustomEvent('open-contact-modal'));
  };

  const handleResumeClick = () => {
    playClick();
    window.open(profile.resumeUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full space-y-2.5 sm:space-y-3 select-none font-sans">
      {/* ══════════════════════════════════════════════════════════════
          TOP ROW: Core Skills (Left) + Key Projects (Right)
         ══════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 sm:gap-3 items-stretch">

        {/* ── CARD 1: CORE SKILLS (Left, 4 Cols on LG) ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-4 xl:col-span-3 tactile-card p-3 sm:p-3.5 flex flex-col justify-between"
        >
          <div>
            <h3 className="font-title text-sm sm:text-base font-bold tracking-tight text-neutral-900 dark:text-white mb-2">
              Core Skills
            </h3>

            {/* 4 Tactile Squircle Keys Grid */}
            <div className="grid grid-cols-2 gap-2 sm:gap-2.5 my-auto">
              {coreSkills.map((skill) => {
                const Icon = skill.icon;
                return (
                  <button
                    key={skill.id}
                    type="button"
                    onClick={playClick}
                    onMouseEnter={playHover}
                    title={`${skill.label} • ${skill.sub}`}
                    className="tactile-key p-2 sm:p-2.5 flex flex-col items-center justify-center gap-1 cursor-pointer group rounded-xl"
                  >
                    {skill.id === 'js' ? (
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-[#F7DF1E] text-black font-black font-mono text-xs sm:text-sm flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                        JS
                      </div>
                    ) : (
                      <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: skill.iconColor }} />
                      </div>
                    )}
                    <span className="font-title text-[10px] font-bold text-neutral-800 dark:text-neutral-200 mt-0.5">
                      {skill.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-2.5 pt-2 border-t border-neutral-200/60 dark:border-neutral-800/60 flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400">
            <span className="font-medium">Production Stack</span>
            <Link
              to="/tools"
              onClick={playClick}
              className="font-semibold text-neutral-900 dark:text-white hover:underline inline-flex items-center gap-0.5"
            >
              <span>All Tools</span>
              <ArrowUpRight className="w-2.5 h-2.5" />
            </Link>
          </div>
        </motion.div>

        {/* ── CARD 2: KEY PROJECTS (Right, 8 Cols on LG) ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="lg:col-span-8 xl:col-span-9 tactile-card p-3 sm:p-3.5 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-title text-sm sm:text-base font-bold tracking-tight text-neutral-900 dark:text-white">
                Key Projects
              </h3>
              <Link
                to="/projects"
                onClick={playClick}
                onMouseEnter={playHover}
                className="font-title text-[11px] sm:text-xs font-semibold text-neutral-900 dark:text-white hover:underline inline-flex items-center gap-1"
              >
                <span>View All ({projects.length})</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>

            {/* 3 Showcase Project Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
              {showcaseProjects.map((item) => {
                if (item.id === 'vocara') {
                  return (
                    <div
                      key={item.id}
                      className="relative flex flex-col justify-between rounded-xl p-2 sm:p-2.5 bg-neutral-100/60 dark:bg-neutral-900/50 border border-neutral-200/70 dark:border-neutral-800/60 hover:border-neutral-300 dark:hover:border-neutral-700 transition-[border-color,background-color] duration-150 overflow-hidden group"
                    >
                      {/* ── Background: Real Phone Screenshots Peeking Out on the Sides (Reference-Accurate) ── */}
                      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
                        {/* Left Peeking Phone (Interview Screen) */}
                        <div className="absolute -left-7 sm:-left-8 top-2 w-28 sm:w-32 h-64 rounded-2xl border-2 border-neutral-300/40 dark:border-neutral-700/40 overflow-hidden shadow-lg -rotate-12 opacity-35 dark:opacity-25 transition-transform duration-300 group-hover:-rotate-14 group-hover:-translate-x-1">
                          <img
                            src="/img/vocara1 (3).jpg"
                            alt=""
                            className="w-full h-full object-cover object-top"
                          />
                        </div>

                        {/* Right Peeking Phone (Home / Waveform Screen) */}
                        <div className="absolute -right-7 sm:-right-8 top-2 w-28 sm:w-32 h-64 rounded-2xl border-2 border-neutral-300/40 dark:border-neutral-700/40 overflow-hidden shadow-lg rotate-12 opacity-35 dark:opacity-25 transition-transform duration-300 group-hover:rotate-14 group-hover:translate-x-1">
                          <img
                            src="/img/vocara1 (2).jpg"
                            alt=""
                            className="w-full h-full object-cover object-top"
                          />
                        </div>
                      </div>

                      {/* ── Foreground: White Floating App Card (Reference: Bryl Lim Style) ── */}
                      <div className="relative z-10 flex flex-col justify-between h-full rounded-xl bg-white/95 dark:bg-[#151821]/95 backdrop-blur-md p-3 sm:p-3.5 border border-neutral-200/90 dark:border-neutral-800/90 shadow-[0_4px_16px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.4)]">

                        {/* 1. Category & Recognition Pills */}
                        <div>
                          <div className="flex flex-wrap items-center gap-1.5 mb-2">
                            <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-300/80 dark:border-neutral-700/80 text-[8px] font-mono font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-300">
                              APPS MADE IN THE PHILIPPINES
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-300/80 dark:border-neutral-700/80 text-[8px] font-mono font-semibold uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
                              REACT NATIVE / EXPO
                            </span>
                          </div>

                          {/* 2. App Icon + Title */}
                          <Link
                            to={`/projects/${item.slug}`}
                            onClick={() => setTimeout(() => playClick(), 0)}
                            onMouseEnter={playHover}
                            className="flex items-center gap-2.5 group/app cursor-pointer"
                          >
                            {/* Squircle App Icon */}
                            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-[12px] sm:rounded-[13px] bg-black dark:bg-white text-white dark:text-black flex items-center justify-center shadow-md shadow-black/10 shrink-0 border border-white/25 group-hover/app:scale-105 transition-transform">
                              <svg className="w-5 h-5 text-white dark:text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                                <line x1="12" x2="12" y1="19" y2="22" />
                              </svg>
                            </div>

                            {/* Title & Category */}
                            <div className="min-w-0 flex-1">
                              <h4 className="font-mono text-xs sm:text-[13px] font-bold text-neutral-900 dark:text-white tracking-tight truncate group-hover/app:text-neutral-600 dark:group-hover/app:text-neutral-300 transition-colors">
                                Vocara
                              </h4>
                              <p className="text-[10px] text-neutral-500 dark:text-neutral-400 font-mono truncate mt-0.5">
                                AI Voice Interview &amp; Speech Prep
                              </p>
                            </div>
                          </Link>

                          {/* 3. Description */}
                          <p className="text-[11px] text-neutral-600 dark:text-neutral-300 font-normal leading-relaxed my-2 line-clamp-2">
                            An AI-powered voice interview &amp; spoken-English platform with real-time audio feedback powered by Groq AI.
                          </p>
                        </div>

                        {/* 4. Dual Tactile Action Buttons (VIEW PROJECT + Code) */}
                        <div className="flex items-center gap-1 mt-auto pt-0.5">
                          <Link
                            to={`/projects/${item.slug}`}
                            onClick={playClick}
                            onMouseEnter={playHover}
                            className="tactile-btn-orange flex-1 py-1 px-1.5 text-[10px] font-bold text-center flex items-center justify-center gap-0.5 cursor-pointer uppercase tracking-wider"
                          >
                            <span>VIEW PROJECT</span>
                          </Link>

                          <a
                            href={item.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={playClick}
                            onMouseEnter={playHover}
                            title="Source Code / Explore"
                            className="tactile-btn-pill py-1 px-2 text-[10px] font-bold text-neutral-800 dark:text-neutral-200 flex items-center justify-center gap-0.5 cursor-pointer"
                          >
                            <span>Code</span>
                            <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                }

                // Standard Web Project Card (Studio E-Commerce, CollabCanvas)
                return (
                  <div
                    key={item.id}
                    className="flex flex-col justify-between rounded-xl p-2 sm:p-2.5 bg-neutral-100/60 dark:bg-neutral-900/50 border border-neutral-200/70 dark:border-neutral-800/60 hover:border-neutral-300 dark:hover:border-neutral-700 transition-[border-color,background-color] duration-150 group"
                  >
                    {/* Thumbnail inside tactile beveled frame */}
                    <Link
                      to={`/projects/${item.slug}`}
                      onClick={() => setTimeout(() => playClick(), 0)}
                      onMouseEnter={playHover}
                      className="tactile-inset block relative aspect-[16/9] overflow-hidden rounded-lg bg-neutral-200 dark:bg-neutral-800 cursor-pointer"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-1.5">
                        <span className="text-[9px] font-bold text-white tracking-wider uppercase">
                          {item.badge}
                        </span>
                      </div>
                    </Link>

                    {/* Project Title */}
                    <div className="my-1.5">
                      <h4 className="font-title text-xs font-bold text-neutral-900 dark:text-white tracking-tight truncate">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate mt-0.2">
                        {item.badge}
                      </p>
                    </div>

                    {/* Dual Tactile Action Buttons (VIEW PROJECT + EXPLORE) */}
                    <div className="flex items-center gap-1 mt-auto pt-0.5">
                      <Link
                        to={`/projects/${item.slug}`}
                        onClick={playClick}
                        onMouseEnter={playHover}
                        className="tactile-btn-orange flex-1 py-1 px-1.5 text-[10px] font-bold text-center flex items-center justify-center gap-0.5 cursor-pointer uppercase tracking-wider"
                      >
                        <span>VIEW PROJECT</span>
                      </Link>

                      <a
                        href={item.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={playClick}
                        onMouseEnter={playHover}
                        title="Source Code / Explore"
                        className="tactile-btn-pill py-1 px-2 text-[10px] font-bold text-neutral-800 dark:text-neutral-200 flex items-center justify-center gap-0.5 cursor-pointer"
                      >
                        <span>Code</span>
                        <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          BOTTOM ROW: Certificates (Left) + Contact Me (Center) + Let's Build (Right)
         ══════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 sm:gap-3 items-stretch">

        {/* ── CARD 3: CERTIFICATES & WORKSHOPS (Left, 4 cols) ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
          className="md:col-span-4 tactile-card p-3 sm:p-3.5 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white flex items-center justify-center shadow-2xs">
                  <Award className="w-3.5 h-3.5" />
                </div>
                <h3 className="font-title text-sm sm:text-base font-bold tracking-tight text-neutral-900 dark:text-white">
                  Certificates &amp; Workshops
                </h3>
              </div>
            </div>

            {/* Certificate / Workshop items */}
            <div className="space-y-1.5 my-0.5">
              {/* Item 1: Cisco CCNA */}
              <a
                href={certifications[0]?.verifyUrl || 'https://www.credly.com'}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                onMouseEnter={playHover}
                className="p-1.5 sm:p-2 rounded-lg bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800/80 hover:border-neutral-400/80 dark:hover:border-neutral-600/80 transition-all flex items-center justify-between group/cert cursor-pointer shadow-2xs block"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-title text-[11px] font-bold text-neutral-900 dark:text-white truncate group-hover/cert:text-black dark:group-hover/cert:text-white transition-colors">
                      {certifications[0]?.name || 'Cisco CCNA Routing & Switching'}
                    </h4>
                    <p className="text-[9px] text-neutral-500 dark:text-neutral-400 truncate">
                      {certifications[0]?.issuer || 'Cisco Academy'} • 2025
                    </p>
                  </div>
                </div>
                <ExternalLink className="w-3 h-3 text-neutral-400 group-hover/cert:text-black dark:group-hover/cert:text-white shrink-0 ml-1" />
              </a>

              {/* Item 2: Security & Auditing */}
              <div className="p-1.5 sm:p-2 rounded-lg bg-neutral-50/70 dark:bg-neutral-900/40 border border-neutral-200/60 dark:border-neutral-800/60 flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                    <Award className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-title text-[11px] font-bold text-neutral-900 dark:text-white truncate">
                      {certifications[1]?.name || 'Information Security & Audit (IAS)'}
                    </h4>
                    <p className="text-[9px] text-neutral-500 dark:text-neutral-400 truncate">
                      {certifications[1]?.issuer || 'Cisco Training'} • 2025
                    </p>
                  </div>
                </div>
                <span className="font-mono text-[8px] font-bold text-neutral-400 shrink-0">IAS</span>
              </div>

              {/* Item 3: Workshop / Systems Admin */}
              <div className="p-1.5 sm:p-2 rounded-lg bg-neutral-50/70 dark:bg-neutral-900/40 border border-neutral-200/60 dark:border-neutral-800/60 flex items-center justify-between">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-6 h-6 rounded-md bg-emerald-100/80 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <BookOpen className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-title text-[11px] font-bold text-neutral-900 dark:text-white truncate">
                      {certifications[2]?.name || 'System Administration & Workshops'}
                    </h4>
                    <p className="text-[9px] text-neutral-500 dark:text-neutral-400 truncate">
                      {certifications[2]?.issuer || 'BukSU'} • 2025
                    </p>
                  </div>
                </div>
                <span className="font-mono text-[8px] font-bold text-neutral-400 shrink-0">BukSU</span>
              </div>
            </div>
          </div>

          <div className="mt-2 pt-1.5 border-t border-neutral-200/60 dark:border-neutral-800/60 flex items-center justify-between text-[10px]">
            <span className="text-neutral-500 dark:text-neutral-400 font-medium">
              3 Credentials
            </span>
            <Link
              to="/about"
              onClick={playClick}
              onMouseEnter={playHover}
              className="font-title text-[10px] font-semibold text-neutral-900 dark:text-white hover:underline inline-flex items-center gap-0.5"
            >
              <span>View All</span>
              <ArrowUpRight className="w-2.5 h-2.5" />
            </Link>
          </div>
        </motion.div>

        {/* ── CARD 4: CONTACT ME (Center, 5 cols) ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="md:col-span-5 tactile-card p-3 sm:p-3.5 flex flex-col justify-between"
        >
          <div>
            <h3 className="font-title text-sm sm:text-base font-bold tracking-tight text-neutral-900 dark:text-white mb-1">
              Contact Me
            </h3>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mb-2">
              Available for full-stack contracts, remote engineering, and consultations.
            </p>
          </div>

          {/* Big Tactile 3D Orange Push Button ("Get In Touch") */}
          <div className="my-auto py-0.5">
            <motion.button
              type="button"
              onClick={handleOpenContact}
              onMouseEnter={playHover}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="tactile-btn-orange w-full py-2.5 sm:py-3 text-sm sm:text-base font-black tracking-wide cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
            >
              <span>Get In Touch</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </motion.button>
          </div>

          <div className="mt-2 pt-1 text-center text-[10px] text-neutral-400 dark:text-neutral-500">
            Typically responds within 24 hours
          </div>
        </motion.div>

        {/* ── CARD 5: LET'S BUILD (Right, 3 cols) ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.25 }}
          className="md:col-span-3 tactile-card p-3 sm:p-3.5 flex flex-col justify-between"
        >
          <div>
            <h3 className="font-title text-sm sm:text-base font-bold tracking-tight text-neutral-900 dark:text-white mb-1">
              Let&apos;s Build
            </h3>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mb-2">
              Explore technical credentials, background, and work history.
            </p>
          </div>

          {/* Dark Tactile 3D Button ("View Resume") */}
          <div className="my-auto py-0.5">
            <motion.button
              type="button"
              onClick={handleResumeClick}
              onMouseEnter={playHover}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="tactile-btn-dark w-full py-2 sm:py-2.5 text-xs font-bold tracking-wide cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>View Resume</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2]" />
            </motion.button>
          </div>

          <div className="mt-2 pt-1 text-center text-[10px] text-neutral-400 dark:text-neutral-500">
            PDF Document • Updated 2026
          </div>
        </motion.div>

      </div>
    </div>
  );
};
