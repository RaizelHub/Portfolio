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
  const displayTitle = project.title.split(/\s+[—–-]\s+/)[0].trim() || project.title;

  return (
    <Link
      to={`/projects/${project.slug}`}
      onMouseEnter={playHover}
      onClick={() => setTimeout(() => playClick(), 0)}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#161822] shadow-xs transition-[border-color,box-shadow,transform] duration-150 hover:-translate-y-1 hover:border-neutral-400 dark:hover:border-neutral-600 hover:shadow-md focus-visible:outline-none"
      aria-label={`View ${displayTitle} case study`}
    >
      {/* Project Image Preview */}
      <div className="relative aspect-[16/9] overflow-hidden bg-neutral-100 dark:bg-neutral-900 border-b-2 border-neutral-300 dark:border-neutral-700">
        {project.image ? (
          <img
            src={`/${project.image}`}
            alt={`${displayTitle} Preview`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-neutral-100 dark:bg-neutral-900 select-none font-mono">
            <span className="text-xl mb-1">{project.emoji || '⚙️'}</span>
            <span className="text-[10px] text-neutral-800 dark:text-neutral-200 font-bold uppercase">{project.category}</span>
          </div>
        )}
      </div>

      {/* Card Body: Title + Short Description */}
      <div className="flex flex-1 flex-col justify-between space-y-3 p-4 sm:p-4.5">
        <div>
          <div className="mb-2 flex min-w-0 flex-wrap items-center justify-between gap-x-2 gap-y-1 font-mono text-[10px] uppercase font-bold text-neutral-600 dark:text-neutral-400">
            <div className="flex items-center gap-1.5">
              <span className="rounded-full border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5">{project.category}</span>
              <span>·</span>
              <span className="normal-case text-neutral-500 dark:text-neutral-400">{project.status}</span>
            </div>
            <ProjectLikeButton slug={project.slug} projectName={displayTitle} variant="badge" />
          </div>
          <div className="flex min-w-0 items-start justify-between gap-2">
            <h3 className="font-title text-sm sm:text-base font-bold text-neutral-900 dark:text-white transition-colors duration-200 group-hover:text-neutral-600 dark:group-hover:text-neutral-300">
              {displayTitle}
            </h3>
          </div>

          <p className="mt-1.5 text-xs text-neutral-600 dark:text-neutral-300 font-normal leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Tech badges: Rounded pills */}
        <div className="flex flex-wrap gap-1 pt-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100/80 dark:bg-neutral-800/80 px-2 py-0.5 font-mono text-[10px] font-semibold text-neutral-700 dark:text-neutral-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};
