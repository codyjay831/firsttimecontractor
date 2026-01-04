# BUSINESS_LAW_STATE_ISOLATION.canon.md
Version: 1.1  
Status: CANON — LOCKED  
Project: Firsttimecontractor  
Scope: Business & Law Content Isolation and Reuse Rules

---

## 1. Purpose

Explicitly forbid cross-state reuse of **Business / Law questions** so that:
- legal accuracy is preserved
- verification remains state-specific
- feedback and corrections do not conflict
- future maintenance is safe and predictable

---

## 2. Core Rule (Non-Negotiable)

> **All Business / Law questions MUST be state-scoped.  
> Cross-state reuse of Business / Law questions is forbidden.**

This applies regardless of similarity between states.

---

## 3. What “Forbidden Reuse” Means

The following are explicitly NOT allowed:

❌ A single Business/Law question tagged for multiple states  
❌ Copy-on-write logic that shares a base question across states  
❌ “Core” Business/Law questions reused by all states  
❌ Editing one state’s question to fix another state  

Each state owns its own records.

---

## 4. Allowed Similarity (Safe Reuse)

The following ARE allowed:

✅ Shared **authoring templates**  
✅ Shared **writing guidelines**  
✅ Shared **tag taxonomy**  
✅ Shared **lens logic**  
✅ Shared **AI prompt scaffolding**

Similarity may exist in *structure*, but **not in stored truth**.

---

## 5. Feedback Isolation Rule

All feedback, corrections, and disputes are treated as:

> **State-local issues unless explicitly proven otherwise.**

Florida feedback affects Florida only.  
California feedback affects California only.

No automatic cross-state propagation is allowed.

---

## 6. Verification Rule

Business/Law verification MUST be done:
- per state
- against that state’s authority
- without assuming alignment with other states

Verification effort is intentionally duplicated to preserve accuracy.

---

## 7. Canon Lock Statement

Any change that:
- introduces shared Business/Law questions,
- allows multi-state scoping,
- or treats legal rules as “mostly universal”

is CANON-breaking and requires explicit re-ratification.

---

END OF CANON
