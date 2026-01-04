Cool — we’ll **canon-lock the Question Data Model** now for **Firsttimecontractor**.

This canon is **framework-compatible** with **Next.js + Tailwind** (UI layer) and keeps the data model **backend-agnostic** (Prisma/Postgres later, or JSON now). The canon defines **shapes + invariants**, not database tables yet.

---

````md
# QUESTION_DATA_MODEL.canon.md
Version: 1.0  
Status: CANON — LOCKED  
Project: Firsttimecontractor  
Applies To: Practice Tests, Guided Practice, Flashcards, Exam Simulation, Analytics  
UI Stack Note: Next.js + Tailwind (UI), data model is framework-agnostic

---

## 1. Purpose

Define the canonical data model for questions and attempts so we can support:
- Flashcards (recall)
- Guided Practice (instant feedback + teaching)
- Exam Simulation (score at end)
- State/Country/License filtering without URL/path explosion
- Weak areas, missed questions, flagged questions, review flows
- Stable explanations that do not drift over time

---

## 2. Core Principles (Non-Negotiable)

### 2.1 One Truth Per Question
Each question MUST have exactly one **canonical explanation** of the correct rule/reasoning.

- We do NOT maintain “two full explanations” (one for right, one for wrong).
- UI MAY display a short contextual line depending on correctness, but the truth remains singular.

**Reason:** prevents contradiction drift and reduces maintenance cost.

---

### 2.2 Context Filters Content, It Never Gates
Questions are tagged with applicability (country/state/license/exam), but the platform MUST:
- Always allow core fundamentals without requiring location selection
- Treat state-specific content as an “unlock,” not a blocker

---

### 2.3 Tests Are Views, Not Containers
A “Practice Test 1–8” is a VIEW over a question pool, not a permanent binding.

**Reason:** avoids future restructures when questions are added/retired.

---

## 3. Canonical Entities

### 3.1 Question

A Question is the atomic teaching unit.

Required capabilities:
- Multiple question types (single choice, multi-select, true/false, fill-blank)
- Choices (when applicable)
- Answer key (machine-gradable)
- Explanation (canonical truth)
- Scope rules (applicability)
- Tags (topic indexing)
- Version + status lifecycle

