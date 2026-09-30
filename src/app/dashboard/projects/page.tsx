"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ProjectService } from "@/services/project.service";
import { ProjectCategoryService } from "@/services/projectCategory.service";
import { Loader2, Plus, Edit2, Trash2, ExternalLink, Code } from "lucide-react";
import { Project, CreateProjectDto } from "@/types/project";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "sonner";
import FileUpload from "@/components/FileUpload";

export default function ProjectsDashboard({ hideHeader, onNext }: { hideHeader?: boolean, onNext?: () => void }) {
  const queryClient = useQueryClient();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: () => ProjectService.getProjects(),
  });

  const { data: categoriesData } = useQuery({
    queryKey: ["project-categories"],
    queryFn: () => ProjectCategoryService.getCategories(),
  });

  const { register, handleSubmit, reset, setValue, watch, control } = useForm<CreateProjectDto>();
  
  const { fields: featureFields, append: appendFeature, remove: removeFeature } = useFieldArray({
    control,
    name: "projectFeatures" as never
  });

  const { fields: screenshotFields, append: appendScreenshot, remove: removeScreenshot } = useFieldArray({
    control,
    name: "projectScreenshots" as never
  });
  const thumbnails = watch("thumbnails");
  const currentScreenshots = watch("projectScreenshots");

  const createMutation = useMutation({
    mutationFn: (newProject: CreateProjectDto) => ProjectService.createProject(newProject),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project created successfully!");
      closeForm();
      if (onNext) onNext();
    },
    onError: () => toast.error("Failed to create project")
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateProjectDto> }) => ProjectService.updateProject(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project updated successfully!");
      closeForm();
      if (onNext) onNext();
    },
    onError: () => toast.error("Failed to update project")
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => ProjectService.deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project deleted successfully!");
      if (onNext) onNext();
    },
    onError: () => toast.error("Failed to delete project")
  });

  const openForm = (project?: Project) => {
    if (project) {
      setEditingId(project.id);
      setValue("title", project.title);
      setValue("description", project.description);
      setValue("content", project.content);
      setValue("githubFrontendUrl", project.githubFrontendUrl);
      setValue("githubBackendUrl", project.githubBackendUrl);
      setValue("liveUrl", project.liveUrl);
      setValue("videoUrl", project.videoUrl);
      setValue("technologies", project.technologies?.join(', ') as any);
      setValue("thumbnails", (project.thumbnails || []) as any);
      setValue("tags", project.tags?.join(', ') as any);
      setValue("role", project.role);
      setValue("team", project.team);
      setValue("impact", project.impact);
      setValue("startDate", project.startDate ? project.startDate.split('T')[0] : "");
      setValue("endDate", project.endDate ? project.endDate.split('T')[0] : "");
      setValue("status", project.status);
      setValue("categoryId", project.categoryId);
      setValue("projectType", project.projectType || "PERSONAL");
      setValue("featured", project.featured);
      setValue("duration", project.duration);
      setValue("statusText", project.statusText);
      setValue("overviewTitle", project.overviewTitle);
      setValue("overviewDesc", project.overviewDesc);
      setValue("projectFeatures", (project.projectFeatures || []) as any);
      setValue("projectScreenshots", (project.projectScreenshots || []) as any);
    } else {
      setEditingId(null);
      reset({
        title: "",
        description: "",
        content: "",
        githubFrontendUrl: "",
        githubBackendUrl: "",
        liveUrl: "",
        videoUrl: "",
        technologies: [],
        thumbnails: [],
        tags: [],
        role: "",
        team: "",
        impact: "",
        status: "DRAFT" as any,
        projectType: "PERSONAL" as any,
        featured: false,
        duration: "",
        statusText: "",
        overviewTitle: "",
        overviewDesc: "",
        projectFeatures: [],
        projectScreenshots: []
      });
    }
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingId(null);
    reset();
  };

  const onSubmit = (formData: CreateProjectDto) => {
    const dataToSubmit: any = {
      ...formData,
      technologies: typeof formData.technologies === 'string' 
        ? (formData.technologies as string).split(',').map(t => t.trim()).filter(Boolean)
        : formData.technologies,
      thumbnails: typeof formData.thumbnails === 'string'
        ? (formData.thumbnails as string).split(',').map(t => t.trim()).filter(Boolean)
        : formData.thumbnails,
      tags: typeof formData.tags === 'string'
        ? (formData.tags as string).split(',').map(t => t.trim()).filter(Boolean)
        : formData.tags,
    };

    const cleanObject = (obj: any): any => {
      if (Array.isArray(obj)) {
        return obj
          .map(cleanObject)
          .filter(v => v !== null && v !== "" && v !== undefined && (typeof v !== 'object' || Object.keys(v).length > 0));
      } else if (obj !== null && typeof obj === 'object') {
        const cleaned: any = {};
        Object.keys(obj).forEach(key => {
          const val = cleanObject(obj[key]);
          if (val !== null && val !== "" && val !== undefined) {
            cleaned[key] = val;
          }
        });
        return cleaned;
      }
      return obj;
    };

    const finalData = cleanObject(dataToSubmit);

    if (formData.startDate) {
      finalData.startDate = new Date(formData.startDate).toISOString();
    }
    if (formData.endDate) {
      finalData.endDate = new Date(formData.endDate).toISOString();
    }

    if (editingId) {
      updateMutation.mutate({ id: editingId, data: finalData });
    } else {
      createMutation.mutate(finalData);
    }
  };

  return (
    <div className={`space-y-6 mx-auto ${hideHeader ? 'max-w-full' : 'max-w-6xl'}`}>
      {!hideHeader && (
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-black dark:text-white">Projects</h2>
            <p className="text-gray-500 dark:text-gray-400">Manage your portfolio projects</p>
          </div>
        </div>
      )}

      {isFormOpen ? (
        <div className={`bg-white dark:bg-[#1A1C23] border border-gray-200 dark:border-white/10 rounded-2xl ${hideHeader ? 'p-0 border-0 shadow-none' : 'p-6 shadow-sm'}`}>
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
              {editingId ? "Edit Project" : "Add New Project"}
            </h3>
          </div>
          <form id="projectForm" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Title</label>
                <input {...register("title", { required: true })} className="w-full px-4 py-2 bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-blue-500" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Technologies (comma separated)</label>
                <input {...register("technologies")} placeholder="React, Next.js, Tailwind" className="w-full px-4 py-2 bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-blue-500" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Short Description</label>
              <textarea {...register("description", { required: true })} rows={2} className="w-full px-4 py-2 bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-blue-500" />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Detailed Content (Markdown/HTML)</label>
              <textarea {...register("content")} rows={5} className="w-full px-4 py-2 bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-blue-500" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">GitHub Frontend URL</label>
                <input {...register("githubFrontendUrl")} type="url" className="w-full px-4 py-2 bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-blue-500" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">GitHub Backend URL</label>
                <input {...register("githubBackendUrl")} type="url" className="w-full px-4 py-2 bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-blue-500" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Live URL</label>
                <input {...register("liveUrl")} type="url" className="w-full px-4 py-2 bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-blue-500" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Video URL</label>
                <input {...register("videoUrl")} type="url" className="w-full px-4 py-2 bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-blue-500" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Duration (e.g. 3 Months)</label>
                <input {...register("duration")} className="w-full px-4 py-2 bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-blue-500" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Status Text (e.g. Active, Completed)</label>
                <input {...register("statusText")} className="w-full px-4 py-2 bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-blue-500" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Overview Title</label>
                <input {...register("overviewTitle")} className="w-full px-4 py-2 bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-blue-500" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Overview Description</label>
                <textarea {...register("overviewDesc")} rows={2} className="w-full px-4 py-2 bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-blue-500" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Team (e.g. Solo Project)</label>
                <input {...register("team")} className="w-full px-4 py-2 bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-blue-500" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Impact (e.g. 10k+ Users)</label>
                <input {...register("impact")} className="w-full px-4 py-2 bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-blue-500" />
              </div>
            </div>
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Tags (comma separated)</label>
              <input {...register("tags")} className="w-full px-4 py-2 bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-blue-500" />
            </div>

            <div className="space-y-1">
              <FileUpload
                multiple
                label="Project Thumbnails"
                value={thumbnails || []}
                onChange={(urls) => setValue("thumbnails", urls)}
              />
            </div>

            <div className="border-t border-gray-200 dark:border-white/10 pt-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">Key Features</h4>
                <button type="button" onClick={() => appendFeature({ title: "", description: "" })} className="text-sm flex items-center gap-1 text-blue-500 hover:text-blue-600">
                  <Plus className="w-4 h-4" /> Add Feature
                </button>
              </div>
              <div className="space-y-4">
                {featureFields.map((field, index) => (
                  <div key={field.id} className="flex gap-4 items-start p-4 bg-gray-50 dark:bg-black/20 rounded-xl border border-gray-200 dark:border-white/5">
                    <div className="flex-1 space-y-3">
                      <input {...register(`projectFeatures.${index}.title` as const)} placeholder="Feature Title" className="w-full px-4 py-2 bg-white dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-lg focus:outline-none focus:border-blue-500" />
                      <input {...register(`projectFeatures.${index}.description` as const)} placeholder="Feature Description" className="w-full px-4 py-2 bg-white dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-lg focus:outline-none focus:border-blue-500" />
                    </div>
                    <button type="button" onClick={() => removeFeature(index)} className="text-red-500 p-2 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-white/10 pt-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200">Project Screenshots</h4>
                <button type="button" onClick={() => appendScreenshot({ imageUrl: "", title: "", description: "" })} className="text-sm flex items-center gap-1 text-blue-500 hover:text-blue-600">
                  <Plus className="w-4 h-4" /> Add Screenshot
                </button>
              </div>
              <div className="space-y-4">
                {screenshotFields.map((field, index) => (
                  <div key={field.id} className="flex gap-4 items-start p-4 bg-gray-50 dark:bg-black/20 rounded-xl border border-gray-200 dark:border-white/5">
                    <div className="flex-1 space-y-3">
                      <FileUpload
                        multiple={false}
                        label=""
                        value={currentScreenshots?.[index]?.imageUrl || ""}
                        onChange={(url) => setValue(`projectScreenshots.${index}.imageUrl` as const, url)}
                      />
                      <input {...register(`projectScreenshots.${index}.title` as const)} placeholder="Screenshot Title (Optional)" className="w-full px-4 py-2 bg-white dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-lg focus:outline-none focus:border-blue-500" />
                      <input {...register(`projectScreenshots.${index}.description` as const)} placeholder="Screenshot Description (Optional)" className="w-full px-4 py-2 bg-white dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-lg focus:outline-none focus:border-blue-500" />
                    </div>
                    <button type="button" onClick={() => removeScreenshot(index)} className="text-red-500 p-2 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Role</label>
                <input {...register("role")} className="w-full px-4 py-2 bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-blue-500" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                <select {...register("status")} className="w-full px-4 py-2 bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-blue-500">
                  <option value="DRAFT">DRAFT</option>
                  <option value="PUBLISHED">PUBLISHED</option>
                  <option value="ARCHIVED">ARCHIVED</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Start Date</label>
                <input {...register("startDate")} type="date" className="w-full px-4 py-2 bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-blue-500" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">End Date</label>
                <input {...register("endDate")} type="date" className="w-full px-4 py-2 bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-blue-500" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Project Type</label>
                <select {...register("projectType")} className="w-full px-4 py-2 bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-blue-500">
                  <option value="PERSONAL">Personal</option>
                  <option value="CLIENT">Production / Client / Team</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
                <select {...register("categoryId")} className="w-full px-4 py-2 bg-gray-50 dark:bg-black/50 border border-gray-200 dark:border-white/10 rounded-xl focus:outline-none focus:border-blue-500">
                  <option value="">Select Category</option>
                  {categoriesData?.data?.map((cat: any) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input {...register("featured")} type="checkbox" id="featured" className="w-4 h-4 rounded text-blue-500 focus:ring-blue-500" />
              <label htmlFor="featured" className="text-sm font-medium text-gray-700 dark:text-gray-300">Feature this project on home page</label>
            </div>
            
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 dark:border-white/10 mt-6">
              <button type="button" onClick={closeForm} className="px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5 transition-colors font-medium">
                Cancel
              </button>
              <button 
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors font-medium shadow-lg shadow-blue-500/20 disabled:opacity-50 flex items-center gap-2"
              >
                {(createMutation.isPending || updateMutation.isPending) && <Loader2 className="w-4 h-4 animate-spin" />}
                {editingId ? "Save Changes" : "Create Project"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <>
          <div className="flex justify-end">
            <button 
              onClick={() => openForm()}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition-colors font-medium shadow-sm"
            >
              <Plus className="w-5 h-5" /> Add Project
            </button>
          </div>

          <div className="bg-white dark:bg-[#1A1C23] border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm">
            {isLoading ? (
              <div className="flex justify-center items-center h-64"><Loader2 className="w-8 h-8 animate-spin text-blue-500" /></div>
            ) : (
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {data?.data?.map((project: Project, index: number) => (
                  <div key={project.id || index} className="group bg-white dark:bg-[#1A1C23] border border-gray-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 relative flex flex-col">
                    
                    {project.featured && (
                      <div className="absolute top-4 right-4 z-10">
                        <span className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md text-emerald-400 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider border border-emerald-500/20 shadow-lg">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                          Featured
                        </span>
                      </div>
                    )}
                    
                    <div className="h-52 bg-gray-100 dark:bg-black/40 relative overflow-hidden">
                      {project.thumbnails && project.thumbnails.length > 0 ? (
                        <img src={project.thumbnails[0]} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-600">
                          <svg className="w-10 h-10 mb-2 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-xs uppercase tracking-widest font-semibold">No Cover</span>
                        </div>
                      )}
                      
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-[2px]">
                        <button onClick={() => openForm(project)} className="p-3 bg-white text-gray-900 rounded-full hover:scale-110 hover:bg-blue-50 transition-all shadow-xl">
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button onClick={() => { if (confirm("Are you sure you want to delete this project?")) deleteMutation.mutate(project.id); }} className="p-3 bg-red-500 text-white rounded-full hover:scale-110 hover:bg-red-600 transition-all shadow-xl">
                            {deleteMutation.isPending && deleteMutation.variables === project.id ? <Loader2 className="w-5 h-5 animate-spin" /> : <Trash2 className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <span className={`inline-block mb-3 text-[10px] px-2.5 py-1 rounded-lg font-bold uppercase tracking-wider ${project.projectType === 'CLIENT' ? 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300' : 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300'}`}>
                            {project.projectType === 'CLIENT' ? 'Client Work' : 'Personal Project'}
                          </span>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-blue-500 transition-colors">
                            {project.title || "Untitled Project"}
                          </h3>
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-5">
                        {project.description || "No description provided for this project."}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6 mt-auto">
                        {project.technologies?.slice(0, 4).map((tech, i) => (
                          <span key={i} className="text-[11px] px-2.5 py-1 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-gray-700 dark:text-gray-300 font-medium">
                            {tech}
                          </span>
                        ))}
                        {(project.technologies?.length || 0) > 4 && (
                          <span className="text-[11px] px-2.5 py-1 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg text-gray-500 dark:text-gray-400 font-medium">
                            +{(project.technologies?.length || 0) - 4} more
                          </span>
                        )}
                      </div>
                      
                      <div className="pt-4 border-t border-gray-100 dark:border-white/10 flex items-center justify-between mt-auto">
                        <div className="flex gap-4">
                          {project.liveUrl ? (
                            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-sm font-semibold text-blue-500 hover:text-blue-600 flex items-center gap-1.5 transition-colors">
                              <ExternalLink className="w-4 h-4" /> Live Demo
                            </a>
                          ) : (
                            <span className="text-sm font-medium text-gray-400 dark:text-gray-600 flex items-center gap-1.5 cursor-not-allowed">
                              <ExternalLink className="w-4 h-4" /> No Demo
                            </span>
                          )}
                          
                          {project.githubFrontendUrl || project.githubBackendUrl ? (
                            <a href={project.githubFrontendUrl || project.githubBackendUrl} target="_blank" rel="noreferrer" className="text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white flex items-center gap-1.5 transition-colors">
                              <Code className="w-4 h-4" /> Source
                            </a>
                          ) : (
                            <span className="text-sm font-medium text-gray-400 dark:text-gray-600 flex items-center gap-1.5 cursor-not-allowed">
                              <Code className="w-4 h-4" /> No Code
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {(!data?.data || data.data.length === 0) && (
                  <div className="col-span-full py-16 flex flex-col items-center justify-center bg-gray-50 dark:bg-white/5 rounded-3xl border border-dashed border-gray-200 dark:border-white/20">
                    <div className="w-16 h-16 bg-white dark:bg-white/10 rounded-full flex items-center justify-center mb-4 shadow-sm">
                      <Plus className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-lg font-medium text-gray-600 dark:text-gray-300">No projects found</p>
                    <p className="text-sm text-gray-500 mt-1">Click the "Add Project" button to create your first portfolio project.</p>
                  </div>
                )}
              </div>

            )}
          </div>
        </>
      )}
    </div>
  );
}
