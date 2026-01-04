# POOL_AND_LENS_MODEL.canon.md
Version: 1.0  
Status: CANON — LOCKED  
Project: Firsttimecontractor  
Scope: Content Architecture (Questions, Learning, Business Content, Definitions, Scenarios)

---

## 1. Purpose

Define a canonical architecture where **all content is stored as POOLS** and presented through **LENSES**.

This prevents:
- duplicated content
- menu-driven content silos
- hard-coded course/test structures
- expensive reorganization when states/licenses expand

---

## 2. Definitions

### 2.1 Pool
A **Pool** is a canonical collection of atomic content objects.

Examples of pools:
- Question Pool
- Definition Pool
- Lesson/Concept Pool
- Scenario Pool
- Business SOP Pool (“how business works”)

Pool objects are the **source of truth**.

---

### 2.2 Lens
A **Lens** is a reusable “view” definition that selects and orders content from one or more pools.

A lens can:
- filter (by tags, scope, difficulty)
- sort (by relevance, recency, progression)
- group (topics, phases, readiness)
- apply context (country/state/license/exam)
- apply personalization (weak areas, misses, flagged)

Lenses contain **no canonical content** — only rules for retrieving and presenting.

---

## 3. Core Principles (Non-Negotiable)

### 3.1 All Content Is Pool-Based
Questions, business content, and learning modules MUST be stored as pool items.

No content may exist “only inside a menu”.

---

### 3.2 Menus Never Own Content
Navigation and UI structures MUST reference lenses, not raw content files.

- Menus point to lenses
- Lenses point to pool items

This enables reorganization without rewriting content.

---

### 3.3 One Source of Truth Per Atomic Item
Each pool item is canonical and versioned.

If the same concept appears in multiple places, it MUST be:
- the same pool item viewed through multiple lenses, OR
- different items with explicit justification (rare)

---

### 3.4 Lenses Are Composable
Lenses MUST be designed to compose:
- base lens (e.g. “CA Electrical Core”)
+ overlay lens (e.g. “User Weak Areas”)
+ mode lens (e.g. “Guided Practice”)

---

## 4. Canonical Pool Item Requirements

Every pool item MUST support:

- `id` (stable)
- `type` (question, definition, lesson, scenario, sop, checklist, etc.)
- `tags` (topic indexing)
- `scope` (country/state/license/exam applicability)
- `status` (draft/active/retired)
- `version` (meaning-changing edits increment version)
- `createdAt` / `updatedAt`

Pool items MAY include media assets.

---

## 5. Lens Requirements

A lens MUST be a pure definition (no content).

Minimum lens capabilities:
- Filters:
  - tags (include/exclude)
  - scope rules (country/state/license/exam)
  - difficulty (if applicable)
  - content type
- Ordering:
  - fixed order (curated)
  - computed order (recommended, weak areas, recency)
- Output constraints:
  - `limit` (e.g. 25 questions)
  - `mix` rules (difficulty mix, topic mix)

---

## 6. Lens Use Cases (Examples)

### Practice Test Lens
- Pull 25 items from Question Pool
- Filter by context (US/CA/Electrical)
- Mix difficulties
- Shuffle order

### Flashcard Lens
- Pull definition + question hybrids
- Order by spaced repetition schedule (future)

### “How Business Works” Lens
- Pull SOP + lesson items
- Order by recommended progression
- Filter by state (where laws differ)

---

## 7. Anti-Patterns (Explicitly Forbidden)

❌ Content stored only inside a page or menu route  
❌ Copy/pasting the same content into multiple modules  
❌ Hard-binding items permanently into “Course 1 / Course 2” structures  
❌ Storing “structure” inside the content itself (structure belongs to lenses)  

---

## 8. Canon Lock Statement

The Pool + Lens model is foundational.

Any change that:
- makes menus own content,
- duplicates canonical items,
- or hard-binds content into static course/test structures

is CANON-breaking and requires explicit re-ratification.

---

END OF CANON
