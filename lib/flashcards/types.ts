export type Flashcard = {
  id: string;
  front: string;
  back: string;
  category?: string;
  difficulty?: "easy" | "medium" | "hard";
};

