"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ResumeModal } from "./ResumeModal";

interface ResumeButtonProps {
  url: string;
  children: React.ReactNode;
  className?: string;
}

export function ResumeButton({ url, children, className }: ResumeButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className={className}>
        {children}
      </button>

      <AnimatePresence>
        {isOpen && (
          <ResumeModal url={url} onClose={() => setIsOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
