import { Code2, Server, Workflow, Database } from 'lucide-react';
import type { Service } from '../../types';

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard = ({ service }: ServiceCardProps) => {
  const getIcon = (iconName: string) => {
    const defaultClass = "w-5 h-5 text-[#C7462D] dark:text-[#E25235]";
    switch (iconName.toLowerCase()) {
      case 'code':
        return <Code2 className={defaultClass} />;
      case 'server':
        return <Server className={defaultClass} />;
      case 'workflow':
        return <Workflow className={defaultClass} />;
      case 'database':
        return <Database className={defaultClass} />;
      default:
        return <Code2 className={defaultClass} />;
    }
  };

  return (
    <div className="group bg-[#EFEBE4] dark:bg-[#1D1C18] border border-[#D5D0C7] dark:border-[#34312B] hover:border-[#171717] dark:hover:border-[#F2EEE6] rounded-xl p-6 sm:p-7 flex flex-col justify-between space-y-4 transition-all duration-200 hover:-translate-y-0.5 shadow-sm">
      <div className="space-y-3">
        {/* Top Label & Icon Header */}
        <div className="flex items-center justify-between border-b border-[#D5D0C7]/80 dark:border-[#34312B]/80 pb-3">
          <span className="font-mono text-[11px] font-bold text-[#6B6862] dark:text-[#A9A39A] uppercase tracking-wider">
            {service.label}
          </span>
          <div className="p-1.5 bg-[#F4F1EA] dark:bg-[#151411] border border-[#D5D0C7] dark:border-[#34312B] rounded-md">
            {getIcon(service.icon)}
          </div>
        </div>

        {/* Main Expertise Title */}
        <h3 className="font-amarna text-lg sm:text-xl font-bold text-[#171717] dark:text-[#F2EEE6] group-hover:text-[#C7462D] dark:group-hover:text-[#E25235] transition-colors uppercase tracking-wide pt-1">
          {service.title}
        </h3>

        {/* Concise Description */}
        <p className="text-xs sm:text-sm text-[#6B6862] dark:text-[#A9A39A] font-pt-sans leading-relaxed font-normal">
          {service.description}
        </p>
      </div>
    </div>
  );
};
