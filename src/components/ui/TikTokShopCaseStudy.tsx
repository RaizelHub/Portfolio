import React from 'react';
import {
  ShieldCheck,
  Cpu,
  Database,
  Lock,
  Zap,
  Workflow,
  Send,
  Webhook,
  ExternalLink,
  Github,
  Layers,
  Clock,
} from 'lucide-react';
import { AutomationShowcase } from '../projects/AutomationShowcase';

export const TikTokShopCaseStudy: React.FC = () => {
  return (
    <div className="space-y-12 text-left">
      {/* ── Section 1: Header / Overview ── */}
      <section className="bg-[var(--surface)] border border-[var(--border-subtle)] rounded-xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-bold bg-[var(--surface-elevated)] text-[var(--text-primary)] border border-[var(--border-subtle)] px-2.5 py-0.5 rounded-md uppercase">
              AUTOMATION
            </span>
            <span className="px-2.5 py-0.5 text-xs font-mono font-semibold bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent)]/30 rounded-md">
              Working Prototype
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/RaizelHub/OmniEcommerce-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-3 py-1.5 rounded-lg bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--border)] transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Source Repository</span>
              <ExternalLink className="w-3 h-3 text-[var(--text-muted)]" />
            </a>
          </div>
        </div>

        <div>
          <h1 className="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-3">
            TikTok Shop Order Automation &amp; E-Commerce Architecture
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] font-sans leading-relaxed max-w-4xl">
            An end-to-end event-driven orchestration system built on n8n, Supabase PostgreSQL, and Telegram.
            The architecture captures high-velocity e-commerce webhooks, validates payloads, enforces idempotent deduplication,
            synchronizes multi-channel inventory records, and dispatches real-time operator alerts.
          </p>
        </div>

        {/* Quick Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-[var(--border-subtle)]">
          <div className="p-3 bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-lg">
            <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] block">Connected Workflows</span>
            <span className="text-base font-bold font-mono text-[var(--accent)]">5 Pipelines</span>
          </div>
          <div className="p-3 bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-lg">
            <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] block">Webhook Ingestion</span>
            <span className="text-base font-bold font-mono text-[var(--text-primary)]">&lt; 150ms latency</span>
          </div>
          <div className="p-3 bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-lg">
            <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] block">Deduplication</span>
            <span className="text-base font-bold font-mono text-[var(--text-primary)]">100% Idempotent</span>
          </div>
          <div className="p-3 bg-[var(--surface-elevated)] border border-[var(--border-subtle)] rounded-lg">
            <span className="text-[10px] font-mono uppercase text-[var(--text-muted)] block">Operator Alerts</span>
            <span className="text-base font-bold font-mono text-[var(--accent)]">Instant Telegram</span>
          </div>
        </div>
      </section>

      {/* ── Section 2: Interactive n8n Architecture Studio ── */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-3">
          <div>
            <h2 className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-[var(--text-primary)] flex items-center gap-2">
              <Workflow className="w-5 h-5 text-[var(--accent)]" />
              <span>Interactive Workflow Architecture</span>
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans mt-0.5">
              Select any of the 5 connected pipelines to inspect execution logic, node configurations, and sample data.
            </p>
          </div>
        </div>

        {/* The interactive studio showcase */}
        <AutomationShowcase />
      </section>

      {/* ── Section 3: Engineering Deep Dive ── */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[var(--surface)] border border-[var(--border-subtle)] rounded-xl p-6 space-y-3 shadow-xs">
          <h3 className="font-mono font-bold text-xs uppercase text-[var(--accent)] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" /> The Business Problem
          </h3>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
            High-velocity e-commerce channels like TikTok Shop send instant webhook events when customers place orders.
            Manual or delay-prone polling leads to inventory overselling, lost orders, delayed customer fulfillment,
            and duplicate processing when webhooks retry automatically on transient network blips.
          </p>
        </div>

        <div className="bg-[var(--surface)] border border-[var(--border-subtle)] rounded-xl p-6 space-y-3 shadow-xs">
          <h3 className="font-mono font-bold text-xs uppercase text-[var(--text-primary)] flex items-center gap-2">
            <Zap className="w-4 h-4 text-[var(--accent)]" /> The Technical Architecture
          </h3>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
            Engineered an event-driven n8n pipeline that processes payloads asynchronously. Idempotency is enforced by querying
            existing external order IDs before stock mutation. Supabase PostgreSQL records are updated atomically, and
            structured alert notifications are formatted and dispatched directly to Telegram operator channels.
          </p>
        </div>
      </section>

      {/* ── Section 4: Key Technical Specifications ── */}
      <section className="bg-[var(--surface)] border border-[var(--border-subtle)] rounded-xl p-6 sm:p-8 space-y-6 shadow-xs">
        <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-[var(--text-primary)] border-b border-[var(--border-subtle)] pb-3 flex items-center gap-2">
          <Layers className="w-4 h-4 text-[var(--accent)]" />
          Key Technical Implementations
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border-subtle)] space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--text-primary)]">
              <Webhook className="w-4 h-4 text-[var(--accent)]" />
              <span>Webhook Ingestion</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              HTTP POST receiver handling signed TikTok Shop webhook payloads with schema validation.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border-subtle)] space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--text-primary)]">
              <Lock className="w-4 h-4 text-[var(--accent)]" />
              <span>Idempotent Deduplication</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              External order ID lookup preventing duplicated stock decrements during webhook retries.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border-subtle)] space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--text-primary)]">
              <Database className="w-4 h-4 text-[var(--accent)]" />
              <span>Supabase PostgreSQL</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Relational tables storing orders, line items, inventory counts, and audit execution logs.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border-subtle)] space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--text-primary)]">
              <Send className="w-4 h-4 text-[var(--accent)]" />
              <span>Telegram Operator Bot</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Formatted instant notification dispatches containing order ID, buyer details, and stock impact.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border-subtle)] space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--text-primary)]">
              <Cpu className="w-4 h-4 text-[var(--accent)]" />
              <span>Error Routing &amp; Retries</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Failure branches catching malformed payloads and sending alert notices without crashing the pipeline.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[var(--surface-elevated)] border border-[var(--border-subtle)] space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[var(--text-primary)]">
              <Clock className="w-4 h-4 text-[var(--accent)]" />
              <span>Daily Reconciliation</span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Automated end-of-day scheduled report aggregating order counts, revenue, and inventory balance.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
