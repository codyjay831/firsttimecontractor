# BUSINESS_LAW_SCOPING.canon.md
Version: 1.0  
Status: CANON — LOCKED  
Project: Firsttimecontractor  
Scope: Business & Law Question Scoping, State vs Core Rules

---

## 1. Purpose

Define how **Business / Law** content is scoped so that:
- state-specific legal differences are respected
- core business concepts are not duplicated unnecessarily
- exam expectations are met accurately
- long-term maintenance remains manageable

---

## 2. Core Rule (Non-Negotiable)

> **Business & Law content MUST be split into:**
> 1) Core (national / universal concepts)  
> 2) State-specific legal rules (state law + exam expectations)

These two categories MUST NOT be merged.

---

## 3. Business & Law Core (Shared Pool)

### Definition
Core content represents business concepts that are **largely consistent across states** and are tested at a conceptual level.

### Examples (Non-exhaustive)
- Contract fundamentals (offer, acceptance, consideration)
- Change orders (conceptual)
- Business entities (LLC vs Corp — high level)
- Insurance types (GL, WC, bonding — concept)
- Ethics, fraud, misrepresentation
- High-level labor concepts
- Purpose of liens (not timelines)

### Canon Rules
- Core questions:
  - MUST have `isCoreFundamental = true`
  - MUST NOT require a state to access
  - MAY appear in all learning modes
- Core questions MAY appear on exams **only if** that state’s exam commonly tests them

---

## 4. State-Specific Business & Law (Delta Pool)

### Definition
State-specific content represents **actual law**, regulatory rules, and exam-enforced requirements that vary by jurisdiction.

### Examples (Non-exhaustive)
- Licensing requirements
- Required contract language
- Down payment limits
- Cooling-off periods
- Advertising restrictions
- Lien notices and timelines
- Disciplinary authority
- Penalties and enforcement
- Exam-specific “Business & Law” rules

### Canon Rules
- State-specific questions:
  - MUST declare a state scope
  - MUST NOT be accessible without state selection
  - MUST be included in exam-mode lenses
  - MUST be clearly explained as state law

---

## 5. Exam Alignment Rule (LOCKED)

> **Exam simulation lenses MUST be state-aware.**

- Exam mode MUST prioritize state-specific questions
- Core questions may supplement but must not dominate
- No exam simulation may run without a state context

---

## 6. Learning vs Exam Mode Behavior

### Learning Modes (Flashcards / Guided)
- Core + state questions may be mixed
- Missing state unlocks only core content

### Exam Mode
- State selection is required
- State-specific rules are mandatory
- Core questions are filtered to those relevant to that exam

---

## 7. Canon Lock Statement

Any change that:
- treats Business & Law as mostly universal,
- removes state scoping,
- or duplicates entire pools per state

is CANON-breaking and requires explicit re-ratification.

---

END OF CANON
