"use client";

import React from "react";
import { QuestionPrompt } from "./question-prompt";
import { ChoiceList } from "./choice-list";
import { ChoiceListProps } from "./types";

type QuestionBlockProps = {
  prompt: string;
  meta?: React.ReactNode;
  difficulty?: "easy" | "medium" | "hard";
  showDifficulty?: boolean;
} & ChoiceListProps;

export function QuestionBlock({ 
  prompt, 
  meta, 
  difficulty,
  showDifficulty,
  ...choiceListProps 
}: QuestionBlockProps) {
  return (
    <div className="flex flex-col gap-5">
      <QuestionPrompt 
        prompt={prompt} 
        meta={meta} 
        difficulty={difficulty}
        showDifficulty={showDifficulty}
      />
      <ChoiceList {...choiceListProps} />
    </div>
  );
}

