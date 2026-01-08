"use client";

import { useLens } from "@/lib/lens/use-lens";
import { TopContextSelector } from "@/components/top-context-selector";
import { MapPin } from "lucide-react";

export function LensPrompt() {
  const lens = useLens();

  // Don't show if lens has selection
  if (lens.state && lens.licenseType) return null;

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border mb-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground shrink-0">
        <MapPin className="h-4 w-4" />
        <span>Choose a license to personalize</span>
      </div>
      <TopContextSelector />
    </div>
  );
}
