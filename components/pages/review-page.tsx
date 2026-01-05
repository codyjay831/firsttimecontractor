"use client";

import { useState } from "react";
import { LensHeader } from "@/components/lens/lens-header";
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
  ChevronRight
} from "lucide-react";
import { useReview } from "@/components/review/use-review";
import Link from "next/link";
import { QuestionBlock } from "@/components/questions/question-block";
import { RotateCcw, CheckCircle2 } from "lucide-react";

type RetryRecord = {
  selectedChoiceId: string | null;
  status: "idle" | "submitted";
  isCorrect: boolean | null;
};

export function ReviewPageContent() {
  const { payload, clearPayload } = useReview();
  const [selectedItemId, setSelectedItemId] = useState<string | null>(
    payload?.items[0]?.id ?? null
  );

  const [retryById, setRetryById] = useState<Record<string, RetryRecord>>({});
  const [retryingId, setRetryingId] = useState<string | null>(null);

  const selectedItem = payload?.items.find(item => item.id === selectedItemId);
  const isRetrying = retryingId === selectedItemId;
  const currentRetry = selectedItemId ? retryById[selectedItemId] : null;

  const handleClearAll = () => {
    clearPayload();
    setRetryById({});
    setRetryingId(null);
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

      <SectionCard 
        title={`${payload.source === "practice" ? "Practice" : "Exam"} Session Review`}
        description={`Completed on ${formatDate(payload.createdAt)}`}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">Items to review:</span>
            <span className="text-lg font-bold">{payload.items.length}</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleClearAll}
            className="text-destructive hover:text-destructive hover:bg-destructive/10 ml-auto gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Clear review
          </Button>
        </div>
      </SectionCard>

      <div className="grid gap-6 lg:grid-cols-[350px_1fr]">
        {/* List Panel */}
        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground px-1">
            Missed items
          </h3>
          <div className="flex flex-col gap-2 overflow-y-auto max-h-[600px] pr-1">
            {payload.items.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelectedItemId(item.id)}
                className={cn(
                  "flex flex-col gap-2 rounded-lg border p-4 text-left transition-all hover:bg-accent/50",
                  selectedItemId === item.id ? "border-primary bg-primary/5 ring-1 ring-primary" : "bg-card"
                )}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {getReasonIcon(item.reason)}
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
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

        {/* Detail Panel */}
        <div className="flex flex-col gap-6">
          {selectedItem ? (
            <>
              <SectionCard title="Question Detail">
                <div className="flex flex-col gap-6">
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
                        <div className="rounded-md bg-muted p-4 text-sm leading-relaxed">
                          <span className="font-semibold block mb-1">Explanation:</span>
                          <p className="text-muted-foreground italic">{selectedItem.explanation}</p>
                        </div>
                      )}

                      <div className="flex w-full items-center justify-between pt-2">
                        <Button variant="ghost" size="sm" onClick={cancelRetry}>
                          Done
                        </Button>
                        <div className="flex items-center gap-2">
                          {currentRetry?.status === "submitted" ? (
                            <Button variant="outline" size="sm" onClick={handleRetryReset} className="gap-2">
                              <RotateCcw className="h-3.5 w-3.5" />
                              Try again
                            </Button>
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
                        <div className="rounded-md bg-muted p-4 text-sm leading-relaxed">
                          <span className="font-semibold block mb-1">Explanation:</span>
                          <p className="text-muted-foreground italic">{selectedItem.explanation}</p>
                        </div>
                      )}

                      {(!selectedItem.choices || !selectedItem.correctChoiceId) && (
                        <div className="text-xs text-muted-foreground italic bg-muted/50 p-2 rounded text-center">
                          Retry not available for this item.
                        </div>
                      )}
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

