import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, Trophy, Play, Mail, Maximize2, Minimize2, X } from 'lucide-react';

interface Snippet {
  id: string;
  title: string;
  category: string;
  code: string;
}

const SNIPPETS: Snippet[] = [
  {
    id: 'ts-interface',
    title: 'TypeScript Interface Spec',
    category: 'TYPESCRIPT',
    code: 'const dev = { name: "Janmark", stack: ["React", "TypeScript", "n8n"], status: "Available" };',
  },
  {
    id: 'n8n-workflow',
    title: 'n8n Webhook Pipeline Trigger',
    category: 'AUTOMATION',
    code: 'async function triggerPipeline(payload) { return await fetch("/api/n8n/webhook", { method: "POST", body: payload }); }',
  },
  {
    id: 'react-state',
    title: 'React Custom Hook Query',
    category: 'FRONTEND',
    code: 'const useJobRadar = () => { const [data, setData] = useState(null); useEffect(() => { fetchJobs().then(setData); }, []); return data; };',
  },
  {
    id: 'api-route',
    title: 'Express REST Endpoint',
    category: 'BACKEND',
    code: 'app.get("/api/v1/projects", (req, res) => { res.json({ success: true, count: 12, author: "Janmark Suelto" }); });',
  },
];

interface TypingGameProps {
  initialExpanded?: boolean;
}

