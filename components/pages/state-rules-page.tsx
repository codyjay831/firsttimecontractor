"use client";

import { LensHeader } from "@/components/lens/lens-header";
import { SectionCard } from "@/components/scaffold/section-card";
import { useLens } from "@/lib/lens/use-lens";
import { ChevronDown, ExternalLink } from "lucide-react";

export function StateRulesPageContent() {
  const lens = useLens();
  const locationLabel = [lens.state, lens.licenseType].filter(Boolean).join(" / ") || "State / License";

  return (
    <div className="flex flex-col gap-6">
      <LensHeader title="State rules" />

      <SectionCard title={`Key rules for ${locationLabel}`}>
        <p className="text-sm text-muted-foreground">
          Detailed regulatory requirements and examination rules for your selected jurisdiction.
        </p>
      </SectionCard>

      <div className="space-y-4">
        {[
          { title: "Licensing", content: "Details about licensing requirements, experience needed, and application fees." },
          { title: "Exam format", content: "Number of questions, time limit, and passing score requirements." },
          { title: "Retakes", content: "Waiting periods and fees for retaking the examination." },
        ].map((item) => (
          <div key={item.title} className="rounded-lg border bg-card">
            <div className="flex items-center justify-between p-4 cursor-not-allowed">
              <span className="font-medium text-sm">{item.title}</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="px-4 pb-4">
              <p className="text-sm text-muted-foreground border-l-2 border-primary/20 pl-3 py-1">
                {item.content}
              </p>
            </div>
          </div>
        ))}
      </div>

      <SectionCard title="Sources">
        <div className="space-y-2">
          <div className="flex items-center justify-between rounded-md bg-muted/50 p-3 opacity-70">
            <span className="text-sm font-medium">Official Board Website</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </div>
          <p className="text-[10px] text-muted-foreground italic px-1">
            Last verified: Jan 3, 2026
          </p>
        </div>
      </SectionCard>
    </div>
  );
}

