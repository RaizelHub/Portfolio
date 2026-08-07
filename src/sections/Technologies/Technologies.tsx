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
import { X, Sparkles } from 'lucide-react';
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

  const row1Items = [...ROW_1, ...ROW_1];
  const row2Items = [...ROW_2, ...ROW_2];

  return (
    <SectionContainer id="technologies" className="py-16 border-b border-[#D5D0C7]">
      <SectionHeading
        tag="02 // TECHNICAL TAXONOMY"
        title="Technical Expertise &amp; Stack"
        subtitle="Core frameworks, backend architecture, databases, and workflow automation tools."
      />

      {/* Structured Category Columns (Manual Index Style) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-[#EFEBE4] border border-[#D5D0C7] p-5 rounded-[2px]">
          <div className="font-mono text-xs font-bold text-[#C7462D] mb-2 uppercase flex justify-between border-b border-[#D5D0C7] pb-2">
            <span>01 // FRONTEND &amp; UI ENGINE</span>
          </div>
          <ul className="space-y-2 font-mono text-xs text-[#171717]">
            <li className="flex justify-between py-1 border-b border-[#D5D0C7]/40">
              <span>React 19 / TypeScript</span>
              <span className="text-[#6B6862]">EXPERT</span>
            </li>
            <li className="flex justify-between py-1 border-b border-[#D5D0C7]/40">
              <span>TailwindCSS v4 / CSS3</span>
              <span className="text-[#6B6862]">EXPERT</span>
            </li>
            <li className="flex justify-between py-1 border-b border-[#D5D0C7]/40">
              <span>Vite / Next.js Tooling</span>
              <span className="text-[#6B6862]">ADVANCED</span>
            </li>
            <li className="flex justify-between py-1">
              <span>Framer Motion / UI Physics</span>
              <span className="text-[#6B6862]">INTERMEDIATE</span>
            </li>
          </ul>
        </div>

        <div className="bg-[#EFEBE4] border border-[#D5D0C7] p-5 rounded-[2px]">
          <div className="font-mono text-xs font-bold text-[#C7462D] mb-2 uppercase flex justify-between border-b border-[#D5D0C7] pb-2">
            <span>02 // BACKEND &amp; DATA PIPELINES</span>
          </div>
          <ul className="space-y-2 font-mono text-xs text-[#171717]">
            <li className="flex justify-between py-1 border-b border-[#D5D0C7]/40">
              <span>Node.js / Express APIs</span>
              <span className="text-[#6B6862]">ADVANCED</span>
            </li>
            <li className="flex justify-between py-1 border-b border-[#D5D0C7]/40">
              <span>Laravel / PHP Engine</span>
              <span className="text-[#6B6862]">ADVANCED</span>
            </li>
            <li className="flex justify-between py-1 border-b border-[#D5D0C7]/40">
              <span>PostgreSQL / Supabase</span>
              <span className="text-[#6B6862]">ADVANCED</span>
            </li>
            <li className="flex justify-between py-1">
              <span>MongoDB / MySQL / Redis</span>
              <span className="text-[#6B6862]">INTERMEDIATE</span>
            </li>
          </ul>
        </div>

        <div className="bg-[#EFEBE4] border border-[#D5D0C7] p-5 rounded-[2px]">
          <div className="font-mono text-xs font-bold text-[#C7462D] mb-2 uppercase flex justify-between border-b border-[#D5D0C7] pb-2">
            <span>03 // AUTOMATION &amp; DEVOPS</span>
          </div>
          <ul className="space-y-2 font-mono text-xs text-[#171717]">
            <li className="flex justify-between py-1 border-b border-[#D5D0C7]/40">
              <span>n8n Workflow Automation</span>
              <span className="text-[#6B6862]">EXPERT</span>
            </li>
            <li className="flex justify-between py-1 border-b border-[#D5D0C7]/40">
              <span>Gemini AI / LLM Integrations</span>
              <span className="text-[#6B6862]">ADVANCED</span>
            </li>
            <li className="flex justify-between py-1 border-b border-[#D5D0C7]/40">
              <span>Git / GitHub Workflows</span>
              <span className="text-[#6B6862]">EXPERT</span>
            </li>
            <li className="flex justify-between py-1">
              <span>REST / Webhooks / Sockets</span>
              <span className="text-[#6B6862]">ADVANCED</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Marquee Row */}
      <div className="mt-8 space-y-4 select-none relative">
        <div className="flex items-center justify-between px-1 text-xs font-mono text-[#6B6862]">
          <span className="flex items-center gap-1.5 text-[#171717]">
            <Sparkles className="w-3.5 h-3.5 text-[#C7462D]" /> CLICK ANY TOOL FOR SPECIFICATIONS
          </span>
          <span className="hidden sm:inline">24+ SYSTEM LIBRARIES</span>
        </div>

        <div className="relative overflow-hidden py-3 bg-[#EFEBE4] border border-[#D5D0C7] rounded-[2px]">
          <div className="overflow-hidden flex mb-3 group">
            <motion.div
              className="flex gap-3 shrink-0 pr-3 group-hover:[animation-play-state:paused]"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ x: { repeat: Infinity, repeatType: 'loop', duration: 30, ease: 'linear' } }}
            >
              {row1Items.map((tech, idx) => {
                const Icon = ICON_MAP[tech.icon];
                return (
                  <div
                    key={`r1-${tech.id}-${idx}`}
                    onClick={() => setSelectedTech(tech)}
                    className="flex items-center gap-2.5 px-3.5 py-2 rounded-[2px] bg-[#F4F1EA] border border-[#D5D0C7] hover:border-[#171717] transition-all cursor-pointer shrink-0 font-mono text-xs text-[#171717]"
                  >
                    {Icon && <Icon className="w-4 h-4 text-[#171717]" />}
                    <span className="font-semibold">{tech.name}</span>
                  </div>
                );
              })}
            </motion.div>
          </div>

          <div className="overflow-hidden flex group">
            <motion.div
              className="flex gap-3 shrink-0 pr-3 group-hover:[animation-play-state:paused]"
              animate={{ x: ['-50%', '0%'] }}
              transition={{ x: { repeat: Infinity, repeatType: 'loop', duration: 35, ease: 'linear' } }}
            >
              {row2Items.map((tech, idx) => {
                const Icon = ICON_MAP[tech.icon];
                return (
                  <div
                    key={`r2-${tech.id}-${idx}`}
                    onClick={() => setSelectedTech(tech)}
                    className="flex items-center gap-2.5 px-3.5 py-2 rounded-[2px] bg-[#F4F1EA] border border-[#D5D0C7] hover:border-[#171717] transition-all cursor-pointer shrink-0 font-mono text-xs text-[#171717]"
                  >
                    {Icon && <Icon className="w-4 h-4 text-[#171717]" />}
                    <span className="font-semibold">{tech.name}</span>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Technical Detail Modal */}
        <AnimatePresence>
          {selectedTech && (
            <motion.div
              key="tech-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#171717]/60 backdrop-blur-sm"
              onClick={() => setSelectedTech(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative max-w-md w-full bg-[#F4F1EA] border-2 border-[#171717] rounded-[2px] p-6 shadow-2xl space-y-4"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedTech(null)}
                  className="absolute top-4 right-4 p-1 rounded border border-[#D5D0C7] text-[#171717] hover:bg-[#EFEBE4]"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-3 border-b border-[#D5D0C7] pb-3">
                  <div className="w-10 h-10 rounded-[2px] bg-[#171717] text-[#F4F1EA] flex items-center justify-center font-mono font-bold text-base">
                    {selectedTech.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#171717]">{selectedTech.name}</h3>
                    <span className="font-mono text-xs text-[#C7462D]">{selectedTech.category} // {selectedTech.experience} EXPERIENCE</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#171717] leading-relaxed">{selectedTech.description}</p>

                <div className="p-3 bg-[#EFEBE4] border border-[#D5D0C7] font-mono text-xs space-y-1">
                  <span className="text-[#6B6862] block text-[10px]">APPLIED IN PROJECTS:</span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {selectedTech.projects.map((proj) => (
                      <span key={proj} className="px-2 py-0.5 bg-[#F4F1EA] border border-[#D5D0C7] text-[#171717]">
                        {proj}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionContainer>
  );
};