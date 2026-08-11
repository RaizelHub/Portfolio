import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Github, ExternalLink,
  CheckCircle2, Info, HelpCircle, Shield,
  Workflow, CheckCircle, ListTodo, X
} from 'lucide-react';
import { projects } from '../data/projects';
import { JobRadarCaseStudy } from '../components/ui/JobRadarCaseStudy';
import { CareerOSCaseStudy } from '../components/ui/CareerOSCaseStudy';

export const ProjectDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

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
      <main className="min-h-screen pt-20 flex items-center justify-center bg-[#F4F1EA] px-4 font-mono">
        <div className="text-center bg-[#EFEBE4] border border-[#D5D0C7] p-8 rounded-[2px] max-w-md w-full">
          <HelpCircle className="w-12 h-12 text-[#C7462D] mx-auto mb-3" />
          <h2 className="text-lg font-bold text-[#171717] mb-2 uppercase">REPOSITORY NOT FOUND</h2>
          <p className="text-xs text-[#6B6862] mb-6 leading-relaxed">
            The requested project path does not exist.
          </p>
          <button
            onClick={() => navigate('/#projects')}
            className="px-4 py-2 bg-[#171717] text-[#F4F1EA] hover:bg-[#C7462D] text-xs font-bold rounded-[2px]"
          >
            RETURN TO CASE STUDIES
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
    <main className="min-h-screen pt-12 pb-20 bg-[#F4F1EA] text-[#171717]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back navigation */}
        <div className="mb-6 flex items-center justify-between font-mono text-xs">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-1.5 font-semibold text-[#171717] hover:text-[#C7462D] transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-[#C7462D]" /> RETURN TO DASHBOARD
          </Link>
          <Link
            to="/projects"
            className="font-semibold text-[#C7462D] hover:underline"
          >
            VIEW ALL REPOSITORIES ↗
          </Link>
        </div>

        {slug === 'jobradar-ai' ? (
          <JobRadarCaseStudy />
        ) : slug === 'careeros' ? (
          <CareerOSCaseStudy />
        ) : (
          <>
            {/* Title Block Banner */}
            <div className="border-b border-[#D5D0C7] pb-6 mb-8 text-left">
              <div className="flex items-center gap-2 mb-2 font-mono">
                <span className="text-xs font-bold bg-[#171717] text-[#F4F1EA] px-2 py-0.5 rounded-[1px] uppercase">
                  {project.category}
                </span>
                <span className="text-xs text-[#C7462D] font-semibold uppercase">
                  {project.status}
                </span>
              </div>
              <h1 className="section-title text-[#171717] uppercase">
                {project.title}
              </h1>
              <p className="mt-2 text-sm sm:text-base text-[#6B6862] max-w-4xl leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

              {/* LEFT: Case Study Writing */}
              <div className="lg:col-span-8 space-y-8 text-left">

                {/* Gallery */}
                {galleryImages.length > 0 && (
                  <div className="space-y-3 bg-[#EFEBE4] border border-[#D5D0C7] p-2.5 rounded-[2px]">
                    <div
                      className="relative aspect-video rounded-[1px] overflow-hidden bg-[#F4F1EA] border border-[#D5D0C7] cursor-pointer group"
                      onClick={() => setLightboxOpen(true)}
                    >
                      <img
                        src={`/${galleryImages[activeImageIndex]}`}
                        alt={`${project.title} screenshot ${activeImageIndex + 1}`}
                        className="w-full h-full object-cover object-top transition-all duration-300"
                      />
                      <div className="absolute inset-0 bg-[#171717]/0 group-hover:bg-[#171717]/40 transition-colors flex items-center justify-center">
                        <span className="text-[#F4F1EA] opacity-0 group-hover:opacity-100 text-xs font-mono font-semibold transition-opacity bg-[#C7462D] px-3 py-1 rounded-[1px]">
                          EXPAND FULL SCREEN ↗
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
                            className={`relative w-24 h-16 rounded-[1px] overflow-hidden border-2 transition-all shrink-0 font-mono text-[10px] ${activeImageIndex === idx ? 'border-[#C7462D] opacity-100' : 'border-[#D5D0C7] opacity-60 hover:opacity-100'
                              }`}
                          >
                            <img
                              src={`/${img}`}
                              alt={`Thumbnail ${idx + 1}`}
                              className="w-full h-full object-cover object-top"
                            />
                            <span className="absolute bottom-0 right-0 bg-[#171717]/80 text-[#F4F1EA] px-1 py-0.2">
                              {idx + 1}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Overview / Background */}
                <section className="space-y-3">
                  <h3 className="text-base font-bold text-[#171717] flex items-center gap-2 border-b border-[#D5D0C7] pb-2 font-mono uppercase">
                    <Info className="w-4 h-4 text-[#C7462D]" /> SYSTEM OVERVIEW &amp; CONTEXT
                  </h3>
                  <p className="text-xs sm:text-sm text-[#171717] leading-relaxed font-normal">
                    {project.longDescription}
                  </p>
                </section>

                {/* Problem & Solution Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#EFEBE4] border border-[#D5D0C7] p-5 rounded-[2px] space-y-2">
                    <h4 className="font-mono font-bold text-[#C7462D] text-xs uppercase flex items-center gap-1.5">
                      <Shield className="w-4 h-4" /> THE PROBLEM SPECIFICATION
                    </h4>
                    <p className="text-xs sm:text-sm text-[#6B6862] leading-relaxed">
                      {project.problem}
                    </p>
                  </div>
                  <div className="bg-[#EFEBE4] border border-[#D5D0C7] p-5 rounded-[2px] space-y-2">
                    <h4 className="font-mono font-bold text-[#171717] text-xs uppercase flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-[#C7462D]" /> THE ARCHITECTURAL SOLUTION
                    </h4>
                    <p className="text-xs sm:text-sm text-[#6B6862] leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                </div>

                {/* Core Features */}
                <section className="space-y-3">
                  <h3 className="text-base font-bold text-[#171717] flex items-center gap-2 border-b border-[#D5D0C7] pb-2 font-mono uppercase">
                    <ListTodo className="w-4 h-4 text-[#C7462D]" /> CORE FEATURES &amp; CAPABILITIES
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-[#171717]">
                    {project.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-[#C7462D] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Development Process & Architecture Diagram */}
                <section className="space-y-4">
                  <h3 className="text-base font-bold text-[#171717] flex items-center gap-2 border-b border-[#D5D0C7] pb-2 font-mono uppercase">
                    <Workflow className="w-4 h-4 text-[#C7462D]" /> DEVELOPMENT PROCESS &amp; WORKFLOW
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6B6862] leading-relaxed">
                    {project.process}
                  </p>

                  {/* Dedicated Architecture Workflow Diagram Image Display */}
                  {project.architectureDiagramUrl && (
                    <div className="bg-[#EFEBE4] border border-[#D5D0C7] p-3 rounded-[2px] space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono text-[#6B6862]">
                        <span className="font-bold text-[#171717] uppercase flex items-center gap-1.5">
                          <Workflow className="w-3.5 h-3.5 text-[#C7462D]" /> SYSTEM ARCHITECTURE &amp; WORKFLOW DIAGRAM
                        </span>
                      </div>
                      <div className="overflow-hidden rounded-[1px] border border-[#D5D0C7] bg-[#F4F1EA]">
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

              {/* RIGHT: Tech Specs & Links Sidebar */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-[#EFEBE4] border border-[#D5D0C7] p-6 rounded-[2px] text-left space-y-5">
                  <h3 className="font-mono font-bold text-[#171717] border-b border-[#D5D0C7] pb-2 text-xs uppercase flex justify-between">
                    <span>TECHNICAL SPECIFICATIONS</span>
                  </h3>

                  {/* Stack badges */}
                  <div className="space-y-2 font-mono">
                    <span className="text-[10px] uppercase text-[#6B6862] block font-bold">
                      TECHNOLOGIES APPLIED
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-0.5 bg-[#F4F1EA] text-[#171717] rounded-[1px] border border-[#D5D0C7]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Repository Links */}
                  <div className="space-y-2 pt-3 font-mono text-xs">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-4 bg-[#171717] hover:bg-[#C7462D] text-[#F4F1EA] font-bold rounded-[1px] transition-colors flex items-center justify-center gap-2 uppercase tracking-wider block text-center"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>VISIT LIVE DEMO ↗</span>
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-4 bg-[#F4F1EA] hover:bg-[#EFEBE4] text-[#171717] border border-[#D5D0C7] font-bold rounded-[1px] transition-colors flex items-center justify-center gap-2 uppercase tracking-wider block text-center"
                      >
                        <Github className="w-4 h-4" />
                        <span>INSPECT SOURCE CODE ↗</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

            </div>
          </>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-[#171717]/90 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 p-2 text-[#F4F1EA] hover:text-[#C7462D]"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <img
            src={`/${galleryImages[activeImageIndex]}`}
            alt={`${project.title} screenshot ${activeImageIndex + 1}`}
            className="max-w-[90vw] max-h-[90vh] object-contain border-2 border-[#D5D0C7]"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </main>
  );
};
