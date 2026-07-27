import { Github, ArrowRight } from 'lucide-react';

export const GitHubChart = () => {
  return (
    <div className="bg-navy-950 border border-navy-800 rounded-lg overflow-hidden shadow-2xl relative transition-all duration-500 hover:border-emerald-500/30 hover:shadow-emerald-500/5">
      <div className="px-4 py-3 bg-navy-900 border-b border-navy-800 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-rose-500 block" />
          <span className="w-3 h-3 rounded-full bg-amber-500 block" />
          <span className="w-3 h-3 rounded-full bg-emerald-500 block" />
        </div>
        <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500">
          <Github className="w-3.5 h-3.5 text-emerald-500" /> github-contributions.sh
        </div>
      </div>

      <div className="p-6 md:p-8 flex flex-col items-center">
        <div className="w-full text-center lg:text-left mb-6">
          <h3 className="text-lg font-bold text-white mb-1 flex items-center justify-center lg:justify-start gap-2">
            <Github className="w-5 h-5 text-emerald-400" /> Open Source Activity
          </h3>
          <p className="text-xs text-slate-400">
            Tracking my recent development updates and repository activity on GitHub.
          </p>
        </div>

        <div className="w-full overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-navy-800 scrollbar-track-transparent">
          <div className="min-w-[720px] max-w-4xl mx-auto py-2">
            <img
              src="https://ghchart.rshah.org/10b981/RaizelHub"
              alt="RaizelHub GitHub Contributions"
              className="w-full h-auto select-none contrast-[1.1] brightness-[1.05]"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between w-full border-t border-navy-800/60 pt-4 text-xs font-mono text-slate-500 gap-3">
          <span>
            Live Sync via GitHub Chart API
          </span>
          <a
            href="https://github.com/RaizelHub"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 bg-navy-900 border border-navy-800 rounded-md text-emerald-400 hover:text-emerald-300 hover:border-emerald-500/30 hover:bg-navy-800 transition-all duration-200 flex items-center gap-1.5"
          >
            <span>Visit GitHub Profile</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};