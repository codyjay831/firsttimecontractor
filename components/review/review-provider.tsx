"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { ReviewPayload } from "@/lib/review/types";

interface ReviewContextType {
  payload: ReviewPayload | null;
  setPayload: (payload: ReviewPayload) => void;
  clearPayload: () => void;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export function ReviewProvider({ children }: { children: ReactNode }) {
  const [payload, setPayloadState] = useState<ReviewPayload | null>(null);

  const setPayload = (newPayload: ReviewPayload) => {
    setPayloadState(newPayload);
  };

  const clearPayload = () => {
    setPayloadState(null);
  };

  return (
    <ReviewContext.Provider value={{ payload, setPayload, clearPayload }}>
      {children}
    </ReviewContext.Provider>
  );
}

export function useReview() {
  const context = useContext(ReviewContext);
  if (context === undefined) {
    throw new Error("useReview must be used within a ReviewProvider");
  }
  return context;
}

