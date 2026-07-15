import type { Skill } from '../types';

export const skills: Skill[] = [
  {
    category: 'Backend Development',
    icon: 'server',
    description: 'Building robust, secure, and scalable server-side systems and APIs.',
    items: [
      'Laravel',
      'PHP',
      'Node.js',
      'Express.js',
      'REST APIs',
      'JWT Authentication',
      'Rate Limiting',
      'Multi-Tenant Architecture'
    ],
    accentItems: ['Laravel', 'Multi-Tenant Architecture']
  },
  {
    category: 'Frontend Development',
    icon: 'layout',
    description: 'Crafting responsive, performance-driven interfaces with modern tooling.',
    items: [
      'React',
      'TypeScript',
      'JavaScript ES6+',
      'Tailwind CSS',
      'Bootstrap',
      'Responsive Design'
    ],
    accentItems: ['React', 'TypeScript', 'Tailwind CSS']
  },
  {
    category: 'Databases & Design',
    icon: 'database',
    description: 'Designing data structures optimized for speed, scalability, and integrity.',
    items: [
      'MySQL',
      'MongoDB',
      'Firebase Firestore',
      'Database Design',
      'Migrations',
      'Query Optimization'
    ],
    accentItems: ['MySQL', 'Database Design']
  },
  {
    category: 'Networking & Security',
    icon: 'network',
    description: 'Implementing security-first enterprise-grade networking configurations.',
    items: [
      'CCNA Enterprise',
      'OSPF Routing',
      'VLAN Segmentation',
      'STP',
      'Cisco IOS',
      'Network Automation',
      'Security Fundamentals'
    ],
    accentItems: ['CCNA Enterprise', 'VLAN Segmentation']
  },
  {
    category: 'IoT & Embedded Systems',
    icon: 'cpu',
    description: 'Connecting physical hardware sensors to cloud dashboard networks.',
    items: [
      'ESP32',
      'Orange Pi',
      'MQTT Protocol',
      'GSM Modules',
      'Sensor Fusion',
      'Realtime Dashboards'
    ],
    accentItems: ['ESP32', 'MQTT Protocol']
  },
  {
    category: 'Tools & Ecosystems',
    icon: 'wrench',
    description: 'Leveraging modern industry utilities for workflow efficiency.',
    items: [
      'Git',
      'GitHub',
      'Postman',
      'VS Code',
      'Firebase',
      'Supabase',
      'Android Studio',
      'Ollama (Local LLM)'
    ],
    accentItems: ['Git', 'Postman', 'Ollama (Local LLM)']
  }
];
