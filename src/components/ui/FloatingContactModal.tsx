import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Send, CheckCircle2, Copy, X, MessageSquare } from 'lucide-react';
import { profile } from '../../data/profile';

export const FloatingContactModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [copied, setCopied] = useState(false);

  // Global event listener to trigger modal from anywhere
  useEffect(() => {
    const handleOpenModal = () => setIsOpen(true);
    window.addEventListener('open-contact-modal', handleOpenModal);
    return () => window.removeEventListener('open-contact-modal', handleOpenModal);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: '' });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Valid email is required';
    }
    if (!formData.subject.trim()) errors.subject = 'Subject is required';
    if (!formData.message.trim()) errors.message = 'Message is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormStatus('loading');

    try {
      const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;

      if (WEB3FORMS_KEY) {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            name: formData.name,
            email: formData.email,
            subject: `Portfolio Inquiry: ${formData.subject} — from ${formData.name}`,
            message: formData.message,
            from_name: 'Portfolio Floating Contact',
          }),
        });
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error(result.message || 'Submission failed');
        setFormStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const mailSubject = encodeURIComponent(`Inquiry: ${formData.subject}`);
        const mailBody = encodeURIComponent(
          `Name: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\nMessage:\n${formData.message}`
        );
        window.open(`mailto:${profile.email}?subject=${mailSubject}&body=${mailBody}`, '_blank');
        setFormStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }

      setTimeout(() => {
        setFormStatus('idle');
      }, 4000);
    } catch {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 4000);
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
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 bg-[#171717] hover:bg-[#C7462D] text-[#F4F1EA] px-4 py-3 rounded-[2px] border border-[#D5D0C7] shadow-xl flex items-center gap-2.5 font-mono text-xs font-bold transition-all duration-200 uppercase tracking-wider group"
            aria-label="Open Floating Contact"
          >
            <Mail className="w-4 h-4 text-[#C7462D] group-hover:text-[#F4F1EA] transition-colors" />
            <span>CONTACT ME?</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Contact Modal Window (Bottom-Right) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[440px] max-h-[85vh] bg-[#20201E] text-[#F4F1EA] border border-[#3A3935] rounded-[2px] shadow-2xl overflow-hidden flex flex-col font-mono text-xs"
          >
            {/* Header */}
            <div className="bg-[#282825] px-5 py-3.5 border-b border-[#3A3935] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C7462D]" />
                <span className="font-bold uppercase tracking-wider text-xs">
                  DIRECT TRANSMISSION // EMAIL
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-[#A3A09A] hover:text-[#F4F1EA] hover:bg-[#3A3935] rounded-[1px] transition-colors"
                aria-label="Close Contact Modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-5 overflow-y-auto space-y-4 flex-1">
              
              {/* Quick Communication Links */}
              <div className="bg-[#282825] p-3.5 border border-[#3A3935] rounded-[1px] space-y-2.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#A3A09A]">PRIMARY EMAIL</span>
                  <div className="flex items-center gap-1.5">
                    <a href={`mailto:${profile.email}`} className="font-bold text-[#F4F1EA] hover:text-[#C7462D] transition-colors">
                      {profile.email}
                    </a>
                    <button
                      onClick={handleCopyEmail}
                      className="p-0.5 text-[#A3A09A] hover:text-[#F4F1EA]"
                      title="Copy Email"
                    >
                      {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-[#C7462D]" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-2 border-t border-[#3A3935]">
                  <span className="text-[#A3A09A]">CHANNELS</span>
                  <div className="flex items-center gap-3">
                    <a
                      href={profile.messengerUrl || 'https://m.me/Raizelxdarriii90'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#F4F1EA] hover:text-[#C7462D] flex items-center gap-1 font-bold"
                    >
                      <MessageSquare className="w-3 h-3 text-[#C7462D]" />
                      <span>Messenger ↗</span>
                    </a>
                    <a
                      href={profile.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#F4F1EA] hover:text-[#C7462D] flex items-center gap-1 font-bold"
                    >
                      <Phone className="w-3 h-3 text-[#C7462D]" />
                      <span>WhatsApp ↗</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleFormSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[#A3A09A] text-[10px] uppercase block mb-1">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      placeholder="Janmark Suelto"
                      className={`w-full bg-[#171717] border text-[#F4F1EA] rounded-[1px] px-3 py-2 text-xs focus:border-[#C7462D] focus:outline-none ${formErrors.name ? 'border-[#C7462D]' : 'border-[#3A3935]'}`}
                    />
                    {formErrors.name && <span className="text-[10px] text-[#C7462D] block mt-0.5">{formErrors.name}</span>}
                  </div>

                  <div>
                    <label className="text-[#A3A09A] text-[10px] uppercase block mb-1">Your Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      placeholder="janmark@example.com"
                      className={`w-full bg-[#171717] border text-[#F4F1EA] rounded-[1px] px-3 py-2 text-xs focus:border-[#C7462D] focus:outline-none ${formErrors.email ? 'border-[#C7462D]' : 'border-[#3A3935]'}`}
                    />
                    {formErrors.email && <span className="text-[10px] text-[#C7462D] block mt-0.5">{formErrors.email}</span>}
                  </div>
                </div>

                <div>
                  <label className="text-[#A3A09A] text-[10px] uppercase block mb-1">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleFormChange}
                    placeholder="Project Inquiry / Job Offer"
                    className={`w-full bg-[#171717] border text-[#F4F1EA] rounded-[1px] px-3 py-2 text-xs focus:border-[#C7462D] focus:outline-none ${formErrors.subject ? 'border-[#C7462D]' : 'border-[#3A3935]'}`}
                  />
                  {formErrors.subject && <span className="text-[10px] text-[#C7462D] block mt-0.5">{formErrors.subject}</span>}
                </div>

                <div>
                  <label className="text-[#A3A09A] text-[10px] uppercase block mb-1">Message</label>
                  <textarea
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleFormChange}
                    placeholder="Requirements, timeline, or inquiries..."
                    className={`w-full bg-[#171717] border text-[#F4F1EA] rounded-[1px] px-3 py-2 text-xs focus:border-[#C7462D] focus:outline-none ${formErrors.message ? 'border-[#C7462D]' : 'border-[#3A3935]'}`}
                  />
                  {formErrors.message && <span className="text-[10px] text-[#C7462D] block mt-0.5">{formErrors.message}</span>}
                </div>

                <div className="pt-1 flex items-center justify-between gap-3">
                  <button
                    type="submit"
                    disabled={formStatus === 'loading'}
                    className="w-full py-2.5 bg-[#C7462D] hover:bg-[#a63723] text-[#F4F1EA] font-mono font-bold uppercase rounded-[1px] transition-colors flex items-center justify-center gap-2 tracking-wider text-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{formStatus === 'loading' ? 'TRANSMITTING...' : 'SUBMIT TRANSMISSION →'}</span>
                  </button>
                </div>

                {formStatus === 'success' && (
                  <div className="p-2.5 bg-[#282825] border border-[#C7462D] text-[#C7462D] font-bold text-xs flex items-center gap-2 rounded-[1px]">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>TRANSMISSION SENT SUCCESSFULLY.</span>
                  </div>
                )}
              </form>
            </div>

            {/* Footer status bar */}
            <div className="bg-[#171717] px-4 py-2 border-t border-[#3A3935] flex items-center justify-between text-[10px] text-[#A3A09A]">
              <span>BUKIDNON, PH (UTC+8)</span>
              <span className="text-[#C7462D]">AVAILABLE FOR CONTRACT</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
