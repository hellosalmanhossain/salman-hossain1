"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { ResumeModal } from "./ResumeModal";

interface ResumeButtonProps {
  url: string;
  className?: string;
  children?: React.ReactNode;
}

export function ResumeButton({ url, className = "", children }: ResumeButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {children ? (
        <button onClick={() => setIsOpen(true)} className={className}>
          {children}
        </button>
      ) : (
        <button 
          onClick={() => setIsOpen(true)} 
          className={`cursor-pointer group relative overflow-hidden w-full sm:w-auto px-8 py-4 bg-transparent border border-black/20 dark:border-white/20 text-black dark:text-white font-semibold flex items-center justify-center transition-colors duration-300 ${className}`}
        >
          <span className="absolute inset-y-0 left-0 w-0 bg-black dark:bg-white transition-all duration-[400ms] ease-out group-hover:w-full z-0" />
          <span className="relative z-10 flex items-center gap-3 group-hover:text-white dark:group-hover:text-black transition-colors duration-300">
            View Resume
            <ExternalLink className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <ResumeModal url={url} onClose={() => setIsOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
