import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { SectionContainer } from '../../components/layout/SectionContainer';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { profile } from '../../data/profile';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Web Development',
    message: '',
  });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
    if (!formData.message.trim()) errors.message = 'Message is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormStatus('loading');

    try {
      const WEB3FORMS_KEY = 'YOUR_WEB3FORMS_ACCESS_KEY';

      if (WEB3FORMS_KEY === 'YOUR_WEB3FORMS_ACCESS_KEY') {
        const subject = encodeURIComponent(`Inquiry from ${formData.name}: ${formData.service}`);
        const body = encodeURIComponent(
          `Name: ${formData.name}\nEmail: ${formData.email}\nService Requested: ${formData.service}\n\nMessage:\n${formData.message}`
        );
        window.open(`mailto:${profile.email}?subject=${subject}&body=${body}`, '_blank');
        setFormStatus('success');
      } else {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            name: formData.name,
            email: formData.email,
            subject: `Portfolio Inquiry: ${formData.service} — from ${formData.name}`,
            message: formData.message,
            service: formData.service,
            from_name: 'Portfolio Contact Form',
          }),
        });
        const result = await response.json();
        if (!response.ok || !result.success) throw new Error(result.message || 'Submission failed');
        setFormStatus('success');
      }

      setFormData({ name: '', email: '', service: 'Web Development', message: '' });
      setTimeout(() => setFormStatus('idle'), 5000);
    } catch {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 4000);
    }
  };

  return (
    <SectionContainer id="contact">
      <SectionHeading
        tag="08 / Contact"
        title="Ready to start? Let's talk."
        subtitle="Whether you're hiring for a full-time role, a contract project, or an AI automation workflow — send me a message and I'll get back to you within 24 hours."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-navy-800/20 border border-navy-700/40 p-6 rounded-lg space-y-4">
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-slate-500 font-mono block">Email</span>
                <a href={`mailto:${profile.email}`} className="text-sm font-bold text-white hover:text-emerald-400 transition-colors">
                  {profile.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-slate-500 font-mono block">Phone / WhatsApp</span>
                <a href={`tel:${profile.phone}`} className="text-sm font-bold text-white hover:text-emerald-400 transition-colors">
                  {profile.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-slate-500 font-mono block">Location</span>
                <span className="text-sm font-bold text-white">{profile.location} (Remote &amp; Onsite OK)</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-slate-500 font-mono block">Available Hours</span>
                <span className="text-sm font-bold text-white">{profile.timezone}</span>
              </div>
            </div>
          </div>

          <div className="bg-navy-800/20 border border-navy-700/40 p-6 rounded-lg text-center flex flex-col items-center">
            <div className="flex items-center justify-center mb-3">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">Scan to Chat</span>
            </div>

            <a
              href={profile.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative block w-44 h-44 bg-white p-2.5 rounded-lg overflow-hidden border-2 border-emerald-500/20 group cursor-pointer"
            >
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://wa.me/qr/YHP7U5VEMH5IP1&bgcolor=ffffff&color=059669&qzone=2&format=png"
                alt="WhatsApp Chat QR"
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 bg-emerald-600/90 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="font-semibold text-sm">Open WhatsApp</span>
                <span className="text-[10px] text-emerald-200">wa.me/639690221571</span>
              </div>
            </a>
            <span className="text-[11px] text-slate-500 font-mono mt-3 select-none">Or tap to launch chat directly</span>
          </div>
        </div>

        <div className="lg:col-span-8 bg-navy-800/10 border border-navy-700/40 p-6 sm:p-8 rounded-lg relative">
          <h3 className="font-bold text-white text-lg mb-2">Send a Message</h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
            Use the form below to send me your project details. I typically respond within 24 hours.
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
                  className={`w-full bg-navy-950 border text-white rounded px-4 py-2.5 text-sm transition-all focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 ${formErrors.name ? 'border-rose-500' : 'border-navy-700'}`}
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
                  className={`w-full bg-navy-950 border text-white rounded px-4 py-2.5 text-sm transition-all focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 ${formErrors.email ? 'border-rose-500' : 'border-navy-700'}`}
                />
                {formErrors.email && <span className="text-[10px] text-rose-400 font-semibold block mt-1">{formErrors.email}</span>}
              </div>
            </div>

            <div>
              <label htmlFor="service" className="text-xs font-semibold text-slate-400 font-mono block mb-1">Service Area</label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleFormChange}
                className="w-full bg-navy-950 border border-navy-700 text-slate-300 rounded px-4 py-2.5 text-sm transition-all focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
              >
                <option>Web Development</option>
                <option>Database Development</option>
                <option>API Development</option>
                <option>Multi-Tenant SaaS Solutions</option>
                <option>Data Entry &amp; Organization</option>
                <option>Virtual Assistance &amp; Email Support</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="text-xs font-semibold text-slate-400 font-mono block mb-1">Project Brief / Details</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleFormChange}
                placeholder="Outline what you are building, the estimated timeframe, or VA tasks..."
                className={`w-full bg-navy-950 border text-white rounded px-4 py-2.5 text-sm transition-all focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 ${formErrors.message ? 'border-rose-500' : 'border-navy-700'}`}
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
                Send Inquiry
              </Button>

              {formStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  Message sent! I'll respond within 24 hours.
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