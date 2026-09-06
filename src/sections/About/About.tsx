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
        initial: { opacity: 0, y: 24, scale: 0.98 },
        whileInView: { opacity: 1, y: 0, scale: 1 },
        viewport: { once: true as const, margin: '-60px' },
        transition: { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
      };

  return (
    <SectionContainer id="about" className="py-[var(--section-space)]">
      {/* ── Section Header ── */}
      <motion.div {...entrance()} className="mb-12 grid max-w-none gap-5 md:grid-cols-12 md:items-end">
        <h2
          className="section-heading font-title text-[var(--text-primary)] font-black md:col-span-5 md:mb-0"
        >
          About
        </h2>

        <p className="body-copy text-[var(--text-secondary)] font-medium md:col-span-6 md:col-start-7">
          Who I am, what I specialize in, and how I build reliable software systems.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
        {/* Left Column: Direct Bio & Approach */}
        <motion.div {...entrance(0.08)} className="group relative rounded-3xl border-0 bg-[var(--surface)] p-6 sm:p-8 shadow-xl shadow-black/5 dark:shadow-2xl dark:shadow-black/50 hover:-translate-y-1 hover:shadow-2xl dark:hover:shadow-black/70 transition-all duration-300 body-copy space-y-5 lg:col-span-7">
          <p className="font-bold text-base sm:text-lg text-[var(--text-primary)] leading-relaxed">
            I’m a full-stack developer based in Bukidnon, Philippines. I design and build end-to-end applications spanning web interfaces, mobile apps with React Native, and workflow automations with n8n and Supabase.
          </p>

          <p className="text-[var(--text-secondary)] font-medium leading-relaxed">
            My work focuses on real operational systems: multi-account OAuth token management, serverless inbox scanning, idempotent webhook consumers, STAR-method AI interview evaluators, and transactional inventory deductions.
          </p>

          <p className="text-[var(--text-secondary)] font-medium leading-relaxed">
            I design clean relational data models and API contracts first, ensuring resilience, maintainability, and testability before assembling user interfaces.
          </p>
        </motion.div>

        {/* Right Column: Operational Snapshot & Education */}
        <motion.div {...entrance(0.14)} className="space-y-6 lg:col-span-5">
          {/* Operational Snapshot */}
          <div className="group relative rounded-3xl border-0 bg-[var(--surface)] p-6 shadow-xl shadow-black/5 dark:shadow-2xl dark:shadow-black/50 hover:-translate-y-1 hover:shadow-2xl dark:hover:shadow-black/70 transition-all duration-300 space-y-4">
            <h3 className="font-mono text-xs font-black uppercase tracking-wider text-[var(--text-primary)] pb-1">
              Operational Snapshot
            </h3>

            <div className="space-y-3 text-xs sm:text-sm font-sans">
              <div className="flex items-start gap-3 rounded-2xl border-0 bg-[var(--background)] p-3 shadow-sm">
                <MapPin className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" strokeWidth={2.5} />
                <div>
                  <span className="block font-mono text-[10px] font-bold uppercase text-[var(--text-muted)]">Location</span>
                  <span className="text-[var(--text-primary)] font-bold text-xs">Bukidnon, Philippines</span>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border-0 bg-[var(--background)] p-3 shadow-sm">
                <Target className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" strokeWidth={2.5} />
                <div>
                  <span className="block font-mono text-[10px] font-bold uppercase text-[var(--text-muted)]">Target Roles</span>
                  <span className="text-[var(--text-primary)] font-bold text-xs">Full-Stack Dev &bull; AI Automation Specialist</span>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border-0 bg-[var(--background)] p-3 shadow-sm">
                <Clock className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" strokeWidth={2.5} />
                <div>
                  <span className="block font-mono text-[10px] font-bold uppercase text-[var(--text-muted)]">Availability</span>
                  <span className="text-[var(--text-primary)] font-bold text-xs">Open to remote full-time &amp; contract</span>
                </div>
              </div>
            </div>
          </div>

          {/* Education Box */}
          <div className="rounded-3xl border-0 bg-[var(--surface)] p-6 shadow-xl shadow-black/5 dark:shadow-2xl dark:shadow-black/50 space-y-4">
            <h3 className="flex items-center justify-between pb-1 font-mono text-xs font-black uppercase tracking-wider text-[var(--text-primary)]">
              <span className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[var(--accent)]" strokeWidth={2.5} />
                Education
              </span>
              <span className="rounded-full border-0 bg-[var(--surface-elevated)] px-3 py-1 text-xs font-bold text-[var(--text-primary)] shadow-sm">BSIT</span>
            </h3>

            {educationList.map((edu) => (
              <div key={edu.id} className="space-y-1.5 rounded-2xl border-0 bg-[var(--background)] p-3.5 shadow-sm">
                <div className="flex min-w-0 flex-col items-start gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
                  <h4 className="break-safe font-title text-sm font-black text-[var(--text-primary)]">{edu.institution}</h4>
                  <span className="font-mono text-xs font-bold text-[var(--accent)]">
                    {edu.period}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] font-mono font-medium">{edu.degree}</p>
                <span className="flex items-center gap-1 font-mono text-xs text-[var(--text-muted)] font-bold">
                  <MapPin className="w-3 h-3 text-[var(--accent)]" strokeWidth={2.5} /> {edu.location}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  );
};

