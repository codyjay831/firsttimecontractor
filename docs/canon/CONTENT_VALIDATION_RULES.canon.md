# CONTENT_VALIDATION_RULES.canon.md
Version: 1.1  
Status: CANON — ALIGNED  
Project: Firsttimecontractor  
Scope: Validation of Questions and Pool Content (All Write Paths)

---

## 1. Purpose

Define mandatory **content validation rules** so that:
- published content is structurally sound
- explanations are complete
- pools remain consistent over time
- AI-generated and human-generated content meet the same standards

Validation applies to:
- Admin UI edits
- Bulk imports
- AI-assisted generation
- Programmatic writes

---

## 2. Universal Validation Rule (Non-Negotiable)

> **No content may be saved or published without passing validation.**

Validation occurs at runtime during content pack loading (client-side). Server-side or Build/CI validation is a future goal.

---

## 3. Required Fields (Questions)

### v0 Minimal Schema (Enforced Today)
Every Question MUST include:
- `id`
- `prompt`
- `choices` (non-empty)
- `correctChoiceId` (matching a choice)

### vNext Schema (Planned)
Every Question SHOULD include:
- `questionType`
- `answerKey`
- `explanation.canonical`
- `tags`
- `difficulty`
- `scope.rules`
- `scope.isCoreFundamental`
- `status`
- `version`

Missing any v0 field MUST block load. Missing vNext fields will trigger a developer warning in development mode.

---

## 4. Answer Validation

Validation MUST confirm:
- `answerKey` matches `questionType`
- `choices` exist when required
- correct choice IDs exist
- no duplicate choice IDs
- fill-blank acceptable answers are non-empty

---

## 5. Explanation Validation (Planned)

Every Question explanation MUST include:

### Required
- **Textbook Rule** (authoritative explanation)
- **Why this matters** (human interpretation)

### Optional
- Example section

Validation MUST fail if either required section is missing.

---

## 6. Scope Validation

Validation MUST confirm:
- scope rules are well-formed
- country/state/license keys are valid
- empty scope rules are intentional
- core fundamentals are explicitly flagged

---

## 7. Status Transition Validation

Allowed transitions only:

- draft → active
- active → retired

Forbidden:
- active → draft
- retired → active

---

## 8. Version Validation

- Meaning-changing edits MUST increment version
- Publishing without version awareness is forbidden
- Validation MUST warn when a version increment is expected

---

## 9. Import Validation (Bulk)

For bulk imports:
- Each item is validated independently
- One invalid item MUST NOT block others
- Errors MUST be item-specific and descriptive
- All imported items default to `draft`

---

## 10. Error Reporting Rules

Validation errors MUST:
- name the exact field
- explain what is wrong
- explain what is required

Example:
> “explanation.canonical is required.”

Generic errors are forbidden.

---

## 11. Canon Lock Statement

Any change that:
- weakens validation,
- allows partial or malformed content,
- or bypasses server-side checks

is CANON-breaking and requires explicit re-ratification.

---

END OF CANON
