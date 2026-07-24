import type { Service } from '../types';

export const services: Service[] = [
  {
    id: 'ai-automation',
    title: 'AI & Workflow Automation',
    icon: 'workflow',
    description: 'Production-style n8n automation pipelines, Google Gemini LLM integration, automated webhooks, Gmail alert ingestion, structured output validation, and automated job or lead intelligence platforms.',
    bannerClass: 'bg-emerald-950/20 text-emerald-400 border-emerald-900/30',
    label: 'AI & AUTOMATION',
    tools: ['n8n', 'Google Gemini', 'Webhooks', 'Gmail API', 'Supabase', 'Zod Validation'],
    toolColor: 'emerald'
  },
  {
    id: 'web-dev',
    title: 'Full-Stack Web Development',
    icon: 'code',
    description: 'Modern, high-performance web applications built with React, TypeScript, Node.js, Express, and Laravel. From interactive single-page dashboards to scalable enterprise management systems.',
    bannerClass: 'bg-indigo-950/20 text-indigo-400 border-indigo-900/30',
    label: 'WEB DEV',
    tools: ['React', 'TypeScript', 'Node.js', 'Express', 'Laravel', 'Tailwind CSS'],
    toolColor: 'purple'
  },
  {
    id: 'api-dev',
    title: 'API & Backend Microservices',
    icon: 'api',
    description: 'Secure RESTful API construction, authenticated Express proxies, JWT access token verification, server-only webhook authentication, rate-limiting, and microservice orchestration.',
    bannerClass: 'bg-blue-950/20 text-blue-400 border-blue-900/30',
    label: 'API & BACKEND',
    tools: ['Express', 'Node.js', 'REST APIs', 'JWT Auth', 'Rate Limiting', 'Webhook Proxies'],
    toolColor: 'blue'
  },
  {
    id: 'db-dev',
    title: 'Database Architecture & Supabase',
    icon: 'database',
    description: 'Relational PostgreSQL and MySQL database design, Supabase Row Level Security (RLS) policies, canonical URL deduplication indexes, schema migrations, and query speedup optimization.',
    bannerClass: 'bg-purple-950/20 text-purple-400 border-purple-900/30',
    label: 'DATABASE',
    tools: ['PostgreSQL', 'Supabase RLS', 'MySQL', 'Schema Design', 'Canonical Indexing', 'Migrations'],
    toolColor: 'indigo'
  },
  {
    id: 'saas-dev',
    title: 'Multi-Tenant SaaS Solutions',
    icon: 'saas',
    description: 'Enterprise multi-tenant software architecture using Laravel Tenancy and custom isolation logic. Absolute database schema separation per client branch, subdomain routing, and granular RBAC.',
    bannerClass: 'bg-amber-950/20 text-amber-400 border-amber-900/30',
    label: 'SAAS ARCHITECTURE',
    tools: ['Laravel Tenancy', 'SaaS Architecture', 'RBAC', 'Tenant Isolation', 'Admin Portals', 'Subdomain Routing'],
    toolColor: 'amber'
  },
  {
    id: 'va-support',
    title: 'Virtual Assistance & IT Operations',
    icon: 'headset',
    description: 'Enterprise IT hardware troubleshooting, workstation diagnostics, IT asset tracking, automated email alert triage, client communication, and administrative workflow management.',
    bannerClass: 'bg-pink-950/20 text-pink-400 border-pink-900/30',
    label: 'IT OPERATIONS & VA',
    tools: ['IT Support', 'Hardware Testing', 'Inbox Triage', 'Documentation', 'Task Management', 'Client Comms'],
    toolColor: 'pink'
  }
];
