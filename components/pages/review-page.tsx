"use client";

import { useState } from "react";
import { LensHeader } from "@/components/lens/lens-header";
import { LensPrompt } from "@/components/lens/lens-prompt";
import { SectionCard } from "@/components/scaffold/section-card";
import { EmptyState } from "@/components/scaffold/empty-state";
import { ActionRow } from "@/components/scaffold/action-row";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { 
  XCircle, 
  Clock, 
  BookOpen, 
  AlertCircle, 
  Flag,
  Trash2,
  ArrowLeft,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useReview } from "@/components/review/use-review";
import { usePracticeSeed } from "@/components/practice/use-practice-seed";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { QuestionBlock } from "@/components/questions/question-block";
import { RotateCcw, CheckCircle2, Play, Target } from "lucide-react";
import { AIAssistPanel } from "@/components/ai/ai-assist-panel";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue,
  SelectSeparator,
  SelectLabel
} from "@/components/ui/select";
import { useMemo } from "react";
import { PracticeQuestion } from "@/lib/practice/types";

type RetryRecord = {
  selectedChoiceId: string | null;
  status: "idle" | "submitted";
  isCorrect: boolean | null;
};

export function ReviewPageContent() {
  const { payload, clearPayload } = useReview();
  const { setPracticeSeed } = usePracticeSeed();
  const router = useRouter();
  const [selectedItemId, setSelectedItemId] = useState<string | null>(
    payload?.items[0]?.id ?? null
  );

  const [retryById, setRetryById] = useState<Record<string, RetryRecord>>({});
  const [retryingId, setRetryingId] = useState<string | null>(null);

  // Weak areas selection state
  const [practiceFilter, setPracticeFilter] = useState<string>("all");

  const categories = useMemo(() => {
    if (!payload) return [];
    const cats = new Set<string>();
    payload.items.forEach(item => {
      cats.add(item.category || "Uncategorized");
    });
    return Array.from(cats).sort();
  }, [payload]);

  const selectedItem = payload?.items.find(item => item.id === selectedItemId);
  const selectedIndex = payload?.items.findIndex(item => item.id === selectedItemId) ?? -1;
  const canGoPrevious = selectedIndex > 0;
  const canGoNext = selectedIndex < (payload?.items.length ?? 0) - 1;

  const isRetrying = retryingId === selectedItemId;
  const currentRetry = selectedItemId ? retryById[selectedItemId] : null;

  // Derive grouped items for display
  const REASON_ORDER = ["incorrect", "unanswered", "skipped", "flagged"] as const;
  const groupedItems = REASON_ORDER.map(reason => ({
    reason,
    items: payload?.items.filter(item => item.reason === reason) ?? []
  })).filter(group => group.items.length > 0);

  const incorrectItems = payload?.items.filter(item => item.reason === "incorrect") ?? [];
  const hasIncorrect = incorrectItems.length > 0;

  const handleClearAll = () => {
    clearPayload();
    setRetryById({});
    setRetryingId(null);
    setSelectedItemId(null);
  };

  const handlePracticeThese = () => {
    if (!payload || payload.items.length === 0) return;

    let itemsToPractice = payload.items;

    if (practiceFilter === "incorrect") {
      itemsToPractice = payload.items.filter(item => item.reason === "incorrect");
    } else if (practiceFilter !== "all") {
      // It's a category filter
      itemsToPractice = payload.items.filter(item => 
        (item.category || "Uncategorized") === practiceFilter
      );
    }

    if (itemsToPractice.length === 0) return;

    const questions = itemsToPractice.map(item => ({
      id: item.id,
      prompt: item.prompt,
      choices: item.choices ?? [],
      correctChoiceId: item.correctChoiceId ?? "",
      explanation: item.explanation ?? "",
      category: item.category,
    }));

    setPracticeSeed({
      source: "review",
      questions,
    });

    router.push("/practice");
  };

  const startRetry = () => {
    if (!selectedItemId) return;
    setRetryingId(selectedItemId);
    if (!retryById[selectedItemId]) {
      setRetryById(prev => ({
        ...prev,
        [selectedItemId]: {
          selectedChoiceId: null,
          status: "idle",
          isCorrect: null,
        }
      }));
    }
  };

  const cancelRetry = () => {
    setRetryingId(null);
  };

  const handleRetrySelect = (choiceId: string) => {
    if (!selectedItemId || currentRetry?.status === "submitted") return;
    setRetryById(prev => ({
      ...prev,
      [selectedItemId]: {
        ...prev[selectedItemId] || { status: "idle", isCorrect: null },
        selectedChoiceId: choiceId
      }
    }));
  };

  const handleRetrySubmit = () => {
    if (!selectedItemId || !selectedItem || !currentRetry?.selectedChoiceId) return;
    const isCorrect = currentRetry.selectedChoiceId === selectedItem.correctChoiceId;
    setRetryById(prev => ({
      ...prev,
      [selectedItemId]: {
        ...prev[selectedItemId],
        status: "submitted",
        isCorrect
      }
    }));
  };

  const handleRetryReset = () => {
    if (!selectedItemId) return;
    setRetryById(prev => ({
      ...prev,
      [selectedItemId]: {
        selectedChoiceId: null,
        status: "idle",
        isCorrect: null,
      }
    }));
  };

  const goToPrevious = () => {
    if (canGoPrevious && payload) {
      setSelectedItemId(payload.items[selectedIndex - 1].id);
      setRetryingId(null);
    }
  };

  const goToNext = () => {
    if (canGoNext && payload) {
      setSelectedItemId(payload.items[selectedIndex + 1].id);
      setRetryingId(null);
    }
  };

  const goToNextIncorrect = () => {
    if (!hasIncorrect || !selectedItemId) return;
    
    const currentIndexInIncorrect = incorrectItems.findIndex(item => item.id === selectedItemId);
    let nextItem;
    
    if (currentIndexInIncorrect === -1 || currentIndexInIncorrect === incorrectItems.length - 1) {
      // If current is not incorrect, or it's the last incorrect, go to first incorrect
      nextItem = incorrectItems[0];
    } else {
      nextItem = incorrectItems[currentIndexInIncorrect + 1];
    }

    setSelectedItemId(nextItem.id);
    // Keep retry mode ON for this flow
    setRetryingId(nextItem.id);
    
    // Ensure retry record exists
    if (!retryById[nextItem.id]) {
      setRetryById(prev => ({
        ...prev,
        [nextItem.id]: {
          selectedChoiceId: null,
          status: "idle",
          isCorrect: null,
        }
      }));
    }
  };

  const formatDate = (timestamp: number) => {
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(timestamp));
  };

  const getReasonBadge = (reason: string) => {
    switch (reason) {
      case "incorrect":
        return <Badge variant="destructive" className="capitalize">{reason}</Badge>;
      case "unanswered":
        return <Badge variant="secondary" className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200 capitalize">{reason}</Badge>;
      case "skipped":
        return <Badge variant="outline" className="text-muted-foreground capitalize">{reason}</Badge>;
      case "flagged":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200 capitalize">{reason}</Badge>;
      default:
        return <Badge variant="outline" className="capitalize">{reason}</Badge>;
    }
  };

  const getReasonIcon = (reason: string) => {
    switch (reason) {
      case "incorrect":
        return <XCircle className="h-4 w-4 text-destructive" />;
      case "unanswered":
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case "skipped":
        return <Clock className="h-4 w-4 text-muted-foreground" />;
      case "flagged":
        return <Flag className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  if (!payload || payload.items.length === 0) {
    return (
      <div className="flex flex-col gap-6">
        <LensHeader title="Review mistakes" />
        <LensPrompt />
        <SectionCard title="No Review Data">
          <EmptyState 
            icon={BookOpen}
            title="No review session yet"
            description="Finish a Practice or Exam session, then tap Review to see your results here."
          />
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild variant="outline">
              <Link href="/practice">Go to Practice</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/exam">Go to Exam</Link>
            </Button>
          </div>
        </SectionCard>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <LensHeader title="Review mistakes" />
      <LensPrompt />

      <SectionCard 
        title={`${payload.source === "practice" ? "Practice" : "Exam"} Session Review`}
        description={`Completed on ${formatDate(payload.createdAt)}`}
      >
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Total Missed</span>
                <span className="text-2xl font-bold tracking-tight">{payload.items.length}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-destructive">Incorrect</span>
                <span className="text-2xl font-bold tracking-tight text-destructive">{incorrectItems.length}</span>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="flex flex-col gap-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Categories</span>
                <span className="text-2xl font-bold tracking-tight">{categories.length}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 mr-2">
                <Target className="h-4 w-4 text-muted-foreground" />
                <Select value={practiceFilter} onValueChange={setPracticeFilter}>
                  <SelectTrigger size="sm" className="w-[180px]">
                    <SelectValue placeholder="Practice mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Practice all ({payload.items.length})</SelectItem>
                    {hasIncorrect && (
                      <SelectItem value="incorrect">Incorrect only ({incorrectItems.length})</SelectItem>
                    )}
                    <SelectSeparator />
                    <SelectLabel>By Category</SelectLabel>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>
                        {cat} ({payload.items.filter(i => (i.category || "Uncategorized") === cat).length})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                variant="default" 
                size="sm" 
                onClick={handlePracticeThese}
                disabled={!payload || payload.items.length === 0}
                className="gap-2"
              >
                <Play className="h-4 w-4" />
                Practice these
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleClearAll}
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 gap-2"
              >
                <Trash2 className="h-4 w-4" />
                Clear
              </Button>
            </div>
          </div>
        </div>
      </SectionCard>

      <div className="grid gap-6 lg:grid-cols-[350px_1fr]">
        {/* List Panel */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground px-1">
            Missed items
          </h3>
          <div className="flex flex-col gap-6 overflow-y-auto max-h-[600px] pr-1">
            {groupedItems.map((group) => (
              <div key={group.reason} className="flex flex-col gap-2">
                <div className="flex items-center gap-2 px-1 mb-1">
                  {getReasonIcon(group.reason)}
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/80">
                    {group.reason} ({group.items.length})
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  {group.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setSelectedItemId(item.id);
                        setRetryingId(null);
                      }}
                      className={cn(
                        "flex flex-col gap-2 rounded-lg border p-4 text-left transition-all hover:bg-accent/50",
                        selectedItemId === item.id ? "border-primary bg-primary/5 ring-1 ring-primary" : "bg-card"
                      )}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
                            {item.mode}
                          </span>
                        </div>
                        {getReasonBadge(item.reason)}
                      </div>
                      <p className="line-clamp-2 text-sm font-medium leading-tight">
                        {item.prompt}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detail Panel */}
        <div className="flex flex-col gap-6">
          {selectedItem ? (
            <>
              <SectionCard 
                title="Question Detail"
                description={`Item ${selectedIndex + 1} of ${payload.items.length}`}
              >
                <div className="flex flex-col gap-6">
                  <div className="flex items-center justify-between border-b pb-4">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={goToPrevious} 
                      disabled={!canGoPrevious}
                      className="gap-1 px-2"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    
                    <div className="flex items-center gap-2">
                      {hasIncorrect && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={goToNextIncorrect}
                          className="gap-1 px-2 text-destructive border-destructive/20 hover:bg-destructive/5"
                        >
                          Next incorrect
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={goToNext} 
                        disabled={!canGoNext}
                        className="gap-1 px-2"
                      >
                        Next missed
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {isRetrying ? (
                    <div className="flex flex-col gap-6">
                      <QuestionBlock
                        prompt={selectedItem.prompt}
                        meta={
                          <>
                            <Badge variant="outline" className="gap-1.5 py-0.5">
                              <RotateCcw className="h-3 w-3" />
                              Retry Mode
                            </Badge>
                            {currentRetry?.status === "submitted" && (
                              <Badge variant={currentRetry.isCorrect ? "default" : "destructive"} className="ml-auto">
                                {currentRetry.isCorrect ? "Correct" : "Incorrect"}
                              </Badge>
                            )}
                          </>
                        }
                        choices={selectedItem.choices ?? []}
                        selectedChoiceId={currentRetry?.selectedChoiceId}
                        onSelectChoice={handleRetrySelect}
                        disableSelection={currentRetry?.status === "submitted"}
                        showCorrectness={currentRetry?.status === "submitted"}
                        correctChoiceId={selectedItem.correctChoiceId}
                        showLabels={true}
                      />

                      {currentRetry?.status === "submitted" && selectedItem.explanation && (
                        <div className="flex flex-col gap-4">
                          <div className="rounded-md bg-muted p-4 text-sm leading-relaxed">
                            <span className="font-semibold block mb-1">Explanation:</span>
                            <p className="text-muted-foreground italic">{selectedItem.explanation}</p>
                          </div>
                          
                          <AIAssistPanel 
                            question={selectedItem as unknown as PracticeQuestion} 
                            userChoiceId={currentRetry.selectedChoiceId} 
                          />
                        </div>
                      )}

                      <div className="flex w-full items-center justify-between pt-2">
                        <Button variant="ghost" size="sm" onClick={cancelRetry}>
                          Done
                        </Button>
                        <div className="flex items-center gap-2">
                          {currentRetry?.status === "submitted" ? (
                            <>
                              <Button variant="outline" size="sm" onClick={handleRetryReset} className="gap-2">
                                <RotateCcw className="h-3.5 w-3.5" />
                                Try again
                              </Button>
                              {hasIncorrect ? (
                                <Button size="sm" onClick={goToNextIncorrect} className="gap-2 bg-destructive hover:bg-destructive/90 text-destructive-foreground">
                                  Next incorrect
                                  <ChevronRight className="h-4 w-4" />
                                </Button>
                              ) : canGoNext && (
                                <Button size="sm" onClick={goToNext} className="gap-2">
                                  Next missed
                                  <ChevronRight className="h-4 w-4" />
                                </Button>
                              )}
                            </>
                          ) : (
                            <Button 
                              size="sm" 
                              onClick={handleRetrySubmit} 
                              disabled={!currentRetry?.selectedChoiceId}
                              className="gap-2"
                            >
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              Check answer
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-2">
                          {getReasonBadge(selectedItem.reason)}
                          <span className="text-xs text-muted-foreground">ID: {selectedItem.id}</span>
                        </div>
                        {selectedItem.choices && selectedItem.correctChoiceId && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={startRetry}
                            className="gap-2"
                          >
                            <RotateCcw className="h-3.5 w-3.5" />
                            Retry this
                          </Button>
                        )}
                      </div>

                      <QuestionBlock
                        prompt={selectedItem.prompt}
                        choices={selectedItem.choices ?? []}
                        userChoiceIdForReview={selectedItem.userChoiceId}
                        correctChoiceId={selectedItem.correctChoiceId}
                        showCorrectness={true}
                        showLabels={true}
                        disableSelection={true}
                      />

                      {selectedItem.explanation && (
                        <div className="flex flex-col gap-4">
                          <div className="rounded-md bg-muted p-4 text-sm leading-relaxed">
                            <span className="font-semibold block mb-1">Explanation:</span>
                            <p className="text-muted-foreground italic">{selectedItem.explanation}</p>
                          </div>
                          
                          <AIAssistPanel 
                            question={selectedItem as unknown as PracticeQuestion} 
                            userChoiceId={selectedItem.userChoiceId ?? null} 
                          />
                        </div>
                      )}

                      {(!selectedItem.choices || !selectedItem.correctChoiceId) && (
                        <div className="text-xs text-muted-foreground italic bg-muted/50 p-2 rounded text-center">
                          Retry not available for this item.
                        </div>
                      )}

                      <div className="flex w-full items-center justify-end pt-2 gap-2">
                        {hasIncorrect && (
                          <Button 
                            variant="outline"
                            size="sm" 
                            onClick={goToNextIncorrect} 
                            className="gap-2 text-destructive border-destructive/20 hover:bg-destructive/5"
                          >
                            Next incorrect
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        )}
                        {canGoNext && (
                          <Button size="sm" onClick={goToNext} className="gap-2">
                            Next missed
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </SectionCard>
            </>
          ) : (
            <SectionCard title="Selection Required">
              <div className="flex h-[400px] items-center justify-center text-muted-foreground italic">
                Select an item from the list to see details
              </div>
            </SectionCard>
          )}
        </div>
      </div>

      <ActionRow>
        <div className="flex w-full items-center justify-between gap-4">
          <Button asChild variant="ghost" className="gap-2">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          <div className="flex items-center gap-2">
             <Button asChild variant="outline" className="gap-2">
              <Link href={payload.source === "practice" ? "/practice" : "/exam"}>
                Try another {payload.source}
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </ActionRow>
    </div>
  );
}

