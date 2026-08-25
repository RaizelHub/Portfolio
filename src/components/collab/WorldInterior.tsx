import { useState } from 'react';
import { ArrowLeft, ArrowRight, FileText, Github, MessageSquareText, PencilLine, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { profile } from '../../data/profile';
import { projects } from '../../data/projects';
import { experiences } from '../../data/experience';
import { technologies } from '../../data/technologies';
import type { WorldBuilding } from '../../lib/collab/worldConfig';
import { ProjectCartGuide } from './ProjectCartGuide';
import './WorldInterior.css';

type Props = {
  building: WorldBuilding;
  visitorCount: number;
  onBack: () => void;
  onOpenCanvas: () => void;
  onOpenVisitorWall: () => void;
};

export function WorldInterior({ building, visitorCount, onBack, onOpenCanvas, onOpenVisitorWall }: Props) {
  const buildingProjects = building.projectSlugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is NonNullable<typeof project> => Boolean(project));
  
  const [selectedSlug, setSelectedSlug] = useState<string>(
    buildingProjects[0]?.slug || ''
  );

  const activeProject = buildingProjects.find((p) => p.slug === selectedSlug) || buildingProjects[0];

  // 1. Collab HQ Interior
  if (building.type === 'collab') {
    return (
      <div className="world-interior world-interior-collab" role="dialog" aria-modal="true" aria-labelledby="world-interior-title">
        <header className="world-interior-header">
          <button type="button" onClick={onBack}><ArrowLeft /> Back outside</button>
          <span>{visitorCount} visitor{visitorCount === 1 ? '' : 's'} in the world</span>
        </header>
        <main>
          <div className="world-interior-intro">
            <p>SHARED SPACE / CAMPUS CENTER</p>
            <h1 id="world-interior-title">Collab HQ</h1>
            <span>A quiet communal room for small ideas, live drawings, and visitor notes.</span>
          </div>
          <div className="hq-spaces">
            <button type="button" onClick={onOpenCanvas}>
              <PencilLine />
              <strong>Collab Canvas</strong>
              <span>Write, draw, or leave a live note on the shared multiplayer canvas.</span>
              <em>Leave your mark <ArrowRight /></em>
            </button>
            <button type="button" onClick={onOpenVisitorWall}>
              <MessageSquareText />
              <strong>Visitor Wall</strong>
              <span>Read and post short public notes with people who explored the campus.</span>
              <em>Open visitor wall <ArrowRight /></em>
            </button>
          </div>
          <div className="hq-lounge">
            <Users />
            <span>{visitorCount === 1 ? 'You are the only visitor here right now.' : `${visitorCount} visitors are exploring the campus.`}</span>
          </div>
        </main>
      </div>
    );
  }

  // 2. Developer Studio Interior (About / Resume / Experience)
  if (building.type === 'developer') {
    return (
      <div className="world-interior world-interior-developer" role="dialog" aria-modal="true" aria-labelledby="world-interior-title">
        <header className="world-interior-header">
          <button type="button" onClick={onBack}><ArrowLeft /> Back outside</button>
          <span>DEVELOPER STUDIO</span>
        </header>
        <main>
          <section className="developer-studio-profile">
            <img src={profile.profileImage} alt={profile.name} />
            <div>
              <p>ABOUT / EXPERIENCE / STACK</p>
              <h1 id="world-interior-title">{profile.name}</h1>
              <strong>{profile.title}</strong>
              <span>{profile.bio}</span>
              <div className="developer-studio-links">
                <a href={profile.resumeUrl} target="_blank" rel="noreferrer"><FileText /> Resume</a>
                <a href={profile.githubUrl} target="_blank" rel="noreferrer"><Github /> GitHub</a>
                <Link to="/#contact">Contact <ArrowRight /></Link>
              </div>
            </div>
          </section>
          <section className="developer-studio-details">
            <article>
              <p>RECENT EXPERIENCE</p>
              {experiences.slice(0, 2).map((experience) => (
                <div key={experience.id}>
                  <strong>{experience.role}</strong>
                  <span>{experience.company} · {experience.period}</span>
                </div>
              ))}
            </article>
            <article>
              <p>WORKING STACK</p>
              <div className="studio-tech-list">
                {technologies.slice(0, 12).map((technology) => (
                  <span key={technology.id}>{technology.name}</span>
                ))}
              </div>
            </article>
          </section>
        </main>
      </div>
    );
  }

  // 3. Collection Building Interior (Multi-Project Exhibition with Carts)
  if (building.type === 'collection') {
    return (
      <div className="world-interior" role="dialog" aria-modal="true" aria-labelledby="world-interior-title">
        <header className="world-interior-header">
          <button type="button" onClick={onBack}><ArrowLeft /> Back outside</button>
          <span>{building.subtitle}</span>
        </header>
        <main>
          <div className="world-interior-intro">
            <p>SHARED EXHIBITION GALLERY</p>
            <h1 id="world-interior-title">{building.label}</h1>
            <span>Explore interactive project carts and talk to the project guide for architectural details.</span>
          </div>

          {/* Project Switcher Tabs */}
          <div className="collection-project-tabs">
            {buildingProjects.map((p) => (
              <button
                key={p.slug}
                type="button"
                onClick={() => setSelectedSlug(p.slug)}
                className={`collection-tab-btn ${p.slug === activeProject?.slug ? 'is-active' : ''}`}
              >
                <span>{p.title}</span>
                <small>{p.category}</small>
              </button>
            ))}
          </div>

          {/* Active Cart & Human Guide for selected project */}
          {activeProject && (
            <ProjectCartGuide
              project={activeProject}
              isWIP={building.isWIP || activeProject.status?.toLowerCase().includes('development')}
            />
          )}
        </main>
      </div>
    );
  }

  if (!activeProject) return null;

  // 4. Dedicated Single Project Exhibition Hall with Interactive Cart & Guide
  return (
    <div className="world-interior" role="dialog" aria-modal="true" aria-labelledby="world-interior-title">
      <header className="world-interior-header">
        <button type="button" onClick={onBack}><ArrowLeft /> Back outside</button>
        <div className="flex items-center gap-2">
          {building.isWIP && (
            <span className="border border-black bg-black px-2 py-0.5 text-[9px] font-mono font-bold text-white uppercase">
              [ 🚧 WIP / UNDER CONSTRUCTION 🚧 ]
            </span>
          )}
          <span>{building.subtitle}</span>
        </div>
      </header>
      <main>
        <div className="world-interior-intro">
          <p>{activeProject.category} / {activeProject.status}</p>
          <h1 id="world-interior-title">{building.label}</h1>
          <span>
            {building.isWIP
              ? 'This prototype is actively being built. Talk to the lead engineer at the workbench below to learn about current progress.'
              : 'Interactive project exhibition stand. Talk to the project guide to explore architecture, challenges, and tech stack.'}
          </span>
        </div>

        {/* Interactive Cart & Talking Human Guide */}
        <ProjectCartGuide
          project={activeProject}
          isWIP={building.isWIP}
        />
      </main>
    </div>
  );
}
