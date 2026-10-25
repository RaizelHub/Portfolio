import { useState } from "react";
import { profile } from "../data/profile";
export function ContactPage() {
  const [copyState, setCopyState] = useState("");
  const [copying, setCopying] = useState(false);
  const copy = async () => {
    setCopying(true);
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopyState("Email copied.");
    } catch {
      setCopyState(
        "Copy unavailable. You can select the email address or use the email link.",
      );
    } finally {
      setCopying(false);
    }
  };
  return (
    <>
      <header className="page-heading">
        <p className="eyebrow">Portfolio / Contact</p>
        <h1>Let’s start a conversation.</h1>
        <p>
          I’m open to entry-level software development and IT opportunities,
          including remote roles.
        </p>
      </header>
      <section className="contact-layout">
        <div className="panel contact-primary">
          <p className="eyebrow">Email</p>
          <h2>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </h2>
          <p>
            Tell me about the role, your team, or the problem you’re working on.
          </p>
          <div className="actions">
            <a className="button primary" href={`mailto:${profile.email}`}>
              Email me ↗
            </a>
            <button className="button" onClick={copy} disabled={copying}>
              {copying ? "Copying…" : "Copy email"}
            </button>
          </div>
          <p className="copy-status" role="status">
            {copyState}
          </p>
        </div>
        <div className="contact-details">
          <a
            className="credential-row"
            href={profile.githubUrl}
            target="_blank"
            rel="noreferrer"
          >
            <span>GitHub</span>
            <span>@RaizelHub ↗</span>
          </a>
          <a
            className="credential-row"
            href={profile.linkedinUrl}
            target="_blank"
            rel="noreferrer"
          >
            <span>LinkedIn</span>
            <span>Janmark Suelto ↗</span>
          </a>
          <div className="credential-row">
            <span>Based in</span>
            <span>Bukidnon, Philippines</span>
          </div>
          <a className="button" href={profile.resumeUrl} download>
            Download full-stack developer resume ↓
          </a>
          <a
            className="text-link"
            href={`tel:${profile.phone.replace(/ /g, "")}`}
          >
            {profile.phone}
          </a>
          <div className="actions">
            <a
              className="text-link"
              href={profile.facebookUrl}
              target="_blank"
              rel="noreferrer"
            >
              Facebook ↗
            </a>
            <a
              className="text-link"
              href={profile.whatsappUrl}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp ↗
            </a>
            <a
              className="text-link"
              href={profile.messengerUrl}
              target="_blank"
              rel="noreferrer"
            >
              Messenger ↗
            </a>
          </div>
          <a
            className="text-link"
            href="/Suelto-Janmark-Software%20Developer.Resume.pdf"
            download
          >
            Software developer resume ↓
          </a>
        </div>
      </section>
    </>
  );
}
