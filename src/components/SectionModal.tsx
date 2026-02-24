"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";

import { siteContent } from "@/content/siteContent";
import { useUIStore } from "@/lib/store";
import { uniqueSorted } from "@/lib/utils";

import { ItemCard } from "./ItemCard";
import { ItemDetail } from "./ItemDetail";
import { TagFilter } from "./TagFilter";

export const SectionModal = (): JSX.Element => {
  const isModalOpen = useUIStore((state) => state.isModalOpen);
  const selectedSectionId = useUIStore((state) => state.selectedSectionId);
  const selectedItemId = useUIStore((state) => state.selectedItemId);
  const projectsFilterTags = useUIStore((state) => state.projectsFilterTags);
  const prefersReducedMotion = useUIStore((state) => state.prefersReducedMotion);

  const closeModal = useUIStore((state) => state.closeModal);
  const openItem = useUIStore((state) => state.openItem);
  const backToList = useUIStore((state) => state.backToList);
  const toggleProjectFilterTag = useUIStore((state) => state.toggleProjectFilterTag);
  const clearProjectFilters = useUIStore((state) => state.clearProjectFilters);

  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const section = selectedSectionId ? siteContent.sections[selectedSectionId] : null;

  const availableProjectTags = useMemo(() => {
    if (!section || section.id !== "projects") {
      return [];
    }

    return uniqueSorted(section.items.flatMap((item) => item.tags));
  }, [section]);

  const filteredItems = useMemo(() => {
    if (!section) {
      return [];
    }

    if (section.id !== "projects" || projectsFilterTags.length === 0) {
      return section.items;
    }

    return section.items.filter((item) =>
      projectsFilterTags.every((tag) => item.tags.includes(tag))
    );
  }, [projectsFilterTags, section]);

  const selectedItem = useMemo(() => {
    if (!section || !selectedItemId) {
      return null;
    }

    return section.items.find((item) => item.id === selectedItemId) ?? null;
  }, [section, selectedItemId]);

  useEffect(() => {
    if (isModalOpen) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }

    return undefined;
  }, [isModalOpen]);

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closeModal, isModalOpen]);

  useEffect(() => {
    if (isModalOpen && selectedItemId && !selectedItem) {
      backToList();
    }
  }, [backToList, isModalOpen, selectedItem, selectedItemId]);

  const duration = prefersReducedMotion ? 0.1 : 0.22;

  return (
    <AnimatePresence>
      {isModalOpen && section ? (
        <motion.div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <motion.section
            aria-modal="true"
            role="dialog"
            aria-label={`${section.title} details`}
            className="relative h-[88vh] w-full max-w-4xl overflow-hidden rounded-lg border border-fg/14 bg-[#0f1116]"
            initial={{ opacity: 0, y: 12, scale: prefersReducedMotion ? 1 : 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.995 }}
            transition={{ duration }}
          >
            <button
              ref={closeButtonRef}
              type="button"
              className="absolute right-3 top-3 z-10 rounded px-2 py-1 font-mono text-[0.66rem] uppercase tracking-[0.17em] text-muted transition-colors duration-150 hover:text-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
              onClick={closeModal}
            >
              Close
            </button>

            <div className="h-full overflow-y-auto px-5 pb-10 pt-12 sm:px-8">
              {!selectedItem ? (
                <div className="space-y-7">
                  <header className="space-y-3">
                    <p className="font-mono text-[0.64rem] uppercase tracking-[0.17em] text-muted">
                      Section
                    </p>
                    <h2 className="text-3xl text-fg">{section.title}</h2>
                    <p className="max-w-3xl text-sm leading-relaxed text-fg/75">
                      {section.thesis}
                    </p>

                    {section.id === "about" ? (
                      <div className="mt-3 flex flex-wrap gap-4 text-xs text-fg/72">
                        <a
                          className="font-mono uppercase tracking-[0.14em] transition-colors duration-150 hover:text-accent"
                          href={siteContent.siteConfig.links.github}
                          target="_blank"
                          rel="noreferrer"
                        >
                          GitHub
                        </a>
                        <a
                          className="font-mono uppercase tracking-[0.14em] transition-colors duration-150 hover:text-accent"
                          href={siteContent.siteConfig.links.linkedin}
                          target="_blank"
                          rel="noreferrer"
                        >
                          LinkedIn
                        </a>
                        <a
                          className="font-mono uppercase tracking-[0.14em] transition-colors duration-150 hover:text-accent"
                          href={siteContent.siteConfig.links.email}
                        >
                          Email
                        </a>
                      </div>
                    ) : null}
                  </header>

                  {section.id === "projects" ? (
                    <TagFilter
                      tags={availableProjectTags}
                      selectedTags={projectsFilterTags}
                      onToggleTag={toggleProjectFilterTag}
                      onClear={clearProjectFilters}
                    />
                  ) : null}

                  {filteredItems.length === 0 ? (
                    <p className="text-sm text-fg/65">
                      No items match the current filters.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {filteredItems.map((item) => (
                        <ItemCard
                          key={item.id}
                          item={item}
                          sectionId={section.id}
                          onClick={() => openItem(item.id)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <ItemDetail item={selectedItem} onBack={backToList} />
              )}
            </div>
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
