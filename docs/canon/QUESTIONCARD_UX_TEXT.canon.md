# QUESTIONCARD_UX_TEXT.canon.md
Version: 1.0  
Status: CANON — LOCKED  
Project: Firsttimecontractor  
Scope: Question UI Labels, Section Names, UX Text

---

## 1. Purpose

Define the exact, canonical text used in the QuestionCard UI so that:
- all questions render consistently
- AI-generated and human-written content match stylistically
- labels do not drift over time
- users experience stable, predictable language

This canon governs **labels only**, not content.

---

## 2. Single Renderer Requirement

All questions MUST be rendered using the `QuestionCard` component.

No feature, page, or mode may introduce alternative labels or section names.

---

## 3. Canonical Labels (LOCKED)

### 3.1 Header / Meta

The following labels are allowed depending on context:

- **Question**
- **Practice Question**
- **Exam Review**

No additional variants are permitted.

---

### 3.2 Prompt Area

- **No label**

Rule:
> The question prompt must stand on its own.  
> No introductory text, icons, or labels are allowed.

---

### 3.3 Answer Section

Depending on question type, exactly one of the following MUST be used:

- **Choose the best answer**
- **Select all that apply**
- **Your answer**

No synonyms or alternates are allowed.

---

### 3.4 Feedback Banner

The feedback banner MUST use only:

- **Correct**
- **Not quite**

Forbidden:
- “Wrong”
- “Incorrect”
- “You failed”
- Emojis or icons as text replacements

---

## 4. Explanation Block (LOCKED STRUCTURE & LABELS)

Explanation sections MUST appear in the following order and use the exact labels below.

### 4.1 Textbook Rule
> *(Authoritative explanation)*

Purpose:
- Exam-aligned
- Formal
- Precise

---

### 4.2 Why this matters
> *(Human / intuitive explanation)*

Purpose:
- Real-world reasoning
- Interpretation
- Practical understanding

---

### 4.3 Example *(optional)*
> *(Scenario if provided)*

Rules:
- Optional
- Must reinforce the rule
- Must not introduce new exceptions

---

## 5. Sources (Collapsed by Default)

Sources MUST render under a collapsible section.

Allowed labels:
- **Source**
- **References**

No other labels are permitted.

---

## 6. Footer Tools (LOCKED)

Footer tools MUST use the following labels:

- **Flag question**
- **Add note**
- **Review later**

Rules:
- Tools must not alter question content
- Tools must not appear inline with explanations

---

## 7. Canon Lock Statement

Any change that:
- alters these labels,
- introduces synonyms,
- or allows per-question overrides

is CANON-breaking and requires explicit re-ratification.

---

END OF CANON
