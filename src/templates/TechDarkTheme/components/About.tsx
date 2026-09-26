"use client";

import { IAbout } from "@/types/about";
import { useQuery } from "@tanstack/react-query";
import { getAboutSections } from "@/services/about.service";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { MoveRight, Download, ExternalLink, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ResumeButton } from "./ResumeButton";

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } }
};

export default function About({ data: initialData }: { data?: IAbout }) {
  const [isBioModalOpen, setIsBioModalOpen] = useState(false);
  const { data: aboutData } = useQuery({
    queryKey: ['aboutSections'],
    queryFn: () => getAboutSections(),
    enabled: !initialData,
  });

  const data = initialData || (aboutData?.data && aboutData.data.length > 0 ? aboutData.data[0] : null);

  if (!data) return null;

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-transparent transition-colors duration-300">
      <div className="w-full px-6 sm:px-10 lg:px-16 z-10 relative">
        <div className="max-w-[1400px] mx-auto w-full">
        
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          
          {/* Image Side */}
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

          {/* Content Side */}
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
          
        </motion.div>
        </div>
      </div>
      
      <AnimatePresence>
        {isBioModalOpen && data && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 sm:p-6 lg:p-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-white/10 w-[90vw] max-w-[1400px] h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden relative"
            >
              
              {/* Close Button */}
              <button 
                onClick={() => setIsBioModalOpen(false)}
                className="absolute top-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-black dark:text-white backdrop-blur-md transition-all duration-300 hover:rotate-90 hover:scale-110"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex flex-col lg:flex-row h-full">
                
                {/* Left Side: Sticky Visuals */}
                <div className="w-full lg:w-2/5 h-[40vh] lg:h-full relative overflow-hidden bg-gray-100 dark:bg-[#111]">
                  {data.profileImage ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={data.profileImage} 
                        alt={data.name} 
                        className="w-full h-full object-cover filter grayscale mix-blend-multiply dark:mix-blend-luminosity opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent dark:from-[#0A0A0A] dark:via-[#0A0A0A]/50 dark:to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-white/20 lg:to-white dark:lg:via-[#0A0A0A]/20 dark:lg:to-[#0A0A0A]" />
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-100 dark:from-[#111] dark:to-[#0A0A0A]" />
                  )}
                  
                  <div className="absolute bottom-0 left-0 p-8 lg:p-12 z-10 w-full">
                    <h2 className="text-4xl lg:text-6xl font-black text-black dark:text-white tracking-tighter leading-none mb-4">
                      {data.name}
                    </h2>
                    <p className="text-primary font-bold tracking-widest uppercase text-xs lg:text-sm">
                      {data.headline}
                    </p>
                  </div>
                </div>

                {/* Right Side: Scrollable Content */}
                <div className="w-full lg:w-3/5 h-[50vh] lg:h-full overflow-y-auto overflow-x-hidden p-8 lg:p-16 custom-scrollbar">
                  
                  {/* Stats Row */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 lg:mb-16 pb-12 border-b border-black/10 dark:border-white/10">
                    <div className="flex flex-col gap-2">
                      <span className="text-4xl lg:text-5xl font-black text-black dark:text-white">{data.experienceYears}+</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Years Exp.</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-4xl lg:text-5xl font-black text-black dark:text-white">{data.projectsCount}+</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Projects</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-4xl lg:text-5xl font-black text-black dark:text-white">{data.clientsCount}+</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Clients</span>
                    </div>
                    {data.location && (
                      <div className="flex flex-col gap-2">
                        <span className="text-xl lg:text-2xl font-black text-black dark:text-white mt-1 leading-tight">{data.location}</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mt-auto">Based In</span>
                      </div>
                    )}
                  </div>

                  {/* Bio Content */}
                  <div className="prose prose-lg dark:prose-invert max-w-none prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-p:leading-loose prose-p:font-medium">
                    {data.description ? (
                      data.description.split('\n').map((para, i) => para.trim() ? (
                        <p key={i} className="mb-6 first-letter:text-5xl first-letter:font-black first-letter:text-black dark:first-letter:text-white first-letter:float-left first-letter:mr-4 first-letter:mt-1">
                          {para}
                        </p>
                      ) : null)
                    ) : (
                      <p>{data.shortBio}</p>
                    )}
                  </div>

                  {/* Contact Footer */}
                  {data.email && (
                    <div className="mt-16 pt-12 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block mb-2">Let's Connect</span>
                        <a href={`mailto:${data.email}`} className="text-xl lg:text-2xl font-bold text-black dark:text-white hover:text-primary transition-colors">
                          {data.email}
                        </a>
                      </div>
                      
                      {data.resumeUrl && (
                         <ResumeButton 
                           url={data.resumeUrl}
                           className="group relative overflow-hidden px-8 py-4 bg-black text-white dark:bg-white dark:text-black rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:shadow-2xl"
                         >
                           <span className="absolute inset-y-0 left-0 w-0 bg-primary transition-all duration-500 ease-out group-hover:w-full z-0" />
                           <span className="relative z-10 flex items-center gap-2">
                             View Resume <Download className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                           </span>
                         </ResumeButton>
                      )}
                    </div>
                  )}

                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
