import type { StateRulesDoc } from "../types";

export const CA_RULES: StateRulesDoc = {
  state: "CA",
  stateName: "California",
  authorityName: "Contractors State License Board (CSLB)",
  authorityUrl: "https://www.cslb.ca.gov/",
  licensingModel: "statewide",
  exams: { lawAndBusiness: true, trade: true, vendorName: "PSI (testing vendor)" },

  licenseTypes: [
    { id: "A", label: "A – General Engineering" },
    { id: "B", label: "B – General Building" },
    { id: "C", label: "C – Specialty" },
  ],
  trades: [
    { id: "C-10", label: "C-10 Electrical" },
    { id: "C-36", label: "C-36 Plumbing" },
    { id: "C-20", label: "C-20 HVAC" },
    { id: "C-61", label: "C-61 Limited Specialty" },
  ],

  sections: {
    keyRules: {
      title: "Key rules for California",
      bullets: [
        "California contractor licensure is handled at the state level by CSLB.",
        "Examination is generally two-part: Law & Business + trade exam (with limited exceptions).",
      ],
    },
    licensing: {
      title: "Licensing",
      bullets: [
        "Applicants must meet CSLB eligibility requirements and submit an exam application.",
        "CSLB describes qualifying experience expectations as part of the exam application process.",
      ],
    },
    examFormat: {
      title: "Exam format",
      bullets: [
        "CSLB states the exam process includes Law & Business plus a trade exam for most classifications.",
      ],
    },
    retakes: {
      title: "Retakes",
      bullets: [
        "Retake rules and scheduling are handled through the CSLB process/testing vendor workflow.",
        "Always confirm current retake timing/fees in the official CSLB/PSI candidate materials.",
      ],
    },
    sources: {
      title: "Sources",
      bullets: ["CSLB exam application pages and CSLB exam study overview."],
    },
  },

  sources: [
    {
      label: "CSLB – Apply for a Contractors License (Exam Required)",
      url: "https://www.cslb.ca.gov/contractors/applicants/contractors_license/exam_application/",
      type: "official",
      lastVerifiedISO: "2026-01-11",
    },
    {
      label: "CSLB – Studying for the Examination (Law & Business + trade)",
      url: "https://www.cslb.ca.gov/contractors/applicants/contractors_license/exam_application/Studying_For_Exam.aspx",
      type: "official",
      lastVerifiedISO: "2026-01-11",
    },
  ],
};
