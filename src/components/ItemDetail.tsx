"use client";

import Image from "next/image";
import ReactMarkdown from "react-markdown";

import type { BaseItem } from "@/content/siteContent";
import { isValidUrl } from "@/lib/utils";

interface ItemDetailProps {
  item: BaseItem;
  onBack: () => void;
}

export const ItemDetail = ({ item, onBack }: ItemDetailProps): JSX.Element => {
  return (
    <article className="space-y-6">
      <button
        type="button"
        onClick={onBack}
        className="font-mono text-[0.64rem] uppercase tracking-[0.16em] text-muted transition-colors duration-150 hover:text-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
      >
        Back to list
      </button>

      <div className="space-y-2">
        <p className="font-mono text-[0.61rem] uppercase tracking-[0.16em] text-muted">
          {item.dates}
        </p>
        <h3 className="text-2xl text-fg">{item.title}</h3>
        <p className="text-sm text-fg/72">{item.subtitle}</p>
      </div>

      <div className="overflow-hidden rounded-md border border-fg/14 bg-black/20">
        <div className="relative h-64 w-full">
          <Image
            src={item.image}
            alt={`${item.title} hero`}
            fill
            sizes="(max-width: 1024px) 100vw, 960px"
            className="object-cover"
          />
        </div>
      </div>

      <div className="max-w-none text-sm leading-relaxed text-fg/78 [&_p]:mb-4 [&_strong]:font-semibold [&_strong]:text-fg">
        <ReactMarkdown>{item.longDescription}</ReactMarkdown>
      </div>

      <section className="space-y-3">
        <h4 className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-muted">
          Highlights
        </h4>
        <ul className="space-y-2 text-sm text-fg/80">
          {item.highlights.map((highlight) => (
            <li key={highlight} className="text-fg/78">
              {highlight}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h4 className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-muted">
          Tech stack
        </h4>
        <div className="flex flex-wrap gap-2">
          {item.techStack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-fg/20 px-2 py-1 font-mono text-[0.61rem] uppercase tracking-[0.12em] text-fg/70"
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {item.links.length > 0 ? (
        <section className="space-y-3">
          <h4 className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-muted">
            Links
          </h4>
          <div className="flex flex-wrap gap-4 text-sm text-fg/82">
            {item.links.map((link) => {
              if (!isValidUrl(link.url)) {
                return null;
              }

              return (
                <a
                  key={`${item.id}-${link.label}`}
                  href={link.url}
                  target={link.url.startsWith("mailto:") ? undefined : "_blank"}
                  rel={link.url.startsWith("mailto:") ? undefined : "noreferrer"}
                  className="font-mono text-[0.67rem] uppercase tracking-[0.17em] text-fg/74 transition-colors duration-150 hover:text-accent"
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        </section>
      ) : null}
    </article>
  );
};
