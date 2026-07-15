export interface Project {
  id: string;
  slug: string;
  emoji?: string;
  title: string;
  category: string; // e.g., 'Web', 'SaaS', 'IoT', 'Mobile', 'AI', 'Desktop'
  description: string;
  longDescription: string;
  problem: string;
  solution: string;
  technologies: string[];
  features: string[];
  challenges: string;
  results: string;
  process: string;
  image?: string;
  images?: string[];
  githubUrl?: string;
  liveUrl?: string;
  apkUrl?: string;
  accessNote?: string;
  featured?: boolean;
}

export interface Skill {
  category: string;
  icon: string; // lucide icon name
  description: string;
  items: string[];
  accentItems?: string[];
}

export interface Service {
  id: string;
  title: string;
  icon: string; // lucide icon name
  description: string;
  bannerClass: string;
  label: string;
  tools: string[];
  toolColor: 'emerald' | 'blue' | 'purple' | 'amber' | 'rose' | 'indigo' | 'pink';
}

export interface Experience {
  id: string;
  company: string;
  location: string;
  role: string;
  period: string;
  description: string;
  responsibilities: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  status: string;
  period: string;
  highlights: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  abbreviation: string;
}
