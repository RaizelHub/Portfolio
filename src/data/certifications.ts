import type { Certificate } from '../types';

export const certifications: Certificate[] = [
  {
    id: 'ccna',
    name: 'Enterprise Routing & Switching',
    issuer: 'Cisco Networking Academy',
    category: 'NETWORKING',
    image: 'img/ccna-enterprise-networking-security-and-automation.png',
    verifyUrl: 'https://www.credly.com/badges/5a8691df-dbde-4428-b40a-f57cd6ab9140/public_url',
    year: '2025'
  },
  {
    id: 'ias',
    name: 'Information Audit & Security (IAS)',
    issuer: 'Cisco Academy Security Training',
    category: 'SECURITY',
    year: '2025'
  },
  {
    id: 'sam',
    name: 'System Administration & Maintenance',
    issuer: 'Bukidnon State University',
    category: 'SYSTEMS',
    year: '2025'
  }
];
