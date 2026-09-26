import type { Metadata } from "next";
import { Poppins, Geist, Inter, Plus_Jakarta_Sans, Manrope, Sora, DM_Sans } from "next/font/google";
import "./globals.css";
import AppProvider from "@/components/AppProvider";
import { cn } from "@/lib/utils";
import VisitorTracker from "@/components/VisitorTracker";

export const revalidate = 0;

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });
const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-sans' });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-sans' });
const sora = Sora({ subsets: ['latin'], variable: '--font-sans' });
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-sans' });

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-poppins",
});

import { SeoSettingService } from "@/services/seoSetting.service";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const response = await SeoSettingService.getSeoSetting();
    const seoData = response.data;
    
    // Fallback if no SEO data is set yet
    if (!seoData) {
      return {
        title: "Salman Hossain - Portfolio",
        description: "Software Engineer",
      };
    }

    return {
      title: seoData.metaTitle,
      description: seoData.metaDescription,
      keywords: seoData.metaKeywords ? seoData.metaKeywords.join(", ") : undefined,
      authors: seoData.author ? [{ name: seoData.author }] : undefined,
      icons: seoData.favicon ? { icon: seoData.favicon } : undefined,
      openGraph: {
        title: seoData.ogTitle || seoData.metaTitle,
        description: seoData.ogDescription || seoData.metaDescription,
        siteName: seoData.siteName || undefined,
        images: seoData.ogImage ? [{ url: seoData.ogImage }] : undefined,
      },
      twitter: {
        card: (seoData.twitterCard as any) || "summary_large_image",
        title: seoData.ogTitle || seoData.metaTitle,
        description: seoData.ogDescription || seoData.metaDescription,
        images: seoData.ogImage ? [seoData.ogImage] : undefined,
      }
    };
  } catch (error) {
    return {
      title: "Salman Hossain - Portfolio",
      description: "Software Engineer",
    };
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let fontVar = inter.variable; // Default fallback to Inter

  try {
    const response = await SeoSettingService.getSeoSetting();
    const fontFamily = response?.data?.fontFamily;
    
    switch (fontFamily) {
      case "Plus Jakarta Sans": fontVar = jakarta.variable; break;
      case "Manrope": fontVar = manrope.variable; break;
      case "Sora": fontVar = sora.variable; break;
      case "DM Sans": fontVar = dmSans.variable; break;
      case "Inter": fontVar = inter.variable; break;
      default: fontVar = inter.variable; break;
    }
  } catch (error) {
    console.error("Failed to load global font setting", error);
  }

  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={cn("antialiased", poppins.variable, fontVar, "font-sans")}
    >
      <body 
        className="flex flex-col md:flex-row bg-white text-black dark:bg-[#0A0A0A] dark:text-white transition-colors duration-300"
        suppressHydrationWarning
      >
        <AppProvider>
          <VisitorTracker />
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
