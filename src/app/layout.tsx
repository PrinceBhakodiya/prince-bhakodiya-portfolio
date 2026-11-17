import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter_Tight, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/providers/smooth-scroll-provider";
import { siteConfig } from "@/data/site";
import { JsonLd } from "@/components/json-ld";
import { personSchema, websiteSchema } from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Prince Bhakodiya",
    "Flutter developer in Ahmedabad",
    "Full stack developer Ahmedabad",
    "App developer Ahmedabad",
    "Mobile app developer India",
    "Node.js developer India",
    "Next.js developer",
    "Tech Lead",
    "Freelance app developer Gujarat",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  category: "technology",
  icons: {
    icon: [
      { url: siteConfig.logo, type: "image/png", sizes: "512x512" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    shortcut: [siteConfig.favicon],
    apple: [{ url: siteConfig.logo, type: "image/png", sizes: "512x512" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0910",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const LITE_SCRIPT = `try{var n=navigator,m=function(q){return matchMedia(q).matches};if(m("(pointer: coarse)")||m("(prefers-reduced-motion: reduce)")||(n.hardwareConcurrency||8)<=4||(n.deviceMemory||8)<=4)document.documentElement.classList.add("lite")}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className="dark" suppressHydrationWarning>
      <head>
        {/* Runs before first paint: phones, low-core / low-memory machines and reduced-motion users get "lite" mode */}
        <script dangerouslySetInnerHTML={{ __html: LITE_SCRIPT }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${interTight.variable} ${instrumentSerif.variable} min-h-screen bg-background text-foreground antialiased`}
      >
        {/* Site-wide identity: every page's schema points at this Person and WebSite */}
        <JsonLd data={[personSchema(), websiteSchema()]} />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