#### Canonical Type Shape (TypeScript reference)
```ts
type UUID = string;
type CountryCode = "US" | string;
type StateCode = "CA" | "TX" | "NY" | string;

type Difficulty = "easy" | "medium" | "hard";
type QuestionType = "single_choice" | "multi_select" | "true_false" | "fill_blank" | "scenario_single";
type ExplanationFormat = "markdown" | "plain";

type ScopeRule = {
  country?: CountryCode;     // omitted => global
  state?: StateCode;         // omitted => all states in country
  licenseKey?: string;       // "electrical" | "gc" | "solar" | "business_law" ...
  examKey?: string;          // "c10" | "journeyman" | "nascla" ...
  codeFamily?: string;       // optional, e.g. "NEC"
  codeEdition?: string;      // optional, e.g. "2023"
};

type Tag = { key: string; label: string };

type Choice = {
  id: string;                // "A"/"B"/"C"/"D" or uuid
  text: string;
  rationaleHint?: string;    // optional “why tempting” micro-hint (NOT full explainer)
};

type AnswerKey =
  | { type: "single_choice"; correctChoiceId: string }
  | { type: "multi_select"; correctChoiceIds: string[] }
  | { type: "true_false"; correct: boolean }
  | { type: "fill_blank"; acceptableAnswers: string[]; normalize?: "lower_trim" | "custom" };

type Explanation = {
  format: ExplanationFormat;

  // Canonical explanation: same regardless of user answer
  canonical: string;

  // Optional micro-deltas (1–2 sentences max)
  whenCorrect?: string;
  whenIncorrect?: string;

  // Optional source pointers (non-blocking)
  sources?: Array<{ label: string; ref?: string }>;
};

type Question = {
  id: UUID;

  prompt: string;
  questionType: QuestionType;

  choices?: Choice[];
  answerKey: AnswerKey;

  explanation: Explanation;

  tags: Tag[];
  difficulty: Difficulty;
  estimatedSeconds?: number;

  scope: {
    rules: ScopeRule[];          // allow multiple applicability rules
    isCoreFundamental: boolean;  // true => available even with no state selected
  };

  status: "draft" | "active" | "retired";
  version: number;

  createdAt: string;
  updatedAt: string;

  assets?: Array<{ type: "image" | "diagram"; url: string; alt?: string }>;
};
````

---

### 3.2 Test Blueprint (Practice Test Definition)

A Test Blueprint defines a **named test experience** (e.g. “Practice Test 1”) as a VIEW over questions.

Requirements:

* Question count (default 25)
* Context scope (country/state/license/exam)
* Selection rules (tags, difficulty mix)
* Shuffle policy

#### Canonical Type Shape

```ts
type TestBlueprint = {
  id: UUID;
  title: string;                  // "Practice Test 1"
  intent: "practice_tests";
  mode: "guided" | "exam";
  questionCount: number;          // default 25

  scope: {
    country?: CountryCode;
    state?: StateCode;
    licenseKey?: string;
    examKey?: string;
  };

  selection: {
    includeTags?: string[];
    excludeTags?: string[];
    difficultyMix?: Partial<Record<Difficulty, number>>;
    isCoreFundamentalAllowed: boolean;
    stateSpecificAllowed: boolean;
  };

  shuffle: { questions: boolean; choices: boolean };

  status: "draft" | "active";
  createdAt: string;
  updatedAt: string;
};
```

---

### 3.3 Attempt + AttemptItem (Analytics + Review)

Attempts store:

* what the user took
* what they answered
* correctness
* timing and flags
* review support

#### Canonical Type Shape

```ts
type Mode = "flashcard" | "guided" | "exam";

type Attempt = {
  id: UUID;
  userId: UUID;

  testBlueprintId?: UUID;         // null for ad-hoc sessions
  mode: Mode;

  context: {
    country?: CountryCode;
    state?: StateCode;
    licenseKey?: string;
    examKey?: string;
  };

  startedAt: string;
  completedAt?: string;

  scoring: {
    totalQuestions: number;
    correctCount: number;
    percent: number;
    passFail?: "pass" | "fail";
  };
};

type AttemptItem = {
  id: UUID;
  attemptId: UUID;
  questionId: UUID;

  presentedOrder: number;

  selected: {
    choiceIds?: string[];
    textAnswer?: string;
  };

  isCorrect: boolean;

  feedbackShownAt?: string;       // guided mode UX support
  timeSpentSeconds?: number;

  flagged?: boolean;
  notes?: string;
};
```

---

## 4. Mode Behavior Requirements

### 4.1 Flashcards

* No scoring required
* Show answer + canonical explanation immediately

### 4.2 Guided Practice

* Immediate correctness feedback
* Always show canonical explanation after answer
* May show one micro-delta line (whenCorrect/whenIncorrect)

### 4.3 Exam Simulation

* No feedback during test
* Show score at end
* Review shows canonical explanations after completion

---

## 5. Question Count Guidance (Non-binding but recommended)

* Minimum viable pool per license: ~100 questions
* Strong coverage pool per license: 150–200 questions
* Practice test size: 25 questions per test
* Tests are VIEWs; question-to-test binding must remain flexible

---

## 6. Canon Lock Statement

This data model is foundational for Firsttimecontractor’s learning and testing system.
Any changes that:

* introduce multiple competing explanations per question
* hard-bind questions permanently to tests
* require full context completion to access fundamentals

are CANON-breaking and require explicit re-ratification.

---

END OF CANON

```

---

If you want, next we can canon-lock the **three modes** (Flashcards / Guided / Exam) as their own short canon doc, or we can define the **Context model** that ties Country/State/License to available pools.
```
