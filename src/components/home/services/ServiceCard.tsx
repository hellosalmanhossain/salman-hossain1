"use client";

import { motion } from "framer-motion";
import { Code2, Database, Layout, Smartphone, Globe, Cloud, Terminal, Cpu } from "lucide-react";

// Helper to map string icon names to Lucide components
const IconMap: Record<string, any> = {
  Code2, Database, Layout, Smartphone, Globe, Cloud, Terminal, Cpu
};

export function ServiceCard({ service, index }: { service: any; index: number }) {
  const Icon = service.icon && IconMap[service.icon] ? IconMap[service.icon] : Code2;
  
  return (
    <motion.div 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1], delay: index * 0.1 }
        }
      }}
      className="group relative bg-white dark:bg-[#070707]/80 backdrop-blur-sm border border-black/5 dark:border-white/5 rounded-2xl p-8 hover:border-black/20 dark:hover:border-white/20 transition-all duration-500 overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-16 -mt-16 transition-transform duration-500 group-hover:scale-150" />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="w-14 h-14 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300 text-gray-700 dark:text-gray-300">
          <Icon className="w-6 h-6" />
        </div>
        
        <h3 className="text-xl font-bold text-black dark:text-white mb-4 tracking-tight group-hover:text-primary transition-colors duration-300">{service.title}</h3>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
          {service.description}
        </p>
      </div>
    </motion.div>
  );
}
