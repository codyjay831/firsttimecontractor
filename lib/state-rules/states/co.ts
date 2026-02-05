import type { StateRulesDoc } from "../types";

export const CO_RULES: StateRulesDoc = {
  state: "CO",
  stateName: "Colorado",
  authorityName: "Colorado DORA (state-regulated trades) + local for general contractors",
  authorityUrl: "https://dpo.colorado.gov/",
  licensingModel: "hybrid",
  exams: { lawAndBusiness: false, trade: true },

  licenseTypes: [
    { id: "LOCAL_GC", label: "General Contractor (Local / City-based)" },
    { id: "CO_ELEC", label: "Electrical (State Electrical Board)" },
    { id: "CO_PL", label: "Plumbing (State Plumbing Board)" },
  ],
  trades: [
    { id: "GC", label: "General Contracting (local)" },
    { id: "ELEC", label: "Electrical (state)" },
    { id: "PL", label: "Plumbing (state)" },
  ],

  sections: {
    keyRules: {
      title: "Key rules for Colorado",
      bullets: [
        "Colorado does not require a statewide general contractor license; GC licensing is commonly local.",
        "Colorado does require state-issued licenses for plumbing and electrical (through DORA boards).",
      ],
    },
    licensing: {
      title: "Licensing",
      bullets: [
        "Electrical licensing requirements and applications are published by Colorado’s Electrical Board (DORA).",
        "Plumbing licensing requirements and applications are published by Colorado’s Plumbing Board (DORA).",
      ],
    },
    examFormat: {
      title: "Exam format",
      bullets: [
        "Exam requirements depend on the trade license type; confirm the current exam path in official DORA board materials.",
      ],
    },
    retakes: {
      title: "Retakes",
      bullets: ["Retake rules follow the board/vendor policies for the specific trade exam; verify in official board guidance."],
    },
    sources: {
      title: "Sources",
      bullets: ["Colorado DORA Electrical Applications page and Plumbing Applications page."],
    },
  },

  sources: [
    {
      label: "Colorado DORA – Electrical: Applications and Forms",
      url: "https://dpo.colorado.gov/Electrical/Applications",
      type: "official",
      lastVerifiedISO: "2026-01-11",
    },
    {
      label: "Colorado DORA – Plumbing: Applications and Forms",
      url: "https://dpo.colorado.gov/Plumbing/Applications",
      type: "official",
      lastVerifiedISO: "2026-01-11",
    },
  ],
};
