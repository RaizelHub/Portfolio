import React from 'react';

interface ProjectTechProps {
  technologies: string[];
}

export const ProjectTech: React.FC<ProjectTechProps> = ({ technologies }) => (
  <div className="flex flex-wrap gap-1.5">
    {technologies.map((tech) => (
      <span
        key={tech}
        className="text-[11px] font-mono text-[#5F6873] dark:text-[#A7B0BA] border border-[#DCE1E7] dark:border-[#242B33] bg-[#F1F3F5] dark:bg-[#171C22] px-2.5 py-[4px] rounded-md tracking-wide"
      >
        {tech}
      </span>
    ))}
  </div>
);
