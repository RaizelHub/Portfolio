import React, { useState, useEffect, useRef } from 'react';
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
  ExternalLink,
} from 'lucide-react';
import { profile } from '../../data/profile';
import { useSound } from '../../context/SoundContext';
import { useTheme } from '../../context/ThemeContext';
import { PortfolioVisitorCount } from './PortfolioVisitorCount';

/* ── Exactly 4 primary navigation items with icons ── */
const navItems = [
  { label: 'Work', href: '/#projects', sectionId: 'projects', icon: FolderKanban },
  { label: 'Experience', href: '/#experience', sectionId: 'experience', icon: BriefcaseBusiness },
  { label: 'About', href: '/#about', sectionId: 'about', icon: User },
  { label: 'Contact', href: '/#contact', sectionId: 'contact', icon: Mail },
] as const;

const observedSectionIds = [
  'home',
  'projects',
  'technologies',
  'experience',
  'about',
  'certifications',
  'github-activity',
  'contact',
];

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navRef = useRef<HTMLElement>(null);
  const visibleSectionsRef = useRef(new Map<string, DOMRectReadOnly>());

  const location = useLocation();
  const navigate = useNavigate();
  const { soundEnabled, toggleSound, playHover, playClick, playNavigate } = useSound();
  const { resolvedTheme, toggleTheme } = useTheme();

  /* ── 1. Active section tracking via IntersectionObserver ── */
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
          if (entry.isIntersecting) {
            visibleSections.set(entry.target.id, entry.boundingClientRect);
          } else {
            visibleSections.delete(entry.target.id);
          }
        });

        const visible = [...visibleSections.entries()].sort(
          ([, a], [, b]) => Math.abs(a.top - 90) - Math.abs(b.top - 90),
        );

        if (visible[0]) {
          const currentId = visible[0][0];
          // Map secondary sections to their parent nav item
          if (currentId === 'home' || currentId === 'projects' || currentId === 'technologies') {
            setActiveSection('projects');
          } else if (currentId === 'experience') {
            setActiveSection('experience');
          } else if (currentId === 'about' || currentId === 'certifications' || currentId === 'github-activity') {
            setActiveSection('about');
          } else if (currentId === 'contact') {
            setActiveSection('contact');
          }
        }
      },
      { rootMargin: '-72px 0px -55% 0px', threshold: [0, 0.1, 0.25] },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      visibleSections.clear();
    };
  }, [location.pathname]);

  /* ── 2. Sticky Scroll Background Transition ── */
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(currentScrollY > 16);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check on mount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ── 3. Handle Keyboard Accessibility (Escape to close mobile menu) ── */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  /* ── 4. Cross-page hash scroll handling ── */
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const sectionId = location.hash.replace('#', '');
      const el = document.getElementById(sectionId);
      if (el) {
        const timer = setTimeout(() => {
          el.scrollIntoView({
            behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
          });
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [location.pathname, location.hash]);

  /* ── 5. Smooth Anchor Navigation ── */
  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    event.preventDefault();
    playNavigate();
    setIsMobileMenuOpen(false);
    setActiveSection(sectionId);

    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
      return;
    }

    window.history.replaceState(null, '', `/#${sectionId}`);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      });
    }
  };

  const handleBrandClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    playClick();
    setIsMobileMenuOpen(false);
    setActiveSection('home');

    if (location.pathname === '/') {
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      });
    } else {
      navigate('/');
    }
  };

  return (
    <header
      ref={navRef}
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${isScrolled || isMobileMenuOpen
        ? 'bg-[var(--background)]/94 border-b border-[var(--border-subtle)] backdrop-blur-xl'
        : 'bg-transparent border-b border-transparent'
        }`}
    >
      <div className="mx-auto w-full max-w-[var(--content-width)] px-[var(--page-gutter)]">
        <div className="flex h-16 items-center justify-between gap-4 lg:gap-8">
          {/* ── Brand: Name ── */}
          <Link
            to="/"
            onClick={handleBrandClick}
            onMouseEnter={playHover}
            className="group flex min-w-0 items-center py-1 focus-visible:outline-2 focus-visible:outline-[var(--focus)] focus-visible:outline-offset-4"
            aria-label="Janmark Suelto — Back to top"
          >
            <span className="font-nav text-sm font-bold tracking-tight text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent)]">
              Janmark Suelto
            </span>
          </Link>

          {/* ── Navigation Links with Underline Active Indicator ── */}
          <nav
            aria-label="Main Navigation"
            className="hidden min-w-0 items-center gap-1 lg:flex lg:gap-2"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                activeSection === item.sectionId ||
                (item.sectionId === 'projects' &&
                  (location.pathname.startsWith('/projects') || activeSection === 'projects' || activeSection === 'home'));

              return (
                <a
                  key={item.sectionId}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.sectionId)}
                  onMouseEnter={playHover}
                  className={`relative group flex items-center gap-2 px-3 py-2 font-nav text-xs tracking-tight transition-colors duration-200 select-none ${isActive
                    ? 'text-[var(--accent)] font-bold'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-medium'
                    }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon
                    className={`h-4 w-4 shrink-0 transition-colors ${isActive ? 'text-[var(--accent)]' : 'opacity-60 group-hover:opacity-100'
                      }`}
                  />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* ── Action Utilities ── */}
          <div className="hidden min-w-0 items-center gap-2 lg:flex">
            {/* Social Link: GitHub */}
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              onClick={playClick}
              className="p-2 text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
              aria-label="GitHub Profile"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>

            {/* Social Link: LinkedIn */}
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              onClick={playClick}
              className="p-2 text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
              aria-label="LinkedIn Profile"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            {/* Divider */}
            <div className="h-4 w-px bg-[var(--border-subtle)]" aria-hidden="true" />

            <PortfolioVisitorCount />

            {/* Divider */}
            <div className="h-4 w-px bg-[var(--border-subtle)]" aria-hidden="true" />

            {/* Audio Toggle Button */}
            <button
              type="button"
              onClick={() => {
                playClick();
                toggleSound();
              }}
              onMouseEnter={playHover}
              className="flex items-center px-1.5 py-2 font-mono text-[11px] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
              aria-label={soundEnabled ? 'Disable audio' : 'Enable audio'}
              title={soundEnabled ? 'Audio: On' : 'Audio: Off'}
            >
              {soundEnabled ? (
                <Volume2 className="h-3.5 w-3.5 text-[var(--accent)]" />
              ) : (
                <VolumeX className="h-3.5 w-3.5" />
              )}
            </button>

            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={() => {
                playClick();
                toggleTheme();
              }}
              onMouseEnter={playHover}
              className="flex items-center px-1.5 py-2 font-mono text-[11px] text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
              aria-label="Toggle theme"
              title={resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {resolvedTheme === 'dark' ? (
                <Sun className="theme-toggle-icon h-3.5 w-3.5 text-[var(--accent)]" />
              ) : (
                <Moon className="theme-toggle-icon h-3.5 w-3.5 text-[var(--accent)]" />
              )}
            </button>
          </div>

          {/* ── Mobile Header Utilities & Hamburger ── */}
          <div className="flex items-center gap-1.5 lg:hidden">
            {/* Audio Toggle (Mobile) */}
            <button
              type="button"
              onClick={() => {
                playClick();
                toggleSound();
              }}
              className="p-2 text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
              aria-label={soundEnabled ? 'Disable audio' : 'Enable audio'}
              title={soundEnabled ? 'Audio: On' : 'Audio: Off'}
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-[var(--accent)]" />
              ) : (
                <VolumeX className="w-4 h-4" />
              )}
            </button>

            {/* Theme Toggle (Mobile) */}
            <button
              type="button"
              onClick={() => {
                playClick();
                toggleTheme();
              }}
              onMouseEnter={playHover}
              className="p-2 text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
              aria-label="Toggle theme"
            >
              {resolvedTheme === 'dark' ? <Sun className="theme-toggle-icon w-4 h-4 text-[var(--accent)]" /> : <Moon className="theme-toggle-icon w-4 h-4 text-[var(--accent)]" />}
            </button>

            {/* Hamburger Button */}
            <button
              type="button"
              onClick={() => {
                playClick();
                setIsMobileMenuOpen((prev) => !prev);
              }}
              className="border border-[var(--border)] bg-[var(--surface)] p-2 text-[var(--text-primary)] focus-visible:outline-2 focus-visible:outline-[var(--focus)]"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Navigation Dropdown Menu Panel ── */}
      {isMobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="border-t border-[var(--border-subtle)] bg-[var(--background)] px-[var(--page-gutter)] py-6 shadow-[var(--shadow-soft)] lg:hidden"
        >
          <nav aria-label="Mobile Navigation Links" className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                activeSection === item.sectionId ||
                (item.sectionId === 'projects' &&
                  (location.pathname.startsWith('/projects') || activeSection === 'projects' || activeSection === 'home'));

              return (
                <a
                  key={item.sectionId}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.sectionId)}
                  className={`relative flex min-h-11 items-center gap-2.5 border-b border-[var(--border-subtle)] px-2 py-3 font-nav text-xs tracking-tight transition-colors ${isActive
                    ? 'text-[var(--accent)] font-bold'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-medium'
                    }`}
                >
                  <Icon
                    className={`h-4 w-4 shrink-0 ${isActive ? 'text-[var(--accent)]' : 'opacity-70'
                      }`}
                  />
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Secondary Utilities Separator */}
          <div className="mt-5 pt-5 border-t border-[var(--border-subtle)] flex flex-col space-y-2.5 font-mono text-xs text-[var(--text-secondary)]">
            <PortfolioVisitorCount variant="mobile" />
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between text-[var(--text-primary)] hover:text-[var(--accent)] font-semibold py-1"
            >
              <span>Résumé (PDF)</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between hover:text-[var(--accent)] py-1"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between hover:text-[var(--accent)] py-1"
            >
              <span>LinkedIn</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
