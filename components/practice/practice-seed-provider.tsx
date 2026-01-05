"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { PracticeQuestion } from "@/lib/practice/types";

export type PracticeSeed = {
  source: "review";
  questions: PracticeQuestion[];
} | null;

interface PracticeSeedContextType {
  seed: PracticeSeed;
  setPracticeSeed: (seed: PracticeSeed) => void;
  clearPracticeSeed: () => void;
}

const PracticeSeedContext = createContext<PracticeSeedContextType | undefined>(undefined);

export function PracticeSeedProvider({ children }: { children: ReactNode }) {
  const [seed, setSeed] = useState<PracticeSeed>(null);

  const setPracticeSeed = (newSeed: PracticeSeed) => {
    setSeed(newSeed);
  };

  const clearPracticeSeed = () => {
    setSeed(null);
  };

  return (
    <PracticeSeedContext.Provider value={{ seed, setPracticeSeed, clearPracticeSeed }}>
      {children}
    </PracticeSeedContext.Provider>
  );
}

export function usePracticeSeed() {
  const context = useContext(PracticeSeedContext);
  if (context === undefined) {
    throw new Error("usePracticeSeed must be used within a PracticeSeedProvider");
  }
  return context;
}

