import type {
  AccordionEntry,
  EditorialBodySection,
  SectionId,
  SectionPageDefinition
} from "@/content/editorialTypes";

export type {
  AccordionEntry,
  AccordionMedia,
  AccordionSections,
  CaseStudySection,
  EditorialBodySection,
  EditorialLink,
  EditorialMedia,
  HeroMedia,
  ProjectCaseStudy,
  SectionId,
  SectionPageDefinition
} from "@/content/editorialTypes";

export const sectionPageOrder: SectionId[] = [
  "experience",
  "projects",
  "leadership",
  "interests",
  "about"
];

const experienceItems: AccordionEntry[] = [
  {
    id: "exp-neural-systems",
    role: "Frontend Engineer",
    org: "Neural Systems Lab",
    dates: "2024 - Present",
    tags: ["frontend", "observability", "real-time"],
    summary:
      "Built operator-facing interfaces for model observability and experiment control where response time and confidence under pressure mattered equally.",
    body: [
      "The team needed a front-end surface that could keep up with streaming evaluation telemetry without collapsing into noise. The challenge was as much about trust as speed: operators needed to feel confident that what they were seeing matched system reality.",
      "I designed and implemented a calmer observability console with typed event contracts and deterministic replay tooling. The UI focused on explicit state transitions and consistent event semantics so operational discussions could stay concrete.",
      "Over time this reduced ambiguity in incident reviews and made experimentation workflows materially easier to reason about across engineering and research partners."
    ],
    sections: {
      context: [
        "Existing tools rendered plenty of information but offered weak narrative continuity, which made high-pressure debugging brittle."
      ],
      whatIBuilt: [
        "A browser-based control surface with stream-safe rendering, replay, and traceable state derivation.",
        "Shared front-end/back-end event typing to lower drift across system boundaries."
      ],
      results: [
        "Interaction latency dropped during active runs, and reliability reviews shifted from guesswork to reproducible evidence."
      ]
    },
    impactBullets: [
      "Improved operator confidence during live experiments.",
      "Reduced ambiguity during reliability reviews.",
      "Established a reusable event-contract pattern for future tools."
    ],
    media: {
      type: "image",
      src: "/images/experience-neural.svg",
      alt: "Neural Systems Lab logo"
    },
    links: [{ label: "Organization", href: "https://example.com/neural" }]
  },
  {
    id: "exp-infra-ux",
    role: "Product Engineer",
    org: "Infrastructure Platform Team",
    dates: "2022 - 2024",
    tags: ["platform", "developer-experience", "ui"],
    summary:
      "Delivered deployment-safety and service-ownership tools that made risky operational work more legible across platform and application teams.",
    body: [
      "Platform workflows existed, but the interface layer around them was fragmented and easy to misread under pressure. Most issues were not missing features; they were missing clarity.",
      "I rebuilt core deployment and ownership touchpoints with clearer state models, service boundaries, and release context. Health signals, rollout progress, and owner metadata became first-class UI elements.",
      "The result was a safer release posture and a better on-call experience, because teams could interpret system state faster and act with less uncertainty."
    ],
    sections: {
      context: [
        "The existing internal tooling had high functional coverage but low interpretability in time-sensitive scenarios."
      ],
      whatIBuilt: [
        "Deployment and ownership surfaces designed around explicit risk signals.",
        "Interaction flows that prioritized quick triage and clearer accountability."
      ],
      results: [
        "More predictable delivery windows and fewer avoidable rollout failures."
      ]
    },
    impactBullets: [
      "Reduced failed deploy incidents.",
      "Improved service ownership visibility.",
      "Lowered cognitive load during on-call handoffs."
    ],
    media: {
      type: "image",
      src: "/images/experience-infra.svg",
      alt: "Infrastructure platform visualization"
    },
    links: [{ label: "Case Notes", href: "https://example.com/infra-notes" }]
  },
  {
    id: "exp-research-assistant",
    role: "Research Assistant",
    org: "Human-Computer Interaction Studio",
    dates: "2021 - 2022",
    tags: ["research", "hci", "visualization"],
    summary:
      "Prototyped interaction models for interpreting high-dimensional model behavior and translating abstract uncertainty into usable interface choices.",
    body: [
      "My research focused on how people inspect latent-space and model-behavior transitions without getting overwhelmed by abstraction. The key question was which visual and interaction metaphors actually improved reasoning quality.",
      "I built and tested prototypes in Three.js and D3, comparing different focus and slicing approaches with both academic and industry participants.",
      "This work strengthened my bias toward restrained systems UI: expose uncertainty honestly, but keep the interaction model calm and legible."
    ],
    sections: {
      context: [
        "Complex model behavior is often difficult to communicate because most visualizations prioritize novelty over interpretability."
      ],
      whatIBuilt: [
        "Rapid prototypes for focus-plus-context exploration.",
        "Evaluation workflows that compared interaction metaphors under real analysis tasks."
      ],
      results: [
        "Clearer recommendations for interface patterns that support faster and more reliable model inspection."
      ]
    },
    media: {
      type: "image",
      src: "/images/experience-hci.svg",
      alt: "HCI studio sample visualization"
    },
    links: [{ label: "Lab", href: "https://example.com/hci" }]
  }
];

