import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Globe,
  Cpu,
  Wifi,
  Smartphone,
  Monitor,
  Cloud,
  LayoutGrid,
} from 'lucide-react';
import { SectionContainer } from '../../components/layout/SectionContainer';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { ProjectCard } from '../../components/ui/ProjectCard';
import { projects } from '../../data/projects';
import { useSound } from '../../context/SoundContext';

const categoryMeta: Record<
  string,
  {
    label: string;
    tab: string;
    icon: React.ElementType;
    accent: string;
  }
> = {
  Web: { label: 'Web Platforms', tab: 'Web', icon: Globe, accent: '#C7462D' },
  AI: { label: 'AI & Automation', tab: 'AI', icon: Cpu, accent: '#8B5CF6' },
  IoT: { label: 'IoT & Hardware', tab: 'IoT', icon: Wifi, accent: '#059669' },
  Mobile: { label: 'Mobile Apps', tab: 'Mobile', icon: Smartphone, accent: '#2563EB' },
  Desktop: { label: 'Desktop Apps', tab: 'Desktop', icon: Monitor, accent: '#D97706' },
  SaaS: { label: 'SaaS', tab: 'SaaS', icon: Cloud, accent: '#0891B2' },
};

const categoryOrder = ['Web', 'AI', 'IoT', 'Mobile', 'Desktop', 'SaaS'];

export const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const { playHover, playClick } = useSound();

  // Count projects per category
  const categoryCounts: Record<string, number> = {};
  projects.forEach((p) => {
    categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
  });

  // Filter projects based on active tab
  const filteredProjects =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const displayedProjects = filteredProjects.slice(0, 6);

  // Get active accent color for the underline indicator
  const activeAccent =
    activeCategory === 'All'
      ? '#C7462D'
      : categoryMeta[activeCategory]?.accent || '#C7462D';

  return (
    <SectionContainer id="projects" className="py-16 border-b border-[#D5D0C7] dark:border-[#34312B]">
      <SectionHeading
        tag="04"
        title="projects"
        subtitle="Full-stack web systems, AI automation pipelines, IoT hardware telemetry, and mobile applications."
      />

      {/* Category Tab Buttons */}
      <div className="flex flex-wrap gap-1.5 mb-8 text-xs font-mono">
        {/* All tab */}
        <button
          onClick={() => {
            playClick();
            setActiveCategory('All');
          }}
          onMouseEnter={playHover}
          className={`px-3 py-1.5 rounded-lg border transition-all uppercase select-none inline-flex items-center gap-1.5 ${
            activeCategory === 'All'
              ? 'bg-[#171717] dark:bg-[#F2EEE6] text-[#F4F1EA] dark:text-[#151411] border-[#171717] dark:border-[#F2EEE6] font-bold shadow-sm'
              : 'bg-[#EFEBE4] dark:bg-[#1D1C18] text-[#171717] dark:text-[#F2EEE6] border-[#D5D0C7] dark:border-[#34312B] hover:border-[#171717] dark:hover:border-[#F2EEE6]'
          }`}
        >
          <LayoutGrid className="w-3 h-3" />
          All
        </button>

        {/* Category tabs */}
        {categoryOrder
          .filter((cat) => categoryCounts[cat])
          .map((cat) => {
            const meta = categoryMeta[cat];
            const Icon = meta.icon;
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onMouseEnter={playHover}
                onClick={() => {
                  playClick();
                  setActiveCategory(cat);
                }}
                className={`px-3 py-1.5 rounded-lg border transition-all uppercase select-none inline-flex items-center gap-1.5 ${
                  isActive
                    ? 'text-[#F4F1EA] font-bold'
                    : 'bg-[#EFEBE4] dark:bg-[#1D1C18] text-[#171717] dark:text-[#F2EEE6] border-[#D5D0C7] dark:border-[#34312B] hover:border-[#171717] dark:hover:border-[#F2EEE6]'
                }`}
                style={
                  isActive
                    ? { backgroundColor: meta.accent, borderColor: meta.accent }
                    : undefined
                }
              >
                <Icon className="w-3 h-3" />
                {meta.tab}
              </button>
            );
          })}
      </div>

      {/* Active category indicator bar */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="h-[2px] w-12 rounded-full transition-colors duration-300"
          style={{ backgroundColor: activeAccent }}
        />
        <span className="text-xs font-mono text-[#6B6862] dark:text-[#A9A39A] uppercase">
          Showing top {displayedProjects.length} of {filteredProjects.length} projects
        </span>
        <div className="h-[1px] flex-1 bg-[#D5D0C7] dark:bg-[#34312B] opacity-50" />
      </div>

      {/* Projects Grid — max 6 projects shown */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {displayedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* View All Link */}
      <div className="flex justify-center mt-10">
        <Link
          to="/projects"
          onMouseEnter={playHover}
          onClick={playClick}
          className="text-xs font-pt-sans font-bold text-[#171717] dark:text-[#F2EEE6] hover:text-[#C7462D] dark:hover:text-[#E25235] flex items-center gap-2 uppercase border border-[#D5D0C7] dark:border-[#34312B] hover:border-[#171717] dark:hover:border-[#F2EEE6] px-6 py-3 rounded-xl bg-[#EFEBE4] dark:bg-[#1D1C18] transition-all shadow-sm tracking-wider"
        >
          <span>View All Projects Directory ({projects.length})</span>
          <ArrowRight className="w-4 h-4 text-[#C7462D] dark:text-[#E25235]" />
        </Link>
      </div>
    </SectionContainer>
  );
};
