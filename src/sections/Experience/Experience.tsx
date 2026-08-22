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
    <SectionContainer id="experience" className="border-b border-[var(--border-subtle)] py-[var(--section-space)]">
      {/* ── Section Header ── */}
      <motion.div {...entrance()} className="mb-12 grid max-w-none gap-5 md:grid-cols-12 md:items-end">
        <h2
          className="section-heading font-title text-[var(--text-primary)] md:col-span-5 md:mb-0"
        >
          Experience
        </h2>

        <p className="body-copy text-[var(--text-secondary)] md:col-span-6 md:col-start-7">
          Practical IT operations, workstation diagnostics, system maintenance, and enterprise support.
        </p>
      </motion.div>

      {/* ── Editorial Experience Cards ── */}
      <div className="border-t border-[var(--border-subtle)]">
        {experiences.map((exp, idx) => (
          <motion.div
            key={exp.id}
            {...entrance(idx * 0.06)}
            className="grid gap-8 border-b border-[var(--border-subtle)] py-10 lg:grid-cols-12 lg:gap-12"
          >
            {/* Header: Role, Organization & Dates */}
            <div className="flex flex-col gap-5 lg:col-span-4">
              <div className="space-y-1">
                <h3 className="font-title text-lg font-semibold text-[var(--text-primary)] sm:text-xl">
                  {exp.role}
                </h3>

                <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--text-secondary)] font-sans">
                  <span className="flex items-center gap-1.5 font-medium text-[var(--text-primary)]">
                    <Building2 className="w-3.5 h-3.5 text-[var(--accent)]" />
                    {exp.company}
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    {exp.location}
                  </span>
                </div>
              </div>

              <div className="inline-flex w-fit shrink-0 items-center gap-1.5 border-l border-[var(--accent)] pl-3 font-mono text-xs text-[var(--text-primary)]">
                <Calendar className="w-3 h-3 text-[var(--accent)]" />
                <span>{exp.period}</span>
              </div>
            </div>

            {/* Short Summary */}
            <div className="space-y-6 lg:col-span-8">
              <p className="body-copy text-[var(--text-secondary)]">
                {exp.description}
              </p>

              {/* Key Contributions */}
              <div className="space-y-3">
              <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                Key Responsibilities &amp; Operations
              </h4>
              <div className="grid grid-cols-1 gap-x-8 gap-y-3 md:grid-cols-2">
                {exp.responsibilities.map((resp, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-[var(--text-primary)] font-sans">
                    <span className="text-[var(--accent)] mt-0.5 font-bold">›</span>
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
