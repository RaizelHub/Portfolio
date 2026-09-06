import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FileText,
  Gamepad2,
  Menu,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  X,
  Download,
} from 'lucide-react';
import { profile } from '../../data/profile';
import { useSound } from '../../context/SoundContext';
import { useTheme } from '../../context/ThemeContext';
import { LocalTimeWeather } from '../ui/LocalTimeWeather';

const navLinks = [
  { label: 'Work', href: '/#projects', sectionId: 'projects' },
  { label: 'Experience', href: '/#experience', sectionId: 'experience' },
  { label: 'About', href: '/#about', sectionId: 'about' },
  { label: 'Contact', href: '/#contact', sectionId: 'contact' },
] as const;

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('projects');
  const location = useLocation();
  const navigate = useNavigate();
  const { soundEnabled, toggleSound, playHover, playClick, playNavigate } = useSound();
  const { resolvedTheme, toggleTheme } = useTheme();

  // Track active scroll section
  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection(location.pathname.startsWith('/projects') ? 'projects' : '');
      return;
    }

    const sectionIds = ['home', 'projects', 'experience', 'about', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 140;
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

  const closeMenu = () => setIsOpen(false);

  const navigateToSection = (event: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    event.preventDefault();
    playNavigate();
    closeMenu();
    setActiveSection(sectionId);

    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
      return;
    }

    window.history.replaceState(null, '', `/#${sectionId}`);
    document.getElementById(sectionId)?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b-2 border-black dark:border-white bg-[var(--background)]/90 backdrop-blur-md transition-colors font-mono">
      <div className="mx-auto flex h-16 w-full max-w-[var(--content-width)] items-center justify-between px-[var(--page-gutter)]">
        {/* Brand Monogram & Name */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            onClick={(e) => navigateToSection(e, 'projects')}
            onMouseEnter={playHover}
            className="group flex items-center gap-2.5 focus-visible:outline-offset-4 select-none"
            aria-label="Janmark Suelto, Home"
          >
            <span className="flex h-8 w-8 items-center justify-center border-2 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black font-bold text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
              JS
            </span>
            <span className="font-slabo text-base font-bold tracking-tight text-[var(--text-primary)] group-hover:underline">
              Janmark Suelto
            </span>
          </Link>
        </div>

        {/* Desktop Navigation Links (Clean, No Numbers) */}
        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-1.5 font-slabo">
          {navLinks.map((link) => {
            const isActive =
              activeSection === link.sectionId ||
              (link.sectionId === 'projects' && (activeSection === 'projects' || location.pathname.startsWith('/projects')));

            return (
              <a
                key={link.sectionId}
                href={link.href}
                onClick={(e) => navigateToSection(e, link.sectionId)}
                onMouseEnter={playHover}
                className={`border-2 px-3 py-1.5 text-[14px] font-bold transition-all duration-120 select-none ${
                  isActive
                    ? 'border-black dark:border-white bg-black text-white dark:bg-white dark:text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]'
                    : 'border-transparent text-[var(--text-secondary)] hover:border-black dark:hover:border-white hover:bg-[var(--surface)] hover:text-[var(--text-primary)]'
                }`}
                aria-current={isActive ? 'location' : undefined}
              >
                {link.label}
              </a>
            );
          })}

          {/* 2D World Link */}
          <Link
            to="/collab"
            onClick={() => {
              playNavigate();
              closeMenu();
            }}
            onMouseEnter={playHover}
            className={`flex items-center gap-1.5 border-2 px-3 py-1.5 text-[14px] font-bold transition-all duration-120 select-none ${
              location.pathname === '/collab'
                ? 'border-black dark:border-white bg-black text-white dark:bg-white dark:text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]'
                : 'border-transparent text-[var(--text-secondary)] hover:border-black dark:hover:border-white hover:bg-[var(--surface)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Gamepad2 className="h-4 w-4 shrink-0" strokeWidth={2} />
            <span>2D World</span>
          </Link>
        </nav>

        {/* Right Action Icons & Controls */}
        <div className="flex items-center gap-2">
          {/* Pure Visual Weather Emblem (No text, no numbers, no green dots) */}
          <LocalTimeWeather />

          {/* Sound Toggle */}
          <button
            type="button"
            onClick={() => {
              playClick();
              toggleSound();
            }}
            onMouseEnter={playHover}
            title={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
            aria-label={soundEnabled ? 'Disable audio' : 'Enable audio'}
            className="flex h-9 w-9 items-center justify-center border-2 border-black dark:border-white bg-[var(--surface)] text-[var(--text-primary)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 active:shadow-none transition-all cursor-pointer"
          >
            {soundEnabled ? (
              <Volume2 className="h-4 w-4 text-[var(--accent)]" />
            ) : (
              <VolumeX className="h-4 w-4 text-[var(--text-muted)]" />
            )}
          </button>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={() => {
              playClick();
              toggleTheme();
            }}
            onMouseEnter={playHover}
            title={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
            aria-label={`Toggle theme`}
            className="flex h-9 w-9 items-center justify-center border-2 border-black dark:border-white bg-[var(--surface)] text-[var(--text-primary)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 active:shadow-none transition-all cursor-pointer"
          >
            {resolvedTheme === 'dark' ? (
              <Sun className="h-4 w-4 text-[var(--accent)]" />
            ) : (
              <Moon className="h-4 w-4 text-[var(--accent)]" />
            )}
          </button>

          {/* Resume Download (Desktop) */}
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playHover}
            onClick={playClick}
            className="hidden sm:flex items-center gap-1.5 border-2 border-black dark:border-white bg-[var(--surface)] px-3 py-1.5 font-mono text-xs font-bold text-[var(--text-primary)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] active:translate-x-0 active:translate-y-0 active:shadow-none transition-all cursor-pointer"
            title="Download Resume PDF"
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Résumé</span>
            <Download className="h-3 w-3 text-[var(--accent)]" />
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => {
              playClick();
              setIsOpen(!isOpen);
            }}
            className="flex h-9 w-9 items-center justify-center border-2 border-black dark:border-white bg-[var(--surface)] text-[var(--text-primary)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] lg:hidden active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Down Menu */}
      {isOpen && (
        <div className="border-b-2 border-black dark:border-white bg-[var(--background)] px-4 py-4 lg:hidden shadow-xl animate-in slide-in-from-top duration-150 font-slabo">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.sectionId}
                href={link.href}
                onClick={(e) => navigateToSection(e, link.sectionId)}
                className="border-2 border-black dark:border-white bg-[var(--surface)] px-4 py-2.5 text-sm font-bold text-[var(--text-primary)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
              >
                {link.label}
              </a>
            ))}

            <Link
              to="/collab"
              onClick={() => {
                playNavigate();
                closeMenu();
              }}
              className="flex items-center gap-2 border-2 border-black dark:border-white bg-[var(--surface)] px-4 py-2.5 text-sm font-bold text-[var(--text-primary)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
            >
              <Gamepad2 className="h-4 w-4" />
              <span>2D World</span>
            </Link>

            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              className="flex items-center justify-between border-2 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black px-4 py-2.5 text-sm font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
            >
              <span>Download Résumé</span>
              <Download className="h-4 w-4" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
