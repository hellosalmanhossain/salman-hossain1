"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Calendar, ArrowRight, Building2, GraduationCap, Award, ExternalLink } from "lucide-react";
import { useQueries } from "@tanstack/react-query";
import { ExperienceService } from "@/services/experience.service";
import { EducationService } from "@/services/education.service";
import { CertificateService } from "@/services/certificate.service";

type CategoryType = "EXPERIENCE" | "EDUCATION" | "CERTIFICATES";

export default function Experience() {
  const [activeCategory, setActiveCategory] = useState<CategoryType>("EXPERIENCE");
  const [activeExpId, setActiveExpId] = useState<string | null>(null);
  const [activeEduId, setActiveEduId] = useState<string | null>(null);
  const [activeCertId, setActiveCertId] = useState<string | null>(null);

  const results = useQueries({
    queries: [
      { queryKey: ['experience'], queryFn: () => ExperienceService.getExperiences() },
      { queryKey: ['education'], queryFn: () => EducationService.getEducations() },
      { queryKey: ['certificate'], queryFn: () => CertificateService.getCertificates() },
    ]
  });

  const isLoading = results.some(r => r.isLoading);
  const experiences = results[0].data?.data || [];
  const educations = results[1].data?.data || [];
  const certificates = results[2].data?.data || [];

  // Set initial active items when data loads
  useEffect(() => {
    if (experiences.length > 0 && !activeExpId) setActiveExpId(experiences[0].id);
    if (educations.length > 0 && !activeEduId) setActiveEduId(educations[0].id);
    if (certificates.length > 0 && !activeCertId) setActiveCertId(certificates[0].id);
  }, [experiences, educations, certificates, activeExpId, activeEduId, activeCertId]);

  if (isLoading) {
    return (
      <section id="experience" className="w-full bg-gray-50 dark:bg-transparent py-12 lg:py-6 lg:min-h-screen lg:flex lg:flex-col lg:justify-center transition-colors duration-300">
        <div className="flex justify-center w-full">
          <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  if (experiences.length === 0 && educations.length === 0 && certificates.length === 0) return null;

  const activeExp = experiences.find(e => e.id === activeExpId) || experiences[0];
  const activeEdu = educations.find(e => e.id === activeEduId) || educations[0];
  const activeCert = certificates.find(e => e.id === activeCertId) || certificates[0];

  return (
    <section id="experience" className="relative z-10 font-sans py-12 lg:py-6 bg-gray-50 dark:bg-transparent text-black dark:text-white min-h-screen lg:flex lg:flex-col lg:justify-center transition-colors duration-300">
      <div className="w-full px-6 sm:px-10 lg:px-16 z-10 relative">
        <div className="max-w-[1400px] mx-auto w-full">
          
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 lg:gap-4 mb-8 lg:mb-12">
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-2 lg:mb-3">
                <div className="w-[2px] h-4 bg-primary" />
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">My Background</span>
              </div>
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-3">Professional Journey</h2>
              <p className="text-gray-600 dark:text-gray-400 text-xs lg:text-sm leading-relaxed max-w-xl">
                A timeline of my work experience, educational background, and professional certifications.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 rounded-full p-1 shadow-sm dark:shadow-none shrink-0 overflow-x-auto no-scrollbar w-full lg:w-auto">
              {(["EXPERIENCE", "EDUCATION", "CERTIFICATES"] as const).map((cat) => {
                // Don't show category if no data exists
                if (cat === "EXPERIENCE" && experiences.length === 0) return null;
                if (cat === "EDUCATION" && educations.length === 0) return null;
                if (cat === "CERTIFICATES" && certificates.length === 0) return null;

                const icon = cat === "EXPERIENCE" ? <Briefcase className="w-3.5 h-3.5 lg:w-4 lg:h-4" /> 
                           : cat === "EDUCATION" ? <GraduationCap className="w-3.5 h-3.5 lg:w-4 lg:h-4" /> 
                           : <Award className="w-3.5 h-3.5 lg:w-4 lg:h-4" />;
                const label = cat === "EXPERIENCE" ? "Experience" 
                            : cat === "EDUCATION" ? "Education" 
                            : "Certificates";

                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 lg:px-6 py-2 lg:py-2.5 rounded-full text-[10px] lg:text-xs font-bold tracking-wider transition-all flex items-center gap-2 shrink-0 ${
                      activeCategory === cat 
                        ? "bg-black text-white dark:bg-white/10 dark:text-white" 
                        : "text-gray-500 hover:text-black dark:text-gray-500 dark:hover:text-gray-300"
                    }`}
                  >
                    {activeCategory === cat && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                    {icon}
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            
            {/* Left Column: List Tabs */}
            <div className="w-full lg:w-1/4 flex lg:flex-col overflow-x-auto lg:overflow-x-visible no-scrollbar border-b lg:border-b-0 lg:border-l-2 border-black/10 dark:border-white/10 shrink-0">
              
              {activeCategory === "EXPERIENCE" && experiences.map((exp) => {
                const isActive = activeExpId === exp.id;
                return (
                  <button
                    key={exp.id}
                    onClick={() => setActiveExpId(exp.id)}
                    className={`relative flex items-center shrink-0 px-6 lg:px-8 py-4 lg:py-5 text-left transition-all duration-300 group ${
                      isActive 
                        ? "text-black dark:text-white bg-black/5 dark:bg-white/5" 
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-black/5 dark:hover:bg-white/5"
                    }`}
                  >
                    {isActive && (
                      <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-[2px] lg:w-[2px] lg:h-full lg:-left-[2px] bg-primary" />
                    )}
                    <span className={`font-bold tracking-wider text-xs lg:text-sm ${isActive ? '' : 'group-hover:translate-x-1'} transition-transform duration-300`}>
                      {exp.company}
                    </span>
                  </button>
                );
              })}

              {activeCategory === "EDUCATION" && educations.map((edu) => {
                const isActive = activeEduId === edu.id;
                return (
                  <button
                    key={edu.id}
                    onClick={() => setActiveEduId(edu.id)}
                    className={`relative flex items-center shrink-0 px-6 lg:px-8 py-4 lg:py-5 text-left transition-all duration-300 group ${
                      isActive 
                        ? "text-black dark:text-white bg-black/5 dark:bg-white/5" 
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-black/5 dark:hover:bg-white/5"
                    }`}
                  >
                    {isActive && (
                      <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-[2px] lg:w-[2px] lg:h-full lg:-left-[2px] bg-primary" />
                    )}
                    <span className={`font-bold tracking-wider text-xs lg:text-sm ${isActive ? '' : 'group-hover:translate-x-1'} transition-transform duration-300 line-clamp-1`}>
                      {edu.institute}
                    </span>
                  </button>
                );
              })}

              {activeCategory === "CERTIFICATES" && certificates.map((cert) => {
                const isActive = activeCertId === cert.id;
                return (
                  <button
                    key={cert.id}
                    onClick={() => setActiveCertId(cert.id)}
                    className={`relative flex items-center shrink-0 px-6 lg:px-8 py-4 lg:py-5 text-left transition-all duration-300 group ${
                      isActive 
                        ? "text-black dark:text-white bg-black/5 dark:bg-white/5" 
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-black/5 dark:hover:bg-white/5"
                    }`}
                  >
                    {isActive && (
                      <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 w-full h-[2px] lg:w-[2px] lg:h-full lg:-left-[2px] bg-primary" />
                    )}
                    <span className={`font-bold tracking-wider text-xs lg:text-sm ${isActive ? '' : 'group-hover:translate-x-1'} transition-transform duration-300 line-clamp-1`}>
                      {cert.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Details */}
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
                      {(activeExp.description || '').split('\n').map((paragraph, idx) => (
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

          </div>
        </div>
      </div>
    </section>
  );
}
