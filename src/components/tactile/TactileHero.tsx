import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { profile } from '../../data/profile';
export const TactileHero: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const [paused, setPaused] = React.useState(false);
  return (
    <div className="anime-profile w-full mb-4 sm:mb-5 lg:mb-6 select-none font-sans" data-paused={paused || !!reduceMotion}>
      <div className="anime-profile-art" aria-hidden="true">
        <img src="/img/ichigo-wallpaper.jpg" alt="" className="anime-profile-image" />
        <img src="/img/ichigo-hollow.jpg" alt="" className="anime-profile-image anime-profile-hollow" />
        <div className="anime-profile-glow" />
        <div className="anime-transition anime-transition-sweep" />
        <div className="anime-transition anime-transition-pulse" />
      </div>
      <button type="button" className="anime-profile-toggle" onClick={() => setPaused(value => !value)} aria-pressed={paused} disabled={!!reduceMotion}>
        {reduceMotion ? 'Motion reduced' : paused ? 'Play background' : 'Pause background'}
      </button>
      {/* ── Hero Profile Row: Circular Avatar + Headline + Bio ── */}
      <div className="anime-profile-content flex flex-col sm:flex-row items-center sm:items-center gap-5 sm:gap-7 lg:gap-8 py-1 sm:py-2">
        {/* Circular Avatar with Sleek Monochrome Frame */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="relative shrink-0 group flex flex-col items-center"
        >
          <div className="w-28 h-28 sm:w-34 sm:h-34 lg:w-38 lg:h-38 xl:w-44 xl:h-44 rounded-full p-1.5 bg-gradient-to-b from-neutral-800 via-neutral-900 to-black dark:from-neutral-700 dark:via-neutral-800 dark:to-neutral-950 shadow-[0_12px_32px_rgba(0,0,0,0.16)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.45)] flex items-center justify-center transition-transform duration-300 group-hover:scale-103">
            <div className="w-full h-full rounded-full overflow-hidden bg-neutral-900 ring-2 sm:ring-[3px] ring-white/90 dark:ring-neutral-700/90 shadow-inner">
              <img
                src={profile.profileImage}
                alt={profile.name}
                style={{ objectPosition: 'center 52%' }}
                className="w-full h-full object-cover scale-110 select-none transition-transform duration-500 group-hover:scale-115"
              />
            </div>
          </div>
          {/* Subtle shadow ellipse under avatar */}
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-24 sm:w-28 lg:w-36 h-3 bg-neutral-900/15 dark:bg-black/50 rounded-full blur-[5px] -z-10" />
        </motion.div>

        {/* Headline & Bio */}
        <div className="flex-1 text-center sm:text-left min-w-0">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            {/* Signature Headline */}
            <h1 className="font-title text-2xl sm:text-3xl lg:text-[32px] xl:text-[36px] font-black tracking-tight text-neutral-900 dark:text-white leading-[1.15] mb-2 sm:mb-2.5">
              Just building secure <br className="hidden sm:inline" />
              <span>software that works.</span>
            </h1>

            {/* Bio */}
            <p className="text-xs sm:text-sm lg:text-[14.5px] text-neutral-600 dark:text-neutral-400 font-normal leading-relaxed max-w-2xl sm:max-w-3xl">
              {profile.bio}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
