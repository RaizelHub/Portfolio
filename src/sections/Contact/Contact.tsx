import { Mail, MessageSquare } from 'lucide-react';
import { profile } from '../../data/profile';
import { TypingGame } from '../../components/ui/TypingGame';

export const Contact = () => {
  return (
    <section id="contact" className="bg-[#F4F1EA] text-[#171717] py-16 lg:py-20 border-t border-[#D5D0C7] space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Interactive Typing Speed Challenge */}
        <TypingGame />

        {/* Ready for Collaboration Banner */}
        <div className="bg-[#EFEBE4] border border-[#D5D0C7] p-8 sm:p-10 rounded-[2px] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-3xl">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#C7462D] block">
              READY FOR COLLABORATION
            </span>
            <h2 className="section-title text-[#171717] uppercase">
              Let's Work Together
            </h2>
            <p className="text-sm sm:text-base text-[#6B6862] font-normal leading-relaxed max-w-2xl">
              Open for full-stack development, n8n automation pipelines, web development, backend integrations, and remote software developer roles.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full lg:w-auto font-mono text-xs shrink-0">
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('open-contact-modal'))}
              className="px-6 py-4 bg-[#171717] hover:bg-[#C7462D] text-[#F4F1EA] font-bold uppercase rounded-[1px] transition-colors flex items-center justify-center gap-2.5 tracking-wider text-xs shadow-lg"
            >
              <Mail className="w-4 h-4" />
              <span>CONTACT ME? ↗</span>
            </button>

            <a
              href={profile.messengerUrl || 'https://m.me/Raizelxdarriii90'}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 bg-[#F4F1EA] hover:bg-[#EFEBE4] text-[#171717] border border-[#D5D0C7] hover:border-[#171717] font-bold uppercase rounded-[1px] transition-colors flex items-center justify-center gap-2.5 tracking-wider text-xs"
            >
              <MessageSquare className="w-4 h-4 text-[#C7462D]" />
              <span>Messenger ↗</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};