import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Database, Send, Webhook, ZoomIn, X, ChevronRight } from 'lucide-react';
import { useSound } from '../../context/SoundContext';

interface WorkflowStep {
  id: string;
  label: string;
  category: 'Trigger' | 'Validation' | 'Database' | 'Notification' | 'Reporting';
  desc: string;
  image: string;
  caption: string;
  icon: React.ElementType;
}

const steps: WorkflowStep[] = [
  {
    id: 'webhook',
    label: 'Webhook Ingestion & Order Processing',
    category: 'Trigger',
    desc: 'Receives signed HTTP POST payloads from TikTok Shop Open API on order creation and begins validation.',
    image: 'img/01-Order Processing.png',
    caption: 'Pipeline 01: Event-driven webhook receiver, order payload parser, and dispatcher.',
    icon: Webhook,
  },
  {
    id: 'validation',
    label: 'Customer Triage & Refund Validation',
    category: 'Validation',
    desc: 'Validates line items, evaluates refund requests against policy rules, and checks customer history.',
    image: 'img/02 - AI Customer Support & Refund Triage.png',
    caption: 'Pipeline 02: Automated customer order evaluation, dispute checks, and refund validation.',
    icon: ShieldCheck,
  },
  {
    id: 'inventory',
    label: 'Inventory & Supplier Synchronization',
    category: 'Database',
    desc: 'Performs idempotent duplicate checks and synchronizes real-time stock levels with warehouse suppliers.',
    image: 'img/03 - Inventory & Supplier Synchronization.png',
    caption: 'Pipeline 03: Idempotent supplier sync, multi-warehouse stock deduction, and inventory alerts.',
    icon: Database,
  },
  {
    id: 'content',
    label: 'SKU & Content Automation Factory',
    category: 'Database',
    desc: 'Extracts product catalog data, formats multi-channel SKU variants, and queues content assets.',
    image: 'img/04 - AI Short-Form Content Factory.png',
    caption: 'Pipeline 04: Product metadata enrichment, SKU formatting, and marketing asset queueing.',
    icon: CheckCircle2,
  },
  {
    id: 'reporting',
    label: 'Operations & Telegram Operator Alerts',
    category: 'Reporting',
    desc: 'Dispatches instant formatted summaries to Telegram and compiles daily revenue & fulfillment logs.',
    image: 'img/05 - Daily Operations Report.png',
    caption: 'Pipeline 05: Real-time Telegram operator dispatch and automated daily reconciliation reports.',
    icon: Send,
  },
];

