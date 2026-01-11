"use client";

import { useLens } from "@/lib/lens/use-lens";
import { LensChips } from "./lens-chips";
import { SourceIndicator } from "./source-indicator";
import { Breadcrumbs } from "./breadcrumbs";

interface LensHeaderProps {
  title: string;
}

export function LensHeader({ title }: LensHeaderProps) {
  const lens = useLens();

  return (
    <div className="flex flex-col gap-4 mb-5">
      <Breadcrumbs />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <SourceIndicator source={lens.source} />
        </div>
        <LensChips lens={lens} />
      </div>
    </div>
  );
}

