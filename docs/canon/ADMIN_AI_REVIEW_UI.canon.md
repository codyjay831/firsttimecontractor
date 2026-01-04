# ADMIN_AI_REVIEW_UI.canon.md
Version: 1.0  
Status: CANON — LOCKED  
Project: Firsttimecontractor  
Scope: Admin Buttons, Labels, and Copy for AI Review

---

## 1. Purpose

Define the exact admin UI controls and copy for AI-assisted review to ensure clarity, safety, and consistency.

---

## 2. Button Set (LOCKED)

### Primary AI Actions

- **Ask AI to review**
  Tooltip:
  > “Compares this content against current sources and flags issues.”

- **Ask AI to draft update**
  Tooltip:
  > “Creates a draft update based on current rules. Requires review.”

- **Ask AI to summarize sources**
  Tooltip:
  > “Summarizes official references for this state.”

---

### Secondary AI Actions

- **Compare to current law**
  Tooltip:
  > “Checks for changes since last reviewed.”

- **Explain disagreement**
  Tooltip:
  > “Analyzes reported issues and suggests next steps.”

---

## 3. AI Output Panel (LOCKED)

**Header**
> AI Review Summary

**Status Label**
> AI-assisted draft — review required

**Sections (in order)**
- Findings
- Source summary
- Recommended action (Clarify / Update / Retire)
- Confidence level suggestion
- Uncertainty flags

---

## 4. Required Post-AI Actions

After reviewing AI output, Admin MUST choose one:

- **Apply as draft**
- **Edit manually**
- **Dismiss suggestions**

No automatic transitions.

---

## 5. Copy for Safeguards

### Save Draft Notice
> “This will save AI-assisted content as a draft. It will not be visible to users.”

### Publish Attempt (Blocked)
> “AI-assisted content must be reviewed before publishing.”

---

## 6. Audit Logging (Required)

Every AI-assisted action MUST log:
- Action type (review / draft)
- Admin user ID
- Timestamp
- Affected content ID
- State (if applicable)

---

## 7. Canon Lock Statement

Any change that:
- auto-applies AI output,
- hides AI assistance,
- or alters button copy/meaning

is CANON-breaking and requires explicit re-ratification.

---

END OF CANON
