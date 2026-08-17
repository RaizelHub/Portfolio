import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { SectionContainer } from '../../components/layout/SectionContainer';
import { FeaturedProject } from '../../components/projects/FeaturedProject';
import { DesktopShowcase } from '../../components/projects/DesktopShowcase';
import { MobileShowcase } from '../../components/projects/MobileShowcase';
import { MoreProjectCard } from '../../components/projects/MoreProjectCard';
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
    id: 'boarding-house-finder',
    shortTitle: 'Boarding House Finder',
    subtitle: 'Student Accommodation App',
    description:
      'Android app helping university students locate accommodation via Google Maps pins, landlord listings, and real-time Firebase room status.',
    category: 'MOBILE',
    technologies: ['Android', 'Java', 'Firebase', 'Maps API'],
    slug: 'boarding-house-finder',
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
];

/* ─── Minimal Separator between featured projects ─── */
const Separator = ({ label }: { label: string }) => (
  <div className="relative my-16 lg:my-24">
    <div className="absolute inset-0 flex items-center" aria-hidden="true">
      <div className="w-full border-t border-[#DCE1E7] dark:border-[#242B33]" />
    </div>
    <div className="relative flex">
      <span className="bg-[#F7F8FA] dark:bg-[#0B0D10] pr-4 text-[10px] font-mono text-[#78828D] dark:text-[#7F8994] uppercase tracking-widest select-none">
        {label}
      </span>
    </div>
  </div>
);

