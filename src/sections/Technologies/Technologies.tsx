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
      { name: 'React', icon: SiReact },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
      { name: 'Vite', icon: SiVite },
    ],
  },
  {
    id: 'mobile',
    title: 'Mobile',
    icon: Smartphone,
    items: [
      { name: 'React Native', icon: SiReact },
      { name: 'Expo', icon: SiExpo },
      { name: 'Flutter', icon: SiFlutter },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: Server,
    items: [
      { name: 'Node.js', icon: SiNodedotjs },
      { name: 'Express', icon: SiExpress },
      { name: 'Laravel', icon: SiLaravel },
      { name: 'REST APIs', icon: Server },
    ],
  },
  {
    id: 'data',
    title: 'Data',
    icon: Database,
    items: [
      { name: 'Supabase', icon: SiSupabase },
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'MySQL', icon: SiMysql },
      { name: 'MongoDB', icon: SiMongodb },
      { name: 'Firebase', icon: SiFirebase },
    ],
  },
  {
    id: 'automation',
    title: 'Automation',
    icon: Workflow,
    items: [
      { name: 'n8n', icon: SiN8N },
      { name: 'Webhooks', icon: Webhook },
      { name: 'Groq AI', icon: Cpu },
      { name: 'Google Gemini', icon: SiGooglegemini },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    icon: Wrench,
    items: [
      { name: 'Git', icon: SiGit },
      { name: 'GitHub', icon: SiGithub },
      { name: 'Docker', icon: SiDocker },
      { name: 'Vercel', icon: SiVercel },
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

      {/* ── Grouped Technology Cards: Neutral & Restrained ── */}
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

              {/* Items List with Icons */}
              <div className="space-y-2">
                {group.items.map((item) => {
                  const ItemIcon = item.icon;

                  return (
                    <div
                      key={item.name}
                      onMouseEnter={playHover}
                      className="group flex items-center gap-2.5 p-2 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border-subtle)] hover:border-[var(--border)] transition-colors"
                    >
                      <div className="w-6 h-6 rounded-md bg-[var(--surface)] border border-[var(--border-subtle)] flex items-center justify-center shrink-0 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors">
                        <ItemIcon className="w-3.5 h-3.5" />
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