// lib/state-rules/types.ts
export type StateCode = "CA" | "FL" | "TX" | "NY" | "AZ" | "VA" | "NC" | "GA" | "NV" | "CO";

export type RuleSectionKey =
  | "keyRules"
  | "licensing"
  | "examFormat"
  | "retakes"
  | "sources";

export type RuleSource = {
  label: string;          // e.g. "CSLB - Exam Application"
  url: string;            // official link when possible
  type?: "official" | "vendor" | "overview";
  lastVerifiedISO?: string; // e.g. "2026-01-11"
};

export type RuleSection = {
  title: string;     // UI accordion title
  bullets: string[]; // short, factual bullets
  notes?: string[];  // optional footnotes / caveats
};

export type StateRulesDoc = {
  state: StateCode;
  stateName: string;

  // Licensing authority (official)
  authorityName: string;
  authorityUrl: string;

  // Statewide GC licensing vs local-only (important for TX/NY/CO)
  licensingModel: "statewide" | "local" | "hybrid";

  // Exam structure flags (high-level truth)
  exams: {
    lawAndBusiness: boolean;
    trade: boolean;
    vendorName?: string; // PSI / Pearson VUE etc when known
  };

  // What the selector should offer for this state
  licenseTypes: { id: string; label: string }[];
  trades: { id: string; label: string }[];

  // Page sections
  sections: Record<RuleSectionKey, RuleSection>;

  // Sources shown at bottom
  sources: RuleSource[];
};
