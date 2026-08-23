import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Github,
  ExternalLink,
  CheckCircle2,
  Info,
  HelpCircle,
  Shield,
  Workflow,
  CheckCircle,
  ListTodo,
  X,
  ZoomIn,
} from 'lucide-react';
import { projects } from '../data/projects';
import { JobRadarCaseStudy } from '../components/ui/JobRadarCaseStudy';
import { CareerOSCaseStudy } from '../components/ui/CareerOSCaseStudy';
import { TikTokShopCaseStudy } from '../components/ui/TikTokShopCaseStudy';
import { ProjectLikeButton } from '../components/ui/ProjectLikeButton';
import { useSound } from '../context/SoundContext';

export const ProjectDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { playHover, playClick } = useSound();

  const project = projects.find((p) => p.slug === slug);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Gallery state
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const galleryImages = project?.images || (project?.image ? [project.image] : []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen || galleryImages.length === 0) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowLeft') setActiveImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
      if (e.key === 'ArrowRight') setActiveImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen, galleryImages.length]);

  if (!project) {
    return (
      <main className="min-h-screen pt-20 flex items-center justify-center bg-[var(--background)] px-4 font-mono">
        <div className="text-center bg-[var(--surface)] border border-[var(--border-subtle)] p-8 rounded-xl max-w-md w-full shadow-xs">
          <HelpCircle className="w-10 h-10 text-[var(--accent)] mx-auto mb-3" />
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-2 uppercase">
            Repository Not Found
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mb-6 leading-relaxed">
            The requested project path does not exist in the directory.
          </p>
          <button
            onClick={() => navigate('/#projects')}
            className="px-4 py-2 bg-[var(--accent)] text-[var(--on-accent)] hover:bg-[var(--accent-hover)] text-xs font-semibold rounded-lg transition-colors"
          >
            Return to Case Studies
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--background)] pb-[var(--section-space)] pt-8 text-[var(--text-primary)] transition-colors">
      <div className="mx-auto w-full max-w-[var(--content-width)] px-[var(--page-gutter)]">
        {/* Back navigation + Like */}
        <div className="mb-6 flex min-w-0 flex-wrap items-center justify-between gap-3 font-mono text-xs">
          <Link
            to="/#projects"
            onMouseEnter={playHover}
            onClick={playClick}
            className="inline-flex items-center gap-1.5 font-medium text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[var(--accent)]" />
            <span>Return to Overview</span>
          </Link>

          <div className="flex items-center gap-3">
            {slug && <ProjectLikeButton slug={slug} projectName={project?.title || 'Project'} variant="badge" />}
            <Link
              to="/projects"
              onMouseEnter={playHover}
              onClick={playClick}
              className="font-medium text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
            >
              View All Repositories ↗
            </Link>
          </div>
        </div>

        {slug === 'jobradar-ai' ? (
          <JobRadarCaseStudy />
        ) : slug === 'careeros' ? (
          <CareerOSCaseStudy />
        ) : slug === 'tiktok-shop-automation' ? (
          <TikTokShopCaseStudy />
        ) : (
          <>
            {/* Title Block Header */}
            <div className="mb-10 border-b border-[var(--border-subtle)] pb-8 pt-5 text-left">
              <div className="flex items-center gap-2 mb-2.5 font-mono text-xs">
                <span className="border-l border-[var(--accent)] pl-2 text-xs font-semibold uppercase text-[var(--text-primary)]">
                  {project.category}
                </span>
                <span className="text-[var(--text-muted)] font-medium">
                  {project.status}
                </span>
              </div>

              <h1 className="section-heading mb-5 max-w-[24ch] font-title text-[var(--text-primary)]">
                {project.title}
              </h1>

              <p className="body-copy text-[var(--text-secondary)]">
                {project.description}
              </p>
            </div>

            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-14">
              {/* LEFT: Case Study Core Content */}
              <div className="space-y-12 text-left lg:col-span-9">
                {/* Gallery */}
                {galleryImages.length > 0 && (
                  <div className="media-frame space-y-3 p-3 sm:p-5">
                    <div
                      className="group relative flex aspect-video cursor-pointer items-center justify-center overflow-hidden border border-[var(--border-subtle)] bg-[var(--background)]"
                      onClick={() => setLightboxOpen(true)}
                    >
                      <img
                        src={`/${galleryImages[activeImageIndex]}`}
                        alt={`${project.title} screenshot ${activeImageIndex + 1}`}
                        className="w-full h-full object-contain transition-transform duration-200"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <span className="text-white opacity-0 group-hover:opacity-100 text-xs font-mono font-semibold transition-opacity bg-[var(--surface-elevated)] px-3 py-1.5 rounded-md backdrop-blur-xs flex items-center gap-1.5">
                          <ZoomIn className="w-3.5 h-3.5 text-[var(--accent)]" />
                          Expand Preview ↗
                        </span>
                      </div>
                    </div>

                    {/* Gallery Thumbnails */}
                    {galleryImages.length > 1 && (
                      <div className="flex gap-2 pt-1 overflow-x-auto">
                        {galleryImages.map((img, idx) => (
                          <button
                            key={img}
                            onClick={() => setActiveImageIndex(idx)}
                            className={`relative w-20 h-14 rounded-md overflow-hidden border-2 transition-all shrink-0 font-mono text-[10px] bg-[var(--background)] ${activeImageIndex === idx
                              ? 'border-[var(--accent)] opacity-100'
                              : 'border-[var(--border-subtle)] opacity-60 hover:opacity-100'
                              }`}
                          >
                            <img
                              src={`/${img}`}
                              alt={`Thumbnail ${idx + 1}`}
                              className="w-full h-full object-cover object-top"
                            />
                            <span className="absolute bottom-0 right-0 bg-[var(--surface-elevated)] text-[var(--text-primary)] px-1 py-0.2 text-[9px]">
                              {idx + 1}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* System Overview */}
                <section className="space-y-3">
                  <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2 border-b border-[var(--border-subtle)] pb-2.5 font-mono uppercase tracking-wider">
                    <Info className="w-4 h-4 text-[var(--accent)]" />
                    <span>System Overview &amp; Context</span>
                  </h3>
                  <p className="body-copy text-[var(--text-secondary)]">
                    {project.longDescription}
                  </p>
                </section>

                {/* Problem & Solution Grid */}
                <div className="grid grid-cols-1 border-y border-[var(--border-subtle)] md:grid-cols-2">
                  <div className="space-y-2 border-b border-[var(--border-subtle)] py-6 md:border-b-0 md:border-r md:pr-8">
                    <h4 className="font-mono font-bold text-xs uppercase flex items-center gap-1.5 text-[var(--accent)]">
                      <Shield className="w-4 h-4" /> The Problem Specification
                    </h4>
                    <p className="text-[0.9375rem] leading-[1.65] text-[var(--text-secondary)]">
                      {project.problem}
                    </p>
                  </div>
                  <div className="space-y-2 py-6 md:pl-8">
                    <h4 className="font-mono font-bold text-xs uppercase flex items-center gap-1.5 text-[var(--text-primary)]">
                      <CheckCircle className="w-4 h-4 text-[var(--accent)]" /> The Architectural Solution
                    </h4>
                    <p className="text-[0.9375rem] leading-[1.65] text-[var(--text-secondary)]">
                      {project.solution}
                    </p>
                  </div>
                </div>

                {/* Core Features */}
                <section className="space-y-3">
                  <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2 border-b border-[var(--border-subtle)] pb-2.5 font-mono uppercase tracking-wider">
                    <ListTodo className="w-4 h-4 text-[var(--accent)]" />
                    <span>Core Features &amp; Capabilities</span>
                  </h3>
                  <div className="grid grid-cols-1 gap-3 text-[0.9375rem] leading-[1.55] text-[var(--text-primary)] sm:grid-cols-2">
                    {project.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Development Process & Architecture Diagram */}
                <section className="space-y-4">
                  <h3 className="text-sm font-bold text-[var(--text-primary)] flex items-center gap-2 border-b border-[var(--border-subtle)] pb-2.5 font-mono uppercase tracking-wider">
                    <Workflow className="w-4 h-4 text-[var(--accent)]" />
                    <span>Development Process &amp; Workflow</span>
                  </h3>
                  <p className="body-copy text-[var(--text-secondary)]">
                    {project.process}
                  </p>

                  {project.architectureDiagramUrl && (
                    <div className="bg-[var(--surface)] border border-[var(--border-subtle)] p-3 rounded-xl space-y-2 shadow-xs">
                      <div className="flex items-center justify-between text-xs font-mono text-[var(--text-secondary)]">
                        <span className="font-bold text-[var(--text-primary)] uppercase flex items-center gap-1.5">
                          <Workflow className="w-3.5 h-3.5 text-[var(--accent)]" />
                          System Architecture &amp; Workflow Diagram
                        </span>
                      </div>
                      <div className="overflow-hidden rounded-lg border border-[var(--border-subtle)] bg-[var(--background)] p-2">
                        <img
                          src={`/${project.architectureDiagramUrl}`}
                          alt={`${project.title} Architecture Workflow Diagram`}
                          className="w-full h-auto object-contain max-h-[500px]"
                        />
                      </div>
                    </div>
                  )}
                </section>
              </div>

              {/* RIGHT: Technical Specifications Sidebar */}
              <div className="space-y-5 lg:sticky lg:top-24 lg:col-span-3">
                <div className="space-y-5 border-t border-[var(--border)] pt-5 text-left">
                  <h3 className="font-mono font-bold text-[var(--text-primary)] border-b border-[var(--border-subtle)] pb-2.5 text-xs uppercase">
                    Technical Specifications
                  </h3>

                  {/* Stack badges */}
                  <div className="space-y-2 font-mono">
                    <span className="block text-xs font-semibold uppercase text-[var(--text-muted)]">
                      Technologies Applied
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="break-safe border border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-2.5 py-1 font-mono text-xs leading-[1.4] text-[var(--text-secondary)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="space-y-2 pt-2 font-mono text-sm">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex min-h-11 w-full min-w-0 items-center justify-center gap-2 bg-[var(--accent)] px-4 py-2.5 text-center font-semibold text-[var(--on-accent)] transition-colors hover:bg-[var(--accent-hover)]"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Visit Live Demo ↗</span>
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex min-h-11 w-full min-w-0 items-center justify-center gap-2 border border-[var(--border-subtle)] bg-[var(--surface-elevated)] px-4 py-2.5 text-center font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--border)] hover:bg-[var(--surface-hover)]"
                      >
                        <Github className="w-4 h-4" />
                        <span>Inspect Source Code ↗</span>
                      </a>
                    )}

                    <div className="pt-2">
                      <ProjectLikeButton
                        slug={project.slug}
                        projectName={project.title}
                        variant="default"
                        className="w-full justify-center"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 p-2 text-white hover:text-[var(--accent)] transition-colors"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <img
            src={`/${galleryImages[activeImageIndex]}`}
            alt={`${project.title} screenshot ${activeImageIndex + 1}`}
            className="max-w-[92vw] max-h-[88vh] object-contain rounded-lg border border-[var(--border)]"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </main>
  );
};
