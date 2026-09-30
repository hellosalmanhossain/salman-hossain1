"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import ProjectDetails from "@/components/ProjectDetails";

export function ProjectCaseStudyModal({ 
  activeProject, 
  setIsModalOpen 
}: { 
  activeProject: any; 
  setIsModalOpen: (val: boolean) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsModalOpen(false)}
        className="absolute inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-[90%] max-w-7xl max-h-[90vh] bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10"
      >
        <div className="flex items-center justify-between p-6 border-b border-black/10 dark:border-white/10 bg-gray-50 dark:bg-[#111]">
          <div>
            <h3 className="text-2xl font-bold uppercase tracking-wider text-black dark:text-white">{activeProject.title} Case Study</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Project Details & Architecture</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(false)}
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white bg-black/5 dark:bg-white/5 rounded-none hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar p-0 bg-white dark:bg-[#0a0a0a]">
          <ProjectDetails project={activeProject} onClose={() => setIsModalOpen(false)} />
        </div>
      </motion.div>
    </div>
  );
}
