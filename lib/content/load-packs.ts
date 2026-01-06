import corePack from "../../content/packs/core.json";
import { ContentPack, FlashcardDeck } from "./pack-types";
import { PracticeQuestion } from "../practice/types";

/**
 * Lightweight runtime validation for the content pack shape.
 * Ensures basic structure exists before the app consumes it.
 */
function validatePack(pack: unknown): pack is ContentPack {
  if (typeof pack !== "object" || pack === null) return false;
  
  const p = pack as Record<string, unknown>;
  const requiredArrays = ["practiceQuestions", "examQuestions", "flashcardDecks"];
  for (const key of requiredArrays) {
    if (!Array.isArray(p[key])) {
      console.error(`ContentPack validation failed: ${key} is not an array`);
      return false;
    }
  }

  if (typeof p.packId !== "string" || typeof p.version !== "string") {
    console.error("ContentPack validation failed: packId or version missing/invalid");
    return false;
  }

  return true;
}

// Validate the core pack at module load time
if (!validatePack(corePack)) {
  throw new Error("Critical: Core content pack failed runtime validation.");
}

// Cast to our strict type after validation
const defaultPack = corePack as unknown as ContentPack;

export function getPracticeQuestions(): PracticeQuestion[] {
  return defaultPack.practiceQuestions;
}

export function getExamQuestions(): PracticeQuestion[] {
  return defaultPack.examQuestions;
}

export function getFlashcardDecks(): FlashcardDeck[] {
  return defaultPack.flashcardDecks;
}

