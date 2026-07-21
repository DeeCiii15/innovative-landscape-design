import type { Metadata } from "next";
import { DM_Sans, Bricolage_Grotesque } from "next/font/google";
import { MobileCallBar } from "./components/MobileCallBar";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { SkipToContent } from "./components/SkipToContent";
import { JsonLdLocalBusiness } from "./components/JsonLdLocalBusiness";
import { siteConfig } from "@/lib/siteConfig";
import "./globals.css";

const sans = DM_Sans({
  variable: "--font-sans-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const display = Bricolage_Grotesque({
  variable: "--font-display-face",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
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
    <html lang="en" className={`${sans.variable} ${display.variable} antialiased`}>
      <body className="flex min-h-screen flex-col bg-[var(--color-canvas)] pb-[calc(4rem+env(safe-area-inset-bottom,0px))] text-[var(--foreground)] md:pb-0">
        <JsonLdLocalBusiness />
        <SkipToContent />
        <SiteHeader />
        <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <SiteFooter />
        <MobileCallBar />
      </body>
    </html>
  );
}
