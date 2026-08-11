import { useState } from 'react';
import { motion } from 'framer-motion';
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
import { SectionHeading } from '../components/ui/SectionHeading';
import { ProjectCard } from '../components/ui/ProjectCard';
import { projects } from '../data/projects';

/**
 * Category metadata used for tab buttons and section headers.
 */
const categoryMeta: Record<
  string,
  { label: string; tab: string; icon: React.ElementType; accent: string; description: string }
> = {
  Web: {
    label: 'Web Platforms',
    tab: 'Web',
    icon: Globe,
    accent: '#C7462D',
    description: 'Full-stack web applications with real-time systems, enterprise dashboards, and cloud architecture.',
  },
  AI: {
    label: 'AI & Automation',
    tab: 'AI',
    icon: Cpu,
    accent: '#8B5CF6',
    description: 'Intelligent workflow pipelines, AI-powered scoring engines, and automated business processes.',
  },
  IoT: {
    label: 'IoT & Hardware',
    tab: 'IoT',
    icon: Wifi,
    accent: '#059669',
    description: 'Embedded sensor networks, microcontroller firmware, and real-time telemetry dashboards.',
  },
  Mobile: {
    label: 'Mobile Applications',
    tab: 'Mobile',
    icon: Smartphone,
    accent: '#2563EB',
    description: 'Native Android applications with maps, real-time data, and location-based services.',
  },
  Desktop: {
    label: 'Desktop Applications',
    tab: 'Desktop',
    icon: Monitor,
    accent: '#D97706',
    description: 'Windows desktop systems with hardware integration, database management, and reporting tools.',
  },
  SaaS: {
    label: 'SaaS & Multi-Tenant',
    tab: 'SaaS',
    icon: Cloud,
    accent: '#0891B2',
    description: 'Multi-tenant platforms with database isolation, subdomain routing, and role-based access.',
  },
};

const categoryOrder = ['Web', 'AI', 'IoT', 'Mobile', 'Desktop', 'SaaS'];

export const Projects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

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

  // When "All" is selected, group filtered results by category
  const groupedProjects =
    activeCategory === 'All'
      ? categoryOrder
          .map((cat) => ({
            category: cat,
            meta: categoryMeta[cat],
            projects: filteredProjects.filter((p) => p.category === cat),
          }))
          .filter((group) => group.projects.length > 0)
      : null;

  // Count how many projects exist in each category (regardless of search)
  const categoryCounts: Record<string, number> = {};
  projects.forEach((p) => {
    categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
  });

  return (
    <main className="min-h-screen pt-12 pb-20 bg-[#F4F1EA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono font-semibold text-[#171717] hover:text-[#C7462D] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#C7462D]" /> RETURN TO
            DASHBOARD
          </Link>
        </div>

        {/* Section Heading */}
        <SectionHeading
          tag="00 // PROJECT DIRECTORY"
          title="All Repositories"
          subtitle="Explore the complete collection of full stack platforms, AI automations, mobile apps, desktop systems, and hardware projects."
        />

        {/* Controls Container */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-[#D5D0C7] pb-6 mb-8">
          {/* Category filter tabs */}
          <div className="flex flex-wrap gap-1.5 order-2 md:order-1 text-xs font-mono">
            {/* All tab */}
            <button
              onClick={() => setActiveCategory('All')}
              className={`px-3 py-1.5 rounded-[2px] border transition-all uppercase select-none inline-flex items-center gap-1.5 ${
                activeCategory === 'All'
                  ? 'bg-[#171717] text-[#F4F1EA] border-[#171717] font-bold'
                  : 'bg-[#EFEBE4] text-[#171717] border-[#D5D0C7] hover:border-[#171717]'
              }`}
            >
              <LayoutGrid className="w-3 h-3" />
              All
            </button>

            {/* Category tabs with icons */}
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
                    className={`px-3 py-1.5 rounded-[2px] border transition-all uppercase select-none inline-flex items-center gap-1.5 ${
                      isActive
                        ? 'text-[#F4F1EA] font-bold'
                        : 'bg-[#EFEBE4] text-[#171717] border-[#D5D0C7] hover:border-[#171717]'
                    }`}
                    style={
                      isActive
                        ? {
                            backgroundColor: meta.accent,
                            borderColor: meta.accent,
                          }
                        : undefined
                    }
                  >
                    <Icon className="w-3 h-3" />
                    {meta.tab}
                  </button>
                );
              })}
          </div>

          {/* Search bar */}
          <div className="relative order-1 md:order-2 w-full md:max-w-xs shrink-0">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#6B6862]" />
            <input
              type="text"
              placeholder="Search stack, title, scope..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#EFEBE4] border border-[#D5D0C7] focus:border-[#C7462D] text-[#171717] rounded-[2px] pl-9 pr-4 py-2 text-xs font-mono focus:outline-none transition-all placeholder:text-[#6B6862]"
            />
          </div>
        </div>

        {/* Grid display */}
        {filteredProjects.length > 0 ? (
          <>
            {/* Grouped view when "All" is selected */}
            {groupedProjects ? (
              <div className="space-y-12">
                {groupedProjects.map((group, groupIndex) => {
                  const Icon = group.meta.icon;
                  return (
                    <motion.section
                      key={group.category}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.35,
                        delay: groupIndex * 0.06,
                      }}
                    >
                      {/* Category Section Header */}
                      <div className="flex items-center gap-3 mb-1">
                        <div
                          className="w-8 h-8 rounded-[3px] flex items-center justify-center shrink-0"
                          style={{
                            backgroundColor: group.meta.accent + '18',
                          }}
                        >
                          <Icon
                            className="w-4 h-4"
                            style={{ color: group.meta.accent }}
                          />
                        </div>
                        <h3 className="text-sm font-bold text-[#171717] font-mono uppercase tracking-wide flex items-center gap-2">
                          {group.meta.label}
                          <span
                            className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-[1px] uppercase"
                            style={{
                              backgroundColor: group.meta.accent + '15',
                              color: group.meta.accent,
                            }}
                          >
                            {group.projects.length}{' '}
                            {group.projects.length === 1
                              ? 'project'
                              : 'projects'}
                          </span>
                        </h3>
                      </div>
                      <p className="text-xs text-[#6B6862] font-mono ml-11 mb-4">
                        {group.meta.description}
                      </p>
                      <div className="flex items-center gap-3 mb-6 ml-11">
                        <div
                          className="h-[2px] flex-1 rounded-full opacity-25"
                          style={{ backgroundColor: group.meta.accent }}
                        />
                      </div>

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
              /* Single-category flat grid */
              <motion.div
                initial={{ opacity: 0, y: 10 }}
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
          <div className="text-center py-16 bg-[#EFEBE4] border border-[#D5D0C7] rounded-[2px] p-6 max-w-md mx-auto font-mono">
            <FolderOpen className="w-12 h-12 text-[#6B6862] mx-auto mb-3" />
            <h3 className="font-bold text-[#171717] text-base">
              NO REPOSITORIES MATCHED
            </h3>
            <p className="text-xs text-[#6B6862] mt-1">
              Adjust search query or select another category filter.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};
