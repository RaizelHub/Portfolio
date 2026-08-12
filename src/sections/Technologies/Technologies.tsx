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
} from 'react-icons/si';
import { X, LayoutGrid, Code2, Database, Workflow } from 'lucide-react';
import { SectionContainer } from '../../components/layout/SectionContainer';
import { SectionHeading } from '../../components/ui/SectionHeading';
import type { TechItem } from '../../types/technology';
import { useSound } from '../../context/SoundContext';

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
};

const ALL_TECH: TechItem[] = [
  { id: 'react', name: 'React', category: 'Frontend', icon: 'SiReact', color: '#00D8FF', description: 'Declarative, component-based UI library with hooks, virtual DOM, and client-side state routing.', experience: '2+ yrs', proficiency: 88, projects: ['JobRadar AI', 'LeadFlow AI', 'POS System', 'Smartpipe'] },
  { id: 'typescript', name: 'TypeScript', category: 'Frontend', icon: 'SiTypescript', color: '#3178C6', description: 'Typed superset of JavaScript that catches bugs at compile time and improves software quality.', experience: '2+ yrs', proficiency: 85, projects: ['JobRadar AI', 'Portfolio', 'POS System'] },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'Frontend', icon: 'SiTailwindcss', color: '#06B6D4', description: 'Utility-first CSS framework for rapidly building custom, modern responsive interfaces.', experience: '2+ yrs', proficiency: 92, projects: ['Portfolio', 'JobRadar AI', 'OmniCommerce AI'] },
  { id: 'javascript', name: 'JavaScript ES6+', category: 'Frontend', icon: 'SiJavascript', color: '#EAB308', description: 'Core web standard powering web interfaces, asynchronous async/await pipelines, and DOM logic.', experience: '3+ yrs', proficiency: 90, projects: ['All Web Projects'] },
  { id: 'vite', name: 'Vite', category: 'Tools', icon: 'SiVite', color: '#646CFF', description: 'Next-generation frontend tooling offering instant dev server startup and hot module replacement.', experience: '2+ yrs', proficiency: 85, projects: ['Portfolio', 'JobRadar AI', 'POS System'] },
  { id: 'framer', name: 'Framer Motion', category: 'Frontend', icon: 'SiFramer', color: '#0055FF', description: 'Production-ready React animation library powering spring physics and smooth UI transitions.', experience: '1+ yr', proficiency: 78, projects: ['Portfolio', 'JobRadar AI Dashboard'] },
  
  { id: 'node', name: 'Node.js', category: 'Backend', icon: 'SiNodedotjs', color: '#5FA04E', description: 'Asynchronous event-driven JavaScript runtime environment for backend APIs and microservices.', experience: '2+ yrs', proficiency: 84, projects: ['LeadFlow AI', 'OmniCommerce AI', 'Smartpipe API'] },
  { id: 'express', name: 'Express.js', category: 'Backend', icon: 'SiExpress', color: '#888888', description: 'Fast, unopinionated, minimalist web framework for Node.js API endpoints and server routing.', experience: '2+ yrs', proficiency: 86, projects: ['LeadFlow AI', 'Smartpipe Backend'] },
  { id: 'laravel', name: 'Laravel', category: 'Backend', icon: 'SiLaravel', color: '#FF2D20', description: 'Robust PHP web framework providing elegant ORM Eloquent, routing, auth, and database migrations.', experience: '1+ yr', proficiency: 80, projects: ['Student Portal SaaS', 'Enterprise Admin'] },
  { id: 'php', name: 'PHP', category: 'Backend', icon: 'SiPhp', color: '#777BB4', description: 'Server-side scripting language tailored for web development and relational database pipelines.', experience: '2+ yrs', proficiency: 82, projects: ['Student Portal SaaS', 'PHP Web Apps'] },

  { id: 'supabase', name: 'Supabase', category: 'Databases', icon: 'SiSupabase', color: '#3ECF8E', description: 'Open-source Firebase alternative with PostgreSQL database, real-time subscriptions, and auth.', experience: '2+ yrs', proficiency: 88, projects: ['JobRadar AI', 'POS System', 'Portfolio'] },
  { id: 'postgresql', name: 'PostgreSQL', category: 'Databases', icon: 'SiPostgresql', color: '#4169E1', description: 'Advanced relational database with structured tables, JSONB support, and indexing.', experience: '2+ yrs', proficiency: 84, projects: ['JobRadar AI', 'Student Portal'] },
  { id: 'mysql', name: 'MySQL', category: 'Databases', icon: 'SiMysql', color: '#4479A1', description: 'Widely used relational database system powering enterprise data structures and relational queries.', experience: '2+ yrs', proficiency: 85, projects: ['Laravel SaaS', 'PHP Enterprise'] },
  { id: 'mongodb', name: 'MongoDB', category: 'Databases', icon: 'SiMongodb', color: '#47A248', description: 'Document-oriented NoSQL database designed for high volume data storage and flexible JSON schemas.', experience: '1+ yr', proficiency: 78, projects: ['OmniCommerce AI'] },
  { id: 'firebase', name: 'Firebase', category: 'Databases', icon: 'SiFirebase', color: '#FFCA28', description: 'Google cloud platform providing Firestore NoSQL database, authentication, and hosting.', experience: '1+ yr', proficiency: 80, projects: ['Mobile Apps', 'Real-Time Alerts'] },
  { id: 'redis', name: 'Redis', category: 'Databases', icon: 'SiRedis', color: '#DC382D', description: 'In-memory data structure store used as a database, cache, and message broker for fast response times.', experience: '1+ yr', proficiency: 75, projects: ['API Cache Layer'] },

  { id: 'n8n', name: 'n8n Automation', category: 'Automation', icon: 'SiN8N', color: '#FF6D5A', description: 'Fair-code workflow automation tool connecting REST APIs, webhooks, Gmail, and AI models.', experience: '2+ yrs', proficiency: 92, projects: ['JobRadar AI Pipeline', 'LeadFlow AI'] },
  { id: 'gemini', name: 'AI APIs', category: 'Automation', icon: 'SiGooglegemini', color: '#8E75FF', description: 'LLM integration via Google Gemini and OpenAI APIs for automated text analysis and scoring.', experience: '1+ yr', proficiency: 85, projects: ['JobRadar AI', 'LeadFlow AI'] },

  { id: 'git', name: 'Git', category: 'Tools', icon: 'SiGit', color: '#F05032', description: 'Distributed version control system tracking source code history and branch management.', experience: '3+ yrs', proficiency: 88, projects: ['All Codebases'] },
  { id: 'github', name: 'GitHub', category: 'Tools', icon: 'SiGithub', color: '#999999', description: 'Cloud repository hosting platform providing pull requests, CI/CD actions, and issue tracking.', experience: '3+ yrs', proficiency: 90, projects: ['All Open Source Repos'] },
];

