import { MapPin, Target, Clock, TrendingUp, GraduationCap } from 'lucide-react';
import { SectionContainer } from '../../components/layout/SectionContainer';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { educationList } from '../../data/education';

export const About = () => {
  return (
    <SectionContainer id="about" className="py-16 border-b border-[#D5D0C7]">
      <SectionHeading
        tag="01 // OPERATOR SPECIFICATION"
        title="Full-Stack Dev &amp; AI Automation Specialist"
        subtitle="BSIT Graduate &middot; Focused on clean web applications, REST APIs, and workflow automation."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-6 items-start">
        {/* Left Column: Direct Bio Text */}
        <div className="lg:col-span-7 space-y-4 text-[#171717] text-sm sm:text-base leading-relaxed">
          <p className="font-medium text-[#171717]">
            I’m Janmark Suelto, a full-stack developer based in Bukidnon, Philippines. I build practical web applications using React, TypeScript, Node.js, Supabase, Firebase, and REST APIs.
          </p>
          <p className="text-[#6B6862]">
            I also have experience creating n8n automation workflows, integrating webhooks and APIs, processing data with AI tools, and developing IoT-based systems. My projects include job-discovery platforms, lead-management systems, order-processing workflows, student-management applications, and water-quality monitoring solutions.
          </p>
          <p className="text-[#6B6862]">
            I am currently improving my skills in backend development, workflow automation, testing, deployment, and system design. I am open to remote junior developer, automation developer, and technical support opportunities where I can contribute, learn, and grow professionally.
          </p>
        </div>

        {/* Right Column: Practical Details Box */}
        <div className="lg:col-span-5 bg-[#EFEBE4] border border-[#D5D0C7] p-6 rounded-[2px] space-y-4">
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#171717] border-b border-[#D5D0C7] pb-3 flex justify-between items-center">
            <span>PRACTICAL DETAILS</span>
          </h3>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#C7462D] shrink-0 mt-0.5" />
              <div>
                <span className="text-[#6B6862] font-mono block text-[11px] uppercase">LOCATION</span>
                <span className="text-[#171717] font-semibold">Bukidnon, Philippines</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Target className="w-4 h-4 text-[#C7462D] shrink-0 mt-0.5" />
              <div>
                <span className="text-[#6B6862] font-mono block text-[11px] uppercase">CORE FOCUS</span>
                <span className="text-[#171717] font-semibold">Full-stack development &amp; n8n automation</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-[#C7462D] shrink-0 mt-0.5" />
              <div>
                <span className="text-[#6B6862] font-mono block text-[11px] uppercase">AVAILABILITY</span>
                <span className="text-[#171717] font-semibold">Open to remote contract &amp; full-time</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <TrendingUp className="w-4 h-4 text-[#C7462D] shrink-0 mt-0.5" />
              <div>
                <span className="text-[#6B6862] font-mono block text-[11px] uppercase">ACTIVE LEARNING</span>
                <span className="text-[#171717] font-semibold">Backend architecture, automated testing, DevOps</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Education Subsection */}
      <div className="mt-12 border-t border-[#D5D0C7] pt-8">
        <h3 className="text-[#171717] font-mono text-xs font-bold uppercase tracking-wider pb-4 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-[#C7462D] shrink-0" />
            EDUCATION &amp; ACADEMIC RECORD
          </span>
          <span className="text-[#6B6862]">[DEGREE]</span>
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {educationList.map((edu) => (
            <div key={edu.id} className="bg-[#EFEBE4] border border-[#D5D0C7] p-5 sm:p-6 rounded-[2px]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <h4 className="font-bold text-[#171717] text-base sm:text-lg">{edu.institution}</h4>
                <span className="text-xs font-mono font-semibold text-[#C7462D] bg-[#F4F1EA] px-2.5 py-1 rounded-[2px] border border-[#D5D0C7] w-fit">
                  {edu.period}
                </span>
              </div>
              <p className="text-sm font-semibold text-[#171717] mb-2">{edu.degree}</p>
              <span className="text-xs text-[#6B6862] font-mono flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#C7462D]" /> {edu.location}
              </span>
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
};