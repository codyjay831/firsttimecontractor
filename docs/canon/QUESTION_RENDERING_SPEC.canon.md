# QUESTION_RENDERING_SPEC.canon.md
Version: 1.0  
Status: CANON — LOCKED  
Project: Firsttimecontractor  
Scope: Question UI layout, spacing, icons, media, typography tokens, explanation presentation

---

## 1. Purpose

Define a single consistent rendering style for questions so that:
- all questions look consistent now and years later
- AI-generated content matches human-created content
- layout does not drift across features/modes
- typography and spacing are centrally controlled

---

## 2. Single Renderer Rule (Non-Negotiable)

All questions MUST render through a single composed component:
- `QuestionCard`

No page or feature may implement its own custom question layout.

Reasons:
- prevents UI drift
- ensures accessibility consistency
- enables global style changes without per-question edits

---

## 3. Global Typography Rule (LOCKED)

### 3.1 Global Font Token
Typography (font family, size scale, line-height) MUST be defined globally via theme tokens.

Content MUST NOT define fonts.

- Changing global font updates all questions automatically
- Users cannot override typography (admin-only theme control)

---

## 4. QuestionCard Layout Structure (LOCKED)

QuestionCard MUST be composed of the following regions, in this order:

1) Header Row
2) Prompt Block
3) Media Block (optional)
4) Answer Block (choices or input)
5) Feedback Banner (mode-dependent)
6) Explanation Block (mode-dependent)
7) Footer Tools (flag, notes, sources)

---

## 5. Spacing and Density Rules (Required)

### 5.1 Spacing Philosophy
- Use consistent vertical rhythm
- Avoid cramped layouts
- Keep reading flow stable between questions

### 5.2 Required Spacing Pattern (conceptual)
- Tight spacing inside a region
- Medium spacing between regions
- No region may collapse into another visually

Exact spacing tokens are controlled globally (Tailwind + CSS variables), not per question.

---

## 6. Icons and Visual Signals (LOCKED)

Icons must be consistent and minimal.

### 6.1 Allowed Icons (conceptual)
- Correct: check indicator
- Incorrect: x indicator
- Info: explanation/help marker
- Flag: user flag marker
- Image: media indicator (optional)

### 6.2 Icon Rules
- No decorative icons in prompt text
- Icons must not replace text meaning
- Feedback icons appear only after an answer is submitted (guided) or in review (exam)

---

## 7. Media Rules (Images/Diagrams) (LOCKED)

### 7.1 Placement
Media MUST appear between Prompt Block and Answer Block.

### 7.2 Size Behavior
- Media must fit container width
- Preserve aspect ratio
- Provide zoom/open behavior (optional) without breaking layout

### 7.3 Accessibility
- Every media asset MUST include `alt` text
- If the question depends on the image, the alt must be descriptive enough for accessibility

---

## 8. Answer Block Rules (LOCKED)

### 8.1 Choice Layout
- Choices are presented as a vertical list
- Each choice is selectable via mouse + keyboard
- Choice text wraps naturally; no horizontal scroll

### 8.2 Choice Randomization
If a test blueprint specifies choice shuffling, the UI MUST support it without layout changes.

---

## 9. Explanation Block Rules (LOCKED)

### 9.1 Explanation Structure
Explanations MUST render in two labeled sections:

1) **Textbook Rule**
2) **Human Explanation**

Optionally:
3) **Example** (only if provided)

### 9.2 Mode Display Rules
- Flashcards: show answer + explanation immediately
- Guided: show explanation immediately after answering
- Exam: hide explanation until completion; show during review

### 9.3 Source Rendering (Optional)
If sources exist:
- render in a compact “Sources” area
- collapsed by default (recommended)
- never interrupts the main explanation flow

---

## 10. Feedback Banner Rules (Correct/Incorrect)

Feedback is UI-driven and must not change content.

### Guided mode:
- show correctness immediately
- display a short line referencing the explanation (not a second explanation)

### Exam review:
- show correctness and highlight correct answer
- show explanation beneath

---

## 11. Footer Tools (LOCKED)

Footer tools may include:
- Flag question
- Add note
- Report issue (future)

Footer tools MUST not alter question content in-place.

---

## 12. Canon Lock Statement

Any change that:
- introduces multiple renderers for questions,
- allows per-question typography/layout overrides,
- or removes the textbook + human explanation structure

is CANON-breaking and requires explicit re-ratification.

---

END OF CANON
