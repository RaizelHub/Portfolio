import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'emerald' | 'blue' | 'purple' | 'slate' | 'amber' | 'rose' | 'pink' | 'success' | 'danger';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'slate',
  className = '',
}) => {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide border';
  
  const variants = {
    emerald: 'bg-emerald-950/40 text-emerald-400 border-emerald-800/30',
    blue: 'bg-blue-950/40 text-blue-400 border-blue-800/30',
    purple: 'bg-purple-950/40 text-purple-400 border-purple-800/30',
    slate: 'bg-navy-800/60 text-slate-300 border-navy-700/60',
    amber: 'bg-amber-950/40 text-amber-400 border-amber-800/30',
    rose: 'bg-rose-950/40 text-rose-400 border-rose-800/30',
    pink: 'bg-pink-950/40 text-pink-400 border-pink-800/30',
    success: 'bg-emerald-900/30 text-emerald-400 border-emerald-800/30',
    danger: 'bg-rose-950/30 text-rose-400 border-rose-800/30',
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
