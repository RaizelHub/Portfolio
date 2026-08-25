import { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { profile } from '../../data/profile';
import { projects } from '../../data/projects';
import { technologies } from '../../data/technologies';
import { useSound } from '../../context/SoundContext';

type Props = {
  visitorName: string;
  onClose: () => void;
};

type TerminalLine = {
  type: 'input' | 'output' | 'error' | 'highlight';
  text: string;
};

export function WorldTerminalModal({ visitorName, onClose }: Props) {
  const { playClick, playTerminalKey } = useSound();
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: 'output', text: `SYSTEM INITIALIZED. Connected as: ${visitorName}` },
    { type: 'output', text: `Type 'help' to see all available terminal commands.` },
    { type: 'highlight', text: `Tip: Try 'status', 'skills', or 'budget' to inspect project deployment notes.` },
  ]);

  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const clean = cmd.trim().toLowerCase();
    playClick();

    const newHistory: TerminalLine[] = [...history, { type: 'input', text: `$ ${cmd}` }];

    switch (clean) {
      case 'help':
        newHistory.push(
          { type: 'output', text: 'AVAILABLE COMMANDS:' },
          { type: 'output', text: '  status       - View real-time development & deployment status for all projects' },
          { type: 'output', text: '  budget       - View deployment & infrastructure budget disclosures' },
          { type: 'output', text: '  skills       - Print full engineering tech stack & frameworks' },
          { type: 'output', text: '  projects     - List all engineered applications & links' },
          { type: 'output', text: '  whoami       - Display current visitor session identity' },
          { type: 'output', text: '  contact      - View email, GitHub, and recruiter booking details' },
          { type: 'output', text: '  clear        - Clear terminal screen' },
        );
        break;

      case 'status':
      case 'budget':
        newHistory.push(
          { type: 'highlight', text: '=== PROJECT DEPLOYMENT & BUDGET STATUS ===' },
          { type: 'output', text: '• SUBORA: In Development / Prototype' },
          { type: 'output', text: '  - Core Gmail sync, duplicate detection, and Edge Functions built locally.' },
          { type: 'error', text: '  - Deployment Status: On hold due to cloud hosting & Google verification budget.' },
          { type: 'output', text: '• VOCARA: Complete Working Prototype' },
          { type: 'output', text: '  - End-to-end voice transcription, Groq AI coach, and Supabase RLS built.' },
          { type: 'error', text: '  - Deployment Status: On hold due to production Groq AI inference & App Store budget.' },
          { type: 'output', text: '• SMART PIPE: Hardware & IoT Prototype' },
          { type: 'output', text: '  - ESP32 telemetry, valve control, and dashboard operational.' },
          { type: 'highlight', text: 'All repositories and architectural blueprints are available for code review.' },
        );
        break;

      case 'skills':
        newHistory.push(
          { type: 'output', text: '=== CORE TECHNICAL STACK ===' },
          { type: 'output', text: technologies.map((t) => `• ${t.name} (${t.category})`).join('\n') },
        );
        break;

      case 'projects':
        newHistory.push(
          { type: 'output', text: '=== ENGINEERED PROJECTS ===' },
          ...projects.map((p) => ({
            type: 'output' as const,
            text: `• ${p.title} [${p.status}] - ${p.category}`,
          })),
        );
        break;

      case 'whoami':
        newHistory.push(
          { type: 'output', text: `User Identity: ${visitorName}` },
          { type: 'output', text: `Session: Anonymous Visitor Authentication (Active)` },
        );
        break;

      case 'contact':
      case 'hire':
        newHistory.push(
          { type: 'highlight', text: `=== CONTACT & HIRING ===` },
          { type: 'output', text: `Developer: ${profile.name}` },
          { type: 'output', text: `Role: ${profile.title}` },
          { type: 'output', text: `GitHub: ${profile.githubUrl}` },
          { type: 'output', text: `Resume: ${profile.resumeUrl}` },
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case '':
        break;

      default:
        newHistory.push({
          type: 'error',
          text: `Command not recognized: '${clean}'. Type 'help' for available commands.`,
        });
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    handleCommand(inputVal);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl border-2 border-black bg-white shadow-2xl overflow-hidden font-mono"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Titlebar */}
        <div className="flex items-center justify-between border-b border-black bg-black px-4 py-2 text-white">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
            <span>Developer Campus CLI [v1.0]</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white hover:opacity-60"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Terminal Screen */}
        <div
          className="h-80 overflow-y-auto bg-white p-4 text-xs leading-relaxed"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((line, idx) => {
            if (line.type === 'input') {
              return (
                <div key={idx} className="font-bold text-black mt-2">
                  {line.text}
                </div>
              );
            }
            if (line.type === 'error') {
              return (
                <div key={idx} className="text-[#888888] font-semibold">
                  {line.text}
                </div>
              );
            }
            if (line.type === 'highlight') {
              return (
                <div key={idx} className="font-bold text-black bg-[#f0f0f0] p-1 my-1 border-l-2 border-black">
                  {line.text}
                </div>
              );
            }
            return (
              <div key={idx} className="text-[#333333] whitespace-pre-wrap">
                {line.text}
              </div>
            );
          })}
          <div ref={endRef} />
        </div>

        {/* Terminal Input Prompt */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center border-t-2 border-black bg-[#f7f7f7] px-4 py-2"
        >
          <span className="mr-2 font-bold text-black">$</span>
          <input
            ref={inputRef}
            autoFocus
            type="text"
            value={inputVal}
            onChange={(e) => {
              playTerminalKey();
              setInputVal(e.target.value);
            }}
            onKeyDown={(e) => e.stopPropagation()}
            placeholder="Type 'help', 'status', 'budget', 'skills'…"
            className="flex-1 bg-transparent text-xs text-black outline-none font-mono"
          />
          <button
            type="submit"
            className="border border-black bg-black px-3 py-1 text-[10px] font-bold text-white uppercase"
          >
            Run
          </button>
        </form>
      </div>
    </div>
  );
}
