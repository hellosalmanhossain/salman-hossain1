"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ArrowRight, Calendar, Users, Activity, X } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ProjectService } from "@/services/project.service";
import { Project } from "@/types/project";
import ProjectDetails from "@/components/ProjectDetails";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.5 5.5 0 0 0-1.5-3.8 5.5 5.5 0 0 0-.1-3.8s-1.2-.4-3.9 1.4a13.3 13.3 0 0 0-7 0C6.2 1.6 5 2 5 2a5.5 5.5 0 0 0-.1 3.8A5.5 5.5 0 0 0 3 9.6c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path>
    <path d="M9 18c-4.5 1.5-5-2.5-7-3"></path>
  </svg>
);

export default function Projects() {
  const { data: projectsData, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => ProjectService.getProjects(),
  });

  const allProjects = projectsData?.data || [];
  const displayProjects = allProjects;

  const [filter, setFilter] = useState<"ALL" | "PRODUCTION" | "PERSONAL">("ALL");
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProjects = displayProjects.filter(p => {
    if (filter === "ALL") return true;
    if (filter === "PRODUCTION") return p.projectType === "CLIENT";
    if (filter === "PERSONAL") return p.projectType === "PERSONAL";
    return true;
  });

  // Handle setting the active project safely without triggering infinite re-renders
  useEffect(() => {
    if (filteredProjects.length > 0) {
      if (!activeProjectId || !filteredProjects.find(p => p.id === activeProjectId)) {
        setActiveProjectId(filteredProjects[0].id);
      }
    }
  }, [filteredProjects, activeProjectId]);

  const activeProject = filteredProjects.find(p => p.id === activeProjectId) || filteredProjects[0];

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

        {/* Active Project Details */}
        <AnimatePresence mode="wait">
          {activeProject && (
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="border border-black/10 dark:border-white/10 rounded-2xl bg-white/80 dark:bg-[#0A0A0A]/60 backdrop-blur-md p-5 lg:p-6 xl:p-8 flex flex-col lg:flex-row gap-6 lg:gap-8 shadow-xl dark:shadow-none"
            >
              {/* Left Column: Image Mockup */}
              <div className="w-full lg:w-[50%] rounded-xl border border-black/10 dark:border-white/5 bg-gray-50/50 dark:bg-[#111]/50 overflow-hidden flex flex-col max-h-[300px] lg:max-h-[350px]">
                <div className="flex items-center gap-2 px-4 py-2 lg:py-3 border-b border-black/10 dark:border-white/5 bg-gray-100/50 dark:bg-[#161616]/50">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 bg-gray-200/50 dark:bg-black/50 p-4 relative min-h-[180px] lg:min-h-[220px]">
                  {activeProject.thumbnails?.[0] ? (
                    <img 
                      src={activeProject.thumbnails[0]} 
                      alt={activeProject.title}
                      className="w-full h-full object-cover rounded-lg border border-black/10 dark:border-white/10"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-white/20 border border-black/10 dark:border-white/5 rounded-lg">
                      No Image Available
                    </div>
                  )}
                </div>
              </div>

              {/* Middle & Right Columns Container */}
              <div className="w-full lg:w-[50%] flex flex-col md:flex-row gap-6 lg:gap-8">
                
                {/* Middle Column: Description */}
                <div className="w-full md:w-3/5 flex flex-col">
                  <span className="text-lg lg:text-xl font-medium text-gray-500 mb-1 lg:mb-2">
                    {String(filteredProjects.findIndex(p => p.id === activeProject.id) + 1).padStart(2, '0')}.
                  </span>
                  <h3 className="text-2xl lg:text-3xl font-bold uppercase tracking-wider mb-2 lg:mb-3 leading-tight">
                    {activeProject.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-4 lg:mb-6">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span className="text-xs lg:text-sm text-gray-500 dark:text-gray-400 capitalize">
                      {activeProject.category?.name || "E-commerce Platform"}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-xs lg:text-sm leading-relaxed mb-4 lg:mb-8 flex-1">
                    {activeProject.description}
                  </p>
                  
                  <div>
                    <h4 className="text-[9px] lg:text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 lg:mb-3">My Role</h4>
                    <p className="text-xs lg:text-sm text-gray-800 dark:text-gray-300">
                      {activeProject.role || "Full Stack Developer"}
                    </p>
                  </div>
                </div>

                {/* Vertical Divider (Desktop) */}
                <div className="hidden md:block w-[1px] bg-black/10 dark:bg-white/10" />

                {/* Right Column: Details & Actions */}
                <div className="w-full md:w-2/5 flex flex-col">
                  <h4 className="text-[9px] lg:text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-4 lg:mb-6">At A Glance</h4>
                  
                  <div className="space-y-3 lg:space-y-4 mb-6 lg:mb-8">
                    <div className="flex items-start gap-3 lg:gap-4">
                      <Calendar className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-gray-500 mt-0.5" />
                      <div>
                        <div className="text-[9px] lg:text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Year</div>
                        <div className="text-xs lg:text-sm text-gray-800 dark:text-gray-300">
                          {activeProject.startDate ? new Date(activeProject.startDate).getFullYear() : '2024'} - {activeProject.endDate ? new Date(activeProject.endDate).getFullYear() : 'Present'}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 lg:gap-4">
                      <Users className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-gray-500 mt-0.5" />
                      <div>
                        <div className="text-[9px] lg:text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Team</div>
                        <div className="text-xs lg:text-sm text-gray-800 dark:text-gray-300">{activeProject.team || "Solo Project"}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 lg:gap-4">
                      <Activity className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-gray-500 mt-0.5" />
                      <div>
                        <div className="text-[9px] lg:text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Impact</div>
                        <div className="text-xs lg:text-sm text-gray-800 dark:text-gray-300">{activeProject.impact || "TBD"}</div>
                      </div>
                    </div>
                  </div>

                  <h4 className="text-[9px] lg:text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 lg:mb-3">Tech Stack</h4>
                  <div className="flex flex-wrap gap-1.5 lg:gap-2 mb-6 lg:mb-8">
                    {activeProject.technologies?.slice(0, 3).map((tech, i) => (
                      <span key={i} className="px-2 lg:px-3 py-1 rounded-full border border-black/10 dark:border-white/10 text-[9px] lg:text-[10px] uppercase tracking-wider text-gray-700 dark:text-gray-300 bg-black/5 dark:bg-white/5">
                        {tech}
                      </span>
                    ))}
                    {(activeProject.technologies?.length || 0) > 3 && (
                      <span className="px-2 lg:px-3 py-1 rounded-full border border-black/10 dark:border-white/10 text-[9px] lg:text-[10px] uppercase tracking-wider text-gray-700 dark:text-gray-300 bg-black/5 dark:bg-white/5">
                        +{(activeProject.technologies?.length || 0) - 3}
                      </span>
                    )}
                  </div>

                  <div className="mt-auto space-y-2 lg:space-y-3">
                    {activeProject.liveUrl && (
                      <a 
                        href={activeProject.liveUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="group relative overflow-hidden w-full py-2.5 lg:py-3 bg-primary text-primary-foreground font-bold text-[10px] lg:text-xs uppercase tracking-widest rounded flex items-center justify-center transition-all duration-500 border-2 border-primary"
                      >
                        <span className="absolute inset-y-0 left-0 w-0 bg-black dark:bg-white transition-all duration-[600ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:w-full z-0" />
                        <span className="relative z-10 flex items-center gap-2 group-hover:text-white dark:group-hover:text-black transition-colors duration-500">
                          Live Product <ArrowRight className="w-3 h-3 lg:w-4 lg:h-4 group-hover:translate-x-1 transition-transform duration-500" />
                        </span>
                      </a>
                    )}
                    <button 
                      onClick={() => setIsModalOpen(true)}
                      className="group relative overflow-hidden w-full py-2.5 lg:py-3 border-2 border-black dark:border-white text-black dark:text-white font-bold text-[10px] lg:text-xs uppercase tracking-widest rounded flex items-center justify-center transition-all duration-500"
                    >
                      <span className="absolute inset-y-0 left-0 w-0 bg-black dark:bg-white transition-all duration-[600ms] ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:w-full z-0" />
                      <span className="relative z-10 flex items-center gap-2 group-hover:text-white dark:group-hover:text-black transition-colors duration-500">
                        Case Study <ArrowRight className="w-3 h-3 lg:w-4 lg:h-4 group-hover:translate-x-1 transition-transform duration-500" />
                      </span>
                    </button>
                    {(activeProject.githubFrontendUrl || activeProject.githubBackendUrl) && (
                      <div className="flex gap-2 mt-2">
                         {activeProject.githubFrontendUrl && (
                           <a 
                             href={activeProject.githubFrontendUrl} 
                             target="_blank" 
                             rel="noreferrer"
                             className="flex-1 py-1.5 lg:py-2 border border-black/20 dark:border-white/20 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white rounded flex items-center justify-center transition-colors"
                             title="Frontend GitHub"
                           >
                             <GithubIcon className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                           </a>
                         )}
                         {activeProject.githubBackendUrl && (
                           <a 
                             href={activeProject.githubBackendUrl} 
                             target="_blank" 
                             rel="noreferrer"
                             className="flex-1 py-1.5 lg:py-2 border border-black/20 dark:border-white/20 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white rounded flex items-center justify-center transition-colors"
                             title="Backend GitHub"
                           >
                             <GithubIcon className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                           </a>
                         )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        </div>
      </div>

      {/* Case Study Modal */}
      <AnimatePresence>
        {isModalOpen && activeProject && (
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
                  className="p-2 text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white bg-black/5 dark:bg-white/5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto custom-scrollbar p-0 bg-white dark:bg-[#0a0a0a]">
                <ProjectDetails project={activeProject} />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
