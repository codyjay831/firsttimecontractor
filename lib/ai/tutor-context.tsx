"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { ExplanationDepth } from "./explain";
import { getSessionItem, setSessionItem } from "../session-storage";

interface TutorContextType {
  tutorEnabled: boolean;
  setTutorEnabled: (enabled: boolean) => void;
  depth: ExplanationDepth;
  setDepth: (depth: ExplanationDepth) => void;
}

const TutorContext = createContext<TutorContextType | undefined>(undefined);

const STORAGE_KEYS = {
  TUTOR_ENABLED: "tutor_mode_enabled",
  TUTOR_DEPTH: "tutor_mode_depth",
};

export function TutorProvider({ children }: { children: React.ReactNode }) {
  // Use safe defaults for SSR, then hydrate from storage after mount
  const [tutorEnabled, setTutorEnabled] = useState<boolean>(false);
  const [depth, setDepth] = useState<ExplanationDepth>("standard");
  const isHydrated = useRef(false);

  // Load from storage after mount (hydration-safe)
  useEffect(() => {
    if (!isHydrated.current) {
      const storedEnabled = getSessionItem(STORAGE_KEYS.TUTOR_ENABLED, false);
      const storedDepth = getSessionItem<ExplanationDepth>(STORAGE_KEYS.TUTOR_DEPTH, "standard");
      window.requestAnimationFrame(() => {
        setTutorEnabled(storedEnabled);
        setDepth(storedDepth);
        isHydrated.current = true;
      });
    }
  }, []);

  // Save to storage on changes (skip initial mount to avoid overwriting)
  useEffect(() => {
    if (isHydrated.current) {
      setSessionItem(STORAGE_KEYS.TUTOR_ENABLED, tutorEnabled);
    }
  }, [tutorEnabled]);

  useEffect(() => {
    if (isHydrated.current) {
      setSessionItem(STORAGE_KEYS.TUTOR_DEPTH, depth);
    }
  }, [depth]);

  return (
    <TutorContext.Provider value={{ tutorEnabled, setTutorEnabled, depth, setDepth }}>
      {children}
    </TutorContext.Provider>
  );
}

export function useTutor() {
  const context = useContext(TutorContext);
  if (context === undefined) {
    throw new Error("useTutor must be used within a TutorProvider");
  }
  return context;
}

