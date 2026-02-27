import type { SectionId } from "./siteContent";

export interface SectionPageLink {
  label: string;
  href: string;
}

export type SectionItemMediaKind = "image" | "logo" | "none";

export interface SectionItemMedia {
  kind: SectionItemMediaKind;
  src?: string;
  alt?: string;
  aspect?: "square" | "landscape" | "portrait";
  placeholderText?: string;
  placeholderMonogram?: string;
}

export interface SectionItemDetails {
  summary?: string;
  bullets?: string[];
  links?: SectionPageLink[];
  note?: string;
}

export interface SectionPageItem {
  id: string;
  title: string;
  subtitle?: string;
  year?: string;
  oneLiner?: string;
  tags?: string[];
  media?: SectionItemMedia;
  details?: SectionItemDetails;
  // Backward compatibility for older content entries:
  dateRange?: string;
  techTags?: string[];
  image?: string;
  bodyMarkdown?: string;
  highlights?: string[];
  links?: SectionPageLink[];
}

export interface SectionPageDefinition {
  id: SectionId;
  title: string;
  route: `/${SectionId}`;
  shortDescription: string;
  chips: string[];
  items: SectionPageItem[];
}

export const sectionPageOrder: SectionId[] = [
  "experience",
  "projects",
  "leadership",
  "interests",
  "about"
];

