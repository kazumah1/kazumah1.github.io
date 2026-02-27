"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import { ItemMedia } from "@/components/ItemMedia";
import { ItemModal } from "@/components/ItemModal";
import { useTransitionProvider } from "@/components/TransitionProvider";
import type { BrainPose } from "@/components/TransitionProvider";
import { sectionPages } from "@/content/sections";
import type { SectionPageDefinition, SectionPageItem } from "@/content/sections";
import type { SectionId } from "@/content/siteContent";
import { siteContent } from "@/content/siteContent";
import { useScrollMotion } from "@/hooks/useScrollMotion";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { SectionBrainHeader } from "@/three/SectionBrainHeader";

interface SectionPageClientProps {
  sectionId: SectionId;
}

const uniqueSorted = (values: string[]): string[] =>
  Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));

const getItemYear = (item: SectionPageItem): string | null =>
  item.year ?? item.dateRange ?? null;

const getItemTagChips = (item: SectionPageItem): string[] =>
  item.techTags && item.techTags.length > 0 ? item.techTags : item.tags ?? [];

const SectionItemCard = ({
  item,
  onOpen
}: {
  item: SectionPageItem;
  onOpen: (item: SectionPageItem, trigger: HTMLElement) => void;
}): JSX.Element => {
  const year = getItemYear(item);
  const chips = getItemTagChips(item);

  return (
    <article
      tabIndex={0}
      onClick={(event) => onOpen(item, event.currentTarget)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onOpen(item, event.currentTarget);
        }
      }}
      className="group cursor-pointer rounded-[20px] border border-fg/14 bg-[#0f1116]/92 p-4 transition-[border-color,box-shadow] duration-180 ease-out hover:border-fg/24 hover:shadow-[0_14px_30px_rgba(0,0,0,0.24)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent/70 sm:p-5"
      aria-label={`View details for ${item.title}`}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start">
        <div className="w-[112px] shrink-0 sm:w-[126px]">
          <ItemMedia item={item} className="w-full" />
        </div>

        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {year ? (
              <p className="font-mono text-[0.61rem] uppercase tracking-[0.16em] text-muted">
                {year}
              </p>
            ) : null}
            {item.subtitle ? <p className="text-sm text-fg/72">{item.subtitle}</p> : null}
          </div>

          <h3 className="text-xl tracking-[-0.01em] text-fg">{item.title}</h3>

          {item.oneLiner ? (
            <p className="text-sm leading-relaxed text-fg/78">{item.oneLiner}</p>
          ) : null}

          {chips.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {chips.map((tag) => (
                <span
                  key={`${item.id}-${tag}`}
                  className="rounded border border-fg/12 px-2 py-1 font-mono text-[0.58rem] uppercase tracking-[0.13em] text-fg/66"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <div className="self-start md:pl-2">
          <span className="inline-block rounded border border-fg/18 px-2 py-1 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-fg/70 transition-colors duration-150 group-hover:border-accent/70 group-hover:text-accent">
            View details
          </span>
        </div>
      </div>
    </article>
  );
};

export const SectionPageClient = ({
  sectionId
}: SectionPageClientProps): JSX.Element => {
  const section: SectionPageDefinition = sectionPages[sectionId];
  const { progress, velocity } = useScrollMotion(1800);
  const prefersReducedMotion = usePrefersReducedMotion();

  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [returnFocusElement, setReturnFocusElement] = useState<HTMLElement | null>(
    null
  );
  const [projectFilterTags, setProjectFilterTags] = useState<string[]>([]);

  const { readLandingPose, finishSectionTransition, clearSectionTransition } =
    useTransitionProvider();
  const initialPoseRef = useRef<BrainPose | null>(null);
  if (!initialPoseRef.current) {
    initialPoseRef.current = readLandingPose(sectionId);
  }

  const [contentVisible, setContentVisible] = useState<boolean>(
    () => !initialPoseRef.current
  );

  useEffect(() => {
    finishSectionTransition();
    return () => {
      clearSectionTransition();
    };
  }, [clearSectionTransition, finishSectionTransition, sectionId]);

  useEffect(() => {
    if (!initialPoseRef.current) {
      setContentVisible(true);
      return;
    }

    const timeout = window.setTimeout(() => {
      setContentVisible(true);
    }, 220);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [sectionId]);

  useEffect(() => {
    setSelectedItemId(null);
    setReturnFocusElement(null);
  }, [sectionId]);

  const availableProjectTags = useMemo(() => {
    if (section.id !== "projects") {
      return [];
    }
    return uniqueSorted(section.items.flatMap((item) => item.tags ?? []));
  }, [section]);

  const filteredItems = useMemo(() => {
    if (section.id !== "projects" || projectFilterTags.length === 0) {
      return section.items;
    }

    return section.items.filter((item) =>
      projectFilterTags.every((tag) => (item.tags ?? []).includes(tag))
    );
  }, [projectFilterTags, section]);

  const selectedItem = useMemo(() => {
    if (!selectedItemId) {
      return null;
    }
    return section.items.find((item) => item.id === selectedItemId) ?? null;
  }, [section.items, selectedItemId]);

  const handleOpenItem = (item: SectionPageItem, trigger: HTMLElement) => {
    setReturnFocusElement(trigger);
    setSelectedItemId(item.id);
  };

  return (
    <main className="min-h-screen bg-bg text-fg">
      <header
        className={cn(
          "relative z-40 transition-opacity duration-300",
          contentVisible ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 sm:px-8 sm:py-7">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="rounded border border-fg/16 px-2 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-fg/72 transition-colors duration-150 hover:border-accent hover:text-accent"
            >
              Back
            </Link>
            <p className="font-mono text-[0.69rem] uppercase tracking-[0.22em] text-muted">
              {siteContent.siteConfig.name}
            </p>
          </div>

          <nav
            className="flex items-center gap-4 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-fg/72"
            aria-label="Social links"
          >
            <a
              href={siteContent.siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="transition-colors duration-150 hover:text-accent"
            >
              GitHub
            </a>
            <a
              href={siteContent.siteConfig.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="transition-colors duration-150 hover:text-accent"
            >
              LinkedIn
            </a>
            <a
              href={siteContent.siteConfig.links.email}
              className="transition-colors duration-150 hover:text-accent"
            >
              Email
            </a>
          </nav>
        </div>
      </header>

      <section className="relative mx-auto w-full max-w-[1600px] px-5 pt-2 sm:px-8 sm:pt-4">
        <div className="relative isolate min-h-[56vh] sm:min-h-[62vh] lg:min-h-[68vh]">
          <div className="pointer-events-none absolute inset-x-0 top-[2vh] z-0 flex items-start justify-center">
            <div className="h-[64vh] min-h-[400px] max-h-[720px] w-[100vw] sm:w-[94vw] lg:w-[86vw] xl:w-[80vw]">
              <SectionBrainHeader
                sectionId={section.id}
                scrollProgress={progress}
                scrollVelocity={velocity}
                prefersReducedMotion={prefersReducedMotion}
                initialPose={initialPoseRef.current}
              />
            </div>
          </div>

          <div
            className={cn(
              "relative z-10 pt-4 transition-opacity duration-300 sm:pt-10 lg:pt-14",
              contentVisible ? "opacity-100" : "opacity-0"
            )}
          >
            <h1 className="text-[clamp(3.2rem,9vw,6.4rem)] font-semibold leading-[0.9] tracking-[-0.03em] text-fg">
              {section.title}
              <span className="text-accent">.</span>
            </h1>
            <span className="mt-3 block h-[2px] w-14 rounded bg-accent/85" />
          </div>
        </div>
      </section>

      <section
        className={cn(
          "mx-auto -mt-10 w-full max-w-6xl px-5 transition-opacity duration-300 sm:-mt-14 sm:px-8 lg:-mt-16",
          contentVisible ? "opacity-100" : "opacity-0"
        )}
      >
        <p className="max-w-3xl text-sm leading-relaxed text-fg/78 sm:text-base">
          {section.shortDescription}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {section.chips.map((chip) => (
            <span
              key={`${section.id}-${chip}`}
              className="rounded border border-fg/14 px-2 py-1 font-mono text-[0.58rem] uppercase tracking-[0.13em] text-fg/70 transition-colors duration-150 hover:border-accent/70 hover:text-accent"
            >
              {chip}
            </span>
          ))}
        </div>
      </section>

      <div
        className={cn(
          "mx-auto w-full max-w-6xl px-5 pb-14 pt-7 transition-opacity duration-300 sm:px-8",
          contentVisible ? "opacity-100" : "opacity-0"
        )}
      >
        {section.id === "projects" ? (
          <div className="mb-7 flex flex-wrap items-center gap-2">
            {availableProjectTags.map((tag) => {
              const selected = projectFilterTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() =>
                    setProjectFilterTags((current) =>
                      current.includes(tag)
                        ? current.filter((item) => item !== tag)
                        : [...current, tag]
                    )
                  }
                  className={cn(
                    "rounded border px-2 py-1 font-mono text-[0.58rem] uppercase tracking-[0.13em] transition-colors duration-150",
                    selected
                      ? "border-accent text-accent"
                      : "border-fg/14 text-fg/64 hover:border-fg/30 hover:text-fg"
                  )}
                >
                  {tag}
                </button>
              );
            })}

            {projectFilterTags.length > 0 ? (
              <button
                type="button"
                onClick={() => setProjectFilterTags([])}
                className="rounded border border-fg/14 px-2 py-1 font-mono text-[0.58rem] uppercase tracking-[0.13em] text-fg/64 transition-colors duration-150 hover:text-accent"
              >
                Clear
              </button>
            ) : null}
          </div>
        ) : null}

        <section className="space-y-4">
          {filteredItems.map((item) => (
            <SectionItemCard key={item.id} item={item} onOpen={handleOpenItem} />
          ))}
        </section>
      </div>

      <ItemModal
        item={selectedItem}
        isOpen={Boolean(selectedItem)}
        onClose={() => setSelectedItemId(null)}
        returnFocusElement={returnFocusElement}
      />
    </main>
  );
};
