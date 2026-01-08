import { getSessionItem, setSessionItem } from "../session-storage";
import { saveQuestionProgress } from "./sync";

const PROGRESS_STORAGE_KEY = "content_pack_progress";
const REPETITION_STORAGE_KEY = "question_repetition_metadata";

export interface RepetitionMetadata {
  lastSeenAt: number;
  timesIncorrect: number;
  nextEligibleAt: number;
}

type GlobalRepetition = Record<string, RepetitionMetadata>;

interface PackProgress {
  correctQuestionIds: string[];
  incorrectQuestionIds: string[];
}

/**
 * Global progress object: { [packId]: { correctQuestionIds: string[], incorrectQuestionIds: string[] } }
 */
type GlobalProgress = Record<string, PackProgress>;

/**
 * Retrieves the progress for a specific content pack.
 */
export function getPackProgress(packId: string): PackProgress {
  const globalProgress = getSessionItem<GlobalProgress>(PROGRESS_STORAGE_KEY, {});
  return globalProgress[packId] || { correctQuestionIds: [], incorrectQuestionIds: [] };
}

/**
 * Records a question as answered for a specific content pack.
 * If packId is provided, it's recorded there.
 */
export function recordAnsweredQuestion(packId: string, questionId: string, isCorrect: boolean, isAuthenticated: boolean = false): void {
  const globalProgress = getSessionItem<GlobalProgress>(PROGRESS_STORAGE_KEY, {});
  const packProgress = globalProgress[packId] || { correctQuestionIds: [], incorrectQuestionIds: [] };

  // Remove from both first to handle re-answering (though current UI might not allow it easily)
  packProgress.correctQuestionIds = packProgress.correctQuestionIds.filter(id => id !== questionId);
  packProgress.incorrectQuestionIds = packProgress.incorrectQuestionIds.filter(id => id !== questionId);

  if (isCorrect) {
    packProgress.correctQuestionIds.push(questionId);
  } else {
    packProgress.incorrectQuestionIds.push(questionId);
  }

  globalProgress[packId] = packProgress;
  setSessionItem(PROGRESS_STORAGE_KEY, globalProgress);

  // Record repetition metadata
  const globalRepetition = getSessionItem<GlobalRepetition>(REPETITION_STORAGE_KEY, {});
  const meta = globalRepetition[questionId] || {
    lastSeenAt: 0,
    timesIncorrect: 0,
    nextEligibleAt: 0,
  };

  meta.lastSeenAt = Date.now();
  if (!isCorrect) {
    meta.timesIncorrect++;
    // If incorrect, resurface soon (e.g., in 10 minutes or next session)
    meta.nextEligibleAt = Date.now() + (10 * 60 * 1000);
  } else {
    // If correct, push out further (e.g., 24 hours)
    // Basic v1: constant 24h interval for correct answers
    meta.nextEligibleAt = Date.now() + (24 * 60 * 60 * 1000);
  }

  globalRepetition[questionId] = meta;
  setSessionItem(REPETITION_STORAGE_KEY, globalRepetition);

  // Sync to DB if authenticated
  if (isAuthenticated) {
    saveQuestionProgress(packId, questionId, isCorrect).catch(err => {
      console.error("Failed to sync progress to DB:", err);
    });
  }
}

/**
 * Computes progress stats for a content pack.
 */
export function getPackProgressStats(packId: string, totalQuestions: number) {
  const progress = getPackProgress(packId);
  const correctCount = progress.correctQuestionIds.length;
  const incorrectCount = progress.incorrectQuestionIds.length;
  const answeredCount = correctCount + incorrectCount;
  
  // Percentage of completion
  const percent = totalQuestions > 0 ? Math.min(100, Math.round((answeredCount / totalQuestions) * 100)) : 0;
  
  // Accuracy (correct / answered)
  const accuracy = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;
  
  return {
    correctCount,
    incorrectCount,
    answeredCount,
    totalQuestions,
    percent,
    accuracy
  };
}

/**
 * Computes an estimated exam readiness score.
 * Formula: Core (40%) + Trade (60%)
 * If no Trade data, Core is 100% or we show a warning.
 */
export function calculateReadinessScore(allPacks: { packId: string }[]) {
  const corePacks = allPacks.filter(p => p.packId.toLowerCase().includes("core"));
  const tradePacks = allPacks.filter(p => !p.packId.toLowerCase().includes("core"));

  const getAverageAccuracy = (packs: { packId: string }[]) => {
    if (packs.length === 0) return null;
    
    let totalAccuracy = 0;
    let packsWithData = 0;

    packs.forEach(p => {
      const progress = getPackProgress(p.packId);
      const answered = progress.correctQuestionIds.length + progress.incorrectQuestionIds.length;
      if (answered > 0) {
        totalAccuracy += (progress.correctQuestionIds.length / answered);
        packsWithData++;
      }
    });

    return packsWithData > 0 ? (totalAccuracy / packsWithData) : null;
  };

  const coreAccuracy = getAverageAccuracy(corePacks);
  const tradeAccuracy = getAverageAccuracy(tradePacks);

  if (coreAccuracy === null && tradeAccuracy === null) return 0;

  if (tradeAccuracy === null) {
    return Math.round((coreAccuracy || 0) * 100);
  }

  if (coreAccuracy === null) {
    return Math.round(tradeAccuracy * 100);
  }

  const score = (coreAccuracy * 0.4) + (tradeAccuracy * 0.6);
  return Math.round(score * 100);
}

/**
 * Retrieves repetition metadata for a specific question.
 */
export function getQuestionRepetition(questionId: string): RepetitionMetadata {
  const globalRepetition = getSessionItem<GlobalRepetition>(REPETITION_STORAGE_KEY, {});
  return globalRepetition[questionId] || {
    lastSeenAt: 0,
    timesIncorrect: 0,
    nextEligibleAt: 0,
  };
}

/**
 * Retrieves all repetition metadata.
 */
export function getAllRepetitionMetadata(): GlobalRepetition {
  return getSessionItem<GlobalRepetition>(REPETITION_STORAGE_KEY, {});
}

