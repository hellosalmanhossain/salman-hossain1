"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { getAboutSections } from "@/services/about.service";
import { IAbout } from "@/types/about";
import { AboutImage } from "./AboutImage";
import { AboutContent } from "./AboutContent";
import { AboutBioModal } from "./AboutBioModal";

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

export default function AboutSection({ data: initialData }: { data?: IAbout }) {
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
            <AboutImage data={data} fadeUp={fadeUp} />

            {/* Content Side */}
            <AboutContent 
              data={data} 
              fadeUp={fadeUp} 
              setIsBioModalOpen={setIsBioModalOpen} 
              aboutData={aboutData} 
            />
          </motion.div>
        </div>
      </div>
      
      <AnimatePresence>
        {isBioModalOpen && data && (
          <AboutBioModal data={data} setIsBioModalOpen={setIsBioModalOpen} />
        )}
      </AnimatePresence>
    </section>
  );
}
