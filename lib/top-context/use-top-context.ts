"use client";

import { useContext } from "react";
import { TopContext, TopContextValue } from "./provider";

export function useTopContext(): TopContextValue {
  const context = useContext(TopContext);
  if (context === undefined) {
    throw new Error("useTopContext must be used within a TopContextProvider");
  }
  return context;
}

