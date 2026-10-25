import { Link } from "react-router-dom";
import { experiences } from "../data/experience";
export function ExperiencePage() {
  return (
    <>
      <header className="page-heading">
        <p className="eyebrow">Portfolio / Experience</p>
        <h1>Practical experience. Useful lessons.</h1>
        <p>
          Hands-on IT support experience, alongside independent and academic
          software projects.
        </p>
      </header>
      {experiences.map((e) => (
        <article className="career-row panel" key={e.id}>
          <div>
            <p className="eyebrow">Internship</p>
            <h2>{e.company}</h2>
            <p>{e.period}</p>
            <p>{e.location}</p>
          </div>
          <div>
            <h3>{e.role}</h3>
            <p>{e.description}</p>
            <ul>
              {e.responsibilities.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
            <ul className="tags">
              <li>Troubleshooting</li>
              <li>IT asset management</li>
              <li>Documentation</li>
            </ul>
          </div>
        </article>
      ))}
      <section className="section prose">
        <h2>Project experience</h2>
        <p>
          My portfolio includes independent applications and academic work,
          including the Smartpipe IoT capstone. These are presented separately
          from employment, with their current status and limitations.
        </p>
        <Link className="text-link" to="/projects">
          Explore project case studies ↗
        </Link>
      </section>
    </>
  );
}
