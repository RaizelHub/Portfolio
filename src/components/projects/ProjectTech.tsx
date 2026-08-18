import React from 'react';

interface ProjectTechProps {
  technologies: string[];
}

export const ProjectTech: React.FC<ProjectTechProps> = ({ technologies }) => (
  <div className="flex flex-wrap gap-1.5">
    {technologies.map((tech) => (
      <span
        key={tech}
        className="text-[11px] font-mono text-[var(--text-muted)] border border-[var(--border-subtle)] bg-[var(--surface)] px-2.5 py-[3px] rounded-md tracking-wide"
      >
        {tech}
      </span>
    ))}
  </div>
);
