import { Link } from "react-router-dom";
import { profile } from "../data/profile";
import { educationList } from "../data/education";
export function AboutPage() {
  return (
    <>
      <header className="page-heading">
        <p className="eyebrow">Portfolio / About</p>
        <h1>A developer who likes figuring things out.</h1>
      </header>
      <section className="about-layout">
        <img
          className="about-portrait"
          src={profile.profileImage}
          alt="Janmark Suelto"
          width="400"
          height="480"
        />
        <div className="prose">
          <h2>I’m Janmark Suelto.</h2>
          <p>
            I’m a full-stack developer based in Bukidnon, Philippines, and a
            2026 Information Technology graduate from Bukidnon State University.
          </p>
          <p>
            I build web applications, mobile tools, and workflow automations. I
            enjoy the connections between an interface, the API behind it, and
            the data that makes it useful.
          </p>
          <p>
            My project work is where I practice that process: breaking a problem
            into smaller parts, working out the data model, building the user
            flow, and testing what happens when something goes wrong. My
            internship in IT operations also gave me practical experience with
            troubleshooting and technical documentation.
          </p>
          <p>
            I’m looking for an entry-level software engineering or IT role where
            I can contribute, learn from a team, and keep improving.
          </p>
          <div className="actions">
            <Link className="button primary" to="/projects">
              Explore my work ↗
            </Link>
            <a className="button" href={profile.resumeUrl} download>
              Download resume
            </a>
          </div>
        </div>
      </section>
      <section className="section">
        <p className="eyebrow">Education</p>
        {educationList.map((e) => (
          <article className="career-row" key={e.id}>
            <div>
              <span className="metadata">{e.period}</span>
              <h2>{e.institution}</h2>
              <p>{e.location}</p>
            </div>
            <div>
              <h3>{e.degree}</h3>
              <p>{e.status}</p>
              <ul>
                {e.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>
      <div className="contact-strip">
        <h2>Learning beyond the classroom.</h2>
        <Link className="text-link" to="/certifications">
          View credentials ↗
        </Link>
      </div>
    </>
  );
}
