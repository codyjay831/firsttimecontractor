export type PracticeQuestion = {
  id: string
  packId?: string
  prompt: string
  choices: { id: string; text: string }[]
  correctChoiceId: string
  explanation: string
  category?: string
  difficulty?: "easy" | "medium" | "hard"
}

