"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  User, 
  Code, 
  Briefcase, 
  FolderGit2, 
  FileText, 
  Mail,
  Menu,
  X,
  Moon,
  Sun,
  Layers
} from "lucide-react";
import Link from "next/link";
import { ResumeButton } from "@/components/shared/ResumeButton";
import { useTheme } from "next-themes";
import { useQuery } from "@tanstack/react-query";
import { HeroSectionService } from "@/services/heroSection.service";
import { SeoSettingService } from "@/services/seoSetting.service";
import { SocialLinksService } from "@/services/socialLinks.service";
import { usePathname } from "next/navigation";

const GithubIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("#home");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const { data: heroData } = useQuery({
    queryKey: ["hero"],
    queryFn: () => HeroSectionService.getHeroSection(),
  });

  const { data: seoData } = useQuery({
    queryKey: ["seoSetting"],
    queryFn: () => SeoSettingService.getSeoSetting(),
  });

  const { data: socialLinksData } = useQuery({
    queryKey: ["socialLinks"],
    queryFn: () => SocialLinksService.getSocialLinks(),
  });
  
  const heroName = heroData?.data?.heroTitle || "Salman";
  const initial = heroName.charAt(0).toUpperCase();
  const faviconUrl = seoData?.data?.favicon || "/favicon.ico";

  const socialLinks = socialLinksData?.data || [];
  const githubLink = socialLinks.find((l: any) => l.platform.toLowerCase() === 'github')?.url || "#";
  const linkedinLink = socialLinks.find((l: any) => l.platform.toLowerCase() === 'linkedin')?.url || "#";
  const resumeLink = heroData?.data?.resumeUrl || "#";

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsExpanded(false);
      }
    };
    handleResize();
    const handleScroll = () => {
      const sections = ['contact', 'blog', 'about', 'skills', 'experience', 'services', 'projects', 'home'];
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition) {
          if (pathname === '/') {
            setActiveSection(`#${section}`);
          }
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(pathname);
    } else {
      const hash = window.location.hash || "#home";
      setActiveSection(hash);
    }
  }, [pathname]);

  const getHref = (name: string, defaultHref: string) => {
    if (pathname === "/") return defaultHref;
    if (pathname === "/") return defaultHref;
    return `/${defaultHref}`;
  };

  const navItems = [
    { name: "Home", icon: Home, href: getHref("Home", "#home") },
    { name: "Projects", icon: FolderGit2, href: getHref("Projects", "#projects") },
    { name: "Services", icon: Layers, href: getHref("Services", "#services") },
    { name: "Experience", icon: Briefcase, href: getHref("Experience", "#experience") },
    { name: "Skills", icon: Code, href: getHref("Skills", "#skills") },
    { name: "About", icon: User, href: getHref("About", "#about") },
    { name: "Contact", icon: Mail, href: getHref("Contact", "#contact") },
  ];

  const profLinks = [
    { name: "GitHub", icon: GithubIcon, href: githubLink, target: "_blank" },
    { name: "LinkedIn", icon: LinkedinIcon, href: linkedinLink, target: "_blank" },
    { name: "Resume", icon: FileText, href: resumeLink, target: "_blank", isResume: true },
  ];

  const mobileNavItems = navItems.filter(item => item.name !== 'Contact');
  let activeMobileIndex = mobileNavItems.findIndex(item => item.href === activeSection);
  if (activeMobileIndex === -1) {
    if (activeSection === '#contact') {
      activeMobileIndex = mobileNavItems.length - 1;
    } else {
      activeMobileIndex = 0;
    }
  }

  const NavItemRender = ({ item }: { item: any }) => {
    const innerContent = (
      <>
        <item.icon className="w-5 h-5 shrink-0 group-hover:text-black dark:group-hover:text-white transition-colors" />
        
        <AnimatePresence>
          {isExpanded && (
            <motion.span 
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="whitespace-nowrap font-medium text-sm"
            >
              {item.name}
            </motion.span>
          )}
        </AnimatePresence>
        
        {!isExpanded && (
          <div className="absolute left-14 bg-white dark:bg-[#1A1C23] text-black dark:text-white text-xs px-2 py-1 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap border border-black/10 dark:border-white/10 z-[60] ml-2 shadow-lg">
            {item.name}
          </div>
        )}
      </>
    );

    if (item.isResume) {
      return (
        <li>
          <ResumeButton url={item.href} className="w-full flex items-center gap-4 px-3 py-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all group relative text-left cursor-pointer">
            {innerContent}
          </ResumeButton>
        </li>
      );
    }

    return (
      <li>
        <Link 
          href={item.href} 
          target={item.target || "_self"}
          onClick={() => {
            if (!item.target) setIsExpanded(false);
          }}
          className="flex items-center gap-4 px-3 py-3 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all group relative cursor-pointer"
        >
          {innerContent}
        </Link>
      </li>
    );
  };

  return (
    <>
      {/* Mobile Top Right Actions */}
      <div className="md:hidden fixed top-4 right-4 z-[999] flex items-center gap-3">
        <Link href="#contact" className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-xl font-medium text-sm shadow-lg border border-transparent dark:border-white/10 transition-colors flex items-center gap-2 group">
          Let's Talk
          <Mail className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
        <button 
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="cursor-pointer p-2.5 bg-white/80 dark:bg-[#1A1C23]/80 backdrop-blur-xl rounded-full text-black dark:text-white shadow-lg border border-gray-200 dark:border-white/10"
        >
          {mounted && theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-[999] h-20 bg-white dark:bg-[#1A1C23] shadow-[0_-4px_32px_rgba(0,0,0,0.1)] flex items-center px-4 rounded-t-3xl">
        <div 
          className="absolute top-0 h-full transition-transform duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] flex justify-center w-[calc((100%-2rem)/5)]"
          style={{ transform: `translateX(${activeMobileIndex * 100}%)` }}
        >
          <div className="absolute -top-7 w-14 h-14 bg-white dark:bg-[#1A1C23] rounded-full border-[6px] border-gray-50 dark:border-black shadow-[0_-4px_10px_rgba(0,0,0,0.05)] flex items-center justify-center" />
          <div className="absolute top-[2px] -left-5 w-5 h-5 bg-transparent rounded-tr-xl shadow-[0_-10px_0_0_#ffffff] dark:shadow-[0_-10px_0_0_#1A1C23]" />
          <div className="absolute top-[2px] -right-5 w-5 h-5 bg-transparent rounded-tl-xl shadow-[0_-10px_0_0_#ffffff] dark:shadow-[0_-10px_0_0_#1A1C23]" />
        </div>
        <div className="relative w-full h-full flex justify-between">
          {mobileNavItems.map((item, index) => {
            const isActive = index === activeMobileIndex;
            return (
              <Link 
                key={index}
                href={item.href}
                onClick={() => setActiveSection(item.href)}
                className="relative w-full h-full flex flex-col items-center justify-center z-10"
              >
                <span className={`transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)] flex flex-col items-center gap-1 ${isActive ? '-translate-y-7 text-black dark:text-white drop-shadow-md' : 'translate-y-0 text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white'}`}>
                  <item.icon className="w-6 h-6" />
                </span>
                {isActive && (
                   <span className="absolute bottom-2 w-1.5 h-1.5 rounded-full bg-black dark:bg-white" />
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isExpanded ? 240 : 80 }}
        transition={{ type: "spring", bounce: 0, duration: 0.5 }}
        className="hidden md:flex fixed left-0 top-0 h-screen bg-white/60 dark:bg-[#0E1015]/60 backdrop-blur-xl border-r border-black/5 dark:border-white/5 flex-col z-[999] overflow-visible transition-colors duration-300 shadow-2xl"
      >
        <div className="flex items-center justify-between p-4 h-20 relative">
          <div className={`flex items-center gap-2 overflow-hidden whitespace-nowrap transition-opacity duration-300 ${isExpanded ? "opacity-100" : "opacity-0 w-0 hidden md:flex"}`}>
            {faviconUrl ? (
              <img src={faviconUrl} alt="Site Logo" className="w-8 h-8 shrink-0 object-contain rounded-md" />
            ) : (
              <div className="w-8 h-8 rounded bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white dark:text-black font-bold text-lg shrink-0 shadow-lg">
                {initial}
              </div>
            )}
            {isExpanded && faviconUrl && <span className="font-bold text-black dark:text-white text-xl truncate">{seoData?.data?.siteName || heroName}</span>}
          </div>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className={`p-2 bg-white dark:bg-[#1A1C23] rounded-md text-black dark:text-white border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors flex shrink-0 ${!isExpanded ? "mx-auto" : "ml-auto"}`}
          >
            {isExpanded ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          
          <div className="mb-6">
            <AnimatePresence>
              {isExpanded && (
                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="px-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2"
                >
                  Main Navigation
                </motion.p>
              )}
            </AnimatePresence>
            <ul className="space-y-2 px-3">
              {navItems.map((item, index) => <NavItemRender key={index} item={item} />)}
            </ul>
          </div>

          <div className="mb-6">
            <AnimatePresence>
              {isExpanded && (
                <motion.p
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="px-6 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2"
                >
                  Professional Links
                </motion.p>
              )}
            </AnimatePresence>
            <ul className="space-y-2 px-3">
              {profLinks.map((item, index) => <NavItemRender key={index} item={item} />)}
            </ul>
          </div>
        </nav>

        {/* Fixed Bottom Section */}
        <div className="p-4 border-t border-black/5 dark:border-white/5">
          <AnimatePresence>
            {isExpanded && (
              <motion.p
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="px-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2"
              >
                Utility
              </motion.p>
            )}
          </AnimatePresence>
          <ul className="space-y-2">
            <li>
              <button 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="flex items-center gap-4 px-3 py-3 w-full rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all group relative cursor-pointer"
              >
                {mounted && theme === 'dark' ? <Moon className="w-5 h-5 shrink-0" /> : <Sun className="w-5 h-5 shrink-0" />}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.span 
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      className="whitespace-nowrap font-medium text-sm text-left"
                    >
                      {mounted && theme === 'dark' ? "Light Mode" : "Dark Mode"}
                    </motion.span>
                  )}
                </AnimatePresence>
                {!isExpanded && (
                  <div className="absolute left-14 bg-white dark:bg-[#1A1C23] text-black dark:text-white text-xs px-2 py-1 rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap border border-black/10 dark:border-white/10 z-[60] ml-2 shadow-lg">
                    {mounted && theme === 'dark' ? "Light Mode" : "Dark Mode"}
                  </div>
                )}
              </button>
            </li>
          </ul>
        </div>
      </motion.aside>
    </>
  );
}

