export interface Service {
  id: string;
  title: string;
  icon: string;
  description: string;
  bannerClass: string;
  label: string;
  tools: string[];
  toolColor: 'emerald' | 'blue' | 'purple' | 'amber' | 'rose' | 'indigo' | 'pink';
}