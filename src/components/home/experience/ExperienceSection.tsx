"use client";

import { useState, useEffect } from "react";
import { Briefcase, GraduationCap, Award } from "lucide-react";
import { useQueries } from "@tanstack/react-query";
import { ExperienceService } from "@/services/experience.service";
import { EducationService } from "@/services/education.service";
import { CertificateService } from "@/services/certificate.service";
import { ExperienceTabs } from "./ExperienceTabs";
import { ExperienceDetails } from "./ExperienceDetails";

type CategoryType = "EXPERIENCE" | "EDUCATION" | "CERTIFICATES";

export default function ExperienceSection() {
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

  const activeExp = experiences.find((e: any) => e.id === activeExpId) || experiences[0];
  const activeEdu = educations.find((e: any) => e.id === activeEduId) || educations[0];
  const activeCert = certificates.find((e: any) => e.id === activeCertId) || certificates[0];

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
            <div className="flex bg-white dark:bg-[#111] border border-black/10 dark:border-white/10 rounded-none p-1 shadow-sm dark:shadow-none shrink-0 overflow-x-auto no-scrollbar w-full lg:w-auto">
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
                    className={`px-4 lg:px-6 py-2 lg:py-2.5 rounded-none text-[10px] lg:text-xs font-bold tracking-wider transition-all flex items-center gap-2 shrink-0 ${
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
            <ExperienceTabs 
              activeCategory={activeCategory}
              experiences={experiences}
              educations={educations}
              certificates={certificates}
              activeExpId={activeExpId}
              activeEduId={activeEduId}
              activeCertId={activeCertId}
              setActiveExpId={setActiveExpId}
              setActiveEduId={setActiveEduId}
              setActiveCertId={setActiveCertId}
            />

            {/* Right Column: Details */}
            <ExperienceDetails 
              activeCategory={activeCategory}
              activeExp={activeExp}
              activeEdu={activeEdu}
              activeCert={activeCert}
            />

          </div>
        </div>
      </div>
    </section>
  );
}
