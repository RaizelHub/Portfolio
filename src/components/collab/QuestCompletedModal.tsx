import React, { useEffect } from 'react';
import {
  Trophy,
  GitCommit,
  Database,
  Code,
  Check,
  X,
} from 'lucide-react';
import { useSound } from '../../context/SoundContext';
import { spawnFullScreenConfetti } from '../../lib/utils/particles';

export type QuestStamp = {
  id: string;
  name: string;
  location: string;
  icon: typeof Trophy;
  description: string;
};

export const QUEST_STAMPS: QuestStamp[] = [
  {
    id: 'golden-git',
    name: 'Golden Git Commit',
    location: 'Behind Subora Hall',
    icon: GitCommit,
    description: 'Hash `d02e5f3` — Clean clean architecture with zero merge conflicts.',
  },
  {
    id: 'supabase-token',
    name: 'Supabase Realtime Token',
    location: 'Behind Vocara Hall',
    icon: Database,
    description: 'The spatial sync power cell enabling live presence across the world.',
  },
  {
    id: 'basketball-trophy',
    name: '3-Point Shootout Trophy',
    location: 'Basketball Court Bleachers',
    icon: Trophy,
    description: 'Awarded for sinking clutch 3-pointers shouting "YES!" without hesitation.',
  },
  {
    id: 'missing-semicolon',
    name: "Janmark's Missing Semicolon",
    location: 'Esports Gaming Lounge',
    icon: Code,
    description: 'The elusive syntax token that once held up a midnight release.',
  },
];

type Props = {
  collectedStampIds: string[];
  onClose: () => void;
};

export const QuestCompletedModal: React.FC<Props> = ({
  collectedStampIds,
  onClose,
}) => {
  const { playCoinChime } = useSound();
  const isAllCollected = collectedStampIds.length >= QUEST_STAMPS.length;

  useEffect(() => {
    if (isAllCollected) {
      playCoinChime();
      spawnFullScreenConfetti();
    }
  }, [isAllCollected, playCoinChime]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg border-2 border-black bg-white shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-black bg-black px-5 py-4 text-white">
          <div className="flex items-center gap-2.5">
            <Trophy className="h-5 w-5 text-amber-400" />
            <div>
              <h2 className="font-mono text-sm font-bold uppercase tracking-wider">
                Campus Explorer Stamp Rally
              </h2>
              <p className="text-[10px] font-mono text-zinc-400">
                {isAllCollected
                  ? '🌟 100% COMPLETE · VIP EXPLORER STATUS UNLOCKED'
                  : `Collect all 4 hidden items (${collectedStampIds.length}/4 Found)`}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1 border border-zinc-700 bg-zinc-900 px-2.5 py-1 text-xs font-mono font-bold uppercase text-white hover:bg-zinc-800 transition-colors"
          >
            <span>Close [ESC]</span>
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Quest Status Banner */}
        {isAllCollected ? (
          <div className="border-b border-black bg-amber-400 px-5 py-3 text-black text-center">
            <span className="font-mono text-xs font-black uppercase tracking-wider block">
              🎉 Congratulations! You are a Certified Campus VIP Explorer!
            </span>
            <span className="font-mono text-[10px] text-zinc-900 block mt-0.5">
              You discovered every hidden easter egg on Janmark's 2D developer campus.
            </span>
          </div>
        ) : (
          <div className="border-b border-black bg-zinc-100 px-5 py-2.5 flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-black">
              Hunt Progress: {collectedStampIds.length} / 4 Stamps
            </span>
            <span className="font-mono text-[11px] text-zinc-600">
              Walk near items to collect
            </span>
          </div>
        )}

        {/* Stamps List */}
        <div className="p-5 space-y-3">
          {QUEST_STAMPS.map((stamp) => {
            const Icon = stamp.icon;
            const isFound = collectedStampIds.includes(stamp.id);

            return (
              <div
                key={stamp.id}
                className={`border border-black p-3.5 flex items-start gap-3.5 transition-all ${
                  isFound ? 'bg-amber-50/50 border-black' : 'bg-zinc-50/80 border-zinc-300 opacity-60'
                }`}
              >
                <div
                  className={`p-2 border border-black shrink-0 ${
                    isFound ? 'bg-amber-400 text-black' : 'bg-zinc-200 text-zinc-400'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <h3 className="font-mono text-xs font-bold text-black truncate">
                      {stamp.name}
                    </h3>
                    {isFound ? (
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-emerald-700 bg-emerald-100 border border-emerald-300 px-2 py-0.5">
                        <Check className="h-3 w-3" />
                        <span>COLLECTED</span>
                      </span>
                    ) : (
                      <span className="font-mono text-[10px] text-zinc-500">
                        {stamp.location}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-zinc-600 leading-snug">
                    {stamp.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="border-t border-black bg-zinc-50 px-5 py-3.5 flex items-center justify-between">
          <p className="font-mono text-[10px] text-zinc-500">
            {isAllCollected ? 'Badge permanently saved to your browser session' : 'Explore corners and behind buildings!'}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="border border-black bg-black px-4 py-1.5 font-mono text-xs font-bold uppercase text-white hover:bg-zinc-800 transition-colors"
          >
            <span>Continue Exploring</span>
          </button>
        </div>
      </div>
    </div>
  );
};
