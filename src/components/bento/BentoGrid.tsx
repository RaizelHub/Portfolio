import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FolderKanban,
  User,
  Award,
  Package,
  Briefcase,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';
import { projects } from '../../data/projects';
import { certifications } from '../../data/certifications';
import { experiences } from '../../data/experience';
import { useSound } from '../../context/SoundContext';

export const BentoGrid: React.FC = () => {
  const { playClick, playHover } = useSound();
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  // Flagship projects for Card 1 interactive preview tabs
  const featuredProjects = projects.slice(0, 5);
  const currentProject = featuredProjects[selectedProjectIndex] || projects[0];

  // Janmark's real services from services.ts
  const servicesList = [
    { num: '01', title: 'Full-Stack Web Development', desc: 'React, TypeScript, Next.js & Tailwind CSS' },
    { num: '02', title: 'Backend & REST APIs', desc: 'Django, Node.js, PostgreSQL & Supabase' },
    { num: '03', title: 'Automation & Integrations', desc: 'n8n workflows, webhook triggers & operational tools' },
    { num: '04', title: 'Database & Cloud Architecture', desc: 'Schema design, migrations, and Row-Level Security' },
    { num: '05', title: 'Mobile Applications', desc: 'React Native cross-platform apps with offline sync' },
  ];

  // Janmark's verified work history (Internship only)
  const experienceHighlights = [
    {
      id: 'concentrix',
      title: experiences[0]?.role || 'Technical Support & IT Operations Intern',
      organization: experiences[0]?.company || 'Concentrix',
      location: experiences[0]?.location || 'Cagayan de Oro City, Philippines',
      period: 'Feb 9 – May 8, 2026',
      desc: 'Supported day-to-day IT operations, workstation diagnostics, network connectivity verification, and asset tracking.',
      responsibilities: [
        'Managed IT asset inventory tracking & hardware allocation records.',
        'Diagnosed workstation issues, software upgrades & network connectivity.',
        'Performed preventive maintenance on enterprise hardware environments.',
      ],
      tags: ['IT Operations', 'Workstation Diagnostics', 'Asset Inventory', 'Hardware Support', 'Technical Docs'],
    },
  ];

  // Custom focal points for project screenshots to display key headlines and UI elements
  const projectImagePosition: Record<string, string> = {
    'studio-ecommerce': 'object-[center_55%]',
    'careeros': 'object-[center_20%]',
    'restaurant-ai-ops': 'object-[center_15%]',
    'vocara': 'object-[center_25%]',
    'subora': 'object-[center_25%]',
  };

  return (
    <div className="select-none font-sans">
      {/* Outer Bento Container with visible border and rounded-2xl corners */}
      <div className="rounded-2xl border-2 border-neutral-300 dark:border-neutral-700 bg-[#fbfaf7] dark:bg-[#12141a] p-2.5 sm:p-3 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 sm:gap-3">

          {/* ══════════════════════════════════════════════════════════════
              CARD 1: PROJECTS (Top-Left: 8 cols on XL, 7 cols on MD)
             ══════════════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="md:col-span-7 xl:col-span-8 rounded-xl border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#161822] p-2.5 sm:p-3 flex flex-col justify-between shadow-xs hover:border-neutral-400 dark:hover:border-neutral-600 transition-all group"
          >
            <div>
              {/* Card Header with Orange Badge */}
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5">
                  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-orange-100 dark:bg-orange-950/60 text-neutral-900 dark:text-white border border-orange-200/60 dark:border-orange-900/40">
                    <FolderKanban className="h-3.5 w-3.5" />
                  </div>
                  <span className="font-title text-xs font-bold tracking-wider text-neutral-900 dark:text-white uppercase">
                    PROJECTS
                  </span>
                </div>

                <Link
                  to="/projects"
                  onClick={playClick}
                  onMouseEnter={playHover}
                  className="flex items-center gap-1 font-title text-xs font-semibold text-neutral-500 hover:text-orange-500 dark:text-neutral-400 dark:hover:text-orange-400 transition-colors"
                >
                  <span>All</span>
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              </div>

              <div className="flex items-center justify-between mb-1.5">
                <p className="text-xs text-neutral-500 dark:text-neutral-400 font-normal truncate max-w-[500px]">
                  <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                    {currentProject.title.split('—')[0].trim()}
                  </span>
                  {' — '}
                  {currentProject.badge || currentProject.description}
                </p>
                <span className="font-mono text-[10px] text-neutral-400 dark:text-neutral-500 shrink-0">
                  {selectedProjectIndex + 1}/{featuredProjects.length}
                </span>
              </div>

              {/* Project Browser Mockup Preview */}
              <div className="rounded-lg border-2 border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900/80 overflow-hidden shadow-inner">
                {/* Browser Top Chrome Bar */}
                <div className="flex items-center justify-between px-2.5 py-1 bg-neutral-100/90 dark:bg-neutral-800/90 border-b border-neutral-300 dark:border-neutral-700 text-[10px] text-neutral-500">
                  <div className="flex items-center gap-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-neutral-400/80 dark:bg-neutral-600" />
                    <div className="h-1.5 w-1.5 rounded-full bg-neutral-400/80 dark:bg-neutral-600" />
                    <div className="h-1.5 w-1.5 rounded-full bg-neutral-400/80 dark:bg-neutral-600" />
                  </div>
                  <div className="px-2.5 py-0.5 rounded-full bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-300 font-mono text-[10px] border border-neutral-200 dark:border-neutral-800 max-w-[240px] truncate">
                    https://{currentProject.slug}.app
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="hidden sm:inline-block px-1.5 py-0.2 rounded bg-neutral-200/60 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-medium text-[10px]">
                      {currentProject.category}
                    </span>
                  </div>
                </div>

                {/* Project Screenshot Visual - Full Edge-to-Edge, No Black Bars */}
                <Link
                  to={`/projects/${currentProject.slug}`}
                  onClick={playClick}
                  onMouseEnter={playHover}
                  className="relative h-36 sm:h-44 overflow-hidden group/img bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center cursor-pointer transition-colors block"
                >
                  <img
                    key={currentProject.id}
                    src={currentProject.image || '/img/studio/01_home_hero.png'}
                    alt={currentProject.title}
                    className={`w-full h-full object-cover ${projectImagePosition[currentProject.slug] || 'object-center'} transition-transform duration-500 group-hover/img:scale-105`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity flex items-end p-2.5">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-white text-neutral-950 font-title text-xs font-semibold shadow-md hover:bg-neutral-100 transition-colors">
                      <span>Explore Case Study</span>
                      <ArrowUpRight className="h-3 w-3 text-orange-600" />
                    </span>
                  </div>
                </Link>
              </div>
            </div>

            {/* Project Quick Tabs Switcher */}
            <div className="mt-2 pt-2 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between gap-1.5">
              <div className="flex items-center gap-1 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {featuredProjects.map((p, idx) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      playClick();
                      setSelectedProjectIndex(idx);
                    }}
                    onMouseEnter={playHover}
                    className={`px-2.5 py-0.5 rounded-md font-title text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${selectedProjectIndex === idx
                        ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold shadow-2xs'
                        : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
                      }`}
                  >
                    {p.title.split('—')[0].trim()}
                  </button>
                ))}
              </div>

              <Link
                to={`/projects/${currentProject.slug}`}
                onClick={playClick}
                onMouseEnter={playHover}
                className="font-title text-xs font-semibold text-neutral-900 dark:text-white hover:underline shrink-0 flex items-center gap-0.5"
              >
                <span>Details</span>
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
          </motion.div>

          {/* ══════════════════════════════════════════════════════════════
              CARD 2: ABOUT (Top-Right: 4 cols on XL, 5 cols on MD)
             ══════════════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="md:col-span-5 xl:col-span-4 rounded-xl border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#161822] p-2.5 sm:p-3 flex flex-col justify-between shadow-xs hover:border-neutral-400 dark:hover:border-neutral-600 transition-all group overflow-hidden"
          >
            <div>
              {/* Card Header with Orange Badge */}
              <div className="flex items-center gap-1.5 mb-1">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-orange-100 dark:bg-orange-950/60 text-neutral-900 dark:text-white border border-orange-200/60 dark:border-orange-900/40">
                  <User className="h-3.5 w-3.5" />
                </div>
                <span className="font-title text-xs font-bold tracking-wider text-neutral-900 dark:text-white uppercase">
                  ABOUT
                </span>
              </div>

              <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2 font-normal truncate">
                Who I am and how I work.
              </p>
            </div>

            {/* Overlapping Stacked Card Illustration of Developer Workstation */}
            <div className="relative py-1.5 my-auto flex items-center justify-center">
              <div className="absolute h-24 w-20 rounded-lg bg-neutral-200/70 dark:bg-neutral-800/70 rotate-[-12deg] -translate-x-3 shadow-sm transition-transform duration-300 group-hover:rotate-[-16deg] group-hover:-translate-x-5" />
              <div className="absolute h-24 w-20 rounded-lg bg-neutral-100 dark:bg-neutral-700/70 rotate-[10deg] translate-x-3 shadow-sm transition-transform duration-300 group-hover:rotate-[14deg] group-hover:translate-x-5" />

              <div className="relative z-10 h-28 w-24 rounded-xl bg-white dark:bg-neutral-900 p-1 shadow-md border-2 border-neutral-300 dark:border-neutral-600 transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-0.5">
                <div className="h-full w-full rounded-lg overflow-hidden bg-[#faf8f4] dark:bg-[#1a1c24] flex items-center justify-center">
                  <img
                    src="/img/developer_workspace.jpg"
                    alt="Janmark Suelto workspace"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Bottom real location & bio link */}
            <div className="mt-2 pt-2 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs">
              <span className="text-neutral-600 dark:text-neutral-300 font-medium truncate">
                BSIT • Malaybalay City
              </span>
              <Link
                to="/about"
                onClick={playClick}
                className="font-title text-neutral-900 dark:text-white font-semibold hover:underline shrink-0"
              >
                Bio →
              </Link>
            </div>
          </motion.div>

          {/* ══════════════════════════════════════════════════════════════
              CARD 4: CREDENTIALS (Bottom-Left: 3 cols on XL, 6 cols on MD)
             ══════════════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="md:col-span-6 xl:col-span-3 rounded-xl border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#161822] p-2.5 sm:p-3 flex flex-col justify-between shadow-xs hover:border-neutral-400 dark:hover:border-neutral-600 transition-all group"
          >
            <div>
              {/* Card Header with Orange Badge */}
              <div className="flex items-center gap-1.5 mb-1">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-orange-100 dark:bg-orange-950/60 text-neutral-900 dark:text-white border border-orange-200/60 dark:border-orange-900/40">
                  <Award className="h-3.5 w-3.5" />
                </div>
                <span className="font-title text-xs font-bold tracking-wider text-neutral-900 dark:text-white uppercase">
                  CREDENTIALS
                </span>
              </div>

              <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2 font-normal truncate">
                Cisco CCNA Networking & Systems Admin.
              </p>
            </div>

            {/* Circular Certification Seal with Ribbon */}
            <div className="my-auto py-1 flex flex-col items-center justify-center">
              <a
                href={certifications[0]?.verifyUrl || 'https://www.credly.com'}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                onMouseEnter={playHover}
                className="group/badge relative flex flex-col items-center text-center cursor-pointer transition-transform hover:scale-105"
              >
                {/* Outer Seal Circle */}
                <div className="relative h-18 w-18 rounded-full border-2 border-dashed border-sky-400/80 dark:border-sky-500/80 p-1 flex items-center justify-center bg-gradient-to-b from-sky-50 to-sky-100/60 dark:from-neutral-900 dark:to-neutral-800 shadow-md">
                  {/* Inner Solid Badge */}
                  <div className="h-full w-full rounded-full bg-gradient-to-tr from-sky-600 to-cyan-500 text-white flex flex-col items-center justify-center p-0.5 shadow-inner">
                    <ShieldCheck className="h-4.5 w-4.5 mb-0.5 text-white drop-shadow" />
                    <span className="text-[10px] font-black uppercase tracking-wider leading-none text-center">
                      CISCO
                    </span>
                    <span className="text-[10px] font-bold text-sky-100 uppercase tracking-widest mt-0.5">
                      CCNA
                    </span>
                  </div>

                  {/* Ribbon Tails at Bottom */}
                  <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-0.5 z-0">
                    <div className="w-2 h-3 bg-sky-700 dark:bg-sky-800 rotate-12 rounded-b-xs shadow-xs" />
                    <div className="w-2 h-3 bg-sky-700 dark:bg-sky-800 -rotate-12 rounded-b-xs shadow-xs" />
                  </div>
                </div>

                {/* Pill under Badge */}
                <div className="mt-3 px-2.5 py-0.5 rounded-full bg-neutral-900 dark:bg-neutral-800 text-white text-[10px] font-bold tracking-wide shadow-xs flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                  <span>Enterprise Routing & Switching</span>
                </div>
              </a>
            </div>

            {/* Bottom link */}
            <div className="mt-2 pt-2 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs">
              <span className="text-neutral-500 dark:text-neutral-400 font-medium">Credly Verified</span>
              <Link
                to="/about"
                onClick={playClick}
                className="font-title text-neutral-900 dark:text-white font-semibold hover:underline"
              >
                Certs →
              </Link>
            </div>
          </motion.div>

          {/* ══════════════════════════════════════════════════════════════
              CARD 5: SERVICES (Bottom-Center: 4 cols on XL, 6 cols on MD)
             ══════════════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.25 }}
            className="md:col-span-6 xl:col-span-4 rounded-xl border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#161822] p-2.5 sm:p-3 flex flex-col justify-between shadow-xs hover:border-neutral-400 dark:hover:border-neutral-600 transition-all group"
          >
            <div>
              {/* Card Header with Orange Badge */}
              <div className="flex items-center gap-1.5 mb-1">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-orange-100 dark:bg-orange-950/60 text-neutral-900 dark:text-white border border-orange-200/60 dark:border-orange-900/40">
                  <Package className="h-3.5 w-3.5" />
                </div>
                <span className="font-title text-xs font-bold tracking-wider text-neutral-900 dark:text-white uppercase">
                  SERVICES
                </span>
              </div>

              <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2 font-normal truncate">
                Core technical capabilities available for contracts & roles.
              </p>

              {/* Numbered Service List */}
              <div className="space-y-1">
                {servicesList.map((svc) => (
                  <Link
                    key={svc.num}
                    to="/services"
                    onClick={playClick}
                    onMouseEnter={playHover}
                    className="flex items-center justify-between p-1.5 px-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/40 hover:bg-neutral-100/80 dark:hover:bg-neutral-800/70 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors group/item"
                  >
                    <div className="flex items-center gap-2">
                      <div className="flex h-5 w-5 items-center justify-center rounded bg-orange-100/70 dark:bg-orange-950/40 text-neutral-900 dark:text-white text-[10px] font-bold">
                        <Package className="h-3 w-3" />
                      </div>
                      <span className="font-title text-xs font-semibold text-neutral-800 dark:text-neutral-200 group-hover/item:text-orange-600 dark:group-hover/item:text-orange-400 transition-colors">
                        {svc.title}
                      </span>
                    </div>

                    <span className="font-mono text-xs text-neutral-400 font-bold group-hover/item:text-neutral-600 dark:group-hover/item:text-neutral-300">
                      {svc.num}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom link */}
            <div className="mt-2 pt-2 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs">
              <span className="text-neutral-500 dark:text-neutral-400 font-medium">Contract & Full-Time</span>
              <Link
                to="/services"
                onClick={playClick}
                className="font-title text-neutral-900 dark:text-white font-semibold hover:underline"
              >
                Explore →
              </Link>
            </div>
          </motion.div>

          {/* ══════════════════════════════════════════════════════════════
              CARD 6: WORK HISTORY (Bottom-Right: 5 cols on XL, 12 cols on MD)
             ══════════════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.3 }}
            className="col-span-12 xl:col-span-5 rounded-xl border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#161822] p-2.5 sm:p-3 flex flex-col justify-between shadow-xs hover:border-neutral-400 dark:hover:border-neutral-600 transition-all group"
          >
            <div>
              {/* Card Header with Orange Badge */}
              <div className="flex items-center gap-1.5 mb-1">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-orange-100 dark:bg-orange-950/60 text-neutral-900 dark:text-white border border-orange-200/60 dark:border-orange-900/40">
                  <Briefcase className="h-3.5 w-3.5" />
                </div>
                <span className="font-title text-xs font-bold tracking-wider text-neutral-900 dark:text-white uppercase">
                  WORK HISTORY
                </span>
              </div>

              <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2 font-normal truncate">
                Enterprise IT operations, workstation diagnostics & systems maintenance.
              </p>

              {/* Real Experience & Milestone Cards */}
              <div className="space-y-1.5">
                {experienceHighlights.map((exp) => (
                  <div
                    key={exp.id}
                    className="p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50/70 dark:bg-neutral-900/60 hover:bg-white dark:hover:bg-neutral-800/80 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all shadow-2xs"
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-title text-xs font-bold text-neutral-900 dark:text-neutral-100">
                        {exp.title}
                      </span>
                      <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950/60 text-neutral-900 dark:text-white border border-orange-200/60 dark:border-orange-900/40">
                        {exp.period}
                      </span>
                    </div>

                    <div className="text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1">
                      {exp.organization} • {exp.location}
                    </div>

                    <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-snug mb-2">
                      {exp.desc}
                    </p>

                    {/* Operational bullet points */}
                    <div className="space-y-1 mb-2">
                      {exp.responsibilities?.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-[11px] text-neutral-600 dark:text-neutral-400 leading-tight">
                          <span className="text-orange-500 font-bold">›</span>
                          <span className="truncate">{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-1.5 py-0.2 rounded bg-orange-100/70 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 font-semibold text-[10px]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom link */}
            <div className="mt-2 pt-2 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs">
              <span className="text-neutral-500 dark:text-neutral-400 font-medium">Enterprise Internship</span>
              <Link
                to="/experience"
                onClick={playClick}
                className="font-title text-neutral-900 dark:text-white font-semibold hover:underline"
              >
                Experience →
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};
