"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { MoveRight, ExternalLink, Mail } from "lucide-react";
import { ResumeButton } from "../../shared/ResumeButton";
import { AnimatedCounter } from "../../shared/AnimatedCounter";
import { ContactAnimation } from "./ContactAnimation";

export function HeroLeftContent({
  hero,
  currentDesignationIndex,
  containerVariants,
  fadeUpVariants,
  textRevealVariants,
  letterVariants
}: {
  hero: any;
  currentDesignationIndex: number;
  containerVariants: any;
  fadeUpVariants: any;
  textRevealVariants: any;
  letterVariants: any;
}) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1 w-full"
    >
      {/* Dynamic Designation Badge */}
      {hero?.designations && hero.designations.length > 0 && (
        <motion.div variants={fadeUpVariants} className="mb-6 lg:mb-8 mt-4 lg:mt-2">
          <div className="inline-flex items-center gap-3 px-4 py-2.5 rounded-none border border-black/20 dark:border-white/20 bg-black/5 dark:bg-white/5 backdrop-blur-sm min-h-[40px]">
            <div className="w-2 h-2 rounded-none bg-black dark:bg-white animate-pulse shrink-0" />
            <div className="flex items-center justify-start overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentDesignationIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200 tracking-wider uppercase whitespace-nowrap"
                >
                  {hero.designations[currentDesignationIndex]}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}

      {/* Title */}
      <div className="overflow-hidden mb-6 w-full perspective-[1000px]">
        <motion.h1 variants={textRevealVariants} className="text-5xl sm:text-7xl lg:text-[5.5rem] font-black tracking-tighter leading-[0.95] text-black dark:text-white">
          <span className="block text-gray-600 dark:text-gray-400 font-medium tracking-normal text-2xl sm:text-3xl mb-4 ml-1">Hello, I am</span>
          <span className="inline-flex flex-wrap justify-center lg:justify-start w-full lg:w-auto gap-x-4 -ml-[0.08em]">
            {(hero?.heroTitle || "Salman Hossain").split(' ').map((word: string, i: number) => (
              <span key={i} className="inline-flex overflow-hidden">
                {word.split('').map((char: string, j: number) => (
                  <motion.span
                    key={`${i}-${j}`}
                    variants={letterVariants}
                    className="inline-block origin-bottom"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </span>
        </motion.h1>
      </div>

      <div className="overflow-hidden mb-10 w-full max-w-2xl text-left">
        <motion.p variants={textRevealVariants} className="text-gray-600 dark:text-gray-400 text-base sm:text-lg lg:text-xl leading-relaxed font-light">
          {hero?.heroDescription || "I build robust backend systems and beautiful web applications."}
        </motion.p>
      </div>

      {/* Minimalist Stats */}
      <motion.div variants={fadeUpVariants} className="grid grid-cols-3 gap-4 sm:gap-8 w-full max-w-xl mb-12 border-y border-black/10 dark:border-white/10 py-6">
        <div className="flex flex-col items-center lg:items-start group">
          <h3 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-2 tracking-tighter flex items-center">
            <AnimatedCounter to={Number(hero?.experienceYears) || 5} duration={2} />
            <span className="text-black dark:text-white/50 ml-1">+</span>
          </h3>
          <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-500 uppercase tracking-widest font-semibold group-hover:text-black dark:text-white transition-colors duration-300">Years Exp.</p>
        </div>
        <div className="flex flex-col items-center lg:items-start border-l border-black/10 dark:border-white/10 pl-4 sm:pl-8 group">
          <h3 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-2 tracking-tighter flex items-center">
            <AnimatedCounter to={Number(hero?.totalProjects) || 50} duration={2.5} />
            <span className="text-black dark:text-white/50 ml-1">+</span>
          </h3>
          <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-500 uppercase tracking-widest font-semibold group-hover:text-black dark:text-white transition-colors duration-300">Projects</p>
        </div>
        <div className="flex flex-col items-center lg:items-start border-l border-black/10 dark:border-white/10 pl-4 sm:pl-8 group">
          <h3 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-2 tracking-tighter flex items-center">
            <AnimatedCounter to={Number(hero?.totalToolsAndTech) || 30} duration={3} />
            <span className="text-black dark:text-white/50 ml-1">+</span>
          </h3>
          <p className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-500 uppercase tracking-widest font-semibold group-hover:text-black dark:text-white transition-colors duration-300">Technologies</p>
        </div>
      </motion.div>

      {/* Buttons */}
      <motion.div variants={fadeUpVariants} className="flex flex-col sm:flex-row items-center gap-4 mb-8 w-full sm:w-auto">
        <Link href="#about" className="group relative overflow-hidden w-full sm:w-auto px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-semibold flex items-center justify-center transition-colors duration-300">
          <span className="absolute inset-y-0 left-0 w-0 bg-white dark:bg-black transition-all duration-[400ms] ease-out group-hover:w-full z-0" />
          <span className="relative z-10 flex items-center gap-3 group-hover:text-black dark:group-hover:text-white transition-colors duration-300">
            More About Me
            <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
        {hero?.resumeUrl && (
          <ResumeButton url={hero.resumeUrl} />
        )}
        <Link href="#contact" className="hidden sm:flex group relative overflow-hidden w-full sm:w-auto px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-semibold items-center justify-center transition-colors duration-300">
          <span className="absolute inset-y-0 left-0 w-0 bg-white dark:bg-black transition-all duration-[400ms] ease-out group-hover:w-full z-0" />
          <span className="relative z-10 flex items-center gap-3 group-hover:text-black dark:group-hover:text-white transition-colors duration-300">
            Let's Talk
            <Mail className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
      </motion.div>

      {/* Interactive Social Links */}
      <ContactAnimation socialLinks={hero?.socialLinks} fadeUpVariants={fadeUpVariants} />
    </motion.div>
  );
}
