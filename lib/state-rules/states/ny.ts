import type { StateRulesDoc } from "../types";

export const NY_RULES: StateRulesDoc = {
  state: "NY",
  stateName: "New York",
  authorityName: "New York licensing is largely local (city/county) for contractors",
  authorityUrl: "https://ag.ny.gov/",
  licensingModel: "local",
  exams: { lawAndBusiness: false, trade: false },

  licenseTypes: [
    { id: "NYC_HIC", label: "NYC Home Improvement Contractor (local)" },
    { id: "COUNTY_HIC", label: "County Home Improvement Contractor (varies)" },
    { id: "LOCAL_TRADE", label: "Local Trade Licenses (varies)" },
  ],
  trades: [
    { id: "HIC", label: "Home Improvement Contracting (local)" },
    { id: "ELEC", label: "Electrical (local)" },
    { id: "PL", label: "Plumbing (local)" },
    { id: "HVAC", label: "HVAC (local)" },
  ],

  sections: {
    keyRules: {
      title: "Key rules for New York",
      bullets: [
        "New York contractor licensing commonly occurs at the city/county level rather than statewide.",
        "Home improvement contractor licensing is required in NYC and several counties (confirm your jurisdiction).",
      ],
    },
    licensing: {
      title: "Licensing",
      bullets: [
        "NYC has its own Home Improvement Contractor license checklist and application requirements.",
        "Other counties may require local home improvement licenses—verify your county/city requirements.",
      ],
    },
    examFormat: {
      title: "Exam format",
      bullets: [
        "Exam requirements vary by local jurisdiction; some areas require testing, others focus on registration/bonding/insurance.",
      ],
    },
    retakes: {
      title: "Retakes",
      bullets: ["If an exam applies in your local jurisdiction, retake policies will be local/vendor-specific."],
    },
    sources: {
      title: "Sources",
      bullets: ["NYC Home Improvement Contractor license checklist and NY Attorney General consumer guidance."],
    },
  },

  sources: [
    {
      label: "NYC – Home Improvement Contractor License Checklist",
      url: "https://www.nyc.gov/site/dca/businesses/license-checklist-home-improvement-contractor.page",
      type: "official",
      lastVerifiedISO: "2026-01-11",
    },
    {
      label: "NY Attorney General – Home Improvement Fact Sheet (licensing note)",
      url: "https://ag.ny.gov/home-improvement-fact-sheet",
      type: "official",
      lastVerifiedISO: "2026-01-11",
    },
  ],
};
