import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { KeyEngineering } from './KeyEngineering';
import { ProjectTech } from './ProjectTech';
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
    <motion.div {...contentEntrance} className="flex flex-col gap-5">
      {/* Index + category */}
      <div className="flex items-center gap-3">
        <span className="text-[11px] font-mono font-semibold text-[#78828D] dark:text-[#7F8994] tracking-wider">
          {index}
        </span>
        <div className="h-px w-4 bg-[#DCE1E7] dark:bg-[#242B33]" />
        <span className="text-[11px] font-mono font-bold uppercase tracking-[0.12em] text-[#2563EB] dark:text-[#60A5FA]">
          {category}
        </span>
      </div>

      {/* Title + subtitle */}
      <div>
        <h3
          className="font-sans font-bold tracking-tight leading-tight text-[#111318] dark:text-[#F4F6F8]"
          style={{ fontSize: 'clamp(1.4rem, 2.3vw, 1.85rem)' }}
        >
          {title}
        </h3>
        <p className="text-sm sm:text-base text-[#5F6873] dark:text-[#A7B0BA] font-normal leading-snug mt-1">
          {subtitle}
        </p>
      </div>

      {/* Plain text status badge */}
      <div>
        <span className="text-[11px] font-mono font-medium text-[#5F6873] dark:text-[#A7B0BA]">
          {status}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-[#5F6873] dark:text-[#A7B0BA] leading-relaxed max-w-md">
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
          className="group inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-[0.08em] text-[#111318] dark:text-[#F4F6F8] hover:text-[#2563EB] dark:hover:text-[#60A5FA] transition-colors duration-150"
        >
          <span>View project</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-150 text-[#2563EB] dark:text-[#60A5FA]" />
        </Link>

        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playHover}
            onClick={playClick}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#5F6873] dark:text-[#A7B0BA] hover:text-[#111318] dark:hover:text-[#F4F6F8] transition-colors duration-150"
          >
            <ExternalLink className="w-3 h-3" />
            <span>GitHub</span>
          </a>
        )}
      </div>
    </motion.div>
  );

  /* ── Visual block ── */
  const VisualBlock = (
    <motion.div
      {...visualEntrance}
      className="flex items-center justify-center w-full min-h-[300px] sm:min-h-[360px] overflow-hidden"
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
        <>
          <div className="order-2 lg:order-1">{VisualBlock}</div>
          <div className="order-1 lg:order-2">{ContentBlock}</div>
        </>
      )}
    </div>
  );
};
