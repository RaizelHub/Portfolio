import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import {
  fetchProjectLikeCount,
  toggleProjectLike,
  hasUserLiked,
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
  const [likes, setLikes] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [plusOnes, setPlusOnes] = useState<{ id: number; text: string }[]>([]);
  const { playClick } = useSound();

  useEffect(() => {
    let isMounted = true;
    setIsLiked(hasUserLiked(slug));

    // Fetch initial real DB count
    fetchProjectLikeCount(slug).then((count) => {
      if (isMounted) setLikes(count);
    });

    // Realtime subscription for live sync
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
    setPlusOnes((prev) => [...prev, { id: newId, text: nextLiked ? '+1 ❤️' : '-1' }]);

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
          className={`group relative inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono rounded-full border transition-all duration-200 cursor-pointer select-none ${
            isLiked
              ? 'bg-[var(--accent-soft)] border-[var(--accent)] text-[var(--accent)] font-semibold'
              : 'bg-[var(--surface)] border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--text-primary)]'
          }`}
        >
          <motion.div
            animate={isAnimating && isLiked ? { scale: [1, 1.45, 0.9, 1.15, 1] } : {}}
            transition={{ duration: 0.35 }}
          >
            <Heart
              className={`w-3.5 h-3.5 transition-colors ${
                isLiked ? 'fill-[var(--accent)] text-[var(--accent)]' : 'text-current group-hover:text-[var(--accent)]'
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
              className={`pointer-events-none absolute -top-2 right-2 text-xs font-mono font-bold select-none ${
                item.text.startsWith('+') ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'
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
          className={`group flex items-center gap-1.5 font-mono text-xs transition-colors cursor-pointer select-none ${
            isLiked
              ? 'text-[var(--accent)] font-semibold'
              : 'text-[var(--text-muted)] hover:text-[var(--accent)]'
          }`}
        >
          <motion.div
            animate={isAnimating && isLiked ? { scale: [1, 1.4, 0.9, 1.1, 1] } : {}}
            transition={{ duration: 0.35 }}
          >
            <Heart
              className={`w-3.5 h-3.5 transition-colors ${
                isLiked ? 'fill-[var(--accent)] text-[var(--accent)]' : 'text-current'
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
              className="pointer-events-none absolute -top-2 right-0 text-[11px] font-mono font-bold text-[var(--accent)] select-none"
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
        className={`group relative flex items-center gap-2 border px-3.5 py-1.5 font-mono text-xs transition-all duration-200 cursor-pointer select-none ${
          isLiked
            ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)] font-semibold shadow-xs'
            : 'border-[var(--border-subtle)] bg-[var(--surface)] text-[var(--text-secondary)] hover:border-[var(--border)] hover:text-[var(--text-primary)] hover:-translate-y-px'
        }`}
      >
        <motion.div
          animate={isAnimating && isLiked ? { scale: [1, 1.5, 0.85, 1.2, 1], rotate: [0, -12, 12, -6, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="shrink-0"
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors ${
              isLiked ? 'fill-[var(--accent)] text-[var(--accent)]' : 'text-current group-hover:text-[var(--accent)]'
            }`}
          />
        </motion.div>

        <span>{isLiked ? 'Liked' : 'Like'}</span>
        <span className="opacity-40">·</span>
        <span className="font-semibold">{likes}</span>
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
            className={`pointer-events-none absolute -top-3 right-3 text-xs font-mono font-bold select-none ${
              item.text.startsWith('+') ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'
            }`}
          >
            {item.text}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
};
