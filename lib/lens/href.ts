import { ResolvedLens } from "./types";

// Known page segments that indicate the end of lens segments
const KNOWN_PAGES = new Set([
  "study",
  "practice",
  "exam",
  "flashcards",
  "review",
  "state-rules",
]);

/**
 * Parse lens from pathname.
 * Lensed routes: /:state/:licenseType/:page or /:state/:licenseType/:trade/:page
 * Returns null if pathname is not lensed.
 */
export function lensFromPathname(pathname: string): ResolvedLens | null {
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length < 2) {
    return null;
  }

  // Check if segment 2 (index 1) or segment 3 (index 2) is a known page
  // Pattern: /:state/:licenseType/:page → segments[2] is page
  // Pattern: /:state/:licenseType/:trade/:page → segments[3] is page

  if (segments.length >= 3 && KNOWN_PAGES.has(segments[2])) {
    // /:state/:licenseType/:page
    return {
      state: segments[0].toLowerCase(),
      licenseType: segments[1].toLowerCase(),
      trade: null,
      source: "url",
    };
  }

  if (segments.length >= 4 && KNOWN_PAGES.has(segments[3])) {
    // /:state/:licenseType/:trade/:page
    return {
      state: segments[0].toLowerCase(),
      licenseType: segments[1].toLowerCase(),
      trade: segments[2].toLowerCase(),
      source: "url",
    };
  }

  return null;
}

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

