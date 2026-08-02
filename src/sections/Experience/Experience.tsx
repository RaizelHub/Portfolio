import { Briefcase, Calendar, MapPin, CheckCircle2, Building2 } from 'lucide-react';
import { SectionContainer } from '../../components/layout/SectionContainer';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { experiences } from '../../data/experience';

export const Experience = () => {
  return (
    <SectionContainer id="experience" className="py-16 border-b border-[#D5D0C7]">
      <SectionHeading
        tag="04 // OPERATIONAL RECORD"
        title="Work &amp; Practical Experience"
        subtitle="Hands-on experience in IT operations, enterprise technical support, system diagnostics, and collaborative engineering."
      />

      <div className="mt-8 space-y-6">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="group bg-[#EFEBE4] border border-[#D5D0C7] hover:border-[#171717] rounded-[2px] p-6 sm:p-8 transition-all duration-200"
          >
            {/* Header: Role & Period */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D5D0C7] pb-6 mb-6">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-[#C7462D] shrink-0" />
                  <h3 className="text-xl font-bold text-[#171717] group-hover:text-[#C7462D] transition-colors uppercase">
                    {exp.role}
                  </h3>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#6B6862] font-mono">
                  <span className="flex items-center gap-1.5 text-[#171717] font-semibold">
                    <Building2 className="w-4 h-4 text-[#C7462D]" />
                    {exp.company}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#6B6862]" />
                    {exp.location}
                  </span>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#F4F1EA] border border-[#D5D0C7] rounded-[2px] font-mono text-xs text-[#C7462D] font-bold w-fit shrink-0">
                <Calendar className="w-3.5 h-3.5" />
                <span>{exp.period}</span>
              </div>
            </div>

            {/* Overview Description */}
            <p className="text-[#171717] text-sm sm:text-base leading-relaxed mb-6">
              {exp.description}
            </p>

            {/* Key Responsibilities */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs uppercase tracking-wider text-[#6B6862] font-semibold">
                KEY RESPONSIBILITIES &amp; ACHIEVEMENTS:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {exp.responsibilities.map((resp, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#171717]">
                    <CheckCircle2 className="w-4 h-4 text-[#C7462D] shrink-0 mt-0.5" />
                    <span>{resp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
};
