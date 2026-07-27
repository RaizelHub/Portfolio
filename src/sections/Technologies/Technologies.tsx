import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiJavascript,
  SiGooglegemini,
  SiN8N,
  SiVite,
  SiNodedotjs,
  SiExpress,
  SiSupabase,
  SiPostgresql,
  SiMongodb,
  SiFirebase,
  SiGithub,
  SiRedis,
  SiLaravel,
  SiPhp,
  SiMysql,
  SiGit,
  SiPython,
} from 'react-icons/si';
import { X, Sparkles, Layers } from 'lucide-react';
import { SectionContainer } from '../../components/layout/SectionContainer';
import { SectionHeading } from '../../components/ui/SectionHeading';
import type { TechItem } from '../../types/technology';

const ICON_MAP: Record<string, React.ElementType> = {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiJavascript,
  SiGooglegemini,
  SiN8N,
  SiVite,
  SiNodedotjs,
  SiExpress,
  SiSupabase,
  SiPostgresql,
  SiMongodb,
  SiFirebase,
  SiGithub,
  SiRedis,
  SiLaravel,
  SiPhp,
  SiMysql,
  SiGit,
  SiPython,
};

const ROW_1: TechItem[] = [
  { id: 'react', name: 'React', category: 'Frontend', icon: 'SiReact', color: '#61DAFB', description: 'Declarative, component-based UI library with hooks, virtual DOM, and client-side state routing.', experience: '2+ yrs', proficiency: 88, projects: ['JobRadar AI', 'LeadFlow AI', 'POS System', 'Smartpipe'] },
  { id: 'typescript', name: 'TypeScript', category: 'Frontend', icon: 'SiTypescript', color: '#3B82F6', description: 'Typed superset of JavaScript that catches bugs at compile time and improves software quality.', experience: '2+ yrs', proficiency: 85, projects: ['JobRadar AI', 'Portfolio', 'POS System'] },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'Frontend', icon: 'SiTailwindcss', color: '#06B6D4', description: 'Utility-first CSS framework for rapidly building custom, modern responsive interfaces.', experience: '2+ yrs', proficiency: 92, projects: ['Portfolio', 'JobRadar AI', 'OmniCommerce AI'] },
  { id: 'javascript', name: 'JavaScript ES6+', category: 'Frontend', icon: 'SiJavascript', color: '#F7DF1E', description: 'Core web standard powering web interfaces, asynchronous async/await pipelines, and DOM logic.', experience: '3+ yrs', proficiency: 90, projects: ['All Web Projects'] },
  { id: 'vite', name: 'Vite', category: 'Tools', icon: 'SiVite', color: '#646CFF', description: 'Next-generation frontend tooling offering instant dev server startup and hot module replacement.', experience: '2+ yrs', proficiency: 85, projects: ['Portfolio', 'JobRadar AI', 'POS System'] },
  { id: 'framer', name: 'Framer Motion', category: 'Frontend', icon: 'SiFramer', color: '#BB4BE0', description: 'Production-ready React animation library powering spring physics and smooth UI transitions.', experience: '1+ yr', proficiency: 78, projects: ['Portfolio', 'JobRadar AI Dashboard'] },
  { id: 'gemini', name: 'Gemini AI', category: 'AI', icon: 'SiGooglegemini', color: '#4285F4', description: "Google's multimodal LLM leveraged for structured JSON output generation, suitability scoring, and triage.", experience: '1+ yr', proficiency: 80, projects: ['JobRadar AI', 'OmniCommerce AI', 'LeadFlow AI'] },
  { id: 'n8n', name: 'n8n', category: 'AI', icon: 'SiN8N', color: '#EA4B71', description: 'Workflow automation engine for multi-step AI pipelines, webhook integrations, and email alerts.', experience: '1+ yr', proficiency: 87, projects: ['OmniCommerce AI', 'JobRadar AI', 'LeadFlow AI'] },
];

