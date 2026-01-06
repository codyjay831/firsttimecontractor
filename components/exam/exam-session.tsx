"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { getExamQuestions } from "@/lib/content/load-packs";
import { SectionCard } from "@/components/scaffold/section-card";
import { ActionRow } from "@/components/scaffold/action-row";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  ChevronLeft, 
  ChevronRight, 
  Flag, 
  FlagOff, 
  Timer, 
  CheckCircle2, 
  RotateCcw,
  LayoutGrid,
  BookOpen
} from "lucide-react";
import { useReview } from "@/components/review/use-review";
import { ReviewItem, ReviewPayload } from "@/lib/review/types";
import { QuestionBlock } from "@/components/questions/question-block";
import { getSessionItem, setSessionItem, removeSessionItem } from "@/lib/session-storage";

type ExamQuestionRecord = {
  selectedChoiceId: string | null;
  flagged: boolean;
};

type ExamView = "exam" | "summary" | "review";

const EXAM_TIME_SECONDS = 30 * 60; // 30 minutes

const STORAGE_KEYS = {
  CURRENT_INDEX: "exam_current_index",
  VIEW: "exam_view",
  SECONDS_REMAINING: "exam_seconds_remaining",
  RECORDS: "exam_records",
  SHOW_GRID: "exam_show_grid",
};

