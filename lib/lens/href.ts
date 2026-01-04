import { ResolvedLens } from "./types";

export interface BuildHrefOptions {
  base: string; // e.g., "practice", "exam"
  lens: ResolvedLens;
}

export function buildLensHref({ base, lens }: BuildHrefOptions): string {
  // Ensure base doesn't start with a slash for consistent joining
  const cleanBase = base.startsWith('/') ? base.slice(1) : base;

  // If we don't have enough context for a lens route, return the standard route
  if (!lens.state || !lens.licenseType) {
    return `/${cleanBase}`;
  }

  const state = lens.state.toLowerCase();
  const license = lens.licenseType.toLowerCase();
  
  if (lens.trade) {
    const trade = lens.trade.toLowerCase();
    return `/${state}/${license}/${trade}/${cleanBase}`;
  }

  return `/${state}/${license}/${cleanBase}`;
}

