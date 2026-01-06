import { PracticeQuestion } from "../practice/types";
import { Flashcard } from "../flashcards/types";

export interface FlashcardDeck {
  id: string;
  title: string;
  description?: string;
  cards: Flashcard[];
}

export interface ContentPack {
  packId: string;
  title: string;
  version: string;
  practiceQuestions: PracticeQuestion[];
  examQuestions: PracticeQuestion[];
  flashcardDecks: FlashcardDeck[];
  prerequisites?: string[];
  applicable?: {
    states?: string[];
    licenses?: string[];
    trades?: string[];
  };
}

