"use client";

import { useQuery } from "@tanstack/react-query";
import { ServicesService } from "@/services/service.service";
import { ServiceCard } from "./ServiceCard";

export default function ServicesSection() {
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
            {services.map((service: any, index: number) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
