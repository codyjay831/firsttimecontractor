import { getPackProgress } from "../content/progress";
import { listPacks, loadPack } from "../content/load-packs";

export interface CategoryPerformance {
  category: string;
  correct: number;
  incorrect: number;
  total: number;
  accuracy: number;
}

export interface DifficultyPerformance {
  difficulty: string;
  correct: number;
  incorrect: number;
  total: number;
  accuracy: number;
}

/**
 * Computes session-wide analytics based on sessionStorage progress.
 * Aggregates performance by category and difficulty across all packs.
 */
export function getSessionAnalytics() {
  const packs = listPacks();
  const categoryMap: Record<string, { correct: number; incorrect: number }> = {};
  const difficultyMap: Record<string, { correct: number; incorrect: number }> = {};

  packs.forEach((p) => {
    const progress = getPackProgress(p.packId);
    
    // If no progress for this pack, skip loading it
    if (progress.correctQuestionIds.length === 0 && progress.incorrectQuestionIds.length === 0) {
      return;
    }

    const content = loadPack(p.packId);
    const allQuestions = [...content.practiceQuestions, ...content.examQuestions];
    const questionMap = new Map(allQuestions.map(q => [q.id, q]));

    progress.correctQuestionIds.forEach((id) => {
      const q = questionMap.get(id);
      if (q) {
        const cat = q.category || "General";
        const diff = q.difficulty || "medium";
        
        categoryMap[cat] = categoryMap[cat] || { correct: 0, incorrect: 0 };
        categoryMap[cat].correct++;
        
        difficultyMap[diff] = difficultyMap[diff] || { correct: 0, incorrect: 0 };
        difficultyMap[diff].correct++;
      }
    });

    progress.incorrectQuestionIds.forEach((id) => {
      const q = questionMap.get(id);
      if (q) {
        const cat = q.category || "General";
        const diff = q.difficulty || "medium";
        
        categoryMap[cat] = categoryMap[cat] || { correct: 0, incorrect: 0 };
        categoryMap[cat].incorrect++;
        
        difficultyMap[diff] = difficultyMap[diff] || { correct: 0, incorrect: 0 };
        difficultyMap[diff].incorrect++;
      }
    });
  });

  const missedByCategory: CategoryPerformance[] = Object.entries(categoryMap)
    .map(([category, stats]) => ({
      category,
      ...stats,
      total: stats.correct + stats.incorrect,
      accuracy: Math.round((stats.correct / (stats.correct + stats.incorrect)) * 100),
    }))
    .sort((a, b) => a.accuracy - b.accuracy); // Sort by lowest accuracy (weakest first)

  const missedByDifficulty: DifficultyPerformance[] = Object.entries(difficultyMap)
    .map(([difficulty, stats]) => ({
      difficulty,
      ...stats,
      total: stats.correct + stats.incorrect,
      accuracy: Math.round((stats.correct / (stats.correct + stats.incorrect)) * 100),
    }))
    .sort((a, b) => a.accuracy - b.accuracy);

  return {
    missedByCategory,
    missedByDifficulty,
    totalAnswered: Object.values(categoryMap).reduce((acc, curr) => acc + curr.correct + curr.incorrect, 0)
  };
}

