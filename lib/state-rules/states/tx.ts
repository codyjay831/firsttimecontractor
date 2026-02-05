import type { StateRulesDoc } from "../types";

export const TX_RULES: StateRulesDoc = {
  state: "TX",
  stateName: "Texas",
  authorityName: "Texas licensing is trade-specific (state) and local for general contractors",
  authorityUrl: "https://www.texas.gov/",
  licensingModel: "hybrid",
  exams: { lawAndBusiness: false, trade: true, vendorName: "PSI (for some TDLR exams)" },

  licenseTypes: [
    { id: "LOCAL_GC", label: "General Contractor (Local / City-based)" },
    { id: "TDLR_ELEC", label: "Electrician (TDLR)" },
    { id: "TSBPE_PL", label: "Plumbing (TSBPE)" },
    { id: "TDLR_ACR", label: "HVAC / ACR (TDLR)" },
  ],
  trades: [
    { id: "GC", label: "General Contracting (local requirements vary)" },
    { id: "ELEC", label: "Electrical (TDLR)" },
    { id: "PL", label: "Plumbing (TSBPE)" },
    { id: "ACR", label: "Air Conditioning & Refrigeration (TDLR)" },
  ],

  sections: {
    keyRules: {
      title: "Key rules for Texas",
      bullets: [
        "Texas does not have a single statewide general contractor license; many GC requirements are local/city-based.",
        "Certain trades (e.g., electrical and ACR/HVAC) have state-level licensing and exam processes through TDLR.",
        "Plumbing licensing and exams are handled through the Texas State Board of Plumbing Examiners (TSBPE).",
      ],
    },
    licensing: {
      title: "Licensing",
      bullets: [
        "Electrical: TDLR publishes exam information and eligibility/testing requirements.",
        "ACR/HVAC: TDLR publishes exam information and eligibility/testing requirements.",
        "Plumbing: TSBPE publishes license types and exam eligibility requirements.",
      ],
    },
    examFormat: {
      title: "Exam format",
      bullets: [
        "Trade exam structure depends on the license type and agency (TDLR vs TSBPE).",
        "Follow the official agency’s candidate/bulletin materials for exam-day rules and format.",
      ],
    },
    retakes: {
      title: "Retakes",
      bullets: [
        "Retake rules are exam-specific; always verify in the official candidate information for your trade/license.",
      ],
    },
    sources: {
      title: "Sources",
      bullets: ["TDLR electrician/ACR exam info pages and TSBPE license pages."],
    },
  },

  sources: [
    {
      label: "TDLR – Electrician Exam Information",
      url: "https://www.tdlr.texas.gov/electricians/elecexam.htm",
      type: "official",
      lastVerifiedISO: "2026-01-11",
    },
    {
      label: "TDLR – ACR Contractors Exam Information",
      url: "https://www.tdlr.texas.gov/acr/acrexam.htm",
      type: "official",
      lastVerifiedISO: "2026-01-11",
    },
    {
      label: "TSBPE – Journeyman Plumber (eligibility overview)",
      url: "https://tsbpe.texas.gov/license-types/journeyman/",
      type: "official",
      lastVerifiedISO: "2026-01-11",
    },
  ],
};
