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

  const galleryImages = project.images || (project.image ? [project.image] : []);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowLeft') setActiveImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
      if (e.key === 'ArrowRight') setActiveImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen, galleryImages.length]);

  return (
    <main className="min-h-screen pt-8 pb-20 bg-[var(--background)] text-[var(--text-primary)] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back navigation */}
        <div className="mb-6 flex items-center justify-between font-mono text-xs">
          <Link
            to="/#projects"
            onMouseEnter={playHover}
            onClick={playClick}
            className="inline-flex items-center gap-1.5 font-medium text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[var(--accent)]" />
            <span>Return to Overview</span>
          </Link>
          <Link
            to="/projects"
            onMouseEnter={playHover}
            onClick={playClick}
            className="font-medium text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
          >
            View All Repositories ↗
          </Link>
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
            <div className="border-b border-[var(--border-subtle)] pb-6 mb-8 text-left">
              <div className="flex items-center gap-2 mb-2.5 font-mono text-xs">
                <span className="font-bold bg-[var(--surface-elevated)] text-[var(--text-primary)] border border-[var(--border-subtle)] px-2 py-0.5 rounded uppercase text-[10px]">
                  {project.category}
                </span>
                <span className="text-[var(--text-muted)] font-medium">
                  {project.status}
                </span>
              </div>

              <h1 className="font-title text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--text-primary)] mb-3">
                {project.title}
              </h1>

              <p className="text-base sm:text-lg text-[var(--text-secondary)] font-sans max-w-4xl leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* LEFT: Case Study Core Content */}
              <div className="lg:col-span-8 space-y-8 text-left">
                {/* Gallery */}
                {galleryImages.length > 0 && (
                  <div className="space-y-3 bg-[var(--surface)] border border-[var(--border-subtle)] p-3 rounded-xl shadow-xs">
                    <div
                      className="relative aspect-video rounded-lg overflow-hidden bg-[var(--background)] border border-[var(--border-subtle)] cursor-pointer group flex items-center justify-center"
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
                  <p className="text-sm sm:text-base text-[var(--text-secondary)] font-sans leading-relaxed">
                    {project.longDescription}
                  </p>
                </section>

                {/* Problem & Solution Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="bg-[var(--surface)] border border-[var(--border-subtle)] p-5 rounded-xl space-y-2 shadow-xs">
                    <h4 className="font-mono font-bold text-xs uppercase flex items-center gap-1.5 text-[var(--accent)]">
                      <Shield className="w-4 h-4" /> The Problem Specification
                    </h4>
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
                      {project.problem}
                    </p>
                  </div>
                  <div className="bg-[var(--surface)] border border-[var(--border-subtle)] p-5 rounded-xl space-y-2 shadow-xs">
                    <h4 className="font-mono font-bold text-xs uppercase flex items-center gap-1.5 text-[var(--text-primary)]">
                      <CheckCircle className="w-4 h-4 text-[var(--accent)]" /> The Architectural Solution
                    </h4>
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-[var(--text-primary)] font-sans">
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
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
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
              <div className="lg:col-span-4 space-y-5">
                <div className="bg-[var(--surface)] border border-[var(--border-subtle)] p-6 rounded-xl text-left space-y-5 shadow-xs">
                  <h3 className="font-mono font-bold text-[var(--text-primary)] border-b border-[var(--border-subtle)] pb-2.5 text-xs uppercase">
                    Technical Specifications
                  </h3>

                  {/* Stack badges */}
                  <div className="space-y-2 font-mono">
                    <span className="text-[10px] uppercase text-[var(--text-muted)] block font-bold">
                      Technologies Applied
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2.5 py-1 bg-[var(--surface-elevated)] text-[var(--text-secondary)] rounded-md border border-[var(--border-subtle)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="space-y-2 pt-2 font-mono text-xs">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-4 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--on-accent)] font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 block text-center"
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
                        className="w-full py-2.5 px-4 bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--border)] font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 block text-center"
                      >
                        <Github className="w-4 h-4" />
                        <span>Inspect Source Code ↗</span>
                      </a>
                    )}
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
