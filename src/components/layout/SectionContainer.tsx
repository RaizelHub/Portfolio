import type { ReactNode } from 'react';

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export const SectionContainer = ({ children, className = '', id }: SectionContainerProps) => {
  return (
    <section id={id} className={`mx-auto w-full max-w-[var(--content-width)] px-[var(--page-gutter)] scroll-mt-20 ${className}`}>
      {children}
    </section>
  );
};
