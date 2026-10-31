import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter_Tight } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import RevealObserver from "@/components/RevealObserver";
import BackToTop from "@/components/BackToTop";
import ThemeProvider from "@/components/ThemeProvider";
import { BRAND, LEGAL_ENTITY } from "@/lib/site";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const DESCRIPTION =
  `${LEGAL_ENTITY} is a 100% black woman-owned supplier of PPE, hydraulic systems, plant maintenance, machine rebuilding and cleaning services for mining, agriculture and government in South Africa.`;

export const metadata: Metadata = {
  title: {
    default: `${BRAND} | PPE, Hydraulics, Plant Maintenance & Cleaning`,
    template: `%s | ${BRAND}`,
  },
  description: DESCRIPTION,
  applicationName: BRAND,
  keywords: [
    BRAND,
    "PPE supply",
    "Women in Mining PPE",
    "arc wear",
    "hydraulic hoses and fittings",
    "hydraulic cylinder repairs",
    "pump repairs",
    "plant maintenance",
    "industrial cleaning",
    "Yellow and TMM machines",
    "Steelpoort",
    "black woman-owned",
  ],
  openGraph: {
    type: "website",
    siteName: BRAND,
    title: `${BRAND} | PPE, Hydraulics, Plant Maintenance & Cleaning`,
    description: DESCRIPTION,
    locale: "en_ZA",
  },
  twitter: { card: "summary", title: BRAND, description: DESCRIPTION },
};

export const viewport: Viewport = {
  // Both schemes are reachable through the header's theme toggle.
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf8" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1018" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: next-themes sets the theme class on <html> in a
    // blocking script before hydration, so server and client markup differ here.
    <html
      lang="en-ZA"
      suppressHydrationWarning
      className={`${interTight.variable} ${geist.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-5 focus:py-2.5 focus:font-semibold focus:text-white"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
          <RevealObserver />
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
