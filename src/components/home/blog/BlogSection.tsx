"use client";

import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { BlogService } from "@/services/blog.service";
import { BlogCard } from "./BlogCard";

export default function BlogSection() {
  const { data: blogsData } = useQuery({
    queryKey: ['blogs'],
    queryFn: () => BlogService.getBlogs(),
  });

  const posts = blogsData?.data || [];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section id="blog" className="w-full bg-transparent py-20 relative z-10 overflow-x-hidden">
      <div className="w-full px-6 sm:px-10 lg:px-16 z-10 relative">
        <div className="max-w-[1400px] mx-auto w-full">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white">
              Recent Articles
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full" />
          </div>
          <a href="#" className="flex items-center gap-2 text-sm font-semibold text-blue-500 hover:text-blue-600 transition-colors group">
            View All Posts
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {posts.map((post: any) => (
            <BlogCard key={post.id} post={post} itemVariants={itemVariants} />
          ))}
        </motion.div>

        </div>
      </div>
    </section>
  );
}
