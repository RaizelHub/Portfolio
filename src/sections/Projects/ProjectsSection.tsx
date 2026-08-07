import { Link } from 'react-router-dom';
import { ArrowRight, Layers } from 'lucide-react';
import { SectionContainer } from '../../components/layout/SectionContainer';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { ProjectCard } from '../../components/ui/ProjectCard';
import { projects } from '../../data/projects';

export const ProjectsSection = () => {
  const featuredProjects = projects.filter((p) => p.featured);
  const additionalProjects = projects.filter((p) => !p.featured);

  return (
    <SectionContainer id="projects" className="py-16 border-b border-[#D5D0C7]">
      <SectionHeading
        tag="03 // CASE STUDIES & ARCHITECTURE"
        title="Featured Projects"
        subtitle="Full-stack web systems, IoT hardware telemetry, and automated workflow pipelines."
      />

      {/* Featured Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Additional Work Sub-Section */}
      {additionalProjects.length > 0 && (
        <div className="mt-14 border-t border-[#D5D0C7] pt-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-base font-bold text-[#171717] font-mono uppercase flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#C7462D]" /> ADDITIONAL REPOSITORIES
              </h3>
              <p className="text-xs text-[#6B6862] font-mono mt-1">
                Functional prototypes, administrative applications, and automation tools.
              </p>
            </div>
            <Link
              to="/projects"
              className="text-xs font-mono font-semibold text-[#171717] hover:text-[#C7462D] flex items-center gap-1 shrink-0 uppercase border border-[#D5D0C7] px-3 py-1.5 rounded-[2px] bg-[#EFEBE4]"
            >
              All Projects Directory ({projects.length}) <ArrowRight className="w-3.5 h-3.5 text-[#C7462D]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {additionalProjects.map((project) => (
              <ProjectCard key={project.id} project={project} compact />
            ))}
          </div>
        </div>
      )}
    </SectionContainer>
  );
};
