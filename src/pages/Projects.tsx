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
    <main className="min-h-screen pt-12 pb-20 bg-[#F4F1EA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono font-semibold text-[#171717] hover:text-[#C7462D] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#C7462D]" /> RETURN TO DASHBOARD
          </Link>
        </div>

        {/* Section Heading */}
        <SectionHeading
          tag="00 // PROJECT DIRECTORY"
          title="All Repositories"
          subtitle="Explore the complete collection of full stack platforms, database designs, networks, and hardware systems."
        />

        {/* Controls Container */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-[#D5D0C7] pb-6 mb-8">
          {/* Category badges */}
          <div className="flex flex-wrap gap-1.5 order-2 md:order-1 text-xs font-mono">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-[2px] border transition-all uppercase select-none ${
                  activeCategory === cat
                    ? 'bg-[#171717] text-[#F4F1EA] border-[#171717] font-bold'
                    : 'bg-[#EFEBE4] text-[#171717] border-[#D5D0C7] hover:border-[#171717]'
                }`}
              >
                {cat}
              </button>
            ))}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#EFEBE4] border border-[#D5D0C7] rounded-[2px] p-6 max-w-md mx-auto font-mono">
            <FolderOpen className="w-12 h-12 text-[#6B6862] mx-auto mb-3" />
            <h3 className="font-bold text-[#171717] text-base">NO REPOSITORIES MATCHED</h3>
            <p className="text-xs text-[#6B6862] mt-1">
              Adjust search query or select another category filter.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};
