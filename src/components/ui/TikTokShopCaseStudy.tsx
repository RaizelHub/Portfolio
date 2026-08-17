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
      <section className="bg-[#FFFFFF] dark:bg-[#11151A] border border-[#DCE1E7] dark:border-[#242B33] rounded-xl p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-bold bg-[#111318] text-white dark:bg-[#F4F6F8] dark:text-[#0B0D10] px-2.5 py-0.5 rounded-md uppercase">
              AUTOMATION
            </span>
            <span className="px-2.5 py-0.5 text-xs font-mono font-semibold bg-[#2563EB]/10 text-[#2563EB] dark:text-[#60A5FA] border border-[#2563EB]/20 rounded-md">
              Working Prototype
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/RaizelHub/OmniEcommerce-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-3 py-1.5 rounded-lg bg-[#F1F3F5] dark:bg-[#171C22] hover:bg-[#EAEFF5] dark:hover:bg-[#1D232B] text-[#111318] dark:text-[#F4F6F8] border border-[#DCE1E7] dark:border-[#242B33] transition-colors"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Source Repository</span>
              <ExternalLink className="w-3 h-3 text-[#78828D]" />
            </a>
          </div>
        </div>

        <div>
          <h1 className="font-sans text-2xl sm:text-4xl font-bold tracking-tight text-[#111318] dark:text-[#F4F6F8] mb-3">
            TikTok Shop Order Automation &amp; E-Commerce Architecture
          </h1>
          <p className="text-sm sm:text-base text-[#5F6873] dark:text-[#A7B0BA] font-sans leading-relaxed max-w-4xl">
            An end-to-end event-driven orchestration system built on n8n, Supabase PostgreSQL, and Telegram.
            The architecture captures high-velocity e-commerce webhooks, validates payloads, enforces idempotent deduplication,
            synchronizes multi-channel inventory records, and dispatches real-time operator alerts.
          </p>
        </div>

        {/* Quick Highlights */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-[#DCE1E7] dark:border-[#242B33]">
          <div className="p-3 bg-[#F7F8FA] dark:bg-[#0B0D10] border border-[#DCE1E7] dark:border-[#242B33] rounded-lg">
            <span className="text-[10px] font-mono uppercase text-[#78828D] dark:text-[#7F8994] block">Connected Workflows</span>
            <span className="text-base font-bold font-mono text-[#2563EB] dark:text-[#60A5FA]">5 Pipelines</span>
          </div>
          <div className="p-3 bg-[#F7F8FA] dark:bg-[#0B0D10] border border-[#DCE1E7] dark:border-[#242B33] rounded-lg">
            <span className="text-[10px] font-mono uppercase text-[#78828D] dark:text-[#7F8994] block">Webhook Ingestion</span>
            <span className="text-base font-bold font-mono text-[#111318] dark:text-[#F4F6F8]">&lt; 150ms latency</span>
          </div>
          <div className="p-3 bg-[#F7F8FA] dark:bg-[#0B0D10] border border-[#DCE1E7] dark:border-[#242B33] rounded-lg">
            <span className="text-[10px] font-mono uppercase text-[#78828D] dark:text-[#7F8994] block">Deduplication</span>
            <span className="text-base font-bold font-mono text-[#111318] dark:text-[#F4F6F8]">100% Idempotent</span>
          </div>
          <div className="p-3 bg-[#F7F8FA] dark:bg-[#0B0D10] border border-[#DCE1E7] dark:border-[#242B33] rounded-lg">
            <span className="text-[10px] font-mono uppercase text-[#78828D] dark:text-[#7F8994] block">Operator Alerts</span>
            <span className="text-base font-bold font-mono text-[#2563EB] dark:text-[#60A5FA]">Instant Telegram</span>
          </div>
        </div>
      </section>

      {/* ── Section 2: Interactive n8n Architecture Studio ── */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#DCE1E7] dark:border-[#242B33] pb-3">
          <div>
            <h2 className="font-sans text-xl sm:text-2xl font-bold tracking-tight text-[#111318] dark:text-[#F4F6F8] flex items-center gap-2">
              <Workflow className="w-5 h-5 text-[#2563EB] dark:text-[#60A5FA]" />
              <span>Interactive Workflow Architecture</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#5F6873] dark:text-[#A7B0BA] font-sans mt-0.5">
              Select any of the 5 connected pipelines to inspect execution logic, node configurations, and sample data.
            </p>
          </div>
        </div>

        {/* The interactive studio showcase */}
        <AutomationShowcase />
      </section>

      {/* ── Section 3: Engineering Deep Dive ── */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#FFFFFF] dark:bg-[#11151A] border border-[#DCE1E7] dark:border-[#242B33] rounded-xl p-6 space-y-3 shadow-xs">
          <h3 className="font-mono font-bold text-xs uppercase text-[#2563EB] dark:text-[#60A5FA] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" /> The Business Problem
          </h3>
          <p className="text-xs sm:text-sm text-[#5F6873] dark:text-[#A7B0BA] font-sans leading-relaxed">
            High-velocity e-commerce channels like TikTok Shop send instant webhook events when customers place orders.
            Manual or delay-prone polling leads to inventory overselling, lost orders, delayed customer fulfillment,
            and duplicate processing when webhooks retry automatically on transient network blips.
          </p>
        </div>

        <div className="bg-[#FFFFFF] dark:bg-[#11151A] border border-[#DCE1E7] dark:border-[#242B33] rounded-xl p-6 space-y-3 shadow-xs">
          <h3 className="font-mono font-bold text-xs uppercase text-[#111318] dark:text-[#F4F6F8] flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#2563EB] dark:text-[#60A5FA]" /> The Technical Architecture
          </h3>
          <p className="text-xs sm:text-sm text-[#5F6873] dark:text-[#A7B0BA] font-sans leading-relaxed">
            Engineered an event-driven n8n pipeline that processes payloads asynchronously. Idempotency is enforced by querying
            existing external order IDs before stock mutation. Supabase PostgreSQL records are updated atomically, and
            structured alert notifications are formatted and dispatched directly to Telegram operator channels.
          </p>
        </div>
      </section>

      {/* ── Section 4: Key Technical Specifications ── */}
      <section className="bg-[#FFFFFF] dark:bg-[#11151A] border border-[#DCE1E7] dark:border-[#242B33] rounded-xl p-6 sm:p-8 space-y-6 shadow-xs">
        <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-[#111318] dark:text-[#F4F6F8] border-b border-[#DCE1E7] dark:border-[#242B33] pb-3 flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#2563EB] dark:text-[#60A5FA]" />
          Key Technical Implementations
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-[#F7F8FA] dark:bg-[#0B0D10] border border-[#DCE1E7] dark:border-[#242B33] space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#111318] dark:text-[#F4F6F8]">
              <Webhook className="w-4 h-4 text-[#2563EB] dark:text-[#60A5FA]" />
              <span>Webhook Ingestion</span>
            </div>
            <p className="text-xs text-[#5F6873] dark:text-[#A7B0BA] leading-relaxed">
              HTTP POST receiver handling signed TikTok Shop webhook payloads with schema validation.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#F7F8FA] dark:bg-[#0B0D10] border border-[#DCE1E7] dark:border-[#242B33] space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#111318] dark:text-[#F4F6F8]">
              <Lock className="w-4 h-4 text-[#2563EB] dark:text-[#60A5FA]" />
              <span>Idempotent Deduplication</span>
            </div>
            <p className="text-xs text-[#5F6873] dark:text-[#A7B0BA] leading-relaxed">
              External order ID lookup preventing duplicated stock decrements during webhook retries.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#F7F8FA] dark:bg-[#0B0D10] border border-[#DCE1E7] dark:border-[#242B33] space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#111318] dark:text-[#F4F6F8]">
              <Database className="w-4 h-4 text-[#2563EB] dark:text-[#60A5FA]" />
              <span>Supabase PostgreSQL</span>
            </div>
            <p className="text-xs text-[#5F6873] dark:text-[#A7B0BA] leading-relaxed">
              Relational tables storing orders, line items, inventory counts, and audit execution logs.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#F7F8FA] dark:bg-[#0B0D10] border border-[#DCE1E7] dark:border-[#242B33] space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#111318] dark:text-[#F4F6F8]">
              <Send className="w-4 h-4 text-[#2563EB] dark:text-[#60A5FA]" />
              <span>Telegram Operator Bot</span>
            </div>
            <p className="text-xs text-[#5F6873] dark:text-[#A7B0BA] leading-relaxed">
              Formatted instant notification dispatches containing order ID, buyer details, and stock impact.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#F7F8FA] dark:bg-[#0B0D10] border border-[#DCE1E7] dark:border-[#242B33] space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#111318] dark:text-[#F4F6F8]">
              <Cpu className="w-4 h-4 text-[#2563EB] dark:text-[#60A5FA]" />
              <span>Error Routing &amp; Retries</span>
            </div>
            <p className="text-xs text-[#5F6873] dark:text-[#A7B0BA] leading-relaxed">
              Failure branches catching malformed payloads and sending alert notices without crashing the pipeline.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#F7F8FA] dark:bg-[#0B0D10] border border-[#DCE1E7] dark:border-[#242B33] space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#111318] dark:text-[#F4F6F8]">
              <Clock className="w-4 h-4 text-[#2563EB] dark:text-[#60A5FA]" />
              <span>Daily Reconciliation</span>
            </div>
            <p className="text-xs text-[#5F6873] dark:text-[#A7B0BA] leading-relaxed">
              Automated end-of-day scheduled report aggregating order counts, revenue, and inventory balance.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
