"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { ChoiceListProps } from "./types";

export function ChoiceList({
  choices,
  selectedChoiceId,
  onSelectChoice,
  disableSelection,
  showCorrectness = false,
  correctChoiceId,
  userChoiceIdForReview,
  showLabels = false,
}: ChoiceListProps) {
  const isReadOnly = !onSelectChoice || disableSelection;
  const effectiveUserChoiceId = userChoiceIdForReview ?? selectedChoiceId;

  return (
    <div className="grid gap-3">
      {choices.map((choice) => {
        const isSelected = effectiveUserChoiceId === choice.id;
        const isCorrectChoice = showCorrectness && choice.id === correctChoiceId;
        const isWrongChoice = showCorrectness && isSelected && choice.id !== correctChoiceId;
        const isUnselectedReadOnly = isReadOnly && !isSelected && !isCorrectChoice;

        const Component = isReadOnly ? "div" : "button";

        return (
          <Component
            key={choice.id}
            onClick={!isReadOnly ? () => onSelectChoice?.(choice.id) : undefined}
            disabled={!isReadOnly && disableSelection}
            className={cn(
              "flex items-center gap-3 rounded-lg border p-4 text-left transition-all",
              !isReadOnly && !isSelected && "hover:bg-accent/50",
              isSelected && !showCorrectness && "border-primary bg-primary/5 ring-1 ring-primary",
              isCorrectChoice && "border-green-500 bg-green-50 dark:bg-green-950/20 ring-1 ring-green-500",
              isWrongChoice && "border-destructive bg-destructive/5 ring-1 ring-destructive",
              showCorrectness && !isCorrectChoice && !isWrongChoice && "opacity-50",
              isUnselectedReadOnly && !showCorrectness && "opacity-60",
              isReadOnly && "cursor-default"
            )}
          >
            <div
              className={cn(
                "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium transition-colors",
                isSelected && !showCorrectness && "bg-primary text-primary-foreground border-primary",
                isCorrectChoice && "bg-green-500 text-white border-green-500",
                isWrongChoice && "bg-destructive text-destructive-foreground border-destructive"
              )}
            >
              {choice.id.toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{choice.text}</span>
              {showLabels && showCorrectness && isCorrectChoice && (
                <span className="text-[10px] font-bold uppercase text-green-600 dark:text-green-400">
                  Correct Answer
                </span>
              )}
              {showLabels && showCorrectness && isWrongChoice && (
                <span className="text-[10px] font-bold uppercase text-destructive">
                  Your Choice
                </span>
              )}
            </div>
          </Component>
        );
      })}
    </div>
  );
}

