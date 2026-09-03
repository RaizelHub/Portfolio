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
    <footer className="border-t-2 border-black dark:border-white bg-[var(--background)] py-10 font-mono text-xs text-[var(--text-secondary)] transition-colors">
      <div className="mx-auto w-full max-w-[var(--content-width)] px-[var(--page-gutter)]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">
          {/* Brand Info */}
          <div className="text-center md:text-left">
            <span className="font-nav font-black text-xs tracking-wider text-[var(--text-primary)] block">
              Janmark Suelto
            </span>
            <span className="text-[11px] text-[var(--text-muted)] mt-0.5 block font-mono">
              Software Developer &bull; Bukidnon, Philippines
            </span>
          </div>

          {/* Direct Social & Contact Links */}
          <div className="flex items-center gap-4 text-xs font-mono font-bold text-[var(--text-primary)]">
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              onClick={playClick}
              className="hover:underline transition-colors"
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
              className="hover:underline transition-colors"
            >
              LinkedIn
            </a>
            <span>&bull;</span>
            <a
              href={`mailto:${profile.email}`}
              onMouseEnter={playHover}
              onClick={playClick}
              className="hover:underline transition-colors"
            >
              Email
            </a>
          </div>

          {/* Back to top & copyright */}
          <div className="flex items-center gap-4 text-[var(--text-muted)] select-none text-[11px] font-mono">
            <span>&copy; {new Date().getFullYear()}</span>
            <button
              onClick={handleBackToTop}
              className="flex min-h-9 items-center gap-1.5 border-2 border-black dark:border-white bg-[var(--surface)] px-2.5 py-1 font-mono text-[10px] font-bold uppercase text-[var(--text-primary)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
              title="Back to Top"
            >
              <span>Top</span>
              <ArrowUp className="w-3 h-3 text-[var(--accent)]" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
