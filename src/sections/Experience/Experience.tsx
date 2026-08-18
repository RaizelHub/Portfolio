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
    <SectionContainer id="experience" className="py-16 border-b border-[var(--border-subtle)]">
      {/* ── Section Header ── */}
      <motion.div {...entrance()} className="max-w-3xl mb-12">
        <h2
          className="font-title text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] mb-3"
        >
          Experience
        </h2>

        <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-xl font-sans">
          Practical IT operations, workstation diagnostics, system maintenance, and enterprise support.
        </p>
      </motion.div>

      {/* ── Editorial Experience Cards ── */}
      <div className="space-y-6">
        {experiences.map((exp, idx) => (
          <motion.div
            key={exp.id}
            {...entrance(idx * 0.06)}
            className="bg-[var(--surface)] border border-[var(--border-subtle)] rounded-xl p-6 sm:p-8 shadow-xs"
          >
            {/* Header: Role, Organization & Dates */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[var(--border-subtle)] pb-5 mb-5">
              <div className="space-y-1">
                <h3 className="font-sans text-lg sm:text-xl font-bold text-[var(--text-primary)]">
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

              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-md font-mono text-xs text-[var(--text-primary)] shrink-0">
                <Calendar className="w-3 h-3 text-[var(--accent)]" />
                <span>{exp.period}</span>
              </div>
            </div>

            {/* Short Summary */}
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5 font-sans">
              {exp.description}
            </p>

            {/* Key Contributions */}
            <div className="space-y-2.5">
              <h4 className="font-mono text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-semibold">
                Key Responsibilities &amp; Operations
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {exp.responsibilities.map((resp, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-[var(--text-primary)] font-sans">
                    <span className="text-[var(--accent)] mt-0.5 font-bold">›</span>
                    <span>{resp}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionContainer>
  );
};
