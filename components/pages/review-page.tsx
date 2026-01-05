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

export function ReviewPageContent() {
  const { payload, clearPayload } = useReview();
  const [selectedItemId, setSelectedItemId] = useState<string | null>(
    payload?.items[0]?.id ?? null
  );

  const selectedItem = payload?.items.find(item => item.id === selectedItemId);

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
            onClick={clearPayload}
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
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                      {getReasonBadge(selectedItem.reason)}
                      <span className="text-xs text-muted-foreground">ID: {selectedItem.id}</span>
                    </div>
                    <p className="text-lg font-medium leading-relaxed">
                      {selectedItem.prompt}
                    </p>
                  </div>

                  {selectedItem.choices && (
                    <div className="grid gap-3">
                      {selectedItem.choices.map((choice) => {
                        const isCorrect = choice.id === selectedItem.correctChoiceId;
                        const isUserChoice = choice.id === selectedItem.userChoiceId;
                        
                        return (
                          <div
                            key={choice.id}
                            className={cn(
                              "flex items-center gap-3 rounded-lg border p-4 transition-all",
                              isCorrect && "border-green-500 bg-green-50 dark:bg-green-950/20 ring-1 ring-green-500",
                              isUserChoice && !isCorrect && "border-destructive bg-destructive/5 ring-1 ring-destructive",
                              !isCorrect && !isUserChoice && "opacity-60"
                            )}
                          >
                            <div className={cn(
                              "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium",
                              isCorrect && "bg-green-500 text-white border-green-500",
                              isUserChoice && !isCorrect && "bg-destructive text-destructive-foreground border-destructive"
                            )}>
                              {choice.id.toUpperCase()}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-medium">{choice.text}</span>
                              {isCorrect && (
                                <span className="text-[10px] font-bold uppercase text-green-600 dark:text-green-400">
                                  Correct Answer
                                </span>
                              )}
                              {isUserChoice && !isCorrect && (
                                <span className="text-[10px] font-bold uppercase text-destructive">
                                  Your Choice
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {selectedItem.explanation && (
                    <div className="rounded-md bg-muted p-4 text-sm leading-relaxed">
                      <span className="font-semibold block mb-1">Explanation:</span>
                      <p className="text-muted-foreground italic">{selectedItem.explanation}</p>
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

