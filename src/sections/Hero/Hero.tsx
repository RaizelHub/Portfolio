import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Clock, Code2, Workflow, ShieldCheck } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { SectionContainer } from '../../components/layout/SectionContainer';
import { profile } from '../../data/profile';

export const Hero = () => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <SectionContainer id="home" className="relative min-h-screen pt-28 flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b10_1px,transparent_1px),linear-gradient(to_bottom,#1e293b10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)] pointer-events-none" />

      <div className="relative w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
          <div className="inline-flex items-center bg-emerald-500/10 border border-emerald-500/25 px-3 py-1.5 rounded-full w-fit">
            <span className="text-xs font-semibold text-emerald-400 select-none">
              Open for Remote Roles &amp; AI Automation Projects
            </span>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Full-Stack Developer &amp; <br />
              <span className="text-emerald-400">AI Automation Specialist.</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed max-w-xl">
              Building modern React/TypeScript web platforms, Express REST microservices, Supabase PostgreSQL architectures, and n8n AI workflow pipelines that automate core operations.
            </p>
          </div>

          {/* System Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 pt-1 border-y border-navy-800/80 py-4 max-w-xl">
            <div className="flex flex-col">
              <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5" /> 7 Projects
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5">Full-Stack Applications Built</span>
            </div>
            <div className="flex flex-col border-l border-navy-800/80 pl-3">
              <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                <Workflow className="w-3.5 h-3.5" /> n8n
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5">Automation Pipelines</span>
            </div>
            <div className="flex flex-col border-l border-navy-800/80 pl-3">
              <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" /> CCNA
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5">Network &amp; API Security</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" /> {profile.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-400" /> {profile.timezone}
            </span>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <Button
              variant="primary"
              size="lg"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={() => scrollToSection('projects')}
            >
              View My Work
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => scrollToSection('contact')}
            >
              Let's Work Together
            </Button>
          </div>
        </div>

        <div className="lg:col-span-5 w-full flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative w-full max-w-sm aspect-square rounded-2xl overflow-hidden border border-navy-800 shadow-2xl ring-1 ring-white/10 hover:border-emerald-500/50 hover:shadow-emerald-500/10 transition-all duration-500"
          >
            <img
              src={profile.profileImage}
              alt="Janmark M. Suelto"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </SectionContainer>
  );
};