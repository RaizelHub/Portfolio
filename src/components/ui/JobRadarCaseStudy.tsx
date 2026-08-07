import React, { useState } from 'react';
import {
  Shield, CheckCircle2, AlertTriangle, Workflow, Cpu, Database,
  Lock, RefreshCw, Zap, Layers, Check, Mail,
  Sparkles, FileCode2, Eye, Layout, Clock, ExternalLink
} from 'lucide-react';


export const JobRadarCaseStudy: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'screenshots' | 'placeholders'>('screenshots');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const realScreenshots = [
    {
      title: 'Discovered Remote Jobs Dashboard',
      src: '/img/Jobs.png',
      caption: 'Live discovered remote job opportunities dashboard showing source attribution, company details, and AI suitability scores.'
    },
    {
      title: 'High-Match Email Notification',
      src: '/img/High-Match Email Notification.png',
      caption: 'Smart email notification dispatched for candidate jobs surpassing suitability thresholds.'
    },
    {
      title: 'Remote Job Collector — Production Workflow',
      src: '/img/JobRadar AI — Remote Job Collector — Production.png',
      caption: 'n8n workflow executing multi-source collection, normalization, and Supabase database insertion.'
    },
    {
      title: 'AI Job Matcher Workflow',
      src: '/img/JobRadar AI — AI Job Matcher.png',
      caption: 'n8n workflow querying unanalyzed jobs and generating structured evaluation reports via Google Gemini.'
    },
    {
      title: 'Email Job Alert Ingestion',
      src: '/img/JobRadar — Email Job Collector.png',
      caption: 'Gmail integration parsing official job-alert emails from LinkedIn, OnlineJobs.ph, and JobStreet.'
    }
  ];

  const pendingPlaceholders = [
    { id: 'jobradar-dashboard', title: 'Main Analytics & Job Dashboard', desc: 'Central overview of job metrics, compatibility scores, and quick automation triggers.' },
    { id: 'jobradar-find-jobs', title: 'Job Discovery & Filtering View', desc: 'Searchable job database with multi-source filtering and detailed match previews.' },
    { id: 'jobradar-ai-analysis', title: 'AI Candidate Match Analysis Detail', desc: 'In-depth breakdown of skill gap evaluation, resume tips, and interview prep.' },
    { id: 'jobradar-application-kanban', title: 'Application CRM Kanban Pipeline', desc: 'Visual 6-stage candidate workflow tracking from Discovered to Offer/Rejected.' },
    { id: 'jobradar-automations', title: 'Automation Control Panel', desc: 'Manual webhook trigger buttons and execution status monitoring.' },
    { id: 'jobradar-n8n-workflow', title: 'Full n8n Orchestration Topology', desc: 'Expanded canvas view of connected collection, matching, and notification workflows.' }
  ];

  return (
    <div className="space-y-12 text-left">
      {/* SECTION 1: HERO OVERVIEW */}
      <section className="bg-[#EFEBE4] border border-[#D5D0C7] rounded-[2px] p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-bold bg-[#171717] text-[#F4F1EA] px-2.5 py-0.5 rounded-[1px] uppercase">
              Full-Stack Development / AI Automation / n8n
            </span>
            <span className="px-2.5 py-0.5 text-xs font-mono font-semibold bg-[#F4F1EA] text-[#C7462D] border border-[#D5D0C7] rounded-[1px] flex items-center">
              Active Development
            </span>
          </div>
        </div>

        <div>
          <h1 className="section-title text-[#171717] uppercase">
            JobRadar AI — Job Discovery &amp; Application Automation Platform
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#171717] leading-relaxed max-w-4xl font-medium">
            A full-stack job-search automation platform that collects remote job opportunities, removes duplicates, evaluates candidate-job compatibility with AI, sends high-match email alerts, and tracks applications through a visual CRM pipeline.
          </p>
        </div>

        {/* Technology Stack Badges */}
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#6B6862]">
            Technology Stack &amp; Tools Applied
          </span>
          <div className="flex flex-wrap gap-1.5">
            {[
              'React', 'TypeScript', 'Vite', 'Tailwind CSS', 'TanStack Query', 'React Router', 'Recharts',
              'Node.js', 'Express', 'Zod', 'Supabase', 'PostgreSQL', 'Supabase Auth', 'Row Level Security',
              'n8n', 'Google Gemini', 'Gmail Integration', 'Webhooks', 'Vercel'
            ].map((tech) => (
              <span key={tech} className="px-2.5 py-1 text-xs font-mono bg-[#F4F1EA] text-[#171717] border border-[#D5D0C7] rounded-[1px]">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center gap-3 font-mono text-xs">
          <a
            href="https://job-radar-ai-frontend.vercel.app/demo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#171717] hover:bg-[#C7462D] text-[#F4F1EA] font-bold rounded-[1px] transition-all tracking-wider uppercase"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Launch Live Demo ↗</span>
          </a>
          <div className="inline-flex items-center gap-2 px-3 py-2.5 bg-[#F4F1EA] border border-[#D5D0C7] rounded-[1px] text-xs text-[#6B6862]">
            <Lock className="w-3.5 h-3.5 text-[#C7462D]" />
            <span>Source Code: Private / Available upon request</span>
          </div>
        </div>
      </section>

      {/* GALLERY & SCREENSHOT / PLACEHOLDER VIEWER */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#D5D0C7] pb-3">
          <h3 className="text-base font-bold text-[#171717] font-mono uppercase flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#C7462D]" /> Production Screenshots &amp; Workflow Execution
          </h3>
          <div className="flex bg-[#EFEBE4] p-1 rounded-[2px] border border-[#D5D0C7] text-xs font-mono">
            <button
              onClick={() => setActiveTab('screenshots')}
              className={`px-3 py-1 rounded-[1px] font-medium transition-all ${
                activeTab === 'screenshots'
                  ? 'bg-[#171717] text-[#F4F1EA] font-semibold'
                  : 'text-[#6B6862] hover:text-[#171717]'
              }`}
            >
              Workflows ({realScreenshots.length})
            </button>
            <button
              onClick={() => setActiveTab('placeholders')}
              className={`px-3 py-1 rounded-[1px] font-medium transition-all ${
                activeTab === 'placeholders'
                  ? 'bg-[#171717] text-[#F4F1EA] font-semibold'
                  : 'text-[#6B6862] hover:text-[#171717]'
              }`}
            >
              Specs ({pendingPlaceholders.length})
            </button>
          </div>
        </div>

        {activeTab === 'screenshots' ? (
          <div className="bg-[#EFEBE4] border border-[#D5D0C7] p-4 rounded-[2px] space-y-4">
            <div className="relative aspect-video rounded-[1px] overflow-hidden bg-[#F4F1EA] border border-[#D5D0C7]">
              <img
                src={realScreenshots[activeImageIndex].src}
                alt={realScreenshots[activeImageIndex].title}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute bottom-0 inset-x-0 bg-[#171717]/95 text-[#F4F1EA] backdrop-blur-sm p-3 border-t border-[#D5D0C7]">
                <span className="text-xs font-mono font-bold text-[#C7462D] block">
                  {realScreenshots[activeImageIndex].title}
                </span>
                <p className="text-xs text-slate-300 font-normal">
                  {realScreenshots[activeImageIndex].caption}
                </p>
              </div>
            </div>

            {/* Thumbnail Selectors */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {realScreenshots.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`p-2 rounded-lg border text-left transition-all ${
                    activeImageIndex === idx
                      ? 'border-emerald-500 bg-emerald-950/20 ring-1 ring-emerald-500/30'
                      : 'border-navy-800 bg-navy-900/50 hover:border-slate-600'
                  }`}
                >
                  <span className="text-[11px] font-semibold text-white truncate block">
                    {item.title}
                  </span>
                  <span className="text-[10px] text-slate-500 truncate block">Click to view</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pendingPlaceholders.map((ph) => (
              <div
                key={ph.id}
                className="bg-navy-950/60 border border-dashed border-navy-750 p-5 rounded-xl space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Layout className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wide">
                      {ph.id}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{ph.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed font-normal">
                    {ph.desc}
                  </p>
                </div>
                <div className="pt-3 border-t border-navy-850 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>Status: Design Spec Ready</span>
                  <span className="px-2 py-0.5 bg-navy-900 rounded text-slate-400">Screenshot Pending</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* SECTION 2 & 3: PROBLEM & SOLUTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-rose-950/15 border border-rose-900/30 p-6 rounded-xl space-y-3">
          <div className="flex items-center gap-2 text-rose-400 font-bold text-base">
            <AlertTriangle className="w-5 h-5" />
            <h3>The Problem</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            Job hunting across multiple platforms is repetitive. Remote job opportunities are scattered across different job boards, newsletters, and email alerts. Duplicate listings are common across aggregators, and manually parsing job specifications against personal skills consumes significant time every single day.
          </p>
        </div>

        <div className="bg-emerald-950/15 border border-emerald-900/30 p-6 rounded-xl space-y-3">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
            <CheckCircle2 className="w-5 h-5" />
            <h3>The Solution</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            JobRadar AI centralizes remote job discovery, normalizes listings from multiple sources into a unified database schema, evaluates candidate suitability with Google Gemini AI, dispatches instant email alerts for top matches, and tracks every application through a visual CRM pipeline.
          </p>
        </div>
      </div>

      {/* SECTION 4: ARCHITECTURE DIAGRAM */}
      <section className="bg-navy-950 border border-navy-800 p-6 sm:p-8 rounded-xl space-y-6">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Workflow className="w-5 h-5 text-emerald-400" /> System Architecture &amp; Data Pipeline Topology
          </h3>
          <p className="text-xs text-slate-400 font-normal">
            End-to-end data ingestion, secure Express proxying, n8n orchestration, and Gemini AI processing.
          </p>
        </div>

        {/* 1. Core Ingestion & Architecture Flow Chart */}
        <div className="space-y-4">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 block">
            1. System Topology &amp; End-to-End Pipeline
          </span>

          <div className="bg-navy-950 p-5 rounded-xl border border-navy-800 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-center text-xs font-mono">
              <div className="bg-navy-900 border border-emerald-500/30 p-3.5 rounded-lg flex flex-col justify-between items-center gap-2 shadow-lg">
                <Mail className="w-5 h-5 text-emerald-400" />
                <span className="text-white font-bold block">1. Ingestion Feeds</span>
                <span className="text-[10px] text-slate-400 leading-tight">Remotive API &amp; Gmail Alerts</span>
              </div>

              <div className="bg-navy-900 border border-blue-500/30 p-3.5 rounded-lg flex flex-col justify-between items-center gap-2 shadow-lg">
                <Workflow className="w-5 h-5 text-blue-400" />
                <span className="text-white font-bold block">2. n8n Orchestrator</span>
                <span className="text-[10px] text-slate-400 leading-tight">Normalize &amp; Hash Hashing</span>
              </div>

              <div className="bg-navy-900 border border-purple-500/30 p-3.5 rounded-lg flex flex-col justify-between items-center gap-2 shadow-lg">
                <Cpu className="w-5 h-5 text-purple-400" />
                <span className="text-white font-bold block">3. Gemini 1.5 LLM</span>
                <span className="text-[10px] text-slate-400 leading-tight">Structured Zod JSON Scoring</span>
              </div>

              <div className="bg-navy-900 border border-amber-500/30 p-3.5 rounded-lg flex flex-col justify-between items-center gap-2 shadow-lg">
                <Database className="w-5 h-5 text-amber-400" />
                <span className="text-white font-bold block">4. Supabase DB</span>
                <span className="text-[10px] text-slate-400 leading-tight">PostgreSQL &amp; RLS Policies</span>
              </div>

              <div className="bg-navy-900 border border-emerald-500/30 p-3.5 rounded-lg flex flex-col justify-between items-center gap-2 shadow-lg">
                <Layers className="w-5 h-5 text-emerald-400" />
                <span className="text-white font-bold block">5. React CRM</span>
                <span className="text-[10px] text-slate-400 leading-tight">TanStack Query Dashboard</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Secure Trigger Path */}
        <div className="space-y-3 pt-4 border-t border-navy-850">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block">
            2. Secure Webhook &amp; Authentication Control Flow
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs font-mono">
            <div className="bg-navy-900 border border-navy-800 p-3 rounded-lg text-center space-y-1">
              <span className="text-emerald-400 font-bold block">React Dashboard</span>
              <span className="text-[10px] text-slate-400">Authenticated trigger invocation</span>
            </div>
            <div className="bg-navy-900 border border-navy-800 p-3 rounded-lg text-center space-y-1">
              <span className="text-blue-400 font-bold block">Express Proxy</span>
              <span className="text-[10px] text-slate-400">Verifies Supabase JWT Token</span>
            </div>
            <div className="bg-navy-900 border border-navy-800 p-3 rounded-lg text-center space-y-1">
              <span className="text-purple-400 font-bold block">n8n Protected Webhook</span>
              <span className="text-[10px] text-slate-400">Secret header authentication</span>
            </div>
            <div className="bg-navy-900 border border-navy-800 p-3 rounded-lg text-center space-y-1">
              <span className="text-emerald-400 font-bold block">Supabase Realtime Sync</span>
              <span className="text-[10px] text-slate-400">Updates application stage pipeline</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: MAIN WORKFLOWS */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-navy-800 pb-3">
          <Zap className="w-5 h-5 text-emerald-400" /> Core Automation Workflows
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-navy-950/80 border border-navy-800 p-5 rounded-xl space-y-3">
            <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded">
              Workflow 01
            </span>
            <h4 className="font-bold text-white text-base">Job Collector</h4>
            <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside leading-relaxed font-normal">
              <li>Triggered via schedule or protected Express webhook.</li>
              <li>Ingests Remotive public API &amp; email alerts (LinkedIn, OnlineJobs.ph, JobStreet).</li>
              <li>Normalizes fields, filters non-remote roles, deduplicates via canonical URLs.</li>
              <li>Inserts/updates Supabase database and logs execution status.</li>
            </ul>
          </div>

          <div className="bg-navy-950/80 border border-navy-800 p-5 rounded-xl space-y-3">
            <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded">
              Workflow 02
            </span>
            <h4 className="font-bold text-white text-base">AI Job Matcher</h4>
            <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside leading-relaxed font-normal">
              <li>Queries unanalyzed jobs from Supabase.</li>
              <li>Constructs candidate evaluation prompts with skill criteria.</li>
              <li>Invokes Google Gemini for structured compatibility scoring.</li>
              <li>Validates JSON schemas and saves match reports.</li>
            </ul>
          </div>

          <div className="bg-navy-950/80 border border-navy-800 p-5 rounded-xl space-y-3">
            <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded">
              Workflow 03
            </span>
            <h4 className="font-bold text-white text-base">Smart Email Alerts</h4>
            <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside leading-relaxed font-normal">
              <li>Queries high-scoring "Apply" recommendations.</li>
              <li>Verifies notification history to eliminate duplicate alerts.</li>
              <li>Hydrates role specs and application links.</li>
              <li>Dispatches email alert and logs notification record.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 6: AI MATCHING OUTPUT SCHEMA & INTERFACE */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-navy-800 pb-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" /> Gemini AI Compatibility Analysis Schema
          </h3>
          <span className="text-xs font-mono text-slate-400 bg-navy-900 border border-navy-800 px-2.5 py-1 rounded">
            Structured Output Schema
          </span>
        </div>

        <div className="bg-navy-950 border border-emerald-500/30 rounded-xl p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-navy-800 pb-4">
            <div>
              <span className="text-xs font-mono text-slate-400 block">Evaluated Record Structure</span>
              <h4 className="text-base sm:text-lg font-bold text-white">Full Stack React / Node Developer</h4>
              <span className="text-xs text-slate-400">Canonical Job Record • Verified Ingestion</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-xs font-mono text-slate-400 block">Scoring System</span>
                <span className="text-xl font-extrabold text-emerald-400">0% – 100% Match</span>
              </div>
              <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-navy-950 bg-emerald-400 rounded-md">
                Enum: Apply / Maybe / Skip
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block mb-1.5">
                  Matched Skills Extraction (`matchedSkills`)
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['React', 'TypeScript', 'Node.js', 'Express', 'Supabase', 'PostgreSQL', 'REST APIs', 'Tailwind CSS'].map((s) => (
                    <span key={s} className="text-xs font-mono px-2 py-0.5 bg-emerald-950/40 text-emerald-300 border border-emerald-900/40 rounded">
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider block mb-1.5">
                  Missing Skills Analysis (`missingSkills`)
                </span>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Identifies skill gaps mentioned in the job description that are missing from candidate profile for targeted review.
                </p>
              </div>

              <div>
                <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider block mb-1.5">
                  Transferable Strengths (`strengths`)
                </span>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Generates technical summary of how existing experience maps to specific role requirements.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block mb-1.5">
                  Potential Concerns (`concerns`)
                </span>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Highlights strict prerequisites, experience thresholds, or missing niche tools.
                </p>
              </div>

              <div>
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block mb-1.5">
                  Location &amp; Remote Eligibility (`locationCompatibility`)
                </span>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Evaluates worldwide vs regional remote restrictions against candidate timezone and origin.
                </p>
              </div>

              <div>
                <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider block mb-1.5">
                  Interview &amp; Resume Guidance (`resumeTips`)
                </span>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  Tailored suggestions for introductory messaging and technical portfolio highlights.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: APPLICATION CRM PIPELINE ARCHITECTURE */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-navy-800 pb-3">
          <Layers className="w-5 h-5 text-emerald-400" /> Application CRM Pipeline Lifecycle
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 font-mono text-xs">
          {[
            { label: 'Discovered', desc: 'Normalized listings ingested from APIs & email alerts', color: 'border-slate-700 bg-navy-900/60 text-slate-300' },
            { label: 'Saved', desc: 'Bookmarked by candidate for further evaluation', color: 'border-blue-800/60 bg-blue-950/20 text-blue-300' },
            { label: 'Applied', desc: 'Application submitted with date tracking', color: 'border-emerald-800/60 bg-emerald-950/20 text-emerald-300' },
            { label: 'Interview', desc: 'Screening or technical interviews scheduled', color: 'border-purple-800/60 bg-purple-950/20 text-purple-300' },
            { label: 'Offer', desc: 'Formal employment offer received', color: 'border-amber-800/60 bg-amber-950/20 text-amber-300' },
            { label: 'Rejected', desc: 'Application archived or position filled', color: 'border-rose-800/60 bg-rose-950/20 text-rose-300' }
          ].map((stage) => (
            <div key={stage.label} className={`border p-3.5 rounded-lg flex flex-col justify-between space-y-2 ${stage.color}`}>
              <span className="font-bold text-sm block">{stage.label}</span>
              <p className="text-[11px] font-normal leading-relaxed text-slate-400 font-sans">{stage.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 8 & 9: RELIABILITY & SECURITY ARCHITECTURE */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-navy-950 border border-navy-800 p-6 rounded-xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-navy-800 pb-2.5">
            <RefreshCw className="w-4.5 h-4.5 text-emerald-400" /> Reliability &amp; Error Resilience
          </h3>
          <ul className="text-xs text-slate-300 space-y-2.5 leading-relaxed font-normal">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Canonical URL Deduplication:</strong> Hashing canonical URLs to prevent duplicate database rows across aggregators.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Database Uniqueness Constraints:</strong> PostgreSQL unique composite indexes prevent duplicate entries even under concurrent executions.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Zod AI Validation:</strong> Every Gemini JSON output is parsed against strict TypeScript/Zod schemas before insertion.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Execution Logs &amp; Retries:</strong> Failed workflow runs are captured with correlation IDs for automated retry handling.</span>
            </li>
          </ul>
        </div>

        <div className="bg-navy-950 border border-navy-800 p-6 rounded-xl space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-navy-800 pb-2.5">
            <Shield className="w-4.5 h-4.5 text-emerald-400" /> Security &amp; Data Isolation
          </h3>
          <ul className="text-xs text-slate-300 space-y-2.5 leading-relaxed font-normal">
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Zero Frontend API Keys:</strong> React does not call n8n or Gemini directly; sensitive tokens reside purely in server environment variables.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Authenticated Express Proxy:</strong> Express validates Supabase access tokens before forwarding requests to n8n webhooks.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Protected Webhook Headers:</strong> Server-only secret headers guard all external n8n trigger endpoints.</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Supabase Row Level Security:</strong> PostgreSQL RLS policies restrict job and application data to the authenticated owner ID.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* SECTION 10: CHALLENGES & SOLUTIONS */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-navy-800 pb-3">
          <FileCode2 className="w-5 h-5 text-emerald-400" /> Technical Challenges &amp; Solutions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              challenge: 'Job sources return inconsistent data formats and HTML structures.',
              solution: 'Constructed standard normalization nodes in n8n that map raw fields into a unified Supabase job schema.'
            },
            {
              challenge: 'Job platforms restrict automated public web scraping.',
              solution: 'Ingested official user-configured job-alert emails (LinkedIn, JobStreet, OnlineJobs.ph) and public APIs, preserving original source links.'
            },
            {
              challenge: 'AI responses are naturally unstructured and can break database inputs.',
              solution: 'Enforced structured Gemini JSON responses and validated outputs with Zod schemas before database updates.'
            },
            {
              challenge: 'Repeated workflow executions risk duplicating job alerts and database records.',
              solution: 'Combined canonical URL lookups, owner-scoped queries, and database uniqueness constraints to ensure idempotent processing.'
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-navy-950/70 border border-navy-800 p-5 rounded-xl space-y-2">
              <span className="text-xs font-mono font-bold text-rose-400 block">Challenge {idx + 1}: {item.challenge}</span>
              <span className="text-xs font-mono font-bold text-emerald-400 block">Solution: {item.solution}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 11: WHAT I LEARNED */}
      <section className="bg-navy-950 border border-navy-800 p-6 sm:p-8 rounded-xl space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-navy-800 pb-3">
          <Cpu className="w-5 h-5 text-emerald-400" /> Key Technical Takeaways
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-300 font-normal">
          {[
            'Designing production-style n8n orchestration workflows.',
            'Integrating REST APIs alongside email-based data ingestion pipelines.',
            'Structuring and validating LLM output for database storage.',
            'Implementing secure React-to-Express-to-n8n communication architecture.',
            'Designing PostgreSQL database schemas and Row Level Security policies.',
            'Building reliable automation with retries, execution logs, and duplicate protection.',
            'Connecting background automation engines to a responsive React dashboard interface.'
          ].map((point, idx) => (
            <div key={idx} className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{point}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 12: FUTURE IMPROVEMENTS ROADMAP */}
      <section className="bg-navy-950/40 border border-navy-800 p-6 sm:p-8 rounded-xl space-y-4">
        <div className="flex items-center justify-between border-b border-navy-800 pb-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-400" /> Planned Future Enhancements
          </h3>
          <span className="text-xs font-mono text-slate-400 bg-navy-900 border border-navy-800 px-2.5 py-1 rounded">
            Roadmap
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {[
            'Additional permitted job sources',
            'Improved source-specific email parsing',
            'Resume version tracking per role',
            'Interview scheduling integration',
            'Automated follow-up reminders',
            'Skill-gap analytics dashboard',
            'Automated tests for n8n workflows',
            'Containerized self-hosting & monitoring'
          ].map((item, idx) => (
            <div key={idx} className="bg-navy-900/60 border border-navy-800 p-3 rounded-lg flex items-center gap-2 text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
