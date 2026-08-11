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

export interface ArchitectureBoundary {
  layer?: string;
  component?: string;
  technology?: string;
  responsibility?: string;
  responsibilities?: string;
}

export interface TechnicalDecisionItem {
  decision: string;
  reason: string;
}

export interface EngineeringChallengeItem {
  challenge: string;
  approach: string;
  result: string;
}

export interface ProjectSEO {
  title?: string;
  description?: string;
  keywords?: string[];
}

export interface Project {
  id: string;
  slug: string;
  emoji?: string;
  title: string;
  category: string;
  role?: string;
  status: ProjectStatus;
  badge?: string;
  summary?: string;
  description: string;
  longDescription: string;
  problem: string;
  solution: string;
  systemFlow?: string[];
  technologies: string[];
  features: string[];
  architecture?: string;
  architectureDetails?: ArchitectureBoundary[];
  technicalDecisions?: (string | TechnicalDecisionItem)[] | string;
  challenges: (string | EngineeringChallengeItem)[] | string;
  failureHandling?: string[];
  whatWorks?: string[];
  currentLimitations?: string;
  limitations?: string[];
  results: string;
  outcome?: string | string[];
  process: string;
  lessonsLearned?: string;
  lessonsLearnedList?: string[];
  nextSteps?: string[];
  image?: string;
  images?: string[];
  githubUrl?: string;
  githubLabel?: string;
  liveUrl?: string;
  demoVideo?: string;
  videoUrl?: string;
  architectureDiagramUrl?: string;
  apkUrl?: string;
  accessNote?: string;
  featured?: boolean;
  isPrivateRepo?: boolean;
  seo?: ProjectSEO;
}