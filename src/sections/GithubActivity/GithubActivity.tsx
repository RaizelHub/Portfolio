import React from 'react';
import { Github, ExternalLink, Activity } from 'lucide-react';
import { SectionContainer } from '../../components/layout/SectionContainer';
import { useSound } from '../../context/SoundContext';

export const GithubActivity: React.FC = () => {
  const { playHover, playClick } = useSound();

  return (
    <SectionContainer id="github-activity" className="py-16 border-b border-[#DCE1E7] dark:border-[#242B33]">
      <div className="max-w-3xl mb-10">
        <h2
          className="font-title text-2xl sm:text-3xl font-bold tracking-tight text-[#111318] dark:text-[#F4F6F8] mb-3"
        >
          GitHub Activity
        </h2>

        <p className="text-sm sm:text-base text-[#5F6873] dark:text-[#A7B0BA] leading-relaxed max-w-xl font-sans">
          Public repositories and contribution stream from @RaizelHub on GitHub.
        </p>
      </div>

      <div className="bg-[#FFFFFF] dark:bg-[#11151A] border border-[#DCE1E7] dark:border-[#242B33] rounded-xl p-6 space-y-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DCE1E7] dark:border-[#242B33] pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#F1F3F5] dark:bg-[#171C22] border border-[#DCE1E7] dark:border-[#242B33] text-[#111318] dark:text-[#F4F6F8] flex items-center justify-center">
              <Github className="w-4 h-4" />
            </div>
            <div>
              <span className="font-sans font-bold text-sm text-[#111318] dark:text-[#F4F6F8] block">
                @RaizelHub
              </span>
              <span className="text-xs text-[#5F6873] dark:text-[#A7B0BA] font-mono">
                github.com/RaizelHub
              </span>
            </div>
          </div>

          <a
            href="https://github.com/RaizelHub"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playHover}
            onClick={playClick}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-sans text-xs font-semibold rounded-lg transition-colors"
          >
            <span>View on GitHub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Contribution Graph */}
        <div className="space-y-2 font-sans">
          <div className="flex items-center justify-between text-xs font-semibold text-[#111318] dark:text-[#F4F6F8]">
            <span className="flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-[#2563EB] dark:text-[#60A5FA]" />
              Contribution Heatmap
            </span>
            <span className="text-[#78828D] dark:text-[#7F8994] font-mono text-[11px]">Updated automatically</span>
          </div>

          <div className="bg-[#F7F8FA] dark:bg-[#0B0D10] border border-[#DCE1E7] dark:border-[#242B33] rounded-lg p-4 overflow-x-auto flex justify-center items-center min-h-[110px]">
            <img
              src="https://ghchart.rshah.org/2563EB/RaizelHub"
              alt="RaizelHub GitHub Contribution Chart"
              className="w-full max-w-4xl min-w-[600px] h-auto object-contain filter dark:invert dark:hue-rotate-180"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = 'none';
                if (target.parentElement) {
                  target.parentElement.innerHTML = '<span class="text-xs font-mono text-[#5F6873]">Live activity on <a href="https://github.com/RaizelHub" target="_blank" class="text-[#2563EB] underline">GitHub @RaizelHub</a></span>';
                }
              }}
            />
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};
