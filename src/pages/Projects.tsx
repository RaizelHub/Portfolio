import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  Search,
  FolderOpen,
  ArrowLeft,
  Globe,
  Cpu,
  Wifi,
  Smartphone,
  Monitor,
  Cloud,
  LayoutGrid,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProjectCard } from '../components/ui/ProjectCard';
import { projects } from '../data/projects';
import { useSound } from '../context/SoundContext';

const categoryMeta: Record<
  string,
  { label: string; tab: string; icon: React.ElementType; description: string }
> = {
  Web: {
    label: 'Web Platforms',
    tab: 'Web',
    icon: Globe,
    description: 'Full-stack web applications with real-time systems, enterprise dashboards, and cloud databases.',
  },
  AI: {
    label: 'AI & Automation',
    tab: 'Automation',
    icon: Cpu,
    description: 'Workflow automation pipelines, webhook processors, and AI-powered evaluation systems.',
  },
  Mobile: {
    label: 'Mobile Applications',
    tab: 'Mobile',
    icon: Smartphone,
    description: 'Cross-platform native applications with hardware integrations, authentication, and in-app subscriptions.',
  },
  IoT: {
    label: 'IoT & Hardware',
    tab: 'IoT',
    icon: Wifi,
    description: 'Embedded sensor networks, microcontroller firmware, and real-time telemetry pipelines.',
  },
  Desktop: {
    label: 'Desktop Applications',
    tab: 'Desktop',
    icon: Monitor,
    description: 'Windows desktop utilities with local hardware integration, database management, and reporting.',
  },
  SaaS: {
    label: 'SaaS Systems',
    tab: 'SaaS',
    icon: Cloud,
    description: 'Multi-tenant systems with database isolation, custom routing, and role-based permissions.',
  },
};

const categoryOrder = ['Web', 'Mobile', 'AI', 'IoT', 'Desktop', 'SaaS'];

