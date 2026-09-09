import React, { useState, useEffect, useMemo, startTransition } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion, LayoutGroup } from 'framer-motion';
import {
  Home,
  Info,
  FolderKanban,
  Layers,
  Wrench,
  Briefcase,
  Mail,
  Linkedin,
  Github,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Menu,
  X,
} from 'lucide-react';
import { FaFacebookF } from 'react-icons/fa6';
import { profile } from '../../data/profile';
import { useTheme } from '../../context/ThemeContext';
import { useSound } from '../../context/SoundContext';
import { LocalTimeWeather } from '../ui/LocalTimeWeather';
import { registerPortfolioVisit, formatVisitCount } from '../../lib/analytics/portfolioVisitors';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const navSections: NavSection[] = [
  {
    title: 'MAIN',
    items: [
      { id: 'home', label: 'Home', icon: Home, path: '/' },
      { id: 'about', label: 'About', icon: Info, path: '/about' },
      { id: 'projects', label: 'Projects', icon: FolderKanban, path: '/projects' },
      { id: 'services', label: 'Services', icon: Layers, path: '/services' },
    ],
  },
  {
    title: 'CAREER & TECH',
    items: [
      { id: 'tools', label: 'Tech Stack', icon: Wrench, path: '/tools' },
      { id: 'experience', label: 'Experience', icon: Briefcase, path: '/experience' },
    ],
  },
  {
    title: 'CONNECT',
    items: [
      { id: 'contact', label: 'Contact', icon: Mail, path: '/contact' },
    ],
  },
];

const getActiveFromPath = (path: string): string => {
  if (path === '/') return 'home';
  if (path.startsWith('/projects')) return 'projects';
  if (path === '/about') return 'about';
  if (path === '/services') return 'services';
  if (path === '/contact') return 'contact';
  if (path === '/tools' || path === '/technologies') return 'tools';
  if (path === '/experience') return 'experience';
  return '';
};