export const sectionPages: Record<SectionId, SectionPageDefinition> = {
  experience: {
    id: "experience",
    title: "Experience",
    route: "/experience",
    shortDescription:
      "I build products where interaction quality and system reliability must both hold under pressure.",
    chips: ["Frontend Systems", "Observability", "Real-Time UX"],
    items: [
      // TODO: Replace placeholder media with final company logos or approved screenshots.
      {
        id: "exp-neural-systems",
        title: "Frontend Engineer",
        subtitle: "Neural Systems Lab",
        year: "2024 - Present",
        dateRange: "2024 - Present",
        oneLiner:
          "Built operator-facing interfaces for model observability and experiment control.",
        media: {
          kind: "logo",
          src: "/images/experience-neural.svg",
          alt: "Neural Systems Lab logo",
          aspect: "square",
          placeholderMonogram: "NS"
        },
        details: {
          summary:
            "Designed and shipped a low-latency observability console for model evaluation loops. Focused on reducing state drift between streaming telemetry and UI components.",
          bullets: [
            "Cut dashboard interaction latency by 35% through render-path optimization.",
            "Introduced typed event contracts shared across API and UI.",
            "Created incident replay tooling used in weekly reliability reviews."
          ],
          links: [{ label: "Organization", href: "https://example.com/neural" }]
        },
        techTags: ["TypeScript", "React", "WebSocket", "PostgreSQL"],
        tags: ["frontend", "observability", "real-time"],
        image: "/images/experience-neural.svg",
        bodyMarkdown:
          "Designed and shipped a low-latency observability console for model evaluation loops. Focused on reducing state drift between streaming telemetry and UI components.",
        highlights: [
          "Cut dashboard interaction latency by 35% through render-path optimization.",
          "Introduced typed event contracts shared across API and UI.",
          "Created incident replay tooling used in weekly reliability reviews."
        ],
        links: [{ label: "Organization", href: "https://example.com/neural" }]
      },
      {
        id: "exp-infra-ux",
        title: "Product Engineer",
        subtitle: "Infrastructure Platform Team",
        year: "2022 - 2024",
        dateRange: "2022 - 2024",
        oneLiner:
          "Delivered deployment-safety and service-ownership tools for internal teams.",
        media: {
          kind: "image",
          src: "/images/experience-infra.svg",
          alt: "Infrastructure Platform Team project snapshot",
          aspect: "landscape",
          placeholderMonogram: "IP"
        },
        details: {
          summary:
            "Owned internal deployment and ownership tooling. Prioritized legibility for high-risk operations by surfacing health, ownership boundaries, and rollout status.",
          bullets: [
            "Reduced failed deploy incidents via progressive rollout guardrails.",
            "Standardized service metadata contracts for 50+ services.",
            "Built role-aware incident dashboard used by on-call rotations."
          ],
          links: [{ label: "Case Notes", href: "https://example.com/infra-notes" }]
        },
        techTags: ["Next.js", "TypeScript", "GraphQL", "Redis"],
        tags: ["platform", "developer-experience", "ui"],
        image: "/images/experience-infra.svg",
        bodyMarkdown:
          "Owned internal deployment and ownership tooling. Prioritized legibility for high-risk operations by surfacing health, ownership boundaries, and rollout status.",
        highlights: [
          "Reduced failed deploy incidents via progressive rollout guardrails.",
          "Standardized service metadata contracts for 50+ services.",
          "Built role-aware incident dashboard used by on-call rotations."
        ],
        links: [{ label: "Case Notes", href: "https://example.com/infra-notes" }]
      },
      {
        id: "exp-research-assistant",
        title: "Research Assistant",
        subtitle: "Human-Computer Interaction Studio",
        year: "2021 - 2022",
        dateRange: "2021 - 2022",
        oneLiner:
          "Prototyped interaction models for interpreting high-dimensional model behavior.",
        media: {
          kind: "image",
          src: "/images/experience-hci.svg",
          alt: "HCI Studio visualization sample",
          aspect: "landscape",
          placeholderMonogram: "HCI"
        },
        details: {
          summary:
            "Built prototypes comparing direct manipulation, focus+context overlays, and semantic slicing for latent-space interpretation.",
          bullets: [
            "Published internal report on latent-space interaction tradeoffs.",
            "Implemented prototype toolkit for embedding inspection.",
            "Ran moderated studies with graduate and industry participants."
          ],
          links: [{ label: "Lab", href: "https://example.com/hci" }]
        },
        techTags: ["Three.js", "D3", "TypeScript", "Figma"],
        tags: ["research", "hci", "visualization"],
        image: "/images/experience-hci.svg",
        bodyMarkdown:
          "Built prototypes comparing direct manipulation, focus+context overlays, and semantic slicing for latent-space interpretation.",
        highlights: [
          "Published internal report on latent-space interaction tradeoffs.",
          "Implemented prototype toolkit for embedding inspection.",
          "Ran moderated studies with graduate and industry participants."
        ],
        links: [{ label: "Lab", href: "https://example.com/hci" }]
      }
    ]
  },
  projects: {
    id: "projects",
    title: "Projects",
    route: "/projects",
    shortDescription:
      "Compact experiments in product quality and system constraints, designed to prove utility quickly.",
    chips: ["Full-Stack", "Hackathon", "Simulation"],
    items: [
      // TODO: Swap in project screenshots under /public/media/projects for richer card thumbnails.
      {
        id: "proj-signal-weave",
        title: "Signal Weave",
        subtitle: "Cross-source telemetry synthesis",
        year: "2025",
        dateRange: "2025",
        oneLiner:
          "Unified operational, product, and user signals into one investigation timeline.",
        media: {
          kind: "image",
          src: "/images/project-signal-weave.svg",
          alt: "Signal Weave timeline interface",
          aspect: "landscape"
        },
        details: {
          summary:
            "Built a time-aligned reasoning surface that combines logs, release deltas, and flags with sub-second drill-down.",
          bullets: [
            "Implemented typed ingestion pipeline end-to-end.",
            "Designed queryable timeline UX.",
            "Added snapshot exports for postmortem workflows."
          ],
          links: [
            { label: "GitHub", href: "https://github.com/your-handle/signal-weave" },
            { label: "Demo", href: "https://example.com/signal-weave" }
          ]
        },
        techTags: ["Next.js", "TypeScript", "tRPC", "TimescaleDB"],
        tags: ["featured", "visualization", "full-stack"],
        image: "/images/project-signal-weave.svg",
        bodyMarkdown:
          "Built a time-aligned reasoning surface that combines logs, release deltas, and flags with sub-second drill-down.",
        highlights: [
          "Implemented typed ingestion pipeline end-to-end.",
          "Designed queryable timeline UX.",
          "Added snapshot exports for postmortem workflows."
        ],
        links: [
          { label: "GitHub", href: "https://github.com/your-handle/signal-weave" },
          { label: "Demo", href: "https://example.com/signal-weave" }
        ]
      },
      {
        id: "proj-atlas-sim",
        title: "Atlas Sim",
        subtitle: "Scenario planning sandbox",
        year: "2024",
        dateRange: "2024",
        oneLiner:
          "Interactive simulation panel for policy and allocation decisions.",
        media: {
          kind: "image",
          src: "/images/project-atlas-sim.svg",
          alt: "Atlas Sim scenario sandbox",
          aspect: "landscape"
        },
        details: {
          summary:
            "Designed for explainability over complexity using constrained controls and explicit assumptions.",
          bullets: [
            "Built deterministic scenario replay with parameter diffing.",
            "Introduced assumptions ledger for model constraints.",
            "Added shareable reports for stakeholder review."
          ],
          links: [{ label: "GitHub", href: "https://github.com/your-handle/atlas-sim" }]
        },
        techTags: ["React", "TypeScript", "Zustand", "Vite"],
        tags: ["simulation", "ui", "decision-support"],
        image: "/images/project-atlas-sim.svg",
        bodyMarkdown:
          "Designed for explainability over complexity using constrained controls and explicit assumptions.",
        highlights: [
          "Built deterministic scenario replay with parameter diffing.",
          "Introduced assumptions ledger for model constraints.",
          "Added shareable reports for stakeholder review."
        ],
        links: [{ label: "GitHub", href: "https://github.com/your-handle/atlas-sim" }]
      },
      {
        id: "proj-hackathon-neurogrid",
        title: "NeuroGrid",
        subtitle: "Hackathon prototype for adaptive tutoring",
        year: "2023",
        dateRange: "2023",
        oneLiner:
          "Built in 36 hours: adaptive tutor with confidence-based guidance.",
        media: {
          kind: "logo",
          src: "/images/project-neurogrid.svg",
          alt: "NeuroGrid project mark",
          aspect: "square",
          placeholderMonogram: "NG"
        },
        details: {
          summary:
            "Fast-turnaround build emphasizing interaction pacing: confidence tracking, escalating hints, and concise remediation.",
          bullets: [
            "Shipped MVP with end-to-end onboarding in under two days.",
            "Created adaptive hinting flow tied to confidence score.",
            "Finalist placement in AI education track."
          ],
          links: [
            { label: "GitHub", href: "https://github.com/your-handle/neurogrid" },
            { label: "Devpost", href: "https://devpost.com/software/neurogrid" }
          ]
        },
        techTags: ["Next.js", "OpenAI API", "Prisma", "SQLite"],
        tags: ["hackathon", "education", "llm"],
        image: "/images/project-neurogrid.svg",
        bodyMarkdown:
          "Fast-turnaround build emphasizing interaction pacing: confidence tracking, escalating hints, and concise remediation.",
        highlights: [
          "Shipped MVP with end-to-end onboarding in under two days.",
          "Created adaptive hinting flow tied to confidence score.",
          "Finalist placement in AI education track."
        ],
        links: [
          { label: "GitHub", href: "https://github.com/your-handle/neurogrid" },
          { label: "Devpost", href: "https://devpost.com/software/neurogrid" }
        ]
      }
    ]
  },
  leadership: {
    id: "leadership",
    title: "Leadership",
    route: "/leadership",
    shortDescription:
      "I lead through technical clarity: better decision quality, clearer contracts, and reliable delivery.",
    chips: ["Mentorship", "Architecture", "Community"],
    items: [
      // TODO: For NDA-sensitive leadership work, keep logo placeholders and add approved media later.
      {
        id: "lead-studio-captain",
        title: "Engineering Studio Captain",
        subtitle: "Product Engineering Guild",
        year: "2024 - Present",
        dateRange: "2024 - Present",
        oneLiner:
          "Facilitated architecture reviews and raised implementation quality bars.",
        media: {
          kind: "logo",
          src: "/images/leadership-captain.svg",
          alt: "Engineering Studio Captain logo",
          aspect: "square",
          placeholderMonogram: "EG"
        },
        details: {
          summary:
            "Built review rituals that emphasized impact over ceremony, including risk logs and concise decision docs.",
          bullets: [
            "Mentored 8 engineers across frontend and platform tracks.",
            "Defined review templates for critical-path changes.",
            "Improved cross-team delivery predictability."
          ],
          links: [{ label: "Playbook", href: "https://example.com/leadership-playbook" }]
        },
        techTags: ["System Design", "Facilitation", "Coaching"],
        tags: ["mentorship", "architecture", "team-systems"],
        image: "/images/leadership-captain.svg",
        bodyMarkdown:
          "Built review rituals that emphasized impact over ceremony, including risk logs and concise decision docs.",
        highlights: [
          "Mentored 8 engineers across frontend and platform tracks.",
          "Defined review templates for critical-path changes.",
          "Improved cross-team delivery predictability."
        ],
        links: [{ label: "Playbook", href: "https://example.com/leadership-playbook" }]
      },
      {
        id: "lead-community-builder",
        title: "Community Builder",
        subtitle: "University Tech Collective",
        year: "2022 - 2024",
        dateRange: "2022 - 2024",
        oneLiner:
          "Organized workshops on robust frontend architecture and product thinking.",
        media: {
          kind: "logo",
          aspect: "square",
          placeholderText: "NDA",
          placeholderMonogram: "UC"
        },
        details: {
          summary:
            "Designed workshop sequences from implementation mechanics to product-level decision tradeoffs.",
          bullets: [
            "Ran 20+ sessions with 300+ attendees total.",
            "Created reusable frontend quality checklists.",
            "Connected students with open-source mentorship paths."
          ],
          links: [{ label: "Workshop Archive", href: "https://example.com/workshops" }],
          note: "Some workshop artifacts are private due to partner agreements."
        },
        techTags: ["Curriculum", "Public Speaking", "Program Design"],
        tags: ["education", "community", "frontend"],
        image: "/images/leadership-community.svg",
        bodyMarkdown:
          "Designed workshop sequences from implementation mechanics to product-level decision tradeoffs.",
        highlights: [
          "Ran 20+ sessions with 300+ attendees total.",
          "Created reusable frontend quality checklists.",
          "Connected students with open-source mentorship paths."
        ],
        links: [{ label: "Workshop Archive", href: "https://example.com/workshops" }]
      }
    ]
  },
  interests: {
    id: "interests",
    title: "Interests",
    route: "/interests",
    shortDescription:
      "My thinking map spans intelligence systems, human factors, and restrained visual communication.",
    chips: ["HCI", "Systems Thinking", "Design Engineering"],
    items: [
      {
        id: "interest-interface-economics",
        title: "Interface Economics",
        subtitle: "How constraints shape behavior",
        dateRange: "Ongoing",
        oneLiner:
          "Studying how defaults and friction alter decision quality in tools.",
        techTags: ["Research", "Systems Thinking"],
        tags: ["thinking-map", "product-systems"],
        image: "/images/interests-economics.svg",
        bodyMarkdown:
          "Exploring ambiguity tax, undo cost, and monitoring patterns that influence team behavior over time.",
        highlights: [
          "Maintains notes on interface policy patterns.",
          "Compares observability UX across production teams.",
          "Explores speed vs legibility tradeoffs."
        ],
        links: []
      },
      {
        id: "interest-applied-cognition",
        title: "Applied Cognition",
        subtitle: "Designing for bounded attention",
        dateRange: "Ongoing",
        oneLiner:
          "Designing interfaces that respect working-memory constraints.",
        techTags: ["HCI", "UX Research", "Prototyping"],
        tags: ["thinking-map", "hci"],
        image: "/images/interests-cognition.svg",
        bodyMarkdown:
          "Focusing on reduced context switching and explicit uncertainty in interface flows.",
        highlights: [
          "Applies cognitive-load heuristics to UI reviews.",
          "Builds prototypes around uncertainty visibility.",
          "Prioritizes predictability under stress."
        ],
        links: []
      },
      {
        id: "interest-computational-aesthetics",
        title: "Computational Aesthetics",
        subtitle: "Precision over spectacle",
        dateRange: "Ongoing",
        oneLiner:
          "Exploring restrained visual systems for technical storytelling.",
        techTags: ["Creative Coding", "Visual Design"],
        tags: ["thinking-map", "design-engineering"],
        image: "/images/interests-aesthetics.svg",
        bodyMarkdown:
          "Pursuing calm, high-density visual languages that communicate system state quickly without noise.",
        highlights: [
          "Experiments with low-noise visual hierarchy.",
          "Uses motion as feedback, not ornament.",
          "Balances aesthetics with operational clarity."
        ],
        links: []
      }
    ]
  },
  about: {
    id: "about",
    title: "About",
    route: "/about",
    shortDescription:
      "I build trustworthy interfaces for complex systems with an emphasis on calm interaction and long-term maintainability.",
    chips: ["Reliability", "Interaction Design", "Team Systems"],
    items: [
      {
        id: "about-thesis",
        title: "Engineering Thesis",
        subtitle: "What I optimize for",
        dateRange: "Now",
        oneLiner:
          "Reliability and clarity are product features, not afterthoughts.",
        techTags: ["TypeScript", "Systems Design"],
        tags: ["philosophy"],
        image: "/images/about-thesis.svg",
        bodyMarkdown:
          "I prefer architectures with explicit state transitions, quiet interfaces, and observable operational behavior.",
        highlights: [
          "Designs for maintainability from day one.",
          "Values typed contracts and transparent state transitions.",
          "Balances execution speed with quality gates."
        ],
        links: [
          { label: "GitHub", href: "https://github.com/your-handle" },
          { label: "LinkedIn", href: "https://linkedin.com/in/your-handle" }
        ]
      },
      {
        id: "about-collaboration",
        title: "Collaboration Style",
        subtitle: "How I work with teams",
        dateRange: "Always",
        oneLiner:
          "Direct communication, clear ownership, and concrete feedback loops.",
        techTags: ["Collaboration", "Documentation"],
        tags: ["teamwork"],
        image: "/images/about-collaboration.svg",
        bodyMarkdown:
          "I document intent, surface risks early, and keep technical decisions traceable so handoffs stay smooth.",
        highlights: [
          "Promotes clear ownership boundaries.",
          "Builds concise but complete technical docs.",
          "Prefers fast feedback over late surprises."
        ],
        links: [{ label: "Email", href: "mailto:you@example.com" }]
      }
    ]
  }
};

export const isSectionId = (value: string): value is SectionId =>
  sectionPageOrder.includes(value as SectionId);
