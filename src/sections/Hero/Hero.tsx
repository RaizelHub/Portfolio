import { motion } from 'framer-motion';
import { ArrowRight, Download, MapPin } from 'lucide-react';
import { SectionContainer } from '../../components/layout/SectionContainer';
import { profile } from '../../data/profile';
import { useSound } from '../../context/SoundContext';

export const Hero = () => {
  const { playHover, playClick } = useSound();

  const scrollToSection = (id: string) => {
    playClick();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownloadResume = () => {
    playClick();
    const link = document.createElement('a');
    link.href = profile.resumeUrl;
    link.download = 'Suelto-Janmark-Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <SectionContainer id="home" className="relative pt-12 pb-16 lg:py-20 border-b border-[#D5D0C7] dark:border-[#34312B]">
      {/* Top Metadata Line */}
      <div className="flex flex-wrap items-center justify-end gap-3 text-xs font-pt-sans text-[#6B6862] dark:text-[#A9A39A] pb-6 mb-8 border-b border-[#D5D0C7] dark:border-[#34312B]">
        <div className="flex items-center gap-2 text-[#171717] dark:text-[#F2EEE6] font-medium">
          <MapPin className="w-3.5 h-3.5 text-[#C7462D] dark:text-[#E25235] shrink-0" />
          <span>Bukidnon, Philippines &middot; Open to Junior Web Development &amp; Automation Roles</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* Left Column: Profile Image */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-start order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-sm"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-[#D5D0C7] dark:border-[#34312B] bg-[#EFEBE4] dark:bg-[#1D1C18]">
              <img
                src={profile.profileImage}
                alt="Janmark Suelto"
                className="w-full h-full object-cover object-top grayscale contrast-105 transition-all duration-500"
              />
            </div>
          </motion.div>
        </div>

        {/* Right Column: Editorial Headline & Bio */}
        <div className="lg:col-span-7 flex flex-col space-y-6 order-1 lg:order-2">
          <div className="space-y-4">
            <h1 className="hero-title uppercase text-[#171717] dark:text-[#F2EEE6]">
              JANMARK SUELTO <br />
              <span className="text-[#C7462D] dark:text-[#E25235]">JUNIOR FULL-STACK</span> <br />
              DEVELOPER
            </h1>

            <p className="text-lg sm:text-xl text-[#171717] dark:text-[#F2EEE6] font-medium leading-snug pt-2">
              Building modern web applications, backend services, and automated workflow pipelines.
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-4 font-pt-sans text-xs font-bold">
            <button
              onClick={() => scrollToSection('projects')}
              onMouseEnter={playHover}
              className="px-6 py-3.5 bg-[#171717] dark:bg-[#F2EEE6] hover:bg-[#C7462D] dark:hover:bg-[#E25235] text-[#F4F1EA] dark:text-[#151411] rounded-xl transition-all flex items-center gap-2 tracking-wide shadow-md hover:shadow-lg"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleDownloadResume}
              onMouseEnter={playHover}
              className="px-6 py-3.5 bg-transparent hover:bg-[#EFEBE4] dark:hover:bg-[#1D1C18] text-[#171717] dark:text-[#F2EEE6] border border-[#D5D0C7] dark:border-[#34312B] hover:border-[#171717] dark:hover:border-[#F2EEE6] rounded-xl transition-all flex items-center gap-2 tracking-wide"
            >
              <Download className="w-4 h-4 text-[#C7462D] dark:text-[#E25235]" />
              <span>Resume PDF</span>
            </button>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};