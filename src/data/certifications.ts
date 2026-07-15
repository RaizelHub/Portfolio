import type { Certification } from '../types';

export const certifications: Certification[] = [
  {
    id: 'ccna',
    name: 'CCNA (Cisco Certified Network Associate) Enterprise Routing & Switching',
    issuer: 'Cisco Networking Academy',
    abbreviation: 'CCNA'
  },
  {
    id: 'sam',
    name: 'System Administration & Maintenance Certification',
    issuer: 'Bukidnon State University IT Dept',
    abbreviation: 'SAM'
  },
  {
    id: 'nlp',
    name: 'Natural-Language Processing Training Workshop (Professional Communication)',
    issuer: 'BukSU Leadership Development Program',
    abbreviation: 'NLP'
  },
  {
    id: 'ias',
    name: 'Information Audit & Security (IAS) Certificate',
    issuer: 'Cisco Academy Security Training',
    abbreviation: 'IAS'
  }
];
