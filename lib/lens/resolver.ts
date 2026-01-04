import { ResolvedLens, LensParams } from "./types";
import { TopContextState } from "../top-context/types";

export function normalizeParam(param: string | undefined): string | null {
  if (!param || param === "none") return null;
  return param.toUpperCase();
}

export function resolveLens(
  params: LensParams,
  store: TopContextState
): ResolvedLens {
  const urlState = normalizeParam(params.state);
  const urlLicense = normalizeParam(params.license);
  const urlTrade = normalizeParam(params.trade);

  // If we have at least state and license in the URL, prioritize URL
  if (urlState && urlLicense) {
    return {
      state: urlState,
      licenseType: urlLicense,
      trade: urlTrade,
      source: 'url',
    };
  }

  // Fallback to store
  if (store.state && store.licenseType) {
    return {
      state: store.state,
      licenseType: store.licenseType,
      trade: store.trade,
      source: 'store',
    };
  }

  // Fallback to defaults
  return {
    state: null,
    licenseType: null,
    trade: null,
    source: 'default',
  };
}

