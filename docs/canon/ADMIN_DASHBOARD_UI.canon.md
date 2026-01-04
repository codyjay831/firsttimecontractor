# ADMIN_DASHBOARD_UI.canon.md
Version: 1.0  
Status: CANON — LOCKED  
Project: Firsttimecontractor  
Scope: Admin Dashboard Layout, Sections, and Copy

---

## 1. Purpose

Define the canonical Admin Dashboard layout and copy so that:
- review priorities are obvious
- metrics are actionable
- admin focus stays on correctness
- UI does not become noisy or sales-driven

---

## 2. Core Design Principles

- Dashboard answers: “What needs attention?”
- No vanity metrics
- No growth pressure
- Clear paths to action

---

## 3. Canonical Dashboard Sections (LOCKED ORDER)

### 3.1 Header Summary (Top)

**Cards (exact labels):**
- **Needs review**
- **Flagged questions**
- **States requiring attention**
- **Recently updated**

**Copy rules**
- Neutral
- Factual
- No arrows, emojis, or trend hype

---

### 3.2 Needs Review (Primary Table)

**Purpose**
Surface the highest-risk content first.

**Columns (LOCKED):**
- Question ID
- State
- Confidence level
- Incorrect rate
- Flag count
- Last reviewed

**Row actions:**
- View question
- Ask AI to review

**Empty state copy:**
> “No high-risk questions right now.”

---

### 3.3 By State (Secondary Table)

**Purpose**
Identify state-level risk concentration.

**Columns (LOCKED):**
- State
- Total questions
- Flagged
- % Updated
- Avg days since review
- Unresolved reports

**Row action:**
- View state questions

---

### 3.4 Explanation Effectiveness (Optional Panel)

**Purpose**
Improve clarity, not difficulty.

**Columns:**
- Question ID
- State
- Incorrect rate
- Retry success after explanation

**Interpretation note (static copy):**
> “Low retry success may indicate unclear explanations.”

---

### 3.5 System Health (Minimal)

**Cards only:**
- Active sessions (today)
- Practice tests completed (7 days)
- Guest usage %

No charts required.

---

## 4. Copy Tone Rules (LOCKED)

- Direct
- Neutral
- Non-judgmental
- No encouragement or pressure

Forbidden:
❌ “Great job”
❌ “You’re behind”
❌ “Urgent” unless truly blocking

---

## 5. Interaction Rules

- Clicking a row always drills into detail
- No inline editing from dashboard
- All high-impact actions require confirmation

---

## 6. Canon Lock Statement

Any change that:
- adds growth or user-ranking metrics,
- hides state context,
- or encourages speed over accuracy

is CANON-breaking and requires explicit re-ratification.

---

END OF CANON
