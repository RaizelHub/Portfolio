import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SectionContainer } from '../../components/layout/SectionContainer';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { ProjectCard } from '../../components/ui/ProjectCard';
import { projects } from '../../data/projects';

export const ProjectsSection = () => {
  const featuredProjects = projects.filter((p) => p.featured);
  const displayProjects = featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 6);

  return (
    <SectionContainer id="projects">
      <SectionHeading
        tag="04 / Featured Projects"
        title="Featured Software &amp; Systems"
        subtitle="Full-stack web applications, AI automation platforms, multi-tenant architectures, and backend microservices."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {displayProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg font-mono text-sm font-semibold transition-all duration-200 group shadow-lg hover:shadow-emerald-500/10"
        >
          <span>View All Projects ({projects.length})</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </SectionContainer>
  );
};
