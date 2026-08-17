import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { SectionContainer } from '../../components/layout/SectionContainer';
import { FeaturedProject } from '../../components/projects/FeaturedProject';
import { MobileShowcase } from '../../components/projects/MobileShowcase';
import { AutomationShowcase } from '../../components/projects/AutomationShowcase';
import { KeyEngineering } from '../../components/projects/KeyEngineering';
import { ProjectTech } from '../../components/projects/ProjectTech';
import { MoreProjectCard } from '../../components/projects/MoreProjectCard';
import { projects } from '../../data/projects';
import { useSound } from '../../context/SoundContext';

/* ─── Secondary projects for the "More Projects" grid ─── */
const MORE_PROJECT_IDS = [
  'smartpipe',
  'point-of-sale-system',
  'boarding-house-finder',
  'student-attendance-management-system',
] as const;

const moreProjects = [
  {
    id: 'smartpipe',
    emoji: '🔧',
    shortTitle: 'Smart Pipe',
    subtitle: 'IoT Water Monitoring',
    description:
      'IoT hardware system using ESP32 sensors to measure water flow, pH, and turbidity with real-time leak detection and remote valve control.',
    category: 'IoT',
    technologies: ['ESP32', 'Firebase', 'MQTT', 'React', 'Flutter'],
    slug: 'smartpipe',
  },
  {
    id: 'point-of-sale-system',
    emoji: '📊',
    shortTitle: 'POS System',
    subtitle: 'Retail Checkout Platform',
    description:
      'Web-based Point of Sale with barcode lookup, automatic inventory deduction, shift cash auditing, and real-time multi-terminal sync via Socket.io.',
    category: 'Web',
    technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    slug: 'point-of-sale-system',
  },
  {
    id: 'boarding-house-finder',
    emoji: '🏠',
    shortTitle: 'Boarding House Finder',
    subtitle: 'Student Accommodation App',
    description:
      'Android app helping university students locate accommodation via Google Maps pins, landlord listings, and real-time Firebase room status.',
    category: 'Mobile',
    technologies: ['Android', 'Java', 'Firebase', 'Maps API'],
    slug: 'boarding-house-finder',
  },
  {
    id: 'student-attendance-management-system',
    emoji: '🎓',
    shortTitle: 'Student Attendance',
    subtitle: 'QR Check-in System',
    description:
      'Desktop attendance tracker with webcam QR code scanning, MySQL log storage, and CSV/Excel report export built on C# Windows Forms.',
    category: 'Desktop',
    technologies: ['C#', '.NET', 'MySQL', 'ZXing.Net'],
    slug: 'student-attendance-management-system',
  },
];

/* ─── Separator between featured projects ─── */
const Separator = ({ label }: { label: string }) => (
  <div className="relative my-20 lg:my-28">
    <div className="absolute inset-0 flex items-center" aria-hidden="true">
      <div className="w-full border-t border-[#D5D0C7] dark:border-[#34312B]" />
    </div>
    <div className="relative flex">
      <span className="bg-[#F4F1EA] dark:bg-[#151411] pr-4 text-[10px] font-mono text-[#A9A49C] dark:text-[#5C5850] uppercase tracking-widest select-none">
        {label}
      </span>
    </div>
  </div>
);

/* ─────────────────────────────────────────────────────────── */

