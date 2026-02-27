"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import ReactMarkdown from "react-markdown";

import type { SectionPageItem } from "@/content/sections";
import { ItemMedia } from "@/components/ItemMedia";

interface ItemModalProps {
  item: SectionPageItem | null;
  isOpen: boolean;
  onClose: () => void;
  returnFocusElement?: HTMLElement | null;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

const getDisplayYear = (item: SectionPageItem): string | null =>
  item.year ?? item.dateRange ?? null;

const getDisplayTags = (item: SectionPageItem): string[] =>
  item.tags && item.tags.length > 0 ? item.tags : item.techTags ?? [];

const getSummary = (item: SectionPageItem): string | null =>
  item.details?.summary ?? item.bodyMarkdown ?? item.oneLiner ?? null;

const getBullets = (item: SectionPageItem): string[] =>
  item.details?.bullets ?? item.highlights ?? [];

const getLinks = (item: SectionPageItem) => item.details?.links ?? item.links ?? [];

export const ItemModal = ({
  item,
  isOpen,
  onClose,
  returnFocusElement
}: ItemModalProps): JSX.Element | null => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const isBrowser = typeof document !== "undefined";

  const content = useMemo(() => {
    if (!item) {
      return null;
    }

    return {
      year: getDisplayYear(item),
      tags: getDisplayTags(item),
      summary: getSummary(item),
      bullets: getBullets(item),
      links: getLinks(item),
      note: item.details?.note ?? null
    };
  }, [item]);

  useEffect(() => {
    if (!isOpen || !item || !isBrowser) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const previousActive = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    const focusRaf = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const dialog = dialogRef.current;
      if (!dialog) {
        return;
      }

      const focusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      ).filter((node) => !node.hasAttribute("disabled"));

      if (focusable.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const current = document.activeElement as HTMLElement | null;

      if (event.shiftKey) {
        if (current === first || !dialog.contains(current)) {
          event.preventDefault();
          last.focus();
        }
      } else if (current === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.cancelAnimationFrame(focusRaf);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      const focusTarget = returnFocusElement ?? previousActive;
      focusTarget?.focus?.();
    };
  }, [isBrowser, isOpen, item, onClose, returnFocusElement]);

  if (!isBrowser) {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {isOpen && item && content ? (
        <motion.div
          key={`modal-backdrop-${item.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/58 p-4 backdrop-blur-[5px]"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`item-modal-title-${item.id}`}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.985, y: 8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative max-h-[88vh] w-full max-w-[940px] overflow-y-auto rounded-[24px] border border-fg/16 bg-[#0f1116]/96 p-5 shadow-[0_30px_100px_rgba(0,0,0,0.45)] sm:p-7"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-lg border border-fg/18 px-2 py-1 font-mono text-[0.58rem] uppercase tracking-[0.14em] text-fg/72 transition-colors duration-150 hover:border-accent/70 hover:text-accent"
            >
              Close
            </button>

            <div className="grid gap-5 pt-8 sm:grid-cols-[220px_minmax(0,1fr)] sm:pt-2">
              <ItemMedia
                item={item}
                className="w-full"
                sizes="(max-width: 768px) 240px, 220px"
                roundedClassName="rounded-[18px]"
              />

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    {content.year ? (
                      <p className="font-mono text-[0.61rem] uppercase tracking-[0.16em] text-muted">
                        {content.year}
                      </p>
                    ) : null}
                    {item.subtitle ? (
                      <p className="text-sm text-fg/72">{item.subtitle}</p>
                    ) : null}
                  </div>

                  <h3
                    id={`item-modal-title-${item.id}`}
                    className="text-2xl tracking-[-0.01em] text-fg sm:text-[1.9rem]"
                  >
                    {item.title}
                  </h3>
                </div>

                {content.summary ? (
                  <div className="prose prose-invert prose-sm max-w-none text-fg/82">
                    <ReactMarkdown>{content.summary}</ReactMarkdown>
                  </div>
                ) : null}

                {content.bullets.length > 0 ? (
                  <ul className="space-y-2 text-sm leading-relaxed text-fg/78">
                    {content.bullets.map((bullet) => (
                      <li key={`${item.id}-${bullet}`}>• {bullet}</li>
                    ))}
                  </ul>
                ) : null}

                {content.tags.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {content.tags.map((tag) => (
                      <span
                        key={`${item.id}-${tag}`}
                        className="rounded border border-fg/14 px-2 py-1 font-mono text-[0.58rem] uppercase tracking-[0.13em] text-fg/68"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}

                {content.links.length > 0 ? (
                  <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs">
                    {content.links.map((link) => (
                      <a
                        key={`${item.id}-${link.label}-${link.href}`}
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                        className="font-mono uppercase tracking-[0.13em] text-fg/72 transition-colors duration-150 hover:text-accent"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                ) : null}

                {content.note ? (
                  <p className="text-xs leading-relaxed text-muted">{content.note}</p>
                ) : null}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
};
