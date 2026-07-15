import type { Service } from '../types';

export const services: Service[] = [
  {
    id: 'web-dev',
    title: 'Web Development',
    icon: 'code',
    description: 'Custom Laravel and MERN (MongoDB, Express, React, Node) applications tailored to your specific workflow. From marketing landing pages to full-featured dashboard systems.',
    bannerClass: 'bg-indigo-950/20 text-indigo-400 border-indigo-900/30',
    label: 'WEB DEV',
    tools: ['Laravel', 'React', 'Node.js', 'REST APIs', 'Authentication', 'Deployment'],
    toolColor: 'purple'
  },
  {
    id: 'db-dev',
    title: 'Database Development',
    icon: 'database',
    description: 'Relational MySQL and NoSQL MongoDB/Firebase database setups. Specialized in database structure planning, schema design, script migrations, and slow query speedup optimizations.',
    bannerClass: 'bg-blue-950/20 text-blue-400 border-blue-900/30',
    label: 'DATABASE',
    tools: ['MySQL', 'MongoDB', 'Firebase', 'Schema Design', 'Migrations', 'Optimization'],
    toolColor: 'blue'
  },
  {
    id: 'api-dev',
    title: 'API Development',
    icon: 'api', // custom map inside UI component
    description: 'RESTful API construction and external service integration. Built with security-first JWT auth, role authorization rules, input checking filters, and rate-limiting safeguards.',
    bannerClass: 'bg-emerald-950/20 text-emerald-400 border-emerald-900/30',
    label: 'API',
    tools: ['REST API', 'JWT Auth', 'Rate Limiting', 'Postman', 'Documentation', 'Integration'],
    toolColor: 'emerald'
  },
  {
    id: 'saas-dev',
    title: 'Multi-Tenant SaaS Solutions',
    icon: 'saas', // custom map inside UI component
    description: 'Architecture setups using Laravel Tenancy and custom multi-tenant logic. Provides absolute isolation of tenant database schemas, custom domain routing, and robust RBAC admin backends.',
    bannerClass: 'bg-amber-950/20 text-amber-400 border-amber-900/30',
    label: 'SAAS',
    tools: ['Laravel Tenancy', 'SaaS Architecture', 'RBAC', 'Tenant Isolation', 'Admin Panels', 'Billing Ready'],
    toolColor: 'amber'
  },
  {
    id: 'data-entry',
    title: 'Data Entry & Organization',
    icon: 'table',
    description: 'Fast, precise data compilation, spreadsheet modeling, and research. Clean up unformatted sheets, encode forms, and structure raw information into functional databases.',
    bannerClass: 'bg-rose-950/20 text-rose-400 border-rose-900/30',
    label: 'DATA',
    tools: ['Excel', 'Google Sheets', 'Google Forms', 'Encoding', 'Data Cleanup', 'Spreadsheets'],
    toolColor: 'rose'
  },
  {
    id: 'va-support',
    title: 'Virtual Assistance & Support',
    icon: 'headset',
    description: 'Professional remote support covering day-to-day admin operations. Inbox triage management, follow-ups, customer coordination, scheduling calendars, and research assistance.',
    bannerClass: 'bg-pink-950/20 text-pink-400 border-pink-900/30',
    label: 'SUPPORT & VA',
    tools: ['Task Management', 'Scheduling', 'Inbox Management', 'Templates', 'Follow-ups', 'Client Comms'],
    toolColor: 'pink'
  }
];
