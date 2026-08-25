import { useState } from 'react';
import {
  ArrowRight,
  Check,
  Copy,
  ExternalLink,
  Github,
  HeartHandshake,
  Mail,
  X,
} from 'lucide-react';
import { profile } from '../../data/profile';
import { useSound } from '../../context/SoundContext';

type Props = {
  onClose: () => void;
};

type BeggarTopic = 'why' | 'smell' | 'costs' | 'code' | 'help';
type TipMode = 'ingame' | 'gcash_maribank';

const DONATION_TIERS = [
  { id: 'tier-1', amount: '$1', label: 'Ramen Token', desc: 'Fuels 2 hrs of debugging', smellReduction: 5 },
  { id: 'tier-3', amount: '$3', label: 'Coffee Byte', desc: 'Increases typing speed by 40%', smellReduction: 15 },
  { id: 'tier-5', amount: '$5', label: 'Cloud Server Drop', desc: 'Funds Supabase Edge Functions', smellReduction: 30 },
  { id: 'tier-10', amount: '$10', label: 'Soap & Deployment', desc: 'Funds cloud hosting + buys soap', smellReduction: 60 },
];

export function BudgetBeggarModal({ onClose }: Props) {
  const { playClick, playCoinChime } = useSound();
  const [activeTopic, setActiveTopic] = useState<BeggarTopic>('why');
  const [tipMode, setTipMode] = useState<TipMode>('ingame');
  const [donatedTotal, setDonatedTotal] = useState(0);
  const [tossedNote, setTossedNote] = useState<string | null>(null);
  const [copiedGcash, setCopiedGcash] = useState(false);
  const [copiedMariBank, setCopiedMariBank] = useState(false);

  const topics: Record<BeggarTopic, { title: string; speech: string; highlight: string }> = {
    why: {
      title: 'Why are you sitting on the pavement begging?',
      speech:
        "Hey friend! The code for Subora and Vocara is 100% written, unit-tested, and runs smoothly on local Android devices and Supabase. But when pushing to live cloud and app stores, the developer verification and hosting costs asked for funds my developer wallet does not have yet.",
      highlight:
        'Software is completely engineered — seeking a full-time engineering role or sponsorship to fund live cloud servers.',
    },
    smell: {
      title: 'Why is there green steam rising from your head?',
      speech:
        "That is the signature '72-Hour Debug Odor'. I spent consecutive days non-stop optimizing WebSocket reconnection logic, PostgreSQL RLS policies, and offline cache state machines without taking a break.",
      highlight:
        'Debug Focus: 100% · TypeScript Architecture Reliability: 100%',
    },
    costs: {
      title: 'What does deploying an app actually cost?',
      speech:
        'Here is the real breakdown: Apple Developer Program is $99/year, Google OAuth Brand Verification costs $75+, production Groq/OpenAI streaming API quotas require monthly usage, and dedicated cloud databases scale quickly. Without a budget, keeping local prototypes alive is free and fast.',
      highlight:
        'Estimated live operational cost: ~$250/yr + API usage per active user.',
    },
    code: {
      title: 'Can I see and run the code anyway?',
      speech:
        'YES! The full source code repositories, Expo configurations, and Supabase Edge Functions are completely public on my GitHub. You can clone them, add your own API keys, and run them locally right now.',
      highlight: 'Check out the repositories on GitHub to review clean TypeScript architecture.',
    },
    help: {
      title: 'How can I help you get deployed?',
      speech:
        'The best way to solve this is to hire me as your Full-Stack Developer! That funds production cloud hosting permanently. Small donations and tips are also happily accepted in my jar via GCash or MariBank.',
      highlight: 'Ready to build production systems for your team.',
    },
  };

  const handleSelect = (topic: BeggarTopic) => {
    playClick();
    setActiveTopic(topic);
  };

  const handleTossCoin = (tier: typeof DONATION_TIERS[0]) => {
    playCoinChime();
    const val = parseInt(tier.amount.replace('$', ''), 10);
    setDonatedTotal((prev) => prev + val);
    setTossedNote(`Tossed ${tier.amount} (${tier.label}) into the jar! Stink reduced by ${tier.smellReduction}%.`);

    setTimeout(() => {
      setTossedNote(null);
    }, 3500);
  };

  const handleCopyGcash = () => {
    playCoinChime();
    if (profile.gcashNumber) {
      navigator.clipboard.writeText(profile.gcashNumber.replace(/\s+/g, ''));
      setCopiedGcash(true);
      setTimeout(() => setCopiedGcash(false), 2000);
    }
  };

  const handleCopyMariBank = () => {
    playCoinChime();
    if (profile.maribankNumber) {
      navigator.clipboard.writeText(profile.maribankNumber.replace(/\s+/g, ''));
      setCopiedMariBank(true);
      setTimeout(() => setCopiedMariBank(false), 2000);
    }
  };

  const current = topics[activeTopic];

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
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold uppercase text-black">
              Campus Easter Egg · The Budget-Seeking Developer
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

        {/* Cardboard Box Sign & Speech Area */}
        <div className="grid grid-cols-1 sm:grid-cols-[150px_1fr] gap-4 items-center mb-6">
          {/* Cardboard Sign Graphic */}
          <div className="border-2 border-black bg-[#f4ebd0] p-3 text-center rotate-[-2deg] shadow-md">
            <span className="block font-mono text-[8px] font-bold text-[#888888] uppercase tracking-wider">
              [ CARDBOARD SIGN ]
            </span>
            <strong className="block font-title text-sm font-bold text-black uppercase mt-1 leading-tight">
              WILL CODE FULL-STACK FOR CLOUD BUDGET
            </strong>
            <span className="block font-mono text-[8px] text-black font-bold mt-1.5 bg-[#e8f5e9] p-0.5 border border-black">
              GCASH / MARIBANK ACCEPTED
            </span>
            <span className="block font-mono text-[8px] text-[#555555] mt-1">
              Tip Jar: ${donatedTotal}.00
            </span>
          </div>

          {/* Speech Bubble */}
          <div className="border-2 border-black bg-white p-4 shadow-sm relative">
            <span className="block font-mono text-[10px] font-bold uppercase text-[#666666] mb-1">
              Janmark Suelto says:
            </span>
            <p className="text-xs text-black leading-relaxed font-medium mb-3">
              "{current.speech}"
            </p>
            <div className="border-l-2 border-black bg-[#f5f5f5] p-2 text-[11px] font-mono font-semibold text-black">
              {current.highlight}
            </div>
          </div>
        </div>

        {/* Small Donations & Tip Jar Widget */}
        <div className="border-2 border-black bg-[#fafafa] p-4 mb-6">
          <div className="flex items-center justify-between border-b border-black pb-2 mb-3">
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-xs font-bold uppercase text-black">
                Small Donations / Coffee Jar
              </span>
            </div>

            {/* Mode Switcher */}
            <div className="flex gap-1 border border-black p-0.5 bg-white">
              <button
                type="button"
                onClick={() => {
                  playClick();
                  setTipMode('ingame');
                }}
                className={`px-2 py-0.5 text-[10px] font-mono font-bold transition-colors ${
                  tipMode === 'ingame' ? 'bg-black text-white' : 'text-black hover:bg-[#eee]'
                }`}
              >
                In-Game Coin
              </button>
              <button
                type="button"
                onClick={() => {
                  playClick();
                  setTipMode('gcash_maribank');
                }}
                className={`px-2 py-0.5 text-[10px] font-mono font-bold transition-colors ${
                  tipMode === 'gcash_maribank' ? 'bg-black text-white' : 'text-black hover:bg-[#eee]'
                }`}
              >
                GCash / MariBank
              </button>
            </div>
          </div>

          {tipMode === 'ingame' ? (
            <div>
              <p className="font-mono text-[11px] text-[#444444] mb-3">
                Toss a simulated coin into Janmark's tip jar to fund server hosting (or hire him to solve cloud hosting permanently):
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
                {DONATION_TIERS.map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => handleTossCoin(tier)}
                    className="flex flex-col items-center justify-center border border-black bg-white p-2.5 hover:bg-black hover:text-white transition-colors group text-center"
                  >
                    <strong className="font-mono text-xs font-bold">{tier.amount}</strong>
                    <span className="font-mono text-[9px] font-semibold">{tier.label}</span>
                    <span className="font-mono text-[8px] text-[#888888] group-hover:text-[#cccccc] mt-0.5">
                      {tier.desc}
                    </span>
                  </button>
                ))}
              </div>

              {tossedNote && (
                <div className="flex items-center gap-2 border border-black bg-white p-2 text-xs font-mono font-bold text-black animate-fade-in">
                  <span>{tossedNote}</span>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <p className="font-mono text-[11px] text-[#444444]">
                Want to sponsor real coffee or cloud deployment funds directly? Send via Philippine digital banking:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* GCash Box */}
                <div className="border-2 border-black bg-white p-3.5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <strong className="font-mono text-xs uppercase font-bold text-black">GCash</strong>
                      <span className="font-mono text-[9px] font-bold bg-[#e3f2fd] text-[#1565c0] px-1.5 py-0.5 border border-black">
                        Philippines
                      </span>
                    </div>
                    <span className="block font-mono text-[10px] text-[#666666]">Account Name: Janmark S.</span>
                    <strong className="block font-mono text-sm font-bold text-black mt-1 tracking-wider">
                      {profile.gcashNumber || '0969 022 1571'}
                    </strong>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyGcash}
                    className="mt-3 flex items-center justify-center gap-1.5 border border-black bg-black px-3 py-1.5 text-xs font-mono font-bold uppercase text-white hover:bg-[#333333] transition-colors"
                  >
                    {copiedGcash ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copiedGcash ? 'Copied Number!' : 'Copy GCash Number'}</span>
                  </button>
                </div>

                {/* MariBank Box */}
                <div className="border-2 border-black bg-white p-3.5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <strong className="font-mono text-xs uppercase font-bold text-black">MariBank / QRPh</strong>
                      <span className="font-mono text-[9px] font-bold bg-[#fff3e0] text-[#e65100] px-1.5 py-0.5 border border-black">
                        SeaBank / MariBank
                      </span>
                    </div>
                    <span className="block font-mono text-[10px] text-[#666666]">Account Name: Janmark Suelto</span>
                    <strong className="block font-mono text-sm font-bold text-black mt-1 tracking-wider">
                      {profile.maribankNumber || '0969 022 1571'}
                    </strong>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyMariBank}
                    className="mt-3 flex items-center justify-center gap-1.5 border border-black bg-black px-3 py-1.5 text-xs font-mono font-bold uppercase text-white hover:bg-[#333333] transition-colors"
                  >
                    {copiedMariBank ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copiedMariBank ? 'Copied Number!' : 'Copy MariBank Number'}</span>
                  </button>
                </div>
              </div>

              <div className="border-l-2 border-black bg-[#f5f5f5] p-2.5 text-[10px] font-mono text-[#333333] leading-relaxed">
                Note: Any amount is appreciated! Contributions help sponsor Supabase cloud databases, Groq AI inference quotas, and project deployment.
              </div>
            </div>
          )}
        </div>

        {/* Topic Selector Buttons */}
        <div className="mb-6">
          <span className="block font-mono text-[10px] uppercase font-bold text-[#666666] mb-2">
            Ask the developer:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {(Object.keys(topics) as BeggarTopic[]).map((key) => {
              const item = topics[key];
              const isSelected = activeTopic === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleSelect(key)}
                  className={`border border-black p-2.5 text-left text-xs font-mono transition-colors ${
                    isSelected ? 'bg-black text-white' : 'bg-white text-black hover:bg-[#f0f0f0]'
                  }`}
                >
                  <span>{item.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action / Recruiter Buttons */}
        <div className="border-t border-black pt-4 flex flex-wrap items-center justify-between gap-3">
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 border border-black bg-white px-3 py-2 text-xs font-mono text-black hover:bg-black hover:text-white transition-colors"
          >
            <Github className="h-3.5 w-3.5" />
            <span>Inspect GitHub Repos</span>
            <ExternalLink className="h-3 w-3" />
          </a>

          <div className="flex items-center gap-2">
            <a
              href={`mailto:${profile.email}?subject=Full-Stack%20Role%20Opportunity`}
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
              <span>Hire Me (Solve Cloud Budget)</span>
              <ArrowRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
