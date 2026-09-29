"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ProjectService } from "@/services/project.service";
import { Project } from "@/types/project";
import ProjectDetails from "@/components/ProjectDetails";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ProjectPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        // Note: ProjectService.getProjectBySlug should be implemented on the backend
        // If not, we fetch all and find by slug as fallback
        try {
          const res = await ProjectService.getProjectBySlug(slug);
          if (res.data) setProject(res.data);
        } catch (err) {
          // Fallback to fetch all
          const allRes = await ProjectService.getProjects();
          const found = allRes.data?.find((p) => p.slug === slug);
          if (found) setProject(found);
          else setError("Project not found");
        }
      } catch (err) {
        setError("Failed to load project");
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-black flex flex-col items-center justify-center text-center p-6">
        <h1 className="text-3xl font-bold mb-4">{error || "Project not found"}</h1>
        <Link href="/" className="px-6 py-2 bg-primary text-white font-bold rounded-lg uppercase tracking-wider">
          Go Back Home
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-white dark:bg-[#0a0a0a]"
    >
      <div className="fixed top-0 left-0 w-full p-4 md:p-6 z-50 pointer-events-none">
        <Link 
          href="/#projects" 
          className="pointer-events-auto inline-flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-black/80 backdrop-blur border border-black/10 dark:border-white/10 rounded-full text-sm font-bold uppercase tracking-wider hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>
      </div>
      <ProjectDetails project={project} />
    </motion.div>
  );
}
