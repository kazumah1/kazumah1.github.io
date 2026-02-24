"use client";

import Image from "next/image";

import type { BaseItem, SectionId } from "@/content/siteContent";
import { cn } from "@/lib/utils";

interface ItemCardProps {
  item: BaseItem;
  sectionId: SectionId;
  onClick: () => void;
}

export const ItemCard = ({ item, sectionId, onClick }: ItemCardProps): JSX.Element => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full rounded-md border border-fg/14 bg-white/[0.01] text-left transition-colors duration-150 hover:border-fg/28 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
    >
      <div className="grid gap-4 p-4 sm:grid-cols-[150px_minmax(0,1fr)] sm:p-5">
        <div className="relative min-h-28 overflow-hidden rounded border border-fg/12 bg-black/25 sm:min-h-[130px]">
          <Image
            src={item.image}
            alt={`${item.title} thumbnail`}
            fill
            sizes="(max-width: 640px) 100vw, 150px"
            className="object-cover"
          />
        </div>

        <div className="space-y-2">
          <p className="font-mono text-[0.61rem] uppercase tracking-[0.16em] text-muted">
            {item.dates}
          </p>
          <h3 className="text-base text-fg">{item.title}</h3>
          <p className="text-sm text-fg/74">{item.subtitle}</p>
          <p className="text-sm leading-relaxed text-fg/67">
            {item.shortBlurb}
          </p>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <span
                key={`${item.id}-${tag}`}
                className={cn(
                  "rounded-full border border-fg/20 px-2 py-0.5 font-mono text-[0.58rem] uppercase tracking-[0.12em] text-muted transition-colors duration-150",
                  sectionId === "projects" &&
                    "group-hover:border-accent/50 group-hover:text-accent"
                )}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </button>
  );
};
