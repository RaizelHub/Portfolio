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
      className="group flex flex-col gap-3.5 p-5 h-full bg-[#FFFFFF] dark:bg-[#11151A] border border-[#DCE1E7] dark:border-[#242B33] rounded-xl hover:border-[#2563EB]/60 dark:hover:border-[#60A5FA]/60 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
    >
      {/* Category label */}
      <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-[#2563EB] dark:text-[#60A5FA]">
        {category}
      </span>

      {/* Title row */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h4 className="font-sans text-sm font-bold text-[#111318] dark:text-[#F4F6F8] group-hover:text-[#2563EB] dark:group-hover:text-[#60A5FA] transition-colors duration-150 leading-tight">
            {shortTitle}
          </h4>
          <p className="text-[11px] font-mono text-[#5F6873] dark:text-[#A7B0BA] mt-0.5 truncate">
            {subtitle}
          </p>
        </div>
        <ArrowUpRight className="w-3.5 h-3.5 shrink-0 mt-0.5 text-[#78828D] dark:text-[#7F8994] group-hover:text-[#2563EB] dark:group-hover:text-[#60A5FA] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150" />
      </div>

      {/* Description */}
      <p className="text-xs text-[#5F6873] dark:text-[#A7B0BA] leading-relaxed line-clamp-2 flex-1">
        {description}
      </p>

      {/* Tech pills */}
      <div className="flex flex-wrap gap-1 mt-auto pt-1">
        {technologies.slice(0, 4).map((tech) => (
          <span
            key={tech}
            className="text-[10px] font-mono text-[#5F6873] dark:text-[#A7B0BA] border border-[#DCE1E7] dark:border-[#242B33] bg-[#F1F3F5] dark:bg-[#171C22] px-2 py-0.5 rounded"
          >
            {tech}
          </span>
        ))}
      </div>
    </Link>
  );
};
