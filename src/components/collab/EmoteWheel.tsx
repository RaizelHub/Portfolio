import { X } from 'lucide-react';
import { useSound } from '../../context/SoundContext';

type Props = {
  onSelectReaction: (type: 'wave' | 'heart' | 'sparkle') => void;
  onClose: () => void;
};

const EMOTES = [
  { type: 'wave' as const, emoji: '👋', label: 'Wave Hello', shortcut: '1' },
  { type: 'sparkle' as const, emoji: '✨', label: 'Awesome / Sparkle', shortcut: '2' },
  { type: 'heart' as const, emoji: '❤️', label: 'Love This', shortcut: '3' },
];

export function EmoteWheel({ onSelectReaction, onClose }: Props) {
  const { playClick } = useSound();

  const handleChoose = (type: 'wave' | 'heart' | 'sparkle') => {
    playClick();
    onSelectReaction(type);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xs border-2 border-black bg-white p-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-black pb-2 mb-4">
          <span className="font-mono text-xs font-bold uppercase text-black">Express Reaction [Q]</span>
          <button type="button" onClick={onClose} className="text-black hover:opacity-60">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {EMOTES.map((em) => (
            <button
              key={em.type}
              type="button"
              onClick={() => handleChoose(em.type)}
              className="flex flex-col items-center gap-1.5 border border-black bg-white p-3 hover:bg-black hover:text-white transition-colors group"
            >
              <span className="text-2xl">{em.emoji}</span>
              <span className="font-mono text-[9px] font-bold uppercase">{em.label}</span>
              <span className="font-mono text-[8px] text-[#888888] group-hover:text-[#cccccc]">[{em.shortcut}]</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
