import type { StateRulesDoc } from "../types";

export const AZ_RULES: StateRulesDoc = {
  state: "AZ",
  stateName: "Arizona",
  authorityName: "Arizona Registrar of Contractors (ROC)",
  authorityUrl: "https://roc.az.gov/",
  licensingModel: "statewide",
  exams: { lawAndBusiness: true, trade: true },

  licenseTypes: [
    { id: "R", label: "Residential" },
    { id: "C", label: "Commercial" },
    { id: "CR", label: "Dual (Residential + Commercial)" },
  ],
  trades: [
    { id: "B", label: "General (varies by classification)" },
    { id: "ELEC", label: "Electrical (classification-based)" },
    { id: "PL", label: "Plumbing (classification-based)" },
    { id: "HVAC", label: "HVAC (classification-based)" },
  ],

  sections: {
    keyRules: {
      title: "Key rules for Arizona",
      bullets: [
        "Arizona ROC requires the Statutes & Rules Training Course and Exam (SRE) for the qualifying party.",
        "Arizona ROC also requires a trade exam specific to the license classification.",
      ],
    },
    licensing: {
      title: "Licensing",
      bullets: [
        "The qualifying party completes ROC’s statutes/rules requirement and the relevant trade exam as part of the process.",
      ],
    },
    examFormat: {
      title: "Exam format",
      bullets: [
        "Arizona’s licensing process includes a statutes/rules exam plus a classification-specific trade exam.",
      ],
    },
    retakes: {
      title: "Retakes",
      bullets: ["Confirm retake policies in ROC guidance and the testing vendor rules for the exam you’re taking."],
    },
    sources: {
      title: "Sources",
      bullets: ["Arizona ROC – Applying for a License page."],
    },
  },

  sources: [
    {
      label: "Arizona ROC – Applying for a License (SRE + trade exam)",
      url: "https://roc.az.gov/applying-for-a-license",
      type: "official",
      lastVerifiedISO: "2026-01-11",
    },
  ],
};
