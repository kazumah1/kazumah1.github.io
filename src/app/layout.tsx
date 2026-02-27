import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";

import { TransitionProvider } from "@/components/TransitionProvider";
import { siteContent } from "@/content/siteContent";

import "./globals.css";

export const metadata: Metadata = {
  title: siteContent.siteConfig.seo.title,
  description: siteContent.siteConfig.seo.description,
  keywords: siteContent.siteConfig.seo.keywords,
  applicationName: siteContent.siteConfig.name
};

const fontSans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"]
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500", "600"]
});

export default function RootLayout({
  children
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${fontSans.variable} ${fontMono.variable} font-sans`}>
        <TransitionProvider>{children}</TransitionProvider>
      </body>
    </html>
  );
}
