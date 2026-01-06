"use client";

import Link from "next/link";
import { BookOpen, ClipboardCheck, Layers, RotateCcw, PlayCircle, History, Package, AlertTriangle } from "lucide-react";
import { LensHeader } from "@/components/lens/lens-header";
import { SectionCard } from "@/components/scaffold/section-card";
import { Button } from "@/components/ui/button";
import { useLens } from "@/lib/lens/use-lens";
import { buildLensHref } from "@/lib/lens/href";
import { useReview } from "@/components/review/use-review";
import { usePracticeSeed } from "@/components/practice/use-practice-seed";
import { listPacks, getActivePackId, setActivePackId, getLastPackErrors } from "@/lib/content/load-packs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { ResolvedLens } from "@/lib/lens/types";
import { ContentPack } from "@/lib/content/pack-types";

function getPackBadgeLabel(pack: Pick<ContentPack, "applicable">, lens: ResolvedLens): { label: string; variant: "default" | "secondary" | "outline" } | null {
  const { applicable } = pack;
  
  // "General" if no applicable or empty
  if (!applicable || 
      (!applicable.states?.length && 
       !applicable.licenses?.length && 
       !applicable.trades?.length)) {
    return { label: "General", variant: "outline" };
  }

  const matches: string[] = [];
  if (lens.state && applicable.states?.includes(lens.state)) {
    matches.push(lens.state);
  }
  if (lens.licenseType && applicable.licenses?.includes(lens.licenseType)) {
    matches.push(lens.licenseType);
  }
  if (lens.trade && applicable.trades?.includes(lens.trade)) {
    matches.push(lens.trade);
  }

  if (matches.length > 0) {
    return { label: "Matches your lens", variant: "secondary" };
  }

  // If it has applicable metadata but none match, we still call it general for this UI
  return { label: "General", variant: "outline" };
}

export function StudyPageContent() {
  const lens = useLens();
  const { payload } = useReview();
  const { seed } = usePracticeSeed();
  const [activePackId, setActivePackIdState] = useState("core");

  useEffect(() => {
    // Avoid SSR hydration mismatch by setting state in useEffect
    // Using setTimeout to avoid "cascading renders" lint error in some environments
    const currentPackId = getActivePackId();
    if (currentPackId !== "core") {
      const timer = setTimeout(() => {
        setActivePackIdState(currentPackId);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, []);

  const handlePackChange = (id: string) => {
    setActivePackId(id);
    setActivePackIdState(id);
  };

  const packs = listPacks();
  const packErrors = getLastPackErrors();

  const hasReview = (payload?.items?.length ?? 0) > 0;
  const hasSeed = !!seed;

  const studyModes = [
    {
      title: "Practice",
      description: "Study questions at your own pace with immediate feedback.",
      href: "/practice",
      icon: BookOpen,
      buttonText: "Start Practice",
    },
    {
      title: "Exam simulation",
      description: "Timed simulation of the actual exam environment.",
      href: "/exam",
      icon: ClipboardCheck,
      buttonText: "Take Exam",
    },
    {
      title: "Flashcards",
      description: "Quickly review key concepts and terminology.",
      href: "/flashcards",
      icon: Layers,
      buttonText: "Open Flashcards",
    },
    {
      title: "Review mistakes",
      description: "Focus on questions you've missed in past sessions.",
      href: "/review",
      icon: RotateCcw,
      buttonText: "Review Mistakes",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <LensHeader title="Study" />
        
        <div className="flex flex-col gap-2 min-w-[200px]">
          <label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5 px-1">
            <Package className="w-3.5 h-3.5" />
            Content Pack
          </label>
          <Select 
            value={activePackId} 
            onValueChange={handlePackChange}
            disabled={packs.length === 1}
          >
            <SelectTrigger className="w-full bg-background">
              <SelectValue placeholder="Select pack" />
            </SelectTrigger>
            <SelectContent>
              {packs.map((p) => {
                const badge = getPackBadgeLabel(p, lens);
                return (
                  <SelectItem key={p.packId} value={p.packId}>
                    <div className="flex items-center justify-between w-full gap-4">
                      <span>{p.title}</span>
                      {badge && (
                        <Badge variant={badge.variant} className="ml-auto text-[10px] px-1.5 py-0 h-4">
                          {badge.label}
                        </Badge>
                      )}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <p className="text-[10px] text-muted-foreground px-1 italic">
            {packs.length === 1 
              ? "Add more packs to enable switching" 
              : "Pack selection is per-tab (session only)"}
          </p>
        </div>
      </div>

      {packErrors && packErrors.length > 0 && (
        <SectionCard
          title="Content Pack Issues"
          description={`Found ${packErrors.length} potential issues in the active content pack.`}
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-md border border-destructive/20">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <p className="text-sm font-medium">Dev Warning: Invalid Content Logic</p>
            </div>
            <ul className="space-y-1.5 list-disc list-inside px-1">
              {packErrors.map((error: string, idx: number) => (
                <li key={idx} className="text-xs text-muted-foreground leading-relaxed">
                  {error}
                </li>
              ))}
            </ul>
          </div>
        </SectionCard>
      )}

      {(hasReview || hasSeed) && (
        <div className="flex flex-col gap-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground px-1">
            Continue Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hasReview && (
              <SectionCard 
                title="Continue Review" 
                description={`You have ${payload?.items.length} items waiting for review from your last session.`}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-center p-8 bg-primary/5 rounded-lg">
                    <History className="w-12 h-12 text-primary opacity-80" />
                  </div>
                  <Button asChild className="w-full" variant="default">
                    <Link href={buildLensHref({ base: "/review", lens })}>
                      Resume Review
                    </Link>
                  </Button>
                </div>
              </SectionCard>
            )}
            {hasSeed && (
              <SectionCard 
                title="Start Seeded Practice" 
                description={`A custom practice session is ready with ${seed.questions.length} questions.`}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-center p-8 bg-primary/5 rounded-lg">
                    <PlayCircle className="w-12 h-12 text-primary opacity-80" />
                  </div>
                  <Button asChild className="w-full" variant="default">
                    <Link href={buildLensHref({ base: "/practice", lens })}>
                      Start Practice
                    </Link>
                  </Button>
                </div>
              </SectionCard>
            )}
          </div>
          <div className="h-2" /> {/* Spacer */}
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground px-1">
            All Study Modes
          </h2>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {studyModes.map((mode) => (
          <SectionCard 
            key={mode.href} 
            title={mode.title} 
            description={mode.description}
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-center p-8 bg-muted/50 rounded-lg">
                <mode.icon className="w-12 h-12 text-primary opacity-80" />
              </div>
              <Button asChild className="w-full">
                <Link href={buildLensHref({ base: mode.href, lens })}>
                  {mode.buttonText}
                </Link>
              </Button>
            </div>
          </SectionCard>
        ))}
      </div>
    </div>
  );
}
