"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock } from "lucide-react";

export function BlogCard({ post, itemVariants }: { post: any; itemVariants: any; }) {
  return (
    <motion.div 
      variants={itemVariants}
      className="bg-white/60 dark:bg-[#1A1C23]/60 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-gray-200 dark:border-white/5 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer flex flex-col"
    >
      <div className="flex items-center justify-between mb-6">
        <span className="px-3 py-1 text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-cyan-400 rounded-full">
          Blog
        </span>
        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
          <Clock className="w-3.5 h-3.5" />
          <span>5 min read</span>
        </div>
      </div>

      <h3 className="text-xl font-bold text-black dark:text-white mb-3 group-hover:text-blue-500 dark:group-hover:text-cyan-400 transition-colors">
        {post.title}
      </h3>
      
      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-1">
        {post.content.substring(0, 100)}...
      </p>

      <div className="flex items-center justify-between mt-auto pt-6 border-t border-gray-100 dark:border-white/5">
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
          {new Date(post.createdAt).toLocaleDateString()}
        </span>
        <span className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-white transition-colors">
          <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </motion.div>
  );
}
