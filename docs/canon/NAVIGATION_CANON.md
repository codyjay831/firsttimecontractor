# NAVIGATION_CANON.md
Version: 1.0  
Status: CANON — LOCKED  
Scope: Global Navigation System (Top Nav + Left Nav)  
Applies To: All user-facing areas of the platform  

---

## 1. Purpose

This canon defines the **navigation architecture and behavioral rules** for the application.

The navigation system is intentionally split into:
- **Top Navigation** → user intent
- **Left Navigation** → actions within that intent
- **Context** → environment settings that filter content

This separation is mandatory to prevent:
- State explosion
- Jurisdiction hardcoding
- Wizard-style UX
- Future nav rewrites

---

## 2. Core Principles (Non-Negotiable)

### Principle 1 — Intent ≠ Context
- **Intent** answers: *What am I trying to do?*
- **Context** answers: *Where / under what rules am I operating?*

These must never be conflated.

---

### Principle 2 — Context Filters, It Never Gates
Context:
- MAY refine content
- MAY unlock additional material
- MUST NOT block access to core content

No navigation path may require full context completion.

---

### Principle 3 — Visibility Over Enforcement
- Missing context must be **visible**
- Locked content must be **discoverable**
- The UI must explain *why* something is unavailable

Hidden rules are forbidden.

---

## 3. Top Navigation Canon (Intent Layer)

### Definition
Top Navigation defines the **primary user intent**.

Examples:
- Practice Tests
- Learning
- Business / How to Run a Business
- Reference (future)

---

### Rules
- Top Nav items are **mode switches**, not page links
- Selecting a Top Nav item:
  - Reorients Left Navigation
  - Does NOT reset context
- Top Nav MUST remain shallow (no dropdown trees)

---

### Explicitly Forbidden
- Encoding country/state/license in Top Nav
- Duplicating context selectors in Top Nav
- Intent-specific wizards

---

## 4. Left Navigation Canon (Action Layer)

### Definition
Left Navigation provides **available actions within the selected intent**.

It is:
- Context-aware
- Intent-dependent
- Non-blocking

---

### Required Sections (in order)

1. **Context (editable)**
   - Country
   - State / Jurisdiction
   - License / Trade
   - Optional future fields (exam type, experience)

2. **Primary Actions**
   - Core actions for the selected intent

3. **Secondary / Smart Actions**
   - Recommendations
   - Focus areas
   - Context-driven suggestions

4. **Progress / Meta**
   - History
   - Readiness
   - Trends

---

### Rendering Rules
- Items that require context:
  - Must remain visible
  - Must be disabled if context is missing
  - Must explain requirements (e.g. “Select a state to unlock”)
- Items must never disappear due to missing context

---

## 5. Context Canon (Environment Layer)

### Definition
Context represents the **operating environment**, not user intent.

Context includes:
- Country
- State / Jurisdiction
- License / Trade
- Optional qualifiers (exam type, experience level)

---

### Canon Rules
- Context is:
  - Sticky across navigation
  - Editable at all times
  - Persisted locally (minimum)
- Context selection must:
  - Apply immediately
  - Never require confirmation to proceed
  - Never redirect users

---

### Explicitly Forbidden
- Context-based routing paths (e.g. `/ca/electrical/tests`)
- Forced context completion pages
- Blocking banners or modal walls

---

## 6. Desktop vs Mobile Canon

### Desktop
- Left Navigation is persistent
- Context selectors live at the top of Left Nav

### Mobile
- Left Navigation is replaced by:
  - Context bar
  - Bottom-sheet editor
- Logic and state must be identical to desktop

UI containers may differ — **logic must not**.

---

## 7. Content Responsibility Rules

- Navigation does NOT enforce rules
- Content modules:
  - Decide what requires context
  - Decide what is universal
- Navigation only reflects availability

This prevents rule duplication and drift.

---

## 8. Anti-Patterns (Explicitly Disallowed)

The following patterns are canon violations:

❌ Wizard-style setup flows  
❌ “Select your state to continue” blockers  
❌ Per-state navigation trees  
❌ Deep nested nav paths  
❌ Context encoded in URLs  
❌ Hidden unavailable content  

---

## 9. Future Compatibility Guarantees

This canon guarantees compatibility with:
- Multi-state users
- Additional countries
- Company-default contexts
- Admin-set environments
- AI-recommended context switching

No changes to navigation structure are required to support these.

---

## 10. Canon Lock Statement

This navigation model is **foundational**.

Any change that:
- Merges intent and context
- Introduces blocking context flows
- Adds jurisdictional routing
- Requires a nav rewrite

**Must be treated as a canon-breaking change** and requires explicit re-ratification.

---

END OF CANON
