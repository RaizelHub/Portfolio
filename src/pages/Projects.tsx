import { useState, useMemo } from 'react';
import {
  Search,
  FolderOpen,
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Globe,
  Cpu,
  Wifi,
  Smartphone,
  Monitor,
  Cloud,
  LayoutGrid,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ProjectLikeButton } from '../components/ui/ProjectLikeButton';
import { projects } from '../data/projects';
import { useSound } from '../context/SoundContext';

interface FlagshipData {
  id: string;
  slug: string;
  shortTitle: string;
  badge: string;
  description: string;
  image: string;
  simulatedUrl: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

const FLAGSHIP_PROJECTS: FlagshipData[] = [
  {
    id: 'studio-ecommerce',
    slug: 'studio-ecommerce',
    shortTitle: 'Studio E-Commerce — React & Django REST',
    badge: 'Enterprise Retail Platform & Merchant Suite',
    description:
      'High-performance production storefront with dynamic product variant matrices, optimistic cart drawer via Zustand, and transactional Django REST Framework backend.',
    image: 'img/studio/01_home_hero.png',
    simulatedUrl: 'studio-ecommerce.vercel.app',
    technologies: ['React 18', 'TypeScript', 'Django 5', 'PostgreSQL', 'Docker', 'Tailwind CSS'],
    liveUrl: 'https://studio-ecommerce.vercel.app',
    githubUrl: 'https://github.com/JanmarkSuelto',
  },
  {
    id: 'vocara',
    slug: 'vocara',
    shortTitle: 'Vocara — AI Voice Coach & Speech Prep',
    badge: 'Mobile Voice AI Platform • React Native & Groq',
    description:
      'Real-time conversational voice interview platform delivering sub-200ms audio evaluation and AI spoken feedback powered by Groq LPU and Whisper inference.',
    image: 'img/vocara/01_hero.png',
    simulatedUrl: 'vocara.app',
    technologies: ['React Native', 'Expo', 'Groq AI', 'Whisper', 'Python', 'FastAPI'],
    liveUrl: 'https://vocara-ai-web.vercel.app',
    githubUrl: 'https://github.com/JanmarkSuelto',
  },
  {
    id: 'collabcanvas',
    slug: 'collabcanvas',
    shortTitle: 'CollabCanvas — Real-Time Multiplayer Canvas',
    badge: 'Distributed WebSocket Canvas System',
    description:
      'Infinite multiplayer virtual whiteboard with room state synchronization, low-latency cursor tracking, and persistent vector object manipulation.',
    image: 'img/collabcanvas/01_hero.png',
    simulatedUrl: 'collabcanvas.vercel.app',
    technologies: ['React 19', 'TypeScript', 'WebSockets', 'HTML5 Canvas', 'Node.js'],
    liveUrl: 'https://collab-canvas-web-beta.vercel.app',
    githubUrl: 'https://github.com/JanmarkSuelto',
  },
  {
    id: 'jobradar-ai',
    slug: 'jobradar-ai',
    shortTitle: 'JobRadar AI — Autonomous Multi-Portal Scout',
    badge: 'Autonomous AI Scraper & Pipeline',
    description:
      'Autonomous recruitment crawler orchestrating n8n multi-step webhooks, Gemini AI resume suitability parsing, and automated daily email reports.',
    image: 'img/jobradar/01_hero.png',
    simulatedUrl: 'jobradar.ai',
    technologies: ['Python', 'n8n', 'Google Gemini', 'Supabase', 'PostgreSQL'],
    liveUrl: '#',
    githubUrl: 'https://github.com/JanmarkSuelto',
  },
];

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
  Mobile: {
    label: 'Mobile Applications',
    tab: 'Mobile',
    icon: Smartphone,
    description: 'Cross-platform native applications with hardware integrations, authentication, and in-app subscriptions.',
  },
  AI: {
    label: 'AI & Automation',
    tab: 'Automation',
    icon: Cpu,
    description: 'Workflow automation pipelines, webhook processors, and AI-powered evaluation systems.',
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

export const getProjectShortName = (title: string): string => {
  if (!title) return '';
  return title.split(/\s+[—–-]\s+/)[0].trim();
};

export const Projects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [onlyFeatured, setOnlyFeatured] = useState(true);
  const [flagshipIndex, setFlagshipIndex] = useState(0);

  const { playHover, playClick } = useSound();

  const activeFlagship = FLAGSHIP_PROJECTS[flagshipIndex] || FLAGSHIP_PROJECTS[0];

  const handleNextFlagship = () => {
    playClick();
    setFlagshipIndex((prev) => (prev + 1) % FLAGSHIP_PROJECTS.length);
  };

  const handlePrevFlagship = () => {
    playClick();
    setFlagshipIndex((prev) => (prev - 1 + FLAGSHIP_PROJECTS.length) % FLAGSHIP_PROJECTS.length);
  };

  // Base list of projects (filter by featured toggle)
  const baseProjects = useMemo(() => {
    return onlyFeatured ? projects.filter((p) => p.featured) : projects;
  }, [onlyFeatured]);

  // Filtered projects based on search and category
  const filteredProjects = useMemo(() => {
    return baseProjects.filter((project) => {
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
  }, [baseProjects, searchQuery, activeCategory]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    baseProjects.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, [baseProjects]);

  return (
    <div className="min-h-screen pb-16 pt-0 select-none font-sans text-[var(--text-primary)]">
      {/* ── TOP ACTION BAR: Return Breadcrumb ── */}
      <div className="mb-3 flex items-center justify-between gap-3">
        <Link
          to="/"
          onMouseEnter={playHover}
          onClick={playClick}
          className="btn-pill-white inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold tracking-wide cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-neutral-800 dark:text-neutral-200" strokeWidth={2.5} />
          <span>Return to Bento Dashboard</span>
        </Link>
      </div>

      {/* ── TOP FLAGSHIP SPOTLIGHT (BENTO STUDIO HERO) ── */}
      <div className="mb-6 rounded-2xl sm:rounded-3xl border border-neutral-200/90 dark:border-white/[0.08] bg-white dark:bg-[#12151c] shadow-[0_4px_24px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-4 sm:p-5 lg:p-6.5 overflow-hidden transition-colors duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-7 items-center">
            {/* Left: Minimalist Browser Frame Mockup */}
            <div className="lg:col-span-7">
              <div className="rounded-xl sm:rounded-2xl border border-neutral-200/90 dark:border-white/[0.1] bg-neutral-100/80 dark:bg-black/40 overflow-hidden shadow-sm">
                {/* Browser Top Bar */}
                <div className="px-3 py-2 bg-neutral-200/60 dark:bg-white/[0.04] border-b border-neutral-200/80 dark:border-white/[0.08] flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-white/20" />
                    <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-white/20" />
                    <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 dark:bg-white/20" />
                  </div>
                  {/* Simulated URL Bar */}
                  <div className="flex-1 max-w-xs mx-auto px-3 py-0.5 rounded-md bg-white/80 dark:bg-black/40 border border-neutral-200/60 dark:border-white/[0.06] text-[10px] sm:text-[11px] font-mono text-neutral-600 dark:text-neutral-400 truncate text-center flex items-center justify-center gap-1.5">
                    <Globe className="w-3 h-3 shrink-0 text-neutral-400" />
                    <span className="truncate">{activeFlagship.simulatedUrl}</span>
                  </div>
                  <div className="w-10 text-right">
                    <span className="font-mono text-[9px] font-bold text-neutral-400 dark:text-neutral-500">
                      HTTPS
                    </span>
                  </div>
                </div>

                {/* Screenshot Viewport */}
                <div className="relative aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-neutral-50 dark:bg-neutral-900 group">
                  <img
                    src={`/${activeFlagship.image}`}
                    alt={activeFlagship.shortTitle}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-103"
                  />
                </div>
              </div>
            </div>

            {/* Right: Flagship Details & Action Hub */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-3.5">
              <div>
                {/* Flagship Navigation Controls */}
                <div className="flex items-center justify-end gap-1 mb-2">
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={handlePrevFlagship}
                      title="Previous flagship"
                      className="w-7 h-7 rounded-lg bg-neutral-100 hover:bg-neutral-200/80 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] text-neutral-700 dark:text-neutral-300 border border-neutral-200/80 dark:border-white/[0.08] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextFlagship}
                      title="Next flagship"
                      className="w-7 h-7 rounded-lg bg-neutral-100 hover:bg-neutral-200/80 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] text-neutral-700 dark:text-neutral-300 border border-neutral-200/80 dark:border-white/[0.08] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Title & Badge */}
                <h2 className="font-title text-lg sm:text-xl lg:text-2xl font-black text-neutral-900 dark:text-white tracking-tight leading-snug">
                  {activeFlagship.shortTitle}
                </h2>
                <p className="font-mono text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 mb-2">
                  {activeFlagship.badge}
                </p>

                {/* Description */}
                <p className="text-xs sm:text-[13px] text-neutral-600 dark:text-neutral-300 leading-relaxed font-normal line-clamp-3">
                  {activeFlagship.description}
                </p>
              </div>

              {/* Tech Stack Chips */}
              <div className="flex flex-wrap gap-1.5">
                {activeFlagship.technologies.slice(0, 5).map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[10px] font-semibold px-2 py-0.5 rounded-full bg-neutral-100/90 dark:bg-white/[0.06] text-neutral-700 dark:text-neutral-300 border border-neutral-200/70 dark:border-white/[0.06]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {activeFlagship.liveUrl && activeFlagship.liveUrl !== '#' && (
                  <a
                    href={activeFlagship.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClick}
                    className="btn-pill-black px-4 py-2 text-xs font-semibold inline-flex items-center gap-1.5 shadow-xs"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {activeFlagship.githubUrl && (
                  <a
                    href={activeFlagship.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClick}
                    className="btn-pill-white px-3.5 py-2 text-xs font-semibold inline-flex items-center gap-1.5 shadow-2xs"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Source Code</span>
                  </a>
                )}
                <Link
                  to={`/projects/${activeFlagship.slug}`}
                  onClick={playClick}
                  className="px-3.5 py-2 rounded-full text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/[0.06] transition-colors inline-flex items-center gap-1"
                >
                  <span>Case Study</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>

      {/* ── FILTER TABS & SEARCH BAR ── */}
      <div className="mb-5 flex flex-col items-stretch justify-between gap-3 border-b border-neutral-200/80 dark:border-white/[0.08] pb-4 md:flex-row md:items-center">
        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-1.5 font-title text-xs">
          <button
            onMouseEnter={playHover}
            onClick={() => {
              playClick();
              setActiveCategory('All');
            }}
            className={`inline-flex min-h-7.5 items-center gap-1.5 rounded-full border px-3 py-1 font-semibold transition-all duration-120 cursor-pointer text-xs ${
              activeCategory === 'All'
                ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 border-neutral-900 dark:border-white shadow-xs'
                : 'bg-white dark:bg-[#12151c] text-neutral-700 dark:text-neutral-300 border-neutral-200/90 dark:border-white/[0.08] hover:border-neutral-400 dark:hover:border-neutral-600'
            }`}
          >
            <LayoutGrid className="w-3 h-3" strokeWidth={2.5} />
            <span>All ({baseProjects.length})</span>
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
                  className={`inline-flex min-h-7.5 items-center gap-1.5 rounded-full border px-3 py-1 font-semibold transition-all duration-120 cursor-pointer text-xs ${
                    isActive
                      ? 'bg-neutral-900 dark:bg-white text-white dark:text-neutral-950 border-neutral-900 dark:border-white shadow-xs'
                      : 'bg-white dark:bg-[#12151c] text-neutral-700 dark:text-neutral-300 border-neutral-200/90 dark:border-white/[0.08] hover:border-neutral-400 dark:hover:border-neutral-600'
                  }`}
                >
                  <Icon className="w-3 h-3" strokeWidth={2.5} />
                  <span>
                    {meta.tab} ({categoryCounts[cat]})
                  </span>
                </button>
              );
            })}
        </div>

        {/* Search Bar & Project Count */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-68">
            <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-neutral-400" strokeWidth={2.5} />
            <input
              type="text"
              placeholder="Search stack, title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-neutral-200/90 dark:border-white/[0.08] bg-white dark:bg-[#12151c] py-1.5 pl-9 pr-3 font-mono text-xs font-semibold text-neutral-900 dark:text-neutral-100 shadow-2xs transition-colors placeholder:text-neutral-400 focus:border-black dark:focus:border-white focus:outline-none"
            />
          </div>

          <button
            type="button"
            onClick={() => {
              playClick();
              setOnlyFeatured(!onlyFeatured);
            }}
            className="text-[11px] font-title font-semibold text-neutral-500 hover:text-black dark:hover:text-white underline underline-offset-2 transition-colors cursor-pointer shrink-0"
          >
            {onlyFeatured ? 'Show all 17' : 'Featured only'}
          </button>
        </div>
      </div>

      {/* ── MAIN CONTENT AREA: 3-COLUMN BENTO SHOWCASE GRID ── */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-5">
              {filteredProjects.map((project) => {
                const displayTitle = getProjectShortName(project.title);
                const thumb = project.image || (project.images && project.images[0]) || '';

                return (
                  <div
                    key={project.id}
                    onMouseEnter={playHover}
                    className="group relative flex flex-col justify-between rounded-2xl border border-neutral-200/90 dark:border-white/[0.08] bg-white dark:bg-[#12151c] shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-1 overflow-hidden"
                  >
                    {/* Top Preview Image Container */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100 dark:bg-neutral-900/90 border-b border-neutral-200/80 dark:border-white/[0.07]">
                      {/* Minimal Browser Header Bar */}
                      <div className="absolute top-0 inset-x-0 h-6 px-2.5 bg-neutral-900/40 dark:bg-black/60 backdrop-blur-xs flex items-center justify-between z-10">
                        <div className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                          <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                          <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                        </div>
                        <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-white/90 bg-black/50 px-1.5 py-0.5 rounded">
                          {project.category}
                        </span>
                      </div>

                      {thumb ? (
                        <img
                          src={`/${thumb}`}
                          alt={displayTitle}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-104 pt-6"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center p-4 pt-8 select-none font-mono">
                          <span className="text-2xl mb-1">{project.emoji || '📦'}</span>
                          <span className="text-[10px] text-neutral-500 dark:text-neutral-400 font-semibold uppercase">
                            {project.category}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Card Body */}
                    <div className="p-4 sm:p-4.5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        {/* Status Row + Like Button */}
                        <div className="flex items-center justify-between gap-2 mb-1.5 text-[10px] font-mono text-neutral-500 dark:text-neutral-400">
                          <span className="truncate">{project.status || 'Live System'}</span>
                          <ProjectLikeButton slug={project.slug} projectName={displayTitle} variant="badge" />
                        </div>

                        {/* Title */}
                        <Link
                          to={`/projects/${project.slug}`}
                          onClick={playClick}
                          className="font-title text-sm sm:text-base font-bold text-neutral-900 dark:text-white group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors block leading-snug"
                        >
                          {displayTitle}
                        </Link>

                        {/* Description */}
                        <p className="text-xs text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed mt-1.5 line-clamp-2">
                          {project.description}
                        </p>
                      </div>

                      {/* Tech Stack Chips & Action Footer */}
                      <div className="space-y-3 pt-2">
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="font-mono text-[9px] font-semibold px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-white/[0.05] text-neutral-700 dark:text-neutral-300 border border-neutral-200/70 dark:border-white/[0.06]"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 4 && (
                            <span className="font-mono text-[9px] px-1.5 py-0.5 rounded text-neutral-400">
                              +{project.technologies.length - 4}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-2.5 border-t border-neutral-100 dark:border-white/[0.06] text-xs">
                          <Link
                            to={`/projects/${project.slug}`}
                            onClick={playClick}
                            className="font-semibold text-neutral-900 dark:text-white hover:underline inline-flex items-center gap-1 group/btn"
                          >
                            <span>Explore Case Study</span>
                            <ArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-0.5" />
                          </Link>

                          <div className="flex items-center gap-1.5">
                            {project.liveUrl && project.liveUrl !== '#' && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={playClick}
                                title="Live Demo"
                                className="p-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] text-neutral-700 dark:text-neutral-300 transition-colors"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                            {project.githubUrl && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={playClick}
                                title="Source Code"
                                className="p-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] text-neutral-700 dark:text-neutral-300 transition-colors"
                              >
                                <Github className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
      ) : (
        <div className="text-center py-16 bg-white dark:bg-[#12151c] border border-neutral-200/90 dark:border-white/[0.08] rounded-2xl p-6 max-w-md mx-auto font-sans">
          <FolderOpen className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
          <h3 className="font-title font-bold text-neutral-900 dark:text-white text-sm">
            No projects matched
          </h3>
          <p className="text-xs text-neutral-500 mt-1">
            Try adjusting your search keywords or switching category filters.
          </p>
        </div>
      )}
    </div>
  );
};

export default Projects;
