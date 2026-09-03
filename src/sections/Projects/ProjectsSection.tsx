import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  ExternalLink,
  Github,
} from 'lucide-react';
import { SectionContainer } from '../../components/layout/SectionContainer';
import { MoreProjectCard } from '../../components/projects/MoreProjectCard';
import { ProjectLikeButton } from '../../components/ui/ProjectLikeButton';
import { projects } from '../../data/projects';
import { useSound } from '../../context/SoundContext';

/* ─── Secondary projects for the "More Projects" grid ─── */
const moreProjects = [
  {
    id: 'point-of-sale-system',
    shortTitle: 'POS System',
    subtitle: 'Retail Checkout Platform',
    description:
      'Web-based Point of Sale with barcode lookup, automatic inventory deduction, shift cash auditing, and real-time multi-terminal sync via Socket.io.',
    category: 'WEB',
    technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    slug: 'point-of-sale-system',
  },
  {
    id: 'smartpipe',
    shortTitle: 'Smart Pipe',
    subtitle: 'IoT Telemetry & Control',
    description:
      'Telemetry and control system using ESP32 sensors to measure flow, pH, and turbidity with automated leak alerts and remote valve switching.',
    category: 'AUTOMATION',
    technologies: ['ESP32', 'Firebase', 'MQTT', 'React', 'Flutter'],
    slug: 'smartpipe',
  },
  {
    id: 'restaurant-ai-ops',
    shortTitle: 'Restaurant AI Ops',
    subtitle: 'Enterprise AI & Real-Time Alerting',
    description:
      'Event-driven restaurant operations platform monitoring kitchen delay thresholds, analyzing review sentiment with Gemini/OpenAI, and dispatching WhatsApp alerts.',
    category: 'WEB / AI',
    technologies: ['React 19', 'Supabase', 'Deno', 'WhatsApp API', 'Gemini AI'],
    slug: 'restaurant-ai-ops',
  },
  {
    id: 'omniflow-ai',
    shortTitle: 'OmniFlow AI',
    subtitle: 'Lead Intake Automation',
    description:
      'Automated lead intake and qualification pipeline connecting webhooks to Gemini AI classification, scoring, and Supabase PostgreSQL persistence.',
    category: 'AUTOMATION',
    technologies: ['n8n', 'Supabase', 'Gemini AI', 'React', 'Webhooks'],
    slug: 'omniflow-ai',
  },
];