export const BentoSidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentActive = useMemo(() => getActiveFromPath(location.pathname), [location.pathname]);
  const [optimisticActive, setOptimisticActive] = useState(currentActive);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visitCount, setVisitCount] = useState<number | null>(null);

  const { resolvedTheme, toggleTheme } = useTheme();
  const { soundEnabled, toggleSound, playClick, playHover } = useSound();

  // Register & fetch portfolio traffic count
  useEffect(() => {
    let cancelled = false;
    registerPortfolioVisit().then((value) => {
      if (!cancelled && value !== null) {
        setVisitCount(value);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const formattedVisitCount = visitCount
    ? (visitCount < 100000 ? visitCount.toLocaleString() : formatVisitCount(visitCount))
    : '2,948';

  // Synchronize optimistic active with route changes (e.g. back/forward button)
  useEffect(() => {
    setOptimisticActive(currentActive);
  }, [currentActive]);

  const handleNavClick = (e: React.MouseEvent, item: NavItem) => {
    if (location.pathname === item.path) {
      e.preventDefault();
      setMobileOpen(false);
      return;
    }

    e.preventDefault();

    // 1. Immediately trigger smooth moving pill animation
    setOptimisticActive(item.id);
    setMobileOpen(false);

    // 2. Play audio feedback asynchronously
    setTimeout(() => {
      playClick();
    }, 0);

    // 3. Smooth transition to target path without dropping animation frames
    startTransition(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      navigate(item.path);
    });
  };

  const renderSidebarNavContent = (layoutPrefix: string) => (
    <div className="flex flex-col h-full justify-between select-none font-sans text-neutral-800 dark:text-neutral-200">
      {/* ── TOP: Brand Header + Glass Weather + Studio Sections ── */}
      <div>
        {/* Sleek Studio Profile Header */}
        <div className="flex items-center justify-between mb-3.5 pt-1 px-1">
          <div className="min-w-0 flex-1">
            <Link
              to="/"
              className="block group"
              title="Return to Home"
            >
              <h2 className="font-title text-[17px] lg:text-lg font-black text-neutral-900 dark:text-white tracking-tight leading-tight group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                {profile.name}
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium truncate mt-0.5" title={profile.title}>
                {profile.title}
              </p>
            </Link>
          </div>

          {/* Close button on mobile */}
          <button
            type="button"
            onClick={() => {
              playClick();
              setMobileOpen(false);
            }}
            className="lg:hidden p-2 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white rounded-lg cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Weather & Time Card */}
        <div className="mb-3 px-3 py-2 rounded-xl bg-neutral-100/70 hover:bg-neutral-100 dark:bg-white/[0.04] dark:hover:bg-white/[0.06] border border-neutral-200/80 dark:border-white/[0.08] shadow-xs transition-all flex items-center justify-between group">
          <div className="flex items-center gap-2.5">
            <LocalTimeWeather className="!p-0 !border-0 !shadow-none bg-transparent" />
            <div className="flex flex-col text-left leading-none">
              <span className="font-title text-xs font-bold text-neutral-800 dark:text-neutral-200 group-hover:text-neutral-900 dark:group-hover:text-white transition-colors">
                Bukidnon, PH
              </span>
              <span className="text-[10px] text-neutral-500 dark:text-neutral-400 mt-0.5 font-medium">
                Live Weather &amp; Time
              </span>
            </div>
          </div>
          <span className="font-mono text-[9px] font-bold text-neutral-700 dark:text-neutral-300 px-1.5 py-0.5 rounded-md bg-neutral-200/70 dark:bg-white/[0.08] border border-neutral-300/80 dark:border-white/[0.1] shadow-2xs">
            UTC+8
          </span>
        </div>

        {/* Categorized Sleek Studio Navigation Menu with Coordinated LayoutGroup */}
        <LayoutGroup id={`${layoutPrefix}-sidebar-nav`}>
          <nav aria-label="Main Studio Navigation" className="space-y-2.5">
            {navSections.map((section, sIdx) => (
              <div key={section.title} className={sIdx > 0 ? 'pt-2 border-t border-neutral-200/70 dark:border-white/[0.06]' : ''}>
                {/* Section Header */}
                <div className="px-2 mb-1 flex items-center justify-between">
                  <span className="font-mono text-[9px] font-black tracking-widest text-neutral-500 dark:text-neutral-400 uppercase">
                    {section.title}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-neutral-300 dark:bg-neutral-600" />
                </div>

                {/* Section Items */}
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = optimisticActive === item.id;

                    return (
                      <Link
                        key={item.id}
                        to={item.path}
                        onClick={(e) => handleNavClick(e, item)}
                        onMouseEnter={playHover}
                        className="relative w-full py-2 px-2 flex items-center justify-between font-title text-xs sm:text-[13px] tracking-wide cursor-pointer select-none group"
                      >
                        {/* Item Moves Forward on Navigate / Active */}
                        <motion.div
                          animate={{
                            x: isActive ? 14 : 0,
                          }}
                          whileHover={{
                            x: isActive ? 14 : 5,
                          }}
                          transition={{
                            type: 'spring',
                            stiffness: 420,
                            damping: 28,
                          }}
                          className="flex items-center gap-2.5 min-w-0"
                        >
                          <div
                            className={`w-4 h-4 flex items-center justify-center transition-colors duration-150 ${
                              isActive
                                ? 'text-neutral-900 dark:text-white scale-110'
                                : 'text-neutral-400 group-hover:text-neutral-800 dark:group-hover:text-neutral-200'
                            }`}
                          >
                            <Icon className="w-4 h-4 stroke-[2.2]" />
                          </div>

                          <span
                            className={`truncate transition-colors ${
                              isActive
                                ? 'text-neutral-900 dark:text-white font-black'
                                : 'text-neutral-500 dark:text-neutral-400 font-medium group-hover:text-neutral-900 dark:group-hover:text-white'
                            }`}
                          >
                            {item.label}
                          </span>
                        </motion.div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </LayoutGroup>
      </div>

      {/* ── BOTTOM: Studio Utility Dock & Preferences ── */}
      <div className="pt-3 border-t border-neutral-200/70 dark:border-white/[0.06] mt-3 space-y-2.5">
        {/* Quick Preference Controls */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            {/* Sound Toggle */}
            <button
              type="button"
              onClick={() => {
                playClick();
                toggleSound();
              }}
              onMouseEnter={playHover}
              title={soundEnabled ? 'Mute audio' : 'Enable audio'}
              className="w-8 h-8 rounded-xl bg-neutral-100 hover:bg-neutral-200/80 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white border border-neutral-200/80 dark:border-white/[0.08] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
            >
              {soundEnabled ? (
                <Volume2 className="w-3.5 h-3.5 text-neutral-900 dark:text-white" />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500" />
              )}
            </button>

            {/* Dark Mode Toggle */}
            <button
              type="button"
              onClick={() => {
                playClick();
                toggleTheme();
              }}
              onMouseEnter={playHover}
              title={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
              className="w-8 h-8 rounded-xl bg-neutral-100 hover:bg-neutral-200/80 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white border border-neutral-200/80 dark:border-white/[0.08] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-95"
            >
              {resolvedTheme === 'dark' ? (
                <Sun className="w-3.5 h-3.5 text-white" />
              ) : (
                <Moon className="w-3.5 h-3.5 text-neutral-700" />
              )}
            </button>

          </div>

          {/* Social Links */}
          <div className="flex items-center gap-1.5">
            <a
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              onClick={playClick}
              title="GitHub"
              className="w-8 h-8 rounded-xl bg-neutral-100 hover:bg-neutral-200/80 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white border border-neutral-200/80 dark:border-white/[0.08] flex items-center justify-center transition-all shadow-xs hover:scale-105"
            >
              <Github className="w-3.5 h-3.5" />
            </a>
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              onClick={playClick}
              title="LinkedIn"
              className="w-8 h-8 rounded-xl bg-neutral-100 hover:bg-neutral-200/80 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white border border-neutral-200/80 dark:border-white/[0.08] flex items-center justify-center transition-all shadow-xs hover:scale-105"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
            <a
              href={profile.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              onClick={playClick}
              title="Facebook"
              className="w-8 h-8 rounded-xl bg-neutral-100 hover:bg-neutral-200/80 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white border border-neutral-200/80 dark:border-white/[0.08] flex items-center justify-center transition-all shadow-xs hover:scale-105"
            >
              <FaFacebookF className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Telemetry & Status Tags */}
        <div className="space-y-1.5">
          {/* Total Visits Badge (Static) */}
          <div className="px-3 py-1.5 rounded-xl bg-neutral-100/70 dark:bg-white/[0.03] border border-neutral-200/80 dark:border-white/[0.06] flex items-center justify-between text-[11px]">
            <span className="font-medium text-neutral-800 dark:text-neutral-300">Total Visits</span>
            <span className="font-mono font-bold text-neutral-800 dark:text-neutral-200">
              {formattedVisitCount}
            </span>
          </div>

          {/* Status Tag */}
          <div className="px-3 py-1.5 rounded-xl bg-neutral-100/70 dark:bg-white/[0.03] border border-neutral-200/80 dark:border-white/[0.06] text-[11px] text-neutral-500 dark:text-neutral-400 flex items-center justify-between">
            <span className="font-medium text-neutral-800 dark:text-neutral-300">Open to Work</span>
            <span className="text-[10px] text-neutral-500 dark:text-neutral-400 font-mono">PH (UTC+8)</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* ── DESKTOP FULL-HEIGHT SIDEBAR (lg and up) ── */}
      <aside className="hidden lg:flex flex-col w-60 lg:w-64 xl:w-68 shrink-0 h-screen sticky top-0 bg-white dark:bg-[#0c0e12] text-neutral-900 dark:text-white p-4 xl:p-4.5 border-r border-neutral-200/90 dark:border-white/[0.07] z-30 shadow-[2px_0_16px_rgba(0,0,0,0.03)] dark:shadow-[4px_0_24px_rgba(0,0,0,0.5)] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden transition-colors duration-200">
        {renderSidebarNavContent('desktop')}
      </aside>

      {/* ── MOBILE FIXED HEADER BAR (below lg) ── */}
      <div className="lg:hidden sticky top-0 w-full bg-white dark:bg-[#13161C] text-neutral-900 dark:text-white px-4 py-3 flex items-center justify-between z-40 border-b border-neutral-200/90 dark:border-white/[0.08] shadow-sm transition-colors duration-200">
        <Link to="/" className="block">
          <h2 className="font-title text-sm font-black text-neutral-900 dark:text-white leading-tight tracking-tight">
            {profile.name}
          </h2>
          <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium mt-0.5">Full-Stack Developer</p>
        </Link>

        <button
          type="button"
          onClick={() => {
            playClick();
            setMobileOpen(true);
          }}
          className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200/80 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] text-neutral-900 dark:text-white border border-neutral-200 dark:border-white/[0.1] cursor-pointer"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* ── MOBILE DRAWER OVERLAY ── */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative w-72 max-w-[85vw] h-full bg-white dark:bg-[#0c0e12] text-neutral-900 dark:text-white p-4.5 flex flex-col justify-between shadow-2xl z-10 overflow-y-auto">
            {renderSidebarNavContent('mobile')}
          </div>
        </div>
      )}
    </>
  );
};
