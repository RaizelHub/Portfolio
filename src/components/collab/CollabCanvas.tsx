import { useEffect, useMemo, useRef, useState } from 'react';
import {
  ExternalLink,
  Flag,
  Minus,
  MousePointer2,
  PencilLine,
  Plus,
  Save,
  StickyNote,
  Trash2,
  Type,
  X,
} from 'lucide-react';
import { VisitorAvatar } from '../ui/VisitorAvatar';
import {
  createContribution,
  deleteContribution,
  fetchContributions,
  reportItem,
  subscribeToContributions,
  updateContribution,
} from '../../lib/collab/service';
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  MAX_DRAWING_POINTS,
  MAX_TEXT_LENGTH,
} from '../../lib/collab/constants';
import type {
  CollabContribution,
  DrawingPoint,
} from '../../lib/collab/types';
import './CollabCanvas.css';

type CanvasTool = 'select' | 'text' | 'draw' | 'note';

type ComposerState = {
  type: 'text' | 'note';
  x: number;
  y: number;
  editId?: string;
};

type Props = {
  visitorId: string;
  visitorName: string;
  visitorAvatar: string;
  liveAvailable: boolean;
  onClose: () => void;
};

const COLORS = ['#272621', '#815f4b', '#50645d', '#586274'];
const NOTE_COLORS = ['#e2d7b9', '#cad5cd', '#d8c9c2'];

