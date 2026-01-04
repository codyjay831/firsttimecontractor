"use client";

import { useState } from "react";
import { SAMPLE_PRACTICE_QUESTIONS } from "@/lib/practice/sample-questions";
import { SectionCard } from "@/components/scaffold/section-card";
import { ActionRow } from "@/components/scaffold/action-row";
import { EmptyState } from "@/components/scaffold/empty-state";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, RotateCcw } from "lucide-react";

export function PracticeSession() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  const questions = SAMPLE_PRACTICE_QUESTIONS;
  const isFinished = currentIndex >= questions.length;
  const currentQuestion = !isFinished ? questions[currentIndex] : null;
  const isCorrect = status === "submitted" && selectedChoiceId === currentQuestion?.correctChoiceId;

  const handleChoiceSelect = (choiceId: string) => {
    if (status === "submitted") return;
    setSelectedChoiceId(choiceId);
  };

  const handleSubmit = () => {
    if (selectedChoiceId) {
      setStatus("submitted");
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
    setSelectedChoiceId(null);
    setStatus("idle");
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedChoiceId(null);
    setStatus("idle");
  };

  if (isFinished) {
    return (
      <div className="space-y-6">
        <EmptyState
          icon={CheckCircle2}
          title="You finished this set"
          description="Great job! You've completed all the practice questions in this session."
        />
        <ActionRow>
          <Button onClick={handleRestart} variant="outline" className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Restart session
          </Button>
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
        <p className="text-base leading-relaxed">
          {currentQuestion.prompt}
        </p>
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
        {status === "idle" ? (
          <Button 
            onClick={handleSubmit} 
            disabled={!selectedChoiceId}
            className="w-full sm:w-auto"
          >
            Check Answer
          </Button>
        ) : (
          <Button 
            onClick={handleNext}
            className="w-full sm:w-auto"
          >
            {currentIndex === questions.length - 1 ? "Finish Session" : "Next Question"}
          </Button>
        )}
      </ActionRow>
    </div>
  );
}

