import { siteContent } from "@/content/siteContent";

export const Header = (): JSX.Element => {
  return (
    <header className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-start justify-between px-6 py-5 sm:px-9 sm:py-7">
      <div className="pointer-events-auto">
        <p className="font-mono text-[0.69rem] uppercase tracking-[0.22em] text-muted">
          {siteContent.siteConfig.name}
        </p>
      </div>

      <nav
        className="pointer-events-auto flex items-center gap-4 font-mono text-[0.69rem] uppercase tracking-[0.18em] text-fg/72"
        aria-label="Social links"
      >
        <a
          className="transition-colors duration-150 hover:text-accent focus-visible:text-accent"
          href={siteContent.siteConfig.links.github}
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        <a
          className="transition-colors duration-150 hover:text-accent focus-visible:text-accent"
          href={siteContent.siteConfig.links.linkedin}
          target="_blank"
          rel="noreferrer"
        >
          LinkedIn
        </a>
        <a
          className="transition-colors duration-150 hover:text-accent focus-visible:text-accent"
          href={siteContent.siteConfig.links.email}
        >
          Email
        </a>
      </nav>
    </header>
  );
};
