import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Github,
  ExternalLink,
  CheckCircle2,
  HelpCircle,
  Shield,
  Workflow,
  CheckCircle,
  ListTodo,
  X,
  ZoomIn,
  Cpu,
} from 'lucide-react';
import { projects } from '../data/projects';
import { ProjectLikeButton } from '../components/ui/ProjectLikeButton';
import { useSound } from '../context/SoundContext';

export const ProjectDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { playHover, playClick } = useSound();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const project = currentIndex !== -1 ? projects[currentIndex] : undefined;
  const nextProject = currentIndex !== -1 ? projects[(currentIndex + 1) % projects.length] : undefined;

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
        <div className="text-center bg-[var(--surface)] border-2 border-black dark:border-white p-8 max-w-md w-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
          <HelpCircle className="w-10 h-10 text-[var(--accent)] mx-auto mb-3" strokeWidth={2.5} />
          <h2 className="text-base font-black text-[var(--text-primary)] mb-2 uppercase">
            Project Not Found
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mb-6 font-bold leading-relaxed">
            The requested project path does not exist in the portfolio.
          </p>
          <button
            onClick={() => navigate('/#projects')}
            className="px-4 py-2 border-2 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black text-xs font-bold uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
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
        {/* ── Top Bar: Back & Like ── */}
        <div className="mb-8 flex min-w-0 flex-wrap items-center justify-between gap-3 font-mono text-xs font-bold">
          <Link
            to="/#projects"
            onMouseEnter={playHover}
            onClick={playClick}
            className="inline-flex items-center gap-1.5 border-2 border-black dark:border-white bg-[var(--surface)] px-3.5 py-1.5 text-[var(--text-primary)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] transition-all duration-120 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          >
            <ArrowLeft className="w-4 h-4 text-[var(--text-primary)]" strokeWidth={2.5} />
            <span>Return to Overview</span>
          </Link>

          <div className="flex items-center gap-3">
            {slug && <ProjectLikeButton slug={slug} projectName={project.title} variant="badge" />}
            <Link
              to="/projects"
              onMouseEnter={playHover}
              onClick={playClick}
              className="border-2 border-black dark:border-white bg-[var(--surface)] px-3.5 py-1.5 text-[var(--text-primary)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] transition-all duration-120 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              All Projects Directory ({projects.length}) ↗
            </Link>
          </div>
        </div>

        {/* ── Case Study Header Block ── */}
        <div className="border-2 border-black dark:border-white bg-[var(--surface)] p-6 sm:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] mb-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-black dark:border-white pb-4 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="border border-black dark:border-white bg-black dark:bg-white text-white dark:text-black px-2.5 py-0.5 font-black uppercase">
                {project.category}
              </span>
              <span className="border border-black dark:border-white bg-[var(--surface-elevated)] px-2.5 py-0.5 font-bold text-[var(--text-secondary)]">
                {project.status}
              </span>
            </div>
            {project.role && (
              <span className="text-[var(--text-muted)] font-semibold text-[11px]">
                Role: {project.role}
              </span>
            )}
          </div>

          <div className="space-y-3">
            <h1 className="font-title text-2xl sm:text-3xl lg:text-4xl font-normal text-[var(--text-primary)] tracking-tight">
              {project.title}
            </h1>
            <p className="body-copy text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed max-w-4xl font-medium">
              {project.description}
            </p>
          </div>

          {/* Quick Action Bar */}
          <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHover}
                onClick={playClick}
                className="inline-flex min-h-11 items-center gap-2 border-2 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black px-5 py-2.5 font-bold uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] transition-all duration-120 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              >
                <ExternalLink className="w-4 h-4" strokeWidth={2.5} />
                <span>Visit Live Application ↗</span>
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHover}
                onClick={playClick}
                className="inline-flex min-h-11 items-center gap-2 border-2 border-black dark:border-white bg-[var(--surface-elevated)] px-4 py-2.5 font-bold text-[var(--text-primary)] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] transition-all duration-120 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
              >
                <Github className="w-4 h-4" />
                <span>Inspect Repository ↗</span>
              </a>
            )}
          </div>
        </div>

        {/* ── Visual Media / Gallery Showcase ── */}
        {galleryImages.length > 0 && (
          <div className="border-2 border-black dark:border-white bg-[var(--surface)] p-4 sm:p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] mb-8 space-y-4">
            <div
              className="group relative flex aspect-video max-h-[560px] cursor-pointer items-center justify-center overflow-hidden border-2 border-black dark:border-white bg-[var(--background)]"
              onClick={() => setLightboxOpen(true)}
            >
              <img
                src={`/${galleryImages[activeImageIndex]}`}
                alt={`${project.title} screenshot ${activeImageIndex + 1}`}
                className="w-full h-full object-contain transition-transform duration-200"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 text-xs font-mono font-bold transition-opacity border-2 border-black bg-black px-3 py-1.5 shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] flex items-center gap-1.5">
                  <ZoomIn className="w-3.5 h-3.5 text-[var(--accent)]" />
                  Expand Preview ↗
                </span>
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {galleryImages.length > 1 && (
              <div className="flex gap-2.5 pt-1 overflow-x-auto pb-1">
                {galleryImages.map((img, idx) => (
                  <button
                    key={img}
                    onClick={() => {
                      playClick();
                      setActiveImageIndex(idx);
                    }}
                    className={`relative w-24 h-16 overflow-hidden border-2 transition-all shrink-0 font-mono text-[10px] bg-[var(--background)] cursor-pointer ${activeImageIndex === idx
                        ? 'border-black dark:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] opacity-100'
                        : 'border-black/30 dark:border-white/30 opacity-60 hover:opacity-100'
                      }`}
                  >
                    <img
                      src={`/${img}`}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover object-top"
                    />
                    <span className="absolute bottom-0 right-0 bg-black text-white px-1.5 py-0.5 text-[9px] font-bold">
                      {idx + 1}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Problem & Solution Bento Grid ── */}
        {(project.problem || project.solution) && (
          <div className="grid grid-cols-1 border-2 border-black dark:border-white bg-[var(--surface)] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] md:grid-cols-2 mb-8">
            {project.problem && (
              <div className="space-y-3 border-b-2 border-black dark:border-white p-6 sm:p-7 md:border-b-0 md:border-r-2 md:border-black md:dark:border-white">
                <div className="flex items-center gap-2 border-b border-black/15 dark:border-white/15 pb-2.5">
                  <Shield className="w-4 h-4 text-[var(--accent)]" strokeWidth={2.5} />
                  <h3 className="font-mono font-black text-xs uppercase tracking-wider text-[var(--text-primary)]">
                    The Challenge &amp; Problem
                  </h3>
                </div>
                <p className="text-sm sm:text-base leading-relaxed text-[var(--text-secondary)] font-medium">
                  {project.problem}
                </p>
              </div>
            )}

            {project.solution && (
              <div className="space-y-3 p-6 sm:p-7">
                <div className="flex items-center gap-2 border-b border-black/15 dark:border-white/15 pb-2.5">
                  <CheckCircle className="w-4 h-4 text-[var(--accent)]" strokeWidth={2.5} />
                  <h3 className="font-mono font-black text-xs uppercase tracking-wider text-[var(--text-primary)]">
                    The Architectural Solution
                  </h3>
                </div>
                <p className="text-sm sm:text-base leading-relaxed text-[var(--text-secondary)] font-medium">
                  {project.solution}
                </p>
              </div>
            )}
          </div>
        )}

        {/* ── Core Capabilities & Features ── */}
        {project.features && project.features.length > 0 && (
          <div className="border-2 border-black dark:border-white bg-[var(--surface)] p-6 sm:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] mb-8 space-y-5">
            <div className="flex items-center gap-2 border-b-2 border-black dark:border-white pb-3">
              <ListTodo className="w-4 h-4 text-[var(--accent)]" strokeWidth={2.5} />
              <h3 className="font-mono font-black text-xs uppercase tracking-wider text-[var(--text-primary)]">
                Core Capabilities &amp; Engineering Highlights
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {project.features.map((feat) => (
                <div
                  key={feat}
                  className="flex items-start gap-3 border border-black dark:border-white bg-[var(--surface-elevated)] p-3.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] font-medium text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed"
                >
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent)] shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── System Architecture & Data Flow ── */}
        {(project.architectureDiagramUrl || project.architecture || project.process) && (
          <div className="border-2 border-black dark:border-white bg-[var(--surface)] p-6 sm:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] mb-8 space-y-5">
            <div className="flex items-center gap-2 border-b-2 border-black dark:border-white pb-3">
              <Workflow className="w-4 h-4 text-[var(--accent)]" strokeWidth={2.5} />
              <h3 className="font-mono font-black text-xs uppercase tracking-wider text-[var(--text-primary)]">
                System Topology &amp; Architecture Flow
              </h3>
            </div>

            {project.architecture && (
              <div className="border border-black dark:border-white bg-[var(--surface-elevated)] p-4 font-mono text-xs text-[var(--text-primary)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] leading-relaxed">
                <span className="font-bold text-[var(--accent)] block mb-1">Architecture Pipeline:</span>
                <p className="text-[var(--text-secondary)] font-medium">{project.architecture}</p>
              </div>
            )}

            {project.architectureDiagramUrl && (
              <div className="overflow-hidden border-2 border-black dark:border-white bg-[var(--background)] p-3">
                <img
                  src={`/${project.architectureDiagramUrl}`}
                  alt={`${project.title} Architecture Workflow Diagram`}
                  className="w-full h-auto object-contain max-h-[500px]"
                />
              </div>
            )}
          </div>
        )}

        {/* ── Tech Stack ── */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="border-2 border-black dark:border-white bg-[var(--surface)] p-6 sm:p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] mb-8 space-y-4">
            <div className="flex items-center gap-2 border-b-2 border-black dark:border-white pb-3">
              <Cpu className="w-4 h-4 text-[var(--accent)]" strokeWidth={2.5} />
              <h3 className="font-mono font-black text-xs uppercase tracking-wider text-[var(--text-primary)]">
                Technologies &amp; Tools Applied
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="border border-black dark:border-white bg-[var(--surface-elevated)] px-3 py-1 font-mono text-xs font-bold text-[var(--text-primary)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── Next Project / Navigation Footer ── */}
        <div className="border-2 border-black dark:border-white bg-[var(--surface)] p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs font-bold">
          <Link
            to="/#projects"
            onMouseEnter={playHover}
            onClick={playClick}
            className="flex items-center gap-2 hover:underline text-[var(--text-secondary)]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Case Studies Overview</span>
          </Link>

          {nextProject && (
            <Link
              to={`/projects/${nextProject.slug}`}
              onMouseEnter={playHover}
              onClick={playClick}
              className="flex items-center gap-2 border-2 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black px-4 py-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all"
            >
              <span>Next: {nextProject.title}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 p-2 text-white hover:text-[var(--accent)] transition-colors cursor-pointer"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <img
            src={`/${galleryImages[activeImageIndex]}`}
            alt={`${project.title} screenshot ${activeImageIndex + 1}`}
            className="max-w-[92vw] max-h-[88vh] object-contain border-2 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </main>
  );
};
