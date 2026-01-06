"use client";

import Link from "next/link";
import { BookOpen, ClipboardCheck, Layers, RotateCcw, PlayCircle, History, Package, AlertTriangle, Compass, CheckCircle2 } from "lucide-react";
import { LensHeader } from "@/components/lens/lens-header";
import { SectionCard } from "@/components/scaffold/section-card";
import { Button } from "@/components/ui/button";
import { useLens } from "@/lib/lens/use-lens";
import { buildLensHref } from "@/lib/lens/href";
import { useReview } from "@/components/review/use-review";
import { usePracticeSeed } from "@/components/practice/use-practice-seed";
import { getActivePackId, setActivePackId, getLastPackErrors, getPackTotalQuestions, listPacks } from "@/lib/content/load-packs";
import { getPackProgressStats, calculateReadinessScore } from "@/lib/content/progress";
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

  const isLensEmpty = !lens.state && !lens.licenseType && !lens.trade;
  
  // Suggested path logic
  const suggestedPath: { packId: string; title: string; reason: string }[] = [];
  
  if (lens.state === "CA") {
    const pack = packs.find(p => p.packId === "core-ca") || 
                 packs.find(p => p.packId.startsWith("core") && p.applicable?.states?.includes("CA"));
    if (pack) {
      suggestedPath.push({ packId: pack.packId, title: pack.title, reason: "Matches CA" });
    }
  }

  if (lens.licenseType === "C10") {
    const pack = packs.find(p => p.packId === "c10-ca") || 
                 packs.find(p => p.applicable?.licenses?.includes("C10"));
    if (pack) {
      if (!suggestedPath.find(p => p.packId === pack.packId)) {
        suggestedPath.push({ packId: pack.packId, title: pack.title, reason: "Matches C10" });
      }
    }
  }

  if (suggestedPath.length === 0) {
    const defaultPack = packs.find(p => p.packId === activePackId) || packs.find(p => p.packId === "core") || packs[0];
    if (defaultPack) {
      suggestedPath.push({ 
        packId: defaultPack.packId, 
        title: defaultPack.title, 
        reason: isLensEmpty ? "Start with Core" : "General starter pack" 
      });
    }
  }

  const hasReview = (payload?.items?.length ?? 0) > 0;
  const hasSeed = !!seed;

  const readinessScore = calculateReadinessScore(packs);

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
                const stats = getPackProgressStats(p.packId, getPackTotalQuestions(p.packId));
                return (
                  <SelectItem key={p.packId} value={p.packId}>
                    <div className="flex items-center justify-between w-full gap-4">
                      <div className="flex flex-col">
                        <span>{p.title}</span>
                        <span className="text-[10px] text-muted-foreground">
                          {stats.percent}% complete ({stats.answeredCount}/{stats.totalQuestions})
                        </span>
                      </div>
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

      <SectionCard 
        title="Exam Readiness" 
        description="Estimated based on your practice and exam accuracy."
      >
        <div className="flex flex-col gap-6 py-2">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative flex items-center justify-center">
              <svg className="w-32 h-32 transform -rotate-90">
                <circle
                  cx="64"
                  cy="64"
                  r="58"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-muted/30"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="58"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={2 * Math.PI * 58}
                  strokeDashoffset={2 * Math.PI * 58 * (1 - readinessScore / 100)}
                  className="text-primary transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold">{readinessScore}%</span>
                <span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-tighter">Ready</span>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-muted-foreground">Core Knowledge (40%)</span>
                    <span>{(() => {
                      const corePacks = packs.filter(p => p.packId.toLowerCase().includes("core"));
                      let totalAcc = 0;
                      let count = 0;
                      corePacks.forEach(p => {
                        const stats = getPackProgressStats(p.packId, getPackTotalQuestions(p.packId));
                        if (stats.answeredCount > 0) {
                          totalAcc += stats.accuracy;
                          count++;
                        }
                      });
                      return count > 0 ? Math.round(totalAcc / count) : 0;
                    })()}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary/60 transition-all duration-500" 
                      style={{ width: `${(() => {
                        const corePacks = packs.filter(p => p.packId.toLowerCase().includes("core"));
                        let totalAcc = 0;
                        let count = 0;
                        corePacks.forEach(p => {
                          const stats = getPackProgressStats(p.packId, getPackTotalQuestions(p.packId));
                          if (stats.answeredCount > 0) {
                            totalAcc += stats.accuracy;
                            count++;
                          }
                        });
                        return count > 0 ? Math.round(totalAcc / count) : 0;
                      })()}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-muted-foreground">Trade Knowledge (60%)</span>
                    <span>{(() => {
                      const tradePacks = packs.filter(p => !p.packId.toLowerCase().includes("core"));
                      let totalAcc = 0;
                      let count = 0;
                      tradePacks.forEach(p => {
                        const stats = getPackProgressStats(p.packId, getPackTotalQuestions(p.packId));
                        if (stats.answeredCount > 0) {
                          totalAcc += stats.accuracy;
                          count++;
                        }
                      });
                      return count > 0 ? Math.round(totalAcc / count) : 0;
                    })()}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary/60 transition-all duration-500" 
                      style={{ width: `${(() => {
                        const tradePacks = packs.filter(p => !p.packId.toLowerCase().includes("core"));
                        let totalAcc = 0;
                        let count = 0;
                        tradePacks.forEach(p => {
                          const stats = getPackProgressStats(p.packId, getPackTotalQuestions(p.packId));
                          if (stats.answeredCount > 0) {
                            totalAcc += stats.accuracy;
                            count++;
                          }
                        });
                        return count > 0 ? Math.round(totalAcc / count) : 0;
                      })()}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="p-3 bg-muted/30 rounded-md border border-border/50">
                <p className="text-xs text-muted-foreground leading-relaxed italic">
                  <strong>Note:</strong> This score is an advisory estimate based on your performance in Practice and Exam modes across both general contractor laws (Core) and trade-specific questions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

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
        </div>
      )}

      <div className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground px-1 flex items-center gap-2">
          <Compass className="w-4 h-4" />
          Recommended sequence
        </h2>
        <SectionCard 
          title="Suggested path" 
          description="Follow this ordered sequence of packs to prepare for your license."
        >
          <div className="flex flex-col gap-3">
            {suggestedPath.map((step, idx) => (
              <div 
                key={step.packId} 
                className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg transition-colors ${
                  activePackId === step.packId 
                    ? "bg-primary/5 border-primary/20" 
                    : "bg-muted/30 border-border hover:bg-muted/50"
                }`}
              >
                <div className="flex items-center gap-4 mb-3 sm:mb-0">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full shrink-0 font-bold text-sm ${
                    activePackId === step.packId 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-muted-foreground/20 text-muted-foreground"
                  }`}>
                    {idx + 1}
                  </div>
                  <div>
                    <div className="font-semibold flex items-center gap-2">
                      {step.title}
                      {activePackId === step.packId && (
                        <Badge variant="secondary" className="text-[10px] h-4 px-1.5">Active</Badge>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">{step.reason}</div>
                    
                    {/* Progress Bar for Suggested Path */}
                    {(() => {
                      const stats = getPackProgressStats(step.packId, getPackTotalQuestions(step.packId));
                      return (
                        <div className="flex flex-col gap-1.5 w-full sm:w-48">
                          <div className="flex justify-between text-[10px] font-medium text-muted-foreground">
                            <span>Progress</span>
                            <span>{stats.percent}%</span>
                          </div>
                          <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary transition-all duration-500" 
                              style={{ width: `${stats.percent}%` }}
                            />
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
                
                <div className="flex items-center gap-2 sm:ml-4">
                  {activePackId === step.packId ? (
                    <div className="flex items-center gap-1.5 text-xs font-medium text-primary px-3 py-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      Currently selected
                    </div>
                  ) : (
                    <Button 
                      size="sm" 
                      onClick={() => handlePackChange(step.packId)}
                      variant="outline"
                      className="w-full sm:w-auto"
                    >
                      Select pack
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
        <div className="h-2" /> {/* Spacer */}
      </div>
      
      <div className="flex flex-col gap-4">
        {(hasReview || hasSeed || suggestedPath.length > 0) && (
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground px-1">
            All Study Modes
          </h2>
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
    </div>
  );
}
