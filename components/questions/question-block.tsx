"use client";

import React from "react";
import { QuestionPrompt } from "./question-prompt";
import { ChoiceList } from "./choice-list";
import { ChoiceListProps } from "./types";

type QuestionBlockProps = {
  prompt: string;
  meta?: React.ReactNode;
} & ChoiceListProps;

export function QuestionBlock({ prompt, meta, ...choiceListProps }: QuestionBlockProps) {
  return (
    <div className="flex flex-col gap-6">
      <QuestionPrompt prompt={prompt} meta={meta} />
      <ChoiceList {...choiceListProps} />
    </div>
  );
}

