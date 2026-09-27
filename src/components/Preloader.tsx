"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onLoadingComplete: () => void;
  isLoading: boolean;
}

export default function Preloader({ onLoadingComplete, isLoading }: PreloaderProps) {
  const [show, setShow] = useState(true);
  const [videoEnded, setVideoEnded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasSeen = sessionStorage.getItem("hasSeenPreloader");
      if (hasSeen) {
        setShow(false);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasSeen = sessionStorage.getItem("hasSeenPreloader");
      if (hasSeen) {
        if (!isLoading) {
          onLoadingComplete();
        }
        return;
      }
    }

    if (show && !isLoading && videoEnded) {
      sessionStorage.setItem("hasSeenPreloader", "true");
      setShow(false);
      onLoadingComplete();
    }
  }, [isLoading, videoEnded, show, onLoadingComplete]);

  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
        >
          <div className="w-full max-w-md aspect-video relative flex flex-col items-center justify-center">
            <video
              src="/loading-video.mp4"
              autoPlay
              muted
              playsInline
              onEnded={() => setVideoEnded(true)}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="mt-8 flex flex-col items-center">
            <div className="w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-emerald-400"
                initial={{ width: "0%" }}
                animate={{ width: isLoading ? "60%" : "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </div>
            <p className="mt-4 text-sm text-gray-400 font-medium animate-pulse tracking-widest uppercase">
              {isLoading ? "Loading System..." : "System Ready"}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
