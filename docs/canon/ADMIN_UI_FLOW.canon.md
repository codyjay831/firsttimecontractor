# ADMIN_UI_FLOW.canon.md
Version 1.0  
Status CANON — LOCKED  
Project Firsttimecontractor  
Scope Admin UI Page Structure, Navigation, Workflow

---

## 1. Purpose

Define the canonical page structure and flow for the Admin UI so that
- content management is predictable
- high-impact actions are clearly separated
- mistakes are minimized
- future contributors do not invent new admin patterns

This canon defines structure, not styling.

---

## 2. Admin UI Principles (Non-Negotiable)

- Admin UI is task-oriented, not exploratory
- Pages are shallow and explicit
- Actions are intentional and reversible only where stated
- Status is always visible

---

## 3. Canonical Admin Navigation Structure

Admin UI MUST use the following top-level sections only

1. Dashboard
2. Questions
3. Other Pools (Definitions, Lessons, SOPs, etc.)
4. Lenses
5. Imports
6. Settings (future)

No additional top-level sections are permitted without re-ratification.

---

## 4. Page Structures (LOCKED)

### 4.1 Dashboard

Purpose
- Surface system state, not content editing

Allowed Content
- Counts by status (Draft  Active  Retired)
- Recently edited items
- Validation warnings (if any)

Forbidden
- Editing content directly
- Publishing from dashboard

---

### 4.2 Questions (Primary Admin Area)

#### List View (Default)
Must display
- Question ID
- Prompt (truncated)
- Status
- Version
- Scope summary (countrystatelicense)
- Last updated

Allowed actions
- View
- Edit
- Retire (if active)

---

#### Question Detail View

Sections (in order)

1. Header
   - Question ID
   - Status badge
   - Version

2. Rendered Preview
   - Uses the same `QuestionCard` renderer as user UI
   - Read-only

3. Metadata Panel
   - Tags
   - Scope rules
   - Difficulty
   - Estimated time

4. Explanation Validation Panel
   - Confirms Textbook + Human sections exist

5. Actions Panel
   - Publish  Retire (contextual)
   - Explicit confirmations (per ADMIN_ACTIONS.canon.md)

---

#### Edit View

Rules
- Edit view MUST be separate from preview
- Unsaved changes MUST be visible
- Version-incrementing edits MUST be flagged

---

### 4.3 Other Pools

Other pool types (definitions, lessons, SOPs) MUST follow the same structure as Questions
- List → Detail → Edit
- Status + version required
- Preview where applicable

---

### 4.4 Lenses (Admin)

Lens management is definition-only.

Lens pages MUST include
- Lens ID
- Description
- Filters
- Ordering rules
- Output constraints
- Preview count (not content)

Forbidden
- Editing pool content from lens pages
- Embedding content inside lenses

---

### 4.5 Imports

Import page MUST
- Accept JSON (canonical)
- Validate before write
- Show per-item errors
- Save as Draft only

No direct publish from import.

---

## 5. Status Visibility Rule

Every admin page that references content MUST show
- Status (Draft  Active  Retired)
- Version

Hidden status is forbidden.

---

## 6. Canon Lock Statement

Any change that
- merges edit + preview irresponsibly
- hides statusversion
- allows publishing without confirmation
- blurs admin vs user UI boundaries

is CANON-breaking and requires explicit re-ratification.

---

END OF CANON
