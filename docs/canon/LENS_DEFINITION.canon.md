# LENS_DEFINITION.canon.md
Version: 1.0  
Status: CANON — LOCKED  
Project: Firsttimecontractor  
Scope: Lens Architecture, Behavior, Composition Rules

---

## 1. Purpose

Define the canonical **Lens system** used to present content from pools so that:
- content is reusable
- structure is flexible
- menus do not own data
- personalization is possible without duplication

---

## 2. Core Definition (LOCKED)

> A **Lens** is a pure, declarative definition that selects and orders content from one or more pools.

A lens:
- contains **no content**
- references pool items by rules, not IDs (except special cases)
- can be reused across UI surfaces

---

## 3. What a Lens CAN Do

A lens MAY:
- filter by tags
- filter by scope (country/state/license/exam)
- filter by status
- limit output count
- define ordering rules
- define mix rules (difficulty, topic balance)
- apply personalization overlays (weak areas, missed)

---

## 4. What a Lens CANNOT Do (LOCKED)

A lens MUST NOT:
❌ contain content  
❌ edit content  
❌ permanently bind items  
❌ override canonical explanations  
❌ bypass status rules  

---

## 5. Canonical Lens Structure

A lens definition MUST include:

- `id`
- `description`
- `poolType` (questions, lessons, etc.)
- `filters`
- `ordering`
- `constraints`
- `contextSensitivity`

---

## 6. Context Sensitivity Rules

Lenses MUST declare how they react to missing context:

- `requiresContext: false` → works globally
- `requiresContext: true` → unlocks additional content when context exists

Missing context MUST:
- reduce results
- never block the lens entirely

---

## 7. Lens Composition (Advanced, Allowed)

Lenses MAY be composed:

- Base lens (e.g. “Electrical Core”)
- Overlay lens (e.g. “Missed Questions”)
- Mode lens (e.g. “Exam Simulation”)

Composition order MUST be explicit.

---

## 8. Lens Evaluation Timing

Lenses MUST be evaluated:
- server-side
- with caching
- returning IDs first

Client-side filtering of full pools is forbidden.

---

## 9. Lens Ownership Rule

Menus, pages, and UI elements:
- reference lenses by ID
- do not embed filtering logic

This prevents structural drift.

---

## 10. Canon Lock Statement

Any change that:
- embeds content into lenses,
- makes menus own filtering logic,
- or hard-binds pool items

is CANON-breaking and requires explicit re-ratification.

---

END OF CANON
