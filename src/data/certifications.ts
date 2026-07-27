import type { Certificate } from '../types';

export const certifications: Certificate[] = [
  {
    id: 'ccna',
    name: 'CCNA (Cisco Certified Network Associate) Enterprise Routing & Switching',
    issuer: 'Cisco Networking Academy',
    abbreviation: 'CCNA',
    image: 'img/ccna-enterprise-networking-security-and-automation.png',
    verifyUrl: 'https://www.credly.com/badges/5a8691df-dbde-4428-b40a-f57cd6ab9140/public_url',
    year: '2025'
  },
  {
    id: 'sam',
    name: 'System Administration & Maintenance Certification',
    issuer: 'Bukidnon State University IT Dept',
    abbreviation: 'SAM',
    year: '2025'
  },
  {
    id: 'nlp',
    name: 'Natural-Language Processing Training Workshop (Professional Communication)',
    issuer: 'BukSU Leadership Development Program',
    abbreviation: 'NLP',
    image: 'img/NlpCert.png',
    year: '2024'
  },
  {
    id: 'ias',
    name: 'Information Audit & Security (IAS) Certificate',
    issuer: 'Cisco Academy Security Training',
    abbreviation: 'IAS',
    year: '2025'
  },
  {
    id: 'internship',
    name: 'On-the-Job Training Certificate of Completion',
    issuer: 'Concentrix, Cagayan de Oro City',
    abbreviation: 'OJT',
    image: 'img/InternshipCertificate.png',
    year: '2026'
  }
];

