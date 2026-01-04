# LEFT_NAVIGATION.canon.md
Version: 1.0  
Status: CANON — LOCKED  
Project: Firsttimecontractor  
Scope: Left Navigation (GitHub-style), Lens Launching, Collapse Behavior

---

## 1. Purpose

Define the canonical left navigation so that:
- navigation remains simple and stable over time
- the UI does not mirror database structure
- reading and practice remain distraction-free
- new features can be added without nav explosion

---

## 2. Core Principle (Non-Negotiable)

> **Left nav is a launcher, not a map.**  
> It shows what the user can do (lenses), not what exists (data/categories).

---

## 3. GitHub-Style Origin & Behavior (LOCKED)

- Left nav MUST originate from the top-left
- Left nav MUST be collapsible/expandable
- Collapse state MAY persist per device
- Collapsed mode uses icons + tooltips
- Expanded mode uses icons + text

Left nav should feel like a tool sidebar, not a course syllabus.

---

## 4. Lens-Only Rule (LOCKED)

Each left nav item MUST map to a Lens ID.

Forbidden:
❌ Direct links to pools  
❌ Direct links to categories/trees  
❌ State lists inside nav  
❌ License lists inside nav  
❌ Content counts as navigation drivers  

---

## 5. Canonical Left Nav Items (v1 LOCKED)

The user-facing left nav MUST include only:

1. Practice
2. Exam simulation
3. Flashcards
4. Review mistakes
5. State rules

These labels are stable and must not change meaning.

---

## 6. Nav Item → Lens Mapping (LOCKED)

- Practice → `practice_default`
- Exam simulation → `exam_state_simulation`
- Flashcards → `flashcards_default`
- Review mistakes → `review_mistakes`
- State rules → `business_law_state`

The nav must never embed filter logic; lenses own selection rules.

---

## 7. Responsive Rules

- Mobile: default collapsed (hamburger controls visibility)
- Desktop: default expanded
- Reading surfaces (QuestionCard): allow collapse for focus

---

## 8. Canon Lock Statement

Any change that:
- adds category trees,
- lists states/licenses in the nav,
- or makes the nav own logic

is CANON-breaking and requires explicit re-ratification.

---

END OF CANON
