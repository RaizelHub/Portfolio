import type { Service } from '../types';

export const services: Service[] = [
  {
    id: 'fullstack-dev',
    title: 'Full-Stack Development',
    icon: 'code',
    label: 'WEB DEVELOPMENT',
    description: 'Build responsive web applications with frontend interfaces, backend logic, authentication, databases, and API integrations.',
  },
  {
    id: 'backend-api',
    title: 'Backend & API Development',
    icon: 'server',
    label: 'BACKEND & APIs',
    description: 'Develop REST APIs, server-side application logic, authentication, validation, webhooks, and database integrations.',
  },
  {
    id: 'automation-integrations',
    title: 'Automation & Integrations',
    icon: 'workflow',
    label: 'WORKFLOW AUTOMATION',
    description: 'Build workflow automations that connect APIs, databases, AI services, notifications, and operational processes.',
  },
  {
    id: 'database-systems',
    title: 'Database & Application Systems',
    icon: 'database',
    label: 'DATA & SYSTEM ARCHITECTURE',
    description: 'Design data-driven applications using relational and NoSQL databases, structured schemas, access control, and multi-tenant patterns.',
  },
];
