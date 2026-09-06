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
    <SectionContainer id="experience" className="py-[var(--section-space)]">
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
            className="group relative grid gap-8 rounded-3xl border-0 bg-[var(--surface)] p-6 sm:p-8 shadow-xl shadow-black/5 dark:shadow-2xl dark:shadow-black/50 hover:-translate-y-1 hover:shadow-2xl dark:hover:shadow-black/70 transition-all duration-300 lg:grid-cols-12 lg:gap-10"
          >
            {/* Header: Role, Organization & Dates */}
            <div className="flex flex-col justify-between gap-5 lg:col-span-4 lg:pr-8">
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

              <div className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border-0 bg-[var(--surface-elevated)] px-4 py-1.5 font-mono text-xs font-bold text-[var(--text-primary)] shadow-sm">
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
              <div className="space-y-3 pt-2">
                <h4 className="font-mono text-xs font-black uppercase tracking-wider text-[var(--text-muted)]">
                  Key Responsibilities &amp; Operations
                </h4>
                <div className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
                  {exp.responsibilities.map((resp, i) => (
                    <div key={i} className="flex items-start gap-2.5 rounded-2xl border-0 bg-[var(--background)] p-3.5 shadow-sm text-xs font-mono font-medium text-[var(--text-primary)]">
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

