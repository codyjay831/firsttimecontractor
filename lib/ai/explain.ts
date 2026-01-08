import { PracticeQuestion } from "../practice/types";

export type ExplanationDepth = "brief" | "standard" | "deep";

export interface ExplanationPayload {
  question: PracticeQuestion;
  userChoiceId: string | null;
  depth?: ExplanationDepth;
  followUpQuery?: string;
  history?: { role: "user" | "assistant"; content: string }[];
}

/**
 * Generates an explanation using a local stub.
 * In a real implementation, this would call an LLM API.
 */
export async function getExplanation(payload: ExplanationPayload): Promise<string> {
  const { question, userChoiceId, depth = "standard", followUpQuery } = payload;
  
  // Simulate a slight network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  if (followUpQuery) {
    if (followUpQuery.toLowerCase().includes("why")) {
      return `This specific requirement exists to ensure safety and compliance with building codes. By following this rule, contractors prevent common structural failures that could lead to costly repairs or dangerous conditions.`;
    }
    if (followUpQuery.toLowerCase().includes("example")) {
      return `For example, if you were installing a new circuit breaker, you would need to ensure the wire gauge matches the breaker's amperage rating. Using a 14-gauge wire on a 20-amp breaker is a violation of this rule and poses a fire hazard.`;
    }
    return `That's an interesting question about ${question.category || "this topic"}. The core principle here is to prioritize long-term durability over short-term cost savings.`;
  }

  const isCorrect = userChoiceId === question.correctChoiceId;
  const correctChoice = question.choices.find(c => c.id === question.correctChoiceId);
  const userChoice = question.choices.find(c => c.id === userChoiceId);

  let response = `### Question Analysis (${depth} depth)\n\n`;
  
  if (depth === "brief") {
    if (isCorrect) {
      response += `Correct. The right answer is **${correctChoice?.text}**.`;
    } else {
      response += `Incorrect. The correct answer is **${correctChoice?.text}**.`;
    }
    return response;
  }

  response += `**Topic:** ${question.category || "General Knowledge"}\n\n`;
  
  if (isCorrect) {
    response += `Correct! You selected the right answer. \n\n`;
  } else {
    response += `The correct answer is **${correctChoice?.text}**. \n\n`;
    if (userChoice) {
      response += `You selected **${userChoice?.text}**, which is incorrect because it doesn't fully address the requirements described in the prompt. \n\n`;
    }
  }

  if (question.explanation) {
    response += `**Detailed Explanation:** ${question.explanation}\n\n`;
  }

  if (depth === "deep") {
    response += `**Deep Dive:** In the context of ${question.category || "the trade"}, this rule is governed by Section 402.1 of the regional building code. It specifically addresses the tolerance levels allowed for ${question.category || "these types of installations"}. Failing to meet these standards can result in failed inspections and legal liability for the contractor.\n\n`;
  }

  response += `**Key Takeaway:** Understanding the relationship between ${question.category || "the subject matter"} and professional standards is critical for exam success.`;

  return response;
}

