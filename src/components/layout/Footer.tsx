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
    <footer className="bg-[#20201E] border-t border-[#3A3935] py-8 text-[#F4F1EA] font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Brand info */}
          <div className="text-center md:text-left">
            <span className="text-sm font-bold text-[#F4F1EA] uppercase block tracking-wider">
              JANMARK M. SUELTO
            </span>
            <span className="text-[11px] text-[#A3A09A] mt-1 block font-mono">
              VERSION 3.0 · BUKIDNON, PHILIPPINES
            </span>
          </div>

          {/* Social Row */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/RaizelHub"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-[#282825] border border-[#3A3935] hover:border-[#C7462D] text-[#D5D0C7] hover:text-[#C7462D] rounded-[1px] transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/janmark-suelto-4ba21a400/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-[#282825] border border-[#3A3935] hover:border-[#C7462D] text-[#D5D0C7] hover:text-[#C7462D] rounded-[1px] transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://www.facebook.com/Raizelxdarriii90/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-[#282825] border border-[#3A3935] hover:border-[#C7462D] text-[#D5D0C7] hover:text-[#C7462D] rounded-[1px] transition-colors"
              aria-label="Facebook Profile"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://m.me/Raizelxdarriii90"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-[#282825] border border-[#3A3935] hover:border-[#C7462D] text-[#D5D0C7] hover:text-[#C7462D] rounded-[1px] transition-colors"
              aria-label="Messenger Chat"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
          </div>

          {/* Back to top & copyright */}
          <div className="flex items-center gap-4 text-[#A3A09A] select-none">
            <span>&copy; {new Date().getFullYear()} JANMARK SUELTO</span>
            <button
              onClick={handleBackToTop}
              className="p-2 bg-[#282825] border border-[#3A3935] text-[#F4F1EA] hover:text-[#C7462D] hover:border-[#C7462D] rounded-[1px] transition-colors flex items-center gap-1 font-mono uppercase text-[10px]"
              title="Back to Top"
            >
              <span>TOP</span>
              <ArrowUp className="w-3 h-3 text-[#C7462D]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
