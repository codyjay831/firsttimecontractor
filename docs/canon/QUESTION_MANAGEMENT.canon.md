# QUESTION_MANAGEMENT.canon.md
Version: 1.0  
Status: CANON — LOCKED  
Project: Firsttimecontractor  
Scope: Authoring, Editing, Importing, Publishing, Retiring Questions + Pool Content

---

## 1. Purpose

Define how questions (and other pool content) are created, edited, validated, published, and retired so that:
- content stays consistent over years
- edits are auditable and safe
- bulk uploads are possible without breaking production
- attempts and analytics remain stable over time

---

## 2. Source of Truth Model (Non-Negotiable)

### 2.1 Pools Are Canon
Questions are stored as atomic pool items and referenced by stable IDs.

- Pool items MUST have stable `id`
- Pool items MUST be versioned and status-controlled
- Lenses and UI MUST reference pool items by `id`

---

## 3. Management Approach (LOCKED)

Firsttimecontractor uses a **hybrid management approach**:

### 3.1 Admin UI (Primary Workflow)
An internal Admin interface is the primary method to:
- create/edit pool items
- assign tags/scope/difficulty
- preview rendering exactly as users see it
- manage Draft/Active/Retired lifecycle
- run validation checks

### 3.2 Bulk Import / Export (Power Workflow)
Bulk operations MUST be supported through:
- JSON import (canonical format)
- optional CSV import (must convert to canonical JSON before write)
- JSON export for backups, migration, and AI pipelines

**All bulk imports MUST pass the same validation pipeline as Admin UI edits.**

### 3.3 Code-Only Editing is Forbidden in Production Workflow
Direct edits “in code only” as the standard workflow are forbidden because:
- preview is missing
- validation is bypassed
- drift increases over time

Developer scripts MAY exist for maintenance, but they MUST call the same validation + write path.

---

## 4. Validation Rules (Required)

All writes (UI or bulk import) MUST run server-side validation that enforces:
- required fields present
- questionType matches answerKey and choices
- explanation structure is valid (Textbook + Human layers required per writing canon)
- scope rules are valid (country/state/license/exam keys)
- tags are valid (by ID/key)
- media assets are valid (type/url/alt rules)
- status transitions are valid

If validation fails:
- the write MUST be rejected
- the error MUST point to the exact field(s)

---

## 5. Lifecycle (LOCKED)

Pool items MUST support status:

- `draft`  → visible only to admins/publishers
- `active` → visible to users and eligible for lenses/tests
- `retired` → not shown to users in new sessions, but kept for history

### 5.1 Draft → Active (Publishing)
Publishing MUST be an explicit action (button or API endpoint).

### 5.2 Active → Retired
Retiring is the canonical way to remove a question from circulation without breaking:
- past attempts
- analytics
- audit history

Hard deletes are forbidden for active or attempted questions.

---

## 6. Versioning Rules (LOCKED)

### 6.1 Version Increments
Any meaning-changing edit MUST increment `version`.

Meaning-changing includes:
- prompt changes that alter the question
- answerKey changes
- explanation changes (canonical truth changes)
- scope changes (what jurisdictions/licenses it applies to)

Non-meaning changes MAY avoid version bump:
- typo fixes that do not change meaning
- formatting-only changes

### 6.2 Attempt Integrity
Attempts MUST reference the stable `questionId`.  
Optionally (recommended), attempts also store `questionVersionAtTime` for audit-grade review.

---

## 7. Write Paths (Implementation Canon)

Since the app uses Next.js:
- Admin UI runs in the app
- All writes occur through server-side routes/actions (Node/Next server)
- Bulk import endpoints exist for JSON/CSV conversion + validation + insert

No direct DB writes from client are allowed.

---

## 8. AI Content Generation (Allowed, Controlled)

AI may be used to generate candidate questions, but:
- AI-generated items MUST enter as `draft`
- They MUST pass validation
- They MUST be previewed before publishing
- Publishing is always explicit

AI may not publish directly.

---

## 9. Canon Lock Statement

Any change that:
- bypasses server-side validation,
- allows direct edits to active content without lifecycle controls,
- or removes versioning/retirement protections

is CANON-breaking and requires explicit re-ratification.

---

END OF CANON
