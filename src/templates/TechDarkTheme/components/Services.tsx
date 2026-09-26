"use client";

import { useQuery } from "@tanstack/react-query";
import { ServicesService } from "@/services/service.service";
import { motion } from "framer-motion";
import { Code2, Database, Layout, Smartphone, Globe, Cloud, Terminal, Cpu } from "lucide-react";

// Helper to map string icon names to Lucide components
const IconMap: Record<string, any> = {
  Code2, Database, Layout, Smartphone, Globe, Cloud, Terminal, Cpu
};

export default function Services() {
  const { data: servicesData, isLoading } = useQuery({
    queryKey: ['services'],
    queryFn: () => ServicesService.getServices(),
  });

  if (isLoading) {
    return (
      <section id="services" className="w-full bg-transparent py-24 flex justify-center items-center min-h-[30vh]">
        <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </section>
    );
  }

  const services = servicesData?.data || [];
  if (services.length === 0) return null;

  return (
    <section id="services" className="relative z-10 w-full bg-gray-50 dark:bg-transparent py-24 lg:py-32 overflow-hidden">
      <div className="w-full px-6 sm:px-10 lg:px-16 z-10 relative">
        <div className="max-w-[1400px] mx-auto w-full">
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-16 lg:mb-20">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-[2px] h-4 bg-primary" />
                <span className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">What I Do</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-4 text-black dark:text-white">
                Specialized <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-black dark:from-gray-300 dark:to-white">Services</span>
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed max-w-sm lg:text-right font-medium">
              Delivering high-quality solutions tailored to your business needs, from concept to deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => {
              const Icon = service.icon && IconMap[service.icon] ? IconMap[service.icon] : Code2;
              
              return (
                <motion.div 
                  key={service.id}
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
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