const ROW_2: TechItem[] = [
  { id: 'nodejs', name: 'Node.js', category: 'Backend', icon: 'SiNodedotjs', color: '#68A063', description: 'Asynchronous event-driven JavaScript server runtime built on Chrome V8 engine.', experience: '2+ yrs', proficiency: 84, projects: ['POS System', 'JobRadar AI Backend', 'LeadFlow AI'] },
  { id: 'express', name: 'Express.js', category: 'Backend', icon: 'SiExpress', color: '#E0E0E0', description: 'Fast, minimalist Node.js web framework for building RESTful APIs and middleware chains.', experience: '2+ yrs', proficiency: 82, projects: ['JobRadar AI Proxy', 'POS API Server'] },
  { id: 'laravel', name: 'Laravel', category: 'Backend', icon: 'SiLaravel', color: '#FF2D20', description: 'PHP framework used to engineer multi-tenant SaaS architecture and automated review centers.', experience: '2+ yrs', proficiency: 80, projects: ['Laravel Tenancy Reviewer Center'] },
  { id: 'php', name: 'PHP', category: 'Backend', icon: 'SiPhp', color: '#777BB4', description: 'Server-side scripting language powering backend logic, database migrations, and web services.', experience: '2+ yrs', proficiency: 82, projects: ['Laravel Tenancy Reviewer Center'] },
  { id: 'supabase', name: 'Supabase', category: 'Database', icon: 'SiSupabase', color: '#3ECF8E', description: 'PostgreSQL BaaS with Row Level Security, Auth, real-time database sync, and storage.', experience: '1+ yr', proficiency: 83, projects: ['JobRadar AI', 'OmniCommerce AI', 'LeadFlow AI'] },
  { id: 'postgresql', name: 'PostgreSQL', category: 'Database', icon: 'SiPostgresql', color: '#336791', description: 'Relational database used for structured storage, canonical hashing, and Row Level Security.', experience: '2+ yrs', proficiency: 80, projects: ['JobRadar AI', 'OmniCommerce AI', 'LeadFlow AI'] },
  { id: 'mongodb', name: 'MongoDB', category: 'Database', icon: 'SiMongodb', color: '#47A248', description: 'Document-oriented NoSQL database used for POS inventory tracking and atomic updates.', experience: '1+ yr', proficiency: 76, projects: ['POS System', 'Boarding House Finder'] },
  { id: 'mysql', name: 'MySQL', category: 'Database', icon: 'SiMysql', color: '#4479A1', description: 'Relational database management system powering desktop attendance logs and multi-tenant stores.', experience: '2+ yrs', proficiency: 82, projects: ['Student Attendance System', 'Laravel Tenancy'] },
  { id: 'firebase', name: 'Firebase', category: 'Database', icon: 'SiFirebase', color: '#FFCA28', description: 'Google real-time Firestore database and cloud backend powering mobile applications.', experience: '1+ yr', proficiency: 72, projects: ['Boarding House Finder', 'Smartpipe IoT'] },
  { id: 'redis', name: 'Redis', category: 'Database', icon: 'SiRedis', color: '#DC382D', description: 'In-memory pub/sub message broker used for multi-instance Socket.io scaling in POS System.', experience: '1+ yr', proficiency: 70, projects: ['POS System Scaling'] },
  { id: 'git', name: 'Git', category: 'DevOps', icon: 'SiGit', color: '#F05032', description: 'Distributed version control system for tracking source code changes and branch management.', experience: '3+ yrs', proficiency: 88, projects: ['All Projects'] },
  { id: 'github', name: 'GitHub', category: 'DevOps', icon: 'SiGithub', color: '#E6EDF3', description: 'Cloud repository hosting, issue tracking, and deployment workflow integration.', experience: '3+ yrs', proficiency: 85, projects: ['All Repositories'] },
];

