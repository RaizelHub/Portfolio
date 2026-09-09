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
    <SectionContainer id="about" className="py-6 sm:py-8 border-b-2 border-neutral-300 dark:border-neutral-700">
      {/* ── Section Header ── */}
      <motion.div {...entrance()} className="mb-6 grid max-w-none gap-3 md:grid-cols-12 md:items-end">
        <div className="md:col-span-5">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="flex h-5 w-5 items-center justify-center rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-700">
              <GraduationCap className="h-3 w-3" />
            </div>
            <span className="font-title text-xs font-bold tracking-wider uppercase text-neutral-900 dark:text-white">
              Background &amp; Profile
            </span>
          </div>
          <h2 className="font-title text-xl sm:text-2xl font-black tracking-tight text-neutral-900 dark:text-white leading-[1.1]">
            About
          </h2>
        </div>

        <p className="text-xs text-neutral-600 dark:text-neutral-300 font-normal leading-relaxed md:col-span-6 md:col-start-7">
          Who I am, what I specialize in, and how I build reliable software systems.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-12 lg:gap-6">
        {/* Left Column: Direct Bio & Approach */}
        <motion.div {...entrance(0.08)} className="group relative rounded-2xl border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#161822] p-4 sm:p-5 shadow-xs hover:-translate-y-0.5 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-200 space-y-3 lg:col-span-7">
          <p className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white leading-relaxed">
            I’m a full-stack developer based in Bukidnon, Philippines. I design and build end-to-end applications spanning web interfaces, mobile apps with React Native, and workflow automations with n8n and Supabase.
          </p>

          <p className="text-xs text-neutral-600 dark:text-neutral-300 font-normal leading-relaxed">
            My work focuses on real operational systems: multi-account OAuth token management, serverless inbox scanning, idempotent webhook consumers, STAR-method AI interview evaluators, and transactional inventory deductions.
          </p>

          <p className="text-xs text-neutral-600 dark:text-neutral-300 font-normal leading-relaxed">
            I design clean relational data models and API contracts first, ensuring resilience, maintainability, and testability before assembling user interfaces.
          </p>
        </motion.div>

        {/* Right Column: Operational Snapshot & Education */}
        <motion.div {...entrance(0.14)} className="space-y-4 lg:col-span-5">
          {/* Operational Snapshot */}
          <div className="rounded-2xl border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#161822] p-4 shadow-xs space-y-3">
            <h3 className="font-title text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white pb-0.5">
              Operational Snapshot
            </h3>

            <div className="space-y-2 text-xs font-sans">
              <div className="flex items-start gap-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/80 p-2.5">
                <MapPin className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300 shrink-0 mt-0.5" strokeWidth={2.5} />
                <div>
                  <span className="block font-mono text-[10px] font-bold uppercase text-neutral-500 dark:text-neutral-400">Location</span>
                  <span className="text-neutral-900 dark:text-white font-semibold text-xs">Bukidnon, Philippines</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/80 p-2.5">
                <Target className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300 shrink-0 mt-0.5" strokeWidth={2.5} />
                <div>
                  <span className="block font-mono text-[10px] font-bold uppercase text-neutral-500 dark:text-neutral-400">Target Roles</span>
                  <span className="text-neutral-900 dark:text-white font-semibold text-xs">Full-Stack Dev &bull; AI Automation Specialist</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/80 p-2.5">
                <Clock className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300 shrink-0 mt-0.5" strokeWidth={2.5} />
                <div>
                  <span className="block font-mono text-[10px] font-bold uppercase text-neutral-500 dark:text-neutral-400">Availability</span>
                  <span className="text-neutral-900 dark:text-white font-semibold text-xs">Open to remote full-time &amp; contract</span>
                </div>
              </div>
            </div>
          </div>

          {/* Education Box */}
          <div className="rounded-2xl border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#161822] p-4 shadow-xs space-y-3">
            <h3 className="flex items-center justify-between pb-0.5 font-title text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-white">
              <span className="flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-neutral-700 dark:text-neutral-300" strokeWidth={2.5} />
                Education
              </span>
              <span className="rounded-full border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-0.5 text-[10px] font-mono font-bold text-neutral-800 dark:text-neutral-200">BSIT</span>
            </h3>

            {educationList.map((edu) => (
              <div key={edu.id} className="space-y-1 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/80 p-2.5">
                <div className="flex min-w-0 flex-col items-start gap-0.5 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
                  <h4 className="break-safe font-title text-xs sm:text-sm font-bold text-neutral-900 dark:text-white">{edu.institution}</h4>
                  <span className="font-mono text-[10px] font-bold text-neutral-900 dark:text-neutral-200 bg-neutral-200/60 dark:bg-neutral-800 px-2 py-0.5 rounded-md">
                    {edu.period}
                  </span>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 font-sans">{edu.degree}</p>
                <span className="flex items-center gap-1 font-mono text-[10px] text-neutral-500 dark:text-neutral-400 font-medium">
                  <MapPin className="w-3 h-3 text-neutral-500" strokeWidth={2.5} /> {edu.location}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </SectionContainer>
  );
};

