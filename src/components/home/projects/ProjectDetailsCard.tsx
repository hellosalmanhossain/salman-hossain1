"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, Users, Activity } from "lucide-react";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.5 5.5 0 0 0-1.5-3.8 5.5 5.5 0 0 0-.1-3.8s-1.2-.4-3.9 1.4a13.3 13.3 0 0 0-7 0C6.2 1.6 5 2 5 2a5.5 5.5 0 0 0-.1 3.8A5.5 5.5 0 0 0 3 9.6c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path>
    <path d="M9 18c-4.5 1.5-5-2.5-7-3"></path>
  </svg>
);

export function ProjectDetailsCard({ 
  activeProject, 
  filteredProjects, 
  setIsModalOpen 
}: { 
  activeProject: any; 
  filteredProjects: any[]; 
  setIsModalOpen: (val: boolean) => void;
}) {
  return (
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
            // eslint-disable-next-line @next/next/no-img-element
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
            {activeProject.technologies?.slice(0, 3).map((tech: string, i: number) => (
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
  );
}
