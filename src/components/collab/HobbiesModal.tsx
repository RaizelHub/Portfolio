import { useState } from 'react';
import {
  ArrowRight,
  ExternalLink,
  Github,
  HeartHandshake,
  Mail,
  X,
} from 'lucide-react';
import { profile } from '../../data/profile';
import { useSound } from '../../context/SoundContext';

type Props = {
  initialTab?: 'basketball' | 'gaming';
  onClose: () => void;
};

type ShotResult = {
  made: boolean;
  shout: string;
  message: string;
} | null;

export function HobbiesModal({ onClose }: Props) {
  const { playClick, playCoinChime, playEmoteChime } = useSound();
  const [shotCount, setShotCount] = useState(0);
  const [makesCount, setMakesCount] = useState(0);
  const [lastShot, setLastShot] = useState<ShotResult>(null);
  const [isShooting, setIsShooting] = useState(false);

  const handleShoot = () => {
    if (isShooting) return;
    setIsShooting(true);
    playClick();

    setTimeout(() => {
      const isMake = Math.random() > 0.45;
      setShotCount((c) => c + 1);

      if (isMake) {
        setMakesCount((m) => m + 1);
        playEmoteChime();
        setLastShot({
          made: true,
          shout: 'YES!',
          message: 'SWISH! Clean 3-pointer from downtown!',
        });
      } else {
        playCoinChime();
        setLastShot({
          made: false,
          shout: 'YAWA WALA!',
          message: 'Clank! In-and-out off the back iron. Yawa wala!',
        });
      }
      setIsShooting(false);
    }, 600);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto border-2 border-black bg-white p-6 shadow-2xl font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-black pb-3 mb-5">
          <div>
            <span className="font-mono text-xs font-bold uppercase text-black">
              🏀 Basketball · Janmark's Hobby
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-black hover:opacity-60"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Basketball Section */}
        <div className="space-y-4">
          <div className="border-2 border-black bg-[#fafafa] p-4">
            <span className="block font-mono text-[10px] font-bold uppercase text-[#666666] mb-1">
              Sport & Team Activity
            </span>
            <h3 className="font-title text-base font-bold text-black uppercase mb-2">
              Street & Half-Court Basketball
            </h3>
            <p className="text-xs text-black leading-relaxed font-medium mb-3">
              When stepping away from VS Code and debugging sessions, basketball is my go-to physical recharge. I love running fast-break 3v3 pickup games with friends and neighborhood kids — practicing step-back 3-pointers, court vision, and high-tempo defense.
            </p>
            <div className="border-l-2 border-black bg-white p-2.5 text-[11px] font-mono font-semibold text-black">
              Court Philosophy: If it swishes, shout "YES!". If it bricks the rim, shout "YAWA WALA!" and run back on defense!
            </div>
          </div>

          {/* Interactive Hoop Mini-Game */}
          <div className="border-2 border-black bg-white p-4">
            <div className="flex items-center justify-between border-b border-black pb-2 mb-3">
              <strong className="font-mono text-xs uppercase font-bold text-black">
                Interactive 3-Point Shootout
              </strong>
              <span className="font-mono text-[10px] text-[#444444]">
                Score: {makesCount} / {shotCount} ({shotCount > 0 ? Math.round((makesCount / shotCount) * 100) : 0}%)
              </span>
            </div>

            <p className="font-mono text-[11px] text-[#444444] mb-3">
              Test your luck at Janmark's campus hoop:
            </p>

            <div className="flex items-center gap-3">
              <button
                type="button"
                disabled={isShooting}
                onClick={handleShoot}
                className="border-2 border-black bg-black px-4 py-2 text-xs font-mono font-bold uppercase text-white hover:bg-[#333333] transition-colors disabled:opacity-50"
              >
                {isShooting ? 'Shooting…' : 'Shoot 3-Pointer'}
              </button>

              {lastShot && (
                <div
                  className={`border border-black px-3 py-1.5 text-xs font-mono font-bold animate-fade-in ${
                    lastShot.made ? 'bg-[#e8f5e9] text-[#1b5e20]' : 'bg-[#ffebee] text-[#b71c1c]'
                  }`}
                >
                  <strong className="text-sm mr-2">{lastShot.shout}</strong>
                  <span>{lastShot.message}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action / Recruiter Buttons */}
        <div className="border-t border-black pt-4 mt-6 flex flex-wrap items-center justify-between gap-3">
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 border border-black bg-white px-3 py-2 text-xs font-mono text-black hover:bg-black hover:text-white transition-colors"
          >
            <Github className="h-3.5 w-3.5" />
            <span>GitHub Profile</span>
            <ExternalLink className="h-3 w-3" />
          </a>

          <div className="flex items-center gap-2">
            <a
              href={`mailto:${profile.email}?subject=Let's%20Connect`}
              className="flex items-center gap-1.5 border border-black bg-white px-3 py-2 text-xs font-mono text-black hover:bg-black hover:text-white transition-colors"
            >
              <Mail className="h-3.5 w-3.5" />
              <span>Email Janmark</span>
            </a>

            <a
              href="/#contact"
              className="flex items-center gap-1.5 border border-black bg-black px-4 py-2 text-xs font-mono font-bold uppercase text-white hover:bg-[#333333] transition-colors"
            >
              <HeartHandshake className="h-3.5 w-3.5" />
              <span>Get in Touch</span>
              <ArrowRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
