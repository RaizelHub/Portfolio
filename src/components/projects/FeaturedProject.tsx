import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { KeyEngineering } from './KeyEngineering';
import { ProjectTech } from './ProjectTech';
import { ProjectLikeButton } from '../ui/ProjectLikeButton';
import { useSound } from '../../context/SoundContext';

interface FeaturedProjectProps {
  /** Editorial index, e.g. "01" */
  index: string;
  /** Category line, e.g. "MOBILE / FULL STACK" */
  category: string;
  /** Large display title */
  title: string;
  /** Subtitle / product tagline */
  subtitle: string;
  /** Status label text, e.g. "Status: Active development" */
  status: string;
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
   */
  layout?: 'content-left' | 'content-right';
}

export const FeaturedProject: React.FC<FeaturedProjectProps> = ({
  index,
  category,
  title,
  subtitle,
  status,
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
      initial: { opacity: 0, y: 16 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true as const, margin: '-60px' },
      transition: {
        duration: 0.45,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      },
    };

  const visualEntrance = prefersReducedMotion
    ? {}
    : {
      initial: { opacity: 0, scale: 0.98 },
      whileInView: { opacity: 1, scale: 1 },
      viewport: { once: true as const, margin: '-60px' },
      transition: {
        duration: 0.48,
        delay: 0.08,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      },
    };

  /* ── Content block ── */
  const ContentBlock = (
    <motion.div {...contentEntrance} className="flex min-w-0 flex-col gap-5">
      {/* Index + category: Copper index, neutral category */}
      <div className="flex items-center gap-3">
        <span className="font-mono text-xs font-semibold tracking-wider text-[var(--accent)]">
          {index}
        </span>
        <div className="h-px w-8 bg-[var(--border)]" />
        <span className="font-mono text-xs font-medium uppercase tracking-[0.1em] text-[var(--text-muted)]">
          {category}
        </span>
      </div>

      {/* Title + subtitle */}
      <div>
        <h3
          className="project-heading font-title text-[var(--text-primary)]"
        >
          {title}
        </h3>
        <p className="mt-2 text-sm font-normal leading-snug text-[var(--text-secondary)] sm:text-base">
          {subtitle}
        </p>
      </div>

      {/* Plain text status badge */}
      <div>
        <span className="font-mono text-xs font-medium text-[var(--text-muted)]">
          {status}
        </span>
      </div>

      {/* Description */}
      <p className="body-copy max-w-[55ch] text-[var(--text-secondary)]">
        {description}
      </p>

      {/* Key Engineering */}
      <KeyEngineering items={keyEngineering} />

      {/* Tech stack */}
      <ProjectTech technologies={technologies} />

      {/* CTA buttons */}
      <div className="flex items-center gap-4 sm:gap-5 flex-wrap pt-1">
        <Link
          to={`/projects/${slug}`}
          onMouseEnter={playHover}
          onClick={playClick}
          className="group inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-[0.08em] text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors duration-150"
        >
          <span>View case study</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-150 text-[var(--text-muted)] group-hover:text-[var(--accent)]" />
        </Link>

        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playHover}
            onClick={playClick}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-150"
          >
            <ExternalLink className="w-3 h-3" />
            <span>GitHub</span>
          </a>
        )}

        <ProjectLikeButton slug={slug} projectName={title} variant="default" />
      </div>
    </motion.div>
  );

  /* ── Visual block ── */
  const VisualBlock = (
    <motion.div
      {...visualEntrance}
      className="media-frame flex min-h-0 min-w-0 w-full items-center justify-center overflow-hidden p-4 sm:min-h-[360px] sm:p-6 lg:min-h-[420px]"
    >
      {visual}
    </motion.div>
  );

  return (
    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14 xl:gap-20">
      {isContentLeft ? (
        <>
          <div className="min-w-0 lg:col-span-5">{ContentBlock}</div>
          <div className="min-w-0 lg:col-span-7">{VisualBlock}</div>
        </>
      ) : (
        <>
          <div className="order-2 min-w-0 lg:order-1 lg:col-span-7">{VisualBlock}</div>
          <div className="order-1 min-w-0 lg:order-2 lg:col-span-5">{ContentBlock}</div>
        </>
      )}
    </div>
  );
};
