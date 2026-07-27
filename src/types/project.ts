export interface Project {
  id: string;
  slug: string;
  emoji?: string;
  title: string;
  category: string;
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
  githubLabel?: string;
  liveUrl?: string;
  apkUrl?: string;
  accessNote?: string;
  featured?: boolean;
}