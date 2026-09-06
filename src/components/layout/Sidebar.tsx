import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  BriefcaseBusiness,
  Download,
  FileText,
  FolderKanban,
  Gamepad2,
  Github,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Sun,
  User,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { profile } from '../../data/profile';
import { useSound } from '../../context/SoundContext';
import { useTheme } from '../../context/ThemeContext';
import { PortfolioVisitorCount } from './PortfolioVisitorCount';
import { LocalTimeWeather } from '../ui/LocalTimeWeather';

/* 4 primary navigation items */
const navLinks = [
  { label: 'Work', href: '/#projects', sectionId: 'projects', icon: FolderKanban, index: '01' },
  { label: 'Experience', href: '/#experience', sectionId: 'experience', icon: BriefcaseBusiness, index: '02' },
  { label: 'About', href: '/#about', sectionId: 'about', icon: User, index: '03' },
  { label: 'Contact', href: '/#contact', sectionId: 'contact', icon: Mail, index: '04' },
] as const;

const observedSectionIds = ['home', 'projects', 'technologies', 'experience', 'about', 'certifications', 'github-activity', 'contact'];

export const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('projects');
  const drawerRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const visibleSectionsRef = useRef(new Map<string, DOMRectReadOnly>());
  const location = useLocation();
  const navigate = useNavigate();
  const { soundEnabled, toggleSound, playHover, playClick, playNavigate } = useSound();
  const { resolvedTheme, toggleTheme } = useTheme();

  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection(location.pathname.startsWith('/projects') ? 'projects' : '');
      return;
    }

    const sections = observedSectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const visibleSections = visibleSectionsRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visibleSections.set(entry.target.id, entry.boundingClientRect);
          else visibleSections.delete(entry.target.id);
        });

        const visible = [...visibleSections.entries()].sort(
          ([, a], [, b]) => Math.abs(a.top - 112) - Math.abs(b.top - 112),
        );

        if (visible[0]) {
          const id = visible[0][0];
          if (id === 'home' || id === 'projects' || id === 'technologies') {
            setActiveSection('projects');
          } else if (id === 'experience') {
            setActiveSection('experience');
          } else if (id === 'about' || id === 'certifications' || id === 'github-activity') {
            setActiveSection('about');
          } else if (id === 'contact') {
            setActiveSection('contact');
          }
        }
      },
      { rootMargin: '-80px 0px -55% 0px', threshold: [0, 0.1, 0.25] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
      visibleSections.clear();
    };
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname !== '/' || !location.hash) return;

    const frame = window.requestAnimationFrame(() => {
      document.getElementById(location.hash.slice(1))?.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.pathname, location.hash]);

  const closeDrawer = () => setIsOpen(false);

  const navigateToSection = (event: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    event.preventDefault();
    playNavigate();
    closeDrawer();
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

  const panel = (
    <div className="flex h-full flex-col bg-[var(--background)] text-[var(--text-primary)] border-r-2 border-black dark:border-white font-slabo">
      {/* Brand Header */}
      <div className="flex items-center justify-between border-b-2 border-black dark:border-white px-6 py-5">
        <Link
          to="/"
          onClick={(e) => navigateToSection(e, 'projects')}
          onMouseEnter={playHover}
          className="group flex min-w-0 flex-1 items-center gap-3 focus-visible:outline-offset-4"
          aria-label="Janmark Suelto, home"
        >
          <span className="block truncate font-slabo text-base font-bold tracking-normal text-[var(--text-primary)] transition-colors group-hover:underline">
            Janmark Suelto
          </span>
        </Link>

        <button
          type="button"
          onClick={closeDrawer}
          className="border-2 border-black dark:border-white p-1.5 text-[var(--text-primary)] bg-[var(--surface)] hover:bg-[var(--accent)] hover:text-[var(--on-accent)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none lg:hidden cursor-pointer"
          aria-label="Close navigation"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* 4 Primary Navigation Links with Slabo 13px Typography */}
      <div className="flex-1 overflow-y-auto px-4 py-5">
        <nav aria-label="Portfolio sections" className="space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive =
              activeSection === link.sectionId ||
              (link.sectionId === 'projects' && (activeSection === 'projects' || location.pathname.startsWith('/projects')));

            return (
              <a
                key={link.sectionId}
                href={link.href}
                onClick={(event) => navigateToSection(event, link.sectionId)}
                onMouseEnter={playHover}
                className={`group flex h-10 w-full items-center gap-2.5 border-2 px-3 text-[14px] font-slabo transition-all duration-120 ${isActive
                  ? 'border-black dark:border-white bg-black text-white dark:bg-white dark:text-black font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]'
                  : 'border-transparent text-[var(--text-secondary)] hover:border-black dark:hover:border-white hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]'
                  }`}
                aria-current={isActive ? 'location' : undefined}
              >
                <Icon
                  className="h-4 w-4 shrink-0 transition-colors"
                  strokeWidth={2}
                />
                <span className="transition-colors">{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Secondary Links */}
        <div className="pt-4 mt-4 border-t-2 border-black dark:border-white space-y-2">
          {/* 2D World Link */}
          <Link
            to="/collab"
            onClick={() => {
              playNavigate();
              closeDrawer();
            }}
            onMouseEnter={playHover}
            className={`group flex h-10 w-full items-center gap-2.5 border-2 px-3 text-[14px] font-slabo transition-all duration-120 ${location.pathname === '/collab'
              ? 'border-black dark:border-white bg-black text-white dark:bg-white dark:text-black font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]'
              : 'border-transparent text-[var(--text-secondary)] hover:border-black dark:hover:border-white hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]'
              }`}
          >
            <Gamepad2 className="h-4 w-4 shrink-0" strokeWidth={2} />
            <span>2D World</span>
          </Link>

          {/* 1-Click Resume Link */}
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playHover}
            onClick={playClick}
            className="group flex h-10 w-full items-center justify-between border-2 border-black dark:border-white bg-[var(--surface)] px-3 text-[14px] font-slabo font-bold text-[var(--text-primary)] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] transition-all duration-120 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
          >
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4" strokeWidth={2} />
              <span>Resume</span>
            </div>
            <span className="flex items-center gap-1 font-mono text-[10px] uppercase font-bold text-[var(--text-primary)]">
              PDF <Download className="h-3 w-3" />
            </span>
          </a>
        </div>
      </div>

      {/* Footer / Socials, Visitor Counter & Controls */}
      <div className="border-t-2 border-black dark:border-white p-4 space-y-3 bg-[var(--background-secondary)]">
        {/* Live Local Time & Weather */}
        <div className="px-1">
          <LocalTimeWeather variant="sidebar" />
        </div>

        {/* Live Visitor Counter */}
        <div className="px-1">
          <PortfolioVisitorCount />
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-between px-1 text-xs font-mono font-bold text-[var(--text-primary)]">
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playHover}
            onClick={playClick}
            className="flex items-center gap-1.5 hover:underline py-1"
          >
            <Github className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playHover}
            onClick={playClick}
            className="flex items-center gap-1.5 hover:underline py-1"
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>
        </div>

        {/* Theme & Sound Controls (Icon Only) */}
        <div className="flex items-center justify-between border-t-2 border-black dark:border-white pt-3 px-1">
          <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-[var(--text-muted)]">
            Preferences
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                playClick();
                toggleSound();
              }}
              onMouseEnter={playHover}
              title={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
              aria-label={soundEnabled ? 'Disable audio' : 'Enable audio'}
              className="flex h-8 w-8 items-center justify-center border-2 border-black dark:border-white bg-[var(--surface)] text-[var(--text-primary)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:bg-[var(--surface-hover)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
            >
              {soundEnabled ? (
                <Volume2 className="h-3.5 w-3.5 text-[var(--accent)]" />
              ) : (
                <VolumeX className="h-3.5 w-3.5" />
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                playClick();
                toggleTheme();
              }}
              onMouseEnter={playHover}
              title={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
              aria-label={`Toggle theme (current: ${resolvedTheme})`}
              className="flex h-8 w-8 items-center justify-center border-2 border-black dark:border-white bg-[var(--surface)] text-[var(--text-primary)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:bg-[var(--surface-hover)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
            >
              {resolvedTheme === 'dark' ? (
                <Sun className="theme-toggle-icon h-3.5 w-3.5 text-[var(--accent)]" />
              ) : (
                <Moon className="theme-toggle-icon h-3.5 w-3.5 text-[var(--accent)]" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Header */}
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b-2 border-black dark:border-white bg-[var(--background)] px-4 backdrop-blur-md lg:hidden font-slabo">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={(e) => navigateToSection(e, 'projects')}
        >
          <span className="font-slabo text-sm font-bold tracking-normal text-[var(--text-primary)]">
            Janmark Suelto
          </span>
        </Link>

        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => {
            playClick();
            setIsOpen(true);
          }}
          className="border-2 border-black dark:border-white bg-[var(--surface)] p-2 text-[var(--text-primary)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer"
          aria-label="Open navigation menu"
        >
          <Menu className="h-4 w-4" />
        </button>
      </header>

      {/* Desktop Persistent Left Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 lg:block">
        {panel}
      </aside>

      {/* Mobile Slide-Out Drawer from Left */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={closeDrawer}
          />
          <div
            ref={drawerRef}
            className="fixed inset-y-0 left-0 w-72 max-w-[85vw] shadow-2xl z-10"
          >
            {panel}
          </div>
        </div>
      )}
    </>
  );
};
