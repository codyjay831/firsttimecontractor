# CONTENT_CONFIDENCE_LEVELS.canon.md
Version: 1.0  
Status: CANON — LOCKED  
Project: Firsttimecontractor  
Scope: User-Facing Content Confidence, Currency, and Update Signaling

---

## 1. Purpose

Define a clear, user-facing system that communicates:
- how settled a piece of content is
- whether it reflects current rules
- when it was last reviewed or updated

This system exists to:
- build trust without disclaimers
- reduce confusion during disagreements
- make updates transparent
- support both Business/Law and trade content

---

## 2. Core Principle (Non-Negotiable)

> **Confidence indicators communicate content maturity and currency — not guarantees.**

They explain *where the content stands*, not whether it is “safe” or “official.”

---

## 3. Canonical Confidence Levels (LOCKED)

All questions and learning content MUST use exactly one of the following confidence levels.

### 3.1 New

**Meaning**
- Recently created or newly introduced
- Verified against sources
- Limited real-world usage or feedback

**Typical triggers**
- New state launch
- Newly added trade module
- Major rewrite

**User-facing display**
> “New content”

---

### 3.2 Reviewed

**Meaning**
- Verified against authoritative sources
- In use without unresolved issues
- Considered stable

**This is the default and expected state for most content.**

**User-facing display**
> “Reviewed”

---

### 3.3 Updated

**Meaning**
- Content was correct previously
- Changed due to:
  - law updates
  - code revisions
  - exam expectation changes
  - clarified interpretation after feedback

**User-facing display**
> “Updated”

---

## 4. Currency & Time Signaling (LOCKED)

Every piece of content MUST display **one** of the following:

### 4.1 For Business / Law Content

Business / Law content MUST show **both**:

- **Confidence level** (New / Reviewed / Updated)
- **Law currency indicator**

#### Canonical formats (exact wording allowed)

- “Current with **[State]** law”
- “Updated for **[Year]** law”
- “Last reviewed **[Month Year]**”

At least ONE time-based indicator is required.

---

### 4.2 For Trade / Technical Content

Trade content (electrical, plumbing, HVAC, etc.) MUST show:

- **Confidence level**
- **Code or standard year**, when applicable

#### Canonical formats

- “Based on **[Code Name] [Year]**”
- “Current with common trade practice”
- “Last updated **[Month Year]**”

Trade content does NOT require state law wording unless legally scoped.

---

## 5. Placement Rules (User UI)

- Confidence indicator MUST appear:
  - near the explanation block
  - after the question prompt
- It MUST be visible but subtle
- It MUST NOT interrupt reading flow

Icons are allowed but optional. Text clarity matters more.

---

## 6. What Confidence Levels Are NOT (Explicitly Forbidden)

Confidence indicators MUST NOT:
❌ include legal disclaimers  
❌ say “not legal advice”  
❌ imply guarantees  
❌ warn users away from using content  
❌ differ per answer choice  

---

## 7. Admin Rules for Changing Confidence Levels

### 7.1 Automatic Triggers
- New content → **New**
- Meaningful edit → **Updated**
- Verified + stable over time → **Reviewed**

### 7.2 Manual Override
Admins MAY adjust confidence level only with:
- verification completed
- version increment (if meaning changed)
- audit log entry

---

## 8. Disagreement Handling Rule

When users dispute content:

- Confidence level MAY be downgraded (Reviewed → Updated)
- Content remains visible
- Explanation may be clarified
- No content is hidden solely due to disagreement

---

## 9. Canon Lock Statement

Any change that:
- removes user visibility of confidence or currency,
- replaces clarity with disclaimers,
- or hides update history

is CANON-breaking and requires explicit re-ratification.

---

END OF CANON
