import { TypingGame } from '../../components/ui/TypingGame';

export const Contact = () => {
  return (
    <section id="contact" className="bg-[#F4F1EA] dark:bg-[#151411] text-[#171717] dark:text-[#F2EEE6] py-12 border-t border-[#D5D0C7] dark:border-[#34312B] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Interactive Typing Speed Challenge */}
        <TypingGame />
      </div>
    </section>
  );
};