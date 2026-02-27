"use client";

import Image from "next/image";

import type { HeroMedia } from "@/content/editorialTypes";
import { cn } from "@/lib/utils";

const aspectClassMap: Record<NonNullable<HeroMedia["aspect"]>, string> = {
  landscape: "aspect-[16/9]",
  portrait: "aspect-[4/5]",
  square: "aspect-square",
  ultrawide: "aspect-[2.2/1]"
};

export const HeroMediaBlock = ({
  media,
  className
}: {
  media: HeroMedia;
  className?: string;
}): JSX.Element => {
  const aspectClass = aspectClassMap[media.aspect ?? "landscape"];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[24px] border border-fg/[0.08] bg-fg/[0.03] shadow-[0_24px_80px_rgba(0,0,0,0.24)]",
        aspectClass,
        className
      )}
    >
      {media.type === "video" ? (
        <video
          className="h-full w-full object-cover"
          src={media.src}
          poster={media.poster}
          autoPlay
          muted
          loop
          playsInline
          aria-label={media.alt}
        />
      ) : media.type === "gif" ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={media.src} alt={media.alt} className="h-full w-full object-cover" />
      ) : (
        <Image src={media.src} alt={media.alt} fill sizes="(max-width: 1024px) 100vw, 960px" className="object-cover" priority />
      )}
    </div>
  );
};
