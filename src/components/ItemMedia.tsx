"use client";

import Image from "next/image";

import type { SectionPageItem, SectionItemMediaKind } from "@/content/sections";
import { cn } from "@/lib/utils";

interface ItemMediaProps {
  item: SectionPageItem;
  className?: string;
  sizes?: string;
  roundedClassName?: string;
}

const aspectClassMap: Record<"square" | "landscape" | "portrait", string> = {
  square: "aspect-square",
  landscape: "aspect-[4/3]",
  portrait: "aspect-[3/4]"
};

const resolveMediaKind = (item: SectionPageItem): SectionItemMediaKind => {
  if (item.media?.kind) {
    return item.media.kind;
  }
  return item.image ? "image" : "none";
};

export const ItemMedia = ({
  item,
  className,
  sizes = "(max-width: 768px) 112px, 128px",
  roundedClassName = "rounded-2xl"
}: ItemMediaProps): JSX.Element => {
  const mediaKind = resolveMediaKind(item);
  const src = item.media?.src ?? item.image;
  const alt = item.media?.alt ?? `${item.title} media`;
  const aspect = item.media?.aspect ?? "landscape";
  const placeholderMonogram = item.media?.placeholderMonogram ?? item.title.slice(0, 1);
  const placeholderText = item.media?.placeholderText ?? "Preview";

  return (
    <div
      className={cn(
        "relative overflow-hidden border border-fg/12 bg-[#10141b]",
        roundedClassName,
        aspectClassMap[aspect],
        className
      )}
    >
      {mediaKind === "image" && src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover transition duration-200 ease-out group-hover:contrast-110"
        />
      ) : null}

      {mediaKind === "logo" ? (
        src ? (
          <div className="relative h-full w-full p-4">
            <Image
              src={src}
              alt={alt}
              fill
              sizes={sizes}
              className="object-contain p-4 transition duration-200 ease-out group-hover:contrast-110"
            />
          </div>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1">
            <span className="font-mono text-lg uppercase tracking-[0.12em] text-fg/74">
              {placeholderMonogram}
            </span>
            <span className="font-mono text-[0.56rem] uppercase tracking-[0.13em] text-fg/50">
              {placeholderText}
            </span>
          </div>
        )
      ) : null}

      {mediaKind === "none" ? (
        <div className="flex h-full w-full items-center justify-center">
          <span className="font-mono text-[0.56rem] uppercase tracking-[0.14em] text-fg/40">
            {placeholderText}
          </span>
        </div>
      ) : null}
    </div>
  );
};
