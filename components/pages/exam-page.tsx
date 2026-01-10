"use client";

import { useState, useEffect } from "react";
import { LensHeader } from "@/components/lens/lens-header";
import { LensPrompt } from "@/components/lens/lens-prompt";
import { ExamSession } from "@/components/exam/exam-session";
import { 
  listPacks, 
  getActivePackId, 
  getExamQuestionsForPack 
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
import { Shuffle, Play, RotateCcw, ClipboardCheck, Package, Check } from "lucide-react";
import { ActionRow } from "@/components/scaffold/action-row";
import { EmptyState } from "@/components/scaffold/empty-state";
import { useLens } from "@/lib/lens/use-lens";
import { getSessionItem, setSessionItem, removeSessionItem } from "@/lib/session-storage";

function fisherYatesShuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const STORAGE_KEYS = {
  IS_STARTED: "exam_is_started",
  QUESTIONS: "exam_questions",
  DURATION: "exam_duration",
  // Keys used by ExamSession that we need to clear on reset
  SESSION_INDEX: "exam_current_index",
  SESSION_VIEW: "exam_view",
  SESSION_REMAINING: "exam_seconds_remaining",
  SESSION_RECORDS: "exam_records",
  SESSION_GRID: "exam_show_grid",
};

export function ExamPageContent() {
  const lens = useLens();
  const packs = listPacks();
  
  const [isStarted, setIsStarted] = useState(false);
  const [length, setLength] = useState("30");
  const [timePreset, setTimePreset] = useState("fixed"); // "fixed" or "per-question"
  const [shuffle, setShuffle] = useState(true);
  const [selectedPackIds, setSelectedPackIds] = useState<string[]>([]);
  const [sessionQuestions, setSessionQuestions] = useState<PracticeQuestion[]>([]);
  const [durationMinutes, setDurationMinutes] = useState(30);

  useEffect(() => {
    // Sync with session storage on mount
    const savedIsStarted = getSessionItem(STORAGE_KEYS.IS_STARTED, false);
    const savedQuestions = getSessionItem(STORAGE_KEYS.QUESTIONS, []);
    const savedDuration = getSessionItem(STORAGE_KEYS.DURATION, 30);
    
    if (savedIsStarted) {
      window.requestAnimationFrame(() => {
        setIsStarted(true);
        setSessionQuestions(savedQuestions);
        setDurationMinutes(savedDuration);
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // Only auto-select if not already started
    if (isStarted) return;

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
  }, [lens, packs, isStarted]);

  const togglePack = (packId: string) => {
    setSelectedPackIds(prev => 
      prev.includes(packId) 
        ? prev.filter(id => id !== packId) 
        : [...prev, packId]
    );
  };

  const handleStart = () => {
    // Combine questions from selected packs
    let combinedPool: PracticeQuestion[] = [];
    selectedPackIds.forEach(id => {
      combinedPool = [...combinedPool, ...getExamQuestionsForPack(id)];
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
    
    const numQuestions = parseInt(length);
    const selected = pool.slice(0, numQuestions);
    
    let duration = 30;
    if (timePreset === "per-question") {
      duration = Math.ceil(selected.length * 1.5); // 1.5 mins per question
    } else {
      duration = parseInt(length); // Fixed match (15/30/60)
    }
    
    setSessionQuestions(selected);
    setDurationMinutes(duration);
    setIsStarted(true);

    // Persist to session
    setSessionItem(STORAGE_KEYS.IS_STARTED, true);
    setSessionItem(STORAGE_KEYS.QUESTIONS, selected);
    setSessionItem(STORAGE_KEYS.DURATION, duration);
    
    // Clear any previous session state to ensure fresh start
    removeSessionItem(STORAGE_KEYS.SESSION_INDEX);
    removeSessionItem(STORAGE_KEYS.SESSION_VIEW);
    removeSessionItem(STORAGE_KEYS.SESSION_REMAINING);
    removeSessionItem(STORAGE_KEYS.SESSION_RECORDS);
    removeSessionItem(STORAGE_KEYS.SESSION_GRID);
  };

  const handleNewSession = (noConfirm = false) => {
    if (noConfirm || confirm("Reset current exam and return to configuration?")) {
      setIsStarted(false);
      removeSessionItem(STORAGE_KEYS.IS_STARTED);
      removeSessionItem(STORAGE_KEYS.QUESTIONS);
      removeSessionItem(STORAGE_KEYS.DURATION);
      removeSessionItem(STORAGE_KEYS.SESSION_INDEX);
      removeSessionItem(STORAGE_KEYS.SESSION_VIEW);
      removeSessionItem(STORAGE_KEYS.SESSION_REMAINING);
      removeSessionItem(STORAGE_KEYS.SESSION_RECORDS);
      removeSessionItem(STORAGE_KEYS.SESSION_GRID);
    }
  };

  // Calculate available questions
  const availableCount = selectedPackIds.reduce((acc, id) => {
    const packQuestions = getExamQuestionsForPack(id);
    return acc + packQuestions.length;
  }, 0);

  return (
    <div className="flex flex-col gap-6">
      <LensHeader title="Exam simulation" />
      <LensPrompt />
      
      {!isStarted ? (
        <div className="space-y-6">
          <SectionCard 
            title="Exam Configuration" 
            description="Customize your exam simulation before starting."
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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-end">
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">Number of Questions</div>
                  <Select value={length} onValueChange={setLength}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select length" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 Questions</SelectItem>
                      <SelectItem value="30">30 Questions</SelectItem>
                      <SelectItem value="60">60 Questions</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">Time Limit</div>
                  <Select value={timePreset} onValueChange={setTimePreset}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixed">Fixed ({length} mins)</SelectItem>
                      <SelectItem value="per-question">Dynamic (1.5m / q)</SelectItem>
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
              
              <div className="text-xs text-muted-foreground text-center">
                Available questions from selected packs: <strong>{availableCount}</strong>
              </div>
            </div>
          </SectionCard>

          <div className="flex flex-col items-center gap-6">
            <EmptyState
              icon={ClipboardCheck}
              title="Ready for the simulation?"
              description="Timed environment with no feedback until completion."
            />
            <Button size="lg" onClick={handleStart} className="gap-2" disabled={selectedPackIds.length === 0}>
              <Play className="h-4 w-4" />
              Start Exam
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <ActionRow>
            <Button variant="ghost" size="sm" onClick={() => handleNewSession()} className="gap-2 text-muted-foreground">
              <RotateCcw className="h-3.5 w-3.5" />
              Change Configuration
            </Button>
          </ActionRow>
          <ExamSession 
            questions={sessionQuestions}
            durationMinutes={durationMinutes}
            onRestart={() => handleNewSession(true)}
          />
        </div>
      )}
    </div>
  );
}

