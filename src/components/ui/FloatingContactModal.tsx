import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, X, Send, CheckCircle2, Copy } from 'lucide-react';
import { profile } from '../../data/profile';
import { useSound } from '../../context/SoundContext';

export const FloatingContactModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const { playHover, playClick } = useSound();

  useEffect(() => {
    const handleOpenModal = () => setIsOpen(true);
    window.addEventListener('open-contact-modal', handleOpenModal);
    return () => window.removeEventListener('open-contact-modal', handleOpenModal);
  }, []);

  const handleCopyEmail = () => {
    playClick();
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email address';
    }
    if (!formData.subject.trim()) errors.subject = 'Subject is required';
    if (!formData.message.trim()) errors.message = 'Message is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    if (!validateForm()) return;

    setFormStatus('loading');
    try {
      const formspreeEndpoint = 'https://formspree.io/f/mqaevevp';
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => {
          setFormStatus('idle');
          setIsOpen(false);
        }, 2500);
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom-Right) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => {
              playClick();
              setIsOpen(true);
            }}
            onMouseEnter={playHover}
            className="group fixed bottom-6 right-6 z-50 flex min-h-11 cursor-pointer items-center gap-2 border-2 border-black dark:border-white bg-[var(--surface-elevated)] px-4 py-3 font-nav text-xs font-bold tracking-tight text-[var(--text-primary)] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all duration-120 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[5px_5px_0px_0px_rgba(255,255,255,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
            aria-label="Open Contact Modal"
          >
            <Mail className="w-4 h-4 text-[var(--accent)] transition-colors" strokeWidth={2.5} />
            <span>Contact</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Contact Modal Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="fixed bottom-4 right-4 z-50 flex max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] min-w-0 flex-col overflow-hidden border-2 border-black dark:border-white bg-[var(--surface)] font-mono text-xs text-[var(--text-primary)] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] sm:bottom-6 sm:right-6 sm:max-h-[calc(100dvh-3rem)] sm:w-[420px]"
          >
            {/* Header */}
            <div className="bg-[var(--surface-elevated)] px-5 py-3.5 border-b-2 border-black dark:border-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[var(--accent)]" strokeWidth={2.5} />
                <span className="font-bold tracking-wider text-xs uppercase">
                  Send Message
                </span>
              </div>
              <button
                onClick={() => {
                  playClick();
                  setIsOpen(false);
                }}
                className="p-1 border border-black dark:border-white bg-[var(--surface)] text-[var(--text-primary)] hover:bg-[var(--accent)] hover:text-[var(--on-accent)] shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] dark:shadow-[1px_1px_0px_0px_rgba(255,255,255,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
                aria-label="Close Contact Modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-5 overflow-y-auto space-y-4 flex-1">
              <div className="space-y-2 border-2 border-black dark:border-white bg-[var(--surface-elevated)] p-3.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                <div className="flex min-w-0 flex-col items-start gap-2 text-[11px] sm:flex-row sm:items-center sm:justify-between">
                  <span className="font-bold text-[var(--text-muted)]">DIRECT EMAIL</span>
                  <div className="flex min-w-0 items-center gap-1.5">
                    <a href={`mailto:${profile.email}`} className="break-safe min-w-0 font-bold text-[var(--text-primary)] hover:underline">
                      {profile.email}
                    </a>
                    <button
                      onClick={handleCopyEmail}
                      className="p-0.5 text-[var(--text-primary)] hover:scale-110 cursor-pointer"
                      title="Copy Email"
                    >
                      {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent)]" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleFormSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[var(--text-primary)] font-bold text-[10px] uppercase block mb-1">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      placeholder="Name"
                      className={`w-full border-2 bg-[var(--background)] px-3 py-2 text-xs font-mono text-[var(--text-primary)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] focus:outline-none ${formErrors.name ? 'border-[var(--error)]' : 'border-black dark:border-white'}`}
                    />
                  </div>

                  <div>
                    <label className="text-[var(--text-primary)] font-bold text-[10px] uppercase block mb-1">Your Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      placeholder="email@domain.com"
                      className={`w-full border-2 bg-[var(--background)] px-3 py-2 text-xs font-mono text-[var(--text-primary)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] focus:outline-none ${formErrors.email ? 'border-[var(--error)]' : 'border-black dark:border-white'}`}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[var(--text-primary)] font-bold text-[10px] uppercase block mb-1">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleFormChange}
                    placeholder="Project Inquiry / Job Opportunity"
                    className={`w-full border-2 bg-[var(--background)] px-3 py-2 text-xs font-mono text-[var(--text-primary)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] focus:outline-none ${formErrors.subject ? 'border-[var(--error)]' : 'border-black dark:border-white'}`}
                  />
                </div>

                <div>
                  <label className="text-[var(--text-primary)] font-bold text-[10px] uppercase block mb-1">Message</label>
                  <textarea
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleFormChange}
                    placeholder="Project scope, timeline, or requirements..."
                    className={`w-full border-2 bg-[var(--background)] px-3 py-2 text-xs font-mono text-[var(--text-primary)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] focus:outline-none ${formErrors.message ? 'border-[var(--error)]' : 'border-black dark:border-white'}`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className="flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 border-2 border-black dark:border-white bg-black dark:bg-white text-white dark:text-black py-2.5 font-nav text-xs font-bold tracking-tight shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] transition-all duration-120 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none"
                >
                  <Send className="w-3.5 h-3.5" strokeWidth={2.5} />
                  <span>{formStatus === 'loading' ? 'Sending...' : 'Send Message'}</span>
                </button>

                {formStatus === 'success' && (
                  <div className="p-2.5 bg-[var(--surface-elevated)] border-2 border-black dark:border-white text-[var(--text-primary)] font-bold text-xs flex items-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-green-600" />
                    <span>Message sent successfully.</span>
                  </div>
                )}
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
