# DEPRECATION_NOTE.md
Project: Firsttimecontractor  
Status: RECORD — READ ONLY  
Purpose: Preserve architectural decision history and prevent canon confusion

---

## BUSINESS_LAW_SCOPING.canon.md — DEPRECATED

### Original Intent
`BUSINESS_LAW_SCOPING.canon.md` described an early architectural approach
that split Business/Law content into:
- shared “core” concepts
- state-specific legal deltas

This approach was intended to reduce duplication.

---

### Why It Was Rejected

After deeper analysis, the hybrid model was rejected because it:
- introduced ambiguity around legal truth
- made verification harder, not easier
- created risk of cross-state contamination
- relied on future discipline to avoid mistakes
- conflicted with the default mental model (“law is state by state”)

For legal content, **clarity and isolation were prioritized over reuse**.

---

### Governing Replacement

The authoritative and governing document is now:

- **BUSINESS_LAW_STATE_ISOLATION.canon.md**

This document explicitly forbids:
- cross-state reuse of Business/Law questions
- shared legal “core” content
- cross-state fixes or assumptions

---

### Current Status

- `BUSINESS_LAW_SCOPING.canon.md` is retained **for historical context only**
- It MUST NOT be used for implementation
- It MUST NOT override state isolation rules
- In any conflict, **State Isolation wins**

---

### Rationale for Retention

The file is retained to:
- preserve decision history
- explain why state isolation exists
- prevent future re-litigation of the same idea
- help future contributors understand intent

---

END OF NOTE
