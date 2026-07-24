import React from 'react';
import { Link } from 'react-router-dom';
import { Github, ExternalLink, ArrowRight, Smartphone } from 'lucide-react';
import type { Project } from '../../types';
import { Badge } from './Badge';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const getCategoryColor = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'saas': return 'amber';
      case 'iot': return 'emerald';
      case 'web': return 'blue';
      case 'mobile': return 'purple';
      case 'ai': return 'pink';
      case 'desktop': return 'slate';
      default: return 'slate';
    }
  };

  return (
    <div className={`group relative bg-navy-800/40 border border-navy-700/50 hover:border-emerald-500/30 rounded-lg overflow-hidden flex flex-col justify-between transition-all duration-300 ${project.featured ? 'ring-1 ring-emerald-500/20' : ''}`}>
      <div>
        {/* Project Thumbnail — live iframe or static image */}
        <div className="relative aspect-video overflow-hidden bg-navy-950 border-b border-navy-700/30">
          {project.liveUrl ? (
            <>
              <iframe
                src={project.liveUrl}
                title={`${project.title} live preview`}
                className="absolute top-0 left-0 pointer-events-none select-none"
                style={{
                  width: '400%',
                  height: '400%',
                  transform: 'scale(0.25)',
                  transformOrigin: 'top left',
                  border: 'none',
                }}
                loading="lazy"
                sandbox="allow-scripts allow-same-origin"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </>
          ) : project.image ? (
            <img
              src={`/${project.image}`}
              alt={`${project.title} Preview`}
              loading="lazy"
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-navy-950 to-navy-900 select-none">
              <span className="text-xs font-mono text-slate-500">{project.category} System</span>
            </div>
          )}

          {/* Overlay Tag */}
          <div className="absolute top-3 left-3 flex gap-2">
            {project.featured && (
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-navy-950 bg-emerald-400 rounded-md">
                ★ Featured
              </span>
            )}
            <Badge variant={getCategoryColor(project.category)} className="text-[10px]">
              {project.category}
            </Badge>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5">
          <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors duration-200 truncate">
            {project.title}
          </h3>
          
          <p className="mt-2.5 text-xs sm:text-sm text-slate-400 line-clamp-3 leading-relaxed">
            {project.description}
          </p>

          {/* Technology Badges */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((tech) => (
              <span key={tech} className="text-[10px] font-mono px-2 py-0.5 bg-navy-900 text-slate-400 rounded">
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="text-[10px] font-mono px-2 py-0.5 bg-navy-900/60 text-slate-500 rounded">
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer Links */}
      <div className="px-5 pb-5 pt-3 border-t border-navy-700/30 flex items-center justify-between gap-4">
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
              className="text-slate-400 hover:text-emerald-400 transition-colors duration-200"
              title="View Source Code"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-emerald-400 transition-colors duration-200"
              title="Live Demo"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
          {project.apkUrl && (
            <a
              href={`/${project.apkUrl}`}
              download
              className="text-slate-400 hover:text-emerald-400 transition-colors duration-200"
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
