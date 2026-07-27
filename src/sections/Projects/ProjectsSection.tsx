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
    <SectionContainer id="projects">
      <SectionHeading
        tag="03 / Projects"
        title="Featured Projects"
        subtitle="Practical web applications, IoT hardware monitoring, and workflow automation systems."
      />

      {/* Featured Projects Grid (OmniFlow AI, Smart Pipe, JobRadar AI) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Additional Work Sub-Section */}
      {additionalProjects.length > 0 && (
        <div className="mt-16 border-t border-navy-800 pt-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" /> Additional Work
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Other functional prototypes, desktop applications, mobile tools, and automation workflows.
              </p>
            </div>
            <Link
              to="/projects"
              className="text-xs font-mono font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 shrink-0"
            >
              All Projects Directory ({projects.length}) <ArrowRight className="w-3.5 h-3.5" />
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
