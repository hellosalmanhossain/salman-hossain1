"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function SkillCarousel({ 
  skillCategories, 
  activeIndex, 
  setActiveIndex 
}: { 
  skillCategories: any[]; 
  activeIndex: number; 
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="order-1 lg:order-2 flex flex-col items-center justify-center w-full relative">
      
      {/* Title */}
      <h3 className="text-xl sm:text-2xl font-bold text-black dark:text-white text-center uppercase tracking-widest mb-6">
        {skillCategories[activeIndex].title}
      </h3>

      {/* Content block with fixed height and side arrows */}
      <div className="flex items-center w-full gap-2 sm:gap-4 relative">
        
        <button 
          onClick={() => setActiveIndex((prev) => (prev - 1 + skillCategories.length) % skillCategories.length)} 
          className="p-2 bg-black/5 dark:bg-white/5 hover:bg-black dark:hover:bg-white transition-all shadow-sm flex-shrink-0 text-black dark:text-white hover:text-white dark:hover:text-black border border-black/10 dark:border-white/10 rounded-none z-10 group"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-1 transition-transform" />
        </button>
        
        <div className="flex-1 h-[300px] sm:h-[400px] lg:h-[600px] overflow-y-auto overflow-x-hidden rounded-none bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 shadow-inner p-4 sm:p-6 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-4 w-full max-w-xs sm:max-w-sm mx-auto"
            >
              {skillCategories[activeIndex].skills.map((skill: any, sIdx: number) => (
                <div 
                  key={sIdx} 
                  className="flex items-center gap-4 w-full group"
                >
                  {/* Logo Box */}
                  <div className="flex-shrink-0 w-[56px] min-w-[56px] max-w-[56px] h-[56px] min-h-[56px] max-h-[56px] sm:w-[64px] sm:min-w-[64px] sm:max-w-[64px] sm:h-[64px] sm:min-h-[64px] sm:max-h-[64px] flex items-center justify-center bg-transparent rounded-none border border-black/20 dark:border-white/20 shadow-sm transition-all group-hover:border-black dark:group-hover:border-white">
                    {skill.icon.startsWith('http') ? (
                       // eslint-disable-next-line @next/next/no-img-element
                       <img src={skill.icon} alt={skill.name} className="w-8 h-8 sm:w-10 sm:h-10 object-contain grayscale group-hover:scale-110 transition-transform" />
                    ) : skill.icon.length > 2 && !skill.icon.includes('️') ? (
                       <span className="text-xs font-bold text-gray-500 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors">{skill.icon}</span>
                    ) : (
                       <span className="text-2xl sm:text-3xl grayscale group-hover:scale-110 transition-transform">{skill.icon}</span>
                    )}
                  </div>
                  
                  {/* Name Box */}
                  <div className="flex-1 h-[56px] min-h-[56px] sm:h-[64px] sm:min-h-[64px] flex items-center px-6 bg-transparent rounded-none border border-black/20 dark:border-white/20 shadow-sm transition-all group-hover:bg-black dark:group-hover:bg-white">
                    <span className="text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 group-hover:text-white dark:group-hover:text-black transition-colors">{skill.name}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <button 
          onClick={() => setActiveIndex((prev) => (prev + 1) % skillCategories.length)} 
          className="p-2 bg-black/5 dark:bg-white/5 hover:bg-black dark:hover:bg-white transition-all shadow-sm flex-shrink-0 text-black dark:text-white hover:text-white dark:hover:text-black border border-black/10 dark:border-white/10 rounded-none z-10 group"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
        </button>

      </div>
      
      {/* Pagination dots */}
      <div className="flex gap-2 mt-6">
        {skillCategories.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`h-2 transition-all duration-300 rounded-none ${idx === activeIndex ? 'bg-black dark:bg-white w-8' : 'bg-black/20 dark:bg-white/20 w-2'}`}
          />
        ))}
      </div>

    </div>
  );
}
