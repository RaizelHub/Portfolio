import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Download } from 'lucide-react';
import { Button } from '../ui/Button';

interface NavLink {
  label: string;
  href: string;
  sectionId: string;
}

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks: NavLink[] = [
    { label: 'Home', href: '/', sectionId: 'home' },
    { label: 'About', href: '/#about', sectionId: 'about' },
    { label: 'Skills', href: '/#skills', sectionId: 'skills' },
    { label: 'Services', href: '/#services', sectionId: 'services' },
    { label: 'Projects', href: '/#projects', sectionId: 'projects' },
    { label: 'Experience', href: '/#experience', sectionId: 'experience' },
    { label: 'Contact', href: '/#contact', sectionId: 'contact' },
  ];

  // Scroll handler to toggle sticky navigation style & active highlights
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Only evaluate active highlights if on the home page
      if (location.pathname === '/') {
        let current = 'home';
        for (const link of navLinks) {
          const el = document.getElementById(link.sectionId);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 140) {
              current = link.sectionId;
            }
          }
        }
        setActiveSection(current);
      } else {
        // Highlight active sub-pages
        if (location.pathname.startsWith('/projects')) {
          setActiveSection('projects');
        } else {
          setActiveSection('');
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Trigger initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location, navLinks]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: NavLink) => {
    e.preventDefault();
    setIsOpen(false);

    if (location.pathname === '/') {
      const el = document.getElementById(link.sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(link.sectionId);
      }
    } else {
      navigate(link.href);
      // Wait for navigation and then scroll
      setTimeout(() => {
        const el = document.getElementById(link.sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActiveSection('home');
    } else {
      navigate('/');
    }
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Janmark_Suelto_Resume.pdf';
    link.download = 'Janmark_Suelto_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-navy-950/80 backdrop-blur-md border-b border-navy-800/60 py-3 shadow-lg' 
        : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            onClick={handleLogoClick}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-md bg-emerald-500 hover:bg-emerald-600 flex items-center justify-center font-mono font-bold text-navy-950 transition-colors duration-200">
              JM
            </div>
            <span className="font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors duration-200 text-sm sm:text-base">
              Janmark
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1.5 lg:gap-3">
            <ul className="flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.sectionId;
                return (
                  <li key={link.sectionId}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link)}
                      className={`px-3 py-1.5 rounded-md text-xs lg:text-sm font-medium transition-all duration-200 select-none ${
                        isActive
                          ? 'text-emerald-400 bg-emerald-950/30'
                          : 'text-slate-400 hover:text-white hover:bg-navy-800/40'
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="h-4 w-[1px] bg-navy-800 mx-1 lg:mx-2" />

            <Button
              variant="primary"
              size="sm"
              leftIcon={<Download className="w-3.5 h-3.5" />}
              onClick={handleDownloadResume}
            >
              Download Resume
            </Button>
          </div>

          {/* Mobile Hamburg Trigger */}
          <div className="flex items-center md:hidden gap-3">
            <Button
              variant="primary"
              size="sm"
              className="text-xs px-3 py-1.5"
              leftIcon={<Download className="w-3.5 h-3.5" />}
              onClick={handleDownloadResume}
            >
              Resume
            </Button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 bg-navy-800 text-slate-400 hover:text-white hover:bg-navy-700 rounded-md transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-navy-950/95 backdrop-blur-md border-b border-navy-800 py-4 px-4 shadow-xl flex flex-col gap-3 transition-all duration-300">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.sectionId;
              return (
                <li key={link.sectionId}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link)}
                    className={`block px-4 py-2.5 rounded-md text-sm font-semibold transition-colors ${
                      isActive
                        ? 'text-emerald-400 bg-emerald-950/30'
                        : 'text-slate-400 hover:text-white hover:bg-navy-800/40'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
};
