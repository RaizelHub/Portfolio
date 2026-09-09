import { SectionContainer } from '../../components/layout/SectionContainer';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { ServiceCard } from '../../components/ui/ServiceCard';
import { services } from '../../data/services';

export const Services = () => {
  return (
    <SectionContainer id="services" className="py-6 sm:py-8 border-b-2 border-neutral-300 dark:border-neutral-700">
      <SectionHeading
        tag="Capabilities &amp; Solutions"
        title="Services"
        subtitle="Full-stack development, backend systems, API integrations, databases, and workflow automation."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mt-5">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </SectionContainer>
  );
};
