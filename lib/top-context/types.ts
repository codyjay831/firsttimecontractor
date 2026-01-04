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

// Placeholder data for the selector
export const STATES = [
  { value: "CA", label: "California" },
  { value: "FL", label: "Florida" },
  { value: "NY", label: "New York" },
  { value: "TX", label: "Texas" },
];

export const LICENSE_TYPES = [
  { value: "GEN_A", label: "General Engineering (A)" },
  { value: "GEN_B", label: "General Building (B)" },
  { value: "SPEC_C", label: "Specialty (C)" },
];

export const TRADES = [
  { value: "C10", label: "Electrical (C-10)" },
  { value: "C36", label: "Plumbing (C-36)" },
  { value: "C20", label: "HVAC (C-20)" },
];

