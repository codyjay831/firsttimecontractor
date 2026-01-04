import { PracticeQuestion } from "./types";

export const SAMPLE_PRACTICE_QUESTIONS: PracticeQuestion[] = [
  {
    id: "q1",
    prompt: "Which of the following best describes the purpose of a bid bond?",
    choices: [
      { id: "a", text: "To guarantee that the contractor will perform the work as specified." },
      { id: "b", text: "To ensure that the contractor will pay all subcontractors and suppliers." },
      { id: "c", text: "To guarantee that the winning bidder will enter into the contract." },
      { id: "d", text: "To protect the contractor from liability for property damage." }
    ],
    correctChoiceId: "c",
    explanation: "A bid bond guarantees that the contractor will enter into the contract if awarded the project at the bid price.",
    category: "Bidding & Bonding",
    difficulty: "medium"
  },
  {
    id: "q2",
    prompt: "What is the typical timeframe for a preliminary notice to be filed by a subcontractor?",
    choices: [
      { id: "a", text: "10 days after starting work" },
      { id: "b", text: "20 days after starting work" },
      { id: "c", text: "30 days after starting work" },
      { id: "d", text: "Before starting work" }
    ],
    correctChoiceId: "b",
    explanation: "In many states, a preliminary notice must be filed within 20 days of starting work to preserve lien rights.",
    category: "Legal & Liens",
    difficulty: "hard"
  },
  {
    id: "q3",
    prompt: "Under which type of contract is the contractor paid for actual costs plus a fixed fee?",
    choices: [
      { id: "a", text: "Lump sum" },
      { id: "b", text: "Unit price" },
      { id: "c", text: "Cost-plus" },
      { id: "d", text: "Time and materials" }
    ],
    correctChoiceId: "c",
    explanation: "A cost-plus contract reimburses the contractor for actual project costs plus an agreed-upon fee.",
    category: "Contracts",
    difficulty: "easy"
  },
  {
    id: "q4",
    prompt: "What is the primary purpose of workers' compensation insurance?",
    choices: [
      { id: "a", text: "To cover damage to the project site" },
      { id: "b", text: "To provide medical benefits and wage replacement to injured workers" },
      { id: "c", text: "To protect the owner from contractor default" },
      { id: "d", text: "To cover theft of construction equipment" }
    ],
    correctChoiceId: "b",
    explanation: "Workers' compensation provides medical care and partial wage replacement for employees injured on the job.",
    category: "Insurance",
    difficulty: "easy"
  },
  {
    id: "q5",
    prompt: "Which document specifies the quality of materials and workmanship required for a project?",
    choices: [
      { id: "a", text: "The drawings" },
      { id: "b", text: "The bid form" },
      { id: "c", text: "The specifications" },
      { id: "d", text: "The change order" }
    ],
    correctChoiceId: "c",
    explanation: "The specifications (specs) provide detailed written instructions on material quality and execution standards.",
    category: "Project Management",
    difficulty: "medium"
  }
];

