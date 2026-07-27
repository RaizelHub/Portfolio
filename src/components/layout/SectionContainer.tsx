import type { ReactNode } from 'react';

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export const SectionContainer = ({ children, className = '', id }: SectionContainerProps) => {
  return (
    <section id={id} className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20 ${className}`}>
      {children}
    </section>
  );
};