"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

const DefaultIcon = ({ className }: { className?: string }) => (
  <ExternalLink className={className} />
);

export function ContactAnimation({ socialLinks, fadeUpVariants }: { socialLinks: any; fadeUpVariants: any }) {
  return (
    <motion.div variants={fadeUpVariants} className="relative h-12 flex items-center w-full justify-center lg:justify-start group cursor-pointer mb-8">
      {/* Default text boxes */}
      <div className="absolute left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 flex items-center gap-2 pointer-events-none">
        {["C", "O", "N", "T", "A", "C", "T"].map((letter, idx) => (
          <div
            key={idx}
            style={{ transitionDelay: `${idx * 50}ms` }}
            className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-[#1A1A1A] flex items-center justify-center border border-black/10 dark:border-white/10 shadow-lg transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] opacity-100 scale-100 rotate-0 group-hover:opacity-0 group-hover:scale-50 group-hover:-rotate-90 group-hover:-translate-y-8"
          >
            <span className="text-black dark:text-white font-black text-sm">{letter}</span>
          </div>
        ))}
      </div>

      {/* Icons to reveal */}
      <div className="absolute left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 flex items-center gap-2">
        {[...Array(7)].map((_, i) => {
          const activeLinks = socialLinks?.filter((l: any) => l.isActive) || [];
          const link = activeLinks[i];

          if (link) {
            return (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                style={{ transitionDelay: `${i * 50}ms` }}
                className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-lg transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] opacity-0 scale-50 rotate-90 translate-y-8 group-hover:opacity-100 group-hover:scale-100 group-hover:rotate-0 group-hover:translate-y-0 hover:!scale-125 overflow-hidden"
              >
                {link.iconUrl ? (
                  <Image src={link.iconUrl} alt={link.platform} width={40} height={40} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-300" unoptimized />
                ) : (
                  <DefaultIcon className="w-6 h-6 text-black grayscale hover:grayscale-0 transition-all duration-300" />
                )}
              </a>
            );
          }

          // Empty placeholder for maintaining width
          return (
            <div
              key={i}
              style={{ transitionDelay: `${i * 50}ms` }}
              className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-[#1A1A1A] border border-black/10 dark:border-white/10 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] opacity-0 scale-50 rotate-90 translate-y-8 group-hover:opacity-100 group-hover:scale-100 group-hover:rotate-0 group-hover:translate-y-0 pointer-events-none"
            />
          );
        })}
      </div>
    </motion.div>
  );
}
