"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/types/project';
import { ExternalLink, CheckCircle2, Play, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.5 5.5 0 0 0-1.5-3.8 5.5 5.5 0 0 0-.1-3.8s-1.2-.4-3.9 1.4a13.3 13.3 0 0 0-7 0C6.2 1.6 5 2 5 2a5.5 5.5 0 0 0-.1 3.8A5.5 5.5 0 0 0 3 9.6c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path>
    <path d="M9 18c-4.5 1.5-5-2.5-7-3"></path>
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

interface ProjectDetailsProps {
  project: Project;
  onClose?: () => void;
}

export default function ProjectDetails({ project, onClose }: ProjectDetailsProps) {
  const [visibleCount, setVisibleCount] = useState(4);

  const handleShowMore = () => {
    if (project.projectScreenshots && visibleCount >= project.projectScreenshots.length) {
      setVisibleCount(4); // Hide
    } else {
      setVisibleCount(prev => prev + 4);
    }
  };

  const isAllVisible = project.projectScreenshots ? visibleCount >= project.projectScreenshots.length : true;

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="w-full bg-white dark:bg-[#050505] text-gray-900 dark:text-[#e0e0e0] min-h-screen font-sans selection:bg-white/30 pb-12">
      
      {/* 1. Main Thumbnail Showcase (At the top) */}
      {project.thumbnails?.[0] && (
        <section className="w-full mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full relative shadow-2xl bg-gray-100 dark:bg-[#111]"
          >
            <img 
              src={project.thumbnails[0]} 
              alt={project.title} 
              className="w-full h-auto object-cover object-top"
            />
          </motion.div>
        </section>
      )}

      {/* 2. Hero Section (Title & Overview) */}
      <section className="px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-start text-left mb-16">
        
        {/* Badges */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center justify-start gap-4 mb-8 mt-8"
        >
          <span className="px-5 py-2 text-xs font-bold uppercase tracking-widest bg-gray-200 dark:bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-none">
            {project.category?.name || 'Category'}
          </span>
          <span className="px-5 py-2 text-xs font-bold uppercase tracking-widest bg-gray-200 dark:bg-black/10 dark:bg-white/10 border border-black/20 dark:border-white/20 rounded-none text-black dark:text-white">
            {project.projectType === 'CLIENT' ? 'Client Project' : 'Personal Project'}
          </span>
        </motion.div>
        
        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-[6rem] font-black tracking-tighter mb-8 leading-[1.1] text-black dark:text-white"
        >
          {project.overviewTitle || project.title}
        </motion.h1>
        
        {/* Overview Description */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-4xl leading-relaxed font-light mb-12"
        >
          {project.overviewDesc || project.description}
        </motion.p>

        {/* Primary Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-start gap-4"
        >
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="group relative overflow-hidden px-6 py-3 bg-white text-black border border-black/10 dark:border-white/20 rounded-none font-bold flex items-center justify-center">
              <span className="absolute inset-y-0 left-0 w-0 bg-black transition-all duration-500 ease-out group-hover:w-full z-0" />
              <span className="relative z-10 group-hover:text-white transition-colors duration-500 flex items-center gap-2 text-sm uppercase tracking-wider">
                <ExternalLink className="w-4 h-4" /> Live Site
              </span>
            </a>
          )}
          {project.githubFrontendUrl && (
            <a href={project.githubFrontendUrl} target="_blank" rel="noreferrer" className="group relative overflow-hidden px-6 py-3 bg-transparent text-black dark:text-white border border-white rounded-none font-bold flex items-center justify-center hover:bg-gray-200 dark:bg-black/5 dark:bg-white/5 transition-colors">
              <span className="relative z-10 flex items-center gap-2 text-sm uppercase tracking-wider">
                <GithubIcon className="w-4 h-4" /> Frontend
              </span>
            </a>
          )}
          {project.githubBackendUrl && (
            <a href={project.githubBackendUrl} target="_blank" rel="noreferrer" className="group relative overflow-hidden px-6 py-3 bg-transparent text-black dark:text-white border border-white rounded-none font-bold flex items-center justify-center hover:bg-gray-200 dark:bg-black/5 dark:bg-white/5 transition-colors">
              <span className="relative z-10 flex items-center gap-2 text-sm uppercase tracking-wider">
                <GithubIcon className="w-4 h-4" /> Backend
              </span>
            </a>
          )}
          {project.videoUrl && (
            <a href={project.videoUrl} target="_blank" rel="noreferrer" className="group relative overflow-hidden px-6 py-3 bg-red-600/10 text-red-500 border border-red-500/50 rounded-none font-bold flex items-center justify-center hover:bg-red-600 hover:text-black dark:text-white transition-colors duration-500">
              <span className="relative z-10 flex items-center gap-2 text-sm uppercase tracking-wider">
                <YoutubeIcon className="w-4 h-4" /> Watch Video
              </span>
            </a>
          )}
        </motion.div>
      </section>

      {/* 3. Meta Info (Role, Duration, Impact, etc.) */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 py-12 border-y border-black/10 dark:border-white/10">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Role</h4>
            <p className="text-lg font-medium text-black dark:text-white">{project.role || 'N/A'}</p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Team</h4>
            <p className="text-lg font-medium text-black dark:text-white">{project.team || 'Solo Project'}</p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Impact</h4>
            <p className="text-lg font-medium text-black dark:text-white">{project.impact || 'TBD'}</p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Timeline</h4>
            <p className="text-lg font-medium text-black dark:text-white">
              {formatDate(project.startDate)} - {formatDate(project.endDate)}
            </p>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Status</h4>
            <p className="text-lg font-medium text-black dark:text-white">{project.statusText || project.status || 'Completed'}</p>
          </div>
        </div>
      </section>

      {/* 4. Markdown Content */}
      {project.content && (
        <section className="max-w-5xl mx-auto px-6 lg:px-8 mb-32">
          <div className="prose dark:prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:text-blue-700 dark:hover:prose-a:text-blue-300 prose-img:rounded-xl">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {project.content}
            </ReactMarkdown>
          </div>
        </section>
      )}

      {/* 5. Technologies */}
      {project.technologies?.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-24">
          <h2 className="text-3xl font-bold tracking-tight mb-8 text-black dark:text-white">Technologies</h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech, i) => (
              <div key={i} className="px-5 py-2.5 bg-gray-100 dark:bg-[#111] border border-black/10 dark:border-white/10 rounded-none text-sm font-medium text-gray-300 hover:border-white/40 hover:text-black dark:text-white transition-colors cursor-default">
                {tech}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. Core Features */}
      {project.projectFeatures && project.projectFeatures.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-32">
          <h2 className="text-3xl font-bold tracking-tight mb-8 text-black dark:text-white">Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.projectFeatures.map((feature, idx) => (
              <div key={idx} className="p-8 bg-gray-50 dark:bg-[#0a0a0a] border border-black/5 dark:border-white/5 rounded-none hover:bg-gray-100 dark:bg-[#111] hover:border-black/20 dark:border-white/20 transition-all">
                <div className="w-12 h-12 bg-gray-200 dark:bg-black/5 dark:bg-white/5 rounded-none flex items-center justify-center mb-6 border border-black/10 dark:border-white/10">
                  <CheckCircle2 className="w-6 h-6 text-black dark:text-white" />
                </div>
                <h3 className="text-xl font-bold text-black dark:text-white mb-3">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed font-light">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. Screenshots Gallery (Card Design) */}
      {project.projectScreenshots && project.projectScreenshots.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-black dark:text-white">Gallery & Interface</h2>
            <p className="text-gray-600 dark:text-gray-400 text-xl">A deeper look into the platform.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {project.projectScreenshots.slice(0, visibleCount).map((shot, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={idx} 
                  className="flex flex-col bg-gray-50 dark:bg-[#0a0a0a] border border-black/5 dark:border-white/5 rounded-none overflow-hidden hover:border-black/20 dark:border-white/20 transition-all group"
                >
                  <div className="relative w-full overflow-hidden bg-gray-200 dark:bg-black">
                    <img 
                      src={shot.imageUrl} 
                      alt={shot.title || 'Screenshot'} 
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    />
                  </div>
                  {(shot.title || shot.description) && (
                    <div className="p-8 flex flex-col justify-center flex-grow">
                      {shot.title && <h3 className="text-2xl font-bold text-black dark:text-white mb-3">{shot.title}</h3>}
                      {shot.description && <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed font-light">{shot.description}</p>}
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Show More / Hide Button */}
          {project.projectScreenshots.length > 4 && (
            <div className="mt-12 flex justify-center">
              <button 
                onClick={handleShowMore}
                className="group relative overflow-hidden px-8 py-3 bg-transparent text-black dark:text-white border border-black/20 dark:border-white/20 rounded-none font-bold flex items-center justify-center transition-all duration-300"
              >
                <span className="absolute inset-y-0 left-0 w-0 bg-black dark:bg-white transition-all duration-500 ease-out group-hover:w-full z-0" />
                <span className="relative z-10 flex items-center gap-2 text-sm uppercase tracking-wider group-hover:text-white dark:group-hover:text-black transition-colors duration-500">
                  {isAllVisible ? (
                    <>Hide <ChevronUp className="w-4 h-4" /></>
                  ) : (
                    <>Show More <ChevronDown className="w-4 h-4" /></>
                  )}
                </span>
              </button>
            </div>
          )}
        </section>
      )}

      {/* 7. Bottom CTA */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-16 text-center">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 text-black dark:text-white">Ready to start?</h2>
        <Link 
          href="/#contact" 
          onClick={() => {
            if (onClose) onClose();
          }}
          className="group relative overflow-hidden inline-flex items-center justify-center px-10 py-5 bg-white text-black border border-black/10 dark:border-white/20 rounded-none font-bold text-lg"
        >
          <span className="absolute inset-y-0 left-0 w-0 bg-black transition-all duration-500 ease-out group-hover:w-full z-0" />
          <span className="relative z-10 group-hover:text-white transition-colors duration-500 flex items-center gap-3">
            Let's talk <Play className="w-5 h-5 fill-current" />
          </span>
        </Link>
      </section>

    </div>
  );
}
