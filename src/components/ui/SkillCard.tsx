import { Server } from 'lucide-react';
import type { SkillGroup, SkillItem } from '../../types';

interface SkillCardProps {
  skill: SkillGroup;
}

export const SkillCard = ({ skill }: SkillCardProps) => {
  return (
    <div className="bg-navy-800/30 border border-navy-700/40 hover:border-emerald-500/20 p-6 rounded-lg transition-all duration-300 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-navy-900 rounded-md border border-navy-700/50">
            <Server className="w-6 h-6 text-emerald-400" />
          </div>
          <h3 className="font-bold text-white text-base sm:text-lg">{skill.category}</h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-400 mb-5 leading-relaxed">
          {skill.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {skill.items.map((item: string | SkillItem) => {
          const itemName = typeof item === 'string' ? item : item.name;
          const projectConn = typeof item === 'object' ? item.projectConnection : undefined;

          return (
            <span
              key={itemName}
              className="text-xs font-mono px-2.5 py-1 rounded bg-navy-900 text-slate-300 border border-navy-800 flex items-center gap-1.5"
            >
              <span>{itemName}</span>
              {projectConn && <span className="text-emerald-400 text-[10px]">&rarr; {projectConn}</span>}
            </span>
          );
        })}
      </div>
    </div>
  );
};
