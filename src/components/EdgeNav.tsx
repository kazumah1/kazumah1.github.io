"use client";

import type { SectionId } from "@/content/siteContent";
import { sectionMeta } from "@/content/siteContent";
import { cn } from "@/lib/utils";

interface EdgeNavProps {
  hoveredSectionId: SectionId | null;
  selectedSectionId: SectionId | null;
  onHover: (sectionId: SectionId | null) => void;
  onSelect: (sectionId: SectionId) => void;
}

const edgePositionBySection: Record<SectionId, string> = {
  about: "left-1/2 top-8 -translate-x-1/2 sm:top-11",
  experience: "left-4 top-1/2 -translate-y-1/2 sm:left-7",
  projects: "right-4 top-1/2 -translate-y-1/2 sm:right-7",
  leadership: "bottom-8 left-8 sm:bottom-10 sm:left-11",
  interests: "bottom-8 right-8 sm:bottom-10 sm:right-11"
};

export const EdgeNav = ({
  hoveredSectionId,
  selectedSectionId,
  onHover,
  onSelect
}: EdgeNavProps): JSX.Element => {
  return (
    <nav
      className="pointer-events-none absolute inset-0 z-30"
      aria-label="Primary sections"
    >
      {sectionMeta.map((section) => {
        const isActive =
          hoveredSectionId === section.id || selectedSectionId === section.id;

        return (
          <button
            key={section.id}
            type="button"
            aria-label={`Open ${section.title}`}
            className={cn(
              "pointer-events-auto absolute rounded px-1 py-1 text-left font-mono text-[0.68rem] uppercase tracking-[0.2em] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent",
              edgePositionBySection[section.id],
              isActive ? "text-fg" : "text-muted hover:text-fg"
            )}
            onMouseEnter={() => onHover(section.id)}
            onMouseLeave={() => onHover(null)}
            onFocus={() => onHover(section.id)}
            onBlur={() => onHover(null)}
            onClick={() => onSelect(section.id)}
          >
            <span>{section.title}</span>
            <span
              className={cn(
                "mt-1 block h-px w-full origin-left transition-all duration-200",
                isActive ? "bg-accent" : "w-0 bg-accent"
              )}
            />
          </button>
        );
      })}
    </nav>
  );
};
