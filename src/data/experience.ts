import type { Experience } from '../types';

export const experiences: Experience[] = [
  {
    id: 'platform-engineering',
    company: 'Self-Directed Engineering Platforms',
    location: 'Bukidnon, Philippines (Remote)',
    role: 'Full-Stack Developer & Automation Lead',
    period: '2024 – Present',
    description: 'Designed, built, and deployed full-stack web applications, n8n automation pipelines, and multi-tenant database systems.',
    responsibilities: [
      'Architected JobRadar AI platform combining React, Supabase PostgreSQL, Express REST webhooks, and n8n workflows for automated candidate-job scoring.',
      'Designed OmniCommerce AI multi-workflow operational hub powering automated TikTok order processing, AI customer support triage, and Telegram human-approval loops.',
      'Implemented Multi-Tenant Reviewer Center SaaS using Laravel Tenancy with dynamic subdomain routing and isolated PostgreSQL schemas per branch.',
      'Integrated Supabase Row-Level Security (RLS), JWT access token verification, and Zod JSON schema validation across REST microservices.'
    ]
  },
  {
    id: 'concentrix',
    company: 'Concentrix',
    location: 'Cagayan de Oro City, Philippines',
    role: 'IT Operations / Technical Support Trainee',
    period: 'February 9 – May 8, 2026',
    description: 'Gained hands-on experience in enterprise IT operations, hardware troubleshooting, systems administration, and communication within a fast-paced environment.',
    responsibilities: [
      'Managed IT asset inventory tracking and hardware allocation records.',
      'Conducted workstation diagnostics, software upgrades, and network verification checks.',
      'Provided hardware testing and active troubleshooting support for internal agent terminals.',
      'Performed preventive system checks and clean-up maintenance on server racks and server grooming.',
      'Drafted technical support documentation and resolved service ticket escalations.',
      'Honed collaborative skills and customer service etiquette within enterprise-level client groups.'
    ]
  }
];
