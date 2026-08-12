import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Award,
  BriefcaseBusiness,
  ChevronDown,
  Code2,
  Download,
  FolderKanban,
  Github,
  Home,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { profile } from '../../data/profile';
import { useSound } from '../../context/SoundContext';
import { useTheme } from '../../context/ThemeContext';

const sectionLinks = [
  { label: 'Overview', href: '/#home', sectionId: 'home', icon: Home },
  { label: 'Expertise', href: '/#services', sectionId: 'services', icon: Code2 },
  { label: 'Projects', href: '/#projects', sectionId: 'projects', icon: FolderKanban },
  { label: 'Experience', href: '/#experience', sectionId: 'experience', icon: BriefcaseBusiness },
  { label: 'Certifications', href: '/#certifications', sectionId: 'certifications', icon: Award },
] as const;

const projectLinks = [
  { label: 'CareerOS', href: '/projects/careeros' },
  { label: 'Restaurant AI Ops', href: '/projects/restaurant-ai-ops' },
  { label: 'CollabCanvas', href: '/projects/collabcanvas' },
] as const;

const observedSectionIds = ['home', 'about', 'technologies', 'services', 'projects', 'experience', 'certifications', 'github-activity'];

export const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(true);
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

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    drawerRef.current?.querySelector<HTMLElement>('button, a')?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== 'Tab' || !drawerRef.current) return;
      const focusable = Array.from(
        drawerRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

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

  const openContact = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    playNavigate();
    closeDrawer();
    window.dispatchEvent(new CustomEvent('open-contact-modal'));
  };

  const downloadResume = () => {
    playClick();
    const link = document.createElement('a');
    link.href = profile.resumeUrl;
    link.download = 'Suelto-Janmark-Resume.pdf';
    link.click();
    closeDrawer();
  };

  const navRow = 'group flex h-9 w-full items-center gap-2.5 rounded-md px-2.5 text-[13px] transition-colors duration-150';
  const inactiveRow = 'text-[#6B6862] hover:bg-black/[0.035] hover:text-[#171717] dark:text-[#A9A39A] dark:hover:bg-white/[0.04] dark:hover:text-[#F2EEE6]';
  const activeRow = 'bg-black/[0.06] font-semibold text-[#171717] dark:bg-white/[0.07] dark:text-[#F2EEE6]';

  const panel = (
    <div className="flex h-full flex-col bg-[#F4F1EA] text-[#171717] dark:bg-[#191817] dark:text-[#F2EEE6]">
      <div className="flex items-center gap-3 border-b border-[#D5D0C7] px-4 py-4 dark:border-[#34312B]">
        <Link
          to="/"
          onClick={closeDrawer}
          onMouseEnter={playHover}
          className="flex min-w-0 flex-1 items-center gap-3 rounded-md focus-visible:outline-offset-4"
          aria-label="Janmark Suelto, back to overview"
        >
          <img
            src={profile.profileImage}
            alt=""
            className="h-8 w-8 shrink-0 rounded-md border border-[#D5D0C7] object-cover object-top dark:border-[#34312B]"
          />
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-[13px] font-semibold">Janmark Suelto</span>
            <span className="mt-1 block truncate text-[10px] text-[#6B6862] dark:text-[#A9A39A]">Junior Full-Stack Developer</span>
          </span>
        </Link>
        <button
          type="button"
          onClick={closeDrawer}
          className="rounded-md p-1.5 text-[#6B6862] hover:bg-black/5 hover:text-[#171717] dark:text-[#A9A39A] dark:hover:bg-white/5 dark:hover:text-[#F2EEE6] xl:hidden"
          aria-label="Close navigation"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-4">
        <p className="mb-1.5 px-2.5 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-[#8A857D] dark:text-[#77726B]">Navigation</p>
        <nav aria-label="Portfolio sections" className="space-y-0.5">
          {sectionLinks.map((link) => {
            const Icon = link.icon;
            const isActive =
              activeSection === link.sectionId ||
              (link.sectionId === 'home' && activeSection === 'about') ||
              (link.sectionId === 'services' && activeSection === 'technologies') ||
              (link.sectionId === 'projects' && location.pathname.startsWith('/projects'));

            return (
              <React.Fragment key={link.sectionId}>
                <div className="flex items-center">
                  <a
                    href={link.href}
                    onClick={(event) => navigateToSection(event, link.sectionId)}
                    onMouseEnter={playHover}
                    className={`${navRow} ${isActive ? activeRow : inactiveRow} ${link.sectionId === 'projects' ? 'pr-9' : ''}`}
                    aria-current={isActive ? 'location' : undefined}
                  >
                    <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${isActive ? 'bg-[#C7462D] dark:bg-[#E25235]' : 'bg-transparent'}`} aria-hidden="true" />
                    <Icon className="h-4 w-4 shrink-0 opacity-70 group-hover:opacity-90" strokeWidth={1.7} />
                    <span>{link.label}</span>
                  </a>
                  {link.sectionId === 'projects' && (
                    <button
                      type="button"
                      onClick={() => setProjectsOpen((open) => !open)}
                      className="-ml-8 flex h-8 w-8 items-center justify-center rounded-md text-[#8A857D] hover:bg-black/5 hover:text-[#171717] dark:text-[#77726B] dark:hover:bg-white/5 dark:hover:text-[#F2EEE6]"
                      aria-label={`${projectsOpen ? 'Collapse' : 'Expand'} featured projects`}
                      aria-expanded={projectsOpen}
                    >
                      <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-150 ${projectsOpen ? '' : '-rotate-90'}`} />
                    </button>
                  )}
                </div>
                {link.sectionId === 'projects' && projectsOpen && (
                  <div className="mb-1 ml-[2.15rem] border-l border-[#D5D0C7] pl-2 dark:border-[#34312B]">
                    {projectLinks.map((project) => {
                      const isProjectActive = location.pathname === project.href;
                      return (
                        <Link
                          key={project.href}
                          to={project.href}
                          title={project.label}
                          onClick={() => {
                            playNavigate();
                            closeDrawer();
                          }}
                          onMouseEnter={playHover}
                          className={`block truncate rounded px-2 py-1.5 text-[11px] transition-colors duration-150 ${isProjectActive ? 'bg-black/[0.05] font-medium text-[#171717] dark:bg-white/[0.06] dark:text-[#F2EEE6]' : 'text-[#77736C] hover:bg-black/[0.035] hover:text-[#171717] dark:text-[#8E8981] dark:hover:bg-white/[0.04] dark:hover:text-[#F2EEE6]'}`}
                          aria-current={isProjectActive ? 'page' : undefined}
                        >
                          {project.label}
                        </Link>
                      );
                    })}
                    <Link
                      to="/projects"
                      onClick={() => {
                        playNavigate();
                        closeDrawer();
                      }}
                      className="block rounded px-2 py-1.5 text-[11px] font-medium text-[#C7462D] hover:bg-black/[0.035] dark:text-[#E25235] dark:hover:bg-white/[0.04]"
                    >
                      View all projects
                    </Link>
                  </div>
                )}
              </React.Fragment>
            );
          })}

          <button type="button" onClick={downloadResume} onMouseEnter={playHover} className={`${navRow} ${inactiveRow}`}>
            <span className="h-1.5 w-1.5 shrink-0" aria-hidden="true" />
            <Download className="h-4 w-4 shrink-0 opacity-70" strokeWidth={1.7} />
            <span>Download Resume</span>
          </button>
          <a href="#contact" onClick={openContact} onMouseEnter={playHover} className={`${navRow} ${inactiveRow}`}>
            <span className="h-1.5 w-1.5 shrink-0" aria-hidden="true" />
            <Mail className="h-4 w-4 shrink-0 opacity-70" strokeWidth={1.7} />
            <span>Contact</span>
          </a>
        </nav>
      </div>

      <div className="border-t border-[#D5D0C7] px-3 py-3 dark:border-[#34312B]">
        <p className="mb-1 px-2.5 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-[#8A857D] dark:text-[#77726B]">Elsewhere</p>
        <a href={profile.githubUrl} target="_blank" rel="noreferrer" onMouseEnter={playHover} onClick={playClick} className={`${navRow} ${inactiveRow}`}>
          <Github className="h-4 w-4 opacity-70" strokeWidth={1.7} />
          <span>GitHub</span>
        </a>
        <a href={profile.linkedinUrl} target="_blank" rel="noreferrer" onMouseEnter={playHover} onClick={playClick} className={`${navRow} ${inactiveRow}`}>
          <Linkedin className="h-4 w-4 opacity-70" strokeWidth={1.7} />
          <span>LinkedIn</span>
        </a>
        <div className="mt-2 grid grid-cols-2 gap-1 border-t border-[#D5D0C7] pt-2 dark:border-[#34312B]">
          <button
            type="button"
            onClick={() => {
              playClick();
              toggleSound();
            }}
            className="flex h-8 items-center gap-2 rounded-md px-2 text-[11px] text-[#6B6862] hover:bg-black/[0.035] hover:text-[#171717] dark:text-[#A9A39A] dark:hover:bg-white/[0.04] dark:hover:text-[#F2EEE6]"
            aria-label={soundEnabled ? 'Mute UI sounds' : 'Enable UI sounds'}
            aria-pressed={soundEnabled}
          >
            {soundEnabled ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
            <span>Sound</span>
          </button>
          <button
            type="button"
            onClick={() => {
              playClick();
              toggleTheme();
            }}
            className="flex h-8 items-center gap-2 rounded-md px-2 text-[11px] text-[#6B6862] hover:bg-black/[0.035] hover:text-[#171717] dark:text-[#A9A39A] dark:hover:bg-white/[0.04] dark:hover:text-[#F2EEE6]"
            aria-label={resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {resolvedTheme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            <span>Theme</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between border-b border-[#D5D0C7] bg-[#F4F1EA]/95 px-4 backdrop-blur-md dark:border-[#34312B] dark:bg-[#191817]/95 xl:hidden">
        <Link to="/" className="flex items-center gap-2.5" aria-label="Janmark Suelto, home">
          <img
            src={profile.profileImage}
            alt=""
            className="h-8 w-8 rounded-md border border-[#D5D0C7] object-cover object-top dark:border-[#34312B]"
          />
          <span className="text-[13px] font-semibold">Janmark Suelto</span>
        </Link>
        <button
          ref={menuButtonRef}
          type="button"
          onClick={() => {
            playClick();
            setIsOpen(true);
          }}
          className="rounded-md border border-[#D5D0C7] p-2 text-[#171717] hover:bg-black/[0.035] dark:border-[#34312B] dark:text-[#F2EEE6] dark:hover:bg-white/[0.04]"
          aria-label="Open navigation"
          aria-expanded={isOpen}
          aria-controls="portfolio-navigation-drawer"
        >
          <Menu className="h-4 w-4" />
        </button>
      </header>

      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 border-r border-[#D5D0C7] dark:border-[#34312B] xl:block" aria-label="Portfolio sidebar">
        {panel}
      </aside>

      {isOpen && (
        <div className="fixed inset-0 z-50 xl:hidden">
          <button type="button" className="absolute inset-0 bg-[#11100E]/55 backdrop-blur-[2px]" onClick={closeDrawer} aria-label="Close navigation" />
          <div
            id="portfolio-navigation-drawer"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Portfolio navigation"
            className="absolute inset-y-0 left-0 w-[min(20rem,88vw)] border-r border-[#D5D0C7] shadow-2xl dark:border-[#34312B]"
          >
            {panel}
          </div>
        </div>
      )}
    </>
  );
};
