import React, { useState } from 'react';
import {
  Shield,
  CheckCircle2,
  AlertTriangle,
  Workflow,
  Cpu,
  Database,
  Lock,
  Zap,
  Layers,
  Sparkles,
  Eye,
  Github,
  HardDrive,
  FileText,
  BarChart3,
} from 'lucide-react';

export const CareerOSCaseStudy: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'screenshots' | 'specs'>('screenshots');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const realScreenshots = [
    {
      title: 'CareerOS Central Operating System Dashboard',
      src: '/img/Os.png',
      caption:
        'Local-first desktop career management hub displaying active job application metrics, timeline events, and context-aware Groq AI session launcher.',
    },
    {
      title: '11-Stage Application Kanban Board & CRM',
      src: '/img/os1.png',
      caption:
        'Interactive 11-stage Kanban drag-and-drop application pipeline with native HTML5 events, instant SQLite error rollback, and milestone logging.',
    },
    {
      title: 'Context-Aware AI Assistant & Document Parser',
      src: '/img/os2.png',
      caption:
        'Groq Llama-3.3 70B conversation trees featuring removable UI attachment chips ([Job], [Resume]), XML security boundaries, and local text stream extractions.',
    },
  ];

  const architecturalSpecs = [
    {
      id: 'zero-cloud-parser',
      title: 'Zero-Cloud Local Document Text Extraction',
      desc: 'Native client-side ArrayBuffer text stream decoding for PDFs (Tj/TJ operators) and memory-decompressed word/document.xml <w:t> parsing for DOCX resumes—100% offline with zero cloud API reliance.',
      icon: FileText,
      tag: 'Local Parsing',
    },
    {
      id: 'prompt-injection-defense',
      title: 'Prompt Injection Defense & Context Isolation',
      desc: 'contextResolverService.ts wraps attached job and resume records inside strict <career_context_data> XML boundaries with character caps (3k/6k) and aiSchemaValidator JSON verification.',
      icon: Shield,
      tag: 'AI Security',
    },
    {
      id: 'typed-event-bus',
      title: 'Typed Event Bus (dataEventBus.ts)',
      desc: 'Lightweight cross-module event bus emitting domain events (jobs:changed, timeline:changed) to invalidate SQLite hooks asynchronously without complex global state stores.',
      icon: Zap,
      tag: 'State & Events',
    },
    {
      id: 'tauri-stronghold',
      title: 'Tauri Stronghold Encrypted Key Vault',
      desc: 'AES-256-GCM encrypted native desktop vault storing Groq API keys with zero exposure to React state or browser localStorage, accessed exclusively via Rust IPC.',
      icon: Lock,
      tag: 'Native Security',
    },
  ];

  return (
    <div className="space-y-12 text-left">
      {/* SECTION 1: HERO OVERVIEW */}
      <section className="bg-[#EFEBE4] border border-[#D5D0C7] rounded-[2px] p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-bold bg-[#171717] text-[#F4F1EA] px-2.5 py-0.5 rounded-[1px] uppercase">
              Desktop Native / Tauri 2 / Rust / SQLite
            </span>
            <span className="px-2.5 py-0.5 text-xs font-mono font-semibold bg-[#F4F1EA] text-[#C7462D] border border-[#D5D0C7] rounded-[1px] flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Windows Career OS
            </span>
          </div>
          <span className="text-xs font-mono font-bold text-[#6B6862] uppercase">
            Lead Software Architect
          </span>
        </div>

        <div>
          <h1 className="section-title text-[#171717] uppercase">
            CareerOS — Local-First Windows Career Operating System
          </h1>
          <p className="mt-3 text-sm sm:text-base text-[#171717] leading-relaxed max-w-4xl font-medium">
            A privacy-centric, desktop career management engine powered by Tauri 2, React 19, SQLite, and Context-Aware AI. Designed to replace fragmented job search spreadsheets, online resume formatting tools, and generic ChatGPT windows—storing 100% of user data locally on the user's PC.
          </p>
        </div>

        {/* Technology Stack Badges */}
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#6B6862]">
            Technology Stack &amp; Desktop Architecture
          </span>
          <div className="flex flex-wrap gap-1.5">
            {[
              'Tauri 2',
              'Rust',
              'React 19',
              'TypeScript ~5.8',
              'Vite',
              'SQLite',
              '@tauri-apps/plugin-sql',
              'Tauri Stronghold',
              'Groq Llama-3.3 70B',
              'XML Security Boundaries',
              'aiSchemaValidator',
              'ArrayBuffer Document Parser',
              'Typed Event Bus',
              'Vanilla CSS',
            ].map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-mono bg-[#F4F1EA] text-[#171717] border border-[#D5D0C7] rounded-[1px]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center gap-3 font-mono text-xs">
          <a
            href="https://github.com/RaizelHub/careeros"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#171717] hover:bg-[#C7462D] text-[#F4F1EA] font-bold rounded-[1px] transition-all tracking-wider uppercase"
          >
            <Github className="w-4 h-4" />
            <span>INSPECT SOURCE CODE ↗</span>
          </a>
          <div className="inline-flex items-center gap-2 px-3 py-2.5 bg-[#F4F1EA] border border-[#D5D0C7] rounded-[1px] text-xs text-[#6B6862]">
            <HardDrive className="w-3.5 h-3.5 text-[#C7462D]" />
            <span>100% Local Desktop Storage (SQLite careeros.db)</span>
          </div>
        </div>
      </section>

      {/* GALLERY & SCREENSHOT / ARCHITECTURAL VIEWER */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#D5D0C7] pb-3">
          <h3 className="text-base font-bold text-[#171717] font-mono uppercase flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#C7462D]" /> Desktop App Interface &amp; Feature Breakdown
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
              onClick={() => setActiveTab('specs')}
              className={`px-3 py-1 rounded-[1px] font-medium transition-all ${
                activeTab === 'specs'
                  ? 'bg-[#171717] text-[#F4F1EA] font-semibold'
                  : 'text-[#6B6862] hover:text-[#171717]'
              }`}
            >
              Architectural Specs ({architecturalSpecs.length})
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
                <span className="text-xs font-mono font-bold text-[#C7462D] block uppercase">
                  {realScreenshots[activeImageIndex].title}
                </span>
                <p className="text-xs text-[#D5D0C7] font-normal mt-0.5">
                  {realScreenshots[activeImageIndex].caption}
                </p>
              </div>
            </div>

            {/* Thumbnail Selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {realScreenshots.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`p-3 rounded-[1px] border text-left transition-all font-mono ${
                    activeImageIndex === idx
                      ? 'border-[#C7462D] bg-[#F4F1EA]'
                      : 'border-[#D5D0C7] bg-[#F4F1EA]/50 hover:border-[#171717]'
                  }`}
                >
                  <span className="text-xs font-bold text-[#171717] truncate block uppercase">
                    0{idx + 1}. {item.title}
                  </span>
                  <span className="text-[10px] text-[#6B6862] truncate block mt-0.5">
                    Click to view screenshot
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {architecturalSpecs.map((spec) => {
              const Icon = spec.icon;
              return (
                <div
                  key={spec.id}
                  className="bg-[#EFEBE4] border border-[#D5D0C7] p-5 rounded-[2px] space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[#C7462D]">
                        <Icon className="w-4 h-4 shrink-0" />
                        <span className="text-xs font-mono font-bold uppercase tracking-wide text-[#171717]">
                          {spec.title}
                        </span>
                      </div>
                      <span className="px-2 py-0.5 bg-[#171717] text-[#F4F1EA] text-[10px] font-mono font-bold rounded-[1px] uppercase">
                        {spec.tag}
                      </span>
                    </div>
                    <p className="text-xs text-[#6B6862] leading-relaxed font-normal pt-1">
                      {spec.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* PROBLEM & SOLUTION GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#EFEBE4] border border-[#D5D0C7] p-6 rounded-[2px] space-y-3">
          <div className="flex items-center gap-2 text-[#C7462D] font-mono font-bold text-sm uppercase">
            <AlertTriangle className="w-5 h-5" />
            <h3>THE PROBLEM SPECIFICATION</h3>
          </div>
          <p className="text-xs sm:text-sm text-[#6B6862] leading-relaxed font-normal">
            Job seekers traditionally juggle disconnected tools—spreadsheets for job tracking, external web tools for resume formatting, generic ChatGPT windows for interview prep, and text files for skill gaps. This workflow causes severe fragmentation:
          </p>
          <ul className="text-xs text-[#171717] space-y-2 pt-1 font-mono">
            <li className="flex items-start gap-2">
              <span className="text-[#C7462D] font-bold">•</span>
              <span><strong>Data Re-entry &amp; Friction:</strong> Users manually copy-paste company names, job titles, and resume content repeatedly.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#C7462D] font-bold">•</span>
              <span><strong>Context-Blind AI:</strong> Generic AI chatbots lack memory of active applications, skills, or resume versions.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#C7462D] font-bold">•</span>
              <span><strong>Privacy Risks:</strong> Uploading raw resumes and background data to third-party cloud tools poses privacy concerns.</span>
            </li>
          </ul>
        </div>

        <div className="bg-[#EFEBE4] border border-[#D5D0C7] p-6 rounded-[2px] space-y-3">
          <div className="flex items-center gap-2 text-[#171717] font-mono font-bold text-sm uppercase">
            <CheckCircle2 className="w-5 h-5 text-[#C7462D]" />
            <h3>THE ARCHITECTURAL SOLUTION</h3>
          </div>
          <p className="text-xs sm:text-sm text-[#6B6862] leading-relaxed font-normal">
            CareerOS unifies career management into one connected desktop operating system with local-first security and context-aware intelligence:
          </p>
          <ul className="text-xs text-[#171717] space-y-2 pt-1 font-mono">
            <li className="flex items-start gap-2">
              <span className="text-[#C7462D] font-bold">•</span>
              <span><strong>Connected Domain Workflows:</strong> Job Analyzer skill gaps auto-populate Learning Goals; Offer/Hired status logs Timeline milestones.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#C7462D] font-bold">•</span>
              <span><strong>Context-Aware AI Assistant:</strong> Attach target Job postings and Resume records using removable UI chips ([ Job ], [ Resume ]).</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#C7462D] font-bold">•</span>
              <span><strong>100% Local Processing &amp; Privacy:</strong> All records, notes, and document text remain in a local SQLite database (careeros.db).</span>
            </li>
          </ul>
        </div>
      </div>

      {/* SYSTEM ARCHITECTURE & DATA PIPELINE */}
      <section className="bg-[#EFEBE4] border border-[#D5D0C7] p-6 sm:p-8 rounded-[2px] space-y-6">
        <div className="space-y-1">
          <h3 className="text-base sm:text-lg font-bold text-[#171717] font-mono uppercase flex items-center gap-2">
            <Workflow className="w-5 h-5 text-[#C7462D]" /> System Architecture &amp; Data Pipeline Topology
          </h3>
          <p className="text-xs text-[#6B6862] font-mono">
            Native Win32 windowing, Tauri 2 Rust IPC, local SQLite storage, Stronghold key vault, and Groq Llama-3.3 AI context resolver.
          </p>
        </div>

        <div className="bg-[#F4F1EA] p-5 rounded-[2px] border border-[#D5D0C7] space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-center text-xs font-mono">
            <div className="bg-[#EFEBE4] border border-[#D5D0C7] p-4 rounded-[2px] flex flex-col justify-between items-center gap-2">
              <HardDrive className="w-6 h-6 text-[#C7462D]" />
              <div>
                <span className="font-bold text-[#171717] block uppercase">Desktop Shell</span>
                <span className="text-[10px] text-[#6B6862]">Tauri 2 (Rust / Win32)</span>
              </div>
            </div>

            <div className="bg-[#EFEBE4] border border-[#D5D0C7] p-4 rounded-[2px] flex flex-col justify-between items-center gap-2">
              <Database className="w-6 h-6 text-[#171717]" />
              <div>
                <span className="font-bold text-[#171717] block uppercase">Local Storage</span>
                <span className="text-[10px] text-[#6B6862]">SQLite (careeros.db)</span>
              </div>
            </div>

            <div className="bg-[#EFEBE4] border border-[#D5D0C7] p-4 rounded-[2px] flex flex-col justify-between items-center gap-2">
              <Layers className="w-6 h-6 text-[#C7462D]" />
              <div>
                <span className="font-bold text-[#171717] block uppercase">UI &amp; Event Bus</span>
                <span className="text-[10px] text-[#6B6862]">React 19 + dataEventBus</span>
              </div>
            </div>

            <div className="bg-[#EFEBE4] border border-[#D5D0C7] p-4 rounded-[2px] flex flex-col justify-between items-center gap-2">
              <Lock className="w-6 h-6 text-[#171717]" />
              <div>
                <span className="font-bold text-[#171717] block uppercase">Vault &amp; Parser</span>
                <span className="text-[10px] text-[#6B6862]">Tauri Stronghold &amp; ArrayBuffer</span>
              </div>
            </div>

            <div className="bg-[#EFEBE4] border border-[#D5D0C7] p-4 rounded-[2px] flex flex-col justify-between items-center gap-2">
              <Cpu className="w-6 h-6 text-[#C7462D]" />
              <div>
                <span className="font-bold text-[#171717] block uppercase">Groq AI Engine</span>
                <span className="text-[10px] text-[#6B6862]">Llama-3.3 70B + XML Tags</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KEY TECHNICAL CHALLENGES & ENGINEERING SOLUTIONS */}
      <section className="space-y-4">
        <h3 className="text-base font-bold text-[#171717] font-mono uppercase flex items-center gap-2 border-b border-[#D5D0C7] pb-2">
          <Zap className="w-4 h-4 text-[#C7462D]" /> Key Technical Challenges &amp; Engineering Solutions
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {/* Challenge 1 */}
          <div className="bg-[#EFEBE4] border border-[#D5D0C7] p-5 rounded-[2px] space-y-2 font-mono">
            <span className="text-[10px] bg-[#171717] text-[#F4F1EA] px-2 py-0.5 rounded-[1px] uppercase font-bold">
              01 // Document Parsing
            </span>
            <h4 className="text-sm font-bold text-[#171717] uppercase pt-1">
              Zero-Cloud Local Document Text Extraction
            </h4>
            <p className="text-xs text-[#6B6862] leading-relaxed">
              <strong>Challenge:</strong> Extracting plain text from uploaded PDF and DOCX resume files without uploading raw files to third-party cloud parsing services.
            </p>
            <p className="text-xs text-[#171717] leading-relaxed bg-[#F4F1EA] p-3 rounded-[1px] border border-[#D5D0C7] mt-2">
              <strong>Solution:</strong> Developed <code className="text-[#C7462D]">resumeTextExtractor.ts</code> using native browser ArrayBuffer text stream decoding. For .docx files, the engine decompresses the zip container in memory and parses <code className="text-[#C7462D]">&lt;w:t&gt;</code> text elements from word/document.xml. For .pdf files, it decodes literal text streams (Tj/TJ operators) completely offline.
            </p>
          </div>

          {/* Challenge 2 */}
          <div className="bg-[#EFEBE4] border border-[#D5D0C7] p-5 rounded-[2px] space-y-2 font-mono">
            <span className="text-[10px] bg-[#171717] text-[#F4F1EA] px-2 py-0.5 rounded-[1px] uppercase font-bold">
              02 // AI Security &amp; Safety
            </span>
            <h4 className="text-sm font-bold text-[#171717] uppercase pt-1">
              Prompt Injection Defense &amp; Context Isolation
            </h4>
            <p className="text-xs text-[#6B6862] leading-relaxed">
              <strong>Challenge:</strong> Malicious or poorly formatted job postings containing instructions like "Ignore previous system prompts" could corrupt AI behavior when attached to chat conversations.
            </p>
            <p className="text-xs text-[#171717] leading-relaxed bg-[#F4F1EA] p-3 rounded-[1px] border border-[#D5D0C7] mt-2">
              <strong>Solution:</strong> Engineered <code className="text-[#C7462D]">contextResolverService.ts</code> to wrap attached records inside explicit XML tags (<code className="text-[#C7462D]">&lt;career_context_data&gt;</code>) with system-level instruction boundaries. Implemented text character caps (3,000 chars for Job postings, 6,000 chars for Resumes) to prevent context window overflow.
            </p>
          </div>

          {/* Challenge 3 */}
          <div className="bg-[#EFEBE4] border border-[#D5D0C7] p-5 rounded-[2px] space-y-2 font-mono">
            <span className="text-[10px] bg-[#171717] text-[#F4F1EA] px-2 py-0.5 rounded-[1px] uppercase font-bold">
              03 // Reactive State &amp; Sync
            </span>
            <h4 className="text-sm font-bold text-[#171717] uppercase pt-1">
              Cross-Module Live Data Sync Without Global Bloat
            </h4>
            <p className="text-xs text-[#6B6862] leading-relaxed">
              <strong>Challenge:</strong> Updating a job status or completing a learning goal needed to update Dashboard metrics, Timeline activity logs, and Analytics instantly without reloading the page or using complex global state stores like Redux.
            </p>
            <p className="text-xs text-[#171717] leading-relaxed bg-[#F4F1EA] p-3 rounded-[1px] border border-[#D5D0C7] mt-2">
              <strong>Solution:</strong> Designed a lightweight, typed event bus (<code className="text-[#C7462D]">dataEventBus.ts</code>). Components emit domain events (jobs:changed, timeline:changed, dashboard:invalidate), triggering subscribed hooks (useJobs, useDashboard) to re-query SQLite asynchronously and update local state seamlessly.
            </p>
          </div>

          {/* Challenge 4 */}
          <div className="bg-[#EFEBE4] border border-[#D5D0C7] p-5 rounded-[2px] space-y-2 font-mono">
            <span className="text-[10px] bg-[#171717] text-[#F4F1EA] px-2 py-0.5 rounded-[1px] uppercase font-bold">
              04 // Credential Security
            </span>
            <h4 className="text-sm font-bold text-[#171717] uppercase pt-1">
              Native Security &amp; Credential Isolation
            </h4>
            <p className="text-xs text-[#6B6862] leading-relaxed">
              <strong>Challenge:</strong> Storing Groq API keys securely without exposing secrets to plain React state or browser localStorage.
            </p>
            <p className="text-xs text-[#171717] leading-relaxed bg-[#F4F1EA] p-3 rounded-[1px] border border-[#D5D0C7] mt-2">
              <strong>Solution:</strong> Integrated Tauri Stronghold (<code className="text-[#C7462D]">@tauri-apps/plugin-stronghold</code>), storing API keys in an AES-256-GCM encrypted desktop vault. Raw keys are retrieved asynchronously via Rust IPC only when executing completions.
            </p>
          </div>
        </div>
      </section>

      {/* KEY ACCOMPLISHMENTS & METRICS */}
      <section className="bg-[#EFEBE4] border border-[#D5D0C7] p-6 rounded-[2px] space-y-4">
        <h3 className="text-base font-bold text-[#171717] font-mono uppercase flex items-center gap-2 border-b border-[#D5D0C7] pb-2">
          <BarChart3 className="w-4 h-4 text-[#C7462D]" /> Key Accomplishments &amp; Architectural Metrics
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-center">
          <div className="bg-[#F4F1EA] border border-[#D5D0C7] p-4 rounded-[1px]">
            <span className="text-2xl font-bold text-[#171717] block">&lt; 50ms</span>
            <span className="text-[10px] text-[#6B6862] uppercase block mt-1">SQLite DB Init Time</span>
          </div>
          <div className="bg-[#F4F1EA] border border-[#D5D0C7] p-4 rounded-[1px]">
            <span className="text-2xl font-bold text-[#C7462D] block">100%</span>
            <span className="text-[10px] text-[#6B6862] uppercase block mt-1">Local Data &amp; PDF Parsing</span>
          </div>
          <div className="bg-[#F4F1EA] border border-[#D5D0C7] p-4 rounded-[1px]">
            <span className="text-2xl font-bold text-[#171717] block">11 Stages</span>
            <span className="text-[10px] text-[#6B6862] uppercase block mt-1">Interactive Kanban Pipeline</span>
          </div>
          <div className="bg-[#F4F1EA] border border-[#D5D0C7] p-4 rounded-[1px]">
            <span className="text-2xl font-bold text-[#C7462D] block">&lt; 9s</span>
            <span className="text-[10px] text-[#6B6862] uppercase block mt-1">Frontend Vite Build Time</span>
          </div>
        </div>
      </section>

      {/* KEY PORTFOLIO HIGHLIGHTS / BULLET POINTS */}
      <section className="bg-[#EFEBE4] border border-[#D5D0C7] p-6 rounded-[2px] space-y-3 font-mono">
        <h3 className="text-base font-bold text-[#171717] uppercase flex items-center gap-2 border-b border-[#D5D0C7] pb-2">
          <Sparkles className="w-4 h-4 text-[#C7462D]" /> Key Portfolio Bullets (Resume / Technical Summary)
        </h3>
        <div className="space-y-2.5 text-xs text-[#171717] pt-1">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#C7462D] shrink-0 mt-0.5" />
            <span>
              <strong>Engineered a local-first desktop application</strong> using Tauri 2, React 19, TypeScript, Rust, and SQLite, providing end-to-end management of job application pipelines, mock interview prep, and career analytics.
            </span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#C7462D] shrink-0 mt-0.5" />
            <span>
              <strong>Implemented zero-dependency local text extraction</strong> for PDF and DOCX resumes, parsing document XML streams locally in-memory without third-party cloud APIs.
            </span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#C7462D] shrink-0 mt-0.5" />
            <span>
              <strong>Architected a context-aware AI integration</strong> powered by Groq Llama-3.3 70B, featuring explicit record attachment chips, XML security boundaries, and schema validation (aiSchemaValidator) for safe JSON responses.
            </span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#C7462D] shrink-0 mt-0.5" />
            <span>
              <strong>Secured user credentials using Tauri Stronghold</strong>, storing API keys inside an encrypted native desktop vault with zero exposure to localStorage or React component state.
            </span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#C7462D] shrink-0 mt-0.5" />
            <span>
              <strong>Designed a lightweight typed event bus (dataEventBus)</strong> to synchronize live SQLite data invalidations across Dashboard, Timeline, and Job Tracker modules seamlessly.
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
