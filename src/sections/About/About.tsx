import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, Target, Clock, GraduationCap } from 'lucide-react';
import { SectionContainer } from '../../components/layout/SectionContainer';
import { educationList } from '../../data/education';

export const About: React.FC = () => {
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
    <SectionContainer id="about" className="border-b border-[var(--border-subtle)] py-[var(--section-space)]">
      {/* ── Section Header ── */}
      <motion.div {...entrance()} className="mb-12 grid max-w-none gap-5 md:grid-cols-12 md:items-end">
        <h2
          className="section-heading font-title text-[var(--text-primary)] md:col-span-5 md:mb-0"
        >
          About
        </h2>

        <p className="body-copy text-[var(--text-secondary)] md:col-span-6 md:col-start-7">
          Who I am, what I specialize in, and how I build reliable software systems.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 items-start gap-14 border-t border-[var(--border-subtle)] pt-10 lg:grid-cols-12 lg:gap-20">
        {/* Left Column: Direct Bio & Approach */}
        <motion.div {...entrance(0.08)} className="body-copy space-y-5 lg:col-span-7">
          <p className="font-medium text-[var(--text-primary)]">
            I’m a software developer based in Bukidnon, Philippines. I design and build end-to-end applications spanning web interfaces, mobile apps with React Native, and workflow automations with n8n and Supabase.
          </p>

          <p className="text-[var(--text-secondary)]">
            My work focuses on real operational systems: multi-account OAuth token management, serverless inbox scanning, idempotent webhook consumers, STAR-method AI interview evaluators, and transactional inventory deductions.
          </p>

          <p className="text-[var(--text-secondary)]">
            I design clean relational data models and API contracts first, ensuring resilience, maintainability, and testability before assembling user interfaces.
          </p>
        </motion.div>

        {/* Right Column: Operational Snapshot & Education */}
        <motion.div {...entrance(0.14)} className="space-y-10 lg:col-span-5">
          {/* Operational Snapshot */}
          <div className="space-y-5 border-t border-[var(--border)] pt-5">
            <h3 className="border-b border-[var(--border-subtle)] pb-4 font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
              Operational Snapshot
            </h3>

            <div className="space-y-4 text-xs sm:text-sm font-sans">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-mono text-xs uppercase text-[var(--text-muted)]">Location</span>
                  <span className="text-[var(--text-primary)] font-semibold">Bukidnon, Philippines</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Target className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-mono text-xs uppercase text-[var(--text-muted)]">Target Roles</span>
                  <span className="text-[var(--text-primary)] font-semibold">Web / Mobile / Automation</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-mono text-xs uppercase text-[var(--text-muted)]">Availability</span>
                  <span className="text-[var(--text-primary)] font-semibold">Open to remote full-time &amp; contract</span>
                </div>
              </div>
            </div>
          </div>

          {/* Education Box */}
          <div className="space-y-4 border-t border-[var(--border)] pt-5">
            <h3 className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4 font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
              <span className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[var(--accent)]" />
                Education
              </span>
              <span className="text-xs text-[var(--text-muted)]">BSIT</span>
            </h3>

            {educationList.map((edu) => (
              <div key={edu.id} className="space-y-1">
                <div className="flex min-w-0 flex-col items-start gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
                  <h4 className="break-safe text-sm font-semibold text-[var(--text-primary)]">{edu.institution}</h4>
                  <span className="font-mono text-xs font-semibold text-[var(--accent)]">
                    {edu.period}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] font-sans">{edu.degree}</p>
                <span className="flex items-center gap-1 font-mono text-xs text-[var(--text-muted)]">
                  <MapPin className="w-3 h-3 text-[var(--accent)]" /> {edu.location}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  );
};

