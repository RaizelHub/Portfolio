import React, { useState } from 'react';

interface VisitorAvatarProps {
  displayName: string;
  avatarUrl: string;
  avatarSeed?: string;
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZE_CLASSES = {
  '2xs': 'w-3.5 h-3.5 text-[7px]',
  xs: 'w-4.5 h-4.5 text-[8px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-base',
};

const BG_PALETTES = [
  'bg-amber-500/15 text-amber-500 border-amber-500/30',
  'bg-cyan-500/15 text-cyan-500 border-cyan-500/30',
  'bg-emerald-500/15 text-emerald-500 border-emerald-500/30',
  'bg-indigo-500/15 text-indigo-500 border-indigo-500/30',
  'bg-rose-500/15 text-rose-500 border-rose-500/30',
  'bg-violet-500/15 text-violet-500 border-violet-500/30',
];

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}

function getPaletteIndex(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % BG_PALETTES.length;
}

export const VisitorAvatar: React.FC<VisitorAvatarProps> = ({
  displayName,
  avatarUrl,
  avatarSeed = displayName,
  size = 'md',
  className = '',
}) => {
  const [imgError, setImgError] = useState(false);
  const sizeClass = SIZE_CLASSES[size];
  const palette = BG_PALETTES[getPaletteIndex(avatarSeed)];
  const initials = getInitials(displayName);

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 rounded-xl overflow-hidden border transition-all ${sizeClass} ${palette} ${className}`}
      title={`Anonymous Visitor: ${displayName}`}
    >
      {!imgError && avatarUrl ? (
        <img
          src={avatarUrl}
          alt={`Avatar for ${displayName}`}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="font-mono font-bold select-none tracking-tighter">
          {initials}
        </span>
      )}
    </div>
  );
};
