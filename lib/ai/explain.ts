import { PracticeQuestion } from "../practice/types";

export interface ExplanationPayload {
  question: PracticeQuestion;
  userChoiceId: string | null;
}

/**
 * Generates an explanation using a local stub.
 * In a real implementation, this would call an LLM API.
 */
export async function getExplanation(payload: ExplanationPayload): Promise<string> {
  const { question, userChoiceId } = payload;
  const isCorrect = userChoiceId === question.correctChoiceId;
  const correctChoice = question.choices.find(c => c.id === question.correctChoiceId);
  const userChoice = question.choices.find(c => c.id === userChoiceId);

  // Simulate a slight network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  let response = `### Question Analysis\n\n`;
  response += `**Topic:** ${question.category || "General Knowledge"}\n\n`;
  
  if (isCorrect) {
    response += `Correct! You selected the right answer. \n\n`;
  } else {
    response += `The correct answer is **${correctChoice?.text}**. \n\n`;
    if (userChoice) {
      response += `You selected **${userChoice?.text}**, which is incorrect because it doesn't fully address the requirements or regulations described in the prompt. \n\n`;
    }
  }

  if (question.explanation) {
    response += `**Detailed Explanation:** ${question.explanation}\n\n`;
  }

  response += `**Key Takeaway:** Understanding the relationship between ${question.category || "the subject matter"} and professional standards is critical for exam success.`;

  return response;
}

