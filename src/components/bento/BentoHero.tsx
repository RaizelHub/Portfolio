import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Workflow } from 'lucide-react';
import {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiSupabase,
  SiPostgresql,
  SiPython,
  SiDocker,
  SiNodedotjs,
  SiGithub,
} from 'react-icons/si';
import { useSound } from '../../context/SoundContext';

interface DailyDriver {
  name: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
}

const dailyDrivers: DailyDriver[] = [
  { name: 'React 19', icon: SiReact, color: '#06B6D4' },
  { name: 'TypeScript', icon: SiTypescript, color: '#3B82F6' },
  { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#0EA5E9' },
  { name: 'Supabase', icon: SiSupabase, color: '#10B981' },
  { name: 'PostgreSQL', icon: SiPostgresql, color: '#336791' },
  { name: 'n8n Automation', icon: Workflow, color: '#EA580C' },
  { name: 'Python & Django', icon: SiPython, color: '#F59E0B' },
  { name: 'Node.js', icon: SiNodedotjs, color: '#22C55E' },
  { name: 'Docker', icon: SiDocker, color: '#2563EB' },
  { name: 'GitHub', icon: SiGithub, color: '#8B5CF6' },
];

export const BentoHero: React.FC = () => {
  const { playClick, playHover } = useSound();

  const handleContactClick = () => {
    playClick();
    window.dispatchEvent(new CustomEvent('open-contact-modal'));
  };

  return (
    <section id="bento-hero" className="mb-2 select-none font-sans">
      {/* Top Headline & CTA Row */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-2.5 mb-1.5">
        <div className="max-w-2xl">
          {/* Top Tag */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="font-title text-xs font-bold tracking-wider uppercase text-neutral-600 dark:text-neutral-400 mb-0.5"
          >
            Full-Stack Dev • AI Automation Specialist
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-title text-xl sm:text-2xl lg:text-[26px] xl:text-[28px] font-black tracking-tight text-neutral-900 dark:text-white leading-[1.08]"
          >
            Just building secure <br className="hidden sm:inline" />
            <span>software that works.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-1 text-xs text-neutral-600 dark:text-neutral-300 font-normal leading-relaxed max-w-xl"
          >
            I build full-stack platforms, autonomous AI workflows, and scalable web applications. Focused on clean database schemas, transactional integrity, and refined interfaces.
          </motion.p>
        </div>

        {/* Top Right "Get in touch" CTA button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="shrink-0 self-start mt-0.5"
        >
          <button
            type="button"
            onClick={handleContactClick}
            onMouseEnter={playHover}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-neutral-950 dark:bg-white text-white dark:text-neutral-950 font-title text-xs font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-all duration-200 shadow-sm cursor-pointer group hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Get in touch</span>
            <div className="h-4 w-4 rounded-full bg-neutral-800 dark:bg-neutral-200 flex items-center justify-center text-white dark:text-neutral-900 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowUpRight className="h-2.5 w-2.5 stroke-[2.5]" />
            </div>
          </button>
        </motion.div>
      </div>

      {/* DAILY DRIVERS Strip Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="rounded-xl border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#161822] p-1 sm:p-1.5 shadow-xs flex flex-col sm:flex-row sm:items-center gap-2 overflow-hidden"
      >
        {/* Label Tag */}
        <div className="flex flex-col pl-1.5 pr-1 shrink-0">
          <span className="font-title text-xs font-bold tracking-wider text-neutral-900 dark:text-white uppercase">
            DAILY DRIVERS
          </span>
          <span className="font-title text-xs font-bold text-neutral-900 dark:text-neutral-100 whitespace-nowrap">
            Tools I work with
          </span>
        </div>

        <div className="hidden sm:block h-5 w-[1px] bg-neutral-300 dark:border-neutral-700 shrink-0" />

        {/* Scrollable Tool Badges Marquee/Flex */}
        <div className="flex items-center gap-1 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-0.5 px-0.5">
          {dailyDrivers.map((driver) => {
            const Icon = driver.icon;
            return (
              <div
                key={driver.name}
                className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg bg-neutral-50 dark:bg-neutral-900/90 border border-neutral-300 dark:border-neutral-700 text-xs font-medium text-neutral-800 dark:text-neutral-200 whitespace-nowrap shadow-2xs hover:border-neutral-500 transition-colors shrink-0"
              >
                <Icon className="h-3 w-3 shrink-0" style={{ color: driver.color }} />
                <span>{driver.name}</span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};
