import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Calendar, MapPin, Building2 } from 'lucide-react';
import { SectionContainer } from '../../components/layout/SectionContainer';
import { experiences } from '../../data/experience';

export const Experience: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  const entrance = (delay = 0) =>
    prefersReducedMotion
      ? {}
      : {
        initial: { opacity: 0, y: 24, scale: 0.98 },
        whileInView: { opacity: 1, y: 0, scale: 1 },
        viewport: { once: true as const, margin: '-60px' },
        transition: { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
      };

  return (
    <SectionContainer id="experience" className="py-6 sm:py-8 border-b-2 border-neutral-300 dark:border-neutral-700">
      {/* ── Section Header ── */}
      <motion.div {...entrance()} className="mb-6 grid max-w-none gap-3 md:grid-cols-12 md:items-end">
        <div className="md:col-span-5">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="flex h-5 w-5 items-center justify-center rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-700">
              <Building2 className="h-3 w-3" />
            </div>
            <span className="font-title text-xs font-bold tracking-wider uppercase text-neutral-900 dark:text-white">
              Career Track
            </span>
          </div>
          <h2 className="font-title text-xl sm:text-2xl font-black tracking-tight text-neutral-900 dark:text-white leading-[1.1]">
            Experience
          </h2>
        </div>

        <p className="text-xs text-neutral-600 dark:text-neutral-300 font-normal leading-relaxed md:col-span-6 md:col-start-7">
          Practical IT operations, workstation diagnostics, system maintenance, and enterprise support.
        </p>
      </motion.div>

      {/* ── Editorial Experience Cards ── */}
      <div className="space-y-4">
        {experiences.map((exp, idx) => (
          <motion.div
            key={exp.id}
            {...entrance(idx * 0.06)}
            className="group relative grid gap-5 rounded-2xl border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#161822] p-4 sm:p-5 shadow-xs hover:-translate-y-0.5 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-200 lg:grid-cols-12 lg:gap-8"
          >
            {/* Header: Role, Organization & Dates */}
            <div className="flex flex-col justify-between gap-3 lg:col-span-4 lg:pr-4">
              <div className="space-y-1.5">
                <h3 className="font-title text-sm sm:text-base font-bold text-neutral-900 dark:text-white">
                  {exp.role}
                </h3>

                <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400 font-mono font-medium">
                  <span className="flex items-center gap-1 text-neutral-900 dark:text-white font-semibold">
                    <Building2 className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300" strokeWidth={2.5} />
                    {exp.company}
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" strokeWidth={2.5} />
                    {exp.location}
                  </span>
                </div>
              </div>

              <div className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 px-3 py-0.5 font-mono text-[10px] font-bold text-neutral-800 dark:text-neutral-200">
                <Calendar className="w-3 h-3 text-neutral-700 dark:text-neutral-300" strokeWidth={2.5} />
                <span>{exp.period}</span>
              </div>
            </div>

            {/* Short Summary */}
            <div className="space-y-4 lg:col-span-8">
              <p className="text-xs text-neutral-600 dark:text-neutral-300 font-normal leading-relaxed">
                {exp.description}
              </p>

              {/* Key Contributions */}
              <div className="space-y-2 pt-1">
                <h4 className="font-title text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
                  Key Responsibilities &amp; Operations
                </h4>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                  {exp.responsibilities.map((resp, i) => (
                    <div key={i} className="flex items-start gap-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/80 p-2.5 text-xs font-sans text-neutral-700 dark:text-neutral-300 leading-relaxed">
                      <span className="text-neutral-900 dark:text-white mt-0.5 font-bold">›</span>
                      <span>{resp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  );
};