export const ProjectsSection = () => {
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
      className="py-16 border-b border-[#DCE1E7] dark:border-[#242B33]"
    >
      {/* ══════════════════════════════════════════
          SECTION HEADER — SELECTED WORK
      ══════════════════════════════════════════ */}
      <motion.div {...entrance()} className="mb-16 max-w-3xl">
        <span className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[#2563EB] dark:text-[#60A5FA] block mb-3">
          Selected Work
        </span>

        <h2
          className="font-sans font-bold text-[#111318] dark:text-[#F4F6F8] leading-[1.12] mb-3"
          style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.1rem)' }}
        >
          Software across web, mobile, and automation.
        </h2>

        <p className="text-sm sm:text-base text-[#5F6873] dark:text-[#A7B0BA] leading-relaxed max-w-xl font-sans">
          Selected projects showing how I build software across different platforms and workflows.
        </p>
      </motion.div>

      {/* ══════════════════════════════════════════
          01 — COLLAB (Browser Showcase / Web App)
      ══════════════════════════════════════════ */}
      <FeaturedProject
        index="01"
        category="WEB"
        title="Collab"
        subtitle="Real-Time Collaborative Whiteboard"
        status="Status: Working prototype"
        description="A browser-based collaborative whiteboard where multiple users can draw, edit, and organize visual content together in real time with role-based sharing, live presence, and persistent storage."
        keyEngineering={[
          'Real-time collaboration with live cursors & multiplayer drawing sync',
          'WebSocket communication via Cloudflare Workers & Durable Objects',
          'Shared canvas state with SQLite-backed persistent rooms',
          'Supabase authentication & PostgreSQL Row Level Security (RLS)',
          'Single-use WebSocket tickets & worker-side permission enforcement',
          'Protected asset storage & manual snapshot restore via Cloudflare R2',
        ]}
        technologies={[
          'React',
          'TypeScript',
          'tldraw',
          'WebSockets',
          'Cloudflare Workers',
          'Durable Objects',
          'Supabase',
        ]}
        slug="collabcanvas"
        githubUrl="https://github.com/RaizelHub"
        layout="content-left"
        visual={<DesktopShowcase projectName="Collab" />}
      />

      <Separator label="02" />

      {/* ══════════════════════════════════════════
          02 — SUBORA (Mobile Showcase)
      ══════════════════════════════════════════ */}
      <FeaturedProject
        index="02"
        category="MOBILE"
        title="Subora"
        subtitle="Subscription & Expense Management"
        status="Status: Active development"
        description="A mobile application that automatically discovers subscriptions from connected Gmail accounts, organizes recurring payments, tracks expenses, and surfaces spending insights."
        keyEngineering={[
          'Gmail OAuth with server-side token isolation via Edge Functions',
          'Multiple Gmail connections with automated background email syncing',
          'Subscription detection scanning inbox for recurring billing patterns',
          'Fuzzy duplicate handling across merchant name, amount, and frequency',
          'Supabase authentication & PostgreSQL multi-tenant data model with RLS',
          'RevenueCat entitlement handling for premium feature gating',
        ]}
        technologies={[
          'React Native',
          'Expo',
          'TypeScript',
          'Supabase',
          'PostgreSQL',
          'Gmail API',
          'RevenueCat',
        ]}
        slug="subora"
        githubUrl="https://github.com/RaizelHub"
        layout="content-right"
        visual={
          <MobileShowcase
            images={[
              'img/subora1 (1).jpg',
              'img/subora1 (2).jpg',
              'img/subora1 (3).jpg',
            ]}
            projectName="Subora"
          />
        }
      />

      <Separator label="03" />

      {/* ══════════════════════════════════════════
          03 — TIKTOK SHOP ORDER AUTOMATION (Workflow Showcase)
      ══════════════════════════════════════════ */}
      <FeaturedProject
        index="03"
        category="AUTOMATION"
        title="TikTok Shop Order Automation"
        subtitle="Automated Order Processing Workflow"
        status="Status: Working prototype"
        description="An event-driven n8n automation system that ingests incoming TikTok Shop order webhooks, validates payload data, prevents duplicate processing via idempotency checks, updates Supabase inventory records, and dispatches Telegram operator notifications."
        keyEngineering={[
          'Webhook ingestion & payload validation from TikTok Shop API',
          'Duplicate prevention via external order ID idempotency checks',
          'Workflow branching with conditional business logic in n8n',
          'Database persistence & stock management in Supabase',
          'Execution logging, error handling & automated alerts',
          'Real-time Telegram Bot API operator notification dispatch',
        ]}
        technologies={[
          'n8n',
          'Supabase',
          'PostgreSQL',
          'REST APIs',
          'Webhooks',
          'Telegram',
        ]}
        slug="tiktok-shop-automation"
        githubUrl="https://github.com/RaizelHub/OmniEcommerce-ai"
        layout="content-left"
        visual={
          <div className="w-full space-y-3.5">
            {/* Visual Architecture Flow */}
            <div className="p-3.5 bg-[#FFFFFF] dark:bg-[#11151A] border border-[#DCE1E7] dark:border-[#242B33] rounded-xl shadow-xs">
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#DCE1E7] dark:border-[#242B33]">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#111318] dark:text-[#F4F6F8]">
                  Event Pipeline Sequence
                </span>
                <span className="text-[9px] font-mono text-[#2563EB] dark:text-[#60A5FA] font-semibold uppercase">
                  5 Workflows Connected
                </span>
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[10px] font-mono">
                <span className="px-2 py-0.5 bg-[#F1F3F5] dark:bg-[#171C22] border border-[#DCE1E7] dark:border-[#242B33] rounded font-semibold text-[#111318] dark:text-[#F4F6F8] whitespace-nowrap">
                  TikTok Shop
                </span>
                <span className="text-[#2563EB] dark:text-[#60A5FA] font-bold">→</span>
                <span className="px-2 py-0.5 bg-[#F1F3F5] dark:bg-[#171C22] border border-[#DCE1E7] dark:border-[#242B33] rounded font-semibold text-[#111318] dark:text-[#F4F6F8] whitespace-nowrap">
                  Webhook
                </span>
                <span className="text-[#2563EB] dark:text-[#60A5FA] font-bold">→</span>
                <span className="px-2 py-0.5 bg-[#F1F3F5] dark:bg-[#171C22] border border-[#DCE1E7] dark:border-[#242B33] rounded font-semibold text-[#111318] dark:text-[#F4F6F8] whitespace-nowrap">
                  Validation
                </span>
                <span className="text-[#2563EB] dark:text-[#60A5FA] font-bold">→</span>
                <span className="px-2 py-0.5 bg-[#F1F3F5] dark:bg-[#171C22] border border-[#DCE1E7] dark:border-[#242B33] rounded font-semibold text-[#111318] dark:text-[#F4F6F8] whitespace-nowrap">
                  Supabase
                </span>
                <span className="text-[#2563EB] dark:text-[#60A5FA] font-bold">→</span>
                <span className="px-2 py-0.5 bg-[#2563EB]/10 border border-[#2563EB]/30 rounded font-semibold text-[#2563EB] dark:text-[#60A5FA] whitespace-nowrap">
                  Telegram
                </span>
              </div>
            </div>

            {/* Workflow Preview Image */}
            <Link
              to="/projects/tiktok-shop-automation"
              className="group block relative rounded-xl overflow-hidden border border-[#DCE1E7] dark:border-[#242B33] bg-[#0B0D10] shadow-[0_16px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.45)] cursor-pointer"
            >
              <div className="px-3.5 py-2 bg-[#F1F3F5] dark:bg-[#171C22] border-b border-[#DCE1E7] dark:border-[#242B33] flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#111318] dark:text-[#F4F6F8] font-bold">n8n Pipeline: Order Ingestion</span>
                <span className="text-[#2563EB] dark:text-[#60A5FA] group-hover:underline">Explore 5 Workflows ↗</span>
              </div>
              <div className="aspect-[16/9.5] overflow-hidden flex items-center justify-center p-2 bg-[#0B0D10]">
                <img
                  src="/img/01-Order Processing.png"
                  alt="n8n Order Processing Workflow"
                  className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform duration-200"
                />
              </div>
            </Link>
          </div>
        }
      />

      <Separator label="04" />

      {/* ══════════════════════════════════════════
          04 — VOCARA (Mobile Showcase)
      ══════════════════════════════════════════ */}
      <FeaturedProject
        index="04"
        category="MOBILE"
        title="Vocara"
        subtitle="Interview & Spoken-English Practice"
        status="Status: Working prototype"
        description="A mobile coaching application that uses Groq AI to deliver structured interview feedback, spoken-English exercises, and voice-based practice sessions — backed by Supabase and RevenueCat."
        keyEngineering={[
          'Mobile audio recording & playback pipeline via Expo AV',
          'Audio upload & asynchronous response processing in Edge Functions',
          'Groq AI transcription with STAR-methodology structured feedback',
          'Structured feedback scoring across clarity, pace, and relevance',
          'Supabase authentication & email verification with PostgreSQL RLS',
          'RevenueCat subscription paywall with cross-platform entitlement checks',
        ]}
        technologies={[
          'React Native',
          'Expo',
          'TypeScript',
          'Supabase',
          'Groq',
          'RevenueCat',
          'Resend',
        ]}
        slug="vocara"
        githubUrl="https://github.com/RaizelHub"
        layout="content-right"
        visual={
          <MobileShowcase
            images={[
              'img/vocara1 (1).jpg',
              'img/vocara1 (2).jpg',
              'img/vocara1 (3).jpg',
            ]}
            projectName="Vocara"
          />
        }
      />

      {/* ══════════════════════════════════════════
          MORE PROJECTS
      ══════════════════════════════════════════ */}
      <div className="mt-20 pt-12 border-t border-[#DCE1E7] dark:border-[#242B33]">
        <motion.div {...entrance()} className="mb-6">
          <p className="text-[10px] font-mono font-bold uppercase tracking-[0.14em] text-[#78828D] dark:text-[#7F8994] mb-2">
            More Projects
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

      {/* ══════════════════════════════════════════
          VIEW ALL PROJECTS LINK
      ══════════════════════════════════════════ */}
      <div className="flex justify-center mt-12">
        <Link
          to="/projects"
          onMouseEnter={playHover}
          onClick={playClick}
          className="group text-xs font-mono font-semibold text-[#111318] dark:text-[#F4F6F8] hover:text-[#2563EB] dark:hover:text-[#60A5FA] flex items-center gap-2 uppercase border border-[#DCE1E7] dark:border-[#242B33] hover:border-[#2563EB] dark:hover:border-[#60A5FA] px-5 py-2.5 rounded-lg bg-[#FFFFFF] dark:bg-[#11151A] transition-colors shadow-xs"
        >
          <span>View All Projects Directory ({projects.length})</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#60A5FA] group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </SectionContainer>
  );
};
