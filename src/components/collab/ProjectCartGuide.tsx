import { useState, useMemo } from 'react';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Github,
  HardHat,
  Play,
  RotateCcw,
  Sparkles,
  Wrench,
  Zap,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Project } from '../../types';
import { useSound } from '../../context/SoundContext';

type Props = {
  project: Project;
  isWIP?: boolean;
};

type DialogueTopic = 'overview' | 'tech' | 'status' | 'challenges' | 'results';

function formatField(value: unknown, fallback: string): string {
  if (!value) return fallback;
  if (typeof value === 'string') return value;
  if (Array.isArray(value)) {
    const text = value
      .map((item) => {
        if (typeof item === 'string') return item;
        if (item && typeof item === 'object') {
          if ('challenge' in item) return `${item.challenge}: ${(item as { solution?: string }).solution || ''}`;
          if ('title' in item) return `${item.title}: ${(item as { description?: string }).description || ''}`;
          if ('decision' in item) return `${item.decision}: ${(item as { rationale?: string }).rationale || ''}`;
        }
        return '';
      })
      .filter(Boolean)
      .join(' ');
    return text || fallback;
  }
  return fallback;
}

export function ProjectCartGuide({ project, isWIP }: Props) {
  const { playClick } = useSound();
  const [activeTopic, setActiveTopic] = useState<DialogueTopic>('overview');

  // Interactive Mini-Demo States
  const isBudgetOnHold = project.slug === 'subora' || project.slug === 'vocara';
  const isActuallyWIP = Boolean(
    isWIP ||
    project.status?.toLowerCase().includes('development') ||
    project.status?.toLowerCase().includes('wip')
  );

  // Vocara Interactive Mini-Simulator State
  const [vocaraQuestion, setVocaraQuestion] = useState(0);
  const [vocaraRunning, setVocaraRunning] = useState(false);
  const vocaraQuestions = [
    {
      q: 'How do you coordinate offline sync and async API state in React Native?',
      feedback: 'Strong answer structure. STAR methodology followed: situation (offline drops), task (guarantee persistence), action (optimistic UI + background queue), result (0 data loss). Clarity: 94%, Delivery Confidence: 92%.',
    },
    {
      q: 'Explain your choice of Supabase Edge Functions over client-side AI keys.',
      feedback: 'Excellent security rationale. Moving Groq API keys server-side protects credentials and enables streaming audio processing without heavy client payloads.',
    },
  ];

  // Subora Interactive Mini-Simulator State
  const [suboraSubs, setSuboraSubs] = useState([
    { name: 'Netflix 4K', cost: 19.99, detected: true },
    { name: 'Spotify Premium', cost: 11.99, detected: true },
    { name: 'GitHub Copilot', cost: 10.00, detected: true },
  ]);
  const [duplicateTriggered, setDuplicateTriggered] = useState(false);

  // Smart Pipe Interactive Mini-Simulator State
  const [valveOpen, setValveOpen] = useState(true);
  const [flowRate, setFlowRate] = useState(42.5);

  // Dynamic dialogue responses based on project data
  const dialogues = useMemo(() => {
    let statusLabel = isActuallyWIP ? "What's the current build status?" : 'Is this project live?';
    let statusSpeech = isActuallyWIP
      ? `We're actively building this! Current status is [${project.status}]. We've completed the data models, Gmail OAuth integration, and core serverless pipelines. We're currently fine-tuning duplicate detection and notification flows.`
      : `This project is [${project.status}]! All core features, auth workflows, API integrations, and database schemas are fully operational.`;
    let statusHighlight = isActuallyWIP
      ? 'Active Prototype Workbench — 75% complete. Testing Gmail OAuth & Supabase Edge Functions.'
      : 'Fully tested, documented, and production ready.';

    if (isBudgetOnHold) {
      statusLabel = 'Why is this not deployed to live app stores / cloud?';
      statusSpeech = `The entire system, architecture, auth flows, and edge functions are fully engineered and tested locally! However, it is not currently deployed to the public App Stores / Google Play and live cloud servers due to infrastructure and API budget limitations (such as Google Cloud verification, developer program fees, and production Groq AI inference quotas). The full codebase and architecture case study are open for review.`;
      statusHighlight = 'Fully Engineered Prototype · Production Cloud Deployment On Hold (Budget Constraints)';
    }

    return {
      overview: {
        label: 'What does this project do?',
        speech: formatField(project.longDescription, project.description),
        highlight: formatField(project.solution, project.description),
      },
      tech: {
        label: 'What tech stack & architecture?',
        speech: `We engineered this with ${project.technologies.slice(0, 5).join(', ')}. The architecture is: ${formatField(project.architecture, `${project.technologies[0]} client communicating with Supabase PostgreSQL and serverless APIs.`)}`,
        highlight: formatField(project.technicalDecisions, 'Architected for reliability, low-latency inference, and secure multi-tenant Row Level Security.'),
      },
      status: {
        label: statusLabel,
        speech: statusSpeech,
        highlight: statusHighlight,
      },
      challenges: {
        label: 'What was the hardest challenge?',
        speech: formatField(project.challenges, 'Coordinating complex asynchronous state updates and ensuring data integrity across offline and cloud sync.'),
        highlight: formatField(project.lessonsLearned, 'Learned the importance of treating multi-step async pipelines as background jobs with optimistic UI feedback.'),
      },
      results: {
        label: 'What are the key results / features?',
        speech: formatField(project.results, `Delivered ${project.features?.length || 5} core architectural features with responsive mobile-first performance.`),
        highlight: formatField(project.features?.[0], 'End-to-end functionality backed by secure cloud infrastructure.'),
      },
    };
  }, [project, isActuallyWIP, isBudgetOnHold]);

  const handleSelectTopic = (topic: DialogueTopic) => {
    playClick();
    setActiveTopic(topic);
  };

  const currentDialogue = dialogues[activeTopic];

  return (
    <div className="project-cart-guide-container">
      {/* Budget Constraint Disclosure Banner for Subora & Vocara */}
      {isBudgetOnHold && (
        <div className="flex items-center gap-3 border-2 border-black bg-white p-3 shadow-md">
          <AlertCircle className="h-4 w-4 shrink-0 text-black" />
          <div className="flex-1 text-xs font-mono text-black">
            <strong>DEPLOYMENT NOTICE:</strong>{' '}
            <span>
              Engineered and validated locally. Public production cloud deployment and app store releases are currently on hold due to cloud hosting and API budget limitations.
            </span>
          </div>
        </div>
      )}

      {/* 1. The Interactive Exhibition Cart & Host Guide */}
      <div className={`project-cart-booth ${isActuallyWIP ? 'is-wip-cart' : 'is-live-cart'}`}>
        {/* Cart Overhead Canopy / Banner */}
        <div className="cart-canopy">
          <div className="cart-canopy-stripes">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className={i % 2 === 0 ? 'stripe-dark' : 'stripe-light'} />
            ))}
          </div>
          <div className="cart-canopy-sign">
            {isActuallyWIP ? (
              <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold uppercase">
                <HardHat className="h-4 w-4" />
                <span>[ WORK IN PROGRESS WORKBENCH ]</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold uppercase">
                <Sparkles className="h-4 w-4" />
                <span>EXHIBITION STAND · {project.category}</span>
              </div>
            )}
          </div>
        </div>

        {/* The Cart Tabletop & Human Guide */}
        <div className="cart-workbench">
          {/* Guide Human Character Standing at Cart */}
          <div className="cart-guide-npc">
            <div className="cart-guide-avatar-wrap">
              <img
                src="/img/world/character-male.png"
                alt="Project Lead Guide"
                className="cart-guide-pixel-img"
              />
              {isActuallyWIP && (
                <div className="cart-guide-badge wip-badge">
                  <Wrench className="h-3 w-3" />
                  <span>BUILDING</span>
                </div>
              )}
              {!isActuallyWIP && (
                <div className="cart-guide-badge live-badge">
                  <CheckCircle2 className="h-3 w-3" />
                  <span>ONLINE</span>
                </div>
              )}
            </div>

            <div className="cart-guide-info">
              <strong>Janmark Suelto</strong>
              <small>{project.role || 'Lead Software Engineer'}</small>
            </div>
          </div>

          {/* Interactive Speech Bubble from Human Guide */}
          <div className="cart-speech-bubble">
            <div className="cart-speech-header">
              <span className="cart-speech-topic-badge">
                {dialogues[activeTopic].label}
              </span>
              <span className="cart-speech-status-tag">
                {isBudgetOnHold ? 'Local Prototype' : isActuallyWIP ? 'Active Build' : 'Live Guide'}
              </span>
            </div>

            <p className="cart-speech-text">
              "{currentDialogue.speech}"
            </p>

            {currentDialogue.highlight && (
              <div className="cart-speech-highlight">
                <Zap className="h-3.5 w-3.5 shrink-0" />
                <span>{currentDialogue.highlight}</span>
              </div>
            )}
          </div>
        </div>

        {/* Interactive Talk Questions (Dialogue Options) */}
        <div className="cart-dialogue-options">
          <div className="cart-dialogue-prompt-label">
            <span>Ask the project lead:</span>
          </div>

          <div className="cart-dialogue-buttons">
            {(Object.keys(dialogues) as DialogueTopic[]).map((topicKey) => {
              const item = dialogues[topicKey];
              const isSelected = activeTopic === topicKey;
              return (
                <button
                  key={topicKey}
                  type="button"
                  onClick={() => handleSelectTopic(topicKey)}
                  className={`cart-topic-btn ${isSelected ? 'is-active' : ''}`}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Cart Physical Wheels & Baseboard */}
        <div className="cart-underframe">
          <div className="cart-wheel cart-wheel-left">
            <div className="wheel-rim" />
            <div className="wheel-hub" />
          </div>
          <div className="cart-shelf">
            {isActuallyWIP ? (
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#555555]">
                [ BLUEPRINTS & TOOLS CRATE · REPO: {project.slug} ]
              </span>
            ) : (
              <span className="font-mono text-[9px] uppercase tracking-widest text-[#555555]">
                [ LIVE DEMO UNIT · PORTFOLIO STAND ]
              </span>
            )}
          </div>
          <div className="cart-wheel cart-wheel-right">
            <div className="wheel-rim" />
            <div className="wheel-hub" />
          </div>
        </div>
      </div>

      {/* 2. Interactive In-Cart Mini-Simulator Demo */}
      {project.slug === 'vocara' && (
        <div className="border-2 border-black bg-white p-5 shadow-lg">
          <div className="flex items-center justify-between border-b border-black pb-3 mb-4">
            <div>
              <span className="font-mono text-[9px] font-bold uppercase text-[#666666]">Interactive Cart Simulator</span>
              <h3 className="font-title text-lg font-bold text-black">VOCARA AI Coach Simulation</h3>
            </div>
            <button
              type="button"
              onClick={() => {
                playClick();
                setVocaraRunning(true);
                setTimeout(() => setVocaraRunning(false), 800);
              }}
              className="flex items-center gap-1.5 border border-black bg-black px-3 py-1.5 text-xs font-mono font-bold text-white uppercase hover:bg-[#333333]"
            >
              <Play className="h-3.5 w-3.5" />
              <span>Simulate Voice Eval</span>
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex gap-2">
              {vocaraQuestions.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    playClick();
                    setVocaraQuestion(idx);
                  }}
                  className={`flex-1 border p-2 text-left text-xs font-mono transition-colors ${vocaraQuestion === idx ? 'border-black bg-black text-white' : 'border-[#d0d0d0] bg-[#fafafa] text-black'}`}
                >
                  Prompt 0{idx + 1}
                </button>
              ))}
            </div>

            <div className="border border-black bg-[#f8f8f8] p-3">
              <strong className="block text-xs font-mono text-[#666666] mb-1">INTERVIEW QUESTION:</strong>
              <p className="text-sm font-semibold text-black">"{vocaraQuestions[vocaraQuestion].q}"</p>
            </div>

            <div className="border border-black bg-white p-3">
              <div className="flex items-center justify-between mb-1">
                <strong className="text-xs font-mono text-black">GROQ AI EVALUATION FEEDBACK:</strong>
                {vocaraRunning ? (
                  <span className="text-[10px] font-mono font-bold text-black animate-pulse">Processing Audio Stream…</span>
                ) : (
                  <span className="text-[10px] font-mono font-bold text-black">STAR Score: 93/100</span>
                )}
              </div>
              <p className="text-xs font-sans text-black leading-relaxed">
                {vocaraRunning ? 'Analyzing phonetic delivery, pause duration, and STAR answer structure…' : vocaraQuestions[vocaraQuestion].feedback}
              </p>
            </div>
          </div>
        </div>
      )}

      {project.slug === 'subora' && (
        <div className="border-2 border-black bg-white p-5 shadow-lg">
          <div className="flex items-center justify-between border-b border-black pb-3 mb-4">
            <div>
              <span className="font-mono text-[9px] font-bold uppercase text-[#666666]">Interactive Cart Simulator</span>
              <h3 className="font-title text-lg font-bold text-black">Subora Duplicate Detection & Expense Sync</h3>
            </div>
            <button
              type="button"
              onClick={() => {
                playClick();
                setDuplicateTriggered(true);
                if (!suboraSubs.some((s) => s.name === 'Spotify Premium (Duplicate Scan)')) {
                  setSuboraSubs([
                    ...suboraSubs,
                    { name: 'Spotify Premium (Duplicate Scan)', cost: 11.99, detected: true },
                  ]);
                }
              }}
              className="flex items-center gap-1.5 border border-black bg-black px-3 py-1.5 text-xs font-mono font-bold text-white uppercase hover:bg-[#333333]"
            >
              <span>Simulate Duplicate Email</span>
            </button>
          </div>

          {duplicateTriggered && (
            <div className="border border-black bg-white p-2.5 mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-black shrink-0" />
                <span className="text-xs font-mono text-black font-semibold">
                  DUPLICATE DETECTED: Spotify billed twice in single 30-day window ($11.99).
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  playClick();
                  setSuboraSubs(suboraSubs.slice(0, 3));
                  setDuplicateTriggered(false);
                }}
                className="text-xs font-mono underline hover:no-underline"
              >
                Dismiss
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {suboraSubs.map((sub, idx) => (
              <div key={idx} className="border border-[#d0d0d0] bg-[#fafafa] p-3">
                <strong className="block text-xs font-sans text-black">{sub.name}</strong>
                <span className="block font-mono text-sm font-bold text-black mt-1">${sub.cost.toFixed(2)}/mo</span>
                <span className="inline-block mt-2 border border-black bg-white px-2 py-0.5 text-[9px] font-mono uppercase">
                  Detected via Gmail
                </span>
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-[#e0e0e0] pt-3">
            <span className="text-xs font-mono text-[#666666]">Total Tracked Recurring Spend:</span>
            <strong className="font-mono text-sm text-black">
              ${suboraSubs.reduce((acc, s) => acc + s.cost, 0).toFixed(2)} / month
            </strong>
          </div>
        </div>
      )}

      {project.slug === 'smartpipe' && (
        <div className="border-2 border-black bg-white p-5 shadow-lg">
          <div className="flex items-center justify-between border-b border-black pb-3 mb-4">
            <div>
              <span className="font-mono text-[9px] font-bold uppercase text-[#666666]">Interactive Cart Simulator</span>
              <h3 className="font-title text-lg font-bold text-black">Smart Pipe IoT Flow & Valve Telemetry</h3>
            </div>
            <button
              type="button"
              onClick={() => {
                playClick();
                setValveOpen(!valveOpen);
                setFlowRate(valveOpen ? 0.0 : 42.5);
              }}
              className="flex items-center gap-1.5 border border-black bg-black px-3 py-1.5 text-xs font-mono font-bold text-white uppercase hover:bg-[#333333]"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Toggle Valve: {valveOpen ? 'CLOSE' : 'OPEN'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="border border-black bg-[#fafafa] p-3 text-center">
              <span className="text-[10px] font-mono text-[#666666] uppercase">Main Valve State</span>
              <strong className="block text-xl font-mono font-bold text-black mt-1">
                {valveOpen ? 'OPEN (FLOWING)' : 'CLOSED (SHUT)'}
              </strong>
            </div>

            <div className="border border-black bg-[#fafafa] p-3 text-center">
              <span className="text-[10px] font-mono text-[#666666] uppercase">Current Flow Rate</span>
              <strong className="block text-xl font-mono font-bold text-black mt-1">
                {flowRate.toFixed(1)} L/min
              </strong>
            </div>

            <div className="border border-black bg-[#fafafa] p-3 text-center">
              <span className="text-[10px] font-mono text-[#666666] uppercase">Telemetry Link</span>
              <strong className="block text-xl font-mono font-bold text-black mt-1">
                ONLINE (99.8%)
              </strong>
            </div>
          </div>
        </div>
      )}

      {/* 3. Deep Dive Project Showcase */}
      <div className="project-exhibition-details-card">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black pb-4 mb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#666666]">
                {project.category} · {project.status}
              </span>
              {isActuallyWIP && (
                <span className="border border-black bg-black px-2 py-0.5 text-[9px] font-mono font-bold text-white uppercase">
                  Unfinished Prototype
                </span>
              )}
            </div>
            <h2 className="font-title text-2xl md:text-3xl font-bold text-black mt-1">
              {project.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/projects/${project.slug}`}
              className="flex items-center gap-1.5 border border-black bg-black px-3.5 py-2 text-xs font-mono font-bold text-white uppercase hover:bg-[#333333] transition-colors"
            >
              <span>Full Case Study</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 border border-black bg-white px-3 py-2 text-xs font-mono font-semibold text-black hover:bg-black hover:text-white transition-colors"
              >
                <Github className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Source</span>
                <ExternalLink className="h-3 w-3 sm:hidden" />
              </a>
            )}
          </div>
        </div>

        {/* Project Tech Stack Pills */}
        <div className="mb-6">
          <p className="font-mono text-[10px] uppercase font-semibold text-[#666666] mb-2">Technologies & Architecture:</p>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="border border-black bg-[#f5f5f5] px-2.5 py-1 text-[10px] font-mono text-black"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Key Features List */}
        {project.features && project.features.length > 0 && (
          <div className="mb-6">
            <p className="font-mono text-[10px] uppercase font-semibold text-[#666666] mb-2">Engineered Capabilities:</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {project.features.slice(0, 6).map((feat, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 border border-[#e0e0e0] bg-[#fafafa] p-2.5 text-xs text-black font-sans"
                >
                  <span className="font-mono text-[10px] font-bold text-black mt-0.5">0{index + 1}.</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Product Screenshot Preview Gallery */}
        {project.images && project.images.length > 0 && (
          <div>
            <p className="font-mono text-[10px] uppercase font-semibold text-[#666666] mb-2">Project Screens:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {project.images.slice(0, 4).map((img, i) => (
                <div key={i} className="border border-black bg-[#f0f0f0] p-1 overflow-hidden">
                  <img
                    src={img.startsWith('/') ? img : `/${img}`}
                    alt={`${project.title} screenshot ${i + 1}`}
                    className="w-full h-32 object-contain bg-white"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
