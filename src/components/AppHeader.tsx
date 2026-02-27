"use client";

import Link from "next/link";

import { siteContent } from "@/content/siteContent";
import { useUIStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const AppHeader = ({ className }: { className?: string }): JSX.Element => {
  const setHover = useUIStore((state) => state.setHover);

  return (
    <header
      className={cn(
        "mx-auto flex min-h-[72px] w-full max-w-[1440px] items-start justify-between px-6 pt-6 sm:min-h-[80px] sm:px-10 sm:pt-8",
        className
      )}
    >
      <Link
        href="/"
        onClick={() => setHover(null)}
        className="font-mono text-[0.78rem] uppercase tracking-[0.24em] text-fg/82 transition-colors duration-150 hover:text-accent"
      >
        {siteContent.siteConfig.name}
      </Link>

      <nav
        className="flex items-center gap-4 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-fg/72 sm:gap-5"
        aria-label="Social links"
      >
        <a href={siteContent.siteConfig.links.github} target="_blank" rel="noreferrer" className="transition-colors duration-150 hover:text-accent">
          GitHub
        </a>
        <a href={siteContent.siteConfig.links.linkedin} target="_blank" rel="noreferrer" className="transition-colors duration-150 hover:text-accent">
          LinkedIn
        </a>
        <a href={siteContent.siteConfig.links.email} className="transition-colors duration-150 hover:text-accent">
          Email
        </a>
      </nav>
    </header>
  );
};
