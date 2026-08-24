import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  BriefcaseBusiness,
  Download,
  FileText,
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
import { PortfolioVisitorCount } from './PortfolioVisitorCount';

/* ── 4 primary navigation items ── */
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
    <div className="flex h-full flex-col bg-[var(--background)] text-[var(--text-primary)] border-l border-[var(--border-subtle)]">
      {/* Brand Header */}
      <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-6 py-5">
        <Link
          to="/"
          onClick={(e) => navigateToSection(e, 'projects')}
          onMouseEnter={playHover}
          className="group flex min-w-0 flex-1 items-center gap-3 focus-visible:outline-offset-4"
          aria-label="Janmark Suelto, home"
        >
          <span className="block truncate font-nav text-sm font-black tracking-wider text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)]">
            Janmark Suelto
          </span>
        </Link>

        <button
          type="button"
          onClick={closeDrawer}
          className="rounded-md p-1.5 text-[var(--text-secondary)] hover:bg-[var(--surface)] hover:text-[var(--text-primary)] lg:hidden cursor-pointer"
          aria-label="Close navigation"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* 4 Primary Navigation Links with Unbounded Typography */}
      <div className="flex-1 overflow-y-auto px-4 py-5">
        <nav aria-label="Portfolio sections" className="space-y-1.5">
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
                className={`group flex h-9 w-full items-center gap-2.5 px-3 text-xs font-nav font-medium transition-colors duration-150 ${
                  isActive
                    ? 'text-[var(--accent)] font-bold'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
                aria-current={isActive ? 'location' : undefined}
              >
                <Icon
                  className={`h-4 w-4 shrink-0 transition-colors ${
                    isActive ? 'text-[var(--accent)]' : 'text-current opacity-60 group-hover:opacity-100'
                  }`}
                  strokeWidth={1.75}
                />
                <span className="transition-colors">{link.label}</span>
              </a>
            );
          })}
        </nav>

        {/* 1-Click Resume Link */}
        <div className="pt-4 mt-4 border-t border-[var(--border-subtle)]">
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playHover}
            onClick={playClick}
            className="group flex h-9 w-full items-center justify-between rounded-md border border-[var(--border-subtle)] bg-[var(--surface)] px-3 text-xs font-nav font-semibold text-[var(--text-primary)] transition-all duration-150 hover:border-[var(--accent)] hover:bg-[var(--surface-elevated)] hover:text-[var(--accent)]"
          >
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-[var(--accent)]" strokeWidth={1.8} />
              <span>Resume</span>
            </div>
            <span className="flex items-center gap-1 font-mono text-[10px] text-[var(--text-muted)] group-hover:text-[var(--accent)]">
              PDF <Download className="h-3 w-3" />
            </span>
          </a>
        </div>
      </div>

      {/* Footer / Socials, Visitor Counter & Controls */}
      <div className="border-t border-[var(--border-subtle)] p-4 space-y-3.5 bg-[var(--background-secondary)]/50">
        {/* Live Visitor Counter */}
        <div className="px-1">
          <PortfolioVisitorCount />
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-between px-1 text-xs font-mono text-[var(--text-secondary)]">
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

        {/* Theme & Sound Controls (Icon Only) */}
        <div className="flex items-center justify-between border-t border-[var(--border-subtle)] pt-3 px-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--text-muted)]">
            Preferences
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                playClick();
                toggleSound();
              }}
              onMouseEnter={playHover}
              title={soundEnabled ? 'Mute sound effects' : 'Enable sound effects'}
              aria-label={soundEnabled ? 'Disable audio' : 'Enable audio'}
              className="flex h-7 w-7 items-center justify-center rounded-md border border-[var(--border-subtle)] bg-[var(--surface)] text-[var(--text-secondary)] hover:border-[var(--border)] hover:bg-[var(--surface-elevated)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
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
              className="flex h-7 w-7 items-center justify-center rounded-md border border-[var(--border-subtle)] bg-[var(--surface)] text-[var(--text-secondary)] hover:border-[var(--border)] hover:bg-[var(--surface-elevated)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
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
      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--background)]/90 px-4 backdrop-blur-md lg:hidden">
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={(e) => navigateToSection(e, 'projects')}
        >
          <span className="font-nav text-xs font-black tracking-wider text-[var(--text-primary)]">
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
          className="rounded-md border border-[var(--border-subtle)] p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
          aria-label="Open navigation menu"
        >
          <Menu className="h-4 w-4" />
        </button>
      </header>

      {/* Desktop Persistent Right Sidebar */}
      <aside className="fixed inset-y-0 right-0 z-30 hidden w-64 lg:block">
        {panel}
      </aside>

      {/* Mobile Slide-Out Drawer from Right */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={closeDrawer}
          />
          <div
            ref={drawerRef}
            className="fixed inset-y-0 right-0 w-72 max-w-[85vw] shadow-2xl z-10"
          >
            {panel}
          </div>
        </div>
      )}
    </>
  );
};
