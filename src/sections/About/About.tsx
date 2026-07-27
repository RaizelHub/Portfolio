import { MapPin, Target, Clock, TrendingUp, GraduationCap } from 'lucide-react';
import { SectionContainer } from '../../components/layout/SectionContainer';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { educationList } from '../../data/education';

export const About = () => {
  return (
    <SectionContainer id="about">
      <SectionHeading
        tag="01 / About Me"
        title="Practical Full-Stack &amp; Automation Developer"
        subtitle="BSIT Graduate &middot; Focused on clean web development and workflow automation."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-8 items-start">
        {/* Left Column: Direct Bio Text */}
        <div className="lg:col-span-7 space-y-5 text-slate-300 text-sm sm:text-base leading-relaxed">
          <p>
            I’m Janmark Suelto, a full-stack developer. I build practical web applications using React, TypeScript, Node.js, Supabase, Firebase, and REST APIs.
          </p>
          <p>
            I also have experience creating n8n automation workflows, integrating webhooks and APIs, processing data with AI tools, and developing IoT-based systems. My projects include job-discovery platforms, lead-management systems, order-processing workflows, student-management applications, and water-quality monitoring solutions.
          </p>
          <p>
            I am currently improving my skills in backend development, workflow automation, testing, deployment, and system design. I am open to remote junior developer, automation developer, and technical support opportunities where I can contribute, learn, and grow professionally.
          </p>
        </div>

        {/* Right Column: Practical Details Box */}
        <div className="lg:col-span-5 bg-navy-800/30 border border-navy-700/60 p-6 rounded-xl space-y-4 shadow-lg">
          <h3 className="font-bold text-white text-base border-b border-navy-700/50 pb-3">
            Practical Details
          </h3>

          <div className="space-y-3.5 text-xs sm:text-sm">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 font-mono block text-[11px]">Based in</span>
                <span className="text-white font-semibold">Bukidnon, Philippines</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Target className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 font-mono block text-[11px]">Focus</span>
                <span className="text-white font-semibold">Full-stack development and automation</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 font-mono block text-[11px]">Availability</span>
                <span className="text-white font-semibold">Open to remote opportunities</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <TrendingUp className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 font-mono block text-[11px]">Currently improving</span>
                <span className="text-white font-semibold">Backend development, testing, deployment, automation, and system design</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Education Subsection */}
      <div className="mt-14 border-t border-navy-800 pt-10">
        <h3 className="text-lg font-bold text-white border-b border-navy-800 pb-3 flex items-center gap-2 mb-6">
          <GraduationCap className="w-5 h-5 text-emerald-400 shrink-0" />
          Education
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {educationList.map((edu) => (
            <div key={edu.id} className="bg-navy-800/20 border border-navy-700/40 p-5 sm:p-6 rounded-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <h4 className="font-bold text-white text-base sm:text-lg">{edu.institution}</h4>
                <span className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded border border-emerald-900/30 w-fit">
                  {edu.period}
                </span>
              </div>
              <p className="text-sm font-semibold text-slate-300 mb-2">{edu.degree}</p>
              <span className="text-xs text-slate-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" /> {edu.location}
              </span>
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
};