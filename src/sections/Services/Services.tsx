import { SectionContainer } from '../../components/layout/SectionContainer';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { ServiceCard } from '../../components/ui/ServiceCard';
import { services } from '../../data/services';

export const Services = () => {
  return (
    <SectionContainer id="services" className="py-16 border-b border-[#D5D0C7]">
      <SectionHeading
        tag="03"
        title="expertise"
        subtitle="Full-stack development, backend systems, API integrations, databases, and workflow automation."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </SectionContainer>
  );
};
