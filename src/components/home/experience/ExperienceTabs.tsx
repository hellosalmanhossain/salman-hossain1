"use client";

import { motion } from "framer-motion";

export function ExperienceTabs({ 
  activeCategory, 
  experiences, 
  educations, 
  certificates,
  activeExpId,
  activeEduId,
  activeCertId,
  setActiveExpId,
  setActiveEduId,
  setActiveCertId 
}: any) {
  return (
    <div className="w-full lg:w-1/4 flex lg:flex-col overflow-x-auto lg:overflow-x-visible no-scrollbar border-b lg:border-b-0 lg:border-l-2 border-black/10 dark:border-white/10 shrink-0">
      {activeCategory === "EXPERIENCE" && experiences.map((exp: any) => {
        const isActive = activeExpId === exp.id;
        return (
          <button
            key={exp.id}
            onClick={() => setActiveExpId(exp.id)}
            className={`relative flex items-center shrink-0 px-6 lg:px-8 py-4 lg:py-5 text-left transition-all duration-300 group ${
              isActive 
                ? "text-black dark:text-white bg-black/5 dark:bg-white/5" 
                : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            {isActive && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-[2px] lg:w-[2px] lg:h-full lg:-left-[2px] bg-primary" />
            )}
            <span className={`font-bold tracking-wider text-xs lg:text-sm ${isActive ? '' : 'group-hover:translate-x-1'} transition-transform duration-300`}>
              {exp.company}
            </span>
          </button>
        );
      })}

      {activeCategory === "EDUCATION" && educations.map((edu: any) => {
        const isActive = activeEduId === edu.id;
        return (
          <button
            key={edu.id}
            onClick={() => setActiveEduId(edu.id)}
            className={`relative flex items-center shrink-0 px-6 lg:px-8 py-4 lg:py-5 text-left transition-all duration-300 group ${
              isActive 
                ? "text-black dark:text-white bg-black/5 dark:bg-white/5" 
                : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            {isActive && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-[2px] lg:w-[2px] lg:h-full lg:-left-[2px] bg-primary" />
            )}
            <span className={`font-bold tracking-wider text-xs lg:text-sm ${isActive ? '' : 'group-hover:translate-x-1'} transition-transform duration-300 line-clamp-1`}>
              {edu.institute}
            </span>
          </button>
        );
      })}

      {activeCategory === "CERTIFICATES" && certificates.map((cert: any) => {
        const isActive = activeCertId === cert.id;
        return (
          <button
            key={cert.id}
            onClick={() => setActiveCertId(cert.id)}
            className={`relative flex items-center shrink-0 px-6 lg:px-8 py-4 lg:py-5 text-left transition-all duration-300 group ${
              isActive 
                ? "text-black dark:text-white bg-black/5 dark:bg-white/5" 
                : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            {isActive && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-[2px] lg:w-[2px] lg:h-full lg:-left-[2px] bg-primary" />
            )}
            <span className={`font-bold tracking-wider text-xs lg:text-sm ${isActive ? '' : 'group-hover:translate-x-1'} transition-transform duration-300 line-clamp-1`}>
              {cert.title}
            </span>
          </button>
        );
      })}
    </div>
  );
}
