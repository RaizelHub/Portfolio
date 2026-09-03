import { useMemo } from 'react';
import { ArrowRight, Compass, MoveUpRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionContainer } from '../../components/layout/SectionContainer';
import { VisitorAvatar } from '../../components/ui/VisitorAvatar';
import { getOrCreateLocalVisitorProfile } from '../../lib/analytics/visitorProfile';

export function CollabSection() {
  const visitor = useMemo(() => getOrCreateLocalVisitorProfile(), []);

  return (
    <SectionContainer id="collab" className="border-b-2 border-black dark:border-white py-[var(--section-space)]">
      <div className="grid items-center gap-10 lg:grid-cols-[.82fr_1.18fr] lg:gap-16">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 border-2 border-black dark:border-white bg-[var(--surface)] px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--text-primary)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
            <Compass className="h-3 w-3 text-[var(--accent)]" strokeWidth={2.5} />
            <span>Interactive World</span>
          </div>
          <h2 className="section-heading mb-5 text-[var(--text-primary)] font-black">
            Where each project becomes a place.
          </h2>
          <p className="body-copy mb-7 text-[var(--text-secondary)] font-medium">
            Step into a shared 2D developer campus as <strong className="text-[var(--text-primary)] font-bold">{visitor.displayName}</strong>. Walk between real project buildings, inspect engineering architecture, and collaborate with other visitors in real time.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/collab"
              className="group inline-flex min-h-11 items-center gap-2.5 border-2 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black px-5 py-2.5 font-mono text-xs font-bold uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] transition-all duration-120 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            >
              <span>Enter 2D World</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
            </Link>
            <span className="font-mono text-[11px] font-bold text-[var(--text-muted)] flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[var(--accent)]" />
              <span>No signup required · Anonymous persistence</span>
            </span>
          </div>
        </div>

        <Link
          to="/collab"
          aria-label="Enter the 2D Multiplayer Portfolio World"
          className="group relative block aspect-[16/10] overflow-hidden border-2 border-black dark:border-white bg-[#141411] p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] transition-all duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]"
        >
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(#2c2a23_1px,transparent_1px),linear-gradient(90deg,#2c2a23_1px,transparent_1px)] [background-size:28px_28px]" />

          {/* Miniature Campus Districts Preview */}
          <div className="relative grid h-full grid-cols-3 gap-2.5">
            <div className="flex flex-col justify-between border-2 border-black dark:border-white bg-[#1e1e1a]/95 p-3.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
              <span className="font-mono text-[8px] font-bold tracking-[.18em] text-[#a69c8b]">MOBILE</span>
              <div>
                <strong className="block font-title text-base font-bold text-[#ede9df]">Subora</strong>
                <span className="font-mono text-[8px] font-semibold text-[#8e897d]">Finance & Bills</span>
              </div>
            </div>

            <div className="flex flex-col justify-between border-2 border-black dark:border-white bg-[#2a2923]/95 p-3.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
              <span className="font-mono text-[8px] font-bold tracking-[.18em] text-[#d4cbba]">CAMPUS CENTER</span>
              <div>
                <strong className="block font-title text-lg font-bold text-[#faf6ec]">Collab HQ</strong>
                <span className="font-mono text-[8px] font-semibold text-[#b8a78e]">Shared Whiteboard</span>
              </div>
            </div>

            <div className="flex flex-col justify-between border-2 border-black dark:border-white bg-[#1e1e1a]/95 p-3.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
              <span className="font-mono text-[8px] font-bold tracking-[.18em] text-[#a69c8b]">MOBILE AI</span>
              <div>
                <strong className="block font-title text-base font-bold text-[#ede9df]">Vocara</strong>
                <span className="font-mono text-[8px] font-semibold text-[#8e897d]">Voice Prep</span>
              </div>
            </div>
          </div>

          {/* Visitor Spawn Avatar Inlay */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
            <div className="flex items-center gap-2 border-2 border-black dark:border-white bg-[#181814] px-3 py-1 text-[10px] font-mono font-bold text-[#ece8dd] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
              <VisitorAvatar
                displayName={visitor.displayName}
                avatarUrl={visitor.avatarUrl}
                avatarSeed={visitor.avatarSeed}
                size="xs"
              />
              <span>{visitor.displayName}</span>
            </div>
          </div>

          <div className="absolute right-3.5 top-3.5 grid h-8 w-8 place-items-center border-2 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <MoveUpRight className="h-4 w-4" strokeWidth={2.5} />
          </div>
        </Link>
      </div>
    </SectionContainer>
  );
}
