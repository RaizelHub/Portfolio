import { useState } from "react";
import { projects } from "../data/projects";
import { ProjectCard } from "../components/projects/PortfolioProjectCard";
import { featuredSlugs } from "../data/featuredProjects";
export function Projects() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [featured, setFeatured] = useState(false);
  const categories = ["All", ...new Set(projects.map((p) => p.category))];
  const ordered = [...projects].sort((a, b) => {
    const rank = (slug: string) => {
      const i = featuredSlugs.indexOf(slug);
      return i < 0 ? 99 : i;
    };
    return rank(a.slug) - rank(b.slug);
  });
  const visible = ordered.filter(
    (p) =>
      (category === "All" || p.category === category) &&
      (!featured || p.featured) &&
      `${p.title} ${p.description} ${p.technologies.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <>
      <header className="page-heading">
        <p className="eyebrow">Portfolio / Projects</p>
        <h1>Work, with the details.</h1>
        <p>
          Web applications, mobile prototypes, and automation experiments.
          Explore the interface, implementation, and tradeoffs behind each
          project.
        </p>
      </header>
      <div className="project-filters">
        <div className="filter-buttons" aria-label="Project category">
          {categories.map((c) => (
            <button
              key={c}
              className="button"
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <label className="search-label">
          Search projects
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Name or technology"
          />
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
          />
          Featured only
        </label>
      </div>
      <p className="result-count" role="status">
        {visible.length} {visible.length === 1 ? "project" : "projects"}
      </p>
      {visible.length ? (
        <div className="projects-grid">
          {visible.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No projects matched.</h2>
          <p>Try another technology or reset the filters.</p>
          <button
            className="button"
            onClick={() => {
              setQuery("");
              setCategory("All");
              setFeatured(false);
            }}
          >
            Reset filters
          </button>
        </div>
      )}
    </>
  );
}
export default Projects;
