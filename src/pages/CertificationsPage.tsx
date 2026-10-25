import { useState } from "react";
import { certifications } from "../data/certifications";
import { educationList } from "../data/education";
import { Dialog } from "../components/ui/Dialog";
export function CertificationsPage() {
  const [preview, setPreview] = useState<
    (typeof certifications)[number] | null
  >(null);
  return (
    <>
      <header className="page-heading">
        <p className="eyebrow">Portfolio / Credentials</p>
        <h1>Education & continued learning.</h1>
        <p>
          Course credentials and technical training that support my development
          and IT work.
        </p>
      </header>
      <section id="certifications">
        {certifications.map((c) => (
          <article className="credential-row" key={c.id}>
            <span className="metadata">{c.year}</span>
            <div>
              <h2>{c.name}</h2>
              <p>{c.issuer}</p>
              {!c.verifyUrl && !c.image && (
                <small>Academic coursework · no public verification link</small>
              )}
            </div>
            <div className="actions">
              {c.image && (
                <button className="button" onClick={() => setPreview(c)}>
                  View document
                </button>
              )}
              {c.verifyUrl && (
                <a
                  className="text-link"
                  href={c.verifyUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Verify credential ↗
                </a>
              )}
            </div>
          </article>
        ))}
      </section>
      <section className="section prose">
        <h2>Formal education</h2>
        {educationList.map((e) => (
          <div key={e.id}>
            <h3>{e.degree}</h3>
            <p>
              {e.institution} · {e.period} · {e.status}
            </p>
          </div>
        ))}
      </section>
      {preview && (
        <Dialog
          label={`${preview.name} certificate`}
          onClose={() => setPreview(null)}
        >
          <img
            className="lightbox-image"
            src={`/${preview.image}`}
            alt={`${preview.name}, issued by ${preview.issuer}`}
          />
        </Dialog>
      )}
    </>
  );
}
