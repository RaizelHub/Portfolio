import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, Copy, MessageSquare } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { SectionContainer } from '../../components/layout/SectionContainer';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { profile } from '../../data/profile';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [copied, setCopied] = useState(false);

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
      errors.email = 'Please enter a valid email address';
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
            from_name: 'Portfolio Contact Form',
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

      setTimeout(() => setFormStatus('idle'), 5000);
    } catch {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  return (
    <SectionContainer id="contact">
      <SectionHeading
        tag="07 / Contact"
        title="Let's work together"
        subtitle="I am open to junior full-stack development, web development, workflow automation, technical support, and related remote opportunities."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-navy-800/20 border border-navy-700/40 p-6 rounded-xl space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-slate-500 font-mono block">Email</span>
                <div className="flex items-center gap-2">
                  <a href={`mailto:${profile.email}`} className="text-sm font-bold text-white hover:text-emerald-400 transition-colors">
                    {profile.email}
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1 rounded text-slate-500 hover:text-emerald-400 hover:bg-navy-800 transition-colors"
                    aria-label="Copy email address"
                  >
                    {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-slate-500 font-mono block">Messenger</span>
                <a href={profile.messengerUrl || 'https://m.me/Raizelxdarriii90'} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-white hover:text-emerald-400 transition-colors">
                  Chat on Messenger
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-slate-500 font-mono block">WhatsApp</span>
                <a href={profile.whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-white hover:text-emerald-400 transition-colors">
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-slate-500 font-mono block">Location</span>
                <span className="text-sm font-bold text-white">Bukidnon, Philippines</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-slate-500 font-mono block">Availability</span>
                <span className="text-sm font-bold text-white">Open to Remote Opportunities</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 bg-navy-800/10 border border-navy-700/40 p-6 sm:p-8 rounded-xl relative">
          <h3 className="font-bold text-white text-lg mb-2">Send a Direct Message</h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
            Fill out the form below to get in touch. I aim to respond to all opportunities promptly.
          </p>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="text-xs font-semibold text-slate-400 font-mono block mb-1">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  placeholder="Enter your name"
                  className={`w-full bg-navy-950 border text-white rounded-lg px-4 py-2.5 text-sm transition-all focus:border-emerald-500 focus:outline-none ${formErrors.name ? 'border-rose-500' : 'border-navy-700'}`}
                />
                {formErrors.name && <span className="text-[10px] text-rose-400 font-semibold block mt-1">{formErrors.name}</span>}
              </div>

              <div>
                <label htmlFor="email" className="text-xs font-semibold text-slate-400 font-mono block mb-1">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="Enter your email address"
                  className={`w-full bg-navy-950 border text-white rounded-lg px-4 py-2.5 text-sm transition-all focus:border-emerald-500 focus:outline-none ${formErrors.email ? 'border-rose-500' : 'border-navy-700'}`}
                />
                {formErrors.email && <span className="text-[10px] text-rose-400 font-semibold block mt-1">{formErrors.email}</span>}
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="text-xs font-semibold text-slate-400 font-mono block mb-1">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleFormChange}
                placeholder="Job Opportunity / Project Inquiry"
                className={`w-full bg-navy-950 border text-white rounded-lg px-4 py-2.5 text-sm transition-all focus:border-emerald-500 focus:outline-none ${formErrors.subject ? 'border-rose-500' : 'border-navy-700'}`}
              />
              {formErrors.subject && <span className="text-[10px] text-rose-400 font-semibold block mt-1">{formErrors.subject}</span>}
            </div>

            <div>
              <label htmlFor="message" className="text-xs font-semibold text-slate-400 font-mono block mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleFormChange}
                placeholder="Details about the role, project, or task..."
                className={`w-full bg-navy-950 border text-white rounded-lg px-4 py-2.5 text-sm transition-all focus:border-emerald-500 focus:outline-none ${formErrors.message ? 'border-rose-500' : 'border-navy-700'}`}
              />
              {formErrors.message && <span className="text-[10px] text-rose-400 font-semibold block mt-1">{formErrors.message}</span>}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Button
                type="submit"
                variant="primary"
                isLoading={formStatus === 'loading'}
                leftIcon={<Send className="w-4 h-4" />}
                className="w-full sm:w-auto"
              >
                Send Message
              </Button>

              {formStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  Message sent! Thank you for reaching out.
                </motion.div>
              )}
              {formStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-xs text-rose-400 font-semibold flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  Something went wrong. Please email {profile.email} directly.
                </motion.div>
              )}
            </div>
          </form>
        </div>
      </div>
    </SectionContainer>
  );
};