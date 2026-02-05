import type { StateRulesDoc } from "../types";

export const NV_RULES: StateRulesDoc = {
  state: "NV",
  stateName: "Nevada",
  authorityName: "Nevada State Contractors Board (NSCB)",
  authorityUrl: "https://www.nvcontractorsboard.com/",
  licensingModel: "statewide",
  exams: { lawAndBusiness: true, trade: true },

  licenseTypes: [
    { id: "A", label: "Class A – General Engineering" },
    { id: "B", label: "Class B – General Building" },
    { id: "C", label: "Class C – Specialty" },
  ],
  trades: [
    { id: "ELEC", label: "Electrical (classification-specific)" },
    { id: "PL", label: "Plumbing (classification-specific)" },
    { id: "HVAC", label: "HVAC (classification-specific)" },
    { id: "OTHER", label: "Other specialties (classification-based)" },
  ],

  sections: {
    keyRules: {
      title: "Key rules for Nevada",
      bullets: [
        "Nevada requires a Business and Law (CMS) exam and a trade exam for the requested classification.",
      ],
    },
    licensing: {
      title: "Licensing",
      bullets: [
        "Board verifies experience; eligibility letter is issued after application processing, then exams are scheduled.",
      ],
    },
    examFormat: {
      title: "Exam format",
      bullets: [
        "Applicants must pass the Business & Law (CMS) exam and a classification-specific trade exam.",
      ],
    },
    retakes: {
      title: "Retakes",
      bullets: ["Retake rules depend on board/vendor policies; confirm in NSCB exam guidance."],
    },
    sources: {
      title: "Sources",
      bullets: ["NSCB license examinations page."],
    },
  },

  sources: [
    {
      label: "NSCB – License Examinations (CMS + trade exam)",
      url: "https://www.nvcontractorsboard.com/licensing/license-examinations/",
      type: "official",
      lastVerifiedISO: "2026-01-11",
    },
    {
      label: "NSCB – License Requirements (exam requirements overview)",
      url: "https://www.nvcontractorsboard.com/licensing/license-requirements/",
      type: "official",
      lastVerifiedISO: "2026-01-11",
    },
  ],
};
