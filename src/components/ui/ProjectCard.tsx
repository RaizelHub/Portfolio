import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../../types';
import { useSound } from '../../context/SoundContext';

interface ProjectCardProps {
  project: Project;
  compact?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { playHover, playClick } = useSound();
  const displayTitle = project.title;

  return (
    <Link
      to={`/projects/${project.slug}`}
      onMouseEnter={playHover}
      onClick={playClick}
      className="group relative flex flex-col justify-between overflow-hidden border border-[var(--border-subtle)] bg-[var(--surface)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--border)] hover:shadow-[var(--shadow-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)]"
      aria-label={`View ${displayTitle} case study`}
    >
      {/* Project Image Preview: Neutral Frame */}
      <div className="relative aspect-[16/9] overflow-hidden border-b border-[var(--border-subtle)] bg-[var(--background)]">
        {project.image ? (
          <img
            src={`/${project.image}`}
            alt={`${displayTitle} Preview`}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-[1.025]"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-[var(--background)] select-none font-mono">
            <span className="text-2xl mb-1">{project.emoji || '⚙️'}</span>
            <span className="text-xs text-[var(--text-muted)] font-semibold uppercase">{project.category}</span>
          </div>
        )}
      </div>

      {/* Card Body: Title + Short Description + Arrow */}
      <div className="flex flex-1 flex-col justify-between space-y-5 p-6 sm:p-7">
        <div>
          <div className="mb-3 flex min-w-0 flex-wrap items-start justify-between gap-x-3 gap-y-1 font-mono text-xs uppercase leading-[1.4] tracking-[0.08em] text-[var(--text-muted)]">
            <span className="break-safe">{project.category}</span>
            <span className="break-safe normal-case tracking-normal">{project.status}</span>
          </div>
          <div className="flex min-w-0 items-start justify-between gap-3">
            <h3 className="project-heading min-w-0 flex-1 font-title text-[var(--text-primary)] transition-colors duration-200 group-hover:text-[var(--accent)]">
              {displayTitle}
            </h3>
            <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150 shrink-0 mt-0.5" />
          </div>

          <p className="body-copy mt-3 max-w-[55ch] text-[var(--text-secondary)]">
            {project.description}
          </p>
        </div>

        {/* Tech badges: Neutral styling */}
        <div className="flex flex-wrap gap-1 pt-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="break-safe border-l border-[var(--border)] pl-2 font-mono text-xs leading-[1.4] text-[var(--text-muted)]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};
