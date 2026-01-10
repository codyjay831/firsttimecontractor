"use client";

import React from "react";
import { DifficultyBadge } from "./difficulty-badge";

type QuestionPromptProps = {
  prompt: string;
  meta?: React.ReactNode;
  difficulty?: "easy" | "medium" | "hard";
  showDifficulty?: boolean;
};

export function QuestionPrompt({ prompt, meta, difficulty, showDifficulty }: QuestionPromptProps) {
  return (
    <div className="flex flex-col gap-4">
      {(meta || (showDifficulty && difficulty)) && (
        <div className="flex flex-wrap gap-2">
          {showDifficulty && difficulty && (
            <DifficultyBadge difficulty={difficulty} />
          )}
          {meta}
        </div>
      )}
      <p className="text-base leading-relaxed">
        {prompt}
      </p>
    </div>
  );
}

