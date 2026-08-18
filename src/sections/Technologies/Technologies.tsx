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
    <SectionContainer id="technologies" className="py-16 border-b border-[var(--border-subtle)]">
      {/* ── Section Header ── */}
      <motion.div {...entrance()} className="max-w-3xl mb-12">
        <h2
          className="font-title text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] mb-3"
        >
          Technologies
        </h2>

        <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-xl font-sans">
          Languages, frameworks, databases, and workflow orchestration tools applied across practical systems.
        </p>
      </motion.div>

      {/* ── Grouped Technology Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
        {TECH_GROUPS.map((group, idx) => {
          const GroupIcon = group.icon;

          return (
            <motion.div
              key={group.id}
              {...entrance(idx * 0.05)}
              className="bg-[var(--surface)] border border-[var(--border-subtle)] rounded-xl p-5 shadow-xs"
            >
              {/* Group Header */}
              <div className="flex items-center gap-2 pb-3.5 mb-3.5 border-b border-[var(--border-subtle)]">
                <GroupIcon className="w-4 h-4 text-[var(--accent)]" />
                <h3 className="font-sans font-bold text-sm text-[var(--text-primary)]">
                  {group.title}
                </h3>
              </div>

              {/* Items List with Real Logo Colors */}
              <div className="space-y-2">
                {group.items.map((item) => {
                  const ItemIcon = item.icon;

                  return (
                    <div
                      key={item.name}
                      onMouseEnter={playHover}
                      className="group flex items-center gap-2.5 p-2 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border-subtle)] hover:border-[var(--border)] transition-all hover:translate-x-0.5"
                    >
                      <div className="w-7 h-7 rounded-md bg-[var(--surface)] border border-[var(--border-subtle)] flex items-center justify-center shrink-0 shadow-2xs">
                        <ItemIcon
                          className="w-4 h-4 transition-transform group-hover:scale-110"
                          style={{ color: item.color }}
                        />
                      </div>
                      <span className="font-sans text-xs font-medium text-[var(--text-primary)] truncate">
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