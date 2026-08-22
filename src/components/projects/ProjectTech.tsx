import React from 'react';

interface ProjectTechProps {
  technologies: string[];
}

export const ProjectTech: React.FC<ProjectTechProps> = ({ technologies }) => (
  <div className="flex flex-wrap gap-1.5">
    {technologies.map((tech) => (
      <span
        key={tech}
        className="break-safe border border-[var(--border-subtle)] bg-[var(--surface)] px-2.5 py-1 font-mono text-xs leading-[1.4] tracking-wide text-[var(--text-muted)]"
      >
        {tech}
      </span>
    ))}
  </div>
);
