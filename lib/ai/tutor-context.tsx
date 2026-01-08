"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
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
  const [tutorEnabled, setTutorEnabled] = useState<boolean>(() => 
    getSessionItem(STORAGE_KEYS.TUTOR_ENABLED, false)
  );
  const [depth, setDepth] = useState<ExplanationDepth>(() => 
    getSessionItem(STORAGE_KEYS.TUTOR_DEPTH, "standard")
  );

  useEffect(() => {
    setSessionItem(STORAGE_KEYS.TUTOR_ENABLED, tutorEnabled);
  }, [tutorEnabled]);

  useEffect(() => {
    setSessionItem(STORAGE_KEYS.TUTOR_DEPTH, depth);
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

