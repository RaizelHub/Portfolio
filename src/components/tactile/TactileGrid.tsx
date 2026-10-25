import { Link } from "react-router-dom";
import { projects } from "../../data/projects";
import { ProjectCard } from "../projects/PortfolioProjectCard";
import { featuredSlugs } from "../../data/featuredProjects";
export function TactileGrid() {
  return (
    <>
      <section id="projects" className="section">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2>From idea to working application.</h2>
          </div>
          <Link className="text-link" to="/projects">
            All projects ↗
          </Link>
        </div>
        <div className="featured-grid">
          {featuredSlugs
            .map((slug) => projects.find((p) => p.slug === slug))
            .filter((p) => p !== undefined)
            .map((project) => (
              <ProjectCard key={project.id} project={project} featured />
            ))}
        </div>
      </section>
      <section className="home-background section">
        <div>
          <p className="eyebrow">A little background</p>
          <h2>
            Curious about how things work.
            <br />
            Careful about how they’re built.
          </h2>
          <p>
            I’m an Information Technology graduate from Bukidnon State
            University. My projects give me hands-on practice connecting
            interfaces, APIs, and databases, while my IT internship taught me to
            troubleshoot and document real problems.
          </p>
          <Link className="text-link" to="/about">
            More about me ↗
          </Link>
        </div>
        <div className="home-career">
          <span className="eyebrow">Experience</span>
          <h3>Technical Support & IT Operations Intern</h3>
          <p>Concentrix · February–May 2026</p>
          <Link className="text-link" to="/experience">
            View experience ↗
          </Link>
          <hr />
          <span className="eyebrow">Core tools</span>
          <p>React · TypeScript · Laravel · PostgreSQL</p>
          <Link className="text-link" to="/tools">
            Explore skills ↗
          </Link>
        </div>
      </section>
      <section className="contact-strip">
        <div>
          <p className="eyebrow">Let’s connect</p>
          <h2>Have a role in mind?</h2>
          <p>I’m open to software development and IT opportunities.</p>
        </div>
        <Link className="button primary" to="/contact">
          Get in touch ↗
        </Link>
      </section>
    </>
  );
}
