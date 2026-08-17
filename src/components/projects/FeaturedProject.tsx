import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { KeyEngineering } from './KeyEngineering';
import { ProjectTech } from './ProjectTech';
import { useSound } from '../../context/SoundContext';

type StatusDot = 'amber' | 'green' | 'blue';

const dotColor: Record<StatusDot, string> = {
  amber: '#D97706',
  green: '#059669',
  blue: '#2563EB',
};

interface FeaturedProjectProps {
  /** Editorial index, e.g. "01" */
  index: string;
  /** Category line, e.g. "MOBILE / FULL STACK" */
  category: string;
  /** Large display title */
  title: string;
  /** Subtitle / product tagline */
  subtitle: string;
  /** Status label text */
  status: string;
  /** Dot colour for the status indicator */
  statusDot: StatusDot;
  /** Short project description (2–3 sentences) */
  description: string;
  /** Engineering bullet points */
  keyEngineering: string[];
  /** Tech stack labels */
  technologies: string[];
  /** Project slug for /projects/:slug */
  slug: string;
  /** Optional public GitHub URL */
  githubUrl?: string;
  /** The visual element (MobileShowcase, etc.) */
  visual: React.ReactNode;
  /**
   * "content-left"  → content left  | phones right  (desktop)
   * "content-right" → phones left   | content right (desktop)
   * On mobile, content always comes first.
   */
  layout?: 'content-left' | 'content-right';
}

export const FeaturedProject: React.FC<FeaturedProjectProps> = ({
  index,
  category,
  title,
  subtitle,
  status,
  statusDot,
  description,
  keyEngineering,
  technologies,
  slug,
  githubUrl,
  visual,
  layout = 'content-left',
}) => {
  const prefersReducedMotion = useReducedMotion();
  const { playHover, playClick } = useSound();
  const isContentLeft = layout === 'content-left';

  const contentEntrance = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true as const, margin: '-80px' },
        transition: {
          duration: 0.5,
          ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
        },
      };

  const visualEntrance = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, scale: 0.97 },
        whileInView: { opacity: 1, scale: 1 },
        viewport: { once: true as const, margin: '-80px' },
        transition: {
          duration: 0.55,
          delay: 0.1,
          ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
        },
      };

  /* ── Content block ── */
  const ContentBlock = (
    <motion.div {...contentEntrance} className="flex flex-col gap-5">
      {/* Index + category */}
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-mono font-semibold text-[#A9A49C] dark:text-[#5C5850] tracking-wider">
          {index}
        </span>
        <div className="h-px w-5 bg-[#D5D0C7] dark:bg-[#34312B]" />
        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.12em] text-[#C7462D] dark:text-[#E25235]">
          {category}
        </span>
      </div>

      {/* Title + subtitle */}
      <div>
        <h3
          className="font-amarna font-bold uppercase tracking-wide leading-tight text-[#171717] dark:text-[#F2EEE6]"
          style={{ fontSize: 'clamp(2rem, 3.2vw, 2.9rem)' }}
        >
          {title}
        </h3>
        <p className="text-base sm:text-lg text-[#6B6862] dark:text-[#A9A39A] font-normal leading-snug mt-1.5">
          {subtitle}
        </p>
      </div>

      {/* Status indicator */}
      <div className="flex items-center gap-1.5">
        <span
          className="w-[7px] h-[7px] rounded-full inline-block flex-shrink-0"
          style={{ backgroundColor: dotColor[statusDot] }}
          aria-hidden="true"
        />
        <span
          className="text-[10px] font-mono font-bold uppercase tracking-wider"
          style={{ color: dotColor[statusDot] }}
        >
          {status}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-[#6B6862] dark:text-[#A9A39A] leading-relaxed max-w-md">
        {description}
      </p>

      {/* Key Engineering */}
      <KeyEngineering items={keyEngineering} />

      {/* Tech stack */}
      <ProjectTech technologies={technologies} />

      {/* CTA buttons */}
      <div className="flex items-center gap-5 flex-wrap pt-1">
        <Link
          to={`/projects/${slug}`}
          onMouseEnter={playHover}
          onClick={playClick}
          className="group inline-flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-[0.1em] text-[#171717] dark:text-[#F2EEE6] hover:text-[#C7462D] dark:hover:text-[#E25235] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7462D] dark:focus-visible:ring-[#E25235] rounded"
        >
          View Project
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
        </Link>

        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playHover}
            onClick={playClick}
            className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#6B6862] dark:text-[#A9A39A] hover:text-[#171717] dark:hover:text-[#F2EEE6] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7462D] dark:focus-visible:ring-[#E25235] rounded"
          >
            <ExternalLink className="w-3 h-3" />
            GitHub
          </a>
        )}
      </div>
    </motion.div>
  );

  /* ── Visual block ── */
  const VisualBlock = (
    <motion.div
      {...visualEntrance}
      className="flex items-center justify-center w-full min-h-[320px] sm:min-h-[380px] overflow-hidden"
    >
      {visual}
    </motion.div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center">
      {isContentLeft ? (
        <>
          <div>{ContentBlock}</div>
          <div>{VisualBlock}</div>
        </>
      ) : (
        /* content-right: phones left on desktop, content above on mobile */
        <>
          <div className="order-2 lg:order-1">{VisualBlock}</div>
          <div className="order-1 lg:order-2">{ContentBlock}</div>
        </>
      )}
    </div>
  );
};
