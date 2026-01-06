import corePack from "../../content/packs/core.json";
import c10Pack from "../../content/packs/c10.json";
import coreCaPack from "../../content/packs/core-ca.json";
import c10CaPack from "../../content/packs/c10-ca.json";
import { ContentPack, FlashcardDeck } from "./pack-types";
import { PracticeQuestion } from "../practice/types";
import { validatePack } from "./validate-pack";

const PACK_REGISTRY: Record<string, unknown> = {
  "core": corePack,
  "c10": c10Pack,
  "core-ca": coreCaPack,
  "c10-ca": c10CaPack,
};

const SESSION_KEY = "ftc_active_pack_id";

let lastPackErrors: string[] | null = null;

/**
 * Lightweight runtime validation for the content pack shape.
 * Ensures basic structure exists before the app consumes it.
 */
function validatePackShape(pack: unknown): pack is ContentPack {
  if (typeof pack !== "object" || pack === null) return false;
  
  const p = pack as Record<string, unknown>;
  const requiredArrays = ["practiceQuestions", "examQuestions", "flashcardDecks"];
  for (const key of requiredArrays) {
    if (!Array.isArray(p[key])) {
      console.error(`ContentPack shape validation failed: ${key} is not an array`);
      return false;
    }
  }

  if (typeof p.packId !== "string" || typeof p.version !== "string") {
    console.error("ContentPack shape validation failed: packId or version missing/invalid");
    return false;
  }

  return true;
}

// Validate registry shape at module load time
for (const [id, pack] of Object.entries(PACK_REGISTRY)) {
  if (!validatePackShape(pack)) {
    throw new Error(`Critical: Content pack '${id}' failed runtime shape validation.`);
  }
  
  // Also run logical validation
  const validation = validatePack(pack as ContentPack);
  if (!validation.ok) {
    console.error(`Content Pack "${id}" has logical errors:`, validation.errors);
  }
}

export function getLastPackErrors(): string[] | null {
  // Only show errors in development
  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  // If we haven't loaded a pack yet, or to ensure we have current errors, 
  // we can trigger a load of the active pack.
  if (lastPackErrors === null) {
    loadPack(getActivePackId());
  }

  return lastPackErrors;
}

export function listPacks(): (Pick<ContentPack, "packId" | "title" | "applicable">)[] {
  return Object.entries(PACK_REGISTRY).map(([id, pack]) => {
    const p = pack as ContentPack;
    return {
      packId: id,
      title: p.title,
      applicable: p.applicable,
    };
  });
}

export function getActivePackId(): string {
  if (typeof window === "undefined") return "core";
  return window.sessionStorage.getItem(SESSION_KEY) || "core";
}

export function setActivePackId(packId: string): void {
  if (typeof window === "undefined") return;
  if (!PACK_REGISTRY[packId]) {
    console.error(`Cannot set active pack: '${packId}' not found in registry.`);
    return;
  }
  window.sessionStorage.setItem(SESSION_KEY, packId);
  // Clear errors when changing packs so they are re-validated on next load/get
  lastPackErrors = null;
}

export function loadPack(packId: string): ContentPack {
  const pack = PACK_REGISTRY[packId] || PACK_REGISTRY["core"];
  const contentPack = pack as ContentPack;

  const validation = validatePack(contentPack);
  
  if (!validation.ok) {
    console.error(`Validation failed for pack "${packId}":`, validation.errors);
    if (process.env.NODE_ENV === "development") {
      lastPackErrors = validation.errors;
    } else {
      lastPackErrors = null;
    }
  } else {
    lastPackErrors = null;
  }

  return contentPack;
}

export function getPracticeQuestionsActive(): PracticeQuestion[] {
  return loadPack(getActivePackId()).practiceQuestions;
}

export function getExamQuestionsActive(): PracticeQuestion[] {
  return loadPack(getActivePackId()).examQuestions;
}

export function getFlashcardDecksActive(): FlashcardDeck[] {
  return loadPack(getActivePackId()).flashcardDecks;
}

