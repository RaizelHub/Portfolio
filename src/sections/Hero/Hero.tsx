import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail, MapPin } from 'lucide-react';
import { SectionContainer } from '../../components/layout/SectionContainer';
import { profile } from '../../data/profile';

export const Hero = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = profile.resumeUrl;
    link.download = 'Suelto-Janmark-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <SectionContainer id="home" className="relative pt-12 pb-16 lg:py-20 border-b border-[#D5D0C7]">
      {/* Top Monospace Technical Metadata Line */}
      <div className="flex flex-wrap items-center justify-end gap-3 text-xs font-mono text-[#6B6862] pb-6 mb-8 border-b border-[#D5D0C7]">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-[#171717]">
            <MapPin className="w-3.5 h-3.5 text-[#C7462D]" /> BUKIDNON, PHILIPPINES
          </span>
          <span className="hidden sm:inline text-[#D5D0C7]">|</span>
          <span className="hidden sm:flex items-center gap-1.5 text-[#171717]">
            <span>STATUS: AVAILABLE FOR JUNIOR FULL-STACK &amp; AUTOMATION ROLES</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column: Profile Image */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-start order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-sm"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[2px]">
              <img
                src={profile.profileImage}
                alt="Janmark Suelto"
                className="w-full h-full object-cover object-top grayscale contrast-105 transition-all duration-500"
              />
            </div>

            <div className="mt-3 pt-2 border-t border-[#D5D0C7] flex justify-between items-center text-[11px] font-mono text-[#6B6862]">
              <span>JANMARK M. SUELTO</span>
              <span className="text-[#C7462D]">BSIT / CCNA / DEV</span>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Editorial Headline & Bio */}
        <div className="lg:col-span-7 flex flex-col space-y-6 order-1 lg:order-2">
          <div className="space-y-4">
            <span className="font-mono text-xs font-semibold text-[#6B6862] uppercase tracking-widest block">
              JUNIOR FULL-STACK DEVELOPER WITH AN AUTOMATION SPECIALIZATION
            </span>

            <h1 className="hero-title uppercase text-[#171717]">
              JANMARK SUELTO <br />
              <span className="text-[#C7462D]">JUNIOR FULL-STACK</span> DEVELOPER
            </h1>

            <p className="text-lg sm:text-xl text-[#171717] font-medium leading-snug pt-2">
              Building high-performance React &amp; TypeScript applications connected to APIs, n8n workflows, and AI integration engines.
            </p>

            <p className="text-sm sm:text-base text-[#6B6862] leading-relaxed max-w-2xl">
              Specialized in lead-management platforms, job discovery systems, automated order processing, administrative tools, and real-time IoT monitoring solutions with technical precision.
            </p>
          </div>

          {/* Technical Specs Checklist */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs text-[#171717] pt-2 border-t border-[#D5D0C7]/80">
            <div>
              <span className="text-[#6B6862] block text-[10px]">STACK</span>
              <span>React 19 / TS / Node</span>
            </div>
            <div>
              <span className="text-[#6B6862] block text-[10px]">WORKFLOWS</span>
              <span>n8n / REST / AI APIs</span>
            </div>
            <div>
              <span className="text-[#6B6862] block text-[10px]">LOCATION</span>
              <span>Bukidnon, PH (GMT+8)</span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-4 font-mono text-xs">
            <button
              onClick={() => scrollToSection('projects')}
              className="px-5 py-3 bg-[#171717] hover:bg-[#C7462D] text-[#F4F1EA] font-semibold rounded-[2px] transition-colors flex items-center gap-2 uppercase tracking-wider"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleDownloadResume}
              className="px-5 py-3 bg-transparent hover:bg-[#EFEBE4] text-[#171717] border border-[#D5D0C7] hover:border-[#171717] font-semibold rounded-[2px] transition-colors flex items-center gap-2 uppercase tracking-wider"
            >
              <Download className="w-4 h-4 text-[#C7462D]" />
              <span>Resume PDF</span>
            </button>

            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-contact-modal'))}
              className="px-5 py-3 bg-transparent hover:bg-[#EFEBE4] text-[#171717] border border-[#D5D0C7] hover:border-[#171717] font-semibold rounded-[2px] transition-colors flex items-center gap-2 uppercase tracking-wider"
            >
              <Mail className="w-4 h-4 text-[#C7462D]" />
              <span>Let's Talk?</span>
            </button>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};