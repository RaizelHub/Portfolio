import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import type { Project } from "../../types";
const projectName = (project: Project) => project.title.split(" — ")[0];
export function ProjectLinks({ project }: { project: Project }) {
  const isRepo =
    project.githubUrl &&
    new URL(project.githubUrl).pathname.split("/").filter(Boolean).length > 1;
  return (
    <div className="project-links">
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          aria-label={`${projectName(project)} ${isRepo ? "GitHub repository" : "GitHub profile"}`}
        >
          {isRepo ? "GitHub" : "GitHub profile"}
          <ArrowUpRight size={15} />
        </a>
      )}
      {project.liveUrl && (
        <a href={project.liveUrl} target="_blank" rel="noreferrer">
          {project.slug === "collabcanvas" ? "Live demo" : "Deployment"}
          <ArrowUpRight size={15} />
        </a>
      )}
      {project.apkUrl && (
        <a href={project.apkUrl} download>
          Download APK
          <ArrowUpRight size={15} />
        </a>
      )}
    </div>
  );
}
export function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  return (
    <article className={`project-card ${featured ? "featured-card" : ""}`}>
      <Link
        to={`/projects/${project.slug}`}
        className="project-image"
        aria-label={`View ${projectName(project)} case study`}
      >
        {project.image ? (
          project.slug === "vocara" ? (
            <div className="mobile-previews">
              {[2, 3, 4].map((i) => (
                <img
                  key={i}
                  src={`/img/optimized/vocara1 (${i}).webp`}
                  alt={`Vocara application screen ${i}`}
                  loading="lazy"
                  decoding="async"
                  width="420"
                  height="900"
                />
              ))}
            </div>
          ) : (
            <img
              src={`/${project.image}`}
              alt={`${projectName(project)} application interface`}
              loading="lazy"
              decoding="async"
              width="1280"
              height="720"
            />
          )
        ) : (
          <span>Explore the implementation →</span>
        )}
      </Link>
      <div className="project-card-body">
        <div className="project-meta">
          <span>{project.category}</span>
          <span>{project.status}</span>
        </div>
        <h3>
          <Link to={`/projects/${project.slug}`}>{projectName(project)}</Link>
        </h3>
        <p>{project.summary || project.description}</p>
        <ul className="tags" aria-label="Technology stack">
          {project.technologies.slice(0, 4).map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
        <div className="project-card-footer">
          <Link
            className="text-link"
            to={`/projects/${project.slug}`}
            aria-label={`View ${projectName(project)} case study`}
          >
            View case study
            <ArrowRight size={16} />
          </Link>
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}
