"use client";

import React, { createContext, useEffect, useState, useMemo, useRef } from "react";
import { TopContextState, DEFAULT_CONTEXT, State, LicenseType, Trade } from "./types";
import { loadContext, saveContext } from "./storage";

export interface TopContextValue extends TopContextState {
  setState: (state: State) => void;
  setLicenseType: (type: LicenseType) => void;
  setTrade: (trade: Trade) => void;
}

export const TopContext = createContext<TopContextValue | undefined>(undefined);

export function TopContextProvider({ children }: { children: React.ReactNode }) {
  const [state, setInternalState] = useState<TopContextState>(DEFAULT_CONTEXT);
  const isInitialMount = useRef(true);

  // Load from localStorage on mount
  useEffect(() => {
    const loaded = loadContext();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setInternalState(loaded);
  }, []);

  // Save to localStorage whenever state changes, skipping the very first mount
  // to avoid overwriting localStorage with defaults before the load effect runs.
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    saveContext(state);
  }, [state]);

  // Debug: log when context state changes
  React.useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("[TopContextProvider] State updated:", state);
    }
  }, [state]);

  const value = useMemo(() => ({
    ...state,
    setState: (newState: State) => {
      if (process.env.NODE_ENV === "development") {
        console.log("[TopContextProvider] setState called:", newState);
      }
      setInternalState(prev => ({ ...prev, state: newState }));
    },
    setLicenseType: (newType: LicenseType) => {
      if (process.env.NODE_ENV === "development") {
        console.log("[TopContextProvider] setLicenseType called:", newType);
      }
      setInternalState(prev => ({ ...prev, licenseType: newType }));
    },
    setTrade: (newTrade: Trade) => {
      if (process.env.NODE_ENV === "development") {
        console.log("[TopContextProvider] setTrade called:", newTrade);
      }
      setInternalState(prev => ({ ...prev, trade: newTrade }));
    },
  }), [state]);

  return (
    <TopContext.Provider value={value}>
      {children}
    </TopContext.Provider>
  );
}
