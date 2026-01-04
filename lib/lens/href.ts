import { ResolvedLens } from "./types";

export interface BuildHrefOptions {
  base: string; // e.g., "practice", "exam"
  lens: ResolvedLens;
}

export function buildLensHref({ base, lens }: BuildHrefOptions): string {
  // Ensure base doesn't start with a slash for consistent joining
  const cleanBase = base.startsWith('/') ? base.slice(1) : base;

  // Only generate lens URLs when state AND licenseType exist
  if (!lens.state || !lens.licenseType) {
    return `/${cleanBase}`;
  }

  const state = lens.state.toLowerCase();
  const license = lens.licenseType.toLowerCase();
  
  // Only include trade segment if it exists in the resolved lens
  if (lens.trade) {
    const trade = lens.trade.toLowerCase();
    return `/${state}/${license}/${trade}/${cleanBase}`;
  }

  return `/${state}/${license}/${cleanBase}`;
}

