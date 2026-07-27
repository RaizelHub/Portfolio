export interface SkillItem {
  name: string;
  projectConnection?: string;
}

export interface SkillGroup {
  category: 'Used in Projects' | 'Familiar With' | 'Currently Improving' | string;
  description: string;
  items: (string | SkillItem)[];
  icon?: string;
  accentItems?: string[];
}

export type Skill = SkillGroup;