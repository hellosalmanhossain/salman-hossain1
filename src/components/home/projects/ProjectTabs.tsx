"use client";

import { motion } from "framer-motion";

export function ProjectTabs({ 
  filteredProjects, 
  activeProjectId, 
  setActiveProjectId 
}: { 
  filteredProjects: any[]; 
  activeProjectId: string | null; 
  setActiveProjectId: (id: string) => void;
}) {
  return (
    <div className="flex overflow-x-auto no-scrollbar border-b border-black/10 dark:border-white/10 mb-8 lg:mb-6">
      {filteredProjects.map((project, index) => {
        const isActive = activeProjectId === project.id;
        const num = String(index + 1).padStart(2, '0');
        return (
          <button
            key={project.id}
            onClick={() => setActiveProjectId(project.id)}
            className={`group relative flex-shrink-0 flex items-start gap-3 lg:gap-4 px-6 lg:px-8 pb-4 lg:pb-5 transition-colors ${
              isActive ? "text-black dark:text-white" : "text-gray-500 hover:text-black dark:text-gray-500 dark:hover:text-gray-300"
            }`}
          >
            <span className="text-xs lg:text-sm font-medium pt-0.5">{num}</span>
            <div className="flex flex-col items-start gap-1 text-left">
              <span className="font-bold tracking-wider uppercase text-xs lg:text-sm">{project.title}</span>
              <div className="flex items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-primary' : 'bg-gray-400 dark:bg-gray-600'}`} />
                <span className="text-[9px] lg:text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  {project.projectType === 'CLIENT' ? 'Production' : 'Personal'}
                </span>
              </div>
            </div>
            {/* Active Indicator Line */}
            {isActive && (
              <motion.div 
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 w-full h-[2px] bg-primary"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
