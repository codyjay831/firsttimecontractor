"use client";

import { useLens } from "@/lib/lens/use-lens";
import { STATES, LICENSE_TYPES, TRADES } from "@/lib/top-context/types";
import { Badge } from "@/components/ui/badge";

export function LensReadout() {
  const lens = useLens();

  const stateLabel = STATES.find((s) => s.value === lens.state)?.label || lens.state || "None";
  const licenseLabel = LICENSE_TYPES.find((lt) => lt.value === lens.licenseType)?.label || lens.licenseType || "None";
  const tradeLabel = TRADES.find((t) => t.value === lens.trade)?.label || lens.trade || "None";

  return (
    <div className="rounded-md border border-border bg-muted/50 p-4 text-sm mb-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-semibold">Resolved Lens</h2>
        <Badge variant="outline" className="text-[10px] uppercase">
          Source: {lens.source}
        </Badge>
      </div>
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

