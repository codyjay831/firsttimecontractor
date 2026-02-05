// lib/state-rules/index.ts
import type { StateCode, StateRulesDoc } from "./types";

import { CA_RULES } from "./states/ca";
import { FL_RULES } from "./states/fl";
import { TX_RULES } from "./states/tx";
import { NY_RULES } from "./states/ny";
import { AZ_RULES } from "./states/az";
import { VA_RULES } from "./states/va";
import { NC_RULES } from "./states/nc";
import { GA_RULES } from "./states/ga";
import { NV_RULES } from "./states/nv";
import { CO_RULES } from "./states/co";

export const STATE_RULES: Record<StateCode, StateRulesDoc> = {
  CA: CA_RULES,
  FL: FL_RULES,
  TX: TX_RULES,
  NY: NY_RULES,
  AZ: AZ_RULES,
  VA: VA_RULES,
  NC: NC_RULES,
  GA: GA_RULES,
  NV: NV_RULES,
  CO: CO_RULES,
};

export function getStateRules(state: string | null | undefined): StateRulesDoc | null {
  if (!state) return null;
  const key = state.toUpperCase() as StateCode;
  return STATE_RULES[key] ?? null;
}