export const TypingGame: React.FC<TypingGameProps> = ({ initialExpanded = false }) => {
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(initialExpanded);

  // Real keystroke tracking
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const [mistakeCount, setMistakeCount] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const currentSnippet = SNIPPETS[snippetIndex];

  // Listen for global open event
  useEffect(() => {
    const handleOpenModal = () => {
      setIsExpanded(true);
      setTimeout(() => inputRef.current?.focus(), 150);
    };
    window.addEventListener('open-typing-game-modal', handleOpenModal);
    return () => window.removeEventListener('open-typing-game-modal', handleOpenModal);
  }, []);

  // Focus input when test starts
  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]);

  const handleStart = () => {
    setInput('');
    setStartTime(null);
    setEndTime(null);
    setTotalKeystrokes(0);
    setMistakeCount(0);
    setIsActive(true);
    setIsCompleted(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleReset = () => {
    setInput('');
    setStartTime(null);
    setEndTime(null);
    setTotalKeystrokes(0);
    setMistakeCount(0);
    setIsActive(false);
    setIsCompleted(false);
  };

  const handleNextSnippet = () => {
    setSnippetIndex((prev) => (prev + 1) % SNIPPETS.length);
    handleReset();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!isActive) return;

    if (!startTime) {
      setStartTime(Date.now());
    }

    // Count new keystrokes and mistakes
    if (val.length > input.length) {
      const addedCharIndex = val.length - 1;
      setTotalKeystrokes((prev) => prev + 1);
      if (val[addedCharIndex] !== currentSnippet.code[addedCharIndex]) {
        setMistakeCount((prev) => prev + 1);
      }
    }

    setInput(val);

    if (val.length >= currentSnippet.code.length) {
      setEndTime(Date.now());
      setIsActive(false);
      setIsCompleted(true);
    }
  };

  // Real Stats Calculations
  const elapsedSeconds = startTime
    ? Math.max(1, Math.floor(((endTime || Date.now()) - startTime) / 1000))
    : 0;

  let correctChars = 0;
  for (let i = 0; i < input.length; i++) {
    if (input[i] === currentSnippet.code[i]) correctChars++;
  }

  // Real Accuracy % based on total keystrokes & typos made
  const accuracy = totalKeystrokes > 0
    ? Math.max(0, Math.round(((totalKeystrokes - mistakeCount) / totalKeystrokes) * 100))
    : 100;

  // Standard Net WPM: (Correct Characters / 5) / Minutes
  const wpm = elapsedSeconds > 0
    ? Math.max(0, Math.round((correctChars / 5) / (elapsedSeconds / 60)))
    : 0;

  const getWpmRating = (wpmScore: number) => {
    if (wpmScore >= 90) return { title: 'GODLIKE SPEED', badge: 'EXPERT ⚡' };
    if (wpmScore >= 70) return { title: 'SENIOR DEVELOPER', badge: 'FAST 🚀' };
    if (wpmScore >= 50) return { title: 'FULL-STACK ENGINEER', badge: 'SOLID 🎯' };
    return { title: 'JUNIOR ARCHITECT', badge: 'STEADY 🛠️' };
  };

  const rating = getWpmRating(wpm);

  const renderGameContent = () => (
    <div className="bg-[#EFEBE4] border border-[#D5D0C7] p-6 sm:p-8 rounded-[2px] space-y-6 font-mono text-xs text-[#171717] w-full text-left">
      
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D5D0C7] pb-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm uppercase tracking-wider text-[#171717]">
            DEV_SPEED // CODE TYPING TEST
          </span>
          <span className="text-[10px] bg-[#C7462D] text-[#F4F1EA] px-2 py-0.5 rounded-[1px] font-bold uppercase">
            {currentSnippet.category}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleNextSnippet}
            className="px-3 py-1.5 bg-[#F4F1EA] hover:bg-[#EFEBE4] text-[#171717] border border-[#D5D0C7] hover:border-[#171717] rounded-[1px] transition-colors uppercase text-[11px]"
          >
            CHANGE SNIPPET ({snippetIndex + 1}/{SNIPPETS.length})
          </button>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 bg-[#F4F1EA] hover:bg-[#EFEBE4] text-[#171717] border border-[#D5D0C7] hover:border-[#171717] rounded-[1px] transition-colors"
            aria-label="Expand Fullscreen"
            title={isExpanded ? "Minimize View" : "Expand Fullscreen"}
          >
            {isExpanded ? <Minimize2 className="w-4 h-4 text-[#C7462D]" /> : <Maximize2 className="w-4 h-4 text-[#C7462D]" />}
          </button>
        </div>
      </div>

      {/* Live Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div className="bg-[#F4F1EA] border border-[#D5D0C7] p-3 rounded-[1px]">
          <span className="text-[10px] text-[#6B6862] block uppercase font-bold">SPEED (WPM)</span>
          <span className="text-xl font-bold text-[#171717]">{wpm}</span>
        </div>
        <div className="bg-[#F4F1EA] border border-[#D5D0C7] p-3 rounded-[1px]">
          <span className="text-[10px] text-[#6B6862] block uppercase font-bold">ACCURACY</span>
          <span className="text-xl font-bold text-[#171717]">{accuracy}%</span>
        </div>
        <div className="bg-[#F4F1EA] border border-[#D5D0C7] p-3 rounded-[1px]">
          <span className="text-[10px] text-[#6B6862] block uppercase font-bold">TIME</span>
          <span className="text-xl font-bold text-[#171717]">{elapsedSeconds}s</span>
        </div>
        <div className="bg-[#F4F1EA] border border-[#D5D0C7] p-3 rounded-[1px]">
          <span className="text-[10px] text-[#6B6862] block uppercase font-bold">PROGRESS</span>
          <span className="text-xl font-bold text-[#C7462D]">
            {input.length}/{currentSnippet.code.length}
          </span>
        </div>
      </div>

      {/* Code Display Container */}
      <div
        onClick={() => inputRef.current?.focus()}
        className={`relative bg-[#F4F1EA] border p-5 rounded-[1px] font-mono text-sm sm:text-base leading-relaxed tracking-wide min-h-[100px] cursor-text select-none ${
          isActive ? 'border-[#C7462D]' : 'border-[#D5D0C7]'
        }`}
      >
        <div className="mb-2 text-[11px] text-[#6B6862] font-bold uppercase flex justify-between">
          <span>{currentSnippet.title}</span>
          <span>CLICK BOX OR PRESS START TO TYPE</span>
        </div>

        {/* Formatted Code Character Stream */}
        <div className="break-all font-mono">
          {currentSnippet.code.split('').map((char, index) => {
            let color = 'text-[#6B6862]'; // untyped
            let bg = 'bg-transparent';

            if (index < input.length) {
              if (input[index] === char) {
                color = 'text-[#171717] font-bold'; // correct
              } else {
                color = 'text-[#F4F1EA]';
                bg = 'bg-[#C7462D]'; // wrong
              }
            }

            const isCurrentCursor = index === input.length && isActive;

            return (
              <span
                key={index}
                className={`${color} ${bg} ${isCurrentCursor ? 'border-b-2 border-[#C7462D] bg-[#D5D0C7]/40 animate-pulse' : ''}`}
              >
                {char}
              </span>
            );
          })}
        </div>

        {/* Hidden Input Layer */}
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          disabled={!isActive || isCompleted}
          className="absolute inset-0 opacity-0 cursor-default"
          autoFocus={false}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </div>

      {/* Controls / Completion Overlay */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        {!isActive && !isCompleted && (
          <button
            onClick={handleStart}
            className="px-6 py-3 bg-[#C7462D] hover:bg-[#a63723] text-[#F4F1EA] font-bold uppercase rounded-[1px] transition-colors flex items-center gap-2 tracking-wider"
          >
            <Play className="w-4 h-4" />
            <span>START TYPING TEST</span>
          </button>
        )}

        {isActive && (
          <button
            onClick={handleReset}
            className="px-5 py-2.5 bg-[#F4F1EA] hover:bg-[#EFEBE4] text-[#171717] border border-[#D5D0C7] font-bold uppercase rounded-[1px] transition-colors flex items-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>RESTART TEST</span>
          </button>
        )}

        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full bg-[#F4F1EA] border border-[#C7462D] p-5 rounded-[1px] flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-[#C7462D]" />
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base text-[#171717]">{rating.title}</span>
                  <span className="text-[10px] bg-[#C7462D] text-[#F4F1EA] px-2 py-0.5 rounded-[1px] font-bold uppercase">
                    {rating.badge}
                  </span>
                </div>
                <p className="text-xs text-[#6B6862] mt-0.5">
                  You typed at <strong className="text-[#171717]">{wpm} WPM</strong> with <strong className="text-[#171717]">{accuracy}% accuracy</strong> in {elapsedSeconds} seconds.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleStart}
                className="px-4 py-2.5 bg-[#EFEBE4] hover:bg-[#D5D0C7] border border-[#D5D0C7] text-[#171717] font-bold rounded-[1px] transition-colors uppercase text-xs"
              >
                TRY AGAIN
              </button>
              <button
                onClick={() => {
                  setIsExpanded(false);
                  window.dispatchEvent(new CustomEvent('open-contact-modal'));
                }}
                className="px-5 py-2.5 bg-[#C7462D] hover:bg-[#a63723] text-[#F4F1EA] font-bold rounded-[1px] transition-colors uppercase text-xs flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>CONTACT JANMARK ↗</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>

    </div>
  );

  return (
    <>
      {/* Default Inline Container */}
      {!isExpanded && renderGameContent()}

      {/* Expanded Fullscreen Overlay Modal */}
      <AnimatePresence>
        {isExpanded && (
          <div className="fixed inset-0 z-[100] bg-[#F4F1EA]/95 backdrop-blur-md p-4 sm:p-8 flex items-center justify-center overflow-y-auto">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="max-w-4xl w-full relative shadow-2xl"
            >
              <button
                onClick={() => setIsExpanded(false)}
                className="absolute -top-10 right-0 text-[#171717] hover:text-[#C7462D] flex items-center gap-1.5 font-mono text-xs font-bold"
              >
                <span>CLOSE FULLSCREEN</span>
                <X className="w-5 h-5" />
              </button>
              {renderGameContent()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
