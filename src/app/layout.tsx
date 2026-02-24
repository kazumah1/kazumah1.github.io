import type { Metadata } from "next";
import type { ReactNode } from "react";

import { siteContent } from "@/content/siteContent";

import "./globals.css";

export const metadata: Metadata = {
  title: siteContent.siteConfig.seo.title,
  description: siteContent.siteConfig.seo.description,
  keywords: siteContent.siteConfig.seo.keywords,
  applicationName: siteContent.siteConfig.name
};

export default function RootLayout({
  children
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
