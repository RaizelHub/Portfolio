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
  note?: string;
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
    title: 'Frontend & Web',
    icon: Code2,
    items: [
      { name: 'React', note: 'UI Library', icon: SiReact },
      { name: 'TypeScript', note: 'Type Safety', icon: SiTypescript },
      { name: 'JavaScript', note: 'ES6+ Runtime', icon: SiJavascript },
      { name: 'Tailwind CSS', note: 'Design Tokens', icon: SiTailwindcss },
      { name: 'Vite', note: 'Build Tooling', icon: SiVite },
    ],
  },
  {
    id: 'mobile',
    title: 'Mobile',
    icon: Smartphone,
    items: [
      { name: 'React Native', note: 'Cross-platform', icon: SiReact },
      { name: 'Expo', note: 'Tooling & EAS', icon: SiExpo },
      { name: 'Flutter (Dart)', note: 'Mobile UI SDK', icon: SiFlutter },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & APIs',
    icon: Server,
    items: [
      { name: 'Node.js', note: 'Runtime', icon: SiNodedotjs },
      { name: 'Express', note: 'REST Framework', icon: SiExpress },
      { name: 'Laravel', note: 'PHP MVC', icon: SiLaravel },
      { name: 'REST APIs', note: 'Web Services', icon: Server },
    ],
  },
  {
    id: 'data',
    title: 'Data & Persistence',
    icon: Database,
    items: [
      { name: 'Supabase', note: 'Auth & Edge Functions', icon: SiSupabase },
      { name: 'PostgreSQL', note: 'Relational DB', icon: SiPostgresql },
      { name: 'MySQL', note: 'SQL Database', icon: SiMysql },
      { name: 'MongoDB', note: 'Document Store', icon: SiMongodb },
      { name: 'Firebase', note: 'Realtime Sync', icon: SiFirebase },
    ],
  },
  {
    id: 'automation',
    title: 'Automation & AI',
    icon: Workflow,
    items: [
      { name: 'n8n', note: 'Workflow Engine', icon: SiN8N },
      { name: 'Webhooks', note: 'Event Ingestion', icon: Webhook },
      { name: 'Groq AI', note: 'Fast Inference', icon: Cpu },
      { name: 'Google Gemini', note: 'LLM APIs', icon: SiGooglegemini },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & DevOps',
    icon: Wrench,
    items: [
      { name: 'Git', note: 'Version Control', icon: SiGit },
      { name: 'GitHub', note: 'CI/CD & Repos', icon: SiGithub },
      { name: 'Docker', note: 'Containers', icon: SiDocker },
      { name: 'Vercel', note: 'Deployment', icon: SiVercel },
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
    <SectionContainer id="technologies" className="py-16 border-b border-[#DCE1E7] dark:border-[#242B33]">
      {/* ── Section Header ── */}
      <motion.div {...entrance()} className="max-w-3xl mb-12">
        <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#2563EB] dark:text-[#60A5FA] block mb-3">
          Technologies
        </span>

        <h2
          className="font-sans font-bold text-[#111318] dark:text-[#F4F6F8] leading-[1.12] mb-3"
          style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.1rem)' }}
        >
          Tech stack &amp; capabilities.
        </h2>

        <p className="text-sm sm:text-base text-[#5F6873] dark:text-[#A7B0BA] leading-relaxed max-w-xl font-sans">
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
              className="bg-[#FFFFFF] dark:bg-[#11151A] border border-[#DCE1E7] dark:border-[#242B33] rounded-xl p-5 shadow-xs"
            >
              {/* Group Header */}
              <div className="flex items-center gap-2 pb-3.5 mb-3.5 border-b border-[#DCE1E7] dark:border-[#242B33]">
                <GroupIcon className="w-4 h-4 text-[#2563EB] dark:text-[#60A5FA]" />
                <h3 className="font-sans font-bold text-sm text-[#111318] dark:text-[#F4F6F8]">
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
                      className="group flex items-center justify-between p-2 rounded-lg bg-[#F7F8FA] dark:bg-[#171C22] border border-transparent hover:border-[#DCE1E7] dark:hover:border-[#343D48] transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-6 h-6 rounded-md bg-[#FFFFFF] dark:bg-[#11151A] border border-[#DCE1E7] dark:border-[#242B33] flex items-center justify-center shrink-0 text-[#5F6873] dark:text-[#A7B0BA] group-hover:text-[#2563EB] dark:group-hover:text-[#60A5FA] transition-colors">
                          <ItemIcon className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-sans text-xs font-semibold text-[#111318] dark:text-[#F4F6F8] truncate">
                          {item.name}
                        </span>
                      </div>

                      {item.note && (
                        <span className="font-mono text-[10px] text-[#78828D] dark:text-[#7F8994] shrink-0 pl-2">
                          {item.note}
                        </span>
                      )}
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