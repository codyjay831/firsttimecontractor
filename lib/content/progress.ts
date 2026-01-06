import { getSessionItem, setSessionItem } from "../session-storage";

const PROGRESS_STORAGE_KEY = "content_pack_progress";

interface PackProgress {
  answeredQuestionIds: string[];
}

/**
 * Global progress object: { [packId]: { answeredQuestionIds: string[] } }
 */
type GlobalProgress = Record<string, PackProgress>;

/**
 * Retrieves the progress for a specific content pack.
 */
export function getPackProgress(packId: string): PackProgress {
  const globalProgress = getSessionItem<GlobalProgress>(PROGRESS_STORAGE_KEY, {});
  return globalProgress[packId] || { answeredQuestionIds: [] };
}

/**
 * Records a question as answered for a specific content pack.
 * If packId is provided, it's recorded there.
 */
export function recordAnsweredQuestion(packId: string, questionId: string): void {
  const globalProgress = getSessionItem<GlobalProgress>(PROGRESS_STORAGE_KEY, {});
  const packProgress = globalProgress[packId] || { answeredQuestionIds: [] };

  if (!packProgress.answeredQuestionIds.includes(questionId)) {
    packProgress.answeredQuestionIds.push(questionId);
    globalProgress[packId] = packProgress;
    setSessionItem(PROGRESS_STORAGE_KEY, globalProgress);
  }
}

/**
 * Computes progress stats for a content pack.
 */
export function getPackProgressStats(packId: string, totalQuestions: number) {
  const progress = getPackProgress(packId);
  const answeredCount = progress.answeredQuestionIds.length;
  // Percentage capped at 100% just in case totalQuestions is outdated or smaller than answered
  const percent = totalQuestions > 0 ? Math.min(100, Math.round((answeredCount / totalQuestions) * 100)) : 0;
  
  return {
    answeredCount,
    totalQuestions,
    percent
  };
}

