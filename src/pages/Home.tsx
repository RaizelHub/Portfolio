import { Hero } from '../sections/Hero/Hero';
import { ProjectsSection } from '../sections/Projects/ProjectsSection';
import { Technologies } from '../sections/Technologies/Technologies';
import { Experience } from '../sections/Experience/Experience';
import { About } from '../sections/About/About';
import { Certificates } from '../sections/Certificates/Certificates';
import { GithubActivity } from '../sections/GithubActivity/GithubActivity';
import { Contact } from '../sections/Contact/Contact';
import { CollabSection } from '../sections/Collab/CollabSection';

export const Home = () => {
  return (
    <div>
      <Hero />
      <ProjectsSection />
      <CollabSection />
      <Technologies />
      <Experience />
      <About />
      <Certificates />
      <GithubActivity />
      <Contact />
    </div>
  );
};