const leadershipItems: AccordionEntry[] = [
  {
    id: "lead-studio-captain",
    role: "Engineering Studio Captain",
    org: "Product Engineering Guild",
    dates: "2024 - Present",
    tags: ["mentorship", "architecture", "team-systems"],
    summary:
      "Facilitated architecture reviews and raised implementation quality bars through better technical framing rather than more process overhead.",
    body: [
      "This role centered on decision quality. Teams needed architecture and implementation reviews that increased clarity without creating ceremonial friction.",
      "I introduced a review cadence built around explicit tradeoff framing, decision logs, and risk narratives that could be consumed by both builders and reviewers.",
      "As a result, teams moved faster through critical decisions while keeping better alignment on long-term system consequences."
    ],
    sections: {
      context: [
        "Cross-team delivery was slowing when important technical choices were not documented in a reusable way."
      ],
      whatIBuilt: [
        "A lightweight architecture review model with clear decision artifacts.",
        "Mentorship loops tied to implementation quality rather than checklist compliance."
      ],
      results: [
        "Higher consistency in technical decisions and fewer late-stage architectural reversals."
      ]
    },
    impactBullets: [
      "Improved architecture decision traceability.",
      "Reduced review-cycle churn.",
      "Raised mentoring quality across teams."
    ],
    media: {
      type: "image",
      src: "/images/leadership-captain.svg",
      alt: "Engineering Studio Captain mark"
    },
    links: [{ label: "Playbook", href: "https://example.com/leadership-playbook" }]
  },
  {
    id: "lead-community-builder",
    role: "Community Builder",
    org: "University Tech Collective",
    dates: "2022 - 2024",
    tags: ["education", "community", "frontend"],
    summary:
      "Organized workshops and learning paths around robust frontend architecture, technical judgment, and product-level thinking.",
    body: [
      "The challenge was not just running events; it was building repeatable learning pathways that connected implementation mechanics to product outcomes.",
      "I designed workshop tracks, reusable quality frameworks, and mentorship handoffs so participants could keep growing after the initial sessions.",
      "This created a more durable community learning loop and reinforced my approach to leadership through clarity and transferability."
    ],
    sections: {
      context: [
        "Most learning events were one-off and lacked continuity between sessions."
      ],
      whatIBuilt: [
        "Progressive workshop structure with practical architecture themes.",
        "Reusable engineering checklists and follow-up guidance."
      ],
      results: [
        "Higher participant retention and better translation of workshop content into real project practice."
      ]
    },
    media: {
      type: "placeholder",
      alt: "NDA leadership project placeholder"
    },
    note:
      "Some workshop artifacts remain private because they were developed with partner organizations.",
    links: [{ label: "Workshop Archive", href: "https://example.com/workshops" }]
  }
];

