"use client";

import { LensHeader } from "@/components/lens/lens-header";
import { LensPrompt } from "@/components/lens/lens-prompt";
import { SectionCard } from "@/components/scaffold/section-card";
import { useLens } from "@/lib/lens/use-lens";
import { ChevronDown, ExternalLink } from "lucide-react";
import { getStateRules } from "@/lib/state-rules";

export function StateRulesPageContent() {
  const lens = useLens();
  const stateCode = lens?.state?.toUpperCase?.() ?? null;
  const doc = getStateRules(stateCode);

  // If nothing selected or state not found, keep current UI + placeholder
  if (!doc) {
    const locationLabel = [lens.state, lens.licenseType].filter(Boolean).join(" / ") || "State / License";
    return (
      <div className="flex flex-col gap-5">
        <LensHeader title="State rules" />
        <LensPrompt />

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

  const locationLabel = [doc.stateName, lens.licenseType, lens.trade].filter(Boolean).join(" / ");

  return (
    <div className="flex flex-col gap-5">
      <LensHeader title="State rules" />
      <LensPrompt />

      <SectionCard title={`Key rules for ${locationLabel}`}>
        <ul className="list-disc pl-5 space-y-2">
          {doc.sections.keyRules.bullets.map((b, i) => (
            <li key={i} className="text-sm text-muted-foreground">
              {b}
            </li>
          ))}
        </ul>
      </SectionCard>

      <div className="space-y-4">
        {[
          { key: "licensing", title: "Licensing" },
          { key: "examFormat", title: "Exam format" },
          { key: "retakes", title: "Retakes" },
        ].map((item) => {
          const section = doc.sections[item.key as keyof typeof doc.sections];
          return (
            <div key={item.title} className="rounded-lg border bg-card">
              <div className="flex items-center justify-between p-4 cursor-default">
                <span className="font-medium text-sm">{item.title}</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="px-4 pb-4">
                <ul className="list-disc pl-5 space-y-2 border-l-2 border-primary/20 py-1">
                  {section.bullets.map((b, i) => (
                    <li key={i} className="text-sm text-muted-foreground">
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      <SectionCard title="Sources">
        <div className="space-y-3">
          {doc.sources.map((s) => (
            <div key={s.url} className="flex items-start justify-between gap-4 rounded-md bg-muted/30 p-3">
              <div className="space-y-1">
                <div className="font-medium text-sm">{s.label}</div>
                {s.lastVerifiedISO ? (
                  <div className="text-[10px] text-muted-foreground italic">
                    Last verified: {s.lastVerifiedISO}
                  </div>
                ) : null}
              </div>
              <a 
                href={s.url} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs text-primary underline underline-offset-4 hover:text-primary/80"
              >
                Open <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
