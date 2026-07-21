import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Github, ExternalLink, Smartphone,
  CheckCircle2, Key, Info, HelpCircle, Shield,
  Workflow, CheckCircle, ListTodo
} from 'lucide-react';
import { projects } from '../data/projects';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

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

  if (!project) {
    return (
      <main className="min-h-screen pt-28 flex items-center justify-center bg-navy-900 px-4">
        <div className="text-center bg-navy-800/20 border border-navy-800 p-8 rounded-lg max-w-md w-full">
          <HelpCircle className="w-12 h-12 text-rose-500 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-white mb-2">Project Not Found</h2>
          <p className="text-sm text-slate-400 mb-6 leading-relaxed">
            The project path you requested does not exist. It may have been moved or renamed.
          </p>
          <Button variant="primary" onClick={() => navigate('/#projects')}>
            Return to Work
          </Button>
        </div>
      </main>
    );
  }

  const galleryImages = project.images || (project.image ? [project.image] : []);

  return (
    <main className="min-h-screen pt-28 pb-20 bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back navigation */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-400 hover:text-emerald-400 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Link>
          <Link
            to="/projects"
            className="text-xs font-semibold text-emerald-400 hover:underline"
          >
            View Projects Directory
          </Link>
        </div>

        {/* Title Block Banner */}
        <div className="border-b border-navy-800 pb-8 mb-8 text-left">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl sm:text-3xl">{project.emoji}</span>
            <Badge variant="emerald">{project.category}</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
            {project.title}
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-4xl leading-relaxed">
            {project.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT: Case Study Writing (8 cols) */}
          <div className="lg:col-span-8 space-y-8 text-left">

            {/* Gallery — live iframe or static image gallery */}
            {project.liveUrl ? (
              <div className="space-y-2 bg-navy-950 border border-navy-800 rounded-lg overflow-hidden">
                {/* Browser chrome bar */}
                <div className="flex items-center gap-2 px-3 py-2 bg-navy-900 border-b border-navy-800">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                  <span className="ml-2 flex-1 bg-navy-800 rounded text-[10px] font-mono text-slate-500 px-2 py-0.5 truncate">
                    {project.liveUrl}
                  </span>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-emerald-400 transition-colors"
                    title="Open in new tab"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <div className="relative w-full" style={{ height: '700px' }}>
                  <iframe
                    src={project.liveUrl}
                    title={`${project.title} live demo`}
                    className="w-full h-full border-none"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                    loading="lazy"
                  />
                </div>
              </div>
            ) : galleryImages.length > 0 ? (
              <div className="space-y-3 bg-navy-950 border border-navy-800 p-2.5 rounded-lg">
                <div className="relative aspect-video rounded overflow-hidden bg-navy-900 border border-navy-850">
                  <img
                    src={`/${galleryImages[activeImageIndex]}`}
                    alt={`${project.title} screenshot ${activeImageIndex + 1}`}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                {/* Thumbnails grid */}
                {galleryImages.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-1.5">
                    {galleryImages.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImageIndex(i)}
                        className={`relative w-20 aspect-video rounded overflow-hidden border transition-all shrink-0 ${activeImageIndex === i
                          ? 'border-emerald-500 ring-1 ring-emerald-500/30'
                          : 'border-navy-700/60 hover:border-slate-500'
                          }`}
                      >
                        <img src={`/${img}`} alt="thumbnail" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : null}

            {/* Overview / Background */}
            <section className="space-y-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-navy-800 pb-2">
                <Info className="w-4.5 h-4.5 text-emerald-400" /> System Overview
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                {project.longDescription}
              </p>
            </section>

            {/* Problem & Solution Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-rose-950/15 border border-rose-900/25 p-5 rounded-lg space-y-2">
                <h4 className="font-bold text-rose-300 text-sm sm:text-base flex items-center gap-1.5">
                  <Shield className="w-4 h-4" /> The Problem
                </h4>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {project.problem}
                </p>
              </div>
              <div className="bg-emerald-950/15 border border-emerald-900/25 p-5 rounded-lg space-y-2">
                <h4 className="font-bold text-emerald-300 text-sm sm:text-base flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4" /> The Solution
                </h4>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Features checkmarks */}
            <section className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-navy-800 pb-2">
                <ListTodo className="w-4.5 h-4.5 text-emerald-400" /> Core Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-400">
                {project.features.map((feat) => (
                  <div key={feat} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Development Process */}
            <section className="space-y-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-navy-800 pb-2">
                <Workflow className="w-4.5 h-4.5 text-emerald-400" /> Development Process
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {project.process}
              </p>
            </section>

            {/* Challenges & Results Side-by-Side */}
            <div className="border-t border-navy-800 pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h4 className="font-bold text-white text-sm sm:text-base">Key Challenge</h4>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {project.challenges}
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-bold text-white text-sm sm:text-base">Project Outcome</h4>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {project.results}
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT: Tech Specs & Links Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">

            {/* Project Access Note if POS */}
            {project.accessNote && (
              <div className="bg-amber-950/20 border border-amber-900/30 p-5 rounded-lg flex items-start gap-3">
                <Key className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-left">
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block mb-1">
                    Credentials Note
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {project.accessNote}
                  </p>
                </div>
              </div>
            )}

            {/* Technical specs card */}
            <div className="bg-navy-800/20 border border-navy-700/40 p-6 rounded-lg text-left space-y-5">
              <h3 className="font-bold text-white border-b border-navy-800 pb-2.5 text-sm sm:text-base">
                Technical Specifications
              </h3>

              {/* Stack badges */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block font-bold">
                  Technologies Applied
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-2 py-0.5 bg-navy-900 text-slate-300 rounded border border-navy-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Call-to-action repository link integrations */}
              <div className="space-y-3 pt-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button
                      variant="primary"
                      className="w-full text-xs font-semibold"
                      leftIcon={<ExternalLink className="w-3.5 h-3.5" />}
                    >
                      Visit Live Site
                    </Button>
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block"
                  >
                    <Button
                      variant="secondary"
                      className="w-full text-xs"
                      leftIcon={<Github className="w-3.5 h-3.5" />}
                    >
                      {project.githubLabel || 'Inspect Source Code'}
                    </Button>
                  </a>
                )}

                {project.apkUrl && (
                  <a
                    href={`/${project.apkUrl}`}
                    download
                    className="w-full block"
                  >
                    <Button
                      variant="secondary"
                      className="w-full text-xs text-emerald-400 hover:text-emerald-300 border-emerald-800/40 hover:border-emerald-500/40"
                      leftIcon={<Smartphone className="w-3.5 h-3.5" />}
                    >
                      Download Android APK
                    </Button>
                  </a>
                )}
              </div>
            </div>

            {/* Quick availability reference */}
            <div className="bg-navy-800/10 border border-navy-850 p-5 rounded-lg text-left">
              <span className="text-xs font-bold text-white block mb-1">Timezone / Location Ready</span>
              <p className="text-xs text-slate-400 leading-relaxed">
                This project was created and compiled by Janmark M. Suelto. He is available for remote opportunities on similar stacks.
              </p>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
};
