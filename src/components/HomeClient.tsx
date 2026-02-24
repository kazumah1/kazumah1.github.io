"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";

import { EdgeNav } from "@/components/EdgeNav";
import { Header } from "@/components/Header";
import { SectionModal } from "@/components/SectionModal";
import { siteContent } from "@/content/siteContent";
import type { SectionId } from "@/content/siteContent";
import { usePrefersReducedMotion, useScrollActivity } from "@/lib/hooks";
import { useUIStore } from "@/lib/store";
import { BrainScene } from "@/three/BrainScene";

const VALID_SECTION_IDS = new Set<SectionId>(siteContent.sectionOrder);

const isSectionId = (value: string | null): value is SectionId =>
  value !== null && VALID_SECTION_IDS.has(value as SectionId);

export const HomeClient = (): JSX.Element => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const hoveredSectionId = useUIStore((state) => state.hoveredSectionId);
  const selectedSectionId = useUIStore((state) => state.selectedSectionId);
  const selectedItemId = useUIStore((state) => state.selectedItemId);
  const isModalOpen = useUIStore((state) => state.isModalOpen);

  const setHover = useUIStore((state) => state.setHover);
  const openSection = useUIStore((state) => state.openSection);
  const openItem = useUIStore((state) => state.openItem);
  const setPrefersReducedMotion = useUIStore(
    (state) => state.setPrefersReducedMotion
  );
  const setScrolling = useUIStore((state) => state.setScrolling);

  const prefersReducedMotion = usePrefersReducedMotion();
  const isScrolling = useScrollActivity(250);

  const hasSyncedFromQueryRef = useRef(false);

  const sectionsById = useMemo(() => siteContent.sections, []);

  useEffect(() => {
    setPrefersReducedMotion(prefersReducedMotion);
  }, [prefersReducedMotion, setPrefersReducedMotion]);

  useEffect(() => {
    setScrolling(isScrolling);
  }, [isScrolling, setScrolling]);

  useEffect(() => {
    if (hasSyncedFromQueryRef.current) {
      return;
    }

    hasSyncedFromQueryRef.current = true;

    const sectionQuery = searchParams.get("section");
    const itemQuery = searchParams.get("item");

    if (!isSectionId(sectionQuery)) {
      return;
    }

    const section = sectionsById[sectionQuery];
    openSection(sectionQuery);

    if (itemQuery && section.items.some((item) => item.id === itemQuery)) {
      openItem(itemQuery);
    }
  }, [openItem, openSection, searchParams, sectionsById]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("section");
    params.delete("item");

    if (isModalOpen && selectedSectionId) {
      params.set("section", selectedSectionId);
      if (selectedItemId) {
        params.set("item", selectedItemId);
      }
    }

    const nextQuery = params.toString();
    const currentQuery = searchParams.toString();

    if (nextQuery === currentQuery) {
      return;
    }

    router.replace(nextQuery ? `/?${nextQuery}` : "/", { scroll: false });
  }, [isModalOpen, router, searchParams, selectedItemId, selectedSectionId]);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-bg text-fg">
      <div className="absolute inset-0">
        <BrainScene />
      </div>

      <Header />

      <EdgeNav
        hoveredSectionId={hoveredSectionId}
        selectedSectionId={selectedSectionId}
        onHover={setHover}
        onSelect={openSection}
      />

      <SectionModal />

    </main>
  );
};
