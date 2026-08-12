import { Briefcase, Calendar, MapPin, CheckCircle2, Building2 } from 'lucide-react';
import { SectionContainer } from '../../components/layout/SectionContainer';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { experiences } from '../../data/experience';

export const Experience = () => {
  return (
    <SectionContainer id="experience" className="py-16 border-b border-[#D5D0C7] dark:border-[#34312B]">
      <SectionHeading
        tag="05"
        title="experience"
        subtitle="Practical IT operations, workstation diagnostics, system maintenance, and enterprise support experience."
      />

      <div className="mt-8 space-y-6">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="group bg-[#EFEBE4] dark:bg-[#1D1C18] border border-[#D5D0C7] dark:border-[#34312B] hover:border-[#171717] dark:hover:border-[#F2EEE6] rounded-xl p-6 sm:p-8 transition-all duration-200 shadow-sm"
          >
            {/* Header: Role, Company & Dates */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#D5D0C7]/80 dark:border-[#34312B]/80 pb-6 mb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 bg-[#F4F1EA] dark:bg-[#151411] border border-[#D5D0C7] dark:border-[#34312B] rounded-md">
                    <Briefcase className="w-4 h-4 text-[#C7462D] dark:text-[#E25235]" />
                  </div>
                  <h3 className="font-amarna text-xl sm:text-2xl font-bold text-[#171717] dark:text-[#F2EEE6] group-hover:text-[#C7462D] dark:group-hover:text-[#E25235] transition-colors uppercase tracking-wide">
                    {exp.role}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-[#6B6862] dark:text-[#A9A39A] font-pt-sans font-medium">
                  <span className="flex items-center gap-1.5 text-[#171717] dark:text-[#F2EEE6] font-semibold">
                    <Building2 className="w-4 h-4 text-[#C7462D] dark:text-[#E25235]" />
                    {exp.company}
                  </span>
                  <span>&middot;</span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#6B6862] dark:text-[#A9A39A]" />
                    {exp.location}
                  </span>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#F4F1EA] dark:bg-[#151411] border border-[#D5D0C7] dark:border-[#34312B] rounded-lg font-mono text-xs text-[#C7462D] dark:text-[#E25235] font-bold w-fit shrink-0">
                <Calendar className="w-3.5 h-3.5" />
                <span>{exp.period}</span>
              </div>
            </div>

            {/* Short Summary */}
            <p className="text-[#171717] dark:text-[#F2EEE6] text-sm sm:text-base font-pt-sans leading-relaxed mb-6 font-normal">
              {exp.description}
            </p>

            {/* Key Contributions */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs uppercase tracking-wider text-[#6B6862] dark:text-[#A9A39A] font-bold">
                KEY CONTRIBUTIONS
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {exp.responsibilities.map((resp, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#171717] dark:text-[#F2EEE6] font-pt-sans">
                    <CheckCircle2 className="w-4 h-4 text-[#C7462D] dark:text-[#E25235] shrink-0 mt-0.5" />
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
