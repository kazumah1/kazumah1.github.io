"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { EdgeNav } from "@/components/EdgeNav";
import { Header } from "@/components/Header";
import type { SectionId } from "@/content/siteContent";
import { siteContent } from "@/content/siteContent";
import { useTransitionProvider } from "@/components/TransitionProvider";
import { usePrefersReducedMotion, useScrollActivity } from "@/lib/hooks";
import { useUIStore } from "@/lib/store";
import { BrainScene } from "@/three/BrainScene";
import { preloadBrainSharedData } from "@/three/brainShared";

export const HomeClient = (): JSX.Element => {
  const router = useRouter();
  const navigationTimeoutRef = useRef<number | null>(null);
  const hasPushedRef = useRef(false);
  const prefetchedRoutesRef = useRef<Set<SectionId>>(new Set());
  const [navigatingSectionId, setNavigatingSectionId] = useState<SectionId | null>(
    null
  );

  const hoveredSectionId = useUIStore((state) => state.hoveredSectionId);

  const setHover = useUIStore((state) => state.setHover);
  const setPrefersReducedMotion = useUIStore(
    (state) => state.setPrefersReducedMotion
  );
  const setScrolling = useUIStore((state) => state.setScrolling);

  const prefersReducedMotion = usePrefersReducedMotion();
  const isScrolling = useScrollActivity(250);
  const {
    startSectionTransition,
    updateLandingPose
  } = useTransitionProvider();

  useEffect(() => {
    setPrefersReducedMotion(prefersReducedMotion);
  }, [prefersReducedMotion, setPrefersReducedMotion]);

  useEffect(() => {
    setScrolling(isScrolling);
  }, [isScrolling, setScrolling]);

  useEffect(() => {
    void preloadBrainSharedData();
    siteContent.sectionOrder.forEach((sectionId) => {
      router.prefetch(`/${sectionId}`);
      prefetchedRoutesRef.current.add(sectionId);
    });
  }, [router]);

  useEffect(() => {
    return () => {
      if (navigationTimeoutRef.current !== null) {
        window.clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, []);

  const handleNavigationPose = (pose: {
    position: [number, number, number];
    quaternion: [number, number, number, number];
    scale: number;
  }) => {
    updateLandingPose(pose);
  };

  const handleSectionSelect = (sectionId: SectionId) => {
    if (navigatingSectionId) {
      return;
    }

    startSectionTransition(sectionId);
    setHover(sectionId);
    setNavigatingSectionId(sectionId);
    hasPushedRef.current = false;

    const transitionDurationMs = 760;

    if (navigationTimeoutRef.current !== null) {
      window.clearTimeout(navigationTimeoutRef.current);
    }

    void preloadBrainSharedData();

    navigationTimeoutRef.current = window.setTimeout(() => {
      if (hasPushedRef.current) {
        return;
      }
      hasPushedRef.current = true;
      router.push(`/${sectionId}`);
    }, transitionDurationMs);
  };

  const handleHover = (sectionId: SectionId | null) => {
    setHover(sectionId);
    if (!sectionId || prefetchedRoutesRef.current.has(sectionId)) {
      return;
    }
    prefetchedRoutesRef.current.add(sectionId);
    router.prefetch(`/${sectionId}`);
  };

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-bg text-fg">
      <div className="absolute inset-0">
        <BrainScene
          navigationSectionId={navigatingSectionId}
          onNavigationPose={handleNavigationPose}
        />
      </div>

      <div>
        <Header />

        <EdgeNav
          hoveredSectionId={hoveredSectionId ?? navigatingSectionId}
          selectedSectionId={navigatingSectionId}
          onHover={handleHover}
          onSelect={handleSectionSelect}
        />
      </div>

    </main>
  );
};
