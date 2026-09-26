import { ProjectStatus } from './common';
import { ProjectCategory } from './projectCategory';
import { ProjectView } from './projectView';


export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  content?: string;
  features: string[];
  thumbnails: string[];
  liveUrl?: string;
  githubFrontendUrl?: string;
  githubBackendUrl?: string;
  videoUrl?: string;
  technologies: string[];
  role?: string;
  team?: string;
  impact?: string;
  startDate?: string;
  endDate?: string;
  featured: boolean;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  categoryId?: string;
  category?: ProjectCategory;
  projectType: "PERSONAL" | "CLIENT";
  projectViews: ProjectView[];
}

export type CreateProjectDto = Omit<Project, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateProjectDto = Partial<CreateProjectDto>;
