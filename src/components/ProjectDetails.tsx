import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '@/types/project';
import { ExternalLink, CheckCircle2, Play } from 'lucide-react';
import Link from 'next/link';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.5 5.5 0 0 0-1.5-3.8 5.5 5.5 0 0 0-.1-3.8s-1.2-.4-3.9 1.4a13.3 13.3 0 0 0-7 0C6.2 1.6 5 2 5 2a5.5 5.5 0 0 0-.1 3.8A5.5 5.5 0 0 0 3 9.6c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path>
    <path d="M9 18c-4.5 1.5-5-2.5-7-3"></path>
  </svg>
);

interface ProjectDetailsProps {
  project: Project;
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  return (
    <div className="w-full bg-[#050505] text-[#e0e0e0] min-h-screen font-sans selection:bg-white/30">
      
      {/* 1. Hero Section */}
      <section className="pt-24 pb-16 px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        
        {/* Badges */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-8"
        >
          <span className="px-5 py-2 text-xs font-bold uppercase tracking-widest bg-white/5 border border-white/10 rounded-none">
            {project.category?.name || 'Category'}
          </span>
          <span className="px-5 py-2 text-xs font-bold uppercase tracking-widest bg-white/10 border border-white/20 rounded-none text-white">
            {project.projectType === 'CLIENT' ? 'Client Project' : 'Personal Project'}
          </span>
        </motion.div>
        
        {/* Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-8xl lg:text-[7rem] font-black tracking-tighter mb-8 leading-[0.9] text-white"
        >
          {project.title}
        </motion.h1>
        
        {/* Description */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed font-light mb-12"
        >
          {project.description}
        </motion.p>

        {/* Primary Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="group relative overflow-hidden px-8 py-4 bg-white text-black border border-white rounded-none font-bold flex items-center justify-center">
              <span className="absolute inset-0 w-full h-full bg-black -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
              <span className="relative z-10 group-hover:text-white transition-colors duration-500 flex items-center gap-3">
                <ExternalLink className="w-5 h-5" /> Visit Live Site
              </span>
            </a>
          )}
          {project.githubFrontendUrl && (
            <a href={project.githubFrontendUrl} target="_blank" rel="noreferrer" className="group relative overflow-hidden px-8 py-4 bg-transparent text-white border border-white rounded-none font-bold flex items-center justify-center">
              <span className="absolute inset-0 w-full h-full bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
              <span className="relative z-10 group-hover:text-black transition-colors duration-500 flex items-center gap-3">
                <GithubIcon className="w-5 h-5" /> View Source
              </span>
            </a>
          )}
        </motion.div>
      </section>

      {/* 2. Main Thumbnail Showcase */}
      {project.thumbnails?.[0] && (
        <section className="px-4 md:px-8 max-w-[100rem] mx-auto mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="w-full rounded-[2rem] overflow-hidden bg-[#111] border border-white/5 relative shadow-2xl"
          >
            <img 
              src={project.thumbnails[0]} 
              alt={project.title} 
              className="w-full h-auto object-cover"
            />
          </motion.div>
        </section>
      )}

      {/* 3. Meta Info & Tech Stack */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16 border-y border-white/10">
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Role</h4>
            <p className="text-xl font-medium text-white">{project.role || 'N/A'}</p>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Duration</h4>
            <p className="text-xl font-medium text-white">{project.duration || 'N/A'}</p>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Status</h4>
            <p className="text-xl font-medium text-white">{project.statusText || project.status || 'Completed'}</p>
          </div>
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Category</h4>
            <p className="text-xl font-medium text-white">{project.category?.name || 'General'}</p>
          </div>
        </div>

        {/* Tech Stack Chips */}
        {project.technologies?.length > 0 && (
          <div className="mt-16 text-center">
            <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-8">Technology Stack</h4>
            <div className="flex flex-wrap justify-center gap-4">
              {project.technologies.map((tech, i) => (
                <div key={i} className="px-6 py-3 bg-[#111] border border-white/10 rounded-none text-base font-medium text-gray-300 hover:border-white/40 hover:text-white transition-colors cursor-default">
                  {tech}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 4. Core Features */}
      {project.projectFeatures && project.projectFeatures.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">Core Features</h2>
            <p className="text-gray-400 text-xl">The building blocks of {project.title}.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.projectFeatures.map((feature, idx) => (
              <div key={idx} className="p-8 bg-[#0a0a0a] border border-white/5 rounded-none hover:bg-[#111] hover:border-white/20 transition-all">
                <div className="w-12 h-12 bg-white/5 rounded-none flex items-center justify-center mb-6 border border-white/10">
                  <CheckCircle2 className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed font-light">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. Screenshots Gallery (Card Design) */}
      {project.projectScreenshots && project.projectScreenshots.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 lg:px-8 mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-white">Gallery & Interface</h2>
            <p className="text-gray-400 text-xl">A deeper look into the platform.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {project.projectScreenshots.map((shot, idx) => (
              <div key={idx} className="flex flex-col bg-[#0a0a0a] border border-white/5 rounded-none overflow-hidden hover:border-white/20 transition-all group">
                <div className="relative w-full overflow-hidden bg-black">
                  <img 
                    src={shot.imageUrl} 
                    alt={shot.title || 'Screenshot'} 
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out opacity-90 group-hover:opacity-100"
                  />
                </div>
                {(shot.title || shot.description) && (
                  <div className="p-8 flex flex-col justify-center flex-grow">
                    {shot.title && <h3 className="text-2xl font-bold text-white mb-3">{shot.title}</h3>}
                    {shot.description && <p className="text-gray-400 text-base leading-relaxed font-light">{shot.description}</p>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. Bottom CTA */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-32 text-center">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 text-white">Ready to start?</h2>
        <a href="/#contact" className="group relative overflow-hidden inline-flex items-center justify-center px-10 py-5 bg-white text-black border border-white rounded-none font-bold text-lg">
          <span className="absolute inset-0 w-full h-full bg-black -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
          <span className="relative z-10 group-hover:text-white transition-colors duration-500 flex items-center gap-3">
            Let's talk <Play className="w-5 h-5 fill-current" />
          </span>
        </a>
      </section>

    </div>
  );
}
