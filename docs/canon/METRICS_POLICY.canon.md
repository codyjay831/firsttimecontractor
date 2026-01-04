# METRICS_POLICY.canon.md
Version: 1.0  
Status: CANON — LOCKED  
Project: Firsttimecontractor  
Scope: Metrics Collection, Interpretation, and Use

---

## 1. Purpose

Define a minimal, principled metrics system so that:
- content accuracy improves over time
- confusing material is identified quickly
- state-specific risk is visible
- users are never judged, ranked, or surveilled

Metrics exist to improve **content**, not evaluate people.

---

## 2. Core Principle (Non-Negotiable)

> **Metrics inform review priority — they do not make decisions.**

No metric may automatically:
- change answers
- publish updates
- retire content
- rank or judge users

Human review is always required.

---

## 3. Canonical Metric Categories

### 3.1 Content Health Metrics (Required)

Tracked per Question:

- `attemptCount`
- `incorrectRate`
- `flagCount`
- `confidenceLevel` (New / Reviewed / Updated)
- `lastReviewedAt`
- `state` (if applicable)

**Purpose**
- Identify incorrect or fragile content
- Surface questions needing review

---

### 3.2 Explanation Effectiveness Metrics (Required)

Tracked per Question (aggregated, anonymous):

- Incorrect → Correct on retry (guided mode)
- Explanation view rate
- Re-attempt success after explanation

**Purpose**
- Determine whether explanations actually help
- Distinguish “hard concept” from “bad explanation”

---

### 3.3 State-Specific Risk Metrics (Required for Business/Law)

Tracked per State:

- Total flagged questions
- Percentage marked `Updated`
- Average time since last review
- Number of unresolved reports

**Purpose**
- Identify states requiring attention
- Prevent cross-state assumptions

---

### 3.4 System Health Metrics (Minimal)

Tracked globally:

- Anonymous sessions
- Practice tests started
- Practice tests completed

Optional (future):
- Guest → login conversion

**Purpose**
- Confirm the app is being used
- No growth optimization pressure

---

## 4. Derived Signals (Computed, Not Stored)

Derived metrics MAY be computed internally:

- `needsReviewScore`
  - Based on incorrect rate, flags, and confidence level
- `explanationHelpfulnessSignal`
  - Based on retry success after explanation

Derived signals:
- are advisory only
- are not user-facing
- must not trigger automatic actions

---

## 5. Explicitly Forbidden Metrics

The following MUST NOT be tracked or displayed:

❌ Individual user accuracy scores  
❌ User rankings or leaderboards  
❌ “Efficiency” or speed scoring  
❌ Time-on-app optimization  
❌ Comparative user performance  

Firsttimecontractor is not a competition or surveillance tool.

---

## 6. Interpretation Rules

- High incorrect rate ≠ bad user  
- High incorrect rate + high flags = review priority  
- High incorrect rate + low flags = explanation likely unclear  
- Low incorrect rate + no flags = stable content  

Metrics indicate **where to look**, not **what to believe**.

---

## 7. Visibility Rules

- Metrics are **admin-only**
- Aggregated and anonymized
- Never exposed per user
- Never used to message or pressure users

---

## 8. Canon Lock Statement

Any change that:
- introduces user scoring,
- automates content changes,
- or expands metrics beyond content quality

is CANON-breaking and requires explicit re-ratification.

---

END OF CANON
