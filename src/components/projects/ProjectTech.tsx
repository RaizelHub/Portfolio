import React from 'react';

interface ProjectTechProps {
  technologies: string[];
}

export const ProjectTech: React.FC<ProjectTechProps> = ({ technologies }) => (
  <div className="flex flex-wrap gap-1.5">
    {technologies.map((tech) => (
      <span
        key={tech}
        className="text-[11px] font-mono text-[#6B6862] dark:text-[#A9A39A] border border-[#D5D0C7] dark:border-[#34312B] bg-[#EFEBE4] dark:bg-[#1D1C18] px-2.5 py-[5px] rounded-md tracking-wide"
      >
        {tech}
      </span>
    ))}
  </div>
);