export const Projects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const { playHover, playClick } = useSound();
  const prefersReducedMotion = useReducedMotion();

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((tech) =>
        tech.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      activeCategory === 'All' ||
      project.category.toLowerCase() === activeCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const groupedProjects =
    activeCategory === 'All'
      ? categoryOrder
        .map((cat) => ({
          category: cat,
          meta: categoryMeta[cat],
          projects: filteredProjects.filter((p) => p.category === cat),
        }))
        .filter((group) => group.projects && group.projects.length > 0)
      : null;

  const categoryCounts: Record<string, number> = {};
  projects.forEach((p) => {
    categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
  });

  return (
    <main className="min-h-screen pt-8 pb-20 bg-[#F7F8FA] dark:bg-[#0B0D10] text-[#111318] dark:text-[#F4F6F8] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link
            to="/#projects"
            onMouseEnter={playHover}
            onClick={playClick}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#5F6873] hover:text-[#2563EB] dark:text-[#A7B0BA] dark:hover:text-[#60A5FA] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#2563EB] dark:text-[#60A5FA]" />
            <span>Return to Overview</span>
          </Link>
        </div>

        {/* Section Header */}
        <div className="mb-10 max-w-3xl">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#2563EB] dark:text-[#60A5FA] block mb-3">
            Project Directory
          </span>
          <h1
            className="font-title text-3xl sm:text-4xl font-bold tracking-tight text-[#111318] dark:text-[#F4F6F8] mb-3"
          >
            All Repositories &amp; Work
          </h1>
          <p className="text-sm sm:text-base text-[#5F6873] dark:text-[#A7B0BA] font-sans leading-relaxed">
            The complete collection of full-stack web platforms, mobile applications, automation workflows, and hardware projects.
          </p>
        </div>

        {/* Controls Container: Tabs + Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-[#DCE1E7] dark:border-[#242B33] pb-6 mb-10">
          {/* Category filter tabs */}
          <div className="flex flex-wrap gap-1.5 order-2 md:order-1 text-xs font-mono">
            <button
              onMouseEnter={playHover}
              onClick={() => {
                playClick();
                setActiveCategory('All');
              }}
              className={`px-3 py-1.5 rounded-lg border transition-colors inline-flex items-center gap-1.5 ${activeCategory === 'All'
                ? 'bg-[#111318] dark:bg-[#F4F6F8] text-white dark:text-[#0B0D10] border-[#111318] dark:border-[#F4F6F8] font-bold shadow-xs'
                : 'bg-[#FFFFFF] dark:bg-[#11151A] text-[#5F6873] dark:text-[#A7B0BA] border-[#DCE1E7] dark:border-[#242B33] hover:border-[#2563EB] dark:hover:border-[#60A5FA]'
                }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>All ({projects.length})</span>
            </button>

            {categoryOrder
              .filter((cat) => categoryCounts[cat])
              .map((cat) => {
                const meta = categoryMeta[cat];
                if (!meta) return null;
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
                    className={`px-3 py-1.5 rounded-lg border transition-colors inline-flex items-center gap-1.5 ${isActive
                      ? 'bg-[#2563EB] dark:bg-[#2563EB] text-white border-[#2563EB] font-bold shadow-xs'
                      : 'bg-[#FFFFFF] dark:bg-[#11151A] text-[#5F6873] dark:text-[#A7B0BA] border-[#DCE1E7] dark:border-[#242B33] hover:border-[#2563EB] dark:hover:border-[#60A5FA]'
                      }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{meta.tab} ({categoryCounts[cat]})</span>
                  </button>
                );
              })}
          </div>

          {/* Search bar */}
          <div className="relative order-1 md:order-2 w-full md:max-w-xs shrink-0">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#78828D] dark:text-[#7F8994]" />
            <input
              type="text"
              placeholder="Search stack, title, scope..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FFFFFF] dark:bg-[#11151A] border border-[#DCE1E7] dark:border-[#242B33] focus:border-[#2563EB] dark:focus:border-[#60A5FA] text-[#111318] dark:text-[#F4F6F8] rounded-lg pl-9 pr-4 py-2 text-xs font-mono focus:outline-none transition-colors placeholder:text-[#78828D] dark:placeholder:text-[#7F8994]"
            />
          </div>
        </div>

        {/* Grid display */}
        {filteredProjects.length > 0 ? (
          <>
            {/* Grouped view when "All" is active */}
            {groupedProjects ? (
              <div className="space-y-14">
                {groupedProjects.map((group, groupIndex) => {
                  const Icon = group.meta?.icon || FolderOpen;
                  return (
                    <motion.section
                      key={group.category}
                      initial={prefersReducedMotion ? {} : { opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: groupIndex * 0.05 }}
                    >
                      {/* Category Header */}
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className="p-1.5 rounded-md bg-[#F1F3F5] dark:bg-[#171C22] text-[#2563EB] dark:text-[#60A5FA]">
                          <Icon className="w-4 h-4" />
                        </div>
                        <h3 className="text-base font-bold text-[#111318] dark:text-[#F4F6F8] font-sans flex items-center gap-2">
                          {group.meta?.label || group.category}
                          <span className="text-[11px] font-mono text-[#5F6873] dark:text-[#A7B0BA] font-normal">
                            ({group.projects.length})
                          </span>
                        </h3>
                      </div>
                      <p className="text-xs text-[#5F6873] dark:text-[#A7B0BA] font-sans mb-6">
                        {group.meta?.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {group.projects.map((project) => (
                          <ProjectCard key={project.id} project={project} />
                        ))}
                      </div>
                    </motion.section>
                  );
                })}
              </div>
            ) : (
              /* Flat grid when single category is selected */
              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </motion.div>
            )}
          </>
        ) : (
          <div className="text-center py-16 bg-[#FFFFFF] dark:bg-[#11151A] border border-[#DCE1E7] dark:border-[#242B33] rounded-xl p-6 max-w-md mx-auto font-mono">
            <FolderOpen className="w-10 h-10 text-[#78828D] dark:text-[#7F8994] mx-auto mb-3" />
            <h3 className="font-bold text-[#111318] dark:text-[#F4F6F8] text-sm uppercase">
              No repositories matched
            </h3>
            <p className="text-xs text-[#5F6873] dark:text-[#A7B0BA] mt-1">
              Adjust search query or select another category filter.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};
