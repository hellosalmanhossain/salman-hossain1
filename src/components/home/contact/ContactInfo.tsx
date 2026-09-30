"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

export function ContactInfo({ hero, itemVariants }: { hero: any; itemVariants: any; }) {
  return (
    <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col gap-10">
      {/* Header Area */}
      <div>
        <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur-sm mb-6">
          <span className="w-1.5 h-1.5 bg-black dark:bg-white" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-600 dark:text-gray-300">Let's Connect</span>
        </div>
        
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-black dark:text-white leading-[1.1] tracking-tighter mb-6">
          Have a Project<br />in Mind?
        </h2>
        
        <p className="text-gray-600 dark:text-gray-400 text-base md:text-lg leading-relaxed max-w-md">
          I'm always excited to work on new ideas, collaborate with amazing people, and bring creative visions to life. Drop me a message and I'll get back to you as soon as possible.
        </p>
      </div>

      {/* Vertical Contact Cards */}
      <div className="flex flex-col gap-4 mt-2">
        <a href={`mailto:${hero?.email || "hello@salmanhossain.com"}`} className="bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 p-6 flex items-center gap-5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors group">
          <div className="w-12 h-12 bg-black/5 dark:bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
            <Mail className="w-5 h-5 text-black dark:text-white" />
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 font-semibold mb-1">Email</h4>
            <p className="text-lg font-bold text-black dark:text-white">{hero?.email || "hello@salmanhossain.com"}</p>
          </div>
        </a>

        <a href={`tel:${hero?.phone || "+8801234567890"}`} className="bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 p-6 flex items-center gap-5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors group">
          <div className="w-12 h-12 bg-black/5 dark:bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
            <Phone className="w-5 h-5 text-black dark:text-white" />
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 font-semibold mb-1">Phone</h4>
            <p className="text-lg font-bold text-black dark:text-white">{hero?.phone || "+880 1234-567890"}</p>
          </div>
        </a>

        <div className="bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 p-6 flex items-center gap-5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors group">
          <div className="w-12 h-12 bg-black/5 dark:bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
            <MapPin className="w-5 h-5 text-black dark:text-white" />
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 font-semibold mb-1">Location</h4>
            <p className="text-lg font-bold text-black dark:text-white">{hero?.location || "Dhaka, Bangladesh"}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
