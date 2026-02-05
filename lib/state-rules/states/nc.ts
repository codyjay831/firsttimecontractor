import type { StateRulesDoc } from "../types";

export const NC_RULES: StateRulesDoc = {
  state: "NC",
  stateName: "North Carolina",
  authorityName: "NC Licensing Board for General Contractors (NCLBGC)",
  authorityUrl: "https://nclbgc.org/",
  licensingModel: "statewide",
  exams: { lawAndBusiness: true, trade: true },

  licenseTypes: [
    { id: "LIMITED", label: "Limited" },
    { id: "INTERMEDIATE", label: "Intermediate" },
    { id: "UNLIMITED", label: "Unlimited" },
  ],
  trades: [
    { id: "GC", label: "General Contractor" },
    { id: "COMM", label: "Commercial (pathways vary)" },
  ],

  sections: {
    keyRules: {
      title: "Key rules for North Carolina",
      bullets: [
        "North Carolina licenses are tiered by limitation level (Limited / Intermediate / Unlimited).",
      ],
    },
    licensing: {
      title: "Licensing",
      bullets: [
        "The board publishes limitations and related requirements; confirm which limitation level fits your work scope.",
      ],
    },
    examFormat: {
      title: "Exam format",
      bullets: [
        "Exam requirements and accepted pathways can vary; confirm current exam pathway requirements with the board.",
      ],
    },
    retakes: {
      title: "Retakes",
      bullets: ["Retake policies depend on board/testing rules; verify with board guidance for your exam pathway."],
    },
    sources: {
      title: "Sources",
      bullets: ["NCLBGC classifications/limitations page."],
    },
  },

  sources: [
    {
      label: "NCLBGC – Classifications and limitations",
      url: "https://nclbgc.org/classifications-and-limitations/",
      type: "official",
      lastVerifiedISO: "2026-01-11",
    },
  ],
};
