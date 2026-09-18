import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
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
import { socialTags } from "@/lib/seo";
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

const homeTitle = `Landscaper in Florence, SC | ${siteConfig.name}`;
const homeSocial = socialTags({
  title: homeTitle,
  description: siteConfig.description,
  path: "/",
});

export const metadata: Metadata = {
  title: {
    default: homeTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  alternates: { canonical: "/" },
  icons: {
    icon: [
      { url: "/brand/v9/icon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/brand/v9/icon-48.png", type: "image/png", sizes: "48x48" },
      { url: "/brand/v9/icon-512.png", type: "image/png", sizes: "512x512" },
      { url: "/brand/v9/favicon.ico", sizes: "16x16 32x32 48x48", type: "image/x-icon" },
    ],
    apple: { url: "/brand/v9/apple-180.png", sizes: "180x180" },
  },
  openGraph: {
    ...homeSocial.openGraph,
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
  },
  twitter: homeSocial.twitter,
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
        <Analytics />
      </body>
    </html>
  );
}
