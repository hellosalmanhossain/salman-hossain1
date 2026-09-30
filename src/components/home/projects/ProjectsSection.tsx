"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { ProjectService } from "@/services/project.service";
import { ProjectTabs } from "./ProjectTabs";
import { ProjectDetailsCard } from "./ProjectDetailsCard";
import { ProjectCaseStudyModal } from "./ProjectCaseStudyModal";

export default function ProjectsSection() {
  const { data: projectsData, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => ProjectService.getProjects(),
  });

  const allProjects = projectsData?.data || [];
  const displayProjects = allProjects;

  const [filter, setFilter] = useState<"ALL" | "PRODUCTION" | "PERSONAL">("ALL");
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProjects = displayProjects.filter((p: any) => {
    if (filter === "ALL") return true;
    if (filter === "PRODUCTION") return p.projectType === "CLIENT";
    if (filter === "PERSONAL") return p.projectType === "PERSONAL";
    return true;
  });

  // Handle setting the active project safely without triggering infinite re-renders
  useEffect(() => {
    if (filteredProjects.length > 0) {
      if (!activeProjectId || !filteredProjects.find((p: any) => p.id === activeProjectId)) {
        setActiveProjectId(filteredProjects[0].id);
      }
    }
  }, [filteredProjects, activeProjectId]);

  const activeProject = filteredProjects.find((p: any) => p.id === activeProjectId) || filteredProjects[0];

  if (isLoading) {
    return (
      <section id="projects" className="w-full bg-gray-50 dark:bg-transparent py-12 lg:py-6 lg:min-h-screen lg:flex lg:flex-col lg:justify-center transition-colors duration-300">
        <div className="flex justify-center w-full">
          <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className={`relative font-sans py-12 lg:py-6 bg-gray-50 dark:bg-transparent text-black dark:text-white min-h-screen lg:flex lg:flex-col lg:justify-center transition-colors duration-300 ${isModalOpen ? 'z-[100]' : 'z-10'}`}>
      <div className="w-full h-full px-6 sm:px-10 lg:px-16 z-10">
        <div className="max-w-[1400px] mx-auto w-full">
          
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 lg:gap-4 mb-8 lg:mb-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-2 lg:mb-3">
                <div className="w-[2px] h-4 bg-primary" />
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Selected Work</span>
              </div>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-3">Products I've built & shipped</h2>
              <p className="text-gray-600 dark:text-gray-400 text-xs lg:text-sm leading-relaxed max-w-xl">
                A few products I've worked on — from idea to launch, solving real problems with clean code, thoughtful design, and scalable architecture.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 rounded-full p-1 shadow-sm dark:shadow-none shrink-0">
              {(["ALL", "PRODUCTION", "PERSONAL"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 lg:px-6 py-1.5 lg:py-2 rounded-full text-[10px] lg:text-xs font-bold tracking-wider transition-all flex items-center gap-2 ${
                    filter === f 
                      ? "bg-black text-white dark:bg-white/10 dark:text-white" 
                      : "text-gray-500 hover:text-black dark:text-gray-500 dark:hover:text-gray-300"
                  }`}
                >
                  {filter === f && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Project Tabs */}
          <ProjectTabs 
            filteredProjects={filteredProjects} 
            activeProjectId={activeProjectId} 
            setActiveProjectId={setActiveProjectId} 
          />

          {/* Active Project Details */}
          <AnimatePresence mode="wait">
            {activeProject && (
              <ProjectDetailsCard 
                activeProject={activeProject}
                filteredProjects={filteredProjects}
                setIsModalOpen={setIsModalOpen}
              />
            )}
          </AnimatePresence>

        </div>
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {isModalOpen && activeProject && (
          <ProjectCaseStudyModal 
            activeProject={activeProject} 
            setIsModalOpen={setIsModalOpen} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}
