"use client";

import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import { useState } from "react";
import { ContactService } from "@/services/contact.service";

export function ContactForm({ itemVariants }: { itemVariants: any; }) {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      await ContactService.sendMessage({ ...formData, status: "UNREAD" as any });
      setSubmitStatus({ type: 'success', message: "Your message has been sent successfully!" });
      setFormData({ name: "", email: "", subject: "", message: "" });
      
      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus({ type: null, message: "" }), 5000);
    } catch (error) {
      setSubmitStatus({ type: 'error', message: "Failed to send message. Please try again later." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div variants={itemVariants} className="lg:col-span-7">
      <div className="bg-black/5 dark:bg-white/[0.03] backdrop-blur-xl border border-black/10 dark:border-white/10 p-8 sm:p-12 shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] h-full relative overflow-hidden group/form">
        
        {/* Glossy Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/5 dark:from-white/10 via-transparent to-transparent opacity-50 pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-10 pb-6 border-b border-black/10 dark:border-white/10">
            <Send className="w-5 h-5 text-black dark:text-white" />
            <h3 className="text-xl font-bold text-black dark:text-white">Send Me a Message</h3>
          </div>

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            
            {submitStatus.type === 'success' && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 px-4 py-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <p className="text-sm font-medium">{submitStatus.message}</p>
              </div>
            )}

            {submitStatus.type === 'error' && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 flex items-center gap-2">
                <p className="text-sm font-medium">{submitStatus.message}</p>
              </div>
            )}
            
            <div className="flex flex-col gap-2">
              <input 
                type="text" 
                id="name" 
                required
                value={formData.name}
                onChange={handleChange}
                disabled={isSubmitting}
                placeholder="Your Name" 
                className="px-6 py-4 bg-transparent border border-black/20 dark:border-white/20 focus:outline-none focus:border-black dark:focus:border-white text-black dark:text-white transition-all placeholder:text-gray-500 dark:placeholder:text-gray-600 rounded-none w-full disabled:opacity-50"
              />
            </div>

            <div className="flex flex-col gap-2">
              <input 
                type="email" 
                id="email" 
                required
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
                placeholder="Your Email" 
                className="px-6 py-4 bg-transparent border border-black/20 dark:border-white/20 focus:outline-none focus:border-black dark:focus:border-white text-black dark:text-white transition-all placeholder:text-gray-500 dark:placeholder:text-gray-600 rounded-none w-full disabled:opacity-50"
              />
            </div>

            <div className="flex flex-col gap-2">
              <input 
                type="text" 
                id="subject" 
                required
                value={formData.subject}
                onChange={handleChange}
                disabled={isSubmitting}
                placeholder="Subject" 
                className="px-6 py-4 bg-transparent border border-black/20 dark:border-white/20 focus:outline-none focus:border-black dark:focus:border-white text-black dark:text-white transition-all placeholder:text-gray-500 dark:placeholder:text-gray-600 rounded-none w-full disabled:opacity-50"
              />
            </div>

            <div className="flex flex-col gap-2">
              <textarea 
                id="message" 
                rows={5}
                required
                value={formData.message}
                onChange={handleChange}
                disabled={isSubmitting}
                placeholder="Your Message..." 
                className="px-6 py-4 bg-transparent border border-black/20 dark:border-white/20 focus:outline-none focus:border-black dark:focus:border-white text-black dark:text-white transition-all resize-none placeholder:text-gray-500 dark:placeholder:text-gray-600 rounded-none w-full disabled:opacity-50"
              />
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="group relative overflow-hidden px-8 py-5 mt-4 bg-black dark:bg-white text-white dark:text-black font-bold flex items-center justify-center border border-black/20 dark:border-white/20 transition-all duration-500 w-full disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {!isSubmitting && <span className="absolute inset-y-0 left-0 w-0 bg-gray-800 dark:bg-black transition-all duration-500 ease-out group-hover:w-full z-0" />}
              <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-500 tracking-wide uppercase text-sm">
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </button>

          </form>
        </div>
      </div>
    </motion.div>
  );
}
