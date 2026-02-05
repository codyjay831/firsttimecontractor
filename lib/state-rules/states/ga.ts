import type { StateRulesDoc } from "../types";

export const GA_RULES: StateRulesDoc = {
  state: "GA",
  stateName: "Georgia",
  authorityName: "Georgia Secretary of State – Residential & General Contractors",
  authorityUrl: "https://sos.ga.gov/",
  licensingModel: "statewide",
  exams: { lawAndBusiness: true, trade: true },

  licenseTypes: [
    { id: "RB", label: "Residential Basic" },
    { id: "RLC", label: "Residential-Light Commercial" },
    { id: "GC", label: "General Contractor" },
  ],
  trades: [
    { id: "RES", label: "Residential" },
    { id: "GEN", label: "General / Commercial" },
  ],

  sections: {
    keyRules: {
      title: "Key rules for Georgia",
      bullets: [
        "Georgia has structured contractor licensing categories (e.g., Residential Basic).",
        "Applicants typically must meet eligibility requirements and complete examination steps for licensure.",
      ],
    },
    licensing: {
      title: "Licensing",
      bullets: [
        "Georgia publishes a how-to guide for residential contractors with application requirements and supporting docs.",
      ],
    },
    examFormat: {
      title: "Exam format",
      bullets: [
        "Examination is part of the licensing process for qualified applicants (with limited exemptions).",
      ],
    },
    retakes: {
      title: "Retakes",
      bullets: ["Retake rules depend on exam vendor/bulletin; verify in the official candidate/bulletin materials."],
    },
    sources: {
      title: "Sources",
      bullets: ["Georgia SOS How-To Guide and Georgia rules page for examination requirement."],
    },
  },

  sources: [
    {
      label: "Georgia SOS – Residential Contractors: How to Guide",
      url: "https://sos.ga.gov/how-to-guide/how-guide-residential-contractors",
      type: "official",
      lastVerifiedISO: "2026-01-11",
    },
    {
      label: "Georgia Rules – Qualifications for Licensure (exam requirement)",
      url: "https://rules.sos.state.ga.us/gac/553-3",
      type: "official",
      lastVerifiedISO: "2026-01-11",
    },
  ],
};
