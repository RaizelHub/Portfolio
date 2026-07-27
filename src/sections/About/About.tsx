import { CheckCircle2, MapPin } from 'lucide-react';
import { SectionContainer } from '../../components/layout/SectionContainer';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { GitHubChart } from '../../components/common/GitHubChart';
import { educationList } from '../../data/education';

export const About = () => {
  return (
    <SectionContainer id="about">
      <SectionHeading
        tag="01 / About Me"
        title="Building practical web applications and reliable automation systems."
        subtitle="Full-stack developer building practical apps and automation pipelines."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-8 items-start">
        <div className="lg:col-span-7 space-y-6 text-slate-400 text-sm sm:text-base leading-relaxed">
          <p>
            I'm <strong className="text-white">Janmark Suelto</strong>, a full-stack developer based in Bukidnon, Philippines. I build practical web applications using React, TypeScript, Node.js, Supabase, Firebase, and REST APIs.
          </p>
          <p>
            I also have experience creating n8n automation workflows, integrating webhooks and APIs, processing data with AI tools, and developing IoT-based systems. My projects include job discovery platforms, lead-management systems, order-processing workflows, student-management applications, and water-quality monitoring solutions.
          </p>
          <p>
            I am currently improving my skills in backend development, workflow automation, testing, deployment, and system design. I am open to remote junior developer, automation developer, and technical support opportunities where I can contribute, learn, and grow professionally.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 text-xs sm:text-sm">
            {[
              'Full Stack Web Development',
              'n8n Workflow Automation',
              'TypeScript & React Applications',
              'REST API & Database Design',
              'Multi-Tenant SaaS Architecture',
              'Network Security Fundamentals',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="bg-navy-800/40 border border-navy-700/60 p-6 sm:p-7 rounded-xl space-y-5 shadow-lg">
            <div className="flex items-center justify-between border-b border-navy-800 pb-3">
              <h3 className="font-bold text-white text-base sm:text-lg flex items-center gap-2">
                Why Work With Me
              </h3>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/30">
                Value Delivered
              </span>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              {[
                {
                  title: 'React + Supabase + n8n Pipeline',
                  desc: 'Built a job discovery platform that collects remote opportunities from multiple sources, evaluates fit with Gemini AI, and sends high-match alerts.',
                },
                {
                  title: 'Six Connected n8n Workflows',
                  desc: 'Designed an e-commerce automation hub handling order processing, AI support triage, inventory sync, content generation, and daily reporting.',
                },
                {
                  title: 'Laravel Multi-Tenant SaaS',
                  desc: 'Developed a tenant-isolated review platform with dynamic subdomain routing, cutting hosting costs and reducing branch setup to one click.',
                },
                {
                  title: 'ESP32 + MQTT IoT System',
                  desc: 'Built a water quality monitoring capstone with real-time sensor data, Firebase sync, and SMS alerts — detecting leaks within 3m accuracy.',
                },
              ].map((item) => (
                <div key={item.title} className="space-y-1">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {item.title}
                  </span>
                  <p className="text-slate-400 text-xs leading-relaxed pl-3 font-normal">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-navy-800">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 block mb-2 font-bold">
                Core Professional Qualities
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Workflow Automation',
                  'Full-Stack Developer',
                  'Security-Minded',
                  'Clean Code Writer',
                  'Fast Learner',
                  'Remote-Ready',
                ].map((tag) => (
                  <span key={tag} className="text-xs font-semibold px-2.5 py-1 bg-navy-900 text-slate-300 border border-navy-800 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <GitHubChart />
      </div>

      {/* Education */}
      <div className="mt-16 border-t border-navy-800 pt-12">
        <h3 className="text-lg font-bold text-white border-b border-navy-800 pb-3 flex items-center gap-2 mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 block shrink-0" />
          Education &amp; Academic Credentials
        </h3>

        <div className="grid grid-cols-1 gap-6">
          {educationList.map((edu) => (
            <div key={edu.id} className="bg-navy-800/20 border border-navy-700/40 p-6 sm:p-7 rounded-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <h4 className="font-bold text-white text-base sm:text-lg">{edu.institution}</h4>
                <span className="text-xs font-semibold text-emerald-400 font-mono bg-emerald-950/40 px-2.5 py-1 rounded border border-emerald-900/30 w-fit">
                  {edu.status}
                </span>
              </div>
              <div className="text-xs font-medium text-slate-400 mb-4 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-500" /> {edu.location}
                </span>
                <span className="font-mono text-xs text-slate-400 font-semibold">{edu.period}</span>
              </div>
              <p className="text-sm font-semibold text-slate-200 mb-3">{edu.degree}</p>

              <h5 className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold mt-4 mb-2.5">
                Key Highlights
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs sm:text-sm text-slate-400">
                {edu.highlights.map((highlight, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
};