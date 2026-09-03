import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  hasUserLiked,
  getCachedLikeCounts,
  toggleProjectLike,
  subscribeToProjectLikes,
} from '../../lib/projectLikes';
import { useSound } from '../../context/SoundContext';

interface ProjectLikeButtonProps {
  slug: string;
  projectName?: string;
  variant?: 'default' | 'compact' | 'badge';
  className?: string;
}

export const ProjectLikeButton: React.FC<ProjectLikeButtonProps> = ({
  slug,
  projectName = 'project',
  variant = 'default',
  className = '',
}) => {
  const [likes, setLikes] = useState<number>(() => {
    const cached = getCachedLikeCounts();
    return cached[slug] ?? 0;
  });
  const [isLiked, setIsLiked] = useState<boolean>(() => hasUserLiked(slug));
  const [isAnimating, setIsAnimating] = useState(false);
  const [plusOnes, setPlusOnes] = useState<{ id: number; text: string }[]>([]);
  const { playClick } = useSound();

  useEffect(() => {
    let isMounted = true;
    setIsLiked(hasUserLiked(slug));

    // Fast memory read
    const cached = getCachedLikeCounts();
    if (cached[slug] !== undefined) {
      setLikes(cached[slug]);
    }

    // Realtime subscription for live sync across visitors
    const unsubscribe = subscribeToProjectLikes(slug, (newCount) => {
      if (isMounted) {
        setLikes(newCount);
      }
    });

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [slug]);

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      playClick();
    } catch {
      // ignore
    }

    const nextLiked = !isLiked;
    setIsAnimating(true);

    const newId = Date.now() + Math.random();
    setPlusOnes((prev) => [...prev, { id: newId, text: nextLiked ? '+1' : '-1' }]);

    setTimeout(() => {
      setPlusOnes((prev) => prev.filter((item) => item.id !== newId));
    }, 900);

    // Optimistic UI update (1 like per person)
    setIsLiked(nextLiked);
    setLikes((prev) => Math.max(0, nextLiked ? prev + 1 : prev - 1));

    // Real DB toggle
    const res = await toggleProjectLike(slug);
    setLikes(res.newCount);
    setIsLiked(res.isLiked);

    setTimeout(() => setIsAnimating(false), 400);
  };

  if (variant === 'badge') {
    return (
      <div className={`relative inline-flex items-center ${className}`}>
        <button
          type="button"
          onClick={handleToggle}
          title={isLiked ? `Unlike ${projectName}` : `Like ${projectName} (1 like per person)`}
          aria-label={isLiked ? `Unlike ${projectName}` : `Like ${projectName}, current likes: ${likes}`}
          className={`group relative inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono font-bold border-2 border-black dark:border-white transition-all duration-120 cursor-pointer select-none active:translate-x-0.5 active:translate-y-0.5 active:shadow-none ${isLiked
              ? 'bg-[var(--surface-elevated)] text-[var(--text-primary)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]'
              : 'bg-[var(--surface)] text-[var(--text-secondary)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:text-[var(--text-primary)]'
            }`}
        >
          <motion.div
            animate={isAnimating && isLiked ? { scale: [1, 1.45, 0.9, 1.15, 1] } : {}}
            transition={{ duration: 0.35 }}
          >
            <Heart
              className={`w-3.5 h-3.5 transition-colors ${isLiked ? 'fill-rose-500 text-rose-500' : 'text-rose-500 group-hover:fill-rose-500'
                }`}
            />
          </motion.div>
          <span>{likes}</span>
        </button>

        {/* Floating feedback animation */}
        <AnimatePresence>
          {plusOnes.map((item) => (
            <motion.span
              key={item.id}
              initial={{ opacity: 1, y: 0, scale: 0.8 }}
              animate={{ opacity: 0, y: -22, scale: 1.2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.75, ease: 'easeOut' }}
              className={`pointer-events-none absolute -top-2 right-2 text-xs font-mono font-black select-none ${item.text.startsWith('+') ? 'text-rose-500' : 'text-[var(--text-muted)]'
                }`}
            >
              {item.text}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`relative inline-flex items-center ${className}`}>
        <button
          type="button"
          onClick={handleToggle}
          title={isLiked ? `Unlike ${projectName}` : `Like ${projectName}`}
          aria-label={isLiked ? `Unlike ${projectName}` : `Like ${projectName}, current likes: ${likes}`}
          className={`group flex items-center gap-1.5 border border-black dark:border-white bg-[var(--surface-elevated)] px-2 py-0.5 font-mono text-xs font-bold text-[var(--text-primary)] shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] dark:shadow-[1.5px_1.5px_0px_0px_rgba(255,255,255,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer select-none`}
        >
          <motion.div
            animate={isAnimating && isLiked ? { scale: [1, 1.4, 0.9, 1.1, 1] } : {}}
            transition={{ duration: 0.35 }}
          >
            <Heart
              className={`w-3.5 h-3.5 transition-colors ${isLiked ? 'fill-rose-500 text-rose-500' : 'text-rose-500 group-hover:fill-rose-500'
                }`}
            />
          </motion.div>
          <span>{likes}</span>
        </button>

        {/* Floating feedback animation */}
        <AnimatePresence>
          {plusOnes.map((item) => (
            <motion.span
              key={item.id}
              initial={{ opacity: 1, y: 0, scale: 0.8 }}
              animate={{ opacity: 0, y: -18, scale: 1.1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="pointer-events-none absolute -top-2 right-0 text-[11px] font-mono font-black text-rose-500 select-none"
            >
              {item.text}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
    );
  }

  // Default button variant
  return (
    <div className={`relative inline-flex items-center ${className}`}>
      <button
        type="button"
        onClick={handleToggle}
        title={isLiked ? `Click to unlike ${projectName}` : `Like this project (1 like per person)`}
        aria-label={isLiked ? `Unlike ${projectName}` : `Like ${projectName}, current likes: ${likes}`}
        className={`group relative flex items-center gap-2 border-2 border-black dark:border-white px-3.5 py-1.5 font-mono text-xs font-bold transition-all duration-120 cursor-pointer select-none active:translate-x-0.5 active:translate-y-0.5 active:shadow-none ${isLiked
            ? 'bg-[var(--surface-elevated)] text-[var(--text-primary)] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]'
            : 'bg-[var(--surface)] text-[var(--text-primary)] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]'
          }`}
      >
        <motion.div
          animate={isAnimating && isLiked ? { scale: [1, 1.5, 0.85, 1.2, 1], rotate: [0, -12, 12, -6, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="shrink-0"
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors ${isLiked ? 'fill-rose-500 text-rose-500' : 'text-rose-500 group-hover:fill-rose-500'
              }`}
          />
        </motion.div>

        <span>{isLiked ? 'Liked' : 'Like'}</span>
        <span className="opacity-40">|</span>
        <span className="font-bold">{likes}</span>
      </button>

      {/* Floating feedback animation */}
      <AnimatePresence>
        {plusOnes.map((item) => (
          <motion.span
            key={item.id}
            initial={{ opacity: 1, y: 0, scale: 0.8 }}
            animate={{ opacity: 0, y: -24, scale: 1.3 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={`pointer-events-none absolute -top-3 right-3 text-xs font-mono font-black select-none ${item.text.startsWith('+') ? 'text-rose-500' : 'text-[var(--text-muted)]'
              }`}
          >
            {item.text}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
};
