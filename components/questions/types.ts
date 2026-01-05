export type Choice = { id: string; text: string };

export type QuestionLike = {
  id: string;
  prompt: string;
  choices: Choice[];
};

export type ChoiceListProps = {
  choices: Choice[];
  selectedChoiceId?: string | null;
  onSelectChoice?: (choiceId: string) => void;
  disableSelection?: boolean;     // default true when no onSelectChoice
  showCorrectness?: boolean;      // default false
  correctChoiceId?: string;
  userChoiceIdForReview?: string | null; // optional, for review highlighting if needed
  showLabels?: boolean;           // default false
};

