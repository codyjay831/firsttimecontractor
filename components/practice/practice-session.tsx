"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SAMPLE_PRACTICE_QUESTIONS } from "@/lib/practice/sample-questions";
import { SectionCard } from "@/components/scaffold/section-card";
import { ActionRow } from "@/components/scaffold/action-row";
import { EmptyState } from "@/components/scaffold/empty-state";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, RotateCcw, ChevronLeft, ChevronRight, SkipForward, BookOpen } from "lucide-react";
import { useReview } from "@/components/review/use-review";
import { ReviewItem, ReviewPayload } from "@/lib/review/types";

type QuestionSessionRecord = {
  selectedChoiceId: string | null;
  status: "idle" | "submitted";
  isCorrect: boolean | null;  // only meaningful after submit
  wasSkipped: boolean;        // true if user used Skip on this question at least once
};

export function PracticeSession() {
  const questions = SAMPLE_PRACTICE_QUESTIONS;
  const router = useRouter();
  const { setPayload } = useReview();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [recordsById, setRecordsById] = useState<Record<string, QuestionSessionRecord>>({});
  
  const isFinished = currentIndex >= questions.length;
  const currentQuestion = !isFinished ? questions[currentIndex] : null;

  // Derive current state from records
  const currentRecord = currentQuestion ? recordsById[currentQuestion.id] || {
    selectedChoiceId: null,
    status: "idle",
    isCorrect: null,
    wasSkipped: false,
  } : null;

  const selectedChoiceId = currentRecord?.selectedChoiceId ?? null;
  const status = currentRecord?.status ?? "idle";
  const isCorrect = currentRecord?.isCorrect ?? null;

  // Derived counts
  const records = Object.values(recordsById);
  const correctCount = records.filter(r => r.status === "submitted" && r.isCorrect).length;
  const incorrectCount = records.filter(r => r.status === "submitted" && r.isCorrect === false).length;
  const answeredCount = correctCount + incorrectCount;
  const skippedCount = records.filter(r => r.wasSkipped && r.status !== "submitted").length;

  const updateRecord = (questionId: string, updates: Partial<QuestionSessionRecord>) => {
    setRecordsById(prev => ({
      ...prev,
      [questionId]: {
        ...(prev[questionId] || {
          selectedChoiceId: null,
          status: "idle",
          isCorrect: null,
          wasSkipped: false,
        }),
        ...updates
      }
    }));
  };

  const handleChoiceSelect = (choiceId: string) => {
    if (!currentQuestion || status === "submitted") return;
    updateRecord(currentQuestion.id, { selectedChoiceId: choiceId });
  };

  const handleSubmit = () => {
    if (selectedChoiceId && currentQuestion) {
      const correct = selectedChoiceId === currentQuestion.correctChoiceId;
      updateRecord(currentQuestion.id, {
        status: "submitted",
        isCorrect: correct
      });
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSkip = () => {
    if (currentQuestion) {
      updateRecord(currentQuestion.id, { wasSkipped: true });
    }
    setCurrentIndex((prev) => prev + 1);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setRecordsById({});
  };

  const handleReviewMissed = () => {
    const items: ReviewItem[] = [];

    questions.forEach(q => {
      const record = recordsById[q.id];
      if (!record) return;

      let reason: "incorrect" | "skipped" | null = null;
      if (record.status === "submitted" && record.isCorrect === false) {
        reason = "incorrect";
      } else if (record.wasSkipped && record.status !== "submitted") {
        reason = "skipped";
      }

      if (reason) {
        items.push({
          id: q.id,
          mode: "practice",
          prompt: q.prompt,
          choices: q.choices,
          correctChoiceId: q.correctChoiceId,
          explanation: q.explanation,
          userChoiceId: record.selectedChoiceId,
          reason,
        });
      }
    });

    if (items.length > 0) {
      const payload: ReviewPayload = {
        createdAt: Date.now(),
        source: "practice",
        items,
      };
      setPayload(payload);
      router.push("/review");
    }
  };

  if (isFinished) {
    return (
      <div className="space-y-6">
        <EmptyState
          icon={CheckCircle2}
          title="Session Complete"
          description="You've reached the end of this practice set. Here is how you did:"
        />
        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <SectionCard title="Total Questions">
            <div className="text-3xl font-bold">{questions.length}</div>
          </SectionCard>
          <SectionCard title="Answered">
            <div className="text-3xl font-bold text-primary">{answeredCount}</div>
          </SectionCard>
          <SectionCard title="Skipped">
            <div className="text-3xl font-bold text-muted-foreground">{skippedCount}</div>
          </SectionCard>
          <SectionCard title="Correct">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">{correctCount}</div>
          </SectionCard>
          <SectionCard title="Incorrect">
            <div className="text-3xl font-bold text-destructive">{incorrectCount}</div>
          </SectionCard>
        </div>

        <ActionRow>
          <Button onClick={handleRestart} variant="outline" className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Restart session
          </Button>
          {(incorrectCount > 0 || skippedCount > 0) && (
            <Button onClick={handleReviewMissed} className="gap-2">
              <BookOpen className="h-4 w-4" />
              Review missed
            </Button>
          )}
        </ActionRow>
      </div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="flex flex-col gap-6">
      <SectionCard 
        title={`Question ${currentIndex + 1} of ${questions.length}`}
      >
        <div className="space-y-2">
          <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div 
              className="h-full bg-primary transition-all duration-300" 
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Question">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {currentQuestion.category && (
              <Badge variant="secondary" className="font-normal text-xs uppercase tracking-wider">
                {currentQuestion.category}
              </Badge>
            )}
            {currentQuestion.difficulty && (
              <Badge variant="outline" className={cn(
                "font-normal text-xs uppercase tracking-wider",
                currentQuestion.difficulty === "easy" && "text-green-600 border-green-200 bg-green-50 dark:bg-green-950/20",
                currentQuestion.difficulty === "medium" && "text-amber-600 border-amber-200 bg-amber-50 dark:bg-amber-950/20",
                currentQuestion.difficulty === "hard" && "text-destructive border-destructive/20 bg-destructive/5"
              )}>
                {currentQuestion.difficulty}
              </Badge>
            )}
            <Badge variant="outline" className="font-normal text-xs uppercase tracking-wider ml-auto">
              {status === "idle" ? "Not answered" : isCorrect ? "Correct" : "Incorrect"}
            </Badge>
          </div>
          <p className="text-base leading-relaxed">
            {currentQuestion.prompt}
          </p>
        </div>
      </SectionCard>

      <SectionCard title="Answer choices">
        <div className="grid gap-3">
          {currentQuestion.choices.map((choice) => {
            const isSelected = selectedChoiceId === choice.id;
            const isCorrectChoice = status === "submitted" && choice.id === currentQuestion.correctChoiceId;
            const isWrongChoice = status === "submitted" && isSelected && choice.id !== currentQuestion.correctChoiceId;

            return (
              <button
                key={choice.id}
                onClick={() => handleChoiceSelect(choice.id)}
                disabled={status === "submitted"}
                className={cn(
                  "flex items-center gap-3 rounded-lg border p-4 text-left transition-all",
                  !isSelected && status === "idle" && "hover:bg-accent/50",
                  isSelected && status === "idle" && "border-primary bg-primary/5 ring-1 ring-primary",
                  isCorrectChoice && "border-green-500 bg-green-50 dark:bg-green-950/20 ring-1 ring-green-500",
                  isWrongChoice && "border-destructive bg-destructive/5 ring-1 ring-destructive",
                  status === "submitted" && !isCorrectChoice && !isWrongChoice && "opacity-50"
                )}
              >
                <div className={cn(
                  "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium transition-colors",
                  isSelected && status === "idle" && "bg-primary text-primary-foreground border-primary",
                  isCorrectChoice && "bg-green-500 text-white border-green-500",
                  isWrongChoice && "bg-destructive text-destructive-foreground border-destructive"
                )}>
                  {choice.id.toUpperCase()}
                </div>
                <span className="text-sm font-medium">{choice.text}</span>
              </button>
            );
          })}
        </div>
      </SectionCard>

      {status === "submitted" && (
        <SectionCard 
          title={isCorrect ? "Correct!" : "Incorrect"}
          description={isCorrect ? "Well done." : "Not quite right."}
        >
          <div className="space-y-4">
            <div className={cn(
              "flex items-center gap-2 rounded-md p-3 text-sm font-medium",
              isCorrect ? "bg-green-50 text-green-700 dark:bg-green-950/30 dark:text-green-400" : "bg-destructive/10 text-destructive"
            )}>
              {isCorrect ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  Correct Answer
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4" />
                  Incorrect Answer
                </>
              )}
            </div>
            <div className="rounded-md bg-muted p-4 text-sm leading-relaxed">
              <span className="font-semibold block mb-1">Explanation:</span>
              <p className="text-muted-foreground italic">{currentQuestion.explanation}</p>
            </div>
          </div>
        </SectionCard>
      )}

      <ActionRow>
        <div className="flex w-full items-center justify-between gap-4">
          <Button
            variant="ghost"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            {status === "idle" && (
              <Button
                variant="ghost"
                onClick={handleSkip}
                className="gap-2"
              >
                Skip
                <SkipForward className="h-4 w-4" />
              </Button>
            )}

            {status === "idle" ? (
              <Button 
                onClick={handleSubmit} 
                disabled={!selectedChoiceId}
                className="min-w-[120px]"
              >
                Check Answer
              </Button>
            ) : (
              <Button 
                onClick={handleNext}
                className="min-w-[120px] gap-2"
              >
                {currentIndex === questions.length - 1 ? "Finish Session" : "Next Question"}
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </ActionRow>
    </div>
  );
}
