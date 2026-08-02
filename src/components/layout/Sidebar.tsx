import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Download, Menu, X, ArrowUpRight } from 'lucide-react';
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
    { label: 'PROJECTS', href: '/#projects', sectionId: 'projects' },
    { label: 'EXPERTISE', href: '/#technologies', sectionId: 'technologies' },
    { label: 'EXPERIENCE', href: '/#experience', sectionId: 'experience' },
    { label: 'CERTIFICATIONS', href: '/#certifications', sectionId: 'certifications' },
    { label: 'CONTACT', href: '/#contact', sectionId: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === '/') {
        let current = 'home';
        for (const link of navLinks) {
          const el = document.getElementById(link.sectionId);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 200) {
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

    if (link.sectionId === 'contact') {
      window.dispatchEvent(new CustomEvent('open-contact-modal'));
      return;
    }

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
    <header className="fixed top-0 left-0 right-0 h-16 lg:h-20 bg-[#F4F1EA]/95 backdrop-blur-sm border-b border-[#D5D0C7] z-50 transition-all duration-200">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand / Monospace Technical ID */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-3 group"
        >
          <div className="w-8 h-8 rounded-[2px] bg-[#171717] text-[#F4F1EA] flex items-center justify-center font-mono font-bold text-xs tracking-wider group-hover:bg-[#C7462D] transition-colors">
            JS
          </div>
          <div className="flex flex-col">
            <span className="font-mono font-bold text-sm text-[#171717] tracking-wider uppercase group-hover:text-[#C7462D] transition-colors">
              Janmark Suelto
            </span>
            <span className="text-[10px] font-mono text-[#6B6862]">
              Full-Stack Dev &amp; AI Automation Specialist
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-6 font-mono text-xs tracking-wider">
          {navLinks.map((link) => {
            const isActive = activeSection === link.sectionId;
            return (
              <a
                key={link.sectionId}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link)}
                className={`relative py-1 flex items-center transition-colors ${
                  isActive ? 'text-[#171717] font-bold' : 'text-[#6B6862] hover:text-[#171717]'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C7462D]" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-typing-game-modal'))}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F4F1EA] hover:bg-[#EFEBE4] text-[#171717] border border-[#D5D0C7] hover:border-[#171717] font-mono text-xs font-semibold rounded-[2px] transition-all tracking-wider uppercase group"
            aria-label="Open Typing Game"
          >
            <span>TYPING GAME</span>
          </button>

          <button
            onClick={handleDownloadResume}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 border border-[#D5D0C7] hover:border-[#171717] bg-transparent text-[#171717] hover:text-[#C7462D] font-mono text-xs font-semibold rounded-[2px] transition-all"
            aria-label="Download Resume"
          >
            <Download className="w-3.5 h-3.5" />
            <span>RESUME</span>
            <ArrowUpRight className="w-3 h-3 text-[#C7462D]" />
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 border border-[#D5D0C7] text-[#171717] hover:bg-[#EFEBE4] rounded-[2px] transition-colors"
            aria-label="Toggle Navigation"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 bg-[#F4F1EA] border-b border-[#D5D0C7] p-6 shadow-lg space-y-4">
          <nav className="flex flex-col space-y-3 font-mono text-sm">
            {navLinks.map((link) => {
              const isActive = activeSection === link.sectionId;
              return (
                <a
                  key={link.sectionId}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link)}
                  className={`flex items-center justify-between py-2 px-3 border border-[#D5D0C7] rounded-[2px] ${
                    isActive ? 'bg-[#EFEBE4] text-[#171717] font-bold border-[#C7462D]' : 'text-[#6B6862]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="text-[#C7462D]">ACTIVE</span>}
                </a>
              );
            })}

            <button
              onClick={() => {
                setIsOpen(false);
                window.dispatchEvent(new CustomEvent('open-typing-game-modal'));
              }}
              className="flex items-center justify-between py-2 px-3 border border-[#171717] bg-[#171717] text-[#F4F1EA] rounded-[2px] font-bold"
            >
              <div className="flex items-center gap-2">
                <span>TYPING GAME</span>
              </div>
              <span className="text-[10px] text-[#C7462D] font-bold">FULLSCREEN ↗</span>
            </button>
          </nav>
          <div className="pt-2 border-t border-[#D5D0C7]">
            <button
              onClick={handleDownloadResume}
              className="w-full flex items-center justify-center gap-2 py-2.5 border border-[#D5D0C7] bg-[#EFEBE4] text-[#171717] font-mono text-xs font-semibold rounded-[2px] hover:border-[#171717] transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>DOWNLOAD RESUME PDF ↗</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