export const ProjectsSection: React.FC = () => {
  const { playHover, playClick } = useSound();
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
    <SectionContainer
      id="projects"
      className="border-b-2 border-black dark:border-white py-[var(--section-space)]"
    >
      {/* ══════════════════════════════════════════════════════════════
          1. SECTION HEADER — COMPACT, EDITORIAL INTRO
      ══════════════════════════════════════════════════════════════ */}
      <div className="mb-10 flex flex-col gap-5 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
        <motion.div {...entrance()} className="max-w-2xl space-y-2.5">
          <div className="flex items-center gap-2">
            <span className="border-2 border-black dark:border-white bg-[var(--surface)] px-2.5 py-0.5 font-mono text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-primary)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
              Selected Work
            </span>
            <span className="text-[var(--text-primary)] font-mono text-xs font-bold">&bull;</span>
            <span className="font-mono text-xs font-bold text-[var(--text-secondary)]">
              5 Core Products
            </span>
          </div>

          <h2 className="section-heading font-title text-[var(--text-primary)] font-black">
            Things I&apos;ve built.
          </h2>

          <p className="body-copy text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed font-medium">
            A curated collection of digital products, AI solutions, and automation systems I&apos;ve built.
          </p>

          <p className="font-mono text-xs text-[var(--text-muted)] tracking-tight font-semibold">
            Production-ready software &mdash; built for real-world reliability.
          </p>
        </motion.div>

        {/* Quick Direct Link to Directory */}
        <motion.div {...entrance(0.08)} className="flex items-center gap-3 shrink-0">
          <Link
            to="/projects"
            onMouseEnter={playHover}
            onClick={playClick}
            className="group inline-flex items-center gap-2 border-2 border-black dark:border-white bg-[var(--surface)] px-4 py-2 font-mono text-xs font-bold uppercase text-[var(--text-primary)] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] transition-all duration-120 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          >
            <span>Projects Directory ({projects.length})</span>
            <ArrowRight className="h-3.5 w-3.5 text-[var(--text-primary)] transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2.5} />
          </Link>
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          2. TEXT-FIRST SPATIAL BENTO GRID
      ══════════════════════════════════════════════════════════════ */}
      <div className="space-y-6 lg:space-y-8">
        {/* ────────────────────────────────────────────────────────────
            COLLAB (PRIMARY FEATURED PRODUCT — FULL WIDTH BLOCK)
        ──────────────────────────────────────────────────────────── */}
        <motion.div
          {...entrance(0.05)}
          className="group relative flex flex-col justify-between border-2 border-black dark:border-white bg-[var(--surface)] p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] sm:p-8 lg:p-9"
        >
          {/* Top Metadata Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-black dark:border-white pb-4">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                Web Platform &bull; Real-Time Multiplayer
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="border border-black dark:border-white bg-black dark:bg-white px-2 py-0.5 font-mono text-[10px] font-black uppercase tracking-wider text-white dark:text-black">
                Featured
              </span>
              <span className="border border-black dark:border-white bg-[var(--surface-elevated)] px-2.5 py-0.5 font-mono text-[10px] font-bold text-[var(--text-secondary)] shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[1.5px_1.5px_0px_0px_rgba(255,255,255,1)]">
                Live Beta (Vercel)
              </span>
              <ProjectLikeButton slug="collabcanvas" projectName="Collab" variant="compact" />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8 pt-5 items-start">
            <div className="space-y-4 lg:col-span-8">
              <div>
                <Link
                  to="/projects/collabcanvas"
                  onMouseEnter={playHover}
                  onClick={playClick}
                  className="group/title inline-block"
                >
                  <h3 className="font-title text-3xl font-normal tracking-tight text-[var(--text-primary)] transition-colors group-hover/title:underline sm:text-4xl">
                    Collab
                  </h3>
                </Link>
                <p className="mt-1 font-mono text-xs font-bold text-[var(--text-secondary)]">
                  Real-Time Collaborative Whiteboard Canvas
                </p>
              </div>

              <p className="body-copy max-w-3xl text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed font-medium">
                A browser-based collaborative whiteboard where multiple users can draw, edit, and organize visual content together in real time with role-based sharing, live presence, and persistent storage.
              </p>
            </div>

            {/* Spatial Tech & Action Callout Box */}
            <div className="flex flex-col justify-between border-2 border-black dark:border-white bg-[var(--surface-elevated)] p-4 sm:p-5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] lg:col-span-4 h-full space-y-4">
              <div className="space-y-2.5">
                <span className="font-mono text-[10px] font-black uppercase tracking-wider text-[var(--text-muted)]">
                  Technology Stack
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'React',
                    'TypeScript',
                    'tldraw',
                    'WebSockets',
                    'Cloudflare Workers',
                    'Durable Objects',
                    'Supabase',
                    'PostgreSQL',
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="border border-black dark:border-white bg-[var(--surface)] px-2 py-0.5 font-mono text-[11px] font-bold text-[var(--text-primary)] shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:shadow-[1px_1px_0px_0px_rgba(255,255,255,1)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-3 border-t-2 border-black dark:border-white font-mono text-xs">
                <div className="flex items-center gap-2">
                  <a
                    href="https://collab-canvas-web-beta.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 border-2 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black px-3.5 py-2 font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                  >
                    <span>Launch Live Beta</span>
                    <ExternalLink className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </a>

                  <Link
                    to="/projects/collabcanvas"
                    onMouseEnter={playHover}
                    onClick={playClick}
                    className="inline-flex items-center justify-center gap-1 border-2 border-black dark:border-white bg-[var(--surface)] px-3.5 py-2 font-bold text-[var(--text-primary)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                  >
                    <span>Case Study</span>
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </Link>
                </div>

                <a
                  href="https://github.com/RaizelHub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-1 text-[11px] font-bold text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:underline transition-colors"
                >
                  <Github className="h-3.5 w-3.5" />
                  <span>github.com/RaizelHub</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ────────────────────────────────────────────────────────────
            ROW 2: VOCARA & SUBORA (2 EQUAL SPATIAL PRODUCT BLOCKS)
        ──────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {/* VOCARA (MOBILE PRODUCT) */}
          <motion.div
            {...entrance(0.1)}
            className="group relative flex flex-col justify-between border-2 border-black dark:border-white bg-[var(--surface)] p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] sm:p-7"
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-black dark:border-white pb-3.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                    Mobile Product &bull; AI Coach
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="border border-black dark:border-white bg-[var(--surface-elevated)] px-2.5 py-0.5 font-mono text-[10px] font-bold text-[var(--text-secondary)] shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[1.5px_1.5px_0px_0px_rgba(255,255,255,1)]">
                    Production-Ready Prototype
                  </span>
                  <ProjectLikeButton slug="vocara" projectName="Vocara" variant="compact" />
                </div>
              </div>

              {/* Title & App Store-Style Product Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <Link
                    to="/projects/vocara"
                    onMouseEnter={playHover}
                    onClick={playClick}
                    className="group/title inline-block"
                  >
                    <h3 className="font-title text-2xl font-normal tracking-tight text-[var(--text-primary)] transition-colors group-hover/title:underline sm:text-3xl">
                      VOCARA
                    </h3>
                  </Link>
                  <p className="font-mono text-xs font-bold text-[var(--text-secondary)]">
                    AI Interview &amp; Spoken-English Coach
                  </p>
                </div>

                {/* Compact App Store-Style Phone Thumbnail Widget */}
                <div className="relative w-14 shrink-0 overflow-hidden border-2 border-black dark:border-white bg-[#14120E] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] transition-transform duration-200 group-hover:scale-105">
                  <div className="aspect-[9/18] overflow-hidden">
                    <img
                      src="/img/vocara1 (1).jpg"
                      alt="VOCARA App Preview"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="body-copy text-sm text-[var(--text-secondary)] leading-relaxed font-medium">
                A mobile-first AI coaching platform providing realistic voice-based interview simulations with Groq AI-powered transcription, structured STAR feedback scoring, and job-specific prep flows.
              </p>
            </div>

            {/* Technologies & Actions */}
            <div className="mt-6 space-y-3.5 pt-3.5 border-t-2 border-black dark:border-white">
              <div className="flex flex-wrap gap-1.5">
                {['React Native', 'Expo', 'Groq AI', 'Supabase', 'RevenueCat', 'TypeScript'].map((tech) => (
                  <span
                    key={tech}
                    className="border border-black dark:border-white bg-[var(--surface-elevated)] px-2 py-0.5 font-mono text-[11px] font-bold text-[var(--text-secondary)] shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:shadow-[1px_1px_0px_0px_rgba(255,255,255,1)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between gap-3 pt-1 font-mono text-xs">
                <Link
                  to="/projects/vocara"
                  onMouseEnter={playHover}
                  onClick={playClick}
                  className="inline-flex items-center gap-1.5 border-2 border-black dark:border-white bg-[var(--surface-elevated)] px-3.5 py-1.5 font-bold text-[var(--text-primary)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                >
                  <span>View Project Details</span>
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                </Link>

                <a
                  href="https://github.com/RaizelHub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:underline transition-colors"
                >
                  <Github className="h-3.5 w-3.5" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* SUBORA (SAAS / FINTECH MOBILE CONCEPT) */}
          <motion.div
            {...entrance(0.15)}
            className="group relative flex flex-col justify-between border-2 border-black dark:border-white bg-[var(--surface)] p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] sm:p-7"
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-black dark:border-white pb-3.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                    Mobile Fintech &bull; Gmail Sync
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="border border-black dark:border-white bg-[var(--surface-elevated)] px-2.5 py-0.5 font-mono text-[10px] font-bold text-[var(--text-secondary)] shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[1.5px_1.5px_0px_0px_rgba(255,255,255,1)]">
                    In Development
                  </span>
                  <ProjectLikeButton slug="subora" projectName="Subora" variant="compact" />
                </div>
              </div>

              {/* Title */}
              <div className="space-y-1">
                <Link
                  to="/projects/subora"
                  onMouseEnter={playHover}
                  onClick={playClick}
                  className="group/title inline-block"
                >
                  <h3 className="font-title text-2xl font-normal tracking-tight text-[var(--text-primary)] transition-colors group-hover/title:underline sm:text-3xl">
                    Subora
                  </h3>
                </Link>
                <p className="font-mono text-xs font-bold text-[var(--text-secondary)]">
                  Subscription &amp; Expense Management App
                </p>
              </div>

              {/* Description */}
              <p className="body-copy text-sm text-[var(--text-secondary)] leading-relaxed font-medium">
                A cross-platform mobile application that connects to Gmail accounts via Google OAuth, automatically discovers recurring bills with serverless pattern matching, prevents duplicate entries, and manages budgets.
              </p>
            </div>

            {/* Technologies & Actions */}
            <div className="mt-6 space-y-3.5 pt-3.5 border-t-2 border-black dark:border-white">
              <div className="flex flex-wrap gap-1.5">
                {['React Native', 'Expo', 'TypeScript', 'Supabase', 'Gmail API', 'RevenueCat'].map((tech) => (
                  <span
                    key={tech}
                    className="border border-black dark:border-white bg-[var(--surface-elevated)] px-2 py-0.5 font-mono text-[11px] font-bold text-[var(--text-secondary)] shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:shadow-[1px_1px_0px_0px_rgba(255,255,255,1)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between gap-3 pt-1 font-mono text-xs">
                <Link
                  to="/projects/subora"
                  onMouseEnter={playHover}
                  onClick={playClick}
                  className="inline-flex items-center gap-1.5 border-2 border-black dark:border-white bg-[var(--surface-elevated)] px-3.5 py-1.5 font-bold text-[var(--text-primary)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                >
                  <span>View Project Details</span>
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                </Link>

                <a
                  href="https://github.com/RaizelHub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:underline transition-colors"
                >
                  <Github className="h-3.5 w-3.5" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ────────────────────────────────────────────────────────────
            ROW 3: TIKTOK SHOP AUTOMATION & JOBRADAR AI (2 SPATIAL SYSTEMS)
        ──────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {/* TIKTOK SHOP AUTOMATION (BUSINESS AUTOMATION) */}
          <motion.div
            {...entrance(0.2)}
            className="group relative flex flex-col justify-between border-2 border-black dark:border-white bg-[var(--surface)] p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] sm:p-7"
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-black dark:border-white pb-3.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                    Event-Driven Automation &bull; n8n
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="border border-black dark:border-white bg-[var(--surface-elevated)] px-2.5 py-0.5 font-mono text-[10px] font-bold text-[var(--text-secondary)] shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[1.5px_1.5px_0px_0px_rgba(255,255,255,1)]">
                    Working Prototype
                  </span>
                  <ProjectLikeButton slug="tiktok-shop-automation" projectName="TikTok Shop Automation" variant="compact" />
                </div>
              </div>

              {/* Title */}
              <div className="space-y-1">
                <Link
                  to="/projects/tiktok-shop-automation"
                  onMouseEnter={playHover}
                  onClick={playClick}
                  className="group/title inline-block"
                >
                  <h3 className="font-title text-2xl font-normal tracking-tight text-[var(--text-primary)] transition-colors group-hover/title:underline sm:text-3xl">
                    TikTok Shop Automation
                  </h3>
                </Link>
                <p className="font-mono text-xs font-bold text-[var(--text-secondary)]">
                  Automated Order Processing &amp; Idempotency Pipeline
                </p>
              </div>

              {/* Description */}
              <p className="body-copy text-sm text-[var(--text-secondary)] leading-relaxed font-medium">
                An event-driven n8n workflow system that ingests TikTok Shop order webhooks, validates payload data, enforces external order ID idempotency checks, updates Supabase stock, and notifies Telegram operators.
              </p>

              {/* Workflow Flow Chips */}
              <div className="border-2 border-black dark:border-white bg-[var(--surface-elevated)] p-3 font-mono text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                <span className="block text-[10px] font-black uppercase text-[var(--text-muted)] mb-2">
                  Execution Topology
                </span>
                <div className="flex items-center gap-2 overflow-x-auto text-[11px]">
                  <span className="px-2 py-1 bg-[var(--surface)] border border-black dark:border-white whitespace-nowrap text-[var(--text-primary)] font-bold shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:shadow-[1px_1px_0px_0px_rgba(255,255,255,1)]">
                    TikTok Webhook
                  </span>
                  <span className="text-[var(--text-primary)] font-bold">&rarr;</span>
                  <span className="px-2 py-1 bg-[var(--surface)] border border-black dark:border-white whitespace-nowrap text-[var(--text-primary)] font-bold shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:shadow-[1px_1px_0px_0px_rgba(255,255,255,1)]">
                    Idempotency Check
                  </span>
                  <span className="text-[var(--text-primary)] font-bold">&rarr;</span>
                  <span className="px-2 py-1 bg-[var(--surface)] border border-black dark:border-white whitespace-nowrap text-[var(--text-primary)] font-bold shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:shadow-[1px_1px_0px_0px_rgba(255,255,255,1)]">
                    Supabase Sync
                  </span>
                  <span className="text-[var(--text-primary)] font-bold">&rarr;</span>
                  <span className="px-2 py-1 bg-[var(--surface)] border border-black dark:border-white whitespace-nowrap text-[var(--text-primary)] font-bold shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:shadow-[1px_1px_0px_0px_rgba(255,255,255,1)]">
                    Telegram Dispatch
                  </span>
                </div>
              </div>
            </div>

            {/* Technologies & Actions */}
            <div className="mt-6 space-y-3.5 pt-3.5 border-t-2 border-black dark:border-white">
              <div className="flex flex-wrap gap-1.5">
                {['n8n', 'Supabase', 'PostgreSQL', 'Telegram API', 'Webhooks', 'REST APIs'].map((tech) => (
                  <span
                    key={tech}
                    className="border border-black dark:border-white bg-[var(--surface-elevated)] px-2 py-0.5 font-mono text-[11px] font-bold text-[var(--text-secondary)] shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:shadow-[1px_1px_0px_0px_rgba(255,255,255,1)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between gap-3 pt-1 font-mono text-xs">
                <Link
                  to="/projects/tiktok-shop-automation"
                  onMouseEnter={playHover}
                  onClick={playClick}
                  className="inline-flex items-center gap-1.5 border-2 border-black dark:border-white bg-[var(--surface-elevated)] px-3.5 py-1.5 font-bold text-[var(--text-primary)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                >
                  <span>Explore 5 Workflows</span>
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                </Link>

                <a
                  href="https://github.com/RaizelHub/OmniEcommerce-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:underline transition-colors"
                >
                  <Github className="h-3.5 w-3.5" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* JOBRADAR AI (AI PLATFORM & TRACKING) */}
          <motion.div
            {...entrance(0.25)}
            className="group relative flex flex-col justify-between border-2 border-black dark:border-white bg-[var(--surface)] p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] sm:p-7"
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-black dark:border-white pb-3.5">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                    AI Platform &bull; Job Automation
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="border border-black dark:border-white bg-[var(--surface-elevated)] px-2.5 py-0.5 font-mono text-[10px] font-bold text-[var(--text-secondary)] shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[1.5px_1.5px_0px_0px_rgba(255,255,255,1)]">
                    Active Development
                  </span>
                  <ProjectLikeButton slug="jobradar-ai" projectName="JobRadar AI" variant="compact" />
                </div>
              </div>

              {/* Title */}
              <div className="space-y-1">
                <Link
                  to="/projects/jobradar-ai"
                  onMouseEnter={playHover}
                  onClick={playClick}
                  className="group/title inline-block"
                >
                  <h3 className="font-title text-2xl font-normal tracking-tight text-[var(--text-primary)] transition-colors group-hover/title:underline sm:text-3xl">
                    JobRadar AI
                  </h3>
                </Link>
                <p className="font-mono text-xs font-bold text-[var(--text-secondary)]">
                  AI Job Discovery &amp; Application CRM
                </p>
              </div>

              {/* Description */}
              <p className="body-copy text-sm text-[var(--text-secondary)] leading-relaxed font-medium">
                An automated job discovery and application-tracking platform that collects remote job listings from public APIs and parsed email alerts, excludes senior-only roles, scores compatibility with Gemini AI, and manages applications in a Kanban CRM.
              </p>

              {/* Scoring Flow Chips */}
              <div className="border-2 border-black dark:border-white bg-[var(--surface-elevated)] p-3 font-mono text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                <span className="block text-[10px] font-black uppercase text-[var(--text-muted)] mb-2">
                  Intelligence Pipeline
                </span>
                <div className="flex items-center gap-2 overflow-x-auto text-[11px]">
                  <span className="px-2 py-1 bg-[var(--surface)] border border-black dark:border-white whitespace-nowrap text-[var(--text-primary)] font-bold shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:shadow-[1px_1px_0px_0px_rgba(255,255,255,1)]">
                    Job Feeds
                  </span>
                  <span className="text-[var(--text-primary)] font-bold">&rarr;</span>
                  <span className="px-2 py-1 bg-[var(--surface)] border border-black dark:border-white whitespace-nowrap text-[var(--text-primary)] font-bold shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:shadow-[1px_1px_0px_0px_rgba(255,255,255,1)]">
                    URL Hashing
                  </span>
                  <span className="text-[var(--text-primary)] font-bold">&rarr;</span>
                  <span className="px-2 py-1 bg-[var(--surface)] border border-black dark:border-white whitespace-nowrap text-[var(--text-primary)] font-bold shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:shadow-[1px_1px_0px_0px_rgba(255,255,255,1)]">
                    Gemini AI Scoring
                  </span>
                  <span className="text-[var(--text-primary)] font-bold">&rarr;</span>
                  <span className="px-2 py-1 bg-[var(--surface)] border border-black dark:border-white whitespace-nowrap text-[var(--text-primary)] font-bold shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:shadow-[1px_1px_0px_0px_rgba(255,255,255,1)]">
                    Kanban CRM
                  </span>
                </div>
              </div>
            </div>

            {/* Technologies & Actions */}
            <div className="mt-6 space-y-3.5 pt-3.5 border-t-2 border-black dark:border-white">
              <div className="flex flex-wrap gap-1.5">
                {['React', 'TypeScript', 'Node.js', 'Express', 'Supabase', 'n8n', 'Gemini AI'].map((tech) => (
                  <span
                    key={tech}
                    className="border border-black dark:border-white bg-[var(--surface-elevated)] px-2 py-0.5 font-mono text-[11px] font-bold text-[var(--text-secondary)] shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:shadow-[1px_1px_0px_0px_rgba(255,255,255,1)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between gap-3 pt-1 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <a
                    href="https://job-radar-ai-frontend.vercel.app/demo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 border-2 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black px-3.5 py-1.5 font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </a>

                  <Link
                    to="/projects/jobradar-ai"
                    onMouseEnter={playHover}
                    onClick={playClick}
                    className="inline-flex items-center gap-1.5 border-2 border-black dark:border-white bg-[var(--surface-elevated)] px-3.5 py-1.5 font-bold text-[var(--text-primary)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                  >
                    <span>Case Study</span>
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          3. SECONDARY SYSTEMS & SPECIALIZED ENGINEERING GRID
      ══════════════════════════════════════════════════════════════ */}
      <div className="mt-16 border-t-2 border-black dark:border-white pt-12 lg:mt-24">
        <motion.div {...entrance()} className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <span className="mb-1.5 inline-block border border-black dark:border-white bg-[var(--surface)] px-2 py-0.5 font-mono text-xs font-bold uppercase tracking-[0.16em] text-[var(--text-primary)] shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[1.5px_1.5px_0px_0px_rgba(255,255,255,1)]">
              Additional Systems &amp; Hardware
            </span>
            <h3 className="font-title text-2xl font-black tracking-tight text-[var(--text-primary)]">
              Specialized Systems &amp; IoT
            </h3>
          </div>

          <span className="font-mono text-xs font-bold text-[var(--text-muted)]">
            Explore 11 other production systems
          </span>
        </motion.div>

        <div className="grid grid-cols-1 gap-x-10 gap-y-4 md:grid-cols-2">
          {moreProjects.map((project, i) => (
            <motion.div
              key={project.id}
              {...entrance(i * 0.05)}
              className="h-full"
            >
              <MoreProjectCard
                shortTitle={project.shortTitle}
                subtitle={project.subtitle}
                description={project.description}
                category={project.category}
                technologies={project.technologies}
                slug={project.slug}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════
          4. VIEW ALL PROJECTS DIRECTORY PORTAL
      ══════════════════════════════════════════════════════════════ */}
      <motion.div {...entrance(0.2)} className="flex justify-center mt-12">
        <Link
          to="/projects"
          onMouseEnter={playHover}
          onClick={playClick}
          className="group flex min-h-11 items-center gap-2.5 border-2 border-black dark:border-white bg-[var(--surface)] px-6 py-3 font-mono text-xs font-bold uppercase text-[var(--text-primary)] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all duration-120 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[5px_5px_0px_0px_rgba(255,255,255,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
        >
          <span>Explore All {projects.length} Projects in Directory</span>
          <ArrowRight className="h-3.5 w-3.5 text-[var(--text-primary)] transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2.5} />
        </Link>
      </motion.div>
    </SectionContainer>
  );
};
