import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Expand } from "lucide-react";
import { projects } from "../data/projects";
import type { Project } from "../types";
import { ProjectLinks } from "../components/projects/PortfolioProjectCard";
import { ProjectLikeButton } from "../components/ui/ProjectLikeButton";
import { Dialog } from "../components/ui/Dialog";
const projectName = (project: Project) => project.title.split(" — ")[0];
function CaseStudy({ project }: { project: Project }) {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const images = project.images?.length
    ? project.images
    : project.image
      ? [project.image]
      : [];
  const label = (i: number) =>
    project.slug === "collabcanvas"
      ? ["Whiteboard", "Pages & document editor", "Collaboration"][i] ||
        `Screenshot ${i + 1}`
      : `${projectName(project)} · Screenshot ${i + 1}`;
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  const move = (direction: number) =>
    setActive((i) => (i + direction + images.length) % images.length);
  return (
    <>
      <Link className="text-link back-link" to="/projects">
        <ArrowLeft size={16} />
        All projects
      </Link>
      <header className="page-heading case-heading">
        <p className="eyebrow">
          {project.category} / {project.status}
        </p>
        <h1>{project.title}</h1>
        <p>{project.description}</p>
        {project.role && <p className="metadata">Role: {project.role}</p>}
        <ProjectLinks project={project} />
        <ul className="tags">
          {project.technologies.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        {project.accessNote && (
          <p className="access-note">{project.accessNote}</p>
        )}
      </header>
      {images.length > 0 && (
        <section className="case-gallery" aria-label="Application screenshots">
          <button
            className="gallery-main"
            onClick={() => setExpanded(true)}
            aria-label={`Expand ${label(active)}`}
          >
            <img
              src={`/${images[active]}`}
              alt={label(active)}
              width="1280"
              height="720"
            />
            <span>
              <Expand size={16} />
              Fullscreen preview
            </span>
          </button>
          <div className="gallery-controls">
            <p aria-live="polite">
              {label(active)}{" "}
              <span className="metadata">
                {active + 1} / {images.length}
              </span>
            </p>
            <div className="actions">
              <button
                className="icon-button"
                onClick={() => move(-1)}
                aria-label="Previous screenshot"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                className="icon-button"
                onClick={() => move(1)}
                aria-label="Next screenshot"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
          <div className="gallery-thumbnails">
            {images.map((src, i) => (
              <button
                key={src}
                aria-label={`Show ${label(i)}`}
                aria-pressed={i === active}
                onClick={() => setActive(i)}
              >
                <img
                  src={`/${src}`}
                  alt=""
                  loading="lazy"
                  width="120"
                  height="75"
                />
                <span>
                  {project.slug === "collabcanvas" ? label(i) : i + 1}
                </span>
              </button>
            ))}
          </div>
        </section>
      )}
      <div className="case-content">
        <section>
          <h2>Purpose & approach</h2>
          <div className="prose">
            <h3>The problem</h3>
            <p>{project.problem}</p>
            <h3>The approach</h3>
            <p>{project.solution}</p>
          </div>
        </section>
        <section>
          <h2>What it does</h2>
          <ul>
            {project.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2>Technical implementation</h2>
          <div className="prose">
            {project.architecture && (
              <p className="architecture">{project.architecture}</p>
            )}
            {project.architectureDetails?.map((d, i) => (
              <div key={i}>
                <h3>
                  {d.layer || d.component} {d.technology && `· ${d.technology}`}
                </h3>
                <p>{d.responsibility || d.responsibilities}</p>
              </div>
            ))}
            {typeof project.technicalDecisions === "string" ? (
              <p>{project.technicalDecisions}</p>
            ) : (
              project.technicalDecisions?.map((d, i) => (
                <p key={i}>
                  {typeof d === "string" ? (
                    d
                  ) : (
                    <>
                      <strong>{d.decision}</strong>
                      <br />
                      {d.reason}
                    </>
                  )}
                </p>
              ))
            )}
            {project.architectureDiagramUrl && (
              <img
                className="architecture-image"
                src={`/${project.architectureDiagramUrl}`}
                alt={`${projectName(project)} architecture diagram`}
                loading="lazy"
              />
            )}
            <h3>Development process</h3>
            <p>{project.process}</p>
          </div>
        </section>
        <section>
          <h2>Challenges & lessons</h2>
          <div className="prose">
            {typeof project.challenges === "string" ? (
              <p>{project.challenges}</p>
            ) : (
              project.challenges.map((c, i) => (
                <p key={i}>
                  {typeof c === "string" ? (
                    c
                  ) : (
                    <>
                      <strong>{c.challenge}</strong>
                      <br />
                      {c.approach}
                      <br />
                      {c.result}
                    </>
                  )}
                </p>
              ))
            )}
            {project.lessonsLearned && <p>{project.lessonsLearned}</p>}
            {project.lessonsLearnedList?.map((l) => (
              <p key={l}>{l}</p>
            ))}
          </div>
        </section>
        <section>
          <h2>Outcome & current status</h2>
          <div className="prose">
            <p>{project.results}</p>
            {project.currentLimitations && (
              <>
                <h3>Limitations</h3>
                <p>{project.currentLimitations}</p>
              </>
            )}
            {project.limitations && (
              <ul>
                {project.limitations.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            )}
            {project.nextSteps && (
              <>
                <h3>Next steps</h3>
                <ul>
                  {project.nextSteps.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </section>
      </div>
      <ProjectLikeButton
        slug={project.slug}
        projectName={projectName(project)}
      />
      <div className="contact-strip">
        <Link className="text-link" to="/projects">
          ← All projects
        </Link>
        <Link className="text-link" to={`/projects/${next.slug}`}>
          Next: {projectName(next)}
          <ArrowRight size={16} />
        </Link>
      </div>
      {expanded && (
        <Dialog
          label={`${projectName(project)} screenshot preview`}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              move(-1);
            }
            if (e.key === "ArrowRight") {
              e.preventDefault();
              move(1);
            }
          }}
          onClose={() => setExpanded(false)}
        >
          <div>
            <img
              className="lightbox-image"
              src={`/${images[active]}`}
              alt={label(active)}
            />
            <div className="gallery-controls">
              <button
                className="button"
                onClick={() => move(-1)}
                aria-label="Previous fullscreen screenshot"
              >
                ← Previous
              </button>
              <p aria-live="polite">{label(active)}</p>
              <button
                className="button"
                onClick={() => move(1)}
                aria-label="Next fullscreen screenshot"
              >
                Next →
              </button>
            </div>
          </div>
        </Dialog>
      )}
    </>
  );
}
export function ProjectDetails() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);
  return project ? (
    <CaseStudy key={project.slug} project={project} />
  ) : (
    <div className="empty-state">
      <h1>Project not found.</h1>
      <Link className="button" to="/projects">
        Back to projects
      </Link>
    </div>
  );
}
