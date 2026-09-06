import React from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '../../types';
import { ProjectLikeButton } from './ProjectLikeButton';
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
      className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border-0 bg-[var(--surface)] shadow-xl shadow-black/5 dark:shadow-2xl dark:shadow-black/50 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl dark:hover:shadow-black/70 focus-visible:outline-none"
      aria-label={`View ${displayTitle} case study`}
    >
      {/* Project Image Preview */}
      <div className="relative aspect-[16/9] overflow-hidden bg-[var(--background)]">
        {project.image ? (
          <img
            src={`/${project.image}`}
            alt={`${displayTitle} Preview`}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-[var(--background)] select-none font-mono">
            <span className="text-2xl mb-1">{project.emoji || '⚙️'}</span>
            <span className="text-xs text-[var(--text-primary)] font-bold uppercase">{project.category}</span>
          </div>
        )}
      </div>

      {/* Card Body: Title + Short Description + Arrow */}
      <div className="flex flex-1 flex-col justify-between space-y-5 p-6 sm:p-7">
        <div>
          <div className="mb-3 flex min-w-0 flex-wrap items-center justify-between gap-x-3 gap-y-1 font-mono text-xs uppercase leading-[1.4] tracking-[0.08em] font-bold text-[var(--text-primary)]">
            <div className="flex items-center gap-2">
              <span className="rounded-full border-0 bg-[var(--surface-elevated)] px-3 py-0.5 shadow-sm">{project.category}</span>
              <span>·</span>
              <span className="break-safe normal-case tracking-normal text-[var(--text-secondary)]">{project.status}</span>
            </div>
            <ProjectLikeButton slug={project.slug} projectName={displayTitle} variant="badge" />
          </div>
          <div className="flex min-w-0 items-start justify-between gap-3">
            <h3 className="project-heading min-w-0 flex-1 font-title text-[var(--text-primary)] transition-colors duration-200 group-hover:underline font-normal">
              {displayTitle}
            </h3>
          </div>

          <p className="body-copy mt-3 max-w-[55ch] text-[var(--text-secondary)] font-medium text-xs sm:text-sm">
            {project.description}
          </p>
        </div>

        {/* Tech badges: Rounded pills */}
        <div className="flex flex-wrap gap-1.5 pt-3">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border-0 bg-[var(--surface-elevated)] px-3 py-1 font-mono text-xs font-bold text-[var(--text-primary)] shadow-sm"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};
