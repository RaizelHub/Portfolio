import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ZoomIn, X, ChevronLeft, ChevronRight, ExternalLink, Sparkles, Workflow, Layout, Mail } from 'lucide-react';
import { useSound } from '../../context/SoundContext';

interface ShowcaseView {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  src: string;
  icon: React.ElementType;
}

const views: ShowcaseView[] = [
  {
    id: 'dashboard',
    title: 'Discovered Remote Jobs Dashboard',
    subtitle: 'Unified listings table with AI match scoring, source tags, and multi-filter controls',
    category: 'Live UI',
    src: 'img/Jobs.png',
    icon: Layout,
  },
  {
    id: 'matcher',
    title: 'Gemini AI Matcher Workflow',
    subtitle: 'Automated candidate-job evaluation, structured skill-gap breakdown, and interview tips',
    category: 'Gemini AI',
    src: 'img/JobRadar AI — AI Job Matcher.png',
    icon: Sparkles,
  },
  {
    id: 'collector',
    title: 'Remote Job Collector Pipeline',
    subtitle: 'n8n workflow executing multi-source collection, normalization, and Supabase insertion',
    category: 'n8n Workflow',
    src: 'img/JobRadar AI — Remote Job Collector — Production.png',
    icon: Workflow,
  },
  {
    id: 'notification',
    title: 'High-Match Email Alert Ingestion',
    subtitle: 'Real-time alert dispatch dispatched to candidate for opportunities exceeding 85% match',
    category: 'Notification',
    src: 'img/High-Match Email Notification.png',
    icon: Mail,
  },
];

