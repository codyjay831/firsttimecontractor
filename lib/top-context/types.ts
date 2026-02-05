// lib/top-context/types.ts

export type State = string | null;
export type LicenseType = string | null;
export type Trade = string | null;

export interface TopContextState {
  state: State;
  licenseType: LicenseType;
  trade: Trade;
}

export const DEFAULT_CONTEXT: TopContextState = {
  state: null,
  licenseType: null,
  trade: null,
};

export const STORAGE_KEY = "ftc-top-context";
export const STORAGE_VERSION = "1.0";

export interface StoredContext extends TopContextState {
  version: string;
}

export const STATES = [
  { id: "CA", label: "California" },
  { id: "FL", label: "Florida" },
  { id: "TX", label: "Texas" },
  { id: "NY", label: "New York" },
  { id: "AZ", label: "Arizona" },
  { id: "VA", label: "Virginia" },
  { id: "NC", label: "North Carolina" },
  { id: "GA", label: "Georgia" },
  { id: "NV", label: "Nevada" },
  { id: "CO", label: "Colorado" },
] as const;

// Keep existing placeholder lists for backwards compatibility
export const LICENSE_TYPES = [
  { id: "NO_LICENSE", label: "No License" },
];

export const TRADES = [
  { id: "NONE", label: "No Trade" },
];

// NEW: per-state license types (drives selector once you wire it)
export const LICENSE_TYPES_BY_STATE: Record<string, { id: string; label: string }[]> = {
  CA: [
    { id: "A", label: "A – General Engineering" },
    { id: "B", label: "B – General Building" },
    { id: "C", label: "C – Specialty" },
  ],
  FL: [
    { id: "CERTIFIED", label: "Certified (Statewide)" },
    { id: "REGISTERED", label: "Registered (Local)" },
  ],
  TX: [
    { id: "LOCAL_GC", label: "General Contractor (Local)" },
    { id: "TDLR_ELEC", label: "Electrician (TDLR)" },
    { id: "TSBPE_PL", label: "Plumbing (TSBPE)" },
    { id: "TDLR_ACR", label: "HVAC / ACR (TDLR)" },
  ],
  NY: [
    { id: "NYC_HIC", label: "NYC Home Improvement Contractor" },
    { id: "COUNTY_HIC", label: "County Home Improvement (varies)" },
    { id: "LOCAL_TRADE", label: "Local Trade Licenses (varies)" },
  ],
  AZ: [
    { id: "R", label: "Residential" },
    { id: "C", label: "Commercial" },
    { id: "CR", label: "Dual (Residential + Commercial)" },
  ],
  VA: [
    { id: "A", label: "Class A" },
    { id: "B", label: "Class B" },
    { id: "C", label: "Class C" },
  ],
  NC: [
    { id: "LIMITED", label: "Limited" },
    { id: "INTERMEDIATE", label: "Intermediate" },
    { id: "UNLIMITED", label: "Unlimited" },
  ],
  GA: [
    { id: "RB", label: "Residential Basic" },
    { id: "RLC", label: "Residential-Light Commercial" },
    { id: "GC", label: "General Contractor" },
  ],
  NV: [
    { id: "A", label: "Class A – General Engineering" },
    { id: "B", label: "Class B – General Building" },
    { id: "C", label: "Class C – Specialty" },
  ],
  CO: [
    { id: "LOCAL_GC", label: "General Contractor (Local)" },
    { id: "CO_ELEC", label: "Electrical (State)" },
    { id: "CO_PL", label: "Plumbing (State)" },
  ],
};

export const TRADES_BY_STATE: Record<string, { id: string; label: string }[]> = {
  CA: [
    { id: "C-10", label: "C-10 Electrical" },
    { id: "C-36", label: "C-36 Plumbing" },
    { id: "C-20", label: "C-20 HVAC" },
  ],
  FL: [
    { id: "GC", label: "General" },
    { id: "RES", label: "Residential" },
    { id: "ELEC", label: "Electrical" },
    { id: "PL", label: "Plumbing" },
    { id: "HVAC", label: "HVAC" },
  ],
  TX: [
    { id: "GC", label: "General (Local)" },
    { id: "ELEC", label: "Electrical (TDLR)" },
    { id: "PL", label: "Plumbing (TSBPE)" },
    { id: "ACR", label: "HVAC / ACR (TDLR)" },
  ],
  NY: [
    { id: "HIC", label: "Home Improvement (Local)" },
    { id: "ELEC", label: "Electrical (Local)" },
    { id: "PL", label: "Plumbing (Local)" },
  ],
  AZ: [
    { id: "GEN", label: "General (classification-based)" },
    { id: "ELEC", label: "Electrical" },
    { id: "PL", label: "Plumbing" },
    { id: "HVAC", label: "HVAC" },
  ],
  VA: [{ id: "GEN", label: "General / Specialty (classification-based)" }],
  NC: [{ id: "GC", label: "General Contractor" }],
  GA: [{ id: "RES", label: "Residential / General" }],
  NV: [{ id: "GEN", label: "A/B/C + specialties (classification-based)" }],
  CO: [
    { id: "GC", label: "General (Local)" },
    { id: "ELEC", label: "Electrical (State)" },
    { id: "PL", label: "Plumbing (State)" },
  ],
};
