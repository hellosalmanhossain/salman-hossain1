"use client"; 

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ProjectService } from "@/services/project.service";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import TargetCursor from "@/templates/TechDarkTheme/components/TargetCursor";
import { useState } from "react";

// Custom SVG Icon for GitHub
const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.5 5.5 0 0 0-1.5-3.8 5.5 5.5 0 0 0-.1-3.8s-1.2-.4-3.9 1.4a13.3 13.3 0 0 0-7 0C6.2 1.6 5 2 5 2a5.5 5.5 0 0 0-.1 3.8A5.5 5.5 0 0 0 3 9.6c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path>
    <path d="M9 18c-4.5 1.5-5-2.5-7-3"></path>
  </svg>
);

export default function ProjectDetailsPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [activeImage, setActiveImage] = useState(0);

  const { data: projectsData, isLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => ProjectService.getProjects(),
  });

  const project = projectsData?.data?.find(p => p.slug === slug);

  const calculateDuration = (start?: string, end?: string) => {
    if (!start) return "N/A";
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : new Date();
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 7) return `${diffDays} Days`;
    if (diffDays < 30) return `${Math.round(diffDays / 7)} Weeks`;
    return `${Math.round(diffDays / 30)} Months`;
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen bg-[#FAFAFA] dark:bg-[#0A0A0A] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-black/20 border-t-black dark:border-white/20 dark:border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="w-full min-h-screen bg-[#FAFAFA] dark:bg-[#0A0A0A] flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">Project Not Found</h1>
        <Link href="/projects" className="text-gray-500 hover:text-black dark:hover:text-white flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Return to Projects
        </Link>
      </div>
    );
  }

  const projectTypeLabel = project.projectType === 'CLIENT' ? 'Client / Production' : 'Personal Project';

  return (
    <main className="w-full min-h-screen bg-white dark:bg-[#0A0A0A] pt-32 pb-32 relative z-10 font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      <TargetCursor cursorColor="#ffffff" cursorColorOnTarget="#ffffff" hideDefaultCursor={false} />
      
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        
        {/* Navigation */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <button onClick={() => window.history.back()} className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-gray-400 hover:text-black dark:hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Projects
          </button>
        </motion.div>

        {/* Premium Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="flex flex-col gap-6 mb-8">
            <div className="flex flex-wrap items-center gap-3">
              {project.category && (
                <span className="px-4 py-1.5 text-xs font-bold uppercase tracking-widest border border-gray-200 dark:border-gray-800 text-black dark:text-white bg-gray-50 dark:bg-white/5">
                  {project.category.name}
                </span>
              )}
              <span className={`px-4 py-1.5 text-xs font-bold uppercase tracking-widest border ${project.projectType === 'CLIENT' ? 'border-purple-200 text-purple-700 bg-purple-50 dark:border-purple-500/30 dark:text-purple-300 dark:bg-purple-500/10' : 'border-blue-200 text-blue-700 bg-blue-50 dark:border-blue-500/30 dark:text-blue-300 dark:bg-blue-500/10'}`}>
                {projectTypeLabel}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-black dark:text-white leading-[0.9] tracking-tighter">
              {project.title}
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-4xl leading-relaxed mb-16 font-light">
            {project.description}
          </p>

          {/* Action Buttons */}
          {project.liveUrl && (
            <div className="mb-16">
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest text-sm hover:opacity-70 transition-opacity whitespace-nowrap"
              >
                Launch Live Site <ArrowUpRight className="w-5 h-5" />
              </a>
            </div>
          )}

          {/* Metadata Grid - Premium Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 py-12 border-y border-gray-200 dark:border-gray-800/50">
            <div className="md:col-span-3">
              <p className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-3">My Role</p>
              <p className="text-base font-medium text-black dark:text-white">{project.role || 'Full Stack Developer'}</p>
            </div>
            <div className="md:col-span-3">
              <p className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-3">Timeline</p>
              <p className="text-base font-medium text-black dark:text-white">
                {project.startDate ? calculateDuration(project.startDate, project.endDate) : 'Ongoing'}
              </p>
            </div>
            <div className="md:col-span-6">
              <p className="text-xs uppercase tracking-widest text-gray-400 font-bold mb-3">Technologies Used</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies?.map((tech, idx) => (
                  <span key={idx} className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-300">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Interactive Image Showcase */}
        {project.thumbnails && project.thumbnails.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-24 w-full flex flex-col gap-4"
          >
            {/* Main Active Image Display */}
            <div className="w-full relative aspect-[16/9] md:aspect-[21/9] bg-gray-100 dark:bg-[#111] overflow-hidden shadow-xl border border-gray-200 dark:border-white/5 group">
              <motion.img 
                key={activeImage}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                src={project.thumbnails[activeImage]} 
                alt={`${project.title} Preview ${activeImage + 1}`}
                className="w-full h-full object-cover"
              />
              
              {/* Optional: Add a subtle overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
              
              <div className="absolute bottom-6 left-6 text-white font-bold tracking-widest text-xs uppercase bg-black/50 px-3 py-1 backdrop-blur-sm z-10">
                View {activeImage + 1} of {project.thumbnails.length}
              </div>

              {/* Slider Arrows (visible on hover) */}
              {project.thumbnails.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImage((prev) => (prev - 1 + project.thumbnails.length) % project.thumbnails.length)}
                    className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 text-white flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black"
                    aria-label="Previous image"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveImage((prev) => (prev + 1) % project.thumbnails.length)}
                    className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 text-white flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black"
                    aria-label="Next image"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
            
            {/* Thumbnail strip removed based on user request */}
          </motion.div>
        )}

        {/* Two-Column Details Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left: Deep Dive (Markdown) */}
          <div className="lg:col-span-8">
            <h3 className="text-2xl font-black text-black dark:text-white mb-10 uppercase tracking-widest border-b border-black/10 dark:border-white/10 pb-4">
              Project Case Study
            </h3>
            
            {project.content ? (
              <div className="prose prose-lg md:prose-xl prose-gray dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 font-light prose-headings:font-black prose-headings:tracking-tight prose-a:text-blue-500 hover:prose-a:text-blue-600 prose-img:w-full prose-img:rounded-none prose-img:shadow-2xl prose-img:my-16 prose-strong:font-bold prose-strong:text-black dark:prose-strong:text-white">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {project.content}
                </ReactMarkdown>
              </div>
            ) : (
              <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed font-light">
                {project.description}
              </p>
            )}
          </div>

          {/* Right: Key Features & Links */}
          <div className="lg:col-span-4 flex flex-col gap-16">
            
            {/* Key Features */}
            {project.features && project.features.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-black dark:text-white mb-8 uppercase tracking-widest border-b border-black/10 dark:border-white/10 pb-4">
                  Key Features
                </h3>
                <ul className="flex flex-col gap-5">
                  {project.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-4 text-base text-gray-600 dark:text-gray-400 font-light">
                      <div className="mt-1 bg-black dark:bg-white text-white dark:text-black p-1 shrink-0">
                        <Check className="w-3 h-3" strokeWidth={4} />
                      </div>
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Source Code Links */}
            {(project.githubFrontendUrl || project.githubBackendUrl) && (
              <div>
                <h3 className="text-sm font-bold text-black dark:text-white mb-8 uppercase tracking-widest border-b border-black/10 dark:border-white/10 pb-4">
                  Source Code
                </h3>
                <div className="flex flex-col gap-4">
                  {project.githubFrontendUrl && (
                    <a 
                      href={project.githubFrontendUrl} 
                      target="_blank" rel="noreferrer"
                      className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-black dark:hover:text-white transition-colors p-4 border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/5"
                    >
                      <GithubIcon className="w-6 h-6" /> Client Repo <ArrowUpRight className="w-4 h-4 ml-auto opacity-50" />
                    </a>
                  )}
                  {project.githubBackendUrl && (
                    <a 
                      href={project.githubBackendUrl} 
                      target="_blank" rel="noreferrer"
                      className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-black dark:hover:text-white transition-colors p-4 border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/5"
                    >
                      <GithubIcon className="w-6 h-6" /> Server Repo <ArrowUpRight className="w-4 h-4 ml-auto opacity-50" />
                    </a>
                  )}
                </div>
              </div>
            )}
            
          </div>

        </div>

      </div>
    </main>
  );
}