export const JobRadarShowcase: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const { playHover, playClick } = useSound();
  const prefersReducedMotion = useReducedMotion();

  const currentView = views[activeIdx];

  return (
    <div className="w-full space-y-3.5">
      {/* ── Architecture Pipeline Flow Ribbon ── */}
      <div className="min-w-0 border border-[var(--border-subtle)] bg-[var(--surface)] p-3.5 shadow-xs">
        <div className="mb-2.5 flex min-w-0 flex-wrap items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-2.5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)]">
              Automated Intake &amp; AI Evaluation Pipeline
            </span>
          </div>
          <span className="font-mono text-xs font-medium uppercase text-[var(--accent)]">
            n8n + Gemini AI + Supabase
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 font-mono text-xs">
          <span className="px-2 py-0.5 bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded font-medium text-[var(--text-primary)] whitespace-nowrap">
            Job Feeds &amp; Alerts
          </span>
          <span className="text-[var(--text-muted)] font-bold">→</span>
          <span className="px-2 py-0.5 bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded font-medium text-[var(--text-primary)] whitespace-nowrap">
            n8n Ingest
          </span>
          <span className="text-[var(--text-muted)] font-bold">→</span>
          <span className="px-2 py-0.5 bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded font-medium text-[var(--text-primary)] whitespace-nowrap">
            Deduplication
          </span>
          <span className="text-[var(--text-muted)] font-bold">→</span>
          <span className="px-2 py-0.5 bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded font-medium text-[var(--text-primary)] whitespace-nowrap">
            Gemini AI Scoring
          </span>
          <span className="text-[var(--text-muted)] font-bold">→</span>
          <span className="px-2 py-0.5 bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded font-medium text-[var(--text-primary)] whitespace-nowrap">
            Kanban &amp; Alerts
          </span>
        </div>
      </div>

      {/* ── Interactive View Tabs ── */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 font-mono text-xs">
        {views.map((v, i) => {
          const Icon = v.icon;
          const isSelected = activeIdx === i;
          return (
            <button
              key={v.id}
              type="button"
              onMouseEnter={playHover}
              onClick={() => {
                playClick();
                setActiveIdx(i);
              }}
              className={`flex items-center gap-2 border px-2.5 py-2 text-left transition-all cursor-pointer ${
                isSelected
                  ? 'border-[var(--accent)] bg-[var(--surface-elevated)] text-[var(--text-primary)] shadow-xs font-semibold'
                  : 'border-[var(--border-subtle)] bg-[var(--surface)] text-[var(--text-secondary)] hover:border-[var(--border)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}`} />
              <span className="truncate">{v.category}</span>
            </button>
          );
        })}
      </div>

      {/* ── Main Showcase Canvas ── */}
      <div className="group relative overflow-hidden border border-[var(--border-subtle)] bg-[var(--surface)] shadow-md transition-all hover:border-[var(--border)]">
        {/* Card Header Bar */}
        <div className="flex min-w-0 flex-col items-start justify-between gap-1 border-b border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-3.5 py-2 font-mono text-xs sm:flex-row sm:items-center sm:gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
            <span className="break-safe truncate font-semibold text-[var(--text-primary)]">
              {currentView.title}
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://job-radar-ai-frontend.vercel.app/demo"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-[var(--accent)] hover:underline"
            >
              <span>Live Demo</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <Link
              to="/projects/jobradar-ai"
              onClick={(e) => e.stopPropagation()}
              className="text-[11px] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              Case Study ↗
            </Link>
          </div>
        </div>

        {/* Screenshot Viewport with Zoom Trigger */}
        <div
          onClick={() => {
            playClick();
            setIsZoomed(true);
          }}
          onMouseEnter={playHover}
          className="relative aspect-[16/9.5] cursor-pointer overflow-hidden bg-[var(--background)] flex items-center justify-center p-2"
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentView.src}
              src={`/${currentView.src}`}
              alt={`JobRadar AI — ${currentView.title}`}
              loading="lazy"
              decoding="async"
              initial={prefersReducedMotion ? {} : { opacity: 0 }}
              animate={prefersReducedMotion ? {} : { opacity: 1 }}
              exit={prefersReducedMotion ? {} : { opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="w-full h-full object-contain group-hover:scale-[1.01] transition-transform duration-200"
            />
          </AnimatePresence>

          {/* Hover Overlay Hint */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center pointer-events-none">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-[var(--surface-elevated)]/95 text-[var(--text-primary)] border border-[var(--border)] text-xs font-mono px-3 py-1.5 rounded-md backdrop-blur-sm flex items-center gap-2 shadow-lg">
              <ZoomIn className="w-3.5 h-3.5 text-[var(--accent)]" />
              Click to inspect screenshot
            </span>
          </div>
        </div>

        {/* Card Subtitle Caption */}
        <div className="border-t border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-3.5 py-2 font-mono text-[11px] text-[var(--text-secondary)] flex items-center justify-between">
          <span className="truncate">{currentView.subtitle}</span>
          <span className="text-[var(--text-muted)] shrink-0 ml-2">
            {activeIdx + 1} / {views.length}
          </span>
        </div>
      </div>

      {/* ── High-Resolution Lightbox Modal ── */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs"
            onClick={() => setIsZoomed(false)}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="relative max-w-5xl w-full bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border-subtle)] bg-[var(--surface-elevated)]">
                <div>
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                    JobRadar AI &mdash; {currentView.title}
                  </h4>
                  <p className="text-[11px] font-mono text-[var(--text-secondary)]">
                    {currentView.subtitle}
                  </p>
                </div>
                <button
                  onClick={() => setIsZoomed(false)}
                  className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Image Canvas */}
              <div className="p-4 max-h-[75vh] overflow-auto flex items-center justify-center bg-[var(--background)]">
                <img
                  src={`/${currentView.src}`}
                  alt={currentView.title}
                  className="w-full h-auto object-contain rounded-md"
                />
              </div>

              {/* Modal Footer Controls */}
              <div className="px-6 py-3 border-t border-[var(--border-subtle)] bg-[var(--surface-elevated)] flex items-center justify-between text-xs font-mono text-[var(--text-secondary)]">
                <span>
                  View {activeIdx + 1} of {views.length}
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      setActiveIdx((prev) =>
                        prev === 0 ? views.length - 1 : prev - 1
                      )
                    }
                    className="px-3 py-1.5 rounded-md bg-[var(--surface)] border border-[var(--border-subtle)] hover:border-[var(--border)] text-[var(--text-primary)] flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Previous</span>
                  </button>
                  <button
                    onClick={() =>
                      setActiveIdx((prev) => (prev + 1) % views.length)
                    }
                    className="px-3 py-1.5 rounded-md bg-[var(--accent)] text-[var(--on-accent)] font-semibold hover:bg-[var(--accent-hover)] flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
