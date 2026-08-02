import { Code, Database, Globe, Layers, Table, Headset, Workflow, Cpu } from 'lucide-react';
import type { Service } from '../../types';

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard = ({ service }: ServiceCardProps) => {
  const getIcon = (iconName: string) => {
    const defaultClass = "w-5 h-5 text-[#171717] group-hover:text-[#C7462D] transition-colors duration-200";
    switch (iconName.toLowerCase()) {
      case 'workflow': return <Workflow className={defaultClass} />;
      case 'ai': case 'cpu': return <Cpu className={defaultClass} />;
      case 'code': return <Code className={defaultClass} />;
      case 'database': return <Database className={defaultClass} />;
      case 'api': return <Layers className={defaultClass} />;
      case 'saas': return <Globe className={defaultClass} />;
      case 'table': return <Table className={defaultClass} />;
      case 'headset': return <Headset className={defaultClass} />;
      default: return <Code className={defaultClass} />;
    }
  };

  return (
    <div className="group bg-[#EFEBE4] border border-[#D5D0C7] hover:border-[#171717] rounded-[2px] overflow-hidden flex flex-col justify-between transition-all duration-200">
      {/* Header Banner */}
      <div className="px-5 py-3 border-b border-[#D5D0C7] flex items-center justify-between font-mono text-xs font-bold tracking-wider text-[#171717] bg-[#F4F1EA]">
        <span className="uppercase text-[#C7462D]">{service.label}</span>
        <div className="p-1 bg-[#EFEBE4] border border-[#D5D0C7] rounded-[1px]">
          {getIcon(service.icon)}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-grow">
        <h3 className="text-base sm:text-lg font-bold text-[#171717] mb-2 group-hover:text-[#C7462D] transition-colors uppercase">
          {service.title}
        </h3>

        <p className="text-xs sm:text-sm text-[#6B6862] leading-relaxed font-normal">
          {service.description}
        </p>
      </div>

      {/* Tools Section */}
      <div className="px-5 pb-5 pt-2 flex flex-wrap gap-1.5 border-t border-[#D5D0C7]/60">
        {service.tools.map((tool) => (
          <span
            key={tool}
            className="text-[10px] font-mono px-2 py-0.5 rounded-[1px] border border-[#D5D0C7] bg-[#F4F1EA] text-[#171717]"
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
};
