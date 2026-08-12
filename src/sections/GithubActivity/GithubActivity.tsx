import { Github, ExternalLink, Activity } from 'lucide-react';
import { SectionContainer } from '../../components/layout/SectionContainer';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { useSound } from '../../context/SoundContext';

export const GithubActivity = () => {
  const { playHover, playClick } = useSound();

  return (
    <SectionContainer id="github-activity" className="py-16 border-b border-[#D5D0C7] dark:border-[#34312B]">
      <SectionHeading
        tag="07"
        title="github activity"
        subtitle="Real-time contribution activity feed from @RaizelHub on GitHub."
      />

      {/* GitHub Overview Card & Heatmap */}
      <div className="bg-[#EFEBE4] dark:bg-[#1D1C18] border border-[#D5D0C7] dark:border-[#34312B] rounded-2xl p-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#D5D0C7] dark:border-[#34312B] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#171717] dark:bg-[#E25235] text-[#F4F1EA] dark:text-[#151411] flex items-center justify-center">
              <Github className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-pt-sans font-bold text-base text-[#171717] dark:text-[#F2EEE6]">@RaizelHub</span>
                <span className="px-2 py-0.5 text-[10px] font-mono bg-[#F4F1EA] dark:bg-[#151411] text-[#C7462D] dark:text-[#E25235] border border-[#D5D0C7] dark:border-[#34312B] rounded-md font-bold uppercase">
                  ACTIVE DEVELOPER
                </span>
              </div>
              <span className="text-xs font-pt-sans text-[#6B6862] dark:text-[#A9A39A]">
                Public Code Repositories &amp; Version History
              </span>
            </div>
          </div>

          <a
            href="https://github.com/RaizelHub"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playHover}
            onClick={playClick}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#171717] dark:bg-[#F2EEE6] hover:bg-[#C7462D] dark:hover:bg-[#E25235] text-[#F4F1EA] dark:text-[#151411] font-pt-sans text-xs font-bold rounded-lg transition-colors uppercase tracking-wider"
          >
            <span>VIEW ON GITHUB</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Contribution Graph Preview */}
        <div className="space-y-3 font-pt-sans">
          <div className="flex items-center justify-between text-xs font-bold text-[#171717] dark:text-[#F2EEE6] uppercase">
            <span className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#C7462D] dark:text-[#E25235]" />
              GitHub Contribution Heatmap
            </span>
            <span className="text-[#6B6862] dark:text-[#A9A39A] text-[11px]">Updated Automatically</span>
          </div>

          <div className="bg-[#F4F1EA] dark:bg-[#151411] border border-[#D5D0C7] dark:border-[#34312B] rounded-xl p-4 overflow-x-auto flex justify-center items-center min-h-[120px]">
            <img
              src="https://ghchart.rshah.org/C7462D/RaizelHub"
              alt="RaizelHub GitHub Contribution Chart"
              className="w-full max-w-4xl min-w-[600px] h-auto object-contain filter contrast-125 dark:invert dark:hue-rotate-180"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = 'none';
                if (target.parentElement) {
                  target.parentElement.innerHTML = '<span class="text-xs font-mono text-[#6B6862]">Live contribution graph active on <a href="https://github.com/RaizelHub" target="_blank" class="text-[#C7462D] underline">GitHub @RaizelHub</a></span>';
                }
              }}
            />
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};