const CATEGORIES = [
  { id: 'All', label: 'All Stack', icon: LayoutGrid },
  { id: 'Frontend', label: 'Frontend', icon: Code2 },
  { id: 'Backend', label: 'Backend & APIs', icon: Code2 },
  { id: 'Databases', label: 'Databases', icon: Database },
  { id: 'Automation', label: 'Automation', icon: Workflow },
  { id: 'Tools', label: 'Tools', icon: LayoutGrid },
];

export const Technologies = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedTech, setSelectedTech] = useState<TechItem | null>(null);
  const { playHover, playClick } = useSound();

  const filteredTech =
    activeCategory === 'All'
      ? ALL_TECH
      : ALL_TECH.filter((item) => item.category === activeCategory);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedTech(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <SectionContainer id="technologies" className="py-16 border-b border-[#D5D0C7] dark:border-[#34312B]">
      <SectionHeading
        tag="02"
        title="technical stack"
        subtitle="Languages, frameworks, database architectures, and workflow automation tools applied across real-world systems."
      />

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 text-xs font-mono">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onMouseEnter={playHover}
              onClick={() => {
                playClick();
                setActiveCategory(cat.id);
              }}
              className={`px-3 py-1.5 rounded-lg border transition-all uppercase select-none inline-flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#171717] dark:bg-[#F2EEE6] text-[#F4F1EA] dark:text-[#151411] border-[#171717] dark:border-[#F2EEE6] font-bold shadow-sm'
                  : 'bg-[#EFEBE4] dark:bg-[#1D1C18] text-[#171717] dark:text-[#F2EEE6] border-[#D5D0C7] dark:border-[#34312B] hover:border-[#171717] dark:hover:border-[#F2EEE6]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Tech Cards Grid */}
      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5"
      >
        <AnimatePresence>
          {filteredTech.map((tech) => {
            const Icon = ICON_MAP[tech.icon];
            return (
              <motion.div
                key={tech.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onMouseEnter={playHover}
                onClick={() => {
                  playClick();
                  setSelectedTech(tech);
                }}
                className="group bg-[#EFEBE4] dark:bg-[#1D1C18] border border-[#D5D0C7] dark:border-[#34312B] hover:border-[#171717] dark:hover:border-[#F2EEE6] p-3.5 rounded-xl transition-all cursor-pointer flex items-center justify-between gap-2.5 font-mono text-xs hover:shadow-sm"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-[#F4F1EA] dark:bg-[#151411] border border-[#D5D0C7] dark:border-[#34312B] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    {Icon && <Icon className="w-4 h-4" style={{ color: tech.color }} />}
                  </div>
                  <span className="font-bold text-[#171717] dark:text-[#F2EEE6] truncate">{tech.name}</span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Technical Detail Modal */}
      <AnimatePresence>
        {selectedTech && (
          <motion.div
            key="tech-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#171717]/60 dark:bg-[#151411]/80 backdrop-blur-sm"
            onClick={() => setSelectedTech(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-md w-full bg-[#F4F1EA] dark:bg-[#151411] border-2 border-[#171717] dark:border-[#34312B] rounded-2xl p-6 shadow-2xl space-y-4 font-pt-sans"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => {
                  playClick();
                  setSelectedTech(null);
                }}
                className="absolute top-4 right-4 p-1.5 rounded-lg border border-[#D5D0C7] dark:border-[#34312B] text-[#171717] dark:text-[#F2EEE6] hover:bg-[#EFEBE4] dark:hover:bg-[#1D1C18]"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 border-b border-[#D5D0C7] dark:border-[#34312B] pb-3">
                <div className="w-10 h-10 rounded-lg bg-[#171717] dark:bg-[#E25235] text-[#F4F1EA] dark:text-[#151411] flex items-center justify-center font-mono font-bold text-base">
                  {selectedTech.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#171717] dark:text-[#F2EEE6]">{selectedTech.name}</h3>
                  <span className="font-mono text-xs text-[#C7462D] dark:text-[#E25235]">
                    {selectedTech.category.toUpperCase()} TOOL SPECIFICATION
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#171717] dark:text-[#F2EEE6] leading-relaxed">{selectedTech.description}</p>

              <div className="p-3 bg-[#EFEBE4] dark:bg-[#1D1C18] border border-[#D5D0C7] dark:border-[#34312B] font-mono text-xs space-y-1 rounded-lg">
                <span className="text-[#6B6862] dark:text-[#A9A39A] block text-[10px]">APPLIED IN PROJECTS:</span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {selectedTech.projects.map((proj) => (
                    <span key={proj} className="px-2 py-0.5 bg-[#F4F1EA] dark:bg-[#151411] border border-[#D5D0C7] dark:border-[#34312B] text-[#171717] dark:text-[#F2EEE6] rounded-md">
                      {proj}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionContainer>
  );
};