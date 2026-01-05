"use client";

import { useState, useEffect, useMemo } from "react";
import { SAMPLE_EXAM_QUESTIONS } from "@/lib/exam/sample-exam-questions";
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
  LayoutGrid
} from "lucide-react";

type ExamQuestionRecord = {
  selectedChoiceId: string | null;
  flagged: boolean;
};

const EXAM_TIME_SECONDS = 30 * 60; // 30 minutes

export function ExamSession() {
  const questions = SAMPLE_EXAM_QUESTIONS;
  
  // Basic State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(EXAM_TIME_SECONDS);
  const [recordsById, setRecordsById] = useState<Record<string, ExamQuestionRecord>>({});
  const [showGrid, setShowGrid] = useState(false);

  // Timer logic
  useEffect(() => {
    if (isFinished || secondsRemaining <= 0) return;

    const interval = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isFinished, secondsRemaining]);

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
    if (isFinished) return;
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
    setIsFinished(true);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFinished(false);
    setSecondsRemaining(EXAM_TIME_SECONDS);
    setRecordsById({});
    setShowGrid(false);
  };

  // Rendering logic
  if (isFinished) {
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
          <Button onClick={handleRestart} variant="outline" className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Restart Exam
          </Button>
        </ActionRow>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-6 md:grid-cols-[1fr_240px]">
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
              <p className="text-base leading-relaxed font-medium">
                {currentQuestion.prompt}
              </p>
              <div className="grid gap-3">
                {currentQuestion.choices.map((choice) => {
                  const isSelected = currentRecord.selectedChoiceId === choice.id;
                  return (
                    <button
                      key={choice.id}
                      onClick={() => handleChoiceSelect(choice.id)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg border p-4 text-left transition-all",
                        !isSelected && "hover:bg-accent/50",
                        isSelected && "border-primary bg-primary/5 ring-1 ring-primary"
                      )}
                    >
                      <div className={cn(
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium transition-colors",
                        isSelected && "bg-primary text-primary-foreground border-primary"
                      )}>
                        {choice.id.toUpperCase()}
                      </div>
                      <span className="text-sm font-medium">{choice.text}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </SectionCard>

          <ActionRow>
            <div className="flex w-full items-center justify-between gap-4">
              <Button
                variant="ghost"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>

              <div className="flex items-center gap-2">
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

                <Button
                  variant="outline"
                  onClick={() => setShowGrid(!showGrid)}
                  className="gap-2 md:hidden"
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>

                {currentIndex === questions.length - 1 ? (
                  <Button onClick={handleFinish} className="bg-green-600 hover:bg-green-700 text-white">
                    Finish Exam
                  </Button>
                ) : (
                  <Button onClick={handleNext} className="gap-2">
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </ActionRow>
        </div>

        <div className="flex flex-col gap-6">
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

          <div className={cn("flex-col gap-6 hidden md:flex", showGrid && "flex absolute inset-0 z-50 bg-background p-6 md:relative md:p-0 md:bg-transparent md:z-auto")}>
             <SectionCard title="Navigation">
              <div className="grid grid-cols-5 gap-2">
                {questions.map((q, idx) => {
                  const record = recordsById[q.id];
                  const isAnswered = record?.selectedChoiceId != null;
                  const isFlagged = record?.flagged;
                  const isCurrent = idx === currentIndex;

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
                        !isCurrent && isAnswered && "bg-secondary/50 text-secondary-foreground border-transparent",
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
                <Button 
                  variant="outline" 
                  className="w-full text-xs h-8" 
                  onClick={handleFinish}
                >
                  Finish Exam
                </Button>
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

