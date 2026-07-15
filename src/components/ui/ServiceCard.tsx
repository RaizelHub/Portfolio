import { Code, Database, Globe, Layers, Table, Headset } from 'lucide-react';
import type { Service } from '../../types';

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard = ({ service }: ServiceCardProps) => {
  const getIcon = (iconName: string) => {
    const defaultClass = "w-6 h-6 text-slate-200 group-hover:text-emerald-400 transition-colors duration-300";
    switch (iconName.toLowerCase()) {
      case 'code': return <Code className={defaultClass} />;
      case 'database': return <Database className={defaultClass} />;
      case 'api': return <Layers className={defaultClass} />;
      case 'saas': return <Globe className={defaultClass} />;
      case 'table': return <Table className={defaultClass} />;
      case 'headset': return <Headset className={defaultClass} />;
      default: return <Code className={defaultClass} />;
    }
  };

  const toolColorMap = {
    emerald: 'bg-emerald-950/40 text-emerald-300 border-emerald-900/30',
    blue: 'bg-blue-950/40 text-blue-300 border-blue-900/30',
    purple: 'bg-purple-950/40 text-purple-300 border-purple-900/30',
    amber: 'bg-amber-950/40 text-amber-300 border-amber-900/30',
    rose: 'bg-rose-950/40 text-rose-300 border-rose-900/30',
    indigo: 'bg-indigo-950/40 text-indigo-300 border-indigo-900/30',
    pink: 'bg-pink-950/40 text-pink-300 border-pink-900/30',
  };

  return (
    <div className="group bg-navy-800/20 border border-navy-700/50 hover:border-emerald-500/20 rounded-lg overflow-hidden flex flex-col justify-between transition-all duration-300">
      {/* Header Banner */}
      <div className={`px-5 py-3 border-b flex items-center justify-between font-mono text-[10px] font-bold tracking-wider ${service.bannerClass}`}>
        <span className="uppercase">{service.label}</span>
        <div className="p-1.5 bg-navy-950/50 rounded-md">
          {getIcon(service.icon)}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-grow">
        <h3 className="text-base sm:text-lg font-bold text-white mb-2.5 group-hover:text-emerald-400 transition-colors duration-200">
          {service.title}
        </h3>
        
        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
          {service.description}
        </p>
      </div>

      {/* Tools Section */}
      <div className="px-5 pb-5 pt-2 flex flex-wrap gap-1.5">
        {service.tools.map((tool) => (
          <span
            key={tool}
            className={`text-[10px] font-mono px-2 py-0.5 rounded-md border ${
              toolColorMap[service.toolColor] || toolColorMap.emerald
            }`}
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
};
