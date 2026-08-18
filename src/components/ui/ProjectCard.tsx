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

  const displayTitle = project.title.includes('—')
    ? project.title.split('—')[0].trim()
    : project.title.includes('-')
    ? project.title.split('-')[0].trim()
    : project.title;

  return (
    <Link
      to={`/projects/${project.slug}`}
      onMouseEnter={playHover}
      onClick={playClick}
      className="group relative bg-[var(--surface)] border border-[var(--border-subtle)] hover:border-[var(--border)] rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-150 hover:-translate-y-0.5 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)]"
      aria-label={`View ${displayTitle} case study`}
    >
      {/* Project Image Preview: Neutral Frame */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--background)] border-b border-[var(--border-subtle)]">
        {project.image ? (
          <img
            src={`/${project.image}`}
            alt={`${displayTitle} Preview`}
            loading="lazy"
            className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-[var(--background)] select-none font-mono">
            <span className="text-2xl mb-1">{project.emoji || '⚙️'}</span>
            <span className="text-xs text-[var(--text-muted)] font-semibold uppercase">{project.category}</span>
          </div>
        )}
      </div>

      {/* Card Body: Title + Short Description + Arrow */}
      <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-sans text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-150 leading-snug">
              {displayTitle}
            </h3>
            <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150 shrink-0 mt-0.5" />
          </div>

          <p className="text-xs text-[var(--text-secondary)] font-sans leading-relaxed line-clamp-2 mt-1">
            {project.description}
          </p>
        </div>

        {/* Tech badges: Neutral styling */}
        <div className="flex flex-wrap gap-1 pt-2">
          {project.technologies.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-mono text-[var(--text-muted)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-2 py-0.5 rounded"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-[10px] font-mono text-[var(--text-muted)] px-1 py-0.5">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};
