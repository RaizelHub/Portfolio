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
    <main className="min-h-screen bg-[var(--background)] pb-[var(--section-space)] pt-8 text-[var(--text-primary)] transition-colors">
      <div className="mx-auto w-full max-w-[var(--content-width)] px-[var(--page-gutter)]">
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link
            to="/#projects"
            onMouseEnter={playHover}
            onClick={playClick}
            className="inline-flex items-center gap-2 border-2 border-black dark:border-white bg-[var(--surface)] px-3.5 py-1.5 text-xs font-mono font-bold text-[var(--text-primary)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] transition-all duration-120 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          >
            <ArrowLeft className="w-4 h-4 text-[var(--text-primary)]" strokeWidth={2.5} />
            <span>Return to Overview</span>
          </Link>
        </div>

        {/* Section Header */}
        <div className="mb-12 max-w-4xl border-b-2 border-black dark:border-white pb-10 pt-6">
          <span className="mb-3 inline-block border-2 border-black dark:border-white bg-[var(--surface)] px-2.5 py-0.5 font-mono text-xs font-black uppercase tracking-[0.16em] text-[var(--text-primary)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
            Project Directory
          </span>
          <h1
            className="section-heading mb-5 font-title text-[var(--text-primary)] font-black"
          >
            All Repositories &amp; Work
          </h1>
          <p className="body-copy text-[var(--text-secondary)] font-medium text-sm sm:text-base">
            The complete collection of full-stack web platforms, mobile applications, automation workflows, and hardware projects.
          </p>
        </div>

        {/* Controls Container: Tabs + Search Bar */}
        <div className="mb-14 flex flex-col items-stretch justify-between gap-5 border-b-2 border-black dark:border-white pb-7 md:flex-row md:items-center">
          {/* Category filter tabs */}
          <div className="flex flex-wrap gap-2 order-2 md:order-1 text-xs font-mono">
            <button
              onMouseEnter={playHover}
              onClick={() => {
                playClick();
                setActiveCategory('All');
              }}
              className={`inline-flex min-h-9 items-center gap-1.5 border-2 border-black dark:border-white px-3.5 py-1.5 font-bold transition-all duration-120 cursor-pointer active:translate-x-0.5 active:translate-y-0.5 active:shadow-none ${activeCategory === 'All'
                ? 'bg-black dark:bg-white text-white dark:text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]'
                : 'bg-[var(--surface)] text-[var(--text-primary)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]'
                }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" strokeWidth={2.5} />
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
                    className={`inline-flex min-h-9 items-center gap-1.5 border-2 border-black dark:border-white px-3.5 py-1.5 font-bold transition-all duration-120 cursor-pointer active:translate-x-0.5 active:translate-y-0.5 active:shadow-none ${isActive
                      ? 'bg-black dark:bg-white text-white dark:text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]'
                      : 'bg-[var(--surface)] text-[var(--text-primary)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]'
                      }`}
                  >
                    <Icon className="w-3.5 h-3.5" strokeWidth={2.5} />
                    <span>{meta.tab} ({categoryCounts[cat]})</span>
                  </button>
                );
              })}
          </div>

          {/* Search bar */}
          <div className="relative order-1 md:order-2 w-full md:max-w-xs shrink-0">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-[var(--text-primary)]" strokeWidth={2.5} />
            <input
              type="text"
              placeholder="Search stack, title, scope..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border-2 border-black dark:border-white bg-[var(--surface)] py-2 pl-9 pr-4 font-mono text-xs font-bold text-[var(--text-primary)] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] transition-colors placeholder:text-[var(--text-muted)] focus:outline-none"
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
                      <div className="mb-2 flex min-w-0 items-center gap-2.5">
                        <div className="p-1.5 border-2 border-black dark:border-white bg-[var(--surface-elevated)] text-[var(--accent)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                          <Icon className="w-4 h-4" strokeWidth={2.5} />
                        </div>
                        <h3 className="flex min-w-0 flex-wrap items-center gap-2 font-title text-lg font-black text-[var(--text-primary)]">
                          {group.meta?.label || group.category}
                          <span className="font-mono text-xs font-bold text-[var(--text-muted)]">
                            ({group.projects.length})
                          </span>
                        </h3>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] font-mono font-medium mb-6">
                        {group.meta?.description}
                      </p>

                      <div className="grid grid-cols-1 gap-7 lg:grid-cols-2">
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
                className="grid grid-cols-1 gap-7 lg:grid-cols-2"
              >
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </motion.div>
            )}
          </>
        ) : (
          <div className="text-center py-16 bg-[var(--surface)] border-2 border-black dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] p-6 max-w-md mx-auto font-mono">
            <FolderOpen className="w-10 h-10 text-[var(--text-muted)] mx-auto mb-3" />
            <h3 className="font-black text-[var(--text-primary)] text-sm uppercase">
              No repositories matched
            </h3>
            <p className="text-xs text-[var(--text-secondary)] mt-1 font-bold">
              Adjust search query or select another category filter.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};