export const Technologies = () => {
  const [selectedTech, setSelectedTech] = useState<TechItem | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedTech(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const row1Items = [...ROW_1, ...ROW_1, ...ROW_1];
  const row2Items = [...ROW_2, ...ROW_2, ...ROW_2];

  return (
    <SectionContainer id="skills">
      <SectionHeading
        tag="02 / Technical Skills"
        title="Technologies &amp; Infrastructure"
        subtitle="The frameworks, databases, and automation tools I build with every day."
      />

      <div className="mt-8 space-y-6 select-none relative">
        <div className="flex items-center justify-between px-2 text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1.5 text-emerald-400">
            <Sparkles className="w-3.5 h-3.5" /> Hover to pause &middot; Click icon for details
          </span>
          <span className="hidden sm:inline text-slate-500">24+ Infrastructure &amp; Stack Technologies</span>
        </div>

        <div className="relative overflow-hidden py-4 rounded-2xl bg-navy-950/60 border border-navy-800/80 shadow-2xl backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-navy-950 via-navy-950/80 to-transparent z-20" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-navy-950 via-navy-950/80 to-transparent z-20" />

          <div className="overflow-hidden flex mb-4 group">
            <motion.div
              className="flex gap-4 shrink-0 pr-4 group-hover:[animation-play-state:paused]"
              animate={{ x: ['0%', '-33.333%'] }}
              transition={{ x: { repeat: Infinity, repeatType: 'loop', duration: 35, ease: 'linear' } }}
            >
              {row1Items.map((tech, idx) => {
                const Icon = ICON_MAP[tech.icon];
                return (
                  <div
                    key={`r1-${tech.id}-${idx}`}
                    onClick={() => setSelectedTech(tech)}
                    className="group/card relative flex items-center gap-3 px-4 py-3 rounded-xl bg-navy-900/60 border border-navy-800/80 hover:border-emerald-500/50 hover:bg-navy-850/90 transition-all duration-300 cursor-pointer shrink-0 shadow-md hover:shadow-emerald-500/10 hover:scale-105"
                  >
                    <div className="p-2 rounded-lg transition-transform duration-300 group-hover/card:scale-110" style={{ backgroundColor: `${tech.color}15`, border: `1px solid ${tech.color}30` }}>
                      <Icon className="w-5 h-5" style={{ color: tech.color }} />
                    </div>
                    <span className="text-xs font-semibold text-slate-200 group-hover/card:text-white transition-colors">{tech.name}</span>
                  </div>
                );
              })}
            </motion.div>
          </div>

          <div className="overflow-hidden flex group">
            <motion.div
              className="flex gap-4 shrink-0 pr-4 group-hover:[animation-play-state:paused]"
              animate={{ x: ['-33.333%', '0%'] }}
              transition={{ x: { repeat: Infinity, repeatType: 'loop', duration: 40, ease: 'linear' } }}
            >
              {row2Items.map((tech, idx) => {
                const Icon = ICON_MAP[tech.icon];
                return (
                  <div
                    key={`r2-${tech.id}-${idx}`}
                    onClick={() => setSelectedTech(tech)}
                    className="group/card relative flex items-center gap-3 px-4 py-3 rounded-xl bg-navy-900/60 border border-navy-800/80 hover:border-emerald-500/50 hover:bg-navy-850/90 transition-all duration-300 cursor-pointer shrink-0 shadow-md hover:shadow-emerald-500/10 hover:scale-105"
                  >
                    <div className="p-2 rounded-lg transition-transform duration-300 group-hover/card:scale-110" style={{ backgroundColor: `${tech.color}15`, border: `1px solid ${tech.color}30` }}>
                      <Icon className="w-5 h-5" style={{ color: tech.color }} />
                    </div>
                    <span className="text-xs font-semibold text-slate-200 group-hover/card:text-white transition-colors">{tech.name}</span>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>

        <AnimatePresence>
          {selectedTech && (
            <motion.div
              key="tech-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 bg-navy-950/80 backdrop-blur-md"
              onClick={() => setSelectedTech(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 10 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="relative max-w-md w-full bg-navy-900 border border-navy-700/80 rounded-2xl p-6 shadow-2xl space-y-5"
                onClick={(e) => e.stopPropagation()}
                style={{ boxShadow: `0 0 40px ${selectedTech.color}20, 0 10px 40px rgba(0,0,0,0.8)` }}
              >
                <button onClick={() => setSelectedTech(null)} className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-navy-800 transition-colors" aria-label="Close detail modal">
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg" style={{ backgroundColor: `${selectedTech.color}20`, border: `1.5px solid ${selectedTech.color}50` }}>
                    {(() => {
                      const Icon = ICON_MAP[selectedTech.icon];
                      return Icon ? <Icon className="w-8 h-8" style={{ color: selectedTech.color }} /> : null;
                    })()}
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-white tracking-tight">{selectedTech.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded-full uppercase" style={{ backgroundColor: `${selectedTech.color}20`, color: selectedTech.color, border: `1px solid ${selectedTech.color}40` }}>
                        {selectedTech.category}
                      </span>
                      <span className="text-xs font-mono text-slate-400">{selectedTech.experience} experience</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{selectedTech.description}</p>

                <div className="p-3 bg-navy-950/60 rounded-lg border border-navy-800/80 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400 font-medium">Hands-On Experience</span>
                  <span className="font-bold text-emerald-400">{selectedTech.experience} Active Usage</span>
                </div>

                <div className="space-y-2 pt-1 border-t border-navy-800">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                    <Layers className="w-3 h-3 text-emerald-400" /> Applied In Projects
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedTech.projects.map((proj) => (
                      <span key={proj} className="px-2.5 py-1 text-xs font-mono rounded-md bg-navy-950 text-slate-300 border border-navy-800">{proj}</span>
                    ))}
                  </div>
                </div>

                <div className="pt-2 text-center text-[11px] font-mono text-slate-500">
                  Press <kbd className="px-1.5 py-0.5 rounded bg-navy-950 border border-navy-800 text-slate-400">Esc</kbd> or click outside to dismiss
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionContainer>
  );
};