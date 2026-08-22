import React from 'react';
import { ArrowUp } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { profile } from '../../data/profile';
import { useSound } from '../../context/SoundContext';

export const Footer: React.FC = () => {
  const location = useLocation();
  const { playHover, playClick } = useSound();

  const handleBackToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    playClick();
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0 });
    }
  };

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--background)] py-10 font-mono text-xs text-[var(--text-secondary)] transition-colors">
      <div className="mx-auto w-full max-w-[var(--content-width)] px-[var(--page-gutter)]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">
          {/* Brand Info */}
          <div className="text-center md:text-left">
            <span className="font-sans font-bold text-sm text-[var(--text-primary)] block">
              Janmark Suelto
            </span>
            <span className="text-[11px] text-[var(--text-muted)] mt-0.5 block font-mono">
              Software Developer &bull; Bukidnon, Philippines
            </span>
          </div>

          {/* Direct Social & Contact Links */}
          <div className="flex items-center gap-4 text-xs font-mono text-[var(--text-secondary)]">
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              onClick={playClick}
              className="hover:text-[var(--text-primary)] transition-colors"
            >
              GitHub
            </a>
            <span>&bull;</span>
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              onClick={playClick}
              className="hover:text-[var(--text-primary)] transition-colors"
            >
              LinkedIn
            </a>
            <span>&bull;</span>
            <a
              href={`mailto:${profile.email}`}
              onMouseEnter={playHover}
              onClick={playClick}
              className="hover:text-[var(--text-primary)] transition-colors"
            >
              Email
            </a>
          </div>

          {/* Back to top & copyright */}
          <div className="flex items-center gap-4 text-[var(--text-muted)] select-none text-[11px]">
            <span>&copy; {new Date().getFullYear()}</span>
            <button
              onClick={handleBackToTop}
              className="flex min-h-9 items-center gap-1 border border-[var(--border-subtle)] bg-[var(--surface)] p-1.5 font-mono text-[10px] uppercase transition-colors hover:border-[var(--accent)] hover:text-[var(--text-primary)]"
              title="Back to Top"
            >
              <span>Top</span>
              <ArrowUp className="w-3 h-3 text-[var(--accent)]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
