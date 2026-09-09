import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Contact } from '../sections/Contact/Contact';
import { useSound } from '../context/SoundContext';

export const ContactPage: React.FC = () => {
  const { playClick, playHover } = useSound();

  return (
    <div className="min-h-screen pb-16 pt-0 select-none font-sans">
      {/* Back Navigation Bar */}
      <div className="mb-4">
        <Link
          to="/"
          onClick={playClick}
          onMouseEnter={playHover}
          className="btn-pill-white inline-flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold tracking-wide cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5 text-neutral-800 dark:text-neutral-200" />
          <span>Return to Bento Dashboard</span>
        </Link>
      </div>

      <Contact />
    </div>
  );
};

export default ContactPage;
