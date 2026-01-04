"use client";

import { ResolvedLens } from "@/lib/lens/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface LensChipsProps {
  lens: ResolvedLens;
  className?: string;
  chipClassName?: string;
}

export function LensChips({ lens, className, chipClassName }: LensChipsProps) {
  if (!lens.state && !lens.licenseType) return null;

  return (
    <div className={cn("flex flex-wrap items-center gap-1.5", className)}>
      {lens.state && (
        <Badge variant="secondary" className={cn("h-5 px-1.5 text-[10px] font-bold", chipClassName)}>
          {lens.state}
        </Badge>
      )}
      {lens.licenseType && (
        <Badge variant="outline" className={cn("h-5 px-1.5 text-[10px]", chipClassName)}>
          {lens.licenseType}
        </Badge>
      )}
      {lens.trade && (
        <Badge variant="outline" className={cn("h-5 px-1.5 text-[10px]", chipClassName)}>
          {lens.trade}
        </Badge>
      )}
    </div>
  );
}

