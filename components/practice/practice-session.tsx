"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { SectionCard } from "@/components/scaffold/section-card";
import { ActionRow } from "@/components/scaffold/action-row";
import { EmptyState } from "@/components/scaffold/empty-state";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, RotateCcw, ChevronLeft, ChevronRight, SkipForward, BookOpen } from "lucide-react";
import { useReview } from "@/components/review/use-review";
import { ReviewItem, ReviewPayload } from "@/lib/review/types";
import { QuestionPrompt } from "@/components/questions/question-prompt";
import { ChoiceList } from "@/components/questions/choice-list";
import { PracticeQuestion } from "@/lib/practice/types";
import { getSessionItem, setSessionItem, removeSessionItem } from "@/lib/session-storage";
import { recordAnsweredQuestion } from "@/lib/content/progress";

type QuestionSessionRecord = {
  selectedChoiceId: string | null;
  status: "idle" | "submitted";
  isCorrect: boolean | null;  // only meaningful after submit
  wasSkipped: boolean;        // true if user used Skip on this question at least once
};

const STORAGE_KEYS = {
  CURRENT_INDEX: "practice_current_index",
  RECORDS: "practice_records",
};

export function PracticeSession({ questions }: { questions: PracticeQuestion[] }) {
  const router = useRouter();
  const { setPayload } = useReview();
  
  const [currentIndex, setCurrentIndex] = useState(() => getSessionItem(STORAGE_KEYS.CURRENT_INDEX, 0));
  const [recordsById, setRecordsById] = useState<Record<string, QuestionSessionRecord>>(() => getSessionItem(STORAGE_KEYS.RECORDS, {}));
  const isInitialMount = useRef(true);

  // Persist to sessionStorage on changes
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    setSessionItem(STORAGE_KEYS.CURRENT_INDEX, currentIndex);
    setSessionItem(STORAGE_KEYS.RECORDS, recordsById);
  }, [currentIndex, recordsById]);

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

      // Epic 17A: Record progress per pack
      if (currentQuestion.packId) {
        recordAnsweredQuestion(currentQuestion.packId, currentQuestion.id);
      }
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
    if (confirm("Are you sure you want to reset your practice session? All progress will be lost.")) {
      setCurrentIndex(0);
      setRecordsById({});
      removeSessionItem(STORAGE_KEYS.CURRENT_INDEX);
      removeSessionItem(STORAGE_KEYS.RECORDS);
    }
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
          category: q.category,
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
          <Button 
            onClick={handleReviewMissed} 
            className="gap-2"
            disabled={incorrectCount === 0 && skippedCount === 0}
          >
            <BookOpen className="h-4 w-4" />
            Review missed
          </Button>
        </ActionRow>
      </div>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Progress: {currentIndex + 1} / {questions.length} ({Math.round(((currentIndex + 1) / questions.length) * 100)}%)
        </div>
        <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-green-600/80" />
            {correctCount} Correct
          </span>
          <span className="flex items-center gap-1.5">
            <XCircle className="h-3.5 w-3.5 text-destructive/80" />
            {incorrectCount} Incorrect
          </span>
          <span className="flex items-center gap-1.5">
            <SkipForward className="h-3.5 w-3.5 text-muted-foreground/80" />
            {skippedCount} Skipped
          </span>
        </div>
      </div>

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
        <QuestionPrompt
          prompt={currentQuestion.prompt}
          meta={
            <>
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
            </>
          }
        />
      </SectionCard>

      <SectionCard title="Answer choices">
        <ChoiceList
          choices={currentQuestion.choices}
          selectedChoiceId={selectedChoiceId}
          onSelectChoice={handleChoiceSelect}
          disableSelection={status === "submitted"}
          showCorrectness={status === "submitted"}
          correctChoiceId={currentQuestion.correctChoiceId}
        />
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
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            
            <Button
              variant="ghost"
              onClick={handleRestart}
              className="gap-2 text-muted-foreground hover:text-destructive"
              title="Reset session"
            >
              <RotateCcw className="h-4 w-4" />
              <span className="hidden sm:inline">Reset</span>
            </Button>
          </div>

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
