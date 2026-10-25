import { Link } from "react-router-dom";
import { services } from "../data/services";
export function ServicesPage() {
  return (
    <>
      <header className="page-heading">
        <p className="eyebrow">Portfolio / Services</p>
        <h1>What I can help build.</h1>
        <p>Areas I work on through my software projects.</p>
      </header>
      <div className="skills-grid">
        {services.map((s, i) => (
          <article className="panel service-panel" key={s.id}>
            <span className="metadata">0{i + 1}</span>
            <h2>{s.title}</h2>
            <p>{s.description}</p>
          </article>
        ))}
      </div>
      <section className="contact-strip">
        <h2>Let’s discuss your project or role.</h2>
        <Link className="button primary" to="/contact">
          Contact me ↗
        </Link>
      </section>
    </>
  );
}
