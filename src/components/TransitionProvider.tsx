"use client";

import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { useEffect } from "react";
import type { ReactNode } from "react";

import type { SectionId } from "@/content/siteContent";
import { preloadBrainSharedData } from "@/three/brainShared";

export interface BrainPose {
  position: [number, number, number];
  quaternion: [number, number, number, number];
  scale: number;
}

interface TransitionContextValue {
  transitioningSectionId: SectionId | null;
  isTransitioning: boolean;
  startSectionTransition: (sectionId: SectionId) => void;
  updateLandingPose: (pose: BrainPose) => void;
  readLandingPose: (sectionId: SectionId) => BrainPose | null;
  finishSectionTransition: () => void;
  clearSectionTransition: () => void;
}

const TransitionContext = createContext<TransitionContextValue | null>(null);

export const TransitionProvider = ({
  children
}: {
  children: ReactNode;
}): JSX.Element => {
  const [transitioningSectionId, setTransitioningSectionId] =
    useState<SectionId | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const landingPoseRef = useRef<BrainPose | null>(null);

  useEffect(() => {
    void preloadBrainSharedData();
  }, []);

  const startSectionTransition = useCallback((sectionId: SectionId) => {
    setTransitioningSectionId(sectionId);
    setIsTransitioning(true);
  }, []);

  const updateLandingPose = useCallback((pose: BrainPose) => {
    landingPoseRef.current = pose;
  }, []);

  const readLandingPose = useCallback(
    (sectionId: SectionId): BrainPose | null => {
      if (sectionId !== transitioningSectionId) {
        return null;
      }
      return landingPoseRef.current;
    },
    [transitioningSectionId]
  );

  const finishSectionTransition = useCallback(() => {
    setIsTransitioning(false);
  }, []);

  const clearSectionTransition = useCallback(() => {
    setIsTransitioning(false);
    setTransitioningSectionId(null);
    landingPoseRef.current = null;
  }, []);

  const value = useMemo(
    () => ({
      transitioningSectionId,
      isTransitioning,
      startSectionTransition,
      updateLandingPose,
      readLandingPose,
      finishSectionTransition,
      clearSectionTransition
    }),
    [
      clearSectionTransition,
      finishSectionTransition,
      isTransitioning,
      readLandingPose,
      startSectionTransition,
      transitioningSectionId,
      updateLandingPose
    ]
  );

  return <TransitionContext.Provider value={value}>{children}</TransitionContext.Provider>;
};

export const useTransitionProvider = (): TransitionContextValue => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error("useTransitionProvider must be used within TransitionProvider");
  }
  return context;
};
