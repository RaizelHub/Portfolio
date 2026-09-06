import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X } from 'lucide-react';
import { useSound } from '../../context/SoundContext';
import { profile } from '../../data/profile';

type ChatMessage = {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
};

const SYSTEM_PROMPT = `You are Janmark Suelto's AI Digital Clone — an interactive assistant that speaks AS Janmark in first person, with his real personality, engineering background, and project experience.

ABOUT ME (Janmark Suelto):
- Full-Stack Developer based in the Philippines
- Bachelor's degree in Information Technology, Bukidnon State University (BukSU)
- Student ID: 2201102887
- Email: janmarkking@gmail.com / 2201102887@student.buksu.edu.ph
- LinkedIn: ${profile.linkedinUrl ?? 'linkedin.com/in/janmark-suelto'}
- GitHub: ${profile.githubUrl ?? 'github.com/janmark'}

TECH STACK:
- Frontend: React, TypeScript, Vite, Tailwind CSS, Vanilla CSS
- Game/Interactive: Phaser 3 (built this very 2D Campus World you're exploring!)
- Mobile: React Native + Expo
- Backend: Supabase (PostgreSQL, Realtime, Edge Functions), Node.js
- AI/LLM: Groq API (llama), Gemini, OpenAI APIs
- Tools: Git, Figma, Supabase CLI, VS Code

PROJECTS:
1. Subora — offline-first mobile finance & bill tracking app with instant analytics. Built with React Native + Expo + Supabase. Currently in development.
2. Vocara — real-time AI voice interview preparation platform with low-latency streaming STT/TTS using Groq API. Mobile app built with React Native.
3. Smart Pipe — IoT water monitoring system with real-time data dashboards.
4. This 2D Multiplayer Campus Portfolio World — built with Phaser 3, Supabase Realtime, and React. Features live multiplayer, interactive buildings, mini-games, AI clone NPC, and scavenger hunt stamps.
5. Web & Desktop Studio — collection of enterprise web and desktop applications.

PERSONALITY & HOBBIES:
- Passionate about basketball — plays 3v3 and 5v5 pickup games. Says "YES!" when he makes a shot and "YAWA WALA!" when he misses.
- Loves building interactive, premium-feeling user experiences with micro-animations and attention to detail.
- Believes in clean code architecture and sub-millisecond tactile UI feedback.
- Based in Bukidnon, Philippines.

AVAILABILITY:
- Open to Full-Time Software Engineering roles, Frontend/Full-Stack contracts, and AI product engineering collaborations.
- Best contact: janmarkking@gmail.com

RULES:
- Always speak in FIRST PERSON as Janmark ("I built...", "My stack is...", "I love...")
- Be conversational, friendly, and a bit playful — like a real developer chatting
- Keep answers concise but informative (2-4 sentences max unless asked for detail)
- If asked something you don't know, say so naturally — don't make things up
- Never break character or say you are an AI language model`;

const SUGGESTED_PROMPTS = [
  'Tell me about yourself',
  'What projects have you built?',
  'What\'s your tech stack?',
  'Are you open for hire?',
  'Why did you build this 2D World?',
  'What do you do outside coding?',
];

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = (import.meta.env.VITE_GROQ_MODEL as string | undefined) || 'qwen/qwen3.6-27b';

