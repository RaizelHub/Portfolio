import { Code2, Database, Workflow, ShieldCheck, ArrowRight } from 'lucide-react';
import { SectionContainer } from '../../components/layout/SectionContainer';
import { SectionHeading } from '../../components/ui/SectionHeading';

interface ProcessStep {
  step: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  description: string;
  deliverables: string[];
}

export const Process = () => {
  const steps: ProcessStep[] = [
    {
      step: '01',
      title: 'Discovery & System Specifications',
      subtitle: 'Requirements Mapping & API Strategy',
      icon: Code2,
      description:
        'Understanding system requirements, identifying REST endpoints, mapping public and authenticated data feeds, and planning database relational entities prior to writing code.',
      deliverables: [
        'API & Webhook Mapping',
        'Relational Schema Drafts',
        'Authentication Requirements',
        'Data Flow Architecture',
      ],
    },
    {
      step: '02',
      title: 'Database & Security Architecture',
      subtitle: 'PostgreSQL, RLS & Network Rules',
      icon: Database,
      description:
        'Designing PostgreSQL tables with strict constraints, setting up Supabase Row Level Security (RLS) policies, securing secrets in environment variables, and establishing zero-trust access controls.',
      deliverables: [
        'Supabase / PostgreSQL Schema',
        'Row Level Security Policies',
        'JWT & Webhook Verification',
        'Deduplication Constraints',
      ],
    },
    {
      step: '03',
      title: 'Full-Stack & Automation Engineering',
      subtitle: 'React, Express & n8n Workflow Pipelines',
      icon: Workflow,
      description:
        'Building responsive React/TypeScript interfaces, Express proxy microservices, and n8n AI workflows with Google Gemini LLM structured outputs and automated error catchers.',
      deliverables: [
        'React + TypeScript UI',
        'Express Webhook Proxies',
        'n8n Production Pipelines',
        'Structured Zod Schema Validation',
      ],
    },
    {
      step: '04',
      title: 'Testing, Telemetry & Deployment',
      subtitle: 'CI/CD, Monitoring & Live Deployment',
      icon: ShieldCheck,
      description:
        'Executing Postman payload verification, setting up correlation IDs, routing failure alerts to Telegram/Email, and deploying production builds to Vercel and cloud nodes.',
      deliverables: [
        'Payload & Endpoint Audits',
        'Telegram / Email Alert System',
        'Execution Log Auditing',
        'Vercel & Cloud Deployment',
      ],
    },
  ];

  return (
    <SectionContainer id="process">
      <SectionHeading
        tag="08 / Engineering Methodology"
        title="Development &amp; Automation Lifecycle"
        subtitle="A disciplined, engineering-first approach that turns requirements into high-performance web applications and automated workflows."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {steps.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={item.step}
              className="group bg-navy-800/30 border border-navy-700/50 hover:border-emerald-500/30 rounded-xl p-6 sm:p-7 transition-all duration-300 shadow-xl flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4 border-b border-navy-700/40 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-950/40 border border-emerald-900/40 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-mono text-xs font-bold text-emerald-400 block">
                        STEP {item.step}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        {item.subtitle}
                      </span>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-slate-600 hidden lg:block" />
                  )}
                </div>

                {/* Title & Description */}
                <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-emerald-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-5">
                  {item.description}
                </p>
              </div>

              {/* Deliverables Badges */}
              <div className="pt-3 border-t border-navy-700/30">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block mb-2 font-semibold">
                  Key Deliverables:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {item.deliverables.map((del) => (
                    <span
                      key={del}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-navy-900 text-slate-300 border border-navy-700/50"
                    >
                      {del}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </SectionContainer>
  );
};
