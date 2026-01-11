export const STORAGE_KEYS = {
  PRACTICE_CONFIG_PREFIX: "practice_config",
  EXAM_CONFIG_PREFIX: "exam_config",
  // Existing exam session keys (from exam-page.tsx)
  EXAM_IS_STARTED: "exam_is_started",
  EXAM_QUESTIONS: "exam_questions",
  EXAM_DURATION: "exam_duration",
  EXAM_SESSION_INDEX: "exam_current_index",
  EXAM_SESSION_VIEW: "exam_view",
  EXAM_SESSION_REMAINING: "exam_seconds_remaining",
  EXAM_SESSION_RECORDS: "exam_records",
  EXAM_SESSION_GRID: "exam_show_grid",
} as const;

export function getPracticeConfigKey(lensKey: string) {
  return `${STORAGE_KEYS.PRACTICE_CONFIG_PREFIX}:${lensKey}`;
}

export function getExamConfigKey(lensKey: string) {
  return `${STORAGE_KEYS.EXAM_CONFIG_PREFIX}:${lensKey}`;
}
