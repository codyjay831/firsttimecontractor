import type { StateRulesDoc } from "../types";

export const VA_RULES: StateRulesDoc = {
  state: "VA",
  stateName: "Virginia",
  authorityName: "Virginia DPOR – Board for Contractors",
  authorityUrl: "https://www.dpor.virginia.gov/Boards/Contractors",
  licensingModel: "statewide",
  exams: { lawAndBusiness: true, trade: true, vendorName: "PSI (exam bulletin exists)" },

  licenseTypes: [
    { id: "A", label: "Class A" },
    { id: "B", label: "Class B" },
    { id: "C", label: "Class C" },
  ],
  trades: [
    { id: "GEN", label: "General / Building (classification-based)" },
    { id: "SPEC", label: "Specialty (classification-based)" },
  ],

  sections: {
    keyRules: {
      title: "Key rules for Virginia",
      bullets: [
        "Virginia DPOR indicates pre-license education is required for new contractor licenses and is separate from Class A/B examinations.",
      ],
    },
    licensing: {
      title: "Licensing",
      bullets: [
        "Virginia licensing is class-based (A/B/C). Always confirm class limits and requirements in DPOR materials for your classification.",
      ],
    },
    examFormat: {
      title: "Exam format",
      bullets: [
        "Exam and pre-license education requirements are described by DPOR; candidate exam bulletins may be published via the testing vendor flow.",
      ],
    },
    retakes: {
      title: "Retakes",
      bullets: ["Retake and scheduling rules depend on vendor/bulletin; confirm in DPOR/PSI candidate materials."],
    },
    sources: {
      title: "Sources",
      bullets: ["Virginia DPOR Board for Contractors page and application instructions."],
    },
  },

  sources: [
    {
      label: "Virginia DPOR – Board for Contractors",
      url: "https://www.dpor.virginia.gov/Boards/Contractors",
      type: "official",
      lastVerifiedISO: "2026-01-11",
    },
    {
      label: "Virginia DPOR – Contractor Application Instructions (PDF)",
      url: "https://www.dpor.virginia.gov/sites/default/files/boards/Contractors/Contractor%20Application%20Instructions.pdf",
      type: "official",
      lastVerifiedISO: "2026-01-11",
    },
  ],
};
