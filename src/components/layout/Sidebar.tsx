import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Download,
  Github,
  Linkedin,
  Menu,
  X,
  Mail,
} from 'lucide-react';
import { profile } from '../../data/profile';

interface NavLink {
  label: string;
  href: string;
  sectionId: string;
}

export const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks: NavLink[] = [
    { label: 'About', href: '/#about', sectionId: 'about' },
    { label: 'Projects', href: '/#projects', sectionId: 'projects' },
    { label: 'Experience', href: '/#experience', sectionId: 'experience' },
    { label: 'Certifications', href: '/#certifications', sectionId: 'certifications' },
    { label: 'Contact', href: '/#contact', sectionId: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === '/') {
        let current = 'home';
        for (const link of navLinks) {
          const el = document.getElementById(link.sectionId);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 160) {
              current = link.sectionId;
            }
          }
        }
        setActiveSection(current);
      } else {
        if (location.pathname.startsWith('/projects')) {
          setActiveSection('projects');
        } else {
          setActiveSection('');
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: NavLink) => {
    e.preventDefault();
    setIsOpen(false);

    if (location.pathname === '/') {
      if (link.sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setActiveSection('home');
      } else {
        const el = document.getElementById(link.sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          setActiveSection(link.sectionId);
        }
      }
    } else {
      navigate(link.href);
      setTimeout(() => {
        const el = document.getElementById(link.sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = profile.resumeUrl;
    link.download = 'Janmark-Suelto-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {/* Mobile Top Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-navy-950/90 backdrop-blur-md border-b border-navy-800/80 z-50 flex items-center justify-between px-4 shadow-lg">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5"
        >
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center font-mono font-bold text-navy-950 text-sm shadow-md">
            JS
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-white text-sm leading-tight">Janmark Suelto</span>
            <span className="text-[10px] font-mono text-emerald-400">Full-Stack &amp; AI Engineer</span>
          </div>
        </a>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadResume}
            className="p-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-md text-xs font-mono font-semibold"
            aria-label="Download Resume"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 bg-navy-800 text-slate-300 hover:text-white rounded-md transition-colors"
            aria-label="Toggle Navigation"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Backdrop & Drawer */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-navy-950/80 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container (Fixed desktop / Drawer mobile) */}
      <aside
        className={`fixed top-0 bottom-0 left-0 w-64 bg-navy-950 border-r border-navy-800/80 z-50 flex flex-col justify-between p-5 transition-transform duration-300 ease-in-out overflow-y-auto ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
      >
        {/* Top Profile Card */}
        <div>
          <div className="flex items-center justify-between pb-5 border-b border-navy-800/80 mb-5">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setIsOpen(false);
              }}
              className="flex items-center gap-3 group cursor-pointer"
            >
              <div className="relative">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center font-mono font-bold text-navy-950 text-base shadow-lg group-hover:scale-105 transition-transform duration-200">
                  JS
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-white text-base tracking-tight group-hover:text-emerald-400 transition-colors">
                  Janmark Suelto
                </span>
                <span className="text-xs font-mono text-emerald-400 font-semibold">
                  Full-Stack &amp; AI Automation Specialist
                </span>
              </div>
            </a>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white p-1"
              aria-label="Close navigation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>



          {/* Navigation Links (Clean Text Only) */}
          <nav className="space-y-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.sectionId;
              return (
                <a
                  key={link.sectionId}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold font-mono transition-all duration-200 ${isActive
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-navy-800/40 border border-transparent'
                    }`}
                >
                  <span>{link.label}</span>
                </a>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer: Resume & Socials */}
        <div className="pt-5 border-t border-navy-800/80 space-y-4">
          <button
            onClick={handleDownloadResume}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-navy-950 font-mono text-xs font-bold rounded-lg transition-colors duration-200 shadow-md shadow-emerald-500/10"
          >
            <Download className="w-4 h-4" />
            <span>Download Resume</span>
          </button>

          <div className="flex items-center justify-center gap-3">
            {profile.githubUrl && (
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-navy-900 text-slate-400 hover:text-emerald-400 hover:bg-navy-800 border border-navy-800 rounded-lg transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {profile.linkedinUrl && (
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-navy-900 text-slate-400 hover:text-emerald-400 hover:bg-navy-800 border border-navy-800 rounded-lg transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            )}
            <a
              href={`mailto:${profile.email}`}
              className="p-2 bg-navy-900 text-slate-400 hover:text-emerald-400 hover:bg-navy-800 border border-navy-800 rounded-lg transition-colors"
              aria-label="Email Me"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </aside>
    </>
  );
};
