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

  // Get active accent color for the underline indicator
  const activeAccent =
    activeCategory === 'All'
      ? '#C7462D'
      : categoryMeta[activeCategory]?.accent || '#C7462D';

  return (
    <SectionContainer id="projects" className="py-16 border-b border-[#D5D0C7]">
      <SectionHeading
        tag="03 // CASE STUDIES & ARCHITECTURE"
        title="Featured Projects"
        subtitle="Full-stack web systems, AI automation pipelines, IoT hardware telemetry, and mobile applications."
      />

      {/* Category Tab Buttons */}
      <div className="flex flex-wrap gap-1.5 mb-8 text-xs font-mono">
        {/* All tab */}
        <button
          onClick={() => setActiveCategory('All')}
          className={`px-3 py-1.5 rounded-[2px] border transition-all uppercase select-none inline-flex items-center gap-1.5 ${activeCategory === 'All'
              ? 'bg-[#171717] text-[#F4F1EA] border-[#171717] font-bold'
              : 'bg-[#EFEBE4] text-[#171717] border-[#D5D0C7] hover:border-[#171717]'
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
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-[2px] border transition-all uppercase select-none inline-flex items-center gap-1.5 ${isActive
                    ? 'text-[#F4F1EA] font-bold'
                    : 'bg-[#EFEBE4] text-[#171717] border-[#D5D0C7] hover:border-[#171717]'
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
        <span className="text-xs font-mono text-[#6B6862] uppercase">
          {activeCategory === 'All'
            ? `Showing all ${filteredProjects.length} projects`
            : `${categoryMeta[activeCategory]?.label} — ${filteredProjects.length} ${filteredProjects.length === 1 ? 'project' : 'projects'}`}
        </span>
        <div className="h-[1px] flex-1 bg-[#D5D0C7] opacity-50" />
      </div>

      {/* Projects Grid — animated on tab change */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* View All Link */}
      <div className="flex justify-center mt-10">
        <Link
          to="/projects"
          className="text-xs font-mono font-semibold text-[#171717] hover:text-[#C7462D] flex items-center gap-1 uppercase border border-[#D5D0C7] px-4 py-2 rounded-[2px] bg-[#EFEBE4] transition-colors"
        >
          All Projects Directory ({projects.length})
          <ArrowRight className="w-3.5 h-3.5 text-[#C7462D]" />
        </Link>
      </div>
    </SectionContainer>
  );
};
