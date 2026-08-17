import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useSound } from '../../context/SoundContext';

interface MoreProjectCardProps {
  emoji?: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  category: string;
  technologies: string[];
  slug: string;
}

export const MoreProjectCard: React.FC<MoreProjectCardProps> = ({
  emoji,
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
      className="group flex flex-col gap-3.5 p-5 h-full bg-[#EFEBE4] dark:bg-[#1D1C18] border border-[#D5D0C7] dark:border-[#34312B] rounded-xl hover:border-[#A9A49C] dark:hover:border-[#5C5850] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7462D] dark:focus-visible:ring-[#E25235] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F4F1EA] dark:focus-visible:ring-offset-[#151411]"
    >
      {/* Category label */}
      <span className="text-[10px] font-mono uppercase tracking-widest text-[#6B6862] dark:text-[#A9A39A]">
        {category}
      </span>

      {/* Title row */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h4 className="font-amarna text-sm font-bold uppercase tracking-wide text-[#171717] dark:text-[#F2EEE6] group-hover:text-[#C7462D] dark:group-hover:text-[#E25235] transition-colors duration-200 leading-tight">
            {emoji && <span className="mr-1 not-italic">{emoji}</span>}
            {shortTitle}
          </h4>
          <p className="text-[11px] font-mono text-[#6B6862] dark:text-[#A9A39A] mt-0.5 truncate">
            {subtitle}
          </p>
        </div>
        <ArrowUpRight className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#A9A49C] dark:text-[#5C5850] group-hover:text-[#C7462D] dark:group-hover:text-[#E25235] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
      </div>

      {/* Description */}
      <p className="text-xs text-[#6B6862] dark:text-[#A9A39A] leading-relaxed line-clamp-2 flex-1">
        {description}
      </p>

      {/* Tech pills */}
      <div className="flex flex-wrap gap-1 mt-auto pt-1">
        {technologies.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="text-[10px] font-mono text-[#6B6862] dark:text-[#A9A39A] border border-[#D5D0C7] dark:border-[#34312B] px-2 py-0.5 rounded"
          >
            {tech}
          </span>
        ))}
      </div>
    </Link>
  );
};
