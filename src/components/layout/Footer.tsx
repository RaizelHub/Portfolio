import React from 'react';
import { Github, Linkedin, Facebook, MessageSquare, ArrowUp } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useSound } from '../../context/SoundContext';

export const Footer: React.FC = () => {
  const location = useLocation();
  const { playHover, playClick } = useSound();

  const handleBackToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    playClick();
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0 });
    }
  };

  return (
    <footer className="bg-[#20201E] dark:bg-[#11100E] border-t border-[#3A3935] dark:border-[#2A2925] py-8 text-[#F4F1EA] dark:text-[#F2EEE6] font-mono text-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Brand info */}
          <div className="text-center md:text-left">
            <span className="text-sm font-bold text-[#F4F1EA] dark:text-[#F2EEE6] uppercase block tracking-wider">
              JANMARK M. SUELTO
            </span>
            <span className="text-[11px] text-[#A3A09A] dark:text-[#8C8880] mt-1 block font-mono">
              VERSION 3.0 &middot; BUKIDNON, PHILIPPINES
            </span>
          </div>

          {/* Social Row */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/RaizelHub"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              onClick={playClick}
              className="p-2 bg-[#282825] dark:bg-[#191815] border border-[#3A3935] dark:border-[#2A2925] hover:border-[#C7462D] dark:hover:border-[#E25235] text-[#D5D0C7] hover:text-[#C7462D] dark:hover:text-[#E25235] rounded-lg transition-colors"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/janmark-suelto-4ba21a400/"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              onClick={playClick}
              className="p-2 bg-[#282825] dark:bg-[#191815] border border-[#3A3935] dark:border-[#2A2925] hover:border-[#C7462D] dark:hover:border-[#E25235] text-[#D5D0C7] hover:text-[#C7462D] dark:hover:text-[#E25235] rounded-lg transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://www.facebook.com/Raizelxdarriii90/"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              onClick={playClick}
              className="p-2 bg-[#282825] dark:bg-[#191815] border border-[#3A3935] dark:border-[#2A2925] hover:border-[#C7462D] dark:hover:border-[#E25235] text-[#D5D0C7] hover:text-[#C7462D] dark:hover:text-[#E25235] rounded-lg transition-colors"
              aria-label="Facebook Profile"
            >
              <Facebook className="w-4 h-4" />
            </a>
            <a
              href="https://m.me/Raizelxdarriii90"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              onClick={playClick}
              className="p-2 bg-[#282825] dark:bg-[#191815] border border-[#3A3935] dark:border-[#2A2925] hover:border-[#C7462D] dark:hover:border-[#E25235] text-[#D5D0C7] hover:text-[#C7462D] dark:hover:text-[#E25235] rounded-lg transition-colors"
              aria-label="Messenger Chat"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
          </div>

          {/* Back to top & copyright */}
          <div className="flex items-center gap-4 text-[#A3A09A] dark:text-[#8C8880] select-none">
            <span>&copy; {new Date().getFullYear()} JANMARK SUELTO</span>
            <button
              onClick={handleBackToTop}
              className="p-2 bg-[#282825] dark:bg-[#191815] border border-[#3A3935] dark:border-[#2A2925] text-[#F4F1EA] dark:text-[#F2EEE6] hover:text-[#C7462D] dark:hover:text-[#E25235] hover:border-[#C7462D] dark:hover:border-[#E25235] rounded-lg transition-colors flex items-center gap-1 font-mono uppercase text-[10px]"
              title="Back to Top"
            >
              <span>TOP</span>
              <ArrowUp className="w-3 h-3 text-[#C7462D] dark:text-[#E25235]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
