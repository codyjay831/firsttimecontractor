# ADMIN_UI_TONE.canon.md
Version: 1.0  
Status: CANON — LOCKED  
Project: Firsttimecontractor  
Scope: Internal Admin Interfaces, Content Management, Publishing Workflows

---

## 1. Purpose

Define the canonical tone and language rules for all **admin-facing UI** so that:
- actions are clear and unambiguous
- consequences are explicit
- mistakes are minimized
- authority and responsibility are respected

Admin UI is a **tooling interface**, not a learning interface.

---

## 2. Core Tone Principles (Non-Negotiable)

Admin UI tone MUST be:

- Clear
- Direct
- Explicit
- Neutral
- Non-emotional

Admin UI tone MUST NOT be:
- playful
- encouraging
- sales-oriented
- ambiguous

This interface is designed for correctness, not comfort.

---

## 3. Language Rules

### 3.1 Clarity Over Softness
Admin copy must favor clarity even if it feels blunt.

Allowed:
- “This change will increment the version.”
- “Publishing makes this content visible to users.”

Forbidden:
- “Are you sure you want to try publishing?”
- “This might affect users.”

---

### 3.2 Explicit Consequences
Every irreversible or impactful action MUST state its effect.

Examples:
- “Retiring removes this question from future tests.”
- “Existing attempts will remain unchanged.”
- “This action cannot be undone.”

---

### 3.3 No Marketing Language
Admin UI MUST NOT include:
- hype
- motivational language
- emojis
- friendly encouragement

This prevents misinterpretation of seriousness.

---

## 4. Confirmation Dialog Rules

### 4.1 Required Confirmations
Confirmations are REQUIRED for:
- Publish
- Retire
- Bulk import
- Bulk publish
- Version-incrementing edits

---

### 4.2 Confirmation Copy Structure (LOCKED)

Each confirmation dialog MUST include:
1. Action summary
2. Effect on users
3. Reversibility statement

**Canonical structure:**

**Title**
> Publish question

**Body**
> This will make the question visible to users.  
> The current version will be marked active.  
> This action cannot be undone.

**Buttons**
- Primary: Publish
- Secondary: Cancel

---

## 5. Status & Warnings

### 5.1 Status Labels
- Draft
- Active
- Retired

No alternative labels are allowed.

---

### 5.2 Warnings
Warnings must be factual and specific.

Allowed:
- “This question has no state scope and will appear as a core fundamental.”
- “This explanation does not include a human interpretation section.”

Forbidden:
- “This might be a problem.”
- “We recommend fixing this.”

---

## 6. AI-Generated Content Warnings

When content is AI-generated or AI-assisted, Admin UI MUST display:

> “This content was generated with AI assistance and requires review before publishing.”

No automatic publish is allowed.

---

## 7. Error Messages (Admin)

Admin errors must:
- state what failed
- state why
- state what to fix

Example:
> “Validation failed: explanation.canonical is required.”

Avoid generic errors.

---

## 8. Admin UI vs User UI Separation

Admin UI tone MUST NOT leak into user-facing UI.

User-facing interfaces remain:
- calm
- supportive
- educational

Admin UI remains:
- operational
- explicit
- responsibility-focused

---

## 9. Canon Lock Statement

Any change that:
- softens admin confirmations,
- obscures consequences,
- or blends admin tone with user-facing tone

is CANON-breaking and requires explicit re-ratification.

---

END OF CANON
