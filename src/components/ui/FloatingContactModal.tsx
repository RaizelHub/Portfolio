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
            className="group fixed bottom-6 right-6 lg:right-72 z-50 flex min-h-11 cursor-pointer items-center gap-2 border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 font-nav text-xs font-semibold tracking-tight text-[var(--text-primary)] shadow-[var(--shadow-soft)] transition-all duration-200 hover:-translate-y-px hover:border-[var(--accent)] hover:bg-[var(--surface-hover)]"
            aria-label="Open Contact Modal"
          >
            <Mail className="w-4 h-4 text-[var(--accent)] transition-colors" />
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
            className="fixed bottom-4 right-4 z-50 flex max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] min-w-0 flex-col overflow-hidden border border-[var(--border)] bg-[var(--surface)] font-mono text-xs text-[var(--text-primary)] shadow-2xl sm:bottom-6 sm:right-6 lg:right-70 sm:max-h-[calc(100dvh-3rem)] sm:w-[420px]"
          >
            {/* Header */}
            <div className="bg-[var(--surface-elevated)] px-5 py-3 border-b border-[var(--border-subtle)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[var(--accent)]" />
                <span className="font-bold tracking-wider text-xs">
                  Send Message
                </span>
              </div>
              <button
                onClick={() => {
                  playClick();
                  setIsOpen(false);
                }}
                className="p-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-black/5 dark:hover:bg-white/5 rounded-md transition-colors"
                aria-label="Close Contact Modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-5 overflow-y-auto space-y-4 flex-1">
              <div className="space-y-2 border-l border-[var(--accent)] bg-[var(--surface-elevated)] p-3.5">
                <div className="flex min-w-0 flex-col items-start gap-2 text-[11px] sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-[var(--text-muted)]">DIRECT EMAIL</span>
                  <div className="flex min-w-0 items-center gap-1.5">
                    <a href={`mailto:${profile.email}`} className="break-safe min-w-0 font-semibold text-[var(--text-primary)] transition-colors hover:text-[var(--accent)]">
                      {profile.email}
                    </a>
                    <button
                      onClick={handleCopyEmail}
                      className="p-0.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
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
                    <label className="text-[var(--text-muted)] text-[10px] uppercase block mb-1">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      placeholder="Name"
                      className={`w-full border bg-[var(--background)] px-3 py-2 text-xs text-[var(--text-primary)] focus:border-[var(--accent)] focus:outline-none ${formErrors.name ? 'border-[var(--error)]' : 'border-[var(--border-subtle)]'}`}
                    />
                  </div>

                  <div>
                    <label className="text-[var(--text-muted)] text-[10px] uppercase block mb-1">Your Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      placeholder="email@domain.com"
                      className={`w-full border bg-[var(--background)] px-3 py-2 text-xs text-[var(--text-primary)] focus:border-[var(--accent)] focus:outline-none ${formErrors.email ? 'border-[var(--error)]' : 'border-[var(--border-subtle)]'}`}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[var(--text-muted)] text-[10px] uppercase block mb-1">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleFormChange}
                    placeholder="Project Inquiry / Job Opportunity"
                    className={`w-full border bg-[var(--background)] px-3 py-2 text-xs text-[var(--text-primary)] focus:border-[var(--accent)] focus:outline-none ${formErrors.subject ? 'border-[var(--error)]' : 'border-[var(--border-subtle)]'}`}
                  />
                </div>

                <div>
                  <label className="text-[var(--text-muted)] text-[10px] uppercase block mb-1">Message</label>
                  <textarea
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleFormChange}
                    placeholder="Project scope, timeline, or requirements..."
                    className={`w-full border bg-[var(--background)] px-3 py-2 text-xs text-[var(--text-primary)] focus:border-[var(--accent)] focus:outline-none ${formErrors.message ? 'border-[var(--error)]' : 'border-[var(--border-subtle)]'}`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className="flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 bg-[var(--accent)] py-2.5 font-nav text-xs font-semibold tracking-tight text-[var(--on-accent)] transition-colors hover:bg-[var(--accent-hover)]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{formStatus === 'loading' ? 'Sending...' : 'Send Message'}</span>
                </button>

                {formStatus === 'success' && (
                  <div className="p-2.5 bg-[var(--surface-elevated)] border border-[var(--success)] text-[var(--success)] font-semibold text-xs flex items-center gap-2 rounded-md">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
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
