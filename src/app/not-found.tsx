"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home } from "lucide-react";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black flex flex-col items-center justify-center relative overflow-hidden font-sans transition-colors duration-300">
      
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.03] dark:opacity-[0.02] pointer-events-none">
        <h1 className="text-[30vw] font-black select-none tracking-tighter">404</h1>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="z-10 flex flex-col items-center text-center px-6 max-w-2xl"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="mb-8 relative"
        >
          <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full z-0 pointer-events-none" />
          <h2 className="relative z-10 text-8xl md:text-9xl font-black text-black dark:text-white tracking-tighter drop-shadow-2xl">
            4<span className="text-primary">0</span>4
          </h2>
        </motion.div>

        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4 tracking-wide">
          Page Not Found
        </h3>
        
        <p className="text-gray-500 dark:text-gray-400 mb-10 text-sm md:text-base leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. 
          Let's get you back on track.
        </p>

        <Link 
          href="/"
          className="group relative overflow-hidden inline-flex items-center gap-3 px-8 py-4 bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest text-xs md:text-sm rounded-xl transition-all duration-300 hover:shadow-2xl hover:scale-105"
        >
          <span className="absolute inset-y-0 left-0 w-0 bg-primary transition-all duration-500 ease-out group-hover:w-full z-0" />
          <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
            <Home className="w-4 h-4" />
            Back to Home
          </span>
        </Link>
      </motion.div>
    </div>
  );
}
