import { useState } from 'react';
import { Search, FolderOpen, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionHeading } from '../components/ui/SectionHeading';
import { ProjectCard } from '../components/ui/ProjectCard';
import { projects } from '../data/projects';

export const Projects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Web', 'SaaS', 'IoT', 'Mobile', 'AI', 'Desktop'];

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      activeCategory === 'All' ||
      project.category.toLowerCase() === activeCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen pt-28 pb-20 bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-400 hover:text-emerald-400 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
        </div>

        {/* Section Heading */}
        <SectionHeading
          tag="Projects Directory"
          title="All Systems &amp; Software Work"
          subtitle="Explore the complete collection of full stack platforms, database designs, networks, and hardware systems."
        />

        {/* Controls Container */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-navy-800 pb-6 mb-8">
          {/* Category badges */}
          <div className="flex flex-wrap gap-1.5 order-2 md:order-1 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-md font-mono transition-all duration-200 select-none ${activeCategory === cat
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold'
                    : 'text-slate-400 hover:text-white border border-transparent'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative order-1 md:order-2 w-full md:max-w-xs shrink-0">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search tech, title, scope..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-navy-950 border border-navy-800 focus:border-emerald-500 text-white rounded pl-9 pr-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-slate-600"
            />
          </div>
        </div>

        {/* Grid display */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-navy-800/10 border border-navy-800 rounded-lg p-6 max-w-md mx-auto">
            <FolderOpen className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="font-bold text-white text-base">No projects matched</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Try adjusting your query words or resetting the category filter badges.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};
