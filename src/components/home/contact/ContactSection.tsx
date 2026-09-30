"use client";

import { motion, Variants } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { HeroSectionService } from "@/services/heroSection.service";
import { ContactInfo } from "./ContactInfo";
import { ContactForm } from "./ContactForm";

export default function ContactSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const { data: heroData } = useQuery({
    queryKey: ['hero'],
    queryFn: () => HeroSectionService.getHeroSection(),
  });

  const hero = heroData?.data;

  return (
    <section id="contact" className="w-full bg-transparent py-24 relative z-10 overflow-x-hidden font-sans">
      <div className="w-full px-6 sm:px-10 lg:px-16 z-10 relative">
        <div className="max-w-[1400px] mx-auto w-full">
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12"
        >
          {/* Left Column: Info & Details */}
          <ContactInfo hero={hero} itemVariants={itemVariants} />

          {/* Right Column: Form Container */}
          <ContactForm itemVariants={itemVariants} />

        </motion.div>
        </div>
      </div>
    </section>
  );
}
