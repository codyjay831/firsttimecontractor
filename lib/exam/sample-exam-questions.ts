import { PracticeQuestion } from "../practice/types";

export const SAMPLE_EXAM_QUESTIONS: PracticeQuestion[] = [
  {
    id: "ex1",
    prompt: "A contractor is required to keep records of all employees for how many years according to federal law?",
    choices: [
      { id: "a", text: "1 year" },
      { id: "b", text: "3 years" },
      { id: "c", text: "5 years" },
      { id: "d", text: "7 years" }
    ],
    correctChoiceId: "b",
    explanation: "FLSA requires employers to keep payroll records for at least 3 years.",
    category: "Regulations",
    difficulty: "medium"
  },
  {
    id: "ex2",
    prompt: "Which of the following is considered a 'fixed' cost in a construction project?",
    choices: [
      { id: "a", text: "Direct labor" },
      { id: "b", text: "Materials" },
      { id: "c", text: "Office rent" },
      { id: "d", text: "Subcontractor fees" }
    ],
    correctChoiceId: "c",
    explanation: "Fixed costs, like rent, do not vary with the volume of work produced.",
    category: "Financial Management",
    difficulty: "easy"
  },
  {
    id: "ex3",
    prompt: "What is the primary purpose of a 'Stop Notice' in construction?",
    choices: [
      { id: "a", text: "To halt all work on the project site" },
      { id: "b", text: "To notify the owner of a safety violation" },
      { id: "c", text: "To intercept unpaid funds directly from the lender or owner" },
      { id: "d", text: "To cancel the construction contract" }
    ],
    correctChoiceId: "c",
    explanation: "A Stop Notice is a remedy for subcontractors and suppliers to freeze project funds to ensure payment.",
    category: "Legal & Liens",
    difficulty: "hard"
  },
  {
    id: "ex4",
    prompt: "Which business structure provides the strongest protection against personal liability for the owners?",
    choices: [
      { id: "a", text: "Sole Proprietorship" },
      { id: "b", text: "General Partnership" },
      { id: "c", text: "C-Corporation" },
      { id: "d", text: "Joint Venture" }
    ],
    correctChoiceId: "c",
    explanation: "Corporations are separate legal entities, offering limited liability protection to shareholders.",
    category: "Business Structure",
    difficulty: "medium"
  },
  {
    id: "ex5",
    prompt: "A 'Critical Path' in project scheduling refers to:",
    choices: [
      { id: "a", text: "The sequence of tasks that determines the shortest possible project duration" },
      { id: "b", text: "The list of most expensive tasks" },
      { id: "c", text: "The path for safety inspections" },
      { id: "d", text: "The workflow for material deliveries" }
    ],
    correctChoiceId: "a",
    explanation: "The critical path is the longest sequence of dependent activities and determines the project end date.",
    category: "Project Management",
    difficulty: "hard"
  },
  {
    id: "ex6",
    prompt: "What does 'net 30' typically mean on an invoice?",
    choices: [
      { id: "a", text: "30% discount if paid immediately" },
      { id: "b", text: "Payment is due within 30 days of the invoice date" },
      { id: "c", text: "30 days of work are included" },
      { id: "d", text: "Net profit is 30%" }
    ],
    correctChoiceId: "b",
    explanation: "Net 30 indicates that the full payment is expected within 30 calendar days.",
    category: "Financial Management",
    difficulty: "easy"
  },
  {
    id: "ex7",
    prompt: "Which of these is a characteristic of an 'Independent Contractor' vs an 'Employee'?",
    choices: [
      { id: "a", text: "The employer controls how the work is done" },
      { id: "b", text: "The worker uses their own tools and equipment" },
      { id: "c", text: "The worker receives a W-2 form" },
      { id: "d", text: "The worker is paid an hourly wage" }
    ],
    correctChoiceId: "b",
    explanation: "Independent contractors usually provide their own tools and have control over the methods used.",
    category: "Regulations",
    difficulty: "medium"
  },
  {
    id: "ex8",
    prompt: "What is 'Retainage' in a construction contract?",
    choices: [
      { id: "a", text: "A fee for keeping old equipment" },
      { id: "b", text: "A portion of the contract price withheld until the project is complete" },
      { id: "c", text: "The amount of profit retained by the owner" },
      { id: "d", text: "Insurance premium for employee retention" }
    ],
    correctChoiceId: "b",
    explanation: "Retainage is a percentage of the payment held back to ensure the contractor finishes the work.",
    category: "Contracts",
    difficulty: "medium"
  },
  {
    id: "ex9",
    prompt: "Which insurance policy covers damage to the project itself during construction?",
    choices: [
      { id: "a", text: "General Liability" },
      { id: "b", text: "Workers' Compensation" },
      { id: "c", text: "Builder's Risk" },
      { id: "d", text: "Professional Liability" }
    ],
    correctChoiceId: "c",
    explanation: "Builder's risk insurance covers the structure and materials during the construction phase.",
    category: "Insurance",
    difficulty: "medium"
  },
  {
    id: "ex10",
    prompt: "If a contractor fails to pay a subcontractor, what can the subcontractor file to claim interest in the property?",
    choices: [
      { id: "a", text: "A lawsuit" },
      { id: "b", text: "A Mechanic's Lien" },
      { id: "c", text: "A Cease and Desist" },
      { id: "d", text: "A Bankruptcy petition" }
    ],
    correctChoiceId: "b",
    explanation: "A mechanic's lien provides security for those who labor or provide materials for the improvement of real property.",
    category: "Legal & Liens",
    difficulty: "medium"
  },
  {
    id: "ex11",
    prompt: "What is the purpose of an 'Addendum' in the bidding process?",
    choices: [
      { id: "a", text: "To cancel the bid" },
      { id: "b", text: "To modify the bidding documents before the bid opening" },
      { id: "c", text: "To announce the winner" },
      { id: "d", text: "To request more time for bidding" }
    ],
    correctChoiceId: "b",
    explanation: "Addenda are issued during the bidding phase to clarify or change the project documents.",
    category: "Bidding & Bonding",
    difficulty: "medium"
  },
  {
    id: "ex12",
    prompt: "Under the Davis-Bacon Act, contractors on federal projects must pay:",
    choices: [
      { id: "a", text: "Minimum wage" },
      { id: "b", text: "Prevailing wages" },
      { id: "c", text: "Double time for all hours" },
      { id: "d", text: "Executive salaries" }
    ],
    correctChoiceId: "b",
    explanation: "The Davis-Bacon Act requires the payment of prevailing wage rates on federally funded construction projects.",
    category: "Regulations",
    difficulty: "hard"
  },
  {
    id: "ex13",
    prompt: "Which financial statement shows a company's assets, liabilities, and equity at a specific point in time?",
    choices: [
      { id: "a", text: "Income Statement" },
      { id: "b", text: "Cash Flow Statement" },
      { id: "c", text: "Balance Sheet" },
      { id: "d", text: "Trial Balance" }
    ],
    correctChoiceId: "c",
    explanation: "The balance sheet provides a snapshot of the financial position of a business at a specific date.",
    category: "Financial Management",
    difficulty: "easy"
  },
  {
    id: "ex14",
    prompt: "A 'Change Order' is used to:",
    choices: [
      { id: "a", text: "Change the contractor's name" },
      { id: "b", text: "Modify the scope, price, or time of an existing contract" },
      { id: "c", text: "Order new office supplies" },
      { id: "d", text: "Replace a subcontractor" }
    ],
    correctChoiceId: "b",
    explanation: "A change order is a formal amendment to the contract that alters the work, cost, or schedule.",
    category: "Contracts",
    difficulty: "easy"
  },
  {
    id: "ex15",
    prompt: "What does OSHA stand for?",
    choices: [
      { id: "a", text: "Office of Safety and Health Administration" },
      { id: "b", text: "Occupational Safety and Health Administration" },
      { id: "c", text: "Organization for Safety and Health Awareness" },
      { id: "d", text: "Operational Safety and Hazards Agency" }
    ],
    correctChoiceId: "b",
    explanation: "OSHA is the federal agency responsible for ensuring safe and healthful working conditions.",
    category: "Safety",
    difficulty: "easy"
  }
];

