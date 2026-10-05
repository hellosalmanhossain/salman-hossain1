"use client";

import { motion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import { ResumeButton } from "../../shared/ResumeButton";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { HeroSectionService } from "@/services/heroSection.service";

export function AboutBioModal({ data, setIsBioModalOpen }: { data: any; setIsBioModalOpen: (val: boolean) => void; }) {
  const { data: heroData } = useQuery({
    queryKey: ["hero"],
    queryFn: () => HeroSectionService.getHeroSection(),
  });

  return (
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
          className="absolute top-6 right-6 z-50 w-12 h-12 flex items-center justify-center rounded-none bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-black dark:text-white backdrop-blur-md transition-all duration-300 hover:rotate-90 hover:scale-110"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex flex-col lg:flex-row h-full">
          
          {/* Left Side: Sticky Visuals */}
          <div className="w-full lg:w-2/5 h-[40vh] lg:h-full relative overflow-hidden bg-gray-100 dark:bg-[#111]">
            {data.profileImage ? (
              <>

                <Image 
                  src={data.profileImage} 
                  alt={data.name || "Profile"} 
                  fill
                  className="object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                  sizes="(max-width: 1024px) 100vw, 40vw"
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
                data.description.split('\n').map((para: string, i: number) => para.trim() ? (
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
                
                {heroData?.data?.resumeUrl && (
                   <ResumeButton url={heroData.data.resumeUrl} />
                )}
              </div>
            )}

          </div>
        </div>
      </motion.div>
    </div>
  );
}