export function ExamSession() {
  const questions = getExamQuestions();
  const router = useRouter();
  const { setPayload } = useReview();
  
  // Basic State
  const [currentIndex, setCurrentIndex] = useState(() => getSessionItem(STORAGE_KEYS.CURRENT_INDEX, 0));
  const [view, setView] = useState<ExamView>(() => getSessionItem(STORAGE_KEYS.VIEW, "exam"));
  const [secondsRemaining, setSecondsRemaining] = useState(() => getSessionItem(STORAGE_KEYS.SECONDS_REMAINING, EXAM_TIME_SECONDS));
  const [recordsById, setRecordsById] = useState<Record<string, ExamQuestionRecord>>(() => getSessionItem(STORAGE_KEYS.RECORDS, {}));
  const [showGrid, setShowGrid] = useState(() => getSessionItem(STORAGE_KEYS.SHOW_GRID, false));
  const isInitialMount = useRef(true);

  // Persist to sessionStorage on changes
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    setSessionItem(STORAGE_KEYS.CURRENT_INDEX, currentIndex);
    setSessionItem(STORAGE_KEYS.VIEW, view);
    setSessionItem(STORAGE_KEYS.SECONDS_REMAINING, secondsRemaining);
    setSessionItem(STORAGE_KEYS.RECORDS, recordsById);
    setSessionItem(STORAGE_KEYS.SHOW_GRID, showGrid);
  }, [currentIndex, view, secondsRemaining, recordsById, showGrid]);

  // Timer logic
  useEffect(() => {
    if (view !== "exam" || secondsRemaining <= 0) return;

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          setView("summary");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [view, secondsRemaining]);

  // Derived state
  const currentQuestion = questions[currentIndex];
  const currentRecord = recordsById[currentQuestion.id] || {
    selectedChoiceId: null,
    flagged: false,
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Summary calculations
  const summary = useMemo(() => {
    const records = Object.values(recordsById);
    const totalQuestions = questions.length;
    const answeredCount = records.filter(r => r.selectedChoiceId !== null).length;
    const flaggedCount = records.filter(r => r.flagged).length;
    
    let correctCount = 0;
    let incorrectCount = 0;

    questions.forEach(q => {
      const record = recordsById[q.id];
      if (record?.selectedChoiceId) {
        if (record.selectedChoiceId === q.correctChoiceId) {
          correctCount++;
        } else {
          incorrectCount++;
        }
      }
    });

    return {
      totalQuestions,
      answeredCount,
      unansweredCount: totalQuestions - answeredCount,
      flaggedCount,
      correctCount,
      incorrectCount
    };
  }, [recordsById, questions]);

  // Handlers
  const handleChoiceSelect = (choiceId: string) => {
    if (view !== "exam") return;
    setRecordsById(prev => ({
      ...prev,
      [currentQuestion.id]: {
        ...(prev[currentQuestion.id] || { flagged: false }),
        selectedChoiceId: choiceId
      }
    }));
  };

  const toggleFlag = () => {
    setRecordsById(prev => ({
      ...prev,
      [currentQuestion.id]: {
        ...(prev[currentQuestion.id] || { selectedChoiceId: null }),
        flagged: !(prev[currentQuestion.id]?.flagged)
      }
    }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleFinish = () => {
    setView("summary");
  };

  const handleRestart = () => {
    if (confirm("Are you sure you want to reset your exam session? All progress will be lost.")) {
      setCurrentIndex(0);
      setView("exam");
      setSecondsRemaining(EXAM_TIME_SECONDS);
      setRecordsById({});
      setShowGrid(false);
      
      // Explicitly clear from storage
      removeSessionItem(STORAGE_KEYS.CURRENT_INDEX);
      removeSessionItem(STORAGE_KEYS.VIEW);
      removeSessionItem(STORAGE_KEYS.SECONDS_REMAINING);
      removeSessionItem(STORAGE_KEYS.RECORDS);
      removeSessionItem(STORAGE_KEYS.SHOW_GRID);
    }
  };

  const handleReviewMissed = () => {
    const items: ReviewItem[] = [];

    questions.forEach(q => {
      const record = recordsById[q.id];
      const selectedChoiceId = record?.selectedChoiceId ?? null;
      const flagged = record?.flagged ?? false;
      const isIncorrect = selectedChoiceId !== null && selectedChoiceId !== q.correctChoiceId;
      const isUnanswered = selectedChoiceId === null;

      let reason: "incorrect" | "unanswered" | "flagged" | null = null;
      if (isIncorrect) {
        reason = "incorrect";
      } else if (isUnanswered) {
        reason = "unanswered";
      } else if (flagged) {
        reason = "flagged";
      }

      if (reason) {
        items.push({
          id: q.id,
          mode: "exam",
          prompt: q.prompt,
          choices: q.choices,
          correctChoiceId: q.correctChoiceId,
          explanation: q.explanation,
          userChoiceId: selectedChoiceId,
          reason,
          category: q.category,
        });
      }
    });

    if (items.length > 0) {
      const payload: ReviewPayload = {
        createdAt: Date.now(),
        source: "exam",
        items,
      };
      setPayload(payload);
      router.push("/review");
    }
  };

  if (view === "summary") {
    return (
      <div className="flex flex-col gap-6">
        <SectionCard title="Exam Complete">
          <div className="flex items-center gap-4 py-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-lg font-medium">Results are ready</p>
              <p className="text-sm text-muted-foreground">You have completed the exam simulation.</p>
            </div>
          </div>
        </SectionCard>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <SectionCard title="Score">
            <div className="text-3xl font-bold">
              {Math.round((summary.correctCount / summary.totalQuestions) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {summary.correctCount} / {summary.totalQuestions} correct
            </p>
          </SectionCard>
          <SectionCard title="Accuracy">
             <div className="text-3xl font-bold">
              {summary.answeredCount > 0 
                ? Math.round((summary.correctCount / summary.answeredCount) * 100)
                : 0}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Based on {summary.answeredCount} answered
            </p>
          </SectionCard>
          <SectionCard title="Completion">
            <div className="text-3xl font-bold">
              {Math.round((summary.answeredCount / summary.totalQuestions) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {summary.answeredCount} answered, {summary.unansweredCount} missed
            </p>
          </SectionCard>
        </div>

        <SectionCard title="Details">
          <div className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
            <div className="space-y-1">
              <p className="text-muted-foreground">Total Questions</p>
              <p className="font-semibold">{summary.totalQuestions}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Answered</p>
              <p className="font-semibold">{summary.answeredCount}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Unanswered</p>
              <p className="font-semibold text-destructive">{summary.unansweredCount}</p>
            </div>
            <div className="space-y-1">
              <p className="text-muted-foreground">Flagged</p>
              <p className="font-semibold">{summary.flaggedCount}</p>
            </div>
          </div>
        </SectionCard>

        <ActionRow>
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleRestart} variant="outline" className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Restart Exam
            </Button>
            
            <Button onClick={() => { setView("review"); setCurrentIndex(0); }} variant="outline" className="gap-2">
              <BookOpen className="h-4 w-4" />
              Review Exam
            </Button>

            <Button 
              onClick={handleReviewMissed} 
              className="gap-2"
              disabled={summary.incorrectCount === 0 && summary.unansweredCount === 0 && summary.flaggedCount === 0}
            >
              <BookOpen className="h-4 w-4" />
              Review missed & flagged
            </Button>
          </div>
        </ActionRow>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
        <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          Progress: {currentIndex + 1} / {questions.length} ({Math.round(((currentIndex + 1) / questions.length) * 100)}%)
        </div>
        <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5" />
            {summary.answeredCount} Answered
          </span>
          <span className="flex items-center gap-1.5">
            <Flag className="h-3.5 w-3.5" />
            {summary.flaggedCount} Flagged
          </span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_240px]">
        <div className="flex flex-col gap-6">
          <SectionCard title={view === "review" ? `Reviewing Question ${currentIndex + 1} of ${questions.length}` : `Question ${currentIndex + 1} of ${questions.length}`}>
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
            <div className="space-y-6">
              <QuestionBlock
                prompt={currentQuestion.prompt}
                choices={currentQuestion.choices}
                selectedChoiceId={currentRecord.selectedChoiceId}
                onSelectChoice={handleChoiceSelect}
                disableSelection={view !== "exam"}
                showCorrectness={view === "review"}
                showLabels={view === "review"}
                correctChoiceId={currentQuestion.correctChoiceId}
                userChoiceIdForReview={currentRecord.selectedChoiceId}
              />
              
              {view === "review" && currentQuestion.explanation && (
                <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-800 dark:bg-blue-900/20 dark:text-blue-300">
                  <p className="font-semibold mb-1">Explanation:</p>
                  {currentQuestion.explanation}
                </div>
              )}
            </div>
          </SectionCard>

          <ActionRow>
            <div className="flex w-full items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>

                {view === "exam" && (
                  <Button
                    variant="ghost"
                    onClick={handleRestart}
                    className="gap-2 text-muted-foreground hover:text-destructive"
                    title="Reset exam"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span className="hidden sm:inline">Reset</span>
                  </Button>
                )}
              </div>

              <div className="flex items-center gap-2">
                {view === "review" ? (
                  currentRecord.flagged && (
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-amber-50 text-amber-600 border border-amber-200 text-sm font-medium">
                      <Flag className="h-4 w-4 fill-current" />
                      Flagged
                    </div>
                  )
                ) : (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleFlag}
                    className={cn(
                      currentRecord.flagged && "text-amber-500 border-amber-200 bg-amber-50 dark:bg-amber-950/20"
                    )}
                    title={currentRecord.flagged ? "Unflag question" : "Flag for review"}
                  >
                    {currentRecord.flagged ? (
                      <Flag className="h-4 w-4 fill-current" />
                    ) : (
                      <FlagOff className="h-4 w-4" />
                    )}
                  </Button>
                )}

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowGrid(!showGrid)}
                  className="md:hidden"
                  title="Toggle question grid"
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>

                <div className="flex items-center gap-2">
                  {currentIndex === questions.length - 1 ? (
                    view === "exam" ? (
                      <Button onClick={handleFinish} className="bg-green-600 hover:bg-green-700 text-white">
                        Finish Exam
                      </Button>
                    ) : (
                      <Button onClick={() => setView("summary")} variant="secondary">
                        Back to results
                      </Button>
                    )
                  ) : (
                    <>
                      {view === "review" && (
                        <Button onClick={() => setView("summary")} variant="ghost">
                          Back to results
                        </Button>
                      )}
                      <Button onClick={handleNext} className="gap-2">
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </ActionRow>
        </div>

        <div className="flex flex-col gap-6">
          {view === "exam" ? (
            <SectionCard title="Timer">
              <div className="flex flex-col items-center justify-center py-2">
                <div className={cn(
                  "flex items-center gap-2 text-3xl font-mono font-bold tracking-tighter",
                  secondsRemaining < 300 && "text-destructive"
                )}>
                  <Timer className="h-6 w-6" />
                  {formatTime(secondsRemaining)}
                </div>
                <p className="text-xs text-muted-foreground mt-1 text-center">Time remaining</p>
              </div>
            </SectionCard>
          ) : (
            <SectionCard title="Exam Review">
              <div className="space-y-4">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium text-muted-foreground">Score</p>
                  <p className="text-2xl font-bold">{Math.round((summary.correctCount / summary.totalQuestions) * 100)}%</p>
                </div>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => setView("summary")}
                >
                  Back to results
                </Button>
              </div>
            </SectionCard>
          )}

          <div className={cn("flex-col gap-6 hidden md:flex", showGrid && "flex absolute inset-0 z-50 bg-background p-6 md:relative md:p-0 md:bg-transparent md:z-auto")}>
             <SectionCard title="Navigation">
              <div className="grid grid-cols-5 gap-2">
                {questions.map((q, idx) => {
                  const record = recordsById[q.id];
                  const isAnswered = record?.selectedChoiceId != null;
                  const isFlagged = record?.flagged;
                  const isCurrent = idx === currentIndex;
                  
                  const isCorrect = isAnswered && record.selectedChoiceId === q.correctChoiceId;
                  const isIncorrect = isAnswered && record.selectedChoiceId !== q.correctChoiceId;

                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        setCurrentIndex(idx);
                        setShowGrid(false);
                      }}
                      className={cn(
                        "relative flex h-8 w-8 items-center justify-center rounded-md text-xs font-medium transition-all border",
                        isCurrent && "border-primary bg-primary text-primary-foreground",
                        !isCurrent && view === "review" && isCorrect && "bg-green-50 text-green-700 border-green-200",
                        !isCurrent && view === "review" && isIncorrect && "bg-red-50 text-red-700 border-red-200",
                        !isCurrent && view === "exam" && isAnswered && "bg-secondary/50 text-secondary-foreground border-transparent",
                        !isCurrent && !isAnswered && "bg-background text-muted-foreground border-border hover:bg-accent",
                        isFlagged && !isCurrent && "border-amber-400"
                      )}
                    >
                      {idx + 1}
                      {isFlagged && (
                        <span className="absolute -right-1 -top-1 flex h-2 w-2 rounded-full bg-amber-500" />
                      )}
                    </button>
                  );
                })}
              </div>
              <div className="mt-4 flex flex-col gap-2">
                {view === "exam" ? (
                  <Button 
                    variant="outline" 
                    className="w-full text-xs h-8" 
                    onClick={handleFinish}
                  >
                    Finish Exam
                  </Button>
                ) : (
                  <Button 
                    variant="outline" 
                    className="w-full text-xs h-8" 
                    onClick={() => setView("summary")}
                  >
                    Exit Review
                  </Button>
                )}
                {showGrid && (
                   <Button 
                   variant="ghost" 
                   className="w-full text-xs h-8 md:hidden" 
                   onClick={() => setShowGrid(false)}
                 >
                   Back to Question
                 </Button>
                )}
              </div>
            </SectionCard>
          </div>
        </div>
      </div>
    </div>
  );
}
