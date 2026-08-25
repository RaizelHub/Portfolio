import React, { useState } from 'react';
import {
  Coffee,
  Sparkles,
  Zap,
  Flame,
  Check,
  X,
} from 'lucide-react';
import { useSound } from '../../context/SoundContext';
import { spawnParticleBurst } from '../../lib/utils/particles';

export type CoffeeDrink = {
  id: string;
  name: string;
  category: string;
  tagline: string;
  speedMultiplier: number;
  durationSeconds: number;
  trailColorHex: string;
  trailColorPhaser: number;
  icon: typeof Coffee;
  bgGradient: string;
};

export const DRINK_MENU: CoffeeDrink[] = [
  {
    id: 'espresso-overclock',
    name: 'Espresso Overclock',
    category: 'Double Shot Pure Arabica',
    tagline: '100x compiler speed & ultra-sharp focus.',
    speedMultiplier: 1.6,
    durationSeconds: 45,
    trailColorHex: '#f59e0b',
    trailColorPhaser: 0xf59e0b,
    icon: Zap,
    bgGradient: 'from-amber-500/20 to-orange-500/20',
  },
  {
    id: 'matcha-ai',
    name: 'Matcha AI Optimizer',
    category: 'Ceremonial Grade Uji Matcha',
    tagline: 'Smooth low-latency inference & zero jitter.',
    speedMultiplier: 1.45,
    durationSeconds: 45,
    trailColorHex: '#10b981',
    trailColorPhaser: 0x10b981,
    icon: Sparkles,
    bgGradient: 'from-emerald-500/20 to-teal-500/20',
  },
  {
    id: 'debugging-boba',
    name: 'Debugging Brown Sugar Boba',
    category: 'Fresh Milk & Tapioca Pearls',
    tagline: 'Instantly dissolves pesky race conditions.',
    speedMultiplier: 1.5,
    durationSeconds: 45,
    trailColorHex: '#06b6d4',
    trailColorPhaser: 0x06b6d4,
    icon: Coffee,
    bgGradient: 'from-cyan-500/20 to-blue-500/20',
  },
  {
    id: 'nitro-coldbrew',
    name: 'Nitro Cold Brew Turbo',
    category: '24hr Steeped Cold Extraction',
    tagline: 'Lightning reflexes for full-court fast breaks.',
    speedMultiplier: 1.75,
    durationSeconds: 45,
    trailColorHex: '#8b5cf6',
    trailColorPhaser: 0x8b5cf6,
    icon: Flame,
    bgGradient: 'from-purple-500/20 to-indigo-500/20',
  },
];

type Props = {
  activeBuff: { drink: CoffeeDrink; expiresAt: number } | null;
  onDrinkOrdered: (drink: CoffeeDrink) => void;
  onClose: () => void;
};

export const CoffeeCartModal: React.FC<Props> = ({
  activeBuff,
  onDrinkOrdered,
  onClose,
}) => {
  const [brewingDrinkId, setBrewingDrinkId] = useState<string | null>(null);
  const { playCoinChime, playClick } = useSound();

  const handleOrder = (drink: CoffeeDrink, e: React.MouseEvent) => {
    playClick();
    setBrewingDrinkId(drink.id);

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    spawnParticleBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, {
      type: 'sparkle',
      count: 22,
      colors: [drink.trailColorHex, '#ffffff', '#fbbf24'],
    });

    setTimeout(() => {
      playCoinChime();
      onDrinkOrdered(drink);
      setBrewingDrinkId(null);
    }, 700);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl border-2 border-black bg-white shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-black bg-black px-5 py-4 text-white">
          <div className="flex items-center gap-2.5">
            <Coffee className="h-5 w-5 text-amber-400" />
            <div>
              <h2 className="font-mono text-sm font-bold uppercase tracking-wider">
                Developer Fuel · Artisan Street Coffee & Boba
              </h2>
              <p className="text-[10px] font-mono text-zinc-400">
                Freshly roasted on campus · All drinks grant 45s speed buffs & pixel trails
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

        {/* Active Buff Notice */}
        {activeBuff && (
          <div className="border-b border-black bg-amber-50 px-5 py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-500 animate-ping" />
              <span className="font-mono text-xs font-bold text-amber-900">
                Active Buff: {activeBuff.drink.name} (+{Math.round((activeBuff.drink.speedMultiplier - 1) * 100)}% Speed)
              </span>
            </div>
            <span className="font-mono text-[11px] text-amber-700 font-semibold">
              Trail: {activeBuff.drink.trailColorHex}
            </span>
          </div>
        )}

        {/* Menu Grid */}
        <div className="p-5 grid gap-3 sm:grid-cols-2">
          {DRINK_MENU.map((drink) => {
            const Icon = drink.icon;
            const isBrewing = brewingDrinkId === drink.id;
            const isActive = activeBuff?.drink.id === drink.id;

            return (
              <div
                key={drink.id}
                className={`border border-black p-4 flex flex-col justify-between transition-all hover:shadow-md ${
                  isActive ? 'bg-amber-50/60 border-amber-600' : 'bg-white hover:bg-zinc-50/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className="p-2 border border-black rounded-sm"
                      style={{ backgroundColor: `${drink.trailColorHex}20` }}
                    >
                      <Icon className="h-4 w-4 text-black" />
                    </div>
                    <span className="font-mono text-[10px] font-bold uppercase px-2 py-0.5 border border-black bg-zinc-100 text-black">
                      +{Math.round((drink.speedMultiplier - 1) * 100)}% Speed
                    </span>
                  </div>

                  <h3 className="font-mono text-xs font-bold text-black">{drink.name}</h3>
                  <span className="block text-[10px] font-mono text-zinc-500 mb-1.5">
                    {drink.category}
                  </span>
                  <p className="text-[11px] text-zinc-700 leading-snug">{drink.tagline}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-200 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-zinc-500">45 Seconds Buff</span>
                  <button
                    type="button"
                    disabled={isBrewing}
                    onClick={(e) => handleOrder(drink, e)}
                    className="flex items-center gap-1.5 border border-black bg-black px-3 py-1.5 text-xs font-mono font-bold uppercase text-white hover:bg-zinc-800 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isBrewing ? (
                      <>
                        <div className="h-3 w-3 animate-spin border border-white border-t-transparent rounded-full" />
                        <span>Brewing…</span>
                      </>
                    ) : isActive ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-amber-400" />
                        <span>Active</span>
                      </>
                    ) : (
                      <>
                        <span>Order Drink</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Lore Note */}
        <div className="border-t border-black bg-zinc-100 px-5 py-3 text-center">
          <p className="font-mono text-[10px] text-zinc-600">
            💡 Pro-tip: Drink a nitro cold brew before challenging the 3-point shootout or exploring the campus perimeter!
          </p>
        </div>
      </div>
    </div>
  );
};
