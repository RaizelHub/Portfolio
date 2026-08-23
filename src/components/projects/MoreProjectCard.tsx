import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
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
    <div className="group relative flex h-full flex-col gap-4 border-b border-[var(--border-subtle)] bg-transparent px-0 py-6 transition-all duration-200 hover:border-[var(--accent)]">
      {/* Category + Like badge */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs font-medium uppercase tracking-widest text-[var(--text-muted)]">
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
        className="flex min-w-0 items-start justify-between gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)]"
      >
        <div className="min-w-0 flex-1">
          <h4 className="break-safe font-title text-lg font-semibold leading-tight tracking-[-0.02em] text-[var(--text-primary)] transition-colors duration-200 group-hover:text-[var(--accent)]">
            {shortTitle}
          </h4>
          <p className="break-safe mt-1 font-mono text-xs leading-[1.45] text-[var(--text-secondary)]">
            {subtitle}
          </p>
        </div>
        <ArrowUpRight className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[var(--text-muted)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150" />
      </Link>

      {/* Description */}
      <p className="body-copy flex-1 max-w-[55ch] text-[var(--text-secondary)]">
        {description}
      </p>

      {/* Tech pills: Neutral */}
      <div className="flex flex-wrap gap-1 mt-auto pt-1">
        {technologies.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="break-safe border-l border-[var(--border)] pl-2 font-mono text-xs leading-[1.4] text-[var(--text-muted)]"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};
