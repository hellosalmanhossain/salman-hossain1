"use client";

import { motion } from "framer-motion";

export function AboutImage({ data, fadeUp }: { data: any; fadeUp: any }) {
  return (
    <motion.div variants={fadeUp} className="relative group">
      {data.profileImage && (
        <div className="relative w-full aspect-[4/5] max-w-md mx-auto lg:mx-0 overflow-hidden bg-gray-100 dark:bg-[#111]">
          <div className="absolute inset-0 bg-black/5 dark:bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10 mix-blend-overlay" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={data.profileImage} 
            alt={data.name} 
            className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100" 
          />
          
          {/* Decorative Elements */}
          <div className="absolute top-4 right-4 w-2 h-2 bg-black dark:bg-white z-20" />
          <div className="absolute bottom-4 left-4 w-2 h-2 bg-black dark:bg-white z-20" />
        </div>
      )}
      
      {/* Experience Badge */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute -bottom-6 -right-2 sm:-right-6 bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 p-5 shadow-2xl backdrop-blur-xl z-30 flex items-center gap-4"
      >
        <div className="w-12 h-12 bg-black dark:bg-white text-white dark:text-black flex items-center justify-center text-xl font-bold">
          {data.experienceYears}+
        </div>
        <p className="text-xs uppercase tracking-widest font-bold text-gray-500">Years of<br />Experience</p>
      </motion.div>
    </motion.div>
  );
}
