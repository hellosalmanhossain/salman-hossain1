"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight, FolderGit2, ExternalLink, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { ProjectService } from "@/services/project.service";
import { useState } from "react";
import TargetCursor from "@/templates/TechDarkTheme/components/TargetCursor";

export default function ProjectsPage() {
  const { data: projectsData, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => ProjectService.getProjects(),
  });

  const [activeCategory, setActiveCategory] = useState("All");

  const projects = projectsData?.data || [];
  
  const categories = ["All", "Personal", "Production / Team"];
  
  // Filter projects by projectType
  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => {
        if (activeCategory === "Personal") return p.projectType === "PERSONAL" || !p.projectType;
        if (activeCategory === "Production / Team") return p.projectType === "CLIENT";
        return true;
      });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <main className="w-full min-h-screen bg-transparent pt-32 pb-24 relative z-10 font-sans">
      <TargetCursor cursorColor="#ffffff" cursorColorOnTarget="#ffffff" hideDefaultCursor={false} />
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        
        {/* Navigation */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-black dark:hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </motion.div>

        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div className="max-w-2xl">
            <p className="text-sm uppercase tracking-widest text-gray-500 font-bold mb-4 flex items-center gap-2">
              <span className="w-4 h-px bg-gray-500 inline-block" /> MY WORK
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black dark:text-white leading-[1.1] mb-6">
              Selected Projects<br />That Define My Journey
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
              Here are some of the projects I've worked on — a mix of web, mobile and product design. Each one helped me grow, solve real problems, and explore new creative directions.
            </p>
          </div>
          
          {/* Scroll prompt / decorative element */}
          <div className="hidden md:flex items-center gap-4 text-sm font-medium text-gray-500">
            <div className="w-10 h-10 border border-gray-300 dark:border-gray-700 flex items-center justify-center">
              <ArrowRight className="w-4 h-4 transform rotate-90" />
            </div>
            <span>Scroll to explore</span>
          </div>
        </motion.div>

        {/* Filters */}
        {categories.length > 1 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap gap-2 md:gap-8 mb-16 border-b border-gray-200 dark:border-white/10 pb-4"
          >
            {categories.map((cat: any) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                  activeCategory === cat 
                    ? "bg-black text-white dark:bg-white dark:text-black" 
                    : "bg-transparent text-gray-500 hover:text-black dark:hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-32">
            <div className="w-8 h-8 border-4 border-black/20 border-t-black dark:border-white/20 dark:border-t-white rounded-full animate-spin" />
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
          >
            {filteredProjects.map((project) => (
              <motion.div 
                key={project.id}
                variants={itemVariants}
                className="group flex flex-col bg-white dark:bg-[#1A1C23] border border-gray-200 dark:border-white/5 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500"
              >
                {/* Image */}
                <Link href={`/projects/${project.slug}`} className="w-full aspect-[4/3] md:aspect-video relative overflow-hidden bg-gray-100 dark:bg-[#111]">
                  {project.thumbnails && project.thumbnails.length > 0 ? (
                    <img 
                      src={project.thumbnails[0]} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                      <FolderGit2 className="w-12 h-12 mb-2 opacity-30" />
                    </div>
                  )}
                </Link>

                {/* Content */}
                <div className="p-8 flex flex-col flex-1">
                  
                  {project.category && (
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-4 h-4 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded-sm">
                        <span className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-sm" />
                      </span>
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                        {project.category.name}
                      </span>
                    </div>
                  )}

                  <Link href={`/projects/${project.slug}`}>
                    <h3 className="text-xl md:text-2xl font-bold text-black dark:text-white mb-3 group-hover:text-blue-500 transition-colors">
                      {project.title}
                    </h3>
                  </Link>

                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-8 flex-1 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Footer link */}
                  <div className="flex items-center justify-between border-t border-gray-100 dark:border-white/5 pt-6 mt-auto">
                    <Link 
                      href={`/projects/${project.slug}`}
                      className="flex items-center gap-4 group/link"
                    >
                      <span className="text-sm font-semibold text-black dark:text-white uppercase tracking-wider">
                        View Project
                      </span>
                      <div className="w-10 h-10 border border-gray-300 dark:border-gray-600 flex items-center justify-center text-black dark:text-white group-hover/link:bg-black group-hover/link:border-black dark:group-hover/link:bg-white dark:group-hover/link:text-black group-hover/link:text-white transition-all duration-300">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </Link>

                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl}
                        target="_blank" rel="noreferrer"
                        className="w-10 h-10 border border-gray-300 dark:border-gray-600 flex items-center justify-center text-black dark:text-white hover:bg-black hover:border-black dark:hover:bg-white dark:hover:text-black hover:text-white transition-all duration-300"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {!isLoading && filteredProjects.length === 0 && (
          <div className="py-32 text-center text-gray-500">
            <h3 className="text-2xl font-bold mb-2">No projects found.</h3>
          </div>
        )}

      </div>
    </main>
  );
}
