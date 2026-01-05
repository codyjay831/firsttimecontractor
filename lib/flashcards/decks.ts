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
    title: "Core Construction",
    description: "Essential knowledge for general contracting, including carpentry and structural basics.",
    cards: SAMPLE_FLASHCARDS,
  },
  {
    id: "safety-legal",
    title: "Safety & Legal",
    description: "Focus on OSHA regulations, safety protocols, and construction law.",
    cards: [
      {
        id: "sl_1",
        front: "Who is responsible for providing PPE on a job site?",
        back: "The employer.",
        category: "Safety",
        difficulty: "easy"
      },
      {
        id: "sl_2",
        front: "What is the maximum height for a ladder before fall protection is required in some jurisdictions?",
        back: "Typically 6 feet in construction, but always check OSHA 1926 subpart M.",
        category: "Safety",
        difficulty: "medium"
      },
      {
        id: "sl_3",
        front: "What is a 'Mechanic's Lien'?",
        back: "A security interest in the title to property for the benefit of those who have supplied labor or materials.",
        category: "Legal",
        difficulty: "hard"
      },
      {
        id: "sl_4",
        front: "What does 'Indemnification' mean in a contract?",
        back: "One party's promise to pay for the other party's loss or damage.",
        category: "Legal",
        difficulty: "hard"
      },
      {
        id: "sl_5",
        front: "How often should fire extinguishers be inspected?",
        back: "Monthly for a visual check, and annually for a professional maintenance check.",
        category: "Safety",
        difficulty: "medium"
      },
      {
        id: "sl_6",
        front: "What is the purpose of a 'Toolbox Talk'?",
        back: "Short, informal safety meetings held at the job site to discuss specific safety hazards and procedures.",
        category: "Safety",
        difficulty: "easy"
      },
      {
        id: "sl_7",
        front: "Define 'Negligence' in a legal context.",
        back: "Failure to exercise the care that a reasonably prudent person would exercise in like circumstances.",
        category: "Legal",
        difficulty: "medium"
      },
      {
        id: "sl_8",
        front: "What is a 'Stop Work Order'?",
        back: "An order issued by a building official or other authority to halt construction activity due to a violation.",
        category: "Legal",
        difficulty: "easy"
      },
      {
        id: "sl_9",
        front: "What are the three components of the 'Fire Triangle'?",
        back: "Heat, Fuel, and Oxygen.",
        category: "Safety",
        difficulty: "medium"
      },
      {
        id: "sl_10",
        front: "What is 'Force Majeure'?",
        back: "A contract clause that frees both parties from liability or obligation when an extraordinary event beyond their control occurs.",
        category: "Legal",
        difficulty: "hard"
      }
    ],
  },
];

