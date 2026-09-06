import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  FolderKanban,
  Briefcase,
  User,
  Mail,
  Gamepad2,
  FileText,
  Volume2,
  VolumeX,
  Sun,
  Moon,
} from 'lucide-react';
import { profile } from '../../data/profile';
import { useSound } from '../../context/SoundContext';
import { useTheme } from '../../context/ThemeContext';
import { LocalTimeWeather } from '../ui/LocalTimeWeather';

interface DockItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  href: string;
  isExternal?: boolean;
  isRoute?: boolean;
}

const navItems: DockItem[] = [
  { id: 'projects', label: 'Work', icon: FolderKanban, href: '/#projects' },
  { id: 'experience', label: 'Experience', icon: Briefcase, href: '/#experience' },
  { id: 'about', label: 'About', icon: User, href: '/#about' },
  { id: 'contact', label: 'Contact', icon: Mail, href: '/#contact' },
  { id: 'collab', label: '2D World', icon: Gamepad2, href: '/collab', isRoute: true },
];

export const DynamicIslandDock: React.FC = () => {
  const [activeSection, setActiveSection] = useState('projects');
  const location = useLocation();
  const navigate = useNavigate();
  const { soundEnabled, toggleSound, playHover, playClick, playNavigate } = useSound();
  const { resolvedTheme, toggleTheme } = useTheme();

  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection(location.pathname.startsWith('/projects') ? 'projects' : '');
      return;
    }

    const sectionIds = ['home', 'projects', 'experience', 'about', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id === 'home' ? 'projects' : id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleNavClick = (event: React.MouseEvent, item: DockItem) => {
    event.preventDefault();
    playNavigate();
    setActiveSection(item.id);

    if (item.isRoute) {
      navigate(item.href);
      return;
    }

    if (location.pathname !== '/') {
      navigate(item.href);
      return;
    }

    window.history.replaceState(null, '', item.href);
    document.getElementById(item.id)?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    playClick();
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 max-w-[95vw] select-none font-mono">
      <nav
        aria-label="Floating Dynamic Island Navigation"
        className="flex items-center gap-1 sm:gap-1.5 rounded-full border-0 bg-[var(--surface)]/90 px-3 py-2 shadow-2xl shadow-black/20 dark:shadow-black/70 backdrop-blur-2xl transition-all"
      >
        {/* Brand Monogram */}
        <button
          type="button"
          onClick={handleHomeClick}
          onMouseEnter={playHover}
          className="group relative flex h-8 w-8 items-center justify-center rounded-full border-0 bg-black dark:bg-white text-white dark:text-black text-xs font-bold transition-transform hover:scale-105 active:scale-95 cursor-pointer shrink-0 shadow-sm"
          aria-label="Scroll to top"
        >
          <span>JS</span>
          <span className="pointer-events-none absolute bottom-full mb-3 left-1/2 -translate-x-1/2 rounded-full border-0 bg-[var(--surface-elevated)] px-2.5 py-1 text-[10px] font-bold text-[var(--text-primary)] shadow-lg opacity-0 transition-all group-hover:opacity-100 whitespace-nowrap">
            Home
          </span>
        </button>

        <div className="h-4 w-[1px] bg-black/10 dark:bg-white/10 mx-0.5" />

        {/* Navigation Icons (No numbers, clean icons with tooltips) */}
        <div className="flex items-center gap-0.5 sm:gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              (item.isRoute && location.pathname === item.href) ||
              (!item.isRoute && activeSection === item.id);

            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                onMouseEnter={playHover}
                className={`group relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-black dark:bg-white text-white dark:text-black shadow-sm'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]'
                }`}
                aria-label={item.label}
              >
                <Icon className="h-4 w-4" strokeWidth={isActive ? 2.5 : 2} />
                <span className="pointer-events-none absolute bottom-full mb-3 left-1/2 -translate-x-1/2 rounded-full border-0 bg-[var(--surface-elevated)] px-2.5 py-1 text-[10px] font-bold text-[var(--text-primary)] shadow-lg opacity-0 transition-all group-hover:opacity-100 whitespace-nowrap">
                  {item.label}
                </span>
              </a>
            );
          })}
        </div>

        <div className="h-4 w-[1px] bg-black/10 dark:bg-white/10 mx-0.5" />

        {/* Live Visual Weather Emblem */}
        <div className="flex items-center">
          <LocalTimeWeather />
        </div>

        {/* Audio Toggle */}
        <button
          type="button"
          onClick={() => {
            playClick();
            toggleSound();
          }}
          onMouseEnter={playHover}
          className="group relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border-0 text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
          aria-label={soundEnabled ? 'Disable audio' : 'Enable audio'}
        >
          {soundEnabled ? (
            <Volume2 className="h-4 w-4 text-[var(--accent)]" />
          ) : (
            <VolumeX className="h-4 w-4" />
          )}
          <span className="pointer-events-none absolute bottom-full mb-3 left-1/2 -translate-x-1/2 rounded-full border-0 bg-[var(--surface-elevated)] px-2.5 py-1 text-[10px] font-bold text-[var(--text-primary)] shadow-lg opacity-0 transition-all group-hover:opacity-100 whitespace-nowrap">
            {soundEnabled ? 'Mute' : 'Unmute'}
          </span>
        </button>

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={() => {
            playClick();
            toggleTheme();
          }}
          onMouseEnter={playHover}
          className="group relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border-0 text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
          aria-label="Toggle theme"
        >
          {resolvedTheme === 'dark' ? (
            <Sun className="h-4 w-4 text-[var(--accent)]" />
          ) : (
            <Moon className="h-4 w-4 text-[var(--accent)]" />
          )}
          <span className="pointer-events-none absolute bottom-full mb-3 left-1/2 -translate-x-1/2 rounded-full border-0 bg-[var(--surface-elevated)] px-2.5 py-1 text-[10px] font-bold text-[var(--text-primary)] shadow-lg opacity-0 transition-all group-hover:opacity-100 whitespace-nowrap">
            {resolvedTheme === 'dark' ? 'Light mode' : 'Dark mode'}
          </span>
        </button>

        {/* Resume PDF Download */}
        <a
          href={profile.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={playClick}
          onMouseEnter={playHover}
          className="group relative flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border-0 text-[var(--text-secondary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
          aria-label="Download resume"
        >
          <FileText className="h-4 w-4" />
          <span className="pointer-events-none absolute bottom-full mb-3 left-1/2 -translate-x-1/2 rounded-full border-0 bg-[var(--surface-elevated)] px-2.5 py-1 text-[10px] font-bold text-[var(--text-primary)] shadow-lg opacity-0 transition-all group-hover:opacity-100 whitespace-nowrap">
            Résumé PDF
          </span>
        </a>
      </nav>
    </div>
  );
};

export default DynamicIslandDock;