export const ProjectsSection = () => {
  const { playHover, playClick } = useSound();
  const prefersReducedMotion = useReducedMotion();

  const entrance = (delay = 0) =>
    prefersReducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true as const, margin: '-60px' },
          transition: { duration: 0.48, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
        };

  return (
    <SectionContainer
      id="projects"
      className="py-16 border-b border-[#D5D0C7] dark:border-[#34312B]"
    >
      {/* ══════════════════════════════════════════
          SECTION HEADER — SELECTED WORK
      ══════════════════════════════════════════ */}
      <motion.div {...entrance()} className="mb-16 max-w-3xl">
        {/* Eyebrow */}
        <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#C7462D] dark:text-[#E25235] block mb-4">
          [ 04 ] / selected work
        </span>

        {/* Main editorial heading */}
        <h2
          className="font-amarna font-bold text-[#171717] dark:text-[#F2EEE6] leading-[1.08] mb-5"
          style={{ fontSize: 'clamp(1.9rem, 4vw, 3.25rem)' }}
        >
          Projects built around<br className="hidden sm:block" /> real problems.
        </h2>

        {/* Supporting text */}
        <p className="text-sm sm:text-base text-[#6B6862] dark:text-[#A9A39A] leading-relaxed max-w-lg">
          Full-stack applications, mobile products, and automation systems I've designed and developed.
        </p>
      </motion.div>

      {/* ══════════════════════════════════════════
          01 — SUBORA  (content left / phones right)
      ══════════════════════════════════════════ */}
      <FeaturedProject
        index="01"
        category="MOBILE / FULL STACK"
        title="SUBORA"
        subtitle="Subscription & Expense Management"
        status="ACTIVE DEVELOPMENT"
        statusDot="amber"
        description="A mobile application that automatically discovers subscriptions from Gmail, organizes recurring payments, tracks expenses, and surfaces spending insights across connected accounts."
        keyEngineering={[
          'Multi-account Gmail OAuth with server-side token isolation via Edge Functions',
          'Serverless subscription-detection pipeline scanning inbox for recurring billing patterns',
          'Fuzzy duplicate prevention across merchant name, billing amount, and cycle frequency',
          'Subscription review / approval state machine (pending → active / dismissed)',
          'RevenueCat paywall with premium feature entitlement management',
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
        layout="content-left"
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

      <Separator label="02" />

      {/* ══════════════════════════════════════════
          02 — VOCARA  (phones left / content right)
      ══════════════════════════════════════════ */}
      <FeaturedProject
        index="02"
        category="AI / MOBILE"
        title="VOCARA"
        subtitle="AI Interview & Spoken-English Coach"
        status="WORKING PROTOTYPE"
        statusDot="green"
        description="A mobile coaching app that uses Groq AI to deliver structured interview feedback, spoken-English exercises, and voice-based practice sessions — backed by Supabase and RevenueCat."
        keyEngineering={[
          'Voice recording capture and audio pipeline via Expo AV',
          'Groq AI transcription with STAR-methodology structured feedback',
          'Supabase Edge Functions for AI response generation and audio processing',
          'Supabase auth with email verification and RLS-enforced per-user data isolation',
          'RevenueCat subscription paywall with premium access control',
        ]}
        technologies={[
          'React Native',
          'Expo',
          'TypeScript',
          'Supabase',
          'Groq AI',
          'RevenueCat',
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

      <Separator label="03" />

      {/* ══════════════════════════════════════════
          03 — TIKTOK SHOP ORDER AUTOMATION
          (inline — different visual treatment)
      ══════════════════════════════════════════ */}
      <div className="space-y-10">
        {/* Project header */}
        <motion.div {...entrance()} className="max-w-2xl">
          {/* Index + category */}
          <div className="flex items-center gap-3 mb-5">
            <span className="text-[10px] font-mono font-semibold text-[#A9A49C] dark:text-[#5C5850] tracking-wider">
              03
            </span>
            <div className="h-px w-5 bg-[#D5D0C7] dark:bg-[#34312B]" />
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.12em] text-[#C7462D] dark:text-[#E25235]">
              AUTOMATION / BACKEND
            </span>
          </div>

          {/* Title */}
          <h3
            className="font-amarna font-bold uppercase tracking-wide leading-tight text-[#171717] dark:text-[#F2EEE6] mb-2"
            style={{ fontSize: 'clamp(1.5rem, 2.8vw, 2.5rem)' }}
          >
            TikTok Shop Order Automation
          </h3>
          <p className="text-base text-[#6B6862] dark:text-[#A9A39A] mb-3">
            Automated Order Processing Workflow
          </p>

          {/* Status */}
          <div className="flex items-center gap-1.5 mb-5">
            <span
              className="w-[7px] h-[7px] rounded-full inline-block flex-shrink-0 bg-[#059669]"
              aria-hidden="true"
            />
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#059669]">
              Working Prototype
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-[#6B6862] dark:text-[#A9A39A] leading-relaxed mb-7">
            An event-driven n8n automation workflow that ingests incoming TikTok Shop order webhooks,
            validates payload data, prevents duplicate processing via idempotency checks, updates
            Supabase inventory records, and dispatches Telegram operator notifications.
          </p>

          {/* Engineering + tech in two columns on wider screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-7">
            <KeyEngineering
              items={[
                'Event-driven webhook ingestion and payload validation',
                'Idempotent duplicate detection via external order ID lookup',
                'Atomic Supabase inventory deduction (PostgreSQL)',
                'n8n workflow orchestration with conditional routing branches',
                'Telegram Bot API operator alert dispatch',
              ]}
            />
            <ProjectTech
              technologies={[
                'n8n',
                'Supabase',
                'PostgreSQL',
                'Webhooks',
                'Telegram Bot API',
                'JavaScript',
              ]}
            />
          </div>

          {/* CTA */}
          <div className="flex items-center gap-5 flex-wrap">
            <Link
              to="/projects/tiktok-shop-automation"
              onMouseEnter={playHover}
              onClick={playClick}
              className="group inline-flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-[0.1em] text-[#171717] dark:text-[#F2EEE6] hover:text-[#C7462D] dark:hover:text-[#E25235] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7462D] dark:focus-visible:ring-[#E25235] rounded"
            >
              View Project
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <a
              href="https://github.com/RaizelHub/OmniEcommerce-ai"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              onClick={playClick}
              className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#6B6862] dark:text-[#A9A39A] hover:text-[#171717] dark:hover:text-[#F2EEE6] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7462D] dark:focus-visible:ring-[#E25235] rounded"
            >
              <ExternalLink className="w-3 h-3" />
              GitHub
            </a>
          </div>
        </motion.div>

        {/* Automation visual: workflow diagram + n8n screenshot */}
        <AutomationShowcase />
      </div>

      {/* ══════════════════════════════════════════
          MORE PROJECTS
      ══════════════════════════════════════════ */}
      <div className="mt-24 pt-12 border-t border-[#D5D0C7] dark:border-[#34312B]">
        <motion.div {...entrance()} className="mb-8">
          <p className="text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#6B6862] dark:text-[#A9A39A] mb-3">
            More Projects
          </p>
          <div className="h-px w-full bg-[#D5D0C7] dark:bg-[#34312B]" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {moreProjects.map((project, i) => (
            <motion.div
              key={project.id}
              {...entrance(i * 0.07)}
              className="h-full"
            >
              <MoreProjectCard
                emoji={project.emoji}
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
          className="group text-xs font-pt-sans font-bold text-[#171717] dark:text-[#F2EEE6] hover:text-[#C7462D] dark:hover:text-[#E25235] flex items-center gap-2 uppercase border border-[#D5D0C7] dark:border-[#34312B] hover:border-[#171717] dark:hover:border-[#F2EEE6] px-6 py-3 rounded-xl bg-[#EFEBE4] dark:bg-[#1D1C18] transition-all duration-200 shadow-sm tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7462D] dark:focus-visible:ring-[#E25235]"
        >
          <span>View All Projects Directory ({projects.length})</span>
          <ArrowRight className="w-4 h-4 text-[#C7462D] dark:text-[#E25235] group-hover:translate-x-1 transition-transform duration-200" />
        </Link>
      </div>
    </SectionContainer>
  );
};
