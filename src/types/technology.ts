export interface TechItem {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'Databases' | 'AI' | 'Automation' | 'DevOps' | 'Tools';
  icon: string;
  color: string;
  description: string;
  experience: string;
  proficiency: number;
  projects: string[];
}