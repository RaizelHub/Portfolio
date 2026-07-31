import React from 'react';
import { Github, Linkedin, Facebook, MessageSquare, ArrowUp } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export const Footer: React.FC = () => {
  const location = useLocation();

  const handleBackToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0 });
    }
  };

  return (
    <footer className="bg-navy-950 border-t border-navy-800/60 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">

          {/* Brand info */}
          <div className="text-center md:text-left">
            <span className="text-base font-bold text-white block">Janmark M. Suelto</span>
            <span className="text-xs text-slate-400 mt-1 block">
              Full Stack Web Developer &amp; AI Automation Specialist · Bukidnon, PH
            </span>
          </div>

          {/* Social Row */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/RaizelHub"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-navy-900 border border-navy-800 hover:border-emerald-500/30 text-slate-400 hover:text-emerald-400 rounded-md transition-all duration-200"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/janmark-suelto-4ba21a400/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-navy-900 border border-navy-800 hover:border-emerald-500/30 text-slate-400 hover:text-emerald-400 rounded-md transition-all duration-200"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://www.facebook.com/Raizelxdarriii90/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-navy-900 border border-navy-800 hover:border-emerald-500/30 text-slate-400 hover:text-emerald-400 rounded-md transition-all duration-200"
              aria-label="Facebook Profile"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://m.me/Raizelxdarriii90"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-navy-900 border border-navy-800 hover:border-emerald-500/30 text-slate-400 hover:text-emerald-400 rounded-md transition-all duration-200"
              aria-label="Messenger Chat"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/qr/YHP7U5VEMH5IP1"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-navy-900 border border-navy-800 hover:border-emerald-500/30 text-slate-400 hover:text-emerald-400 rounded-md transition-all duration-200"
              aria-label="WhatsApp Chat"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
          </div>

          {/* Back to top & copyright */}
          <div className="flex items-center gap-6 text-xs text-slate-500 select-none">
            <span>&copy; {new Date().getFullYear()} · Built with React</span>
            <a
              href="#"
              onClick={handleBackToTop}
              className="p-2 bg-navy-900 hover:bg-navy-800 border border-navy-800 text-slate-400 hover:text-white rounded-md transition-colors"
              title="Back to Top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
