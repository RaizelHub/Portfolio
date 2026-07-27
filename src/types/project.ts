export type ProjectStatus =
  | 'Live'
  | 'Working Prototype'
  | 'Hardware Prototype'
  | 'Academic Project'
  | 'Personal Project'
  | 'Single-User Tool'
  | 'In Development'
  | 'Frontend Demo'
  | 'Backend Prototype'
  | 'Private Repository'
  | 'Archived'
  | 'Concept Only';

export interface Project {
  id: string;
  slug: string;
  emoji?: string;
  title: string;
  category: string;
  role?: string;
  status: ProjectStatus;
  badge?: string;
  description: string;
  longDescription: string;
  problem: string;
  solution: string;
  technologies: string[];
  features: string[];
  challenges: string;
  results: string;
  process: string;
  whatWorks?: string[];
  architecture?: string;
  technicalDecisions?: string;
  lessonsLearned?: string;
  currentLimitations?: string;
  image?: string;
  images?: string[];
  githubUrl?: string;
  githubLabel?: string;
  liveUrl?: string;
  videoUrl?: string;
  architectureDiagramUrl?: string;
  apkUrl?: string;
  accessNote?: string;
  featured?: boolean;
}