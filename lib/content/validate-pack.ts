import { ContentPack } from "./pack-types";
import { PracticeQuestion } from "../practice/types";

export interface ValidationResult {
  ok: boolean;
  errors: string[];
}

/**
 * Validates a ContentPack for common logical issues.
 * - Duplicate question IDs (across practice and exam)
 * - Missing correctChoiceId or invalid correctChoiceId in choices
 * - Duplicate deck IDs
 * - Duplicate flashcard IDs inside a deck
 */
export function validatePack(pack: ContentPack): ValidationResult {
  const errors: string[] = [];

  // 1. Check for duplicate question IDs
  const questionIds = new Set<string>();
  
  const validateQuestions = (questions: PracticeQuestion[], type: string) => {
    questions.forEach((q, index) => {
      const qId = q.id || `(missing id at index ${index})`;
      
      if (!q.id) {
        errors.push(`Question at index ${index} in ${type} is missing an ID`);
      } else if (questionIds.has(q.id)) {
        errors.push(`Duplicate question ID found: "${q.id}" in ${type}`);
      }
      if (q.id) questionIds.add(q.id);

      // Check choices and correctChoiceId
      if (!q.choices || !Array.isArray(q.choices)) {
        errors.push(`Question "${qId}" in ${type} is missing choices array`);
      } else if (q.choices.length === 0) {
        errors.push(`Question "${qId}" in ${type} has an empty choices array`);
      } else {
        const choiceIds = new Set(q.choices.map((c) => c.id));
        if (choiceIds.size < q.choices.length) {
          errors.push(`Question "${qId}" in ${type} has duplicate choice IDs`);
        }
        
        if (!q.correctChoiceId) {
          errors.push(`Question "${qId}" in ${type} is missing correctChoiceId`);
        } else if (!choiceIds.has(q.correctChoiceId)) {
          errors.push(`Question "${qId}" in ${type} has correctChoiceId "${q.correctChoiceId}" which does not match any choice IDs`);
        }
      }

      // Check difficulty if present
      if (q.difficulty && !["easy", "medium", "hard"].includes(q.difficulty)) {
        errors.push(`Question "${qId}" in ${type} has invalid difficulty: "${q.difficulty}"`);
      }
    });
  };

  validateQuestions(pack.practiceQuestions || [], "practiceQuestions");
  validateQuestions(pack.examQuestions || [], "examQuestions");

  // 2. Check for duplicate deck IDs and duplicate flashcard IDs inside a deck
  const deckIds = new Set<string>();
  (pack.flashcardDecks || []).forEach((deck, deckIndex) => {
    const dId = deck.id || `(missing id at index ${deckIndex})`;
    
    if (!deck.id) {
      errors.push(`Deck at index ${deckIndex} is missing an ID`);
    } else if (deckIds.has(deck.id)) {
      errors.push(`Duplicate deck ID found: "${deck.id}"`);
    }
    if (deck.id) deckIds.add(deck.id);

    const cardIds = new Set<string>();
    (deck.cards || []).forEach((card, cardIndex) => {
      if (!card.id) {
        errors.push(`Flashcard at index ${cardIndex} in deck "${dId}" is missing an ID`);
      } else if (cardIds.has(card.id)) {
        errors.push(`Duplicate flashcard ID "${card.id}" in deck "${dId}"`);
      }
      if (card.id) cardIds.add(card.id);
    });
  });

  return {
    ok: errors.length === 0,
    errors,
  };
}
