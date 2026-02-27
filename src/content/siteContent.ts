export type SectionId =
  | "experience"
  | "projects"
  | "leadership"
  | "interests"
  | "about";

export interface LinkItem {
  label: string;
  url: string;
}

export interface BaseItem {
  id: string;
  title: string;
  subtitle: string;
  dates: string;
  image: string;
  shortBlurb: string;
  longDescription: string;
  links: LinkItem[];
  tags: string[];
  highlights: string[];
  techStack: string[];
  featured?: boolean;
}

export interface ProjectItem extends BaseItem {}
export interface ExperienceItem extends BaseItem {}
export interface LeadershipItem extends BaseItem {}
export interface InterestItem extends BaseItem {}
export interface AboutItem extends BaseItem {}

export interface SiteSection<T extends BaseItem> {
  id: SectionId;
  title: string;
  thesis: string;
  items: T[];
}

export interface SiteConfig {
  name: string;
  tagline: string;
  accentColor: string;
  links: {
    github: string;
    linkedin: string;
    email: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export interface SiteContent {
  siteConfig: SiteConfig;
  sectionOrder: SectionId[];
  sections: {
    experience: SiteSection<ExperienceItem>;
    projects: SiteSection<ProjectItem>;
    leadership: SiteSection<LeadershipItem>;
    interests: SiteSection<InterestItem>;
    about: SiteSection<AboutItem>;
  };
}

export const siteContent: SiteContent = {
  siteConfig: {
    name: "Kazuma Hakushi",
    tagline: "Building controlled intelligence interfaces for real-world systems.",
    accentColor: "#FF8A1A",
    links: {
      github: "https://github.com/your-handle",
      linkedin: "https://linkedin.com/in/your-handle",
      email: "mailto:you@example.com"
    },
    seo: {
      title: "Kazuma Hakushi | Portfolio",
      description:
        "Personal portfolio with focused work in engineering, leadership, and deep-tech interface design.",
      keywords: [
        "portfolio",
        "full stack",
        "frontend",
        "three.js",
        "react",
        "engineering"
      ]
    }
  },
  sectionOrder: ["experience", "projects", "leadership", "interests", "about"],
  sections: {
    experience: {
      id: "experience",
      title: "Experience",
      thesis:
        "I build products at the boundary of data, interaction, and reliability, balancing technical depth with measurable delivery.",
      items: [
        // ADD NEW EXPERIENCE HERE
        {
          id: "exp-neural-systems",
          title: "Frontend Engineer",
          subtitle: "Neural Systems Lab",
          dates: "2024 - Present",
          image: "/images/experience-neural.svg",
          shortBlurb:
            "Built operator-facing interfaces for model observability and experiment control.",
          longDescription: `Designed and shipped a **low-latency observability console** for model evaluation loops.

Key work included reducing state drift between streaming telemetry and UI components, and introducing deterministic replay tools for incident triage.`,
          links: [
            {
              label: "Organization",
              url: "https://example.com/neural"
            }
          ],
          tags: ["frontend", "observability", "real-time"],
          highlights: [
            "Cut dashboard interaction latency by 35% through render-path optimization.",
            "Introduced typed event contracts shared across API and UI.",
            "Created incident replay tooling used in weekly reliability reviews."
          ],
          techStack: ["TypeScript", "React", "WebSocket", "PostgreSQL"],
          featured: true
        },
        {
          id: "exp-infra-ux",
          title: "Product Engineer",
          subtitle: "Infrastructure Platform Team",
          dates: "2022 - 2024",
          image: "/images/experience-infra.svg",
          shortBlurb:
            "Delivered internal platform tools for deployment safety and service ownership.",
          longDescription: `Owned a suite of deployment and ownership tools used by platform and application teams.

Focused on making high-risk operations legible: health signals, ownership boundaries, and rollout status were surfaced as first-class UI primitives.`,
          links: [
            {
              label: "Case Notes",
              url: "https://example.com/infra-notes"
            }
          ],
          tags: ["platform", "developer-experience", "ui"],
          highlights: [
            "Reduced failed deploy incidents by introducing progressive rollout guardrails.",
            "Standardized service metadata contracts for 50+ internal services.",
            "Built role-aware incident dashboard used by on-call rotations."
          ],
          techStack: ["Next.js", "TypeScript", "GraphQL", "Redis"]
        },
        {
          id: "exp-research-assistant",
          title: "Research Assistant",
          subtitle: "Human-Computer Interaction Studio",
          dates: "2021 - 2022",
          image: "/images/experience-hci.svg",
          shortBlurb:
            "Prototyped interaction models for interpreting high-dimensional model behavior.",
          longDescription: `Worked on interaction paradigms for inspecting latent-space transitions.

Built rapid prototypes that compared direct manipulation, focus+context overlays, and semantic slicing to identify which metaphors supported faster reasoning under uncertainty.`,
          links: [
            {
              label: "Lab",
              url: "https://example.com/hci"
            }
          ],
          tags: ["research", "hci", "visualization"],
          highlights: [
            "Published internal report on latent-space interaction tradeoffs.",
            "Implemented prototype toolkit for interactive embedding inspection.",
            "Ran moderated studies with graduate and industry participants."
          ],
          techStack: ["Three.js", "D3", "TypeScript", "Figma"]
        }
      ]
    },
    projects: {
      id: "projects",
      title: "Projects",
      thesis:
        "Projects are compact experiments in product quality and system constraints, designed to prove utility quickly and rigorously.",
      items: [
        // ADD NEW PROJECT HERE
        {
          id: "proj-signal-weave",
          title: "Signal Weave",
          subtitle: "Cross-source telemetry synthesis",
          dates: "2025",
          image: "/images/project-signal-weave.svg",
          shortBlurb:
            "Merged operational, product, and user signals into a unified investigation timeline.",
          longDescription: `Signal Weave unifies disparate telemetry streams into a time-aligned reasoning surface.

The project focused on reducing cognitive switching costs during incidents by combining logs, feature flags, and release deltas in a single interaction model.`,
          links: [
            {
              label: "GitHub",
              url: "https://github.com/your-handle/signal-weave"
            },
            {
              label: "Demo",
              url: "https://example.com/signal-weave"
            }
          ],
          tags: ["featured", "visualization", "full-stack"],
          highlights: [
            "Implemented end-to-end typed ingestion pipeline.",
            "Designed queryable timeline UX with sub-second drill-down.",
            "Added snapshot exports for postmortem workflows."
          ],
          techStack: ["Next.js", "TypeScript", "tRPC", "TimescaleDB"],
          featured: true
        },
        {
          id: "proj-atlas-sim",
          title: "Atlas Sim",
          subtitle: "Scenario planning sandbox",
          dates: "2024",
          image: "/images/project-atlas-sim.svg",
          shortBlurb:
            "Interactive simulation panel for exploring policy and allocation decisions.",
          longDescription: `Atlas Sim provides an opinionated sandbox for testing policy decisions before rollout.

It prioritizes explainability over raw complexity, using constrained controls and explicit assumptions to keep the model legible to decision-makers.`,
          links: [
            {
              label: "GitHub",
              url: "https://github.com/your-handle/atlas-sim"
            }
          ],
          tags: ["simulation", "ui", "decision-support"],
          highlights: [
            "Built deterministic scenario replay with parameter diffing.",
            "Introduced assumptions ledger for transparent model constraints.",
            "Added shareable reports for stakeholder review."
          ],
          techStack: ["React", "TypeScript", "Zustand", "Vite"]
        },
        {
          id: "proj-hackathon-neurogrid",
          title: "NeuroGrid",
          subtitle: "Hackathon prototype for adaptive tutoring",
          dates: "2023",
          image: "/images/project-neurogrid.svg",
          shortBlurb:
            "Built in 36 hours: adaptive tutor that reacts to concept-level confidence.",
          longDescription: `NeuroGrid is a fast-turnaround hackathon build that combines assessment and explanation loops.

The emphasis was not model novelty, but thoughtful interaction pacing: confidence tracking, escalating hints, and concise remediation paths.`,
          links: [
            {
              label: "GitHub",
              url: "https://github.com/your-handle/neurogrid"
            },
            {
              label: "Devpost",
              url: "https://devpost.com/software/neurogrid"
            }
          ],
          tags: ["hackathon", "education", "llm"],
          highlights: [
            "Shipped MVP with end-to-end onboarding in under two days.",
            "Created adaptive hinting flow tied to confidence score.",
            "Won finalist placement in AI education track."
          ],
          techStack: ["Next.js", "OpenAI API", "Prisma", "SQLite"]
        }
      ]
    },
    leadership: {
      id: "leadership",
      title: "Leadership",
      thesis:
        "I lead through technical clarity: aligning teams around decision quality, interface contracts, and disciplined delivery.",
      items: [
        {
          id: "lead-studio-captain",
          title: "Engineering Studio Captain",
          subtitle: "Product Engineering Guild",
          dates: "2024 - Present",
          image: "/images/leadership-captain.svg",
          shortBlurb:
            "Facilitated architecture reviews and raised implementation quality bars.",
          longDescription: `Built review rituals that emphasized impact, not ceremony.

Introduced lightweight design docs, clear risk logs, and feedback loops that shortened architecture decision cycles.`,
          links: [
            {
              label: "Playbook",
              url: "https://example.com/leadership-playbook"
            }
          ],
          tags: ["mentorship", "architecture", "team-systems"],
          highlights: [
            "Mentored 8 engineers across frontend and platform tracks.",
            "Defined review templates for critical-path changes.",
            "Improved cross-team delivery predictability."
          ],
          techStack: ["System Design", "Facilitation", "Coaching"]
        },
        {
          id: "lead-community-builder",
          title: "Community Builder",
          subtitle: "University Tech Collective",
          dates: "2022 - 2024",
          image: "/images/leadership-community.svg",
          shortBlurb:
            "Organized workshops on robust frontend architecture and product thinking.",
          longDescription: `Designed workshop sequences that moved from implementation mechanics to product-level decision tradeoffs.

Sessions included real code audits and deployment retrospectives to help participants reason beyond syntax.`,
          links: [
            {
              label: "Workshop Archive",
              url: "https://example.com/workshops"
            }
          ],
          tags: ["education", "community", "frontend"],
          highlights: [
            "Ran 20+ sessions with 300+ attendees total.",
            "Created reusable frontend quality checklists.",
            "Connected students with open-source mentorship paths."
          ],
          techStack: ["Curriculum", "Public Speaking", "Program Design"]
        }
      ]
    },
    interests: {
      id: "interests",
      title: "Interests",
      thesis:
        "My thinking map spans intelligence systems, human factors, and the craft of building reliable digital instruments.",
      items: [
        {
          id: "interest-interface-economics",
          title: "Interface Economics",
          subtitle: "How constraints shape behavior",
          dates: "Ongoing",
          image: "/images/interests-economics.svg",
          shortBlurb:
            "I study how defaults and friction alter decision quality in tools.",
          longDescription: `I am interested in the economic structure of interfaces: what gets measured, who bears friction, and how defaults influence outcomes.

Current focus areas include undo cost, ambiguity tax, and how monitoring design changes team behavior over time.`,
          links: [],
          tags: ["thinking-map", "product-systems"],
          highlights: [
            "Maintains notes on interface policy patterns.",
            "Compares observability UX in production teams.",
            "Explores tradeoffs between speed and legibility."
          ],
          techStack: ["Research", "Systems Thinking"]
        },
        {
          id: "interest-applied-cognition",
          title: "Applied Cognition",
          subtitle: "Designing for bounded attention",
          dates: "Ongoing",
          image: "/images/interests-cognition.svg",
          shortBlurb:
            "I care about interfaces that respect working memory limits.",
          longDescription: `I design interfaces for bounded human attention by reducing context switching and making uncertainty explicit.

This includes layout hierarchy, progressive disclosure, and deliberate use of animation as state communication rather than decoration.`,
          links: [],
          tags: ["thinking-map", "hci"],
          highlights: [
            "Applies cognitive load heuristics to UI reviews.",
            "Builds prototypes around uncertainty visibility.",
            "Prioritizes interaction predictability under stress."
          ],
          techStack: ["HCI", "UX Research", "Prototyping"]
        },
        {
          id: "interest-computational-aesthetics",
          title: "Computational Aesthetics",
          subtitle: "Precision over spectacle",
          dates: "Ongoing",
          image: "/images/interests-aesthetics.svg",
          shortBlurb:
            "I explore restrained visual systems for technical storytelling.",
          longDescription: `I gravitate toward minimal visual languages that carry high semantic density.

The goal is to build interfaces that feel calm and deliberate while still communicating complex system state quickly.`,
          links: [],
          tags: ["thinking-map", "design-engineering"],
          highlights: [
            "Experiments with low-noise visual hierarchies.",
            "Uses motion as feedback, not ornament.",
            "Balances aesthetics with operational clarity."
          ],
          techStack: ["Creative Coding", "Visual Design"]
        }
      ]
    },
    about: {
      id: "about",
      title: "About",
      thesis:
        "I build trustworthy interfaces for complex systems, with a focus on calm interaction, explicit tradeoffs, and long-term maintainability.",
      items: [
        {
          id: "about-thesis",
          title: "Engineering Thesis",
          subtitle: "What I optimize for",
          dates: "Now",
          image: "/images/about-thesis.svg",
          shortBlurb:
            "Reliability and clarity are product features, not afterthoughts.",
          longDescription: `My approach combines system rigor with interaction quality.

I prefer architectures where state transitions are explicit, interfaces are intentionally quiet, and operational behavior is observable by design.`,
          links: [
            {
              label: "GitHub",
              url: "https://github.com/your-handle"
            },
            {
              label: "LinkedIn",
              url: "https://linkedin.com/in/your-handle"
            }
          ],
          tags: ["philosophy"],
          highlights: [
            "Designs for maintainability from day one.",
            "Values typed contracts and transparent state transitions.",
            "Balances execution speed with quality gates."
          ],
          techStack: ["TypeScript", "Systems Design"]
        },
        {
          id: "about-collaboration",
          title: "Collaboration Style",
          subtitle: "How I work with teams",
          dates: "Always",
          image: "/images/about-collaboration.svg",
          shortBlurb:
            "Direct communication, clear ownership, and concrete feedback loops.",
          longDescription: `I work best in teams that treat technical decisions as shared artifacts.

I document intent, surface risks early, and keep implementation details traceable so handoffs stay smooth and accountable.`,
          links: [
            {
              label: "Email",
              url: "mailto:you@example.com"
            }
          ],
          tags: ["teamwork"],
          highlights: [
            "Promotes clear ownership boundaries.",
            "Builds concise but complete technical docs.",
            "Prefers fast feedback over late surprises."
          ],
          techStack: ["Collaboration", "Documentation"]
        }
      ]
    }
  }
};

export const sectionMeta = siteContent.sectionOrder.map((id) => ({
  id,
  title: siteContent.sections[id].title,
  thesis: siteContent.sections[id].thesis
}));
