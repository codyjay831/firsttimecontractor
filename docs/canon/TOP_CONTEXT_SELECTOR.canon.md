# TOP_CONTEXT_SELECTOR.canon.md
Version: 1.0  
Status: CANON — LOCKED  
Project: Firsttimecontractor  
Scope: Top Bar Context Selection (State, License, Trade)

---

## 1. Purpose

Define the top context selector so that:
- context is clearly separated from navigation
- state-specific content stays isolated
- users can change scope without UI chaos
- lenses remain stable while results adapt

---

## 2. Core Principle (Non-Negotiable)

> **Top bar controls context. Left nav launches lenses.**

Context is not navigation.

---

## 3. Canonical Context Fields (v1 LOCKED)

Top bar MUST support:

- Country (optional; default is US if not selected)
- State (optional in learning; required for exam simulation)
- License type (optional; used to narrow lenses)
- Trade (optional; used to narrow trade pools)

---

## 4. Behavior Rules

- Context changes MUST update lens results, not lens definitions
- State selection MUST not create new nav items
- Missing context MUST reduce scope but not block learning modes

Exam simulation requires:
- State set

---

## 5. UX Copy Rules (LOCKED)

When state is missing and required (exam simulation), display:

> “Select a state to run an exam simulation.”

No pressure language, no warnings.

---

## 6. Canon Lock Statement

Any change that:
- embeds context inside left nav,
- duplicates context into multiple UI places,
- or turns context into a category tree

is CANON-breaking.

---

END OF CANON
