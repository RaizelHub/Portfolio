import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface WorkflowStep {
  label: string;
  type: 'source' | 'process' | 'check' | 'db' | 'output';
}

const workflowSteps: WorkflowStep[] = [
  { label: 'TikTok Shop Order', type: 'source' },
  { label: 'Webhook Ingestion', type: 'process' },
  { label: 'Validate Payload', type: 'check' },
  { label: 'Duplicate Check', type: 'check' },
  { label: 'Process & Fulfill', type: 'process' },
  { label: 'Supabase (PostgreSQL)', type: 'db' },
  { label: 'Telegram Notification', type: 'output' },
];

const stepStyle: Record<WorkflowStep['type'], string> = {
  source:
    'bg-[#C7462D]/10 border-[#C7462D]/35 text-[#C7462D] dark:bg-[#E25235]/10 dark:border-[#E25235]/35 dark:text-[#E25235]',
  process:
    'bg-[#EFEBE4] dark:bg-[#1D1C18] border-[#D5D0C7] dark:border-[#34312B] text-[#171717] dark:text-[#F2EEE6]',
  check:
    'bg-[#D97706]/10 border-[#D97706]/30 text-[#D97706]',
  db:
    'bg-[#059669]/10 border-[#059669]/30 text-[#059669]',
  output:
    'bg-[#2563EB]/10 border-[#2563EB]/30 text-[#2563EB]',
};

export const AutomationShowcase: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
      {/* ── Workflow pipeline diagram ── */}
      <div className="flex-shrink-0 w-full lg:w-auto">
        <p className="text-[10px] font-mono uppercase tracking-widest text-[#6B6862] dark:text-[#A9A39A] mb-4">
          Workflow Pipeline
        </p>
        <div className="space-y-0">
          {workflowSteps.map((step, i) => (
            <div key={step.label}>
              <motion.div
                initial={prefersReducedMotion ? {} : { opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={
                  prefersReducedMotion ? {} : { duration: 0.35, delay: i * 0.07 }
                }
                className={`px-4 py-2.5 rounded-lg border text-[11px] font-mono font-medium tracking-wide
                  ${stepStyle[step.type]}`}
              >
                {step.label}
              </motion.div>

              {/* Connector line */}
              {i < workflowSteps.length - 1 && (
                <div className="flex flex-col items-center py-[3px]">
                  <div className="w-px h-3 bg-[#D5D0C7] dark:bg-[#34312B]" />
                  <div className="w-1 h-1 rounded-full bg-[#D5D0C7] dark:bg-[#34312B]" />
                  <div className="w-px h-3 bg-[#D5D0C7] dark:bg-[#34312B]" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── n8n workflow screenshot ── */}
      <motion.div
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={prefersReducedMotion ? {} : { duration: 0.5, delay: 0.2 }}
        className="flex-1 w-full"
      >
        <p className="text-[10px] font-mono uppercase tracking-widest text-[#6B6862] dark:text-[#A9A39A] mb-4">
          n8n Workflow
        </p>
        <div className="rounded-xl overflow-hidden border border-[#D5D0C7] dark:border-[#34312B] shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.32)]">
          <img
            src="/img/01-Order Processing.png"
            alt="TikTok Shop Order Automation — n8n workflow screenshot"
            loading="lazy"
            decoding="async"
            className="w-full h-auto object-cover block"
          />
        </div>
      </motion.div>
    </div>
  );
};
