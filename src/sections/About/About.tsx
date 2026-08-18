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
    <SectionContainer id="about" className="py-16 border-b border-[var(--border-subtle)]">
      {/* ── Section Header ── */}
      <motion.div {...entrance()} className="max-w-3xl mb-12">
        <h2
          className="font-title text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)] mb-3"
        >
          About
        </h2>

        <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed max-w-xl font-sans">
          Who I am, what I specialize in, and how I build reliable software systems.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Direct Bio & Approach */}
        <motion.div {...entrance(0.08)} className="lg:col-span-7 space-y-4 text-sm sm:text-base leading-relaxed font-sans">
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
        <motion.div {...entrance(0.14)} className="lg:col-span-5 space-y-6">
          {/* Operational Snapshot */}
          <div className="bg-[var(--surface)] border border-[var(--border-subtle)] p-6 rounded-xl space-y-4 shadow-xs">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] border-b border-[var(--border-subtle)] pb-3">
              Operational Snapshot
            </h3>

            <div className="space-y-4 text-xs sm:text-sm font-sans">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[var(--text-muted)] font-mono block text-[10px] uppercase">Location</span>
                  <span className="text-[var(--text-primary)] font-semibold">Bukidnon, Philippines (GMT+8)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Target className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[var(--text-muted)] font-mono block text-[10px] uppercase">Target Roles</span>
                  <span className="text-[var(--text-primary)] font-semibold">Web / Mobile / Automation</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[var(--text-muted)] font-mono block text-[10px] uppercase">Availability</span>
                  <span className="text-[var(--text-primary)] font-semibold">Open to remote full-time &amp; contract</span>
                </div>
              </div>
            </div>
          </div>

          {/* Education Box */}
          <div className="bg-[var(--surface)] border border-[var(--border-subtle)] p-6 rounded-xl space-y-3 shadow-xs">
            <h3 className="text-[var(--text-primary)] font-mono text-xs font-bold uppercase tracking-wider border-b border-[var(--border-subtle)] pb-3 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[var(--accent)]" />
                Education
              </span>
              <span className="text-[10px] text-[var(--text-muted)]">BSIT</span>
            </h3>

            {educationList.map((edu) => (
              <div key={edu.id} className="space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-bold text-[var(--text-primary)] text-sm">{edu.institution}</h4>
                  <span className="text-[10px] font-mono font-semibold text-[var(--accent)]">
                    {edu.period}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-secondary)] font-sans">{edu.degree}</p>
                <span className="text-[11px] text-[var(--text-muted)] font-mono flex items-center gap-1">
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