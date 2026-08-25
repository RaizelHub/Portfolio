import { useState } from 'react';
import { MapPin, Maximize2, Minimize2 } from 'lucide-react';
import { WORLD_HEIGHT, WORLD_WIDTH } from '../../lib/collab/constants';
import { worldBuildings, type WorldBuilding } from '../../lib/collab/worldConfig';
import type { PublicCollabVisitor } from '../../lib/collab/types';

type Props = {
  playerX: number;
  playerY: number;
  activeVisitors: PublicCollabVisitor[];
  insideBuilding: WorldBuilding | null;
  onSelectBuilding?: (building: WorldBuilding) => void;
};

export function WorldRadar({
  playerX,
  playerY,
  insideBuilding,
  onSelectBuilding,
}: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Scaled radar dimensions
  const radarW = isExpanded ? 260 : 130;
  const radarH = isExpanded ? 165 : 82;

  const scaleX = radarW / WORLD_WIDTH;
  const scaleY = radarH / WORLD_HEIGHT;

  const playerDotX = Math.round(playerX * scaleX);
  const playerDotY = Math.round(playerY * scaleY);

  return (
    <aside
      aria-label="Campus Mini-Map Radar"
      className="fixed bottom-16 right-4 z-30 border-2 border-black bg-white shadow-xl select-none"
    >
      {/* Radar Top Header */}
      <div className="flex items-center justify-between border-b border-black bg-black px-2 py-1 text-white">
        <div className="flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase tracking-wider">
          <MapPin className="h-3 w-3" />
          <span>{insideBuilding ? `🏛️ ${insideBuilding.label}` : 'RADAR'}</span>
        </div>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-label={isExpanded ? 'Minimize radar' : 'Expand radar'}
          className="text-white hover:text-[#cccccc]"
        >
          {isExpanded ? <Minimize2 className="h-3 w-3" /> : <Maximize2 className="h-3 w-3" />}
        </button>
      </div>

      {/* Radar Canvas Body */}
      <div
        className="relative bg-[#ffffff] overflow-hidden"
        style={{ width: radarW, height: radarH }}
      >
        {/* Subtle coordinate grid lines */}
        <div className="absolute inset-0 bg-[radial-gradient(#d0d0d0_1px,transparent_1px)] [background-size:12px_12px] opacity-70" />

        {/* Central Plaza outline */}
        <div
          className="absolute border border-black bg-[#f0f0f0]"
          style={{
            left: 700 * scaleX,
            top: 480 * scaleY,
            width: 800 * scaleX,
            height: 380 * scaleY,
          }}
        />

        {/* Buildings Footprints */}
        {worldBuildings.map((b) => {
          const bx = b.x * scaleX;
          const by = b.y * scaleY;
          const bw = b.width * scaleX;
          const bh = b.height * scaleY;

          return (
            <button
              key={b.id}
              type="button"
              onClick={() => onSelectBuilding?.(b)}
              title={`${b.label} (${b.subtitle})`}
              className="absolute border border-black bg-white hover:bg-black hover:text-white transition-colors"
              style={{
                left: bx,
                top: by,
                width: bw,
                height: bh,
              }}
            >
              {isExpanded && (
                <span className="block font-mono text-[7px] font-bold text-center truncate px-0.5 pointer-events-none">
                  {b.label}
                </span>
              )}
            </button>
          );
        })}

        {/* Local Player Marker Dot */}
        {!insideBuilding && (
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10"
            style={{ left: playerDotX, top: playerDotY }}
          >
            <div className="h-3 w-3 rounded-full border-2 border-black bg-black animate-ping opacity-60" />
            <div className="absolute inset-0 m-auto h-2 w-2 rounded-full border border-white bg-black" />
          </div>
        )}
      </div>
    </aside>
  );
}
