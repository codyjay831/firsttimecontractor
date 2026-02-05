import type { StateRulesDoc } from "../types";

export const FL_RULES: StateRulesDoc = {
  state: "FL",
  stateName: "Florida",
  authorityName: "DBPR – Construction Industry Licensing Board",
  authorityUrl: "https://www2.myfloridalicense.com/",
  licensingModel: "statewide",
  exams: { lawAndBusiness: true, trade: true, vendorName: "Pearson VUE" },

  licenseTypes: [
    { id: "CERTIFIED", label: "Certified (Statewide)" },
    { id: "REGISTERED", label: "Registered (Local Jurisdiction)" },
  ],
  trades: [
    { id: "GC", label: "General Contractor" },
    { id: "BC", label: "Building Contractor" },
    { id: "RC", label: "Residential Contractor" },
    { id: "EC", label: "Electrical (various)" },
    { id: "PL", label: "Plumbing (various)" },
    { id: "HVAC", label: "HVAC (various)" },
  ],

  sections: {
    keyRules: {
      title: "Key rules for Florida",
      bullets: [
        "Florida construction exams include a Business & Finance component and trade knowledge components for many licenses.",
        "Florida exam scheduling is handled through the state’s testing flow and vendor.",
      ],
    },
    licensing: {
      title: "Licensing",
      bullets: [
        "Florida distinguishes between Certified (statewide privileges) and Registered (local jurisdiction) for many contractor pathways.",
      ],
    },
    examFormat: {
      title: "Exam format",
      bullets: [
        "Florida’s construction examination information indicates Business & Finance is part of construction exams and that exams are computer-based.",
        "Candidates schedule via the exam vendor after approval.",
      ],
    },
    retakes: {
      title: "Retakes",
      bullets: [
        "Retake policies depend on the specific exam and vendor rules; confirm in the official DBPR exam bulletin for your license.",
      ],
    },
    sources: {
      title: "Sources",
      bullets: ["DBPR Construction Examinations page (exam process + vendor)."],
    },
  },

  sources: [
    {
      label: "DBPR – Construction Examinations (exam info + vendor)",
      url: "https://www2.myfloridalicense.com/examination-information/construction-examinations/",
      type: "official",
      lastVerifiedISO: "2026-01-11",
    },
  ],
};
