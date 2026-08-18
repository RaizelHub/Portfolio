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
            className="fixed bottom-6 right-6 z-50 bg-[var(--surface-elevated)] hover:bg-[var(--surface-hover)] text-[var(--text-primary)] px-4 py-3 rounded-lg border border-[var(--border)] shadow-xl flex items-center gap-2 text-xs font-semibold transition-colors duration-150 group cursor-pointer"
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
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[85vh] bg-[var(--surface)] text-[var(--text-primary)] border border-[var(--border)] rounded-xl shadow-2xl overflow-hidden flex flex-col font-mono text-xs"
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
              <div className="bg-[var(--surface-elevated)] p-3.5 border border-[var(--border-subtle)] rounded-lg space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[var(--text-muted)]">DIRECT EMAIL</span>
                  <div className="flex items-center gap-1.5">
                    <a href={`mailto:${profile.email}`} className="font-bold text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors">
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
                      className={`w-full bg-[var(--background)] border text-[var(--text-primary)] rounded-md px-3 py-2 text-xs focus:border-[var(--accent)] focus:outline-none ${formErrors.name ? 'border-[var(--error)]' : 'border-[var(--border-subtle)]'}`}
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
                      className={`w-full bg-[var(--background)] border text-[var(--text-primary)] rounded-md px-3 py-2 text-xs focus:border-[var(--accent)] focus:outline-none ${formErrors.email ? 'border-[var(--error)]' : 'border-[var(--border-subtle)]'}`}
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
                    className={`w-full bg-[var(--background)] border text-[var(--text-primary)] rounded-md px-3 py-2 text-xs focus:border-[var(--accent)] focus:outline-none ${formErrors.subject ? 'border-[var(--error)]' : 'border-[var(--border-subtle)]'}`}
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
                    className={`w-full bg-[var(--background)] border text-[var(--text-primary)] rounded-md px-3 py-2 text-xs focus:border-[var(--accent)] focus:outline-none ${formErrors.message ? 'border-[var(--error)]' : 'border-[var(--border-subtle)]'}`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className="w-full py-2.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--on-accent)] font-sans font-semibold rounded-md transition-colors flex items-center justify-center gap-2 text-xs cursor-pointer"
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