const interestsSections: EditorialBodySection[] = [
  {
    id: "interests-interface-economics",
    heading: "Interface economics",
    body:
      "A recurring thread in my work is how interface constraints shape behavior. I am interested in the way defaults, friction, ambiguity, and undo cost influence decision quality inside tools. That interest shows up in operational dashboards just as much as it does in consumer-facing flows."
  },
  {
    id: "interests-applied-cognition",
    heading: "Applied cognition",
    body:
      "I spend a lot of time thinking about bounded attention: what people can realistically hold in working memory, what kinds of state transitions remain legible under stress, and how interfaces can expose uncertainty without overwhelming the person using them."
  },
  {
    id: "interests-aesthetics",
    heading: "Restrained visual systems",
    body:
      "I like technical visuals that feel precise rather than decorative. Motion should reinforce system state, visual hierarchy should lower interpretation cost, and density should come from useful information rather than ornamental complexity."
  }
];

const aboutSections: EditorialBodySection[] = [
  {
    id: "about-thesis",
    heading: "What I optimize for",
    body:
      "I care about interfaces for complex systems, especially when the product has to balance reliability, technical depth, and a calm user experience. I prefer architectures with explicit state transitions, typed contracts, and operational visibility because they tend to age better under real usage."
  },
  {
    id: "about-collaboration",
    heading: "How I work",
    body:
      "I work best in environments where technical arguments are concrete, ownership is clear, and feedback loops are short. I document intent, surface risks early, and try to make handoffs smoother by keeping decisions traceable instead of implicit."
  },
  {
    id: "about-links",
    heading: "Where to find me",
    body:
      "Outside the site, the easiest places to reach me are GitHub, LinkedIn, and email. I am especially interested in work that sits at the boundary of product quality, system clarity, and restrained interaction design."
  }
];

export const sectionPages: Record<SectionId, SectionPageDefinition> = {
  experience: {
    id: "experience",
    title: "Experience",
    route: "/experience",
    dek:
      "I build products where interaction quality and system reliability must both hold under pressure.",
    chips: ["Frontend Systems", "Observability", "Real-Time UX"],
    intro:
      "Most of my work has lived at the boundary between interface design and operational truth. I care about products that stay readable under stress, and I tend to work on systems where state, timing, and trust all matter at once.",
    items: experienceItems
  },
  projects: {
    id: "projects",
    title: "Projects",
    route: "/projects",
    dek:
      "Compact experiments in product quality and system constraints, designed to prove utility quickly.",
    chips: ["Full-Stack", "Hackathon", "Simulation"],
    intro:
      "Projects are where I test interaction models, technical constraints, and product hypotheses in a tighter loop. The goal is usually not scale on day one. It is to make one idea concrete enough to evaluate honestly."
  },
  leadership: {
    id: "leadership",
    title: "Leadership",
    route: "/leadership",
    dek:
      "I lead through technical clarity: better decision quality, clearer contracts, and reliable delivery.",
    chips: ["Mentorship", "Architecture", "Community"],
    intro:
      "Leadership, for me, is mostly a question of reducing ambiguity for other people. I try to create conditions where decisions are more legible, tradeoffs are more explicit, and teams can move with less unnecessary friction.",
    items: leadershipItems
  },
  interests: {
    id: "interests",
    title: "Interests",
    route: "/interests",
    dek:
      "My thinking map spans intelligence systems, human factors, and restrained visual communication.",
    chips: ["HCI", "Systems Thinking", "Design Engineering"],
    intro:
      "The work on this site is held together by a few recurring interests: how interfaces shape behavior, how people reason under constraint, and how technical visuals can communicate with more precision and less noise.",
    sections: interestsSections
  },
  about: {
    id: "about",
    title: "About",
    route: "/about",
    dek:
      "I build trustworthy interfaces for complex systems with an emphasis on calm interaction and long-term maintainability.",
    chips: ["Reliability", "Interaction Design", "Team Systems"],
    intro:
      "I am interested in building software that stays coherent as systems get more complex. That usually means caring about state, communication, maintainability, and how interaction design influences trust over time.",
    sections: aboutSections
  }
};

export const isSectionId = (value: string): value is SectionId =>
  sectionPageOrder.includes(value as SectionId);
