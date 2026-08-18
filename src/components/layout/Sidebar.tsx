import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  BriefcaseBusiness,
  FolderKanban,
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

/* ── Exactly 4 primary navigation items per the master design spec ── */
const navLinks = [
  { label: 'Work', href: '/#projects', sectionId: 'projects', icon: FolderKanban },
  { label: 'Experience', href: '/#experience', sectionId: 'experience', icon: BriefcaseBusiness },
  { label: 'About', href: '/#about', sectionId: 'about', icon: User },
  { label: 'Contact', href: '/#contact', sectionId: 'contact', icon: Mail },
] as const;

const observedSectionIds = ['home', 'projects', 'technologies', 'experience', 'about', 'certifications', 'github-activity', 'contact'];

export const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
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

        if (visible[0]) setActiveSection(visible[0][0]);
      },
      { rootMargin: '-96px 0px -58% 0px', threshold: [0, 0.1, 0.25] },
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

  const navRow = 'group flex h-9 w-full items-center gap-2.5 rounded-md px-3 text-[13px] transition-colors duration-150';
  const inactiveRow = 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-hover)]';
  const activeRow = 'text-[var(--text-primary)] font-semibold bg-[var(--surface-hover)]';

  const panel = (
    <div className="flex h-full flex-col bg-[var(--background)] text-[var(--text-primary)] border-r border-[var(--border-subtle)]">
      {/* Brand Header */}
      <div className="flex items-center gap-3 border-b border-[var(--border-subtle)] px-5 py-4">
        <Link
          to="/"
          onClick={closeDrawer}
          onMouseEnter={playHover}
          className="flex min-w-0 flex-1 items-center gap-3 rounded-md focus-visible:outline-offset-4"
          aria-label="Janmark Suelto, home"
        >
          <img
            src={profile.profileImage}
            alt="Janmark Suelto"
            className="h-8 w-8 shrink-0 rounded-md object-cover object-top border border-[var(--border-subtle)]"
          />
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-[13px] font-semibold text-[var(--text-primary)]">
              Janmark Suelto
            </span>
            <span className="mt-0.5 block truncate text-[11px] text-[var(--text-secondary)]">
              Software Developer
            </span>
          </span>
        </Link>
        <button
          type="button"
          onClick={closeDrawer}
          className="rounded-md p-1.5 text-[var(--text-secondary)] hover:bg-black/5 hover:text-[var(--text-primary)] dark:hover:bg-white/5 xl:hidden"
          aria-label="Close navigation"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* 4 Primary Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-5">
        <p className="mb-2 px-3 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
          Navigation
        </p>
        <nav aria-label="Portfolio sections" className="space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive =
              activeSection === link.sectionId ||
              (link.sectionId === 'projects' && (activeSection === 'projects' || activeSection === 'home' || location.pathname.startsWith('/projects')));

            return (
              <a
                key={link.sectionId}
                href={link.href}
                onClick={(event) => navigateToSection(event, link.sectionId)}
                onMouseEnter={playHover}
                className={`${navRow} ${isActive ? activeRow : inactiveRow}`}
                aria-current={isActive ? 'location' : undefined}
              >
                {/* Subtle copper indicator on active state */}
                <span
                  className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors ${isActive ? 'bg-[var(--accent)]' : 'bg-transparent'
                    }`}
                  aria-hidden="true"
                />
                <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-[var(--accent)]' : 'opacity-70 group-hover:opacity-100'}`} strokeWidth={1.8} />
                <span>{link.label}</span>
              </a>
            );
          })}
        </nav>
      </div>

      {/* Footer / Socials & Theme Toggle */}
      <div className="border-t border-[var(--border-subtle)] p-3.5 space-y-3">
        {/* Social Links */}
        <div className="flex items-center justify-between px-1.5 text-xs font-mono text-[var(--text-secondary)]">
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playHover}
            onClick={playClick}
            className="flex items-center gap-1.5 hover:text-[var(--text-primary)] transition-colors py-1"
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
            className="flex items-center gap-1.5 hover:text-[var(--text-primary)] transition-colors py-1"
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>
        </div>

        {/* Theme & Sound Controls */}
        <div className="flex items-center justify-between border-t border-[var(--border-subtle)] pt-3 px-1">
          <button
            type="button"
            onClick={() => {
              playClick();
              toggleSound();
            }}
            onMouseEnter={playHover}
            className="flex items-center gap-1.5 text-[11px] font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            aria-label={soundEnabled ? 'Disable audio' : 'Enable audio'}
          >
            {soundEnabled ? <Volume2 className="h-3.5 w-3.5 text-[var(--accent)]" /> : <VolumeX className="h-3.5 w-3.5" />}
            <span>{soundEnabled ? 'Audio on' : 'Audio off'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playClick();
              toggleTheme();
            }}
            onMouseEnter={playHover}
            className="flex items-center gap-1.5 text-[11px] font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            aria-label="Toggle theme"
          >
            {resolvedTheme === 'dark' ? <Sun className="h-3.5 w-3.5 text-[var(--accent)]" /> : <Moon className="h-3.5 w-3.5 text-[var(--accent)]" />}
            <span className="capitalize">{resolvedTheme}</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top App Header */}
      <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--background)]/90 px-4 backdrop-blur-md xl:hidden">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setActiveSection('home')}>
          <img
            src={profile.profileImage}
            alt="Janmark Suelto"
            className="h-7 w-7 rounded-md object-cover object-top border border-[var(--border-subtle)]"
          />
          <span className="text-xs font-semibold text-[var(--text-primary)]">
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
          className="rounded-md border border-[var(--border-subtle)] p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          aria-label="Open menu"
        >
          <Menu className="h-4 w-4" />
        </button>
      </header>

      {/* Desktop Persistent Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 xl:block">
        {panel}
      </aside>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 xl:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs" onClick={closeDrawer} />
          <div ref={drawerRef} className="fixed inset-y-0 left-0 w-72 max-w-[85vw] shadow-2xl">
            {panel}
          </div>
        </div>
      )}
    </>
  );
};
