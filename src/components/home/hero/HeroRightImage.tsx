"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles } from "lucide-react";

export function HeroRightImage({ hero }: { hero: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
      className="lg:col-span-5 relative flex justify-center lg:justify-end order-1 lg:order-2 w-full mb-8 lg:mb-0"
    >
      <div className="relative w-64 h-80 sm:w-80 sm:h-[400px] lg:w-[400px] lg:h-[500px]">

        {/* Minimalist Border Box */}
        <motion.div 
          animate={{ rotate: [0, 2, -2, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 border-2 border-black/20 dark:border-white/20 translate-x-4 translate-y-4 lg:translate-x-6 lg:translate-y-6 transition-transform duration-500 group-hover:translate-x-0 group-hover:translate-y-0" 
        />

        <div className="w-full h-full relative overflow-hidden bg-white dark:bg-[#111] z-10 grayscale hover:grayscale-0 transition-all duration-700 border border-black/10 dark:border-white/10 group">
          {hero?.profileImage && (
            <Image
              src={hero.profileImage}
              alt="Profile"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              priority
              unoptimized
            />
          )}
          {/* Monochrome overlay */}
          <div className="absolute inset-0 bg-black/20 mix-blend-multiply pointer-events-none" />
        </div>

        {/* Floating B&W Badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute -left-6 lg:-left-12 bottom-12 z-20"
        >
          <motion.div 
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="bg-white dark:bg-[#111] text-black dark:text-white p-4 shadow-2xl flex items-center gap-4 rounded-xl border border-black/5 dark:border-white/10 backdrop-blur-sm"
          >
            <div className="w-10 h-10 bg-black dark:bg-white flex items-center justify-center rounded-lg shadow-inner">
              <Sparkles className="w-5 h-5 text-white dark:text-black" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Currently</p>
              <p className="text-sm font-black uppercase tracking-wider text-black dark:text-white">Available</p>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </motion.div>
  );
}
