"use client";

import { useQuery } from "@tanstack/react-query";
import { getAboutSections } from "@/services/about.service";
import { SocialLinksService } from "@/services/socialLinks.service";
import { Heart, MoveRight, Mail, MapPin, ExternalLink } from "lucide-react";
import Link from "next/link";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.5 5.5 0 0 0-1.5-3.8 5.5 5.5 0 0 0-.1-3.8s-1.2-.4-3.9 1.4a13.3 13.3 0 0 0-7 0C6.2 1.6 5 2 5 2a5.5 5.5 0 0 0-.1 3.8A5.5 5.5 0 0 0 3 9.6c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path>
    <path d="M9 18c-4.5 1.5-5-2.5-7-3"></path>
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const SocialIcon = ({ platform }: { platform: string }) => {
  const normalized = platform.toLowerCase();
  if (normalized.includes('github')) return <GithubIcon className="w-5 h-5" />;
  if (normalized.includes('linkedin')) return <LinkedinIcon className="w-5 h-5" />;
  if (normalized.includes('twitter') || normalized.includes('x')) return <TwitterIcon className="w-5 h-5" />;
  return <ExternalLink className="w-5 h-5" />;
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const { data: aboutData } = useQuery({
    queryKey: ['aboutSections'],
    queryFn: () => getAboutSections(),
  });
  
  const { data: socialLinksData } = useQuery({
    queryKey: ['socialLinks'],
    queryFn: () => SocialLinksService.getSocialLinks(),
  });

  const about = aboutData?.data?.[0];
  const socials = socialLinksData?.data || [];

  return (
    <footer className="w-full relative overflow-hidden bg-gray-50/50 dark:bg-[#0A0A0A]/50 backdrop-blur-sm text-black dark:text-white transition-colors duration-300 z-10 pt-20 lg:pt-32 pb-24 md:pb-10 border-t border-black/5 dark:border-white/5">
      
      {/* Gigantic Background Text Watermark */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-full text-center pointer-events-none opacity-[0.03] dark:opacity-[0.02]">
        <h1 className="text-[15vw] font-black tracking-tighter leading-none whitespace-nowrap select-none">
          SALMAN
        </h1>
      </div>

      <div className="w-full px-6 sm:px-10 lg:px-16 z-10 relative">
        <div className="max-w-[1400px] mx-auto w-full">
          
          {/* Top CTA Area */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 mb-20 lg:mb-32">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter mb-4 lg:mb-6">
                Let's build something <span className="text-primary opacity-90">amazing</span> together.
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-sm md:text-base max-w-md font-medium">
                Available for new opportunities. Have a project in mind or just want to say hi? Let's talk.
              </p>
            </div>
            
            {about?.email && (
              <a 
                href={`mailto:${about.email}`}
                className="group relative overflow-hidden px-10 py-5 bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest text-sm rounded-2xl flex items-center gap-4 transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 shrink-0"
              >
                <span className="absolute inset-y-0 left-0 w-0 bg-primary transition-all duration-500 ease-out group-hover:w-full z-0" />
                <span className="relative z-10 flex items-center gap-3 group-hover:text-white transition-colors duration-500">
                  <Mail className="w-5 h-5" />
                  Say Hello
                  <MoveRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
                </span>
              </a>
            )}
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent mb-16 lg:mb-20" />

          {/* Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16 lg:mb-24">
            
            {/* Brand/Bio */}
            <div className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col items-start">
              <h3 className="text-2xl font-black tracking-tighter mb-6">{about?.name || "Portfolio"}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6 font-medium">
                {about?.shortBio || "A passionate software engineer focused on creating beautiful, responsive, and highly functional web applications."}
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-col">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-6">Explore</h4>
              <nav className="flex flex-col gap-4">
                {['Home', 'Projects', 'Experience', 'Skills', 'About'].map(link => (
                  <Link 
                    key={link} 
                    href={`#${link.toLowerCase()}`}
                    className="text-sm font-semibold text-gray-800 dark:text-gray-200 hover:text-primary transition-colors w-fit relative group"
                  >
                    {link}
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
                  </Link>
                ))}
              </nav>
            </div>

            {/* Socials */}
            <div className="flex flex-col">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-6">Connect</h4>
              <div className="flex flex-col gap-4">
                {socials.length > 0 ? socials.filter((s: any) => s.isActive).map((social: any) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-gray-800 dark:text-gray-200 hover:text-primary transition-colors flex items-center gap-3 group w-fit"
                  >
                    <span className="p-2 rounded-full bg-black/5 dark:bg-white/5 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      <SocialIcon platform={social.platform} />
                    </span>
                    {social.platform}
                  </a>
                )) : (
                  <p className="text-sm text-gray-500">No social links yet.</p>
                )}
              </div>
            </div>

            {/* Contact */}
            <div className="flex flex-col">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-6">Contact</h4>
              <div className="flex flex-col gap-6">
                {about?.email && (
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                    <a href={`mailto:${about.email}`} className="text-sm font-semibold text-gray-800 dark:text-gray-200 hover:text-primary transition-colors break-all">
                      {about.email}
                    </a>
                  </div>
                )}
                {about?.location && (
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                      {about.location}
                    </span>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-black/10 dark:border-white/10">
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400">
              © {currentYear} {about?.name || "Portfolio"}. All rights reserved.
            </p>
            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 flex items-center gap-1">
              Built with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 mx-1 animate-pulse" /> using Next.js & Tailwind
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
