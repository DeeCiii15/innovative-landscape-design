import type { Metadata } from "next";
import { Jost, Newsreader } from "next/font/google";
import Script from "next/script";
import { HomeAerial } from "./components/HomeAerial";
import { MobileCallBar } from "./components/MobileCallBar";
import { ScrollRise } from "./components/ScrollRise";
import { ScrollToTop } from "./components/ScrollToTop";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { SkipToContent } from "./components/SkipToContent";
import { JsonLdLocalBusiness } from "./components/JsonLdLocalBusiness";
import { siteConfig } from "@/lib/siteConfig";
import "./globals.css";

const jost = Jost({
  variable: "--font-sans-body",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-serif-body",
  subsets: ["latin"],
  axes: ["opsz"],
  style: ["normal", "italic"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: {
    default: `Landscape Design in Florence, SC | ${siteConfig.name}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  alternates: { canonical: "/" },
  openGraph: {
    title: `Landscape Design in Florence, SC | ${siteConfig.name}`,
    description: siteConfig.description,
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    url: siteConfig.url,
    images: [{ url: siteConfig.heroImage, alt: siteConfig.heroImageAlt }],
  },
  icons: {
    icon: siteConfig.logo,
    apple: siteConfig.logo,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jost.variable} ${newsreader.variable} antialiased`}>
      <body className="flex min-h-screen flex-col bg-white pb-[calc(4rem+env(safe-area-inset-bottom,0px))] text-[var(--foreground)] md:pb-0">
        <Script
          id="scroll-restoration"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `try{if("scrollRestoration"in history)history.scrollRestoration="manual";if(!location.hash){var h=document.documentElement,p=h.style.scrollBehavior;h.style.scrollBehavior="auto";scrollTo(0,0);h.style.scrollBehavior=p;}}catch(e){}`,
          }}
        />
        <JsonLdLocalBusiness />
        <ScrollToTop />
        <SkipToContent />
        <HomeAerial />
        <SiteHeader />
        <main id="main-content" tabIndex={-1} className="relative z-[1] flex-1 outline-none">
          <ScrollRise />
          {children}
        </main>
        <SiteFooter />
        <MobileCallBar />
      </body>
    </html>
  );
}
