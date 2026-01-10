"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type DifficultyBadgeProps = {
  difficulty: "easy" | "medium" | "hard";
  className?: string;
};

export function DifficultyBadge({ difficulty, className }: DifficultyBadgeProps) {
  const label = difficulty.charAt(0).toUpperCase() + difficulty.slice(1);

  return (
    <Badge
      variant="outline"
      className={cn(
        "font-normal text-xs uppercase tracking-wider",
        difficulty === "easy" && "text-green-600 border-green-200 bg-green-50 dark:bg-green-950/20",
        difficulty === "medium" && "text-amber-600 border-amber-200 bg-amber-50 dark:bg-amber-950/20",
        difficulty === "hard" && "text-destructive border-destructive/20 bg-destructive/5",
        className
      )}
    >
      <span className="sr-only">Difficulty: </span>
      {label}
    </Badge>
  );
}
