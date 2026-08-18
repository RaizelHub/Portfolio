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
    <footer className="bg-[var(--background)] border-t border-[var(--border-subtle)] py-8 text-[var(--text-secondary)] font-mono text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              className="p-1.5 bg-[var(--surface)] border border-[var(--border-subtle)] hover:border-[var(--border)] hover:text-[var(--text-primary)] rounded-md transition-colors flex items-center gap-1 font-mono uppercase text-[10px]"
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
