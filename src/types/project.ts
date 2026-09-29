import { ProjectStatus } from './common';
import { ProjectCategory } from './projectCategory';
import { ProjectView } from './projectView';


export interface ProjectScreenshot {
  id?: string;
  imageUrl: string;
  title?: string;
  description?: string;
}

export interface ProjectFeature {
  id?: string;
  icon?: string;
  title?: string;
  description?: string;
}

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
  duration?: string;
  statusText?: string;
  overviewTitle?: string;
  overviewDesc?: string;
  projectScreenshots?: ProjectScreenshot[];
  projectFeatures?: ProjectFeature[];
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