function mergeContribution(list: CollabContribution[], contribution: CollabContribution) {
  const exists = list.some((item) => item.id === contribution.id);
  return exists
    ? list.map((item) => item.id === contribution.id ? contribution : item)
    : [...list, contribution];
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function drawingPath(points: DrawingPoint[]) {
  if (points.length === 0) return '';
  return points.reduce((path, point, index) => `${path}${index === 0 ? 'M' : ' L'} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`, '');
}

export function CollabCanvas({ visitorId, visitorName, visitorAvatar, liveAvailable, onClose }: Props) {
  const [objects, setObjects] = useState<CollabContribution[]>([]);
  const [tool, setTool] = useState<CanvasTool>('select');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [color, setColor] = useState(COLORS[0]);
  const [noteColor, setNoteColor] = useState(NOTE_COLORS[0]);
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [zoom, setZoom] = useState(() => window.innerWidth < 720 ? 0.62 : 0.82);
  const [pan, setPan] = useState({ x: 28, y: 22 });
  const [draftPoints, setDraftPoints] = useState<DrawingPoint[]>([]);
  const [composer, setComposer] = useState<ComposerState | null>(null);
  const [composerText, setComposerText] = useState('');
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(true);
  const viewportRef = useRef<HTMLDivElement>(null);
  const drawingRef = useRef<DrawingPoint[]>([]);
  const pointerAction = useRef<
    | { kind: 'pan'; pointerX: number; pointerY: number; originX: number; originY: number }
    | { kind: 'drag'; id: string; offsetX: number; offsetY: number }
    | { kind: 'draw'; startX: number; startY: number }
    | null
  >(null);

  const selected = useMemo(() => objects.find((item) => item.id === selectedId) ?? null, [objects, selectedId]);
  const ownsSelected = selected?.ownerId === visitorId;

  useEffect(() => {
    let mounted = true;
    fetchContributions().then((items) => {
      if (mounted) {
        setObjects(items);
        setLoading(false);
      }
    });

    const channel = subscribeToContributions(
      (item) => setObjects((current) => mergeContribution(current, item)),
      (item) => setObjects((current) => mergeContribution(current, item)),
      (id) => setObjects((current) => current.filter((item) => item.id !== id)),
    );

    return () => {
      mounted = false;
      channel?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (composer) setComposer(null);
        else if (selectedId) setSelectedId(null);
        else onClose();
      }
      if ((event.key === 'Delete' || event.key === 'Backspace') && ownsSelected && !composer) {
        event.preventDefault();
        void handleDelete();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  const toBoardPoint = (clientX: number, clientY: number) => {
    const rect = viewportRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return {
      x: clamp((clientX - rect.left - pan.x) / zoom, 0, CANVAS_WIDTH),
      y: clamp((clientY - rect.top - pan.y) / zoom, 0, CANVAS_HEIGHT),
    };
  };

  const openComposer = (type: 'text' | 'note', x: number, y: number, edit?: CollabContribution) => {
    setComposer({ type, x, y, editId: edit?.id });
    setComposerText(edit?.content.text ?? '');
  };

  const handleSurfacePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    const point = toBoardPoint(event.clientX, event.clientY);
    event.currentTarget.setPointerCapture(event.pointerId);

    if (tool === 'text' || tool === 'note') {
      openComposer(tool, point.x, point.y);
      return;
    }

    if (tool === 'draw') {
      drawingRef.current = [point];
      setDraftPoints([point]);
      pointerAction.current = { kind: 'draw', startX: point.x, startY: point.y };
      return;
    }

    setSelectedId(null);
    pointerAction.current = {
      kind: 'pan',
      pointerX: event.clientX,
      pointerY: event.clientY,
      originX: pan.x,
      originY: pan.y,
    };
  };

  const handleObjectPointerDown = (event: React.PointerEvent, object: CollabContribution) => {
    if (tool !== 'select') return;
    event.stopPropagation();
    setSelectedId(object.id);
    if (object.ownerId !== visitorId) return;
    const point = toBoardPoint(event.clientX, event.clientY);
    pointerAction.current = {
      kind: 'drag',
      id: object.id,
      offsetX: point.x - object.x,
      offsetY: point.y - object.y,
    };
    viewportRef.current?.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const action = pointerAction.current;
    if (!action) return;

    if (action.kind === 'pan') {
      setPan({
        x: action.originX + event.clientX - action.pointerX,
        y: action.originY + event.clientY - action.pointerY,
      });
      return;
    }

    const point = toBoardPoint(event.clientX, event.clientY);
    if (action.kind === 'drag') {
      setObjects((current) => current.map((object) => {
        if (object.id !== action.id) return object;
        return {
          ...object,
          x: clamp(point.x - action.offsetX, 0, CANVAS_WIDTH - object.width),
          y: clamp(point.y - action.offsetY, 0, CANVAS_HEIGHT - object.height),
        };
      }));
      return;
    }

    const previous = drawingRef.current[drawingRef.current.length - 1];
    if (!previous || drawingRef.current.length >= MAX_DRAWING_POINTS) return;
    const dx = point.x - previous.x;
    const dy = point.y - previous.y;
    if (Math.hypot(dx, dy) < 3) return;
    drawingRef.current = [...drawingRef.current, point];
    setDraftPoints(drawingRef.current);
  };

  const finishDrawing = async () => {
    const points = drawingRef.current;
    drawingRef.current = [];
    setDraftPoints([]);
    if (points.length < 2) return;

    const minX = Math.min(...points.map((point) => point.x));
    const minY = Math.min(...points.map((point) => point.y));
    const maxX = Math.max(...points.map((point) => point.x));
    const maxY = Math.max(...points.map((point) => point.y));
    const width = clamp(maxX - minX + strokeWidth * 2, 24, 360);
    const height = clamp(maxY - minY + strokeWidth * 2, 20, 260);
    const normalized = points.map((point) => ({
      x: clamp(point.x - minX + strokeWidth, 0, width),
      y: clamp(point.y - minY + strokeWidth, 0, height),
    }));

    const saved = await createContribution(visitorId, visitorName, visitorAvatar, {
      type: 'drawing',
      content: { points: normalized },
      x: clamp(minX - strokeWidth, 0, CANVAS_WIDTH - width),
      y: clamp(minY - strokeWidth, 0, CANVAS_HEIGHT - height),
      width,
      height,
      style: { color, strokeWidth },
    });
    setObjects((current) => mergeContribution(current, saved));
    if (saved.isLocal) setNotice('Saved as a private draft. Live saving is unavailable.');
  };

  const handlePointerUp = async () => {
    const action = pointerAction.current;
    pointerAction.current = null;
    if (action?.kind === 'draw') await finishDrawing();
    if (action?.kind === 'drag') {
      const object = objects.find((item) => item.id === action.id);
      if (object) {
        const saved = await updateContribution(object, { x: object.x, y: object.y });
        setObjects((current) => mergeContribution(current, saved));
      }
    }
  };

  const handleComposerSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!composer || !composerText.trim()) return;
    const cleanText = composerText.trim().slice(0, MAX_TEXT_LENGTH);
    const editing = composer.editId ? objects.find((item) => item.id === composer.editId) : null;

    if (editing && editing.ownerId === visitorId) {
      const saved = await updateContribution(editing, { content: { text: cleanText } });
      setObjects((current) => mergeContribution(current, saved));
      setComposer(null);
      return;
    }

    const isNote = composer.type === 'note';
    const width = isNote ? 220 : 280;
    const height = isNote ? 150 : 74;
    const saved = await createContribution(visitorId, visitorName, visitorAvatar, {
      type: composer.type,
      content: { text: cleanText },
      x: clamp(composer.x, 0, CANVAS_WIDTH - width),
      y: clamp(composer.y, 0, CANVAS_HEIGHT - height),
      width,
      height,
      style: isNote ? { background: noteColor, color: '#272621' } : { color },
    });
    setObjects((current) => mergeContribution(current, saved));
    setComposer(null);
    setSelectedId(saved.id);
    if (saved.isLocal) setNotice('Saved as a private draft. Live saving is unavailable.');
  };

  const handleDelete = async () => {
    if (!selected || selected.ownerId !== visitorId) return;
    await deleteContribution(selected);
    setObjects((current) => current.filter((item) => item.id !== selected.id));
    setSelectedId(null);
  };

  const handleReport = async () => {
    if (!selected || selected.ownerId === visitorId) return;
    const reported = await reportItem('contribution', selected.id);
    setNotice(reported ? 'Thanks. This contribution was reported for review.' : 'Reporting is unavailable for local drafts.');
    setSelectedId(null);
  };

  const renderObject = (object: CollabContribution) => {
    const isSelected = object.id === selectedId;
    const className = `collab-object collab-object-${object.type}${isSelected ? ' is-selected' : ''}${object.ownerId === visitorId ? ' is-owned' : ''}`;
    const common = {
      className,
      style: {
        transform: `translate3d(${object.x}px, ${object.y}px, 0)`,
        width: object.width,
        height: object.height,
        color: object.style.color,
        background: object.type === 'note' ? object.style.background : undefined,
      },
      onPointerDown: (event: React.PointerEvent) => handleObjectPointerDown(event, object),
      onDoubleClick: () => object.ownerId === visitorId && object.type !== 'drawing'
        ? openComposer(object.type, object.x, object.y, object)
        : undefined,
    };

    if (object.type === 'drawing') {
      return (
        <div key={object.id} {...common}>
          <svg viewBox={`0 0 ${object.width} ${object.height}`} aria-label={`Drawing by ${object.ownerName}`}>
            <path
              d={drawingPath(object.content.points ?? [])}
              fill="none"
              stroke={object.style.color ?? COLORS[0]}
              strokeWidth={object.style.strokeWidth ?? 3}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      );
    }

    return (
      <article key={object.id} {...common}>
        <p>{object.content.text}</p>
        {object.type === 'note' && <small>{object.ownerName}</small>}
      </article>
    );
  };

  return (
    <div className="collab-canvas-overlay" role="dialog" aria-modal="true" aria-labelledby="collab-canvas-title">
      <header className="collab-canvas-header">
        <div>
          <p>COLLAB WALL · {objects.length} MARK{objects.length === 1 ? '' : 'S'}</p>
          <h1 id="collab-canvas-title">A shared place for small ideas.</h1>
        </div>
        <div className="collab-canvas-header-actions">
          <span className={liveAvailable ? 'is-live' : 'is-local'}>{liveAvailable ? 'Shared live' : 'Private draft mode'}</span>
          <a
            href="https://collab-canvas-web-beta.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="collab-open-full-btn"
            title="Open standalone CollabCanvas app in new tab"
          >
            <span>Launch Web App</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button type="button" aria-label="Close canvas" onClick={onClose}><X /></button>
        </div>
      </header>

      <div
        ref={viewportRef}
        className={`collab-canvas-viewport tool-${tool}`}
        onPointerDown={handleSurfacePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={() => void handlePointerUp()}
        onPointerCancel={() => void handlePointerUp()}
      >
        <div
          className="collab-canvas-board"
          style={{
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT,
            transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
          }}
        >
          {objects.map(renderObject)}
          {draftPoints.length > 1 && (
            <svg className="collab-draft-stroke" width={CANVAS_WIDTH} height={CANVAS_HEIGHT} viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}>
              <path d={drawingPath(draftPoints)} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          {!loading && objects.length === 0 && (
            <p className="collab-canvas-empty">Be the first to leave something here.</p>
          )}
        </div>
      </div>

      {selected && (
        <div className="collab-selection-bar">
          <span>
            <VisitorAvatar displayName={selected.ownerName} avatarUrl={selected.ownerAvatar} size="xs" />
            {selected.ownerId === visitorId ? 'Your contribution' : `By ${selected.ownerName}`}
          </span>
          {ownsSelected && selected.type !== 'drawing' && (
            <button type="button" onClick={() => openComposer(selected.type as 'text' | 'note', selected.x, selected.y, selected)}>Edit</button>
          )}
          {ownsSelected ? (
            <button type="button" onClick={() => void handleDelete()}><Trash2 /> Delete</button>
          ) : (
            <button type="button" onClick={() => void handleReport()}><Flag /> Report</button>
          )}
        </div>
      )}

      <div className="collab-canvas-controls">
        <div className="collab-tool-group" aria-label="Canvas tools">
          {([
            ['select', MousePointer2, 'Select'],
            ['text', Type, 'Text'],
            ['draw', PencilLine, 'Draw'],
            ['note', StickyNote, 'Note'],
          ] as const).map(([value, Icon, label]) => (
            <button
              type="button"
              key={value}
              className={tool === value ? 'is-active' : ''}
              onClick={() => setTool(value)}
              aria-pressed={tool === value}
            >
              <Icon /> <span>{label}</span>
            </button>
          ))}
        </div>

        <div className="collab-style-group" aria-label="Drawing style">
          {(tool === 'draw' || tool === 'text') && COLORS.map((value) => (
            <button
              type="button"
              key={value}
              className={`collab-color${color === value ? ' is-active' : ''}`}
              style={{ background: value }}
              onClick={() => setColor(value)}
              aria-label={`Use ${value}`}
            />
          ))}
          {tool === 'note' && NOTE_COLORS.map((value) => (
            <button
              type="button"
              key={value}
              className={`collab-color${noteColor === value ? ' is-active' : ''}`}
              style={{ background: value }}
              onClick={() => setNoteColor(value)}
              aria-label={`Use ${value}`}
            />
          ))}
          {tool === 'draw' && (
            <button type="button" className="stroke-toggle" onClick={() => setStrokeWidth((width) => width === 3 ? 6 : 3)}>
              {strokeWidth === 3 ? 'Small' : 'Medium'}
            </button>
          )}
        </div>

        <div className="collab-zoom-group" aria-label="Canvas zoom">
          <button type="button" aria-label="Zoom out" onClick={() => setZoom((value) => clamp(value - 0.1, 0.4, 1.4))}><Minus /></button>
          <span>{Math.round(zoom * 100)}%</span>
          <button type="button" aria-label="Zoom in" onClick={() => setZoom((value) => clamp(value + 0.1, 0.4, 1.4))}><Plus /></button>
        </div>
      </div>

      {composer && (
        <div className="collab-composer-backdrop" onPointerDown={(event) => event.stopPropagation()}>
          <form className="collab-composer" onSubmit={handleComposerSubmit}>
            <div>
              <p>{composer.editId ? 'EDIT YOUR MARK' : composer.type === 'note' ? 'NEW NOTE' : 'NEW TEXT'}</p>
              <button type="button" aria-label="Cancel" onClick={() => setComposer(null)}><X /></button>
            </div>
            <textarea
              autoFocus
              value={composerText}
              maxLength={MAX_TEXT_LENGTH}
              onChange={(event) => setComposerText(event.target.value)}
              placeholder={composer.type === 'note' ? 'Leave a short note…' : 'Write something small…'}
            />
            <footer>
              <span>{composerText.length}/{MAX_TEXT_LENGTH} · Links are not allowed</span>
              <button type="submit" disabled={!composerText.trim()}><Save /> Save</button>
            </footer>
          </form>
        </div>
      )}

      {notice && (
        <button type="button" className="collab-canvas-notice" onClick={() => setNotice('')}>{notice} <X /></button>
      )}
    </div>
  );
}
