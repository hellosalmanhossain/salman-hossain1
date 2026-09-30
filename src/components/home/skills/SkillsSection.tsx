"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SkillService } from "@/services/skill.service";
import dynamic from "next/dynamic";
const SkillGlobe = dynamic(() => import("./SkillGlobe").then(mod => mod.SkillGlobe), { ssr: false });
import { SkillCarousel } from "./SkillCarousel";

export default function SkillsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const { data: skillsData } = useQuery({
    queryKey: ['skills'],
    queryFn: () => SkillService.getSkills(),
  });

  const apiSkills = skillsData?.data || [];

  const skillCategories = [
    {
      title: "Frontend Development",
      skills: apiSkills.filter((s: any) => s.category === 'FRONTEND').map((s: any) => ({ name: s.name, icon: s.icon || '⚛️' }))
    },
    {
      title: "Backend Development",
      skills: apiSkills.filter((s: any) => s.category === 'BACKEND').map((s: any) => ({ name: s.name, icon: s.icon || '🟢' }))
    },
    {
      title: "Database & Data Layer",
      skills: apiSkills.filter((s: any) => s.category === 'DATABASE').map((s: any) => ({ name: s.name, icon: s.icon || '🐬' }))
    },
    {
      title: "DevOps & Deployment",
      skills: apiSkills.filter((s: any) => s.category === 'DEVOPS').map((s: any) => ({ name: s.name, icon: s.icon || '☁' }))
    },
    {
      title: "Tools & Workflow",
      skills: apiSkills.filter((s: any) => s.category === 'TOOL').map((s: any) => ({ name: s.name, icon: s.icon || '⚙️' }))
    },
    {
      title: "Testing & Quality",
      skills: apiSkills.filter((s: any) => s.category === 'TESTING').map((s: any) => ({ name: s.name, icon: s.icon || '🧪' }))
    },
    {
      title: "Core Engineering",
      skills: apiSkills.filter((s: any) => s.category === 'CORE_ENGINEERING').map((s: any) => ({ name: s.name, icon: s.icon || '⚙️' }))
    }
  ].filter((category: any) => category.skills.length > 0);

  // Fallback if no skills are found at all
  if (skillCategories.length === 0) {
    skillCategories.push({
      title: "No Skills Added",
      skills: [{ name: "Please add skills in dashboard", icon: "⚠️" }]
    });
  }

  return (
    <section id="skills" className="w-full bg-transparent py-20 relative z-10 overflow-x-hidden">
      <div className="w-full px-6 sm:px-10 lg:px-16 z-10 relative">
        <div className="max-w-[1400px] mx-auto w-full">

          <div className="flex flex-col gap-2 mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white">
              Technical Skills
            </h2>
            <div className="w-16 h-1 bg-black dark:bg-white rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

            {/* Left Side: 3D Earth */}
            <div className="order-2 lg:order-1 flex justify-center items-center w-full">
              <SkillGlobe apiSkills={apiSkills} />
            </div>

            {/* Right Side: Categorized Skills Carousel */}
            <SkillCarousel
              skillCategories={skillCategories}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />

          </div>
        </div>
      </div>
    </section>
  );
}
