export type Interest = {
  id: string;
  title: string;
  description: string;
  tags?: string[];
};

export const interestsIntro =
  "These are the intellectual threads I return to across product work and systems design: recurring lenses that shape how I frame problems, scope tradeoffs, and evaluate interface decisions.";

// Add or edit items here. Keep titles concise (2-5 words) and descriptions tight.
export const interests: Interest[] = [
  {
    id: "interest-interface-economics",
    title: "Interface economics",
    description:
      "I study how defaults, friction, and action cost influence decision quality inside tools. The focus is less on visual novelty and more on whether interfaces help people make better calls under real constraints.",
    tags: ["decision quality", "defaults", "workflow design"]
  },
  {
    id: "interest-bounded-attention",
    title: "Bounded attention",
    description:
      "I am interested in how much state people can actually track at once, especially in high-noise contexts. This usually translates into explicit state transitions, careful hierarchy, and less ambiguous interaction language.",
    tags: ["cognitive load", "state clarity", "signal density"]
  },
  {
    id: "interest-operational-legibility",
    title: "Operational legibility",
    description:
      "My recurring question is whether a system can be reasoned about quickly when something is going wrong. I care about designs that preserve traceability, reveal causal structure, and reduce interpretive guesswork.",
    tags: ["observability", "traceability", "incident UX"]
  },
  {
    id: "interest-restrained-visual-systems",
    title: "Restrained visual systems",
    description:
      "I prefer visual systems where motion, contrast, and density are calibrated to support interpretation instead of decoration. The goal is a calmer surface that still communicates technical depth.",
    tags: ["visual hierarchy", "motion restraint", "precision"]
  },
  {
    id: "interest-human-ai-collaboration",
    title: "Human-AI collaboration",
    description:
      "I explore interface patterns that keep human oversight meaningful when models are involved. This includes confidence signaling, reversible actions, and interaction structures that make model behavior easier to interrogate.",
    tags: ["human in the loop", "confidence", "auditability"]
  }
];
