import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
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
    <Link
      to={`/projects/${slug}`}
      onMouseEnter={playHover}
      onClick={playClick}
      aria-label={`View ${shortTitle} project`}
      className="group flex flex-col gap-3.5 p-5 h-full bg-[var(--surface)] border border-[var(--border-subtle)] hover:border-[var(--border)] rounded-xl transition-all duration-150 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)]"
    >
      {/* Category label: Neutral */}
      <span className="text-[10px] font-mono font-medium uppercase tracking-widest text-[var(--text-muted)]">
        {category}
      </span>

      {/* Title row */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h4 className="font-sans text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-150 leading-tight">
            {shortTitle}
          </h4>
          <p className="text-[11px] font-mono text-[var(--text-secondary)] mt-0.5 truncate">
            {subtitle}
          </p>
        </div>
        <ArrowUpRight className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[var(--text-muted)] group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150" />
      </div>

      {/* Description */}
      <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-2 flex-1">
        {description}
      </p>

      {/* Tech pills: Neutral */}
      <div className="flex flex-wrap gap-1 mt-auto pt-1">
        {technologies.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="text-[10px] font-mono text-[var(--text-muted)] border border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-2 py-0.5 rounded"
          >
            {tech}
          </span>
        ))}
      </div>
    </Link>
  );
};
