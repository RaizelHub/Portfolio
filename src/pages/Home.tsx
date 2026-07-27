import { Hero } from '../sections/Hero/Hero';
import { About } from '../sections/About/About';
import { Technologies } from '../sections/Technologies/Technologies';
import { Services } from '../sections/Services/Services';
import { ProjectsSection } from '../sections/Projects/ProjectsSection';
import { Experience } from '../sections/Experience/Experience';
import { Certificates } from '../sections/Certificates/Certificates';
import { Process } from '../sections/Process/Process';
import { Contact } from '../sections/Contact/Contact';

export const Home = () => {
  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      <Hero />
      <About />
      <Technologies />
      <Services />
      <ProjectsSection />
      <Experience />
      <Certificates />
      <Process />
      <Contact />
    </div>
  );
};