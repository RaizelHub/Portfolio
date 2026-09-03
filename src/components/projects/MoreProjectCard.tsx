import React from 'react';
import { Link } from 'react-router-dom';
import { ProjectLikeButton } from '../ui/ProjectLikeButton';
import { useSound } from '../../context/SoundContext';

interface MoreProjectCardProps {
  shortTitle: string;
  subtitle: string;
  description: string;
  category: string;
  technologies: string[];
  slug: string;
}

export const MoreProjectCard: React.FC<MoreProjectCardProps> = ({
  shortTitle,
  subtitle,
  description,
  category,
  technologies,
  slug,
}) => {
  const { playHover, playClick } = useSound();

  return (
    <div className="group relative flex h-full flex-col gap-4 border-2 border-black dark:border-white bg-[var(--surface)] p-5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[5px_5px_0px_0px_rgba(255,255,255,1)]">
      {/* Category + Like badge */}
      <div className="flex items-center justify-between border-b-2 border-black dark:border-white pb-3">
        <span className="font-mono text-xs font-black uppercase tracking-widest text-[var(--text-primary)]">
          {category}
        </span>
        <ProjectLikeButton slug={slug} projectName={shortTitle} variant="compact" />
      </div>

      {/* Title row */}
      <Link
        to={`/projects/${slug}`}
        onMouseEnter={playHover}
        onClick={playClick}
        aria-label={`View ${shortTitle} project`}
        className="flex min-w-0 items-start justify-between gap-3 focus-visible:outline-none"
      >
        <div className="min-w-0 flex-1">
          <h4 className="break-safe font-title text-xl font-normal leading-tight tracking-tight text-[var(--text-primary)] transition-colors group-hover:underline">
            {shortTitle}
          </h4>
          <p className="break-safe mt-1 font-mono text-xs font-bold leading-[1.45] text-[var(--text-secondary)]">
            {subtitle}
          </p>
        </div>
      </Link>

      {/* Description */}
      <p className="body-copy flex-1 max-w-[55ch] text-[var(--text-secondary)] font-medium text-xs sm:text-sm">
        {description}
      </p>

      {/* Tech pills */}
      <div className="flex flex-wrap gap-1.5 mt-auto pt-3 border-t-2 border-black dark:border-white">
        {technologies.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="border border-black dark:border-white bg-[var(--surface-elevated)] px-2 py-0.5 font-mono text-xs font-bold text-[var(--text-primary)] shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:shadow-[1px_1px_0px_0px_rgba(255,255,255,1)]"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};
