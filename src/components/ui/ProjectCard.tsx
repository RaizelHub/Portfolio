import React from 'react';
import { Link } from 'react-router-dom';
import { Github, ExternalLink, ArrowRight, Smartphone } from 'lucide-react';
import type { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  compact?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, compact = false }) => {
  const showCustomBadge = project.badge && project.badge !== project.status;

  return (
    <div className={`group relative bg-[#EFEBE4] border border-[#D5D0C7] hover:border-[#171717] rounded-[2px] overflow-hidden flex flex-col justify-between transition-all duration-200 ${compact ? 'p-5' : ''}`}>
      <div>
        {!compact && (
          <div className="relative aspect-[16/10] overflow-hidden bg-[#F4F1EA] border-b border-[#D5D0C7]">
            {project.image ? (
              <img
                src={`/${project.image}`}
                alt={`${project.title} Preview`}
                loading="lazy"
                className="w-full h-full object-cover object-top transition-all duration-500"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-[#EFEBE4] select-none font-mono">
                <span className="text-2xl mb-1">{project.emoji || '⚙️'}</span>
                <span className="text-xs text-[#6B6862] font-semibold uppercase">{project.category}</span>
              </div>
            )}

            {/* Top Index Tag */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 pointer-events-none">
              <span className="text-[10px] font-mono font-bold bg-[#171717] text-[#F4F1EA] px-2 py-0.5 rounded-[1px] uppercase tracking-wider">
                {project.status}
              </span>
              {showCustomBadge && (
                <span className="text-[10px] font-mono font-bold bg-[#C7462D] text-[#F4F1EA] px-2 py-0.5 rounded-[1px] uppercase tracking-wider">
                  {project.badge}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className={compact ? '' : 'p-5'}>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-base sm:text-lg font-bold text-[#171717] group-hover:text-[#C7462D] transition-colors duration-200 uppercase">
              {project.title}
            </h3>
          </div>

          {project.role && (
            <span className="text-xs font-mono text-[#C7462D] block mb-2 font-medium">
              ROLE: {project.role}
            </span>
          )}

          {compact && (
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="text-[10px] font-mono font-bold bg-[#171717] text-[#F4F1EA] px-2 py-0.5 rounded-[1px] uppercase">
                {project.status}
              </span>
              {showCustomBadge && (
                <span className="text-[10px] font-mono font-bold bg-[#C7462D] text-[#F4F1EA] px-2 py-0.5 rounded-[1px] uppercase">
                  {project.badge}
                </span>
              )}
            </div>
          )}

          <p className="text-xs sm:text-sm text-[#6B6862] leading-relaxed line-clamp-3 font-normal">
            {project.description}
          </p>

          {/* Technology Stack Tags */}
          <div className="mt-4 flex flex-wrap gap-1">
            {project.technologies.slice(0, compact ? 4 : 5).map((tech) => (
              <span key={tech} className="text-[10px] font-mono px-2 py-0.5 bg-[#F4F1EA] text-[#171717] border border-[#D5D0C7] rounded-[1px]">
                {tech}
              </span>
            ))}
            {project.technologies.length > (compact ? 4 : 5) && (
              <span className="text-[10px] font-mono px-2 py-0.5 bg-[#F4F1EA] text-[#6B6862] border border-[#D5D0C7] rounded-[1px]">
                +{project.technologies.length - (compact ? 4 : 5)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className={`pt-3 mt-4 border-t border-[#D5D0C7] flex items-center justify-between gap-3 ${compact ? '' : 'px-5 pb-5'}`}>
        <Link
          to={`/projects/${project.slug}`}
          className="text-xs font-mono font-semibold text-[#171717] hover:text-[#C7462D] inline-flex items-center gap-1 transition-colors uppercase"
        >
          <span>Explore Case Study</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#C7462D]" />
        </Link>

        <div className="flex items-center gap-2.5">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6B6862] hover:text-[#171717] transition-colors"
              title="Source Code"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6B6862] hover:text-[#171717] transition-colors"
              title="Live Demo"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
          {project.apkUrl && (
            <a
              href={`/${project.apkUrl}`}
              download
              className="text-[#6B6862] hover:text-[#171717] transition-colors"
              title="Download Android APK"
            >
              <Smartphone className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
