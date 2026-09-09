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
    <div className="pb-16 pt-0 select-none font-sans text-[var(--text-primary)]">
      <div>
        {/* ── Top Bar: Back & Like ── */}
        <div className="mb-6 flex min-w-0 flex-wrap items-center justify-between gap-3 font-mono text-xs font-semibold">
          <Link
            to="/"
            onMouseEnter={playHover}
            onClick={playClick}
            className="btn-pill-white inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold tracking-wide cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-neutral-800 dark:text-neutral-200" strokeWidth={2.5} />
            <span>Return to Bento Dashboard</span>
          </Link>

          <div className="flex items-center gap-2.5">
            {slug && <ProjectLikeButton slug={slug} projectName={project.title} variant="badge" />}
            <Link
              to="/projects"
              onMouseEnter={playHover}
              onClick={playClick}
              className="btn-pill-white inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold tracking-wide cursor-pointer"
            >
              <span>Projects Directory</span>
              <ArrowRight className="w-3 h-3 text-neutral-800 dark:text-neutral-200" />
            </Link>
          </div>
        </div>

        {/* ── Case Study Header Block ── */}
        <div className="rounded-2xl border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#161822] p-5 sm:p-6 shadow-xs mb-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-3 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white border border-neutral-300 dark:border-neutral-700 px-2.5 py-0.5 font-bold uppercase text-[10px]">
                {project.category}
              </span>
              <span className="rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 px-2.5 py-0.5 font-medium text-neutral-600 dark:text-neutral-400 text-[10px]">
                {project.status}
              </span>
            </div>
            {project.role && (
              <span className="text-neutral-500 dark:text-neutral-400 font-medium text-[11px]">
                Role: {project.role}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <h1 className="font-title text-xl sm:text-2xl font-black text-neutral-900 dark:text-white tracking-tight leading-[1.1]">
              {project.title}
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-3xl font-normal">
              {project.description}
            </p>
          </div>

          {/* Quick Action Bar */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1 font-title text-xs">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHover}
                onClick={playClick}
                className="btn-pill-black inline-flex min-h-9 items-center gap-2 px-4 py-1.5 font-semibold shadow-xs cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" strokeWidth={2.5} />
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
                className="btn-pill-white inline-flex min-h-9 items-center gap-2 px-3.5 py-1.5 font-semibold cursor-pointer shadow-2xs"
              >
                <Github className="w-3.5 h-3.5" />
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
          <div className="grid grid-cols-1 rounded-2xl border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#161822] shadow-xs md:grid-cols-2 mb-6 overflow-hidden">
            {project.problem && (
              <div className="space-y-2.5 border-b-2 border-neutral-300 dark:border-neutral-700 p-5 md:border-b-0 md:border-r-2 md:border-neutral-300 md:dark:border-neutral-700">
                <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-2">
                  <Shield className="w-3.5 h-3.5 text-neutral-900 dark:text-white" strokeWidth={2.5} />
                  <h3 className="font-title font-bold text-xs uppercase tracking-wider text-neutral-900 dark:text-white">
                    The Challenge &amp; Problem
                  </h3>
                </div>
                <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-300 font-normal">
                  {project.problem}
                </p>
              </div>
            )}

            {project.solution && (
              <div className="space-y-2.5 p-5">
                <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-2">
                  <CheckCircle className="w-3.5 h-3.5 text-neutral-900 dark:text-white" strokeWidth={2.5} />
                  <h3 className="font-title font-bold text-xs uppercase tracking-wider text-neutral-900 dark:text-white">
                    The Architectural Solution
                  </h3>
                </div>
                <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-300 font-normal">
                  {project.solution}
                </p>
              </div>
            )}
          </div>
        )}

        {/* ── Core Capabilities & Features ── */}
        {project.features && project.features.length > 0 && (
          <div className="rounded-2xl border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#161822] p-5 shadow-xs mb-6 space-y-3.5">
            <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-2.5">
              <ListTodo className="w-3.5 h-3.5 text-neutral-900 dark:text-white" strokeWidth={2.5} />
              <h3 className="font-title font-bold text-xs uppercase tracking-wider text-neutral-900 dark:text-white">
                Core Capabilities &amp; Engineering Highlights
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {project.features.map((feat) => (
                <div
                  key={feat}
                  className="flex items-start gap-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/80 p-3 font-medium text-xs text-neutral-800 dark:text-neutral-200 leading-relaxed"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── System Architecture & Data Flow ── */}
        {(project.architectureDiagramUrl || project.architecture || project.process) && (
          <div className="rounded-2xl border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#161822] p-5 shadow-xs mb-6 space-y-3.5">
            <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-2.5">
              <Workflow className="w-3.5 h-3.5 text-neutral-900 dark:text-white" strokeWidth={2.5} />
              <h3 className="font-title font-bold text-xs uppercase tracking-wider text-neutral-900 dark:text-white">
                System Topology &amp; Architecture Flow
              </h3>
            </div>

            {project.architecture && (
              <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/80 p-3.5 font-mono text-xs text-neutral-800 dark:text-neutral-200 leading-relaxed">
                <span className="font-bold text-neutral-900 dark:text-white block mb-1">Architecture Pipeline:</span>
                <p className="text-neutral-600 dark:text-neutral-300 font-sans">{project.architecture}</p>
              </div>
            )}

            {project.architectureDiagramUrl && (
              <div className="overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/80 p-3">
                <img
                  src={`/${project.architectureDiagramUrl}`}
                  alt={`${project.title} Architecture Workflow Diagram`}
                  className="w-full h-auto object-contain max-h-[460px] mx-auto"
                />
              </div>
            )}
          </div>
        )}

        {/* ── Tech Stack ── */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="rounded-2xl border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#161822] p-5 shadow-xs mb-6 space-y-3">
            <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-2.5">
              <Cpu className="w-3.5 h-3.5 text-neutral-900 dark:text-white" strokeWidth={2.5} />
              <h3 className="font-title font-bold text-xs uppercase tracking-wider text-neutral-900 dark:text-white">
                Technologies &amp; Tools Applied
              </h3>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-neutral-700 dark:text-neutral-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── Next Project / Navigation Footer ── */}
        <div className="rounded-2xl border-2 border-neutral-300 dark:border-neutral-700 bg-white dark:bg-[#161822] p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 font-title text-xs">
          <Link
            to="/projects"
            onMouseEnter={playHover}
            onClick={playClick}
            className="flex items-center gap-1.5 font-semibold text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Projects Directory</span>
          </Link>

          {nextProject && (
            <Link
              to={`/projects/${nextProject.slug}`}
              onMouseEnter={playHover}
              onClick={playClick}
              className="btn-pill-black inline-flex items-center gap-1.5 px-4 py-1.5 font-semibold shadow-xs"
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
    </div>
  );
};
