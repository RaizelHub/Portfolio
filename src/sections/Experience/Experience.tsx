import { Briefcase, Calendar, MapPin, CheckCircle2, Building2 } from 'lucide-react';
import { SectionContainer } from '../../components/layout/SectionContainer';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { experiences } from '../../data/experience';

export const Experience = () => {
  return (
    <SectionContainer id="experience">
      <SectionHeading
        tag="05 / Experience"
        title="Work &amp; Practical Experience"
        subtitle="Hands-on experience in IT operations, enterprise technical support, system diagnostics, and collaborative engineering."
      />

      <div className="mt-8 space-y-6">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="group bg-navy-800/30 border border-navy-700/50 hover:border-emerald-500/30 rounded-xl p-6 sm:p-8 transition-all duration-300 shadow-xl"
          >
            {/* Header: Role & Period */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-navy-700/40 pb-6 mb-6">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-emerald-400 shrink-0" />
                  <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {exp.role}
                  </h3>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-400 font-medium">
                  <span className="flex items-center gap-1.5 text-emerald-300">
                    <Building2 className="w-4 h-4 text-emerald-400" />
                    {exp.company}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-slate-500" />
                    {exp.location}
                  </span>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-950/40 border border-emerald-900/30 rounded-md font-mono text-xs text-emerald-300 w-fit shrink-0">
                <Calendar className="w-3.5 h-3.5" />
                <span>{exp.period}</span>
              </div>
            </div>

            {/* Overview Description */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              {exp.description}
            </p>

            {/* Key Responsibilities */}
            <div className="space-y-3">
              <h4 className="font-mono text-xs uppercase tracking-wider text-slate-400 font-semibold">
                Key Responsibilities &amp; Achievements:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {exp.responsibilities.map((resp, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
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
