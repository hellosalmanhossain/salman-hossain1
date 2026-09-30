"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import { motion, Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { HeroSectionService } from "@/services/heroSection.service";
import { HeroLeftContent } from "./HeroLeftContent";
import { HeroRightImage } from "./HeroRightImage";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = mounted && resolvedTheme === "dark";
  const [currentDesignationIndex, setCurrentDesignationIndex] = useState(0);

  const { data: heroData } = useQuery({
    queryKey: ['hero'],
    queryFn: () => HeroSectionService.getHeroSection(),
  });

  const hero = heroData?.data;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!hero?.designations || hero.designations.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentDesignationIndex((prev) => (prev + 1) % hero.designations.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [hero?.designations]);

  // Framer Motion Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const textRevealVariants: Variants = {
    hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 20, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }
    }
  };

  const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="home" className="min-h-screen relative overflow-hidden bg-transparent text-black dark:text-white w-full flex items-center justify-center pt-24 lg:pt-0 pb-16 lg:pb-0 selection:bg-white selection:text-black">
      {/* Background B&W Grid & Grain */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{ backgroundImage: `radial-gradient(circle at center, ${isDark ? '#ffffff' : '#000000'} 1px, transparent 1px)`, backgroundSize: '32px 32px' }} />
      <div className="absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay pointer-events-none"></div>

      {/* Decorative Background Orbs */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} 
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} 
        className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none" 
      />
      <motion.div 
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }} 
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }} 
        className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" 
      />

      <div className="w-full h-full px-6 sm:px-10 lg:px-16 flex items-center justify-center z-10">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
          <HeroLeftContent 
            hero={hero}
            currentDesignationIndex={currentDesignationIndex}
            containerVariants={containerVariants}
            fadeUpVariants={fadeUpVariants}
            textRevealVariants={textRevealVariants}
            letterVariants={letterVariants}
          />
          <HeroRightImage hero={hero} />
        </div>
      </div>

      {/* Scroll Down Animation */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-[10px] uppercase tracking-widest text-black dark:text-white/50 font-bold mb-1">Scroll Down</span>
        <ChevronDown className="w-6 h-6 text-black dark:text-white" />
      </motion.div>
    </section>
  );
}
