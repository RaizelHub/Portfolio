import { Code2, Server, Workflow, Database } from 'lucide-react';
import type { Service } from '../../types';

interface ServiceCardProps {
  service: Service;
}

export const ServiceCard = ({ service }: ServiceCardProps) => {
  const getIcon = (iconName: string) => {
    const defaultClass = "w-4 h-4 text-neutral-900 dark:text-white";
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
    <div className="group bg-white dark:bg-[#161822] border-2 border-neutral-300 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-600 rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-3 transition-all duration-200 hover:-translate-y-0.5 shadow-xs">
      <div className="space-y-2.5">
        {/* Top Label & Icon Header */}
        <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-2.5">
          <span className="font-title text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
            {service.label}
          </span>
          <div className="p-1.5 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-md">
            {getIcon(service.icon)}
          </div>
        </div>

        {/* Main Expertise Title */}
        <h3 className="font-title text-sm sm:text-base font-bold text-neutral-900 dark:text-white transition-colors pt-0.5">
          {service.title}
        </h3>

        {/* Concise Description */}
        <p className="text-xs text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed font-normal">
          {service.description}
        </p>
      </div>
    </div>
  );
};
