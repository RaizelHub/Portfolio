import { Server, Layout, Database, Network, Cpu, Wrench } from 'lucide-react';
import type { Skill } from '../../types';

interface SkillCardProps {
  skill: Skill;
}

export const SkillCard = ({ skill }: SkillCardProps) => {
  const getIcon = (iconName: string) => {
    switch (iconName.toLowerCase()) {
      case 'server': return <Server className="w-6 h-6 text-emerald-400" />;
      case 'layout': return <Layout className="w-6 h-6 text-emerald-400" />;
      case 'database': return <Database className="w-6 h-6 text-emerald-400" />;
      case 'network': return <Network className="w-6 h-6 text-emerald-400" />;
      case 'cpu': return <Cpu className="w-6 h-6 text-emerald-400" />;
      case 'wrench': return <Wrench className="w-6 h-6 text-emerald-400" />;
      default: return <Wrench className="w-6 h-6 text-emerald-400" />;
    }
  };

  return (
    <div className="bg-navy-800/30 border border-navy-700/40 hover:border-emerald-500/20 p-6 rounded-lg transition-all duration-300 flex flex-col justify-between hover:translate-y-[-2px]">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-navy-900 rounded-md border border-navy-700/50">
            {getIcon(skill.icon)}
          </div>
          <h3 className="font-bold text-white text-base sm:text-lg">{skill.category}</h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-400 mb-5 leading-relaxed">
          {skill.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {skill.items.map((item) => {
          const isAccent = skill.accentItems?.includes(item);
          return (
            <span
              key={item}
              className={`text-xs font-mono px-2.5 py-1 rounded transition-colors duration-200 select-none ${isAccent
                  ? 'bg-emerald-950/50 text-emerald-300 border border-emerald-800/40 font-semibold'
                  : 'bg-navy-900 text-slate-400 border border-transparent'
                }`}
            >
              {item}
            </span>
          );
        })}
      </div>
    </div>
  );
};
