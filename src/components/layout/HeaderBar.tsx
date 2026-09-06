import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail } from 'lucide-react';
import { profile } from '../../data/profile';
import { useSound } from '../../context/SoundContext';

export const HeaderBar: React.FC = () => {
  const { playHover, playClick } = useSound();

  const openContact = () => {
    playClick();
    window.dispatchEvent(new CustomEvent('open-contact-modal'));
  };

  return (
    <header className="sticky top-0 z-30 w-full border-0 bg-[var(--background)]/80 backdrop-blur-xl transition-colors font-mono select-none">
      <div className="mx-auto flex h-14 w-full max-w-[var(--content-width)] items-center justify-between px-[var(--page-gutter)]">
        {/* Brand identity */}
        <Link
          to="/"
          onMouseEnter={playHover}
          className="flex items-center gap-2 text-sm font-bold tracking-tight text-[var(--text-primary)] hover:underline"
        >
          <span className="font-slabo text-base">Janmark Suelto</span>
        </Link>

        {/* Location & Quick Contact */}
        <div className="flex items-center gap-2 sm:gap-3 text-xs">
          <div className="flex items-center gap-1.5 rounded-full border-0 bg-[var(--surface)] px-3 py-1 text-[11px] font-bold text-[var(--text-primary)] shadow-sm">
            <MapPin className="h-3 w-3 text-[var(--accent)] shrink-0" />
            <span className="truncate max-w-[160px] sm:max-w-none">{profile.location}</span>
          </div>

          <button
            type="button"
            onClick={openContact}
            onMouseEnter={playHover}
            className="flex items-center gap-1.5 rounded-full border-0 bg-black dark:bg-white text-white dark:text-black px-4 py-1 text-[11px] font-bold shadow-sm hover:opacity-90 active:scale-95 transition-all cursor-pointer"
          >
            <Mail className="h-3 w-3" />
            <span>Contact</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;
