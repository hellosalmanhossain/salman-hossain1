"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Building2, Calendar, ArrowRight, GraduationCap, Award, ExternalLink } from "lucide-react";

export function ExperienceDetails({ 
  activeCategory, 
  activeExp, 
  activeEdu, 
  activeCert 
}: any) {
  return (
    <div className="w-full lg:w-3/4 lg:min-h-[400px]">
      <AnimatePresence mode="wait">
        
        {/* EXPERIENCE DETAILS */}
        {activeCategory === "EXPERIENCE" && activeExp && (
          <motion.div
            key={`exp-${activeExp.id}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col h-full bg-white/80 dark:bg-[#0A0A0A]/60 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-2xl p-6 lg:p-10 shadow-xl dark:shadow-none relative overflow-hidden"
          >
            <Building2 className="absolute -bottom-10 -right-10 w-64 h-64 text-black/5 dark:text-white/5 rotate-12 pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6 lg:mb-8">
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-2 text-black dark:text-white">
                  {activeExp.position}
                </h3>
                <div className="flex items-center gap-2 text-primary font-bold tracking-wider uppercase text-xs lg:text-sm">
                  {activeExp.company}
                </div>
              </div>
              
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-[#111] rounded-full border border-black/5 dark:border-white/5 shrink-0">
                <Calendar className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-gray-500" />
                <span className="text-[10px] lg:text-xs font-bold tracking-wider uppercase text-gray-600 dark:text-gray-300">
                  {new Date(activeExp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} 
                  {" - "} 
                  {activeExp.isCurrent ? "Present" : activeExp.endDate ? new Date(activeExp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ""}
                </span>
              </div>
            </div>

            <div className="relative z-10 flex-1 prose prose-sm lg:prose-base dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
              {(activeExp.description || '').split('\n').map((paragraph: string, idx: number) => (
                <p key={idx} className="mb-4 leading-relaxed flex gap-3">
                   <span className="text-primary mt-1.5 shrink-0"><ArrowRight className="w-3 h-3 lg:w-4 lg:h-4" /></span>
                   <span>{paragraph}</span>
                </p>
              ))}
            </div>
          </motion.div>
        )}

        {/* EDUCATION DETAILS */}
        {activeCategory === "EDUCATION" && activeEdu && (
          <motion.div
            key={`edu-${activeEdu.id}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col h-full bg-white/80 dark:bg-[#0A0A0A]/60 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-2xl p-6 lg:p-10 shadow-xl dark:shadow-none relative overflow-hidden"
          >
            <GraduationCap className="absolute -bottom-10 -right-10 w-64 h-64 text-black/5 dark:text-white/5 -rotate-12 pointer-events-none" />

            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8 lg:mb-12 border-b border-black/5 dark:border-white/5 pb-8">
              <div className="flex-1">
                <h3 className="text-2xl lg:text-4xl font-black mb-3 text-black dark:text-white leading-tight">
                  {activeEdu.degree}
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                  <span className="text-primary font-bold tracking-widest uppercase text-xs lg:text-sm flex items-center gap-2">
                    <Building2 className="w-4 h-4" /> {activeEdu.institute}
                  </span>
                  <span className="hidden sm:block w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-700" />
                  <span className="flex items-center gap-2 text-xs lg:text-sm font-bold tracking-widest uppercase text-gray-500">
                    <Calendar className="w-4 h-4" />
                    {activeEdu.startYear} - {activeEdu.endYear || "Present"}
                  </span>
                </div>
              </div>
              
              {activeEdu.image && (
                <div className="shrink-0 bg-white dark:bg-[#111] p-2 rounded-xl border border-black/10 dark:border-white/10 shadow-sm">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={activeEdu.image} alt={activeEdu.institute} className="w-16 h-16 lg:w-20 lg:h-20 object-contain rounded-lg" />
                </div>
              )}
            </div>

            <div className="relative z-10 flex-1 flex flex-col">
              {activeEdu.field && (
                <div className="bg-gray-50 dark:bg-[#111] border border-black/5 dark:border-white/5 rounded-xl p-5 lg:p-6 mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 block mb-2">Field of Study</span>
                  <span className="text-sm lg:text-base font-medium text-gray-800 dark:text-gray-200">{activeEdu.field}</span>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* CERTIFICATE DETAILS */}
        {activeCategory === "CERTIFICATES" && activeCert && (
          <motion.div
            key={`cert-${activeCert.id}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col h-full bg-white/80 dark:bg-[#0A0A0A]/60 backdrop-blur-md border border-black/10 dark:border-white/10 rounded-2xl p-6 lg:p-8 shadow-xl dark:shadow-none relative overflow-hidden"
          >
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 h-full">
              
              {/* Left: Certificate Image */}
              <div className="w-full flex items-center justify-center bg-gray-50 dark:bg-[#111] rounded-xl border border-black/5 dark:border-white/5 p-4 lg:p-6 h-[250px] lg:h-auto overflow-hidden group">
                {activeCert.image ? (
                   // eslint-disable-next-line @next/next/no-img-element
                   <img 
                     src={activeCert.image} 
                     alt={activeCert.title} 
                     className="w-full h-full object-contain rounded shadow-sm group-hover:scale-105 transition-transform duration-500" 
                   />
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-400 dark:text-gray-600 gap-4">
                    <Award className="w-16 h-16 opacity-50" />
                    <span className="text-xs uppercase tracking-widest font-bold">No Preview Available</span>
                  </div>
                )}
              </div>

              {/* Right: Certificate Info */}
              <div className="flex flex-col justify-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-6">
                  <Award className="w-6 h-6" />
                </div>
                
                <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-black dark:text-white leading-tight">
                  {activeCert.title}
                </h3>
                
                <div className="space-y-4 mb-8">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block mb-1">Issuing Organization</span>
                    <span className="text-sm lg:text-base font-semibold text-gray-800 dark:text-gray-200">{activeCert.issuer}</span>
                  </div>
                  
                  {activeCert.issueDate && (
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block mb-1">Issue Date</span>
                      <span className="text-sm lg:text-base font-semibold text-gray-800 dark:text-gray-200">
                        {new Date(activeCert.issueDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="mt-auto">
                  {activeCert.credentialUrl ? (
                    <a 
                      href={activeCert.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="group relative overflow-hidden w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:shadow-lg"
                    >
                      <span className="absolute inset-y-0 left-0 w-0 bg-black/10 dark:bg-white/10 transition-all duration-300 ease-out group-hover:w-full z-0" />
                      <span className="relative z-10 flex items-center gap-2">
                        Verify Credential <ExternalLink className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </a>
                  ) : (
                    <div className="px-6 py-3 bg-gray-100 dark:bg-[#111] text-gray-500 dark:text-gray-400 rounded-xl text-xs font-bold uppercase tracking-widest text-center sm:text-left inline-block border border-black/5 dark:border-white/5">
                      Verification Unavailable
                    </div>
                  )}
                </div>
              </div>

            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
