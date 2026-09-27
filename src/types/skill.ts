export type SkillCategory = 'FRONTEND' | 'BACKEND' | 'DATABASE' | 'DEVOPS' | 'TOOL' | 'TESTING' | 'CORE_ENGINEERING';

export interface Skill {
  id: string;
  name: string;
  icon?: string;
  level?: number;
  category: SkillCategory;
  showIn3d?: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CreateSkillDto = Omit<Skill, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateSkillDto = Partial<CreateSkillDto>;
