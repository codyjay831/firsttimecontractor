"use client";

import { ResolvedLens } from "@/lib/lens/types";
import { cn } from "@/lib/utils";

interface SourceIndicatorProps {
  source: ResolvedLens["source"];
  className?: string;
}

export function SourceIndicator({ source, className }: SourceIndicatorProps) {
  const getLabel = () => {
    switch (source) {
      case "url":
        return "From URL";
      case "store":
        return "From Top Context";
      case "default":
        return "No Lens";
      default:
        return "";
    }
  };

  return (
    <span className={cn("text-[10px] font-medium text-muted-foreground uppercase tracking-wider", className)}>
      {getLabel()}
    </span>
  );
}

