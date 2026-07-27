import React from 'react';
import { Link } from 'react-router-dom';
import { Github, ExternalLink, ArrowRight, Smartphone } from 'lucide-react';
import type { Project, ProjectStatus } from '../../types';
import { Badge } from './Badge';

interface ProjectCardProps {
  project: Project;
  compact?: boolean;
}

const getStatusBadgeVariant = (status: ProjectStatus) => {
  switch (status) {
    case 'Live': return 'emerald';
    case 'Working Prototype': return 'blue';
    case 'Hardware Prototype': return 'amber';
    case 'Academic Project': return 'purple';
    case 'In Development': return 'pink';
    case 'Frontend Demo': return 'blue';
    default: return 'slate';
  }
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, compact = false }) => {
  const showCustomBadge = project.badge && project.badge !== project.status;

  return (
    <div className={`group relative bg-navy-800/30 border border-navy-700/50 hover:border-emerald-500/30 rounded-xl overflow-hidden flex flex-col justify-between transition-all duration-300 ${compact ? 'p-5' : ''}`}>
      <div>
        {!compact && (
          <div className="relative aspect-video overflow-hidden bg-navy-950 border-b border-navy-700/40">
            {project.image ? (
              <img
                src={`/${project.image}`}
                alt={`${project.title} Preview`}
                loading="lazy"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-navy-950 select-none">
                <span className="text-3xl mb-1">{project.emoji || '💻'}</span>
                <span className="text-xs font-mono text-slate-400 font-semibold">{project.category}</span>
              </div>
            )}

            {/* Top Badges */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 flex-wrap pointer-events-none">
              <Badge variant={getStatusBadgeVariant(project.status)} className="text-[10px]">
                {project.status}
              </Badge>
              {showCustomBadge && (
                <span className="text-[10px] font-mono font-bold bg-navy-950/90 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded shadow">
                  {project.badge}
                </span>
              )}
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className={compact ? '' : 'p-5'}>
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-400 transition-colors duration-200">
              {project.title}
            </h3>
          </div>

          {project.role && (
            <span className="text-xs font-mono text-emerald-400 block mb-2 font-medium">
              Role: {project.role}
            </span>
          )}

          {compact && (
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <Badge variant={getStatusBadgeVariant(project.status)} className="text-[10px]">
                {project.status}
              </Badge>
              {showCustomBadge && (
                <span className="text-[10px] font-mono text-amber-300 bg-amber-950/40 border border-amber-900/30 px-2 py-0.5 rounded">
                  {project.badge}
                </span>
              )}
            </div>
          )}

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-3">
            {project.description}
          </p>

          {/* Technology Stack */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, compact ? 4 : 5).map((tech) => (
              <span key={tech} className="text-[10px] font-mono px-2 py-0.5 bg-navy-900 text-slate-400 border border-navy-800 rounded">
                {tech}
              </span>
            ))}
            {project.technologies.length > (compact ? 4 : 5) && (
              <span className="text-[10px] font-mono px-2 py-0.5 bg-navy-950 text-slate-500 rounded">
                +{project.technologies.length - (compact ? 4 : 5)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className={`pt-3 mt-4 border-t border-navy-700/30 flex items-center justify-between gap-3 ${compact ? '' : 'px-5 pb-5'}`}>
        <Link
          to={`/projects/${project.slug}`}
          className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 inline-flex items-center gap-1.5 transition-colors duration-200"
        >
          View Case Study <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        <div className="flex items-center gap-2.5">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-emerald-400 transition-colors"
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
              className="text-slate-400 hover:text-emerald-400 transition-colors"
              title="Live Demo"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
          {project.apkUrl && (
            <a
              href={`/${project.apkUrl}`}
              download
              className="text-slate-400 hover:text-emerald-400 transition-colors"
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
