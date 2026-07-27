import { SectionContainer } from '../../components/layout/SectionContainer';
import { SectionHeading } from '../../components/ui/SectionHeading';
import { ServiceCard } from '../../components/ui/ServiceCard';
import { services } from '../../data/services';

export const Services = () => {
  return (
    <SectionContainer id="services">
      <SectionHeading
        tag="03 / Services"
        title="Services &amp; Technical Solutions"
        subtitle="Specialized full-stack software development, AI automation workflows, database architectures, and IT infrastructure support."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </SectionContainer>
  );
};