export const AiJanmarkModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Hey! I'm Janmark's AI Digital Clone — powered by real AI. Ask me anything about my projects, tech stack, background, or if I'm open to work. I'll answer as Janmark himself!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { playClick, playTerminalKey } = useSound();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    // Focus input on open
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  const handleSendMessage = async (textToSend: string) => {
    const clean = textToSend.trim();
    if (!clean || isTyping) return;

    playTerminalKey();
    setError(null);

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: clean,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    const apiKey = import.meta.env.VITE_GROQ_API_KEY as string | undefined;

    if (!apiKey || apiKey === 'your_groq_api_key_here') {
      // Fallback: no key configured
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            sender: 'ai',
            text: '⚠️ Groq API key not configured yet. Add your key to VITE_GROQ_API_KEY in the .env file to enable real AI responses!',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      }, 600);
      return;
    }

    // Build conversation history for context
    const history = messages.map((m) => ({
      role: m.sender === 'ai' ? 'assistant' : 'user',
      content: m.text,
    }));

    try {
      const res = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...history,
            { role: 'user', content: clean },
          ],
          max_tokens: 1200,
          temperature: 0.7,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as { error?: { message?: string } }).error?.message ?? `HTTP ${res.status}`);
      }

      const data = await res.json() as {
        choices: Array<{ message: { content: string } }>;
      };
      const rawReply = data.choices[0]?.message?.content ?? "Hmm, I didn't get a response. Try again!";
      
      // Robust filter for reasoning model thinking process (<think>...</think>)
      let cleanReply = rawReply.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();
      // Handle edge case where thinking tag was cut off or unclosed
      if (!cleanReply && rawReply.includes('<think>')) {
        const paragraphs = rawReply.replace(/<think>/gi, '').trim().split('\n\n').filter(Boolean);
        cleanReply = paragraphs[paragraphs.length - 1]?.replace(/^["']|["']$/g, '').trim() ?? '';
      }
      const reply = cleanReply || rawReply.replace(/<\/?think>/gi, '').trim();

      playClick();
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Unknown error';
      setError(`AI error: ${msg}`);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: 'ai',
          text: `Sorry, something went wrong connecting to the AI. (${msg}) — Try again in a moment!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    void handleSendMessage(inputValue);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl h-[85vh] max-h-[640px] flex flex-col border-2 border-black bg-white shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-black bg-black px-5 py-3.5 text-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full border border-amber-400 bg-zinc-900 flex items-center justify-center">
              <Bot className="h-4 w-4 text-amber-400" />
            </div>
            <div>
              <h2 className="font-mono text-sm font-bold uppercase tracking-wider">
                Janmark's AI Digital Clone
              </h2>
              <p className="text-[10px] font-mono text-zinc-400">
                Powered by Groq · Qwen 3.6 (27B) · Speaks as Janmark
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

        {/* Suggested Topic Chips */}
        <div className="border-b border-zinc-200 bg-zinc-50 px-4 py-2.5 flex items-center gap-2 overflow-x-auto shrink-0 scrollbar-none">
          <span className="font-mono text-[10px] text-zinc-500 font-bold uppercase shrink-0">
            Ask:
          </span>
          {SUGGESTED_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              type="button"
              disabled={isTyping}
              onClick={() => void handleSendMessage(prompt)}
              className="border border-zinc-300 bg-white hover:border-black hover:bg-black hover:text-white px-2.5 py-1 text-[10px] font-mono whitespace-nowrap transition-colors cursor-pointer disabled:opacity-40"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Message Feed */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-zinc-50/50">
          {messages.map((msg) => {
            const isAi = msg.sender === 'ai';
            return (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${isAi ? 'justify-start' : 'justify-end'}`}
              >
                {isAi && (
                  <div className="h-7 w-7 rounded-full border border-black bg-black text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="h-3.5 w-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] border p-3 font-sans text-xs leading-relaxed ${
                    isAi
                      ? 'border-black bg-white text-black shadow-xs'
                      : 'border-black bg-black text-white'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span className="block text-[9px] font-mono mt-1.5 text-zinc-400">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex gap-2.5 items-center">
              <div className="h-7 w-7 rounded-full border border-black bg-black text-amber-400 flex items-center justify-center shrink-0">
                <Bot className="h-3.5 w-3.5" />
              </div>
              <div className="border border-black bg-white px-3 py-2 flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-black animate-bounce" />
                <span className="h-1.5 w-1.5 rounded-full bg-black animate-bounce [animation-delay:0.2s]" />
                <span className="h-1.5 w-1.5 rounded-full bg-black animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}

          {error && (
            <p className="text-[10px] font-mono text-red-500 px-1">{error}</p>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={handleFormSubmit}
          className="border-t border-black bg-white p-3 flex items-center gap-2 shrink-0"
        >
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.stopPropagation()}
            placeholder="Ask Janmark anything…"
            disabled={isTyping}
            className="flex-1 border border-black px-3.5 py-2 font-mono text-xs text-black outline-none focus:ring-1 focus:ring-black disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isTyping}
            className="flex items-center gap-1.5 border border-black bg-black px-4 py-2 font-mono text-xs font-bold uppercase text-white hover:bg-zinc-800 disabled:opacity-40 transition-all cursor-pointer"
          >
            <span>{isTyping ? '…' : 'Ask'}</span>
            <Send className="h-3.5 w-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
};
