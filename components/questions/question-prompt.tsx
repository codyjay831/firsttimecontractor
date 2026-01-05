"use client";

import React from "react";

type QuestionPromptProps = {
  prompt: string;
  meta?: React.ReactNode;
};

export function QuestionPrompt({ prompt, meta }: QuestionPromptProps) {
  return (
    <div className="flex flex-col gap-4">
      {meta && <div className="flex flex-wrap gap-2">{meta}</div>}
      <p className="text-base leading-relaxed">
        {prompt}
      </p>
    </div>
  );
}

