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
        initial: { opacity: 0, y: 14 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true as const, margin: '-60px' },
        transition: { duration: 0.45, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
      };

  return (
    <SectionContainer id="experience" className="border-b-2 border-black dark:border-white py-[var(--section-space)]">
      {/* ── Section Header ── */}
      <motion.div {...entrance()} className="mb-12 grid max-w-none gap-5 md:grid-cols-12 md:items-end">
        <h2
          className="section-heading font-title text-[var(--text-primary)] font-black md:col-span-5 md:mb-0"
        >
          Experience
        </h2>

        <p className="body-copy text-[var(--text-secondary)] font-medium md:col-span-6 md:col-start-7">
          Practical IT operations, workstation diagnostics, system maintenance, and enterprise support.
        </p>
      </motion.div>

      {/* ── Editorial Experience Cards ── */}
      <div className="space-y-6">
        {experiences.map((exp, idx) => (
          <motion.div
            key={exp.id}
            {...entrance(idx * 0.06)}
            className="grid gap-8 border-2 border-black dark:border-white bg-[var(--surface)] p-6 sm:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] lg:grid-cols-12 lg:gap-10"
          >
            {/* Header: Role, Organization & Dates */}
            <div className="flex flex-col justify-between gap-5 lg:col-span-4 lg:border-r-2 lg:border-black lg:dark:border-white lg:pr-8">
              <div className="space-y-2">
                <h3 className="font-title text-xl font-black text-[var(--text-primary)] sm:text-2xl">
                  {exp.role}
                </h3>

                <div className="flex flex-wrap items-center gap-2.5 text-xs text-[var(--text-secondary)] font-mono font-bold">
                  <span className="flex items-center gap-1.5 text-[var(--text-primary)]">
                    <Building2 className="w-3.5 h-3.5 text-[var(--accent)]" strokeWidth={2.5} />
                    {exp.company}
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" strokeWidth={2.5} />
                    {exp.location}
                  </span>
                </div>
              </div>

              <div className="inline-flex w-fit shrink-0 items-center gap-1.5 border-2 border-black dark:border-white bg-[var(--surface-elevated)] px-3 py-1 font-mono text-xs font-bold text-[var(--text-primary)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                <Calendar className="w-3.5 h-3.5 text-[var(--accent)]" strokeWidth={2.5} />
                <span>{exp.period}</span>
              </div>
            </div>

            {/* Short Summary */}
            <div className="space-y-6 lg:col-span-8">
              <p className="body-copy text-[var(--text-secondary)] font-medium text-sm sm:text-base leading-relaxed">
                {exp.description}
              </p>

              {/* Key Contributions */}
              <div className="space-y-3 pt-3 border-t-2 border-black dark:border-white">
                <h4 className="font-mono text-xs font-black uppercase tracking-wider text-[var(--text-muted)]">
                  Key Responsibilities &amp; Operations
                </h4>
                <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
                  {exp.responsibilities.map((resp, i) => (
                    <div key={i} className="flex items-start gap-2.5 border border-black dark:border-white bg-[var(--surface-elevated)] p-3 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[1.5px_1.5px_0px_0px_rgba(255,255,255,1)] text-xs font-mono font-medium text-[var(--text-primary)]">
                      <span className="text-[var(--accent)] mt-0.5 font-black">›</span>
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

