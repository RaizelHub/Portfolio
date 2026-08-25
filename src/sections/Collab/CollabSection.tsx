import { useMemo } from 'react';
import { ArrowRight, Compass, MoveUpRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SectionContainer } from '../../components/layout/SectionContainer';
import { VisitorAvatar } from '../../components/ui/VisitorAvatar';
import { getOrCreateLocalVisitorProfile } from '../../lib/analytics/visitorProfile';

export function CollabSection() {
  const visitor = useMemo(() => getOrCreateLocalVisitorProfile(), []);

  return (
    <SectionContainer id="collab" className="border-b border-[var(--border-subtle)] py-[var(--section-space)]">
      <div className="grid items-center gap-10 lg:grid-cols-[.82fr_1.18fr] lg:gap-16">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 border border-[var(--border-subtle)] bg-[var(--surface)] px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--accent)]">
            <Compass className="h-3 w-3" />
            <span>Interactive World</span>
          </div>
          <h2 className="section-heading mb-5 text-[var(--text-primary)]">
            Where each project becomes a place.
          </h2>
          <p className="body-copy mb-7 text-[var(--text-secondary)]">
            Step into a shared 2D developer campus as <strong className="text-[var(--text-primary)] font-medium">{visitor.displayName}</strong>. Walk between real project buildings, inspect engineering architecture, and collaborate with other visitors in real time.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/collab"
              className="group inline-flex min-h-11 items-center gap-2.5 border border-[var(--accent)] bg-[var(--accent)] px-5 py-2.5 font-mono text-xs font-bold uppercase text-[var(--background)] transition-all duration-200 hover:-translate-y-px hover:shadow-lg"
            >
              <span>Enter 2D World</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
            <span className="font-mono text-[11px] text-[var(--text-muted)] flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[var(--accent)]" />
              <span>No signup required · Anonymous persistence</span>
            </span>
          </div>
        </div>

        <Link
          to="/collab"
          aria-label="Enter the 2D Multiplayer Portfolio World"
          className="group relative block aspect-[16/10] overflow-hidden border border-[var(--border)] bg-[#141411] p-5 shadow-[var(--shadow-soft)] transition-all duration-300 hover:border-[var(--accent)]"
        >
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(#2c2a23_1px,transparent_1px),linear-gradient(90deg,#2c2a23_1px,transparent_1px)] [background-size:28px_28px]" />

          {/* Miniature Campus Districts Preview */}
          <div className="relative grid h-full grid-cols-3 gap-2.5">
            <div className="flex flex-col justify-between border border-[#3e3d36] bg-[#1e1e1a]/90 p-3.5">
              <span className="font-mono text-[8px] tracking-[.18em] text-[#a69c8b]">01 / MOBILE</span>
              <div>
                <strong className="block font-title text-base font-semibold text-[#ede9df]">Subora</strong>
                <span className="font-mono text-[8px] text-[#8e897d]">Finance & Bills</span>
              </div>
            </div>

            <div className="flex flex-col justify-between border border-[#5a5446] bg-[#2a2923]/90 p-3.5">
              <span className="font-mono text-[8px] tracking-[.18em] text-[#d4cbba]">CAMPUS CENTER</span>
              <div>
                <strong className="block font-title text-lg font-bold text-[#faf6ec]">Collab HQ</strong>
                <span className="font-mono text-[8px] text-[#b8a78e]">Shared Whiteboard</span>
              </div>
            </div>

            <div className="flex flex-col justify-between border border-[#3e3d36] bg-[#1e1e1a]/90 p-3.5">
              <span className="font-mono text-[8px] tracking-[.18em] text-[#a69c8b]">02 / MOBILE AI</span>
              <div>
                <strong className="block font-title text-base font-semibold text-[#ede9df]">Vocara</strong>
                <span className="font-mono text-[8px] text-[#8e897d]">Voice Prep</span>
              </div>
            </div>
          </div>

          {/* Visitor Spawn Avatar Inlay */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center z-10">
            <div className="flex items-center gap-2 rounded-full border border-[#4d483c] bg-[#181814]/95 px-3 py-1 text-[10px] font-mono text-[#ece8dd] shadow-md">
              <VisitorAvatar
                displayName={visitor.displayName}
                avatarUrl={visitor.avatarUrl}
                avatarSeed={visitor.avatarSeed}
                size="xs"
              />
              <span>{visitor.displayName}</span>
            </div>
          </div>

          <div className="absolute right-3.5 top-3.5 grid h-8 w-8 place-items-center border border-[#48463c] bg-[#1a1a16] text-[#cfcac0] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]">
            <MoveUpRight className="h-4 w-4" />
          </div>
        </Link>
      </div>
    </SectionContainer>
  );
}
