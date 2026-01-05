import { Flashcard } from "./types";
import { SAMPLE_FLASHCARDS } from "./sample-deck";

export type FlashcardDeck = {
  id: string;
  title: string;
  description?: string;
  cards: Flashcard[];
};

export const DECKS: FlashcardDeck[] = [
  {
    id: "core",
    title: "Core Concepts",
    description: "General construction fundamentals",
    cards: SAMPLE_FLASHCARDS
  },
  {
    id: "safety",
    title: "Safety Basics",
    description: "Jobsite safety and OSHA-style concepts",
    cards: [
      {
        id: "s_1",
        front: "What does OSHA stand for?",
        back: "Occupational Safety and Health Administration",
        category: "Safety",
        difficulty: "easy"
      },
      {
        id: "s_2",
        front: "What color is a typical fire extinguisher for electrical fires (Class C)?",
        back: "Red (but labeled with a C symbol, usually in a blue circle)",
        category: "Safety",
        difficulty: "medium"
      },
      {
        id: "s_3",
        front: "What is the maximum height for a ladder before fall protection is required in some settings?",
        back: "Varies, but often 6 feet in construction for general work.",
        category: "Safety",
        difficulty: "medium"
      },
      {
        id: "s_4",
        front: "What is a MSDS (now SDS)?",
        back: "Safety Data Sheet - document containing information on the potential hazards of a chemical product.",
        category: "Safety",
        difficulty: "easy"
      },
      {
        id: "s_5",
        front: "What does GFCI stand for?",
        back: "Ground Fault Circuit Interrupter",
        category: "Safety",
        difficulty: "easy"
      },
      {
        id: "s_6",
        front: "What is the 'Fatal Four' in construction safety?",
        back: "Falls, Struck-By, Caught-In/Between, and Electrocutions.",
        category: "Safety",
        difficulty: "hard"
      },
      {
        id: "s_7",
        front: "What is the purpose of a lockout/tagout (LOTO) procedure?",
        back: "To ensure that dangerous machines are properly shut off and not started up again prior to the completion of maintenance or repair work.",
        category: "Safety",
        difficulty: "hard"
      },
      {
        id: "s_8",
        front: "What type of protection is required when working with silica dust?",
        back: "Respiratory protection (like an N95 or higher) and often water suppression or vacuum systems.",
        category: "Safety",
        difficulty: "medium"
      },
      {
        id: "s_9",
        front: "What is the 'Competent Person' in OSHA terms?",
        back: "One who is capable of identifying existing and predictable hazards and has authorization to take prompt corrective measures to eliminate them.",
        category: "Safety",
        difficulty: "hard"
      },
      {
        id: "s_10",
        front: "How often should power tools be inspected for damage?",
        back: "Before each use.",
        category: "Safety",
        difficulty: "easy"
      },
      {
        id: "s_11",
        front: "What is the minimum distance a ladder should extend above a landing?",
        back: "3 feet.",
        category: "Safety",
        difficulty: "medium"
      },
      {
        id: "s_12",
        front: "What does the 'A' in the PASS acronym for fire extinguisher use stand for?",
        back: "Aim at the base of the fire.",
        category: "Safety",
        difficulty: "medium"
      }
    ]
  }
];
