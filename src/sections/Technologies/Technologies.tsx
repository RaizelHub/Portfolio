import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiVite,
  SiExpo,
  SiFlutter,
  SiNodedotjs,
  SiExpress,
  SiLaravel,
  SiSupabase,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiFirebase,
  SiN8N,
  SiGooglegemini,
  SiGit,
  SiGithub,
  SiDocker,
  SiVercel,
  SiPython,
  SiDjango,
} from 'react-icons/si';
import { Server, Webhook, Cpu, Code2, Smartphone, Database, Workflow, Wrench } from 'lucide-react';
import { SectionContainer } from '../../components/layout/SectionContainer';
import { useSound } from '../../context/SoundContext';

interface TechItem {
  name: string;
  icon: React.ElementType;
  color: string;
}

interface TechGroup {
  id: string;
  title: string;
  icon: React.ElementType;
  items: TechItem[];
}

const TECH_GROUPS: TechGroup[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    icon: Code2,
    items: [
      { name: 'React', icon: SiReact, color: '#61DAFB' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'Vite', icon: SiVite, color: '#646CFF' },
    ],
  },
  {
    id: 'mobile',
    title: 'Mobile',
    icon: Smartphone,
    items: [
      { name: 'React Native', icon: SiReact, color: '#61DAFB' },
      { name: 'Expo', icon: SiExpo, color: '#1C2024' },
      { name: 'Flutter', icon: SiFlutter, color: '#02569B' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: Server,
    items: [
      { name: 'Python', icon: SiPython, color: '#3776AB' },
      { name: 'Django / DRF', icon: SiDjango, color: '#092E20' },
      { name: 'Node.js', icon: SiNodedotjs, color: '#5FA04E' },
      { name: 'Express', icon: SiExpress, color: '#687076' },
      { name: 'Laravel', icon: SiLaravel, color: '#FF2D20' },
      { name: 'REST APIs', icon: Server, color: '#0284C7' },
    ],
  },
  {
    id: 'data',
    title: 'Data',
    icon: Database,
    items: [
      { name: 'Supabase', icon: SiSupabase, color: '#3ECF8E' },
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
      { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
    ],
  },
  {
    id: 'automation',
    title: 'Automation',
    icon: Workflow,
    items: [
      { name: 'n8n', icon: SiN8N, color: '#EA4B71' },
      { name: 'Webhooks', icon: Webhook, color: '#8B5CF6' },
      { name: 'Groq AI', icon: Cpu, color: '#F55036' },
      { name: 'Google Gemini', icon: SiGooglegemini, color: '#8E75FF' },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    icon: Wrench,
    items: [
      { name: 'Git', icon: SiGit, color: '#F05032' },
      { name: 'GitHub', icon: SiGithub, color: '#24292F' },
      { name: 'Docker', icon: SiDocker, color: '#2496ED' },
      { name: 'Vercel', icon: SiVercel, color: '#000000' },
    ],
  },
];

export const Technologies: React.FC = () => {
  const { playHover } = useSound();
  const prefersReducedMotion = useReducedMotion();

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
    <SectionContainer id="technologies" className="border-b-2 border-neutral-300 dark:border-neutral-700 py-6 sm:py-8">
      {/* ── Section Header ── */}
      <motion.div {...entrance()} className="mb-6 grid max-w-none gap-3 md:grid-cols-12 md:items-end">
        <div className="md:col-span-5">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="flex h-5 w-5 items-center justify-center rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-700">
              <Wrench className="h-3 w-3" />
            </div>
            <span className="font-title text-xs font-bold tracking-wider uppercase text-neutral-900 dark:text-white">
              Stack &amp; Tooling
            </span>
          </div>
          <h2 className="font-title text-xl sm:text-2xl font-black tracking-tight text-neutral-900 dark:text-white leading-[1.1]">
            Technologies
          </h2>
        </div>

        <p className="text-xs text-neutral-600 dark:text-neutral-300 font-normal leading-relaxed md:col-span-6 md:col-start-7">
          Languages, frameworks, databases, and workflow orchestration tools applied across practical systems.
        </p>
      </motion.div>

      {/* ── Grouped Technology Cards ── */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {TECH_GROUPS.map((group, idx) => {
          const GroupIcon = group.icon;

          return (
            <motion.div
              key={group.id}
              {...entrance(idx * 0.05)}
              className="rounded-2xl border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#161822] p-4 sm:p-5 shadow-xs transition-all duration-150 hover:-translate-y-0.5 hover:border-neutral-400 dark:hover:border-neutral-600"
            >
              {/* Group Header */}
              <div className="mb-3 flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white border border-neutral-200 dark:border-neutral-700">
                    <GroupIcon className="w-3.5 h-3.5" strokeWidth={2.5} />
                  </div>
                  <h3 className="font-title font-bold text-sm sm:text-base text-neutral-900 dark:text-white">
                    {group.title}
                  </h3>
                </div>
                <span className="font-mono text-[10px] font-semibold text-neutral-500 dark:text-neutral-400 uppercase">
                  {group.items.length} Skills
                </span>
              </div>

              {/* Items List with Real Logo Colors */}
              <div className="grid grid-cols-1 gap-1.5">
                {group.items.map((item) => {
                  const ItemIcon = item.icon;

                  return (
                    <div
                      key={item.name}
                      onMouseEnter={playHover}
                      className="group flex min-h-9 items-center gap-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/90 px-2.5 py-1 transition-all duration-120 hover:border-neutral-400 dark:hover:border-neutral-600"
                    >
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center">
                        <ItemIcon
                          className="w-3.5 h-3.5 transition-transform group-hover:scale-110"
                          style={{ color: item.color }}
                        />
                      </div>
                      <span className="break-safe font-mono text-xs font-semibold leading-snug text-neutral-900 dark:text-neutral-100">
                        {item.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionContainer>
  );
};
