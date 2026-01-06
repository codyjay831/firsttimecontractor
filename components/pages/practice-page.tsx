"use client";

import { useState } from "react";
import { LensHeader } from "@/components/lens/lens-header";
import { PracticeSession } from "@/components/practice/practice-session";
import { 
  listPacks, 
  getActivePackId, 
  getPracticeQuestionsForPack 
} from "@/lib/content/load-packs";
import { PracticeQuestion } from "@/lib/practice/types";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/scaffold/section-card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Shuffle, Play, RotateCcw, BookOpen, Package, Check } from "lucide-react";
import { ActionRow } from "@/components/scaffold/action-row";
import { EmptyState } from "@/components/scaffold/empty-state";
import { usePracticeSeed } from "@/components/practice/use-practice-seed";
import { useLens } from "@/lib/lens/use-lens";
import { useEffect } from "react";

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
  const [sessionQuestions, setSessionQuestions] = useState<PracticeQuestion[]>([]);
  const [sessionKey, setSessionKey] = useState(0);

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

    const timer = setTimeout(() => {
      setSelectedPackIds(Array.from(initialSelected));
    }, 0);
    return () => clearTimeout(timer);
  }, [lens, packs]);

  const togglePack = (packId: string) => {
    setSelectedPackIds(prev => 
      prev.includes(packId) 
        ? prev.filter(id => id !== packId) 
        : [...prev, packId]
    );
  };

  const handleStart = () => {
    if (seed) {
      setSessionQuestions(seed.questions);
      clearPracticeSeed();
      setIsStarted(true);
      return;
    }

    // Combine questions from selected packs
    let combinedPool: PracticeQuestion[] = [];
    selectedPackIds.forEach(id => {
      combinedPool = [...combinedPool, ...getPracticeQuestionsForPack(id)];
    });

    // Deduplicate by ID (keep first occurrence)
    const seenIds = new Set<string>();
    let pool = combinedPool.filter(q => {
      if (seenIds.has(q.id)) return false;
      seenIds.add(q.id);
      return true;
    });

    if (shuffle) {
      pool = fisherYatesShuffle(pool);
    }
    const selected = pool.slice(0, parseInt(count));
    setSessionQuestions(selected);
    setIsStarted(true);
  };

  const handleNewSession = () => {
    setIsStarted(false);
    setSessionKey(prev => prev + 1);
  };

  return (
    <div className="flex flex-col gap-6">
      <LensHeader title="Practice" />
      
      {!isStarted ? (
        <div className="space-y-6">
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

                      return (
                        <button
                          key={p.packId}
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
                              <span>{p.title}</span>
                              {isRecommended && (
                                <span className="text-[10px] text-primary/70 font-normal">Recommended</span>
                              )}
                            </div>
                          </div>
                        </button>
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
              description={seed ? "Tap below to start your custom session." : "Select your session options above to begin."}
            />
            <Button size="lg" onClick={handleStart} className="gap-2" disabled={!seed && selectedPackIds.length === 0}>
              <Play className="h-4 w-4" />
              Start Session
            </Button>
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
          />
        </div>
      )}
    </div>
  );
}

