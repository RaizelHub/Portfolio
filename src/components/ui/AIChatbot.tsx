import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send, X, Sparkles, User, RefreshCw, ChevronRight } from 'lucide-react';
import { profile } from '../../data/profile';
import { useSound } from '../../context/SoundContext';

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

const QUICK_QUESTIONS = [
  'What is Janmark\'s core tech stack?',
  'Tell me about CareerOS project',
  'What is his experience in automation & n8n?',
  'How can I hire or contact Janmark?',
];

const KNOWLEDGE_BASE: { keywords: string[]; answer: string }[] = [
  {
    keywords: ['stack', 'technology', 'tech', 'skills', 'languages', 'react', 'typescript', 'laravel', 'node', 'php'],
    answer: 'Janmark specializes in React 19, TypeScript, TailwindCSS v4, Vite, Node.js, Express.js, Laravel, PHP, SQLite, PostgreSQL, Supabase, and n8n workflow automation.',
  },
  {
    keywords: ['careeros', 'desktop', 'tauri', 'rust', 'career os'],
    answer: 'CareerOS is Janmark\'s local-first Windows Career Operating System built with Tauri 2, Rust, React 19, SQLite, and Groq Llama-3.3 AI. It manages job applications, local resume parsing, and STAR interview coaching with 100% offline data privacy.',
  },
  {
    keywords: ['automation', 'n8n', 'pipeline', 'workflow', 'ai', 'gemini', 'bot'],
    answer: 'Janmark builds multi-step automated pipelines using n8n and AI models (Gemini / Groq LLMs) for lead processing, webhooks, data triage, email notifications, and automated e-commerce workflows.',
  },
  {
    keywords: ['experience', 'work', 'job', 'background', 'internship', 'ccna'],
    answer: 'Janmark is a BSIT Graduate with CCNA training and practical experience in IT operations, technical support, full-stack web development, and n8n automation systems in Bukidnon, Philippines.',
  },
  {
    keywords: ['contact', 'hire', 'email', 'phone', 'location', 'remote', 'messenger'],
    answer: `You can reach Janmark directly via Email (${profile.email}), Phone (${profile.phone}), or Messenger. He is based in Bukidnon, Philippines and open to remote full-stack developer & automation roles.`,
  },
  {
    keywords: ['project', 'portfolio', 'pos', 'leadflow', 'omnicommerce'],
    answer: 'Janmark\'s key projects include CareerOS (Local Desktop OS), JobRadar AI (Job Discovery & Triage Engine), POS System (Multi-instance Store POS with Redis), and OmniCommerce AI (Automation Engine).',
  },
];

export const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const { playHover, playClick } = useSound();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: `Hi! I'm Janmark's AI Portfolio Assistant. Ask me anything about his skills, CareerOS project, n8n automations, or contact details!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const getBotResponse = (userQuery: string): string => {
    const query = userQuery.toLowerCase();
    for (const kb of KNOWLEDGE_BASE) {
      if (kb.keywords.some((kw) => query.includes(kw))) {
        return kb.answer;
      }
    }
    return `Janmark is a Junior Web Developer & Automation Specialist based in Bukidnon, Philippines, specializing in React, TypeScript, Laravel, PHP, Node.js, and n8n automations. You can contact him directly at ${profile.email}.`;
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    playClick();

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = getBotResponse(text);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <>
      {/* Floating Chat Trigger Button (Bottom-Left) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onMouseEnter={playHover}
            onClick={() => {
              playClick();
              setIsOpen(true);
            }}
            className="fixed bottom-6 left-6 z-50 bg-[#171717] hover:bg-[#C7462D] text-[#F4F1EA] px-4 py-3 rounded-xl border border-[#D5D0C7] shadow-xl flex items-center gap-2.5 font-pt-sans text-xs font-bold transition-all duration-200 tracking-wide group"
            aria-label="Ask AI Assistant"
          >
            <Bot className="w-4 h-4 text-[#C7462D] group-hover:text-[#F4F1EA] transition-colors" />
            <span>AI Assistant</span>
            <Sparkles className="w-3 h-3 text-amber-400" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Chat Window (Bottom-Left) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] h-[520px] bg-[#20201E] text-[#F4F1EA] border border-[#3A3935] rounded-2xl shadow-2xl overflow-hidden flex flex-col font-pt-sans text-xs"
          >
            {/* Header */}
            <div className="bg-[#282825] px-4 py-3 border-b border-[#3A3935] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#C7462D] text-[#F4F1EA] flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-xs block text-[#F4F1EA]">AI Portfolio Assistant</span>
                  <span className="text-[10px] text-[#A3A09A]">Instant Knowledge Base</span>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    playClick();
                    setMessages([
                      {
                        id: 'reset',
                        sender: 'bot',
                        text: 'Chat reset. What would you like to know about Janmark?',
                        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                      },
                    ]);
                  }}
                  className="p-1 text-[#A3A09A] hover:text-[#F4F1EA] rounded-md transition-colors"
                  title="Reset chat"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => {
                    playClick();
                    setIsOpen(false);
                  }}
                  className="p-1 text-[#A3A09A] hover:text-[#F4F1EA] hover:bg-[#3A3935] rounded-md transition-colors"
                  aria-label="Close Chatbot"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#171717]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'bot' && (
                    <div className="w-6 h-6 rounded-md bg-[#C7462D] text-[#F4F1EA] flex items-center justify-center shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] p-3 rounded-xl leading-relaxed text-xs ${
                      msg.sender === 'user'
                        ? 'bg-[#C7462D] text-[#F4F1EA] rounded-tr-none font-medium'
                        : 'bg-[#282825] text-[#F4F1EA] border border-[#3A3935] rounded-tl-none'
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className="text-[9px] opacity-60 block mt-1 text-right">{msg.timestamp}</span>
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-6 h-6 rounded-md bg-[#3A3935] text-[#F4F1EA] flex items-center justify-center shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2.5 items-center text-[#A3A09A]">
                  <div className="w-6 h-6 rounded-md bg-[#C7462D] text-[#F4F1EA] flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="bg-[#282825] px-3 py-2 rounded-xl border border-[#3A3935] text-[11px] animate-pulse">
                    Thinking...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Sample Questions */}
            <div className="p-2.5 bg-[#20201E] border-t border-[#3A3935] overflow-x-auto flex gap-1.5 scrollbar-none">
              {QUICK_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onMouseEnter={playHover}
                  onClick={() => handleSendMessage(q)}
                  className="px-2.5 py-1 bg-[#282825] hover:bg-[#C7462D] text-[#A3A09A] hover:text-[#F4F1EA] border border-[#3A3935] rounded-md text-[10px] whitespace-nowrap transition-colors flex items-center gap-1 shrink-0 font-pt-sans font-semibold"
                >
                  <span>{q}</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              ))}
            </div>

            {/* Input Footer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-[#282825] border-t border-[#3A3935] flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about skills, CareerOS, contact info..."
                className="flex-1 bg-[#171717] border border-[#3A3935] rounded-lg px-3 py-2 text-xs text-[#F4F1EA] focus:border-[#C7462D] focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-2 bg-[#C7462D] hover:bg-[#a63723] disabled:opacity-50 text-[#F4F1EA] rounded-lg transition-colors"
                aria-label="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