export const AutomationShowcase: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const { playHover, playClick } = useSound();

  const currentStep = steps[activeStep];

  return (
    <div className="bg-[#FFFFFF] dark:bg-[#11151A] border border-[#DCE1E7] dark:border-[#242B33] rounded-xl p-5 sm:p-7 shadow-xs">
      {/* Top Studio Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-[#DCE1E7] dark:border-[#242B33]">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#111318] dark:text-[#F4F6F8]">
            n8n Automation Architecture
          </span>
          <span className="text-[#78828D] dark:text-[#7F8994] font-mono text-xs">&bull;</span>
          <span className="text-[11px] font-mono text-[#2563EB] dark:text-[#60A5FA] font-medium">
            5 Connected Workflows
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-[#5F6873] dark:text-[#A7B0BA]">
          <span>Select step to inspect diagram</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Interactive Pipeline Step Selector */}
        <div className="lg:col-span-5 space-y-2">
          <p className="text-[10px] font-mono font-bold uppercase tracking-[0.14em] text-[#78828D] dark:text-[#7F8994] mb-3">
            Execution Flow Sequence ({activeStep + 1} of {steps.length})
          </p>

          <div className="space-y-2">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isSelected = activeStep === idx;

              return (
                <button
                  key={step.id}
                  type="button"
                  onMouseEnter={playHover}
                  onClick={() => {
                    playClick();
                    setActiveStep(idx);
                  }}
                  className={`w-full text-left p-3 rounded-lg border transition-all duration-150 flex items-start gap-3 ${
                    isSelected
                      ? 'bg-[#F1F3F5] dark:bg-[#171C22] border-[#2563EB] dark:border-[#60A5FA] shadow-xs'
                      : 'bg-transparent border-[#DCE1E7]/70 dark:border-[#242B33]/70 hover:border-[#C5CCD5] dark:hover:border-[#343D48]'
                  }`}
                >
                  <div
                    className={`p-1.5 rounded-md border shrink-0 mt-0.5 ${
                      isSelected
                        ? 'bg-[#2563EB]/10 border-[#2563EB]/30 text-[#2563EB] dark:text-[#60A5FA]'
                        : 'bg-[#F7F8FA] dark:bg-[#0B0D10] border-[#DCE1E7] dark:border-[#242B33] text-[#5F6873] dark:text-[#A7B0BA]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-bold text-[#111318] dark:text-[#F4F6F8] truncate">
                        {idx + 1}. {step.label}
                      </span>
                      <span className="text-[9px] font-mono uppercase text-[#78828D] dark:text-[#7F8994] shrink-0">
                        {step.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#5F6873] dark:text-[#A7B0BA] font-sans leading-snug mt-1 line-clamp-2">
                      {step.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Dynamic Workflow Canvas Display */}
        <div className="lg:col-span-7 flex flex-col space-y-3">
          <div className="flex items-center justify-between text-[10px] font-mono uppercase text-[#5F6873] dark:text-[#A7B0BA]">
            <span className="font-semibold text-[#111318] dark:text-[#F4F6F8]">
              {currentStep.label}
            </span>
            <button
              type="button"
              onClick={() => {
                playClick();
                setIsZoomed(true);
              }}
              onMouseEnter={playHover}
              className="inline-flex items-center gap-1 text-[#2563EB] dark:text-[#60A5FA] hover:underline"
            >
              <ZoomIn className="w-3 h-3" />
              <span>Expand Preview</span>
            </button>
          </div>

          <div
            onClick={() => {
              playClick();
              setIsZoomed(true);
            }}
            className="group relative rounded-lg overflow-hidden border border-[#DCE1E7] dark:border-[#242B33] bg-[#F7F8FA] dark:bg-[#0B0D10] cursor-pointer shadow-xs min-h-[220px] flex items-center justify-center"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentStep.image}
                src={`/${currentStep.image}`}
                alt={currentStep.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full h-auto max-h-[340px] object-contain block group-hover:scale-[1.01] transition-transform duration-200"
              />
            </AnimatePresence>

            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-[#111318]/90 text-white text-xs font-mono px-3 py-1.5 rounded-md backdrop-blur-xs flex items-center gap-1.5">
                <ZoomIn className="w-3.5 h-3.5" />
                Click to inspect full canvas
              </span>
            </div>
          </div>

          {/* Caption & Navigation Controls */}
          <div className="p-3 bg-[#F1F3F5] dark:bg-[#171C22] border border-[#DCE1E7] dark:border-[#242B33] rounded-lg text-xs font-mono flex items-center justify-between gap-3">
            <span className="text-[#5F6873] dark:text-[#A7B0BA] text-[11px] truncate">
              {currentStep.caption}
            </span>
            <button
              type="button"
              onClick={() => {
                playClick();
                setActiveStep((prev) => (prev + 1) % steps.length);
              }}
              className="text-[#2563EB] dark:text-[#60A5FA] hover:underline flex items-center gap-1 text-[11px] font-bold shrink-0"
            >
              <span>Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Zoom Lightbox */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs"
            onClick={() => setIsZoomed(false)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="relative max-w-5xl w-full bg-[#FFFFFF] dark:bg-[#11151A] border border-[#DCE1E7] dark:border-[#242B33] rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 py-3 border-b border-[#DCE1E7] dark:border-[#242B33] bg-[#F1F3F5] dark:bg-[#171C22]">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#111318] dark:text-[#F4F6F8]">
                    {currentStep.label}
                  </span>
                  <span className="text-[10px] font-mono text-[#78828D] dark:text-[#7F8994]">
                    ({activeStep + 1} of {steps.length})
                  </span>
                </div>
                <button
                  onClick={() => setIsZoomed(false)}
                  className="p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/5 text-[#5F6873] dark:text-[#A7B0BA]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 max-h-[80vh] overflow-auto flex items-center justify-center bg-[#F7F8FA] dark:bg-[#0B0D10]">
                <img
                  src={`/${currentStep.image}`}
                  alt={currentStep.label}
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>

              <div className="px-5 py-2.5 border-t border-[#DCE1E7] dark:border-[#242B33] bg-[#F1F3F5] dark:bg-[#171C22] flex items-center justify-between text-xs font-mono text-[#5F6873] dark:text-[#A7B0BA]">
                <span>{currentStep.caption}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveStep((prev) => (prev === 0 ? steps.length - 1 : prev - 1))}
                    className="px-2.5 py-1 rounded bg-[#FFFFFF] dark:bg-[#11151A] border border-[#DCE1E7] dark:border-[#242B33] hover:text-[#2563EB] dark:hover:text-[#60A5FA]"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
                    className="px-2.5 py-1 rounded bg-[#2563EB] text-white hover:bg-[#1D4ED8]"
                  >
                    Next
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
