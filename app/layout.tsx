import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ROK® | Precision PPE & Heavy-Duty Mining Hydraulics",
  description: "Experience ROK's premium mining-grade protective gear, featuring our bespoke women's custom-engineered worksuits, alongside advanced system hydraulics and high-precision audits.",
  keywords: "ROK, mining PPE, women worksuits, ladies safety wear, mine hydraulics, industrial equipment, high-performance protective gear",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#050505] text-[#fafafa]">
        {children}
      </body>
    </html>
  );
}
