import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Download } from "lucide-react";
import { profile } from "../../data/profile";
export function TactileHero() {
  const [mode, setMode] = useState<"whiteboard" | "pages">("whiteboard");
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow">Full-stack developer</p>
        <h1 id="hero-title">Just building secure software that works.</h1>
        <p className="hero-description">
          I build full-stack platforms, autonomous AI workflows, and scalable web
          applications. Focused on clean database schemas, transactional
          integrity, and refined interfaces.
        </p>
        <div className="actions">
          <Link to="/projects" className="button primary">
            Explore projects
            <ArrowRight size={17} />
          </Link>
          <a href={profile.resumeUrl} download className="button">
            <Download size={16} />
            Download resume
          </a>
          <Link to="/contact" className="text-link">
            Contact me ↗
          </Link>
        </div>
        <p className="hero-note">
          Based in Bukidnon, Philippines. Open to entry-level software and IT
          roles.
        </p>
      </div>
      <figure className="hero-project">
        <div className="preview-heading">
          <span>Inside CollabCanvas</span>
          <div className="segmented" aria-label="Preview mode">
            {(["whiteboard", "pages"] as const).map((value) => (
              <button
                key={value}
                aria-pressed={value === mode}
                onClick={() => setMode(value)}
              >
                {value === "whiteboard" ? "Whiteboard" : "Pages"}
              </button>
            ))}
          </div>
        </div>
        <Link
          to="/projects/collabcanvas"
          aria-label={`Explore CollabCanvas ${mode} case study`}
        >
          <img
            src={`/img/collabcanvas/${mode}.webp`}
            alt={`CollabCanvas ${mode === "pages" ? "Pages document editor" : "collaborative whiteboard"}`}
            width="1280"
            height="720"
            fetchPriority="high"
          />
        </Link>
        <figcaption>
          <span>Ideas, diagrams, and documents in one workspace.</span>
          <Link
            to="/projects/collabcanvas"
            aria-label="CollabCanvas case study"
          >
            <ArrowRight size={18} />
          </Link>
        </figcaption>
      </figure>
    </section>
  );
}
