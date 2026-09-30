"use client";

import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";

export function AboutContent({ data, fadeUp, setIsBioModalOpen, aboutData }: { data: any; fadeUp: any; setIsBioModalOpen: (val: boolean) => void; aboutData: any; }) {
  return (
    <div className="flex flex-col justify-center">
      <motion.div variants={fadeUp} className="mb-6 flex items-center gap-4">
        <span className="w-8 h-[2px] bg-black dark:bg-white" />
        <h2 className="text-sm uppercase tracking-[0.3em] font-bold text-gray-500 dark:text-gray-400">Discover More</h2>
      </motion.div>
      
      <motion.h3 variants={fadeUp} className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-6 leading-snug">
        {aboutData?.data?.[0]?.name ? `Hello, I'm ${aboutData.data[0].name}` : "Creative Developer & Tech Enthusiast"}
      </motion.h3>
      
      {/* The headline was too long, so we style it as a prominent but smaller subtitle */}
      <motion.div variants={fadeUp} className="mb-6 pb-6 border-b border-black/10 dark:border-white/10">
        <p className="text-lg text-gray-800 dark:text-gray-200 font-medium leading-relaxed">
          {data.headline}
        </p>
      </motion.div>
      
      <motion.p variants={fadeUp} className="text-base text-gray-500 dark:text-gray-400 mb-8 leading-loose max-w-xl">
        {data.shortBio}
      </motion.p>
      
      <motion.div variants={fadeUp} className="grid grid-cols-2 gap-6 mb-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-100 dark:bg-white/10 flex items-center justify-center">
             <span className="text-xl font-bold text-black dark:text-white">{data.projectsCount}+</span>
          </div>
          <p className="text-sm text-gray-500 uppercase tracking-widest font-semibold">Completed<br/>Projects</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-100 dark:bg-white/10 flex items-center justify-center">
             <span className="text-xl font-bold text-black dark:text-white">{data.clientsCount}+</span>
          </div>
          <p className="text-sm text-gray-500 uppercase tracking-widest font-semibold">Happy<br/>Clients</p>
        </div>
      </motion.div>
      
      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
        {data.description && (
          <button onClick={() => setIsBioModalOpen(true)} className="group relative overflow-hidden px-8 py-4 bg-white text-black font-bold flex items-center justify-center border border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-[0_10px_30px_rgba(255,255,255,0.15)] w-full sm:w-auto">
            <span className="absolute inset-y-0 left-0 w-0 bg-black transition-all duration-500 ease-out group-hover:w-full z-0" />
            <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-500">
              Read Full Bio
              <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        )}
      </motion.div>
    </div>
  );
}
