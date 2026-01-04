export interface ResolvedLens {
  state: string | null;
  licenseType: string | null;
  trade: string | null;
  source: 'url' | 'store' | 'default';
}

export interface LensParams {
  state?: string;
  license?: string;
  trade?: string;
}

