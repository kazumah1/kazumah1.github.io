import type { ProjectCaseStudy } from "@/content/editorialTypes";

export type { ProjectCaseStudy } from "@/content/editorialTypes";

export const projectCaseStudies: ProjectCaseStudy[] = [
  {
    slug: "signal-weave",
    title: "Signal Weave",
    subtitle: "Cross-source telemetry synthesis",
    year: "2025",
    dek:
      "A time-aligned reasoning surface that merges operational, product, and user signals into one investigation timeline.",
    tags: ["Featured", "Visualization", "Full-Stack"],
    media: {
      kind: "image",
      src: "/images/project-signal-weave.svg",
      alt: "Signal Weave timeline interface",
      aspect: "landscape"
    },
    heroMedia: {
      type: "image",
      src: "/images/project-signal-weave.svg",
      alt: "Signal Weave hero interface preview",
      aspect: "landscape"
    },
    links: [
      { label: "GitHub", href: "https://github.com/your-handle/signal-weave" },
      { label: "Demo", href: "https://example.com/signal-weave" }
    ],
    sections: [
      {
        id: "context",
        heading: "Context",
        body:
          "Signal Weave started from a familiar operational problem: the evidence needed to understand an incident was available, but it was spread across too many tools and too many incompatible time models. Logs, rollout state, product metrics, and feature flags all told part of the story, but none of them gave a coherent narrative on their own."
      },
      {
        id: "what-i-built",
        heading: "What I built",
        body:
          "I built a unified timeline surface that normalizes those streams into one queryable interaction model. The interface emphasizes sequence, provenance, and fast drill-down rather than decorative dashboards. Every state change is typed end to end so the front end can stay explicit about what it knows and where that information came from."
      },
      {
        id: "system-design",
        heading: "System design",
        body:
          "Underneath the interface is a typed ingestion pipeline that transforms multiple event sources into a common temporal schema. That let me keep the UI thin: filtering, grouping, and snapshot export all operate on the same structured event model, which in turn made the investigation workflow more predictable."
      },
      {
        id: "tradeoffs",
        heading: "Tradeoffs",
        body:
          "The main tradeoff was between expressiveness and cognitive cost. I deliberately constrained the interaction model so the user could move quickly during an investigation instead of wrestling with configuration. The product is less open-ended than a generic observability workbench, but far better at the specific task it was designed for."
      },
      {
        id: "results",
        heading: "Results",
        body:
          "The result is a surface that lowers context switching during incident review and makes postmortem export straightforward. It also gave me a concrete environment to test ideas about typed event contracts, interface pacing, and dense but calm visual hierarchy."
      }
    ]
  },
  {
    slug: "atlas-sim",
    title: "Atlas Sim",
    subtitle: "Scenario planning sandbox",
    year: "2024",
    dek:
      "An interactive simulation panel designed to make policy and allocation decisions more explainable than opaque spreadsheets ever could.",
    tags: ["Simulation", "UI", "Decision-Support"],
    media: {
      kind: "image",
      src: "/images/project-atlas-sim.svg",
      alt: "Atlas Sim scenario sandbox",
      aspect: "landscape"
    },
    heroMedia: {
      type: "image",
      src: "/images/project-atlas-sim.svg",
      alt: "Atlas Sim hero simulation view",
      aspect: "landscape"
    },
    links: [{ label: "GitHub", href: "https://github.com/your-handle/atlas-sim" }],
    sections: [
      {
        id: "context",
        heading: "Context",
        body:
          "Atlas Sim came from a simple observation: many decision-support tools are mathematically capable but interactionally brittle. They let users manipulate variables, but they rarely make assumptions, parameter shifts, or result deltas legible enough for real discussion."
      },
      {
        id: "what-i-built",
        heading: "What I built",
        body:
          "I built a browser-based sandbox for scenario planning with deterministic replay, parameter diffing, and an explicit assumptions ledger. The goal was not to simulate everything. It was to make the boundaries of the simulation visible so decisions could be questioned productively."
      },
      {
        id: "tradeoffs",
        heading: "Tradeoffs",
        body:
          "The strongest design choice was to prefer explainability over raw flexibility. That meant fewer controls than a power-user modeler might want, but the interface became easier to understand, easier to share, and easier to defend in stakeholder settings."
      },
      {
        id: "results",
        heading: "Results",
        body:
          "The project validated a direction I care about: decision tools should expose assumptions as part of the product, not hide them in supporting documentation. Atlas Sim made that principle concrete in a form people could actually use."
      }
    ]
  },
  {
    slug: "neurogrid",
    title: "NeuroGrid",
    subtitle: "Hackathon prototype for adaptive tutoring",
    year: "2023",
    dek:
      "A fast-turnaround tutoring prototype that adapts hints and pacing based on confidence rather than assuming linear progress.",
    tags: ["Hackathon", "Education", "LLM"],
    media: {
      kind: "logo",
      src: "/images/project-neurogrid.svg",
      alt: "NeuroGrid project mark",
      aspect: "square",
      placeholderMonogram: "NG"
    },
    heroMedia: {
      type: "image",
      src: "/images/project-neurogrid.svg",
      alt: "NeuroGrid hero mark",
      aspect: "square"
    },
    note:
      "This was built under tight time constraints, so the case study focuses on interaction design and iteration speed rather than production hardening.",
    links: [
      { label: "GitHub", href: "https://github.com/your-handle/neurogrid" },
      { label: "Devpost", href: "https://devpost.com/software/neurogrid" }
    ],
    sections: [
      {
        id: "context",
        heading: "Context",
        body:
          "NeuroGrid was built during a short hackathon window, so the problem had to be framed narrowly. We focused on a tutor that responds to learner confidence rather than just correctness, because pacing and intervention style often matter as much as the content itself."
      },
      {
        id: "what-i-built",
        heading: "What I built",
        body:
          "I worked on the interaction loop: onboarding, confidence capture, escalating hints, and the response structure around remediation. The goal was to make the product feel composed and adaptive even though the underlying build timeline was compressed."
      },
      {
        id: "tradeoffs",
        heading: "Tradeoffs",
        body:
          "Hackathon software forces aggressive prioritization. The system favored a clean and believable end-to-end experience over a deeper set of features. That tradeoff was worthwhile because it let us ship something coherent instead of a scattered demo."
      },
      {
        id: "results",
        heading: "Results",
        body:
          "The prototype shipped in under two days, placed as a finalist in its track, and reinforced how much interaction pacing can change the perceived intelligence of a system. Even a constrained build can feel thoughtful if the product loop is well-shaped."
      }
    ]
  }
];

export const projectSlugs = projectCaseStudies.map((project) => ({ slug: project.slug }));

export const getProjectBySlug = (slug: string): ProjectCaseStudy | null =>
  projectCaseStudies.find((project) => project.slug === slug) ?? null;
