"use client";

import { useState } from "react";
import { LensHeader } from "@/components/lens/lens-header";
import { LensPrompt } from "@/components/lens/lens-prompt";
import { PracticeSession } from "@/components/practice/practice-session";
import { 
  listPacks, 
  getActivePackId, 
  getPracticeQuestionsForPack 
} from "@/lib/content/load-packs";
import { PracticeQuestion } from "@/lib/practice/types";
import { getAllRepetitionMetadata, GlobalRepetition } from "@/lib/content/progress";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/scaffold/section-card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Shuffle, Play, RotateCcw, BookOpen, Package, Check, Percent } from "lucide-react";
import { ActionRow } from "@/components/scaffold/action-row";
import { EmptyState } from "@/components/scaffold/empty-state";
import { usePracticeSeed } from "@/components/practice/use-practice-seed";
import { useLens } from "@/lib/lens/use-lens";
import { useEffect, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { getSessionAnalytics } from "@/lib/analytics/answer-analytics";
import { HardModeSuggestion } from "@/components/practice/hard-mode-suggestion";

function fisherYatesShuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function PracticePageContent() {
  const lens = useLens();
  const packs = listPacks();
  const { seed, clearPracticeSeed } = usePracticeSeed();
  const [isStarted, setIsStarted] = useState(false);
  const [count, setCount] = useState("10");
  const [shuffle, setShuffle] = useState(false);
  const [selectedPackIds, setSelectedPackIds] = useState<string[]>([]);
  const [packWeights, setPackWeights] = useState<Record<string, number>>({});
  const [sessionQuestions, setSessionQuestions] = useState<PracticeQuestion[]>([]);
  const [sessionKey, setSessionKey] = useState(0);

  const [hardModeActive, setHardModeActive] = useState(false);
  const [suggestionDismissed, setSuggestionDismissed] = useState(false);

  const [allRepetition, setAllRepetition] = useState<GlobalRepetition>({});
  const [now, setNow] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    window.requestAnimationFrame(() => {
      setAllRepetition(getAllRepetitionMetadata());
      setNow(Date.now());
      setIsHydrated(true);
    });
  }, []);

  const packStats = useMemo(() => {
    if (!isHydrated) return packs.map(p => ({ packId: p.packId, dueCount: 0, newCount: 0 }));
    
    return packs.map(p => {
      const packQuestions = getPracticeQuestionsForPack(p.packId);
      const dueCount = packQuestions.filter(q => {
        const meta = allRepetition[q.id];
        return meta && meta.nextEligibleAt > 0 && meta.nextEligibleAt <= now;
      }).length;
      const newCount = packQuestions.filter(q => !allRepetition[q.id]).length;
      return { packId: p.packId, dueCount, newCount };
    });
  }, [packs, allRepetition, now, isHydrated]);

  const shouldSuggestHardMode = useMemo(() => {
    if (!isHydrated || suggestionDismissed || hardModeActive || seed) return false;

    // Trigger A: Practice accuracy on MEDIUM >= 75%
    // Trigger C: User completed a practice session with >= 60% HARD questions answered correctly
    const analytics = getSessionAnalytics();
    const mediumStats = analytics.missedByDifficulty.find(d => d.difficulty === "medium");
    const hardStats = analytics.missedByDifficulty.find(d => d.difficulty === "hard");

    const triggerA = !!(mediumStats && mediumStats.accuracy >= 75 && mediumStats.total >= 5);
    const triggerC = !!(hardStats && hardStats.accuracy >= 60 && hardStats.total >= 5);

    if (!triggerA && !triggerC) return false;

    // Safety check: HARD questions must be available in selected packs
    const hasHardQuestions = selectedPackIds.some(id => 
      getPracticeQuestionsForPack(id).some(q => q.difficulty === "hard")
    );

    return hasHardQuestions;
  }, [isHydrated, suggestionDismissed, hardModeActive, seed, selectedPackIds]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const activePackId = getActivePackId();
    const initialSelected = new Set<string>([activePackId]);

    // Pre-check recommended packs if lens is present
    const isLensEmpty = !lens.state && !lens.licenseType && !lens.trade;
    if (!isLensEmpty) {
      packs.forEach(p => {
        const { applicable } = p;
        if (!applicable) return;
        
        const stateMatch = lens.state && applicable.states?.includes(lens.state);
        const licenseMatch = lens.licenseType && applicable.licenses?.includes(lens.licenseType);
        const tradeMatch = lens.trade && applicable.trades?.includes(lens.trade);
        
        if (stateMatch || licenseMatch || tradeMatch) {
          initialSelected.add(p.packId);
        }
      });
    }

    const selectedIds = Array.from(initialSelected);
    const timer = setTimeout(() => {
      setSelectedPackIds(selectedIds);
      // Initialize weights
      const initialWeights: Record<string, number> = {};
      const evenWeight = Math.floor(100 / selectedIds.length);
      selectedIds.forEach((id, idx) => {
        initialWeights[id] = idx === selectedIds.length - 1 ? 100 - (evenWeight * (selectedIds.length - 1)) : evenWeight;
      });
      setPackWeights(initialWeights);
    }, 0);
    return () => clearTimeout(timer);
  }, [lens, packs]);

  const togglePack = (packId: string) => {
    setSelectedPackIds(prev => {
      const next = prev.includes(packId) 
        ? prev.filter(id => id !== packId) 
        : [...prev, packId];
      
      // Update weights automatically
      if (next.length > 0) {
        const evenWeight = Math.floor(100 / next.length);
        const nextWeights: Record<string, number> = {};
        next.forEach((id, idx) => {
          nextWeights[id] = idx === next.length - 1 ? 100 - (evenWeight * (next.length - 1)) : evenWeight;
        });
        setPackWeights(nextWeights);
      } else {
        setPackWeights({});
      }
      
      return next;
    });
  };

  const setWeight = (packId: string, weight: number) => {
    setPackWeights(prev => ({
      ...prev,
      [packId]: Math.max(0, Math.min(100, weight))
    }));
  };

  const handleStart = () => {
    if (seed) {
      setSessionQuestions(seed.questions);
      clearPracticeSeed();
      setIsStarted(true);
      return;
    }

    const N = parseInt(count);
    const selectedQuestions: PracticeQuestion[] = [];
    const seenIds = new Set<string>();

    // 1. Calculate proportions
    const sumWeights = Object.values(packWeights).reduce((a, b) => a + b, 0) || 1;
    const targets: Record<string, number> = {};
    let runningSum = 0;
    
    selectedPackIds.forEach((id, idx) => {
      if (idx === selectedPackIds.length - 1) {
        targets[id] = N - runningSum;
      } else {
        const target = Math.round(N * (packWeights[id] / sumWeights));
        targets[id] = target;
        runningSum += target;
      }
    });

    // 2. Select from each pack
    const allRepetition = getAllRepetitionMetadata();
    const now = Date.now();

    selectedPackIds.forEach(id => {
      const packPool = getPracticeQuestionsForPack(id);
      const targetCount = targets[id];
      let added = 0;
      
      if (hardModeActive) {
        // Hard-heavy mix: 60% Hard / 30% Medium / 10% Easy
        const diffTargets = [
          { diff: "hard", target: Math.round(targetCount * 0.6) },
          { diff: "medium", target: Math.round(targetCount * 0.3) },
          { diff: "easy", target: targetCount - Math.round(targetCount * 0.6) - Math.round(targetCount * 0.3) }
        ];

        // Ensure we pick correctly from each difficulty pool
        diffTargets.forEach(({ diff, target }) => {
          if (target <= 0) return;
          
          const pool = packPool.filter(q => {
            if (diff === "easy") return q.difficulty === "easy" || !q.difficulty;
            return q.difficulty === diff;
          });

          let diffAdded = 0;
          
          // Priority 1: Due
          const due = fisherYatesShuffle(pool.filter(q => {
            const meta = allRepetition[q.id];
            return meta && meta.nextEligibleAt <= now;
          }));
          for (const q of due) {
            if (diffAdded >= target || added >= targetCount) break;
            if (!seenIds.has(q.id)) {
              selectedQuestions.push(q);
              seenIds.add(q.id);
              added++;
              diffAdded++;
            }
          }

          // Priority 2: New
          if (diffAdded < target && added < targetCount) {
            const newQs = fisherYatesShuffle(pool.filter(q => !allRepetition[q.id]));
            for (const q of newQs) {
              if (diffAdded >= target || added >= targetCount) break;
              if (!seenIds.has(q.id)) {
                selectedQuestions.push(q);
                seenIds.add(q.id);
                added++;
                diffAdded++;
              }
            }
          }

          // Priority 3: Remaining in this pool
          if (diffAdded < target && added < targetCount) {
            const remaining = fisherYatesShuffle(pool.filter(q => !seenIds.has(q.id)));
            for (const q of remaining) {
              if (diffAdded >= target || added >= targetCount) break;
              selectedQuestions.push(q);
              seenIds.add(q.id);
              added++;
              diffAdded++;
            }
          }
        });

        // Fallback for this pack if targets weren't met (e.g. not enough hard questions)
        if (added < targetCount) {
          const remainingInPack = fisherYatesShuffle(packPool.filter(q => !seenIds.has(q.id)));
          for (const q of remainingInPack) {
            if (added >= targetCount) break;
            selectedQuestions.push(q);
            seenIds.add(q.id);
            added++;
          }
        }
      } else {
        // 2a. Prioritize due questions (eligible and seen before)
        const dueQuestions = fisherYatesShuffle(packPool.filter(q => {
          const meta = allRepetition[q.id];
          return meta && meta.nextEligibleAt <= now;
        }));

        for (const q of dueQuestions) {
          if (added >= targetCount) break;
          if (!seenIds.has(q.id)) {
            selectedQuestions.push(q);
            seenIds.add(q.id);
            added++;
          }
        }

        // 2b. Then new questions (never seen)
        if (added < targetCount) {
          const newQuestions = fisherYatesShuffle(packPool.filter(q => !allRepetition[q.id]));
          for (const q of newQuestions) {
            if (added >= targetCount) break;
            if (!seenIds.has(q.id)) {
              selectedQuestions.push(q);
              seenIds.add(q.id);
              added++;
            }
          }
        }

        // 2c. Finally, fill with the rest (even if not due)
        if (added < targetCount) {
          const remainingPool = fisherYatesShuffle(packPool.filter(q => !seenIds.has(q.id)));
          for (const q of remainingPool) {
            if (added >= targetCount) break;
            selectedQuestions.push(q);
            seenIds.add(q.id);
            added++;
          }
        }
      }
    });

    // 3. Fallback: If we have less than N (shortages or dedupes), fill from any remaining
    if (selectedQuestions.length < N) {
      const allPacksCombined = fisherYatesShuffle(selectedPackIds.flatMap(id => getPracticeQuestionsForPack(id)));
      for (const q of allPacksCombined) {
        if (selectedQuestions.length >= N) break;
        if (!seenIds.has(q.id)) {
          selectedQuestions.push(q);
          seenIds.add(q.id);
        }
      }
    }

    // 4. Final shuffle if enabled
    let finalPool = selectedQuestions;
    if (shuffle) {
      finalPool = fisherYatesShuffle(finalPool);
    }

    setSessionQuestions(finalPool);
    setIsStarted(true);
  };

  const handleNewSession = () => {
    setIsStarted(false);
    setHardModeActive(false);
    setSessionKey(prev => prev + 1);
  };

  return (
    <div className="flex flex-col gap-6">
      <LensHeader title="Practice" />
      <LensPrompt />
      
      {!isStarted ? (
        <div className="space-y-6">
          <HardModeSuggestion 
            visible={shouldSuggestHardMode}
            onAccept={() => setHardModeActive(true)}
            onDismiss={() => setSuggestionDismissed(true)}
          />

          {seed ? (
            <SectionCard 
              title="Custom Practice Set" 
              description="A practice session based on your Review items."
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-sm text-primary font-medium">
                  <BookOpen className="h-4 w-4" />
                  Custom practice set (from Review)
                </div>
                <div className="text-sm text-muted-foreground">
                  This session will include all <strong>{seed.questions.length}</strong> items from your review list in their original order.
                </div>
                <div className="pt-2">
                  <Button variant="outline" size="sm" onClick={clearPracticeSeed} className="gap-2">
                    <RotateCcw className="h-3.5 w-3.5" />
                    Back to presets
                  </Button>
                </div>
              </div>
            </SectionCard>
          ) : (
            <SectionCard 
              title="Session Configuration" 
              description="Customize your practice session before starting."
            >
              <div className="flex flex-col gap-8">
                <div className="space-y-3">
                  <div className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                    <Package className="h-4 w-4" />
                    Question Sources
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {packs.map((p) => {
                      const isSelected = selectedPackIds.includes(p.packId);
                      const isRecommended = !(!lens.state && !lens.licenseType && !lens.trade) && (
                        (lens.state && p.applicable?.states?.includes(lens.state)) ||
                        (lens.licenseType && p.applicable?.licenses?.includes(lens.licenseType)) ||
                        (lens.trade && p.applicable?.trades?.includes(lens.trade))
                      );

                      const stats = packStats.find(s => s.packId === p.packId);
                      const dueCount = stats?.dueCount ?? 0;
                      const newCount = stats?.newCount ?? 0;

                      return (
                        <div key={p.packId} className="flex flex-col gap-1.5">
                          <button
                            onClick={() => togglePack(p.packId)}
                            className={`flex items-center justify-between p-3 rounded-md border text-sm transition-colors ${
                              isSelected 
                                ? "bg-primary/5 border-primary/50 text-primary font-medium" 
                                : "bg-background border-input hover:bg-accent hover:text-accent-foreground text-muted-foreground"
                            }`}
                          >
                            <div className="flex items-center gap-2 text-left">
                              <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                                isSelected ? "bg-primary border-primary" : "bg-transparent border-input"
                              }`}>
                                {isSelected && <Check className="h-3 w-3 text-primary-foreground" />}
                              </div>
                              <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                  <span>{p.title}</span>
                                  {dueCount > 0 && (
                                    <Badge variant="secondary" className="h-4 px-1 text-[9px] bg-orange-100 text-orange-700 hover:bg-orange-100 border-none">
                                      {dueCount} Due
                                    </Badge>
                                  )}
                                  {newCount > 0 && dueCount === 0 && (
                                    <Badge variant="secondary" className="h-4 px-1 text-[9px] bg-blue-100 text-blue-700 hover:bg-blue-100 border-none">
                                      New
                                    </Badge>
                                  )}
                                </div>
                                {isRecommended && (
                                  <span className="text-[10px] text-primary/70 font-normal">Recommended</span>
                                )}
                              </div>
                            </div>
                          </button>
                          
                          {isSelected && (
                            <div className="flex items-center gap-2 px-1">
                              <div className="flex items-center gap-1.5 text-[10px] font-medium text-muted-foreground uppercase tracking-wider shrink-0">
                                <Percent className="w-2.5 h-2.5" />
                                Weight
                              </div>
                              <input 
                                type="number" 
                                min="0" 
                                max="100" 
                                value={packWeights[p.packId] ?? 0}
                                onChange={(e) => setWeight(p.packId, parseInt(e.target.value) || 0)}
                                className="w-full h-7 text-xs bg-muted/30 border border-border rounded px-2 focus:outline-none focus:ring-1 focus:ring-primary/50"
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  {selectedPackIds.length === 0 && (
                    <p className="text-xs text-destructive font-medium">Please select at least one pack.</p>
                  )}
                </div>

                <div className="flex flex-col gap-6 sm:flex-row sm:items-end">
                  <div className="space-y-2 flex-1">
                    <div className="text-sm font-medium text-muted-foreground">Number of Questions</div>
                    <Select value={count} onValueChange={setCount}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select count" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10 Questions</SelectItem>
                        <SelectItem value="25">25 Questions</SelectItem>
                        <SelectItem value="50">50 Questions</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-medium text-muted-foreground">Question Order</div>
                    <Button 
                      variant={shuffle ? "default" : "outline"} 
                      onClick={() => setShuffle(!shuffle)}
                      className="w-full gap-2 justify-start sm:justify-center"
                    >
                      <Shuffle className="h-4 w-4" />
                      {shuffle ? "Shuffled" : "Sequential"}
                    </Button>
                  </div>
                </div>
              </div>
            </SectionCard>
          )}

          <div className="flex flex-col items-center gap-6">
            <EmptyState
              icon={BookOpen}
              title={seed ? "Ready to practice review items?" : "Ready to Practice?"}
              description={seed ? "Tap below to start your custom session." : hardModeActive ? "Hard Mode is active! You'll get a challenging mix of questions." : "Select your session options above to begin."}
            />
            <Button size="lg" onClick={handleStart} className="gap-2" disabled={!seed && selectedPackIds.length === 0}>
              <Play className="h-4 w-4" />
              {hardModeActive ? "Start Hard Mode Session" : "Start Session"}
            </Button>
            {hardModeActive && (
              <Button variant="ghost" size="sm" onClick={() => setHardModeActive(false)} className="text-muted-foreground">
                Reset to normal mix
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <ActionRow>
            <Button variant="ghost" size="sm" onClick={handleNewSession} className="gap-2 text-muted-foreground">
              <RotateCcw className="h-3.5 w-3.5" />
              Change Configuration
            </Button>
          </ActionRow>
          <PracticeSession 
            key={`${sessionKey}-${sessionQuestions.length}`} 
            questions={sessionQuestions} 
            onAcceptHardMode={() => {
              setHardModeActive(true);
              setIsStarted(false);
            }}
          />
        </div>
      )}
    </div>
  );
}

