import { motion } from 'framer-motion';
import { ArrowRight, Download, Mail, MapPin } from 'lucide-react';
import { Button } from '../../components/ui/Button';
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
    link.download = 'Janmark-Suelto-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <SectionContainer id="home" className="relative min-h-[85vh] pt-24 lg:pt-32 flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b10_1px,transparent_1px),linear-gradient(to_bottom,#1e293b10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)] pointer-events-none" />

      <div className="relative w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
          {/* Status Line */}
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1.5 rounded-full w-fit">
            <span className="text-xs font-semibold font-mono text-emerald-300">
              Open to remote junior development and automation opportunities
            </span>
          </div>

          {/* Name & Role Heading */}
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest block">
              Full-Stack Developer &amp; AI Automation Specialist
            </span>
            <h1 className="hero-title text-white uppercase">
              Janmark Suelto
            </h1>
            <p className="text-base sm:text-lg text-slate-200 font-medium tracking-tight pt-1">
              Focused on Web Applications and Workflow Automation
            </p>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl pt-1">
              I build React and TypeScript applications connected to APIs, databases, n8n workflows, and AI services. My projects include lead-management systems, job-discovery tools, order-processing automations, administrative applications, and IoT monitoring systems.
            </p>
          </div>

          {/* Location & Details */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono pt-1">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Based in Bukidnon, Philippines
            </span>
            <span className="text-navy-700">&bull;</span>
            <span className="text-slate-300">Full-Stack &amp; Workflow Automation</span>
          </div>

          {/* Three Primary Actions */}
          <div className="flex flex-wrap gap-3 pt-4">
            <Button
              variant="primary"
              size="lg"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={() => scrollToSection('projects')}
            >
              View Selected Work
            </Button>
            <Button
              variant="secondary"
              size="lg"
              leftIcon={<Download className="w-4 h-4 text-emerald-400" />}
              onClick={handleDownloadResume}
            >
              Download R&eacute;sum&eacute;
            </Button>
            <Button
              variant="secondary"
              size="lg"
              leftIcon={<Mail className="w-4 h-4 text-emerald-400" />}
              onClick={() => scrollToSection('contact')}
            >
              Contact Me
            </Button>
          </div>
        </div>

        {/* Clean Profile Image — No Card Wrapper */}
        <div className="lg:col-span-5 w-full flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative w-full max-w-xs sm:max-w-sm aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 group"
          >
            <img
              src={profile.profileImage}
              alt="Janmark Suelto"
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
            />
          </motion.div>
        </div>
      </div>
    </SectionContainer>
  );
};