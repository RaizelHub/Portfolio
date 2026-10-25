import { Link } from "react-router-dom";
import { profile } from "../data/profile";
import { projects } from "../data/projects";
import { TechnologyIcon } from "../components/ui/TechnologyIcon";
const skillGroups = [
  {
    title: "Frontend",
    names: ["React", "TypeScript", "JavaScript", "Tailwind CSS", "Vite"],
  },
  {
    title: "Backend",
    names: ["Laravel", "PHP", "Node.js", "Express", "Python", "Django"],
  },
  {
    title: "Databases",
    names: ["PostgreSQL", "MySQL", "MongoDB", "SQLite", "SQL Server"],
  },
  { title: "Mobile", names: ["React Native", "Expo", "Flutter"] },
  {
    title: "Automation & infrastructure",
    names: ["n8n", "Supabase", "Cloudflare Workers", "Docker", "Groq AI"],
  },
];
export function TechnologiesPage() {
  return (
    <>
      <header className="page-heading">
        <p className="eyebrow">Portfolio / Skills</p>
        <h1>Tools I put to work.</h1>
        <p>
          Technologies used across my projects, with links to the
          implementations. No ratings—just practical context.
        </p>
      </header>
      <div className="skills-grid">
        {skillGroups.map((group) => (
          <section className="skill-group panel" key={group.title}>
            <h2>{group.title}</h2>
            <ul>
              {group.names.map((name) => {
                const project = projects.find((p) =>
                  p.technologies.some((t) =>
                    t.toLowerCase().includes(name.toLowerCase()),
                  ),
                );
                return project ? (
                  <li key={name}>
                    <span className="skill-name"><TechnologyIcon name={name} />{name}</span>
                    <Link
                      to={`/projects/${project.slug}`}
                      aria-label={`See ${name} in ${project.title}`}
                    >
                      View project ↗
                    </Link>
                  </li>
                ) : null;
              })}
            </ul>
          </section>
        ))}
        <section className="skill-group panel">
          <h2>Development workflow</h2>
          <div className="workflow-icons">
            <span className="skill-name"><TechnologyIcon name="Git" />Git</span>
            <span className="skill-name"><TechnologyIcon name="GitHub" />GitHub</span>
          </div>
          <p>
            Git and GitHub for version control and code review. Project-specific
            testing tools and deployment choices are documented in the case
            studies.
          </p>
          <a
            className="text-link"
            href={profile.githubUrl}
            target="_blank"
            rel="noreferrer"
          >
            Explore GitHub ↗
          </a>
        </section>
      </div>
    </>
  );
}
