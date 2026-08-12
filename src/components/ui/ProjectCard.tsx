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

  // Extract clean primary title string (e.g., "CareerOS" from "CareerOS — Local-First Windows Career Operating System")
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
      className="group relative bg-[#EFEBE4] dark:bg-[#1D1C18] border border-[#D5D0C7] dark:border-[#34312B] hover:border-[#171717] dark:hover:border-[#F2EEE6] rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#C7462D] dark:focus:ring-[#E25235] focus:ring-offset-2"
      aria-label={`View ${displayTitle} case study`}
    >
      {/* Project Image Preview */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#F4F1EA] dark:bg-[#151411] border-b border-[#D5D0C7] dark:border-[#34312B]">
        {project.image ? (
          <img
            src={`/${project.image}`}
            alt={`${displayTitle} Preview`}
            loading="lazy"
            className="w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-[#EFEBE4] dark:bg-[#1D1C18] select-none font-mono">
            <span className="text-2xl mb-1">{project.emoji || '⚙️'}</span>
            <span className="text-xs text-[#6B6862] dark:text-[#A9A39A] font-semibold uppercase">{project.category}</span>
          </div>
        )}
      </div>

      {/* Card Body: Title + Short Description + Arrow */}
      <div className="p-5 sm:p-6 space-y-2">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-amarna text-lg sm:text-xl font-bold text-[#171717] dark:text-[#F2EEE6] group-hover:text-[#C7462D] dark:group-hover:text-[#E25235] transition-colors duration-200 uppercase tracking-wide">
            {displayTitle}
          </h3>
          <ArrowUpRight className="w-4 h-4 text-[#6B6862] dark:text-[#A9A39A] group-hover:text-[#C7462D] dark:group-hover:text-[#E25235] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0 mt-1" />
        </div>

        <p className="text-xs sm:text-sm text-[#6B6862] dark:text-[#A9A39A] font-pt-sans leading-relaxed line-clamp-2 font-normal">
          {project.description}
        </p>
      </div>
    </Link>
  );
};
