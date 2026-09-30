import React from "react";
import { motion } from "framer-motion";
import PixelSnow from "./components/PixelSnow";
import TargetCursor from "./components/TargetCursor";
import Hero from "@/components/home/hero/HeroSection";
import Sidebar from "@/components/shared/sidebar/Sidebar";
import ScrollToTop from "./components/ScrollToTop";
import dynamic from "next/dynamic";

const About = dynamic(() => import("@/components/home/about/AboutSection"));
const TechSphere = dynamic(() => import("@/components/home/skills/SkillsSection"));
const Experience = dynamic(() => import("@/components/home/experience/ExperienceSection"));
const Projects = dynamic(() => import("@/components/home/projects/ProjectsSection"));
const Blog = dynamic(() => import("@/components/home/blog/BlogSection"));
const Contact = dynamic(() => import("@/components/home/contact/ContactSection"));
const Footer = dynamic(() => import("@/components/home/footer/FooterSection"));
const Services = dynamic(() => import("@/components/home/services/ServicesSection"));


export default function TechDarkTheme({ websiteData, isLight, mounted }: any) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="bg-gray-50 dark:bg-black min-h-screen w-full transition-colors duration-300"
    >
      <div className="relative w-full min-h-screen z-0">
        <TargetCursor cursorColor="#ffffff" cursorColorOnTarget="#ffffff" hideDefaultCursor={false} />
        <div style={{ width: '100%', height: '100%', position: 'fixed', top: 0, left: 0, zIndex: -1 }}>
          <PixelSnow
            color={isLight ? "#000000" : "#ffffff"}
            flakeSize={0.01}
            minFlakeSize={1.25}
            pixelResolution={200}
            speed={1.25}
            density={0.3}
            direction={0}
            brightness={isLight ? 0.5 : 1}
            depthFade={8}
            farPlane={20}
            gamma={0.4545}
            variant="square"
          />
        </div>

        <Sidebar />
        <div className="md:pl-20">
          {/* Dynamic sections based on template data */}
          {websiteData.showHero !== false && <Hero />}
          {websiteData.showProjects !== false && <Projects />}
          {websiteData.showServices !== false && <Services />}
          <Experience />
          <TechSphere />
          {websiteData.showAbout !== false && <About />}
          {websiteData.showBlog !== false && <Blog />}
          <Contact />
          <Footer />
        </div>
        <ScrollToTop />
      </div>
    </motion.div>
  );
}
