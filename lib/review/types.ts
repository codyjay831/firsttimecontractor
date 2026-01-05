export type ReviewReason = "incorrect" | "skipped" | "unanswered" | "flagged";

export type ReviewItem = {
  id: string;
  mode: "practice" | "exam";
  prompt: string;
  choices?: { id: string; text: string }[];
  correctChoiceId?: string;
  explanation?: string;
  userChoiceId?: string | null;
  reason: ReviewReason;
};

export type ReviewPayload = {
  createdAt: number;
  source: "practice" | "exam";
  items: ReviewItem[];
};

