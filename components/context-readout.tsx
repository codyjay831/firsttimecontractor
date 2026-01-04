"use client";

import { useTopContext } from "@/lib/top-context/use-top-context";
import { STATES, LICENSE_TYPES, TRADES } from "@/lib/top-context/types";

export function ContextReadout() {
  const { state, licenseType, trade } = useTopContext();

  const stateLabel = STATES.find((s) => s.value === state)?.label || "None";
  const licenseLabel = LICENSE_TYPES.find((lt) => lt.value === licenseType)?.label || "None";
  const tradeLabel = TRADES.find((t) => t.value === trade)?.label || "None";

  return (
    <div className="rounded-md border border-border bg-muted/50 p-4 text-sm mb-6">
      <h2 className="mb-2 font-semibold">Active Context</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <span className="text-muted-foreground">State:</span>{" "}
          <span className="font-medium text-foreground">{stateLabel}</span>
        </div>
        <div>
          <span className="text-muted-foreground">License:</span>{" "}
          <span className="font-medium text-foreground">{licenseLabel}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Trade:</span>{" "}
          <span className="font-medium text-foreground">{tradeLabel}</span>
        </div>
      </div>
    </div>
  );
}

