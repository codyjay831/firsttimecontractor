# ARCHITECTURE.canon.md
Version: 1.0  
Status: CANON — LOCKED  
Project: Firsttimecontractor  
Scope: System Architecture, Core Concepts, Extension Rules

---

## 1. Purpose

This document defines the **overall architecture** of Firsttimecontractor so that:

- the system remains simple and extensible
- future features can be added safely
- content accuracy is protected
- the product does not drift into a management platform
- future maintainers understand intent, not just implementation

This is an **architecture of principles**, not framework trivia.

---

## 2. What Firsttimecontractor IS (Architectural Definition)

Firsttimecontractor is a:

> **Content-driven learning and reference system**  
> built around state-accurate rules, explanations, and practice —  
> not a school, not a workflow manager, not an operations platform.

The system optimizes for:
- correctness
- clarity
- long-term maintainability
- low cognitive load

---

## 3. What Firsttimecontractor is NOT

Architecturally, this system is NOT:

- a contractor management app
- a CRM
- a scheduling or task system
- a crowdsourced wiki
- a social platform
- a certification authority

Any feature that pushes the system in those directions is out of scope.

---

## 4. Core Architectural Pillars (LOCKED)

The system is built on **four pillars**.  
All features must fit within these.

---

### 4.1 Content Pools (Truth Layer)

**Definition**  
Pools are the atomic units of truth.

Examples:
- Questions
- Definitions (future)
- Trade references (future)

**Rules**
- Pool items are atomic
- Pool items are immutable except through versioned updates
- Pool items are never shared across states when legally scoped
- Pool items do not contain UI logic

**Why**
This isolates truth from presentation and prevents cross-state contamination.

---

### 4.2 Lenses (Presentation Layer)

**Definition**  
A Lens is a declarative selector that assembles pool items into a user experience.

Examples:
- Practice tests
- Exam simulations
- Flashcards
- State-specific views

**Rules**
- Lenses contain no content
- Lenses do not edit content
- Lenses reference pools by rules, not embedded logic
- Menus reference lenses, not pools

**Why**
This allows new experiences to be added without rewriting content.

---

### 4.3 Confidence & Metrics (Quality Layer)

**Definition**  
Signals that describe how settled, current, and effective content is.

Includes:
- Confidence levels (New / Reviewed / Updated)
- Last reviewed date / law year
- Flag counts
- Incorrect rates

**Rules**
- Metrics inform review only
- Metrics never auto-change content
- Metrics are aggregated and anonymous
- Metrics are admin-visible, not user-judging

**Why**
This keeps quality improving without surveillance or automation risk.

---

### 4.4 Admin Review Loop (Governance Layer)

**Definition**  
A controlled workflow that governs how content changes.

Stages:
- Draft
- Active
- Retired

Actions:
- Clarify
- Update
- Retire

**Rules**
- All changes are explicit
- All changes are logged
- AI may assist but never decide
- Community input is signal only

**Why**
This prevents silent drift and protects legal accuracy.

---

## 5. State Isolation (Critical Architectural Rule)

> **Business / Law content is always state-isolated.**

- No shared legal records
- No cross-state reuse
- No assumptions of similarity

Trade content may be code/year-scoped but never legally shared.

This rule exists to:
- reduce legal risk
- simplify verification
- isolate errors

---

## 6. User Experience Architecture

### 6.1 Guest-First Model

- Login is optional
- Learning is never blocked
- Accounts exist only to save progress

This lowers friction and builds trust.

---

### 6.2 Single Question Renderer

All questions render through a single `QuestionCard` abstraction.

- Labels are canon-locked
- Layout is stable
- Content never controls typography or spacing

This prevents visual drift and AI formatting issues.

---

## 7. Extension Strategy (How New Things Are Added)

### 7.1 Allowed Extensions

New features MUST be one of:
- a new **pool type**
- a new **lens**
- a new **admin review tool**

Examples:
- Adding “Real-World Scenarios” → new pool
- Adding “Weak Area Review” → new lens
- Adding “Statute Diff View” → admin tool

---

### 7.2 Forbidden Extensions

❌ Adding special rules to existing pools  
❌ Creating category-specific behavior hacks  
❌ Letting UI logic depend on content quirks  
❌ Turning categories into workflows  

---

## 8. AI in the Architecture

AI is treated as:
> **A research and drafting assistant**

AI:
- drafts
- summarizes
- compares
- suggests

AI does NOT:
- publish
- retire
- override canon
- replace verification

This ensures speed without loss of control.

---

## 9. Failure Containment Philosophy

The architecture assumes:
- laws change
- mistakes will happen
- users will disagree

Design choices prioritize:
- local failure over global failure
- clarity over cleverness
- isolation over reuse

This is intentional.

---

## 10. Mental Model (For Future Maintainers)

If you forget everything else, remember this:

> **Truth lives in pools.  
> Experiences are lenses.  
> Confidence comes from review.  
> Authority stays human.**

If a feature doesn’t fit this model, it probably doesn’t belong.

---

## 11. Canon Lock Statement

Any change that:
- breaks state isolation,
- automates legal decisions,
- merges content with presentation,
- or turns the product into a management system

is CANON-breaking and requires explicit re-ratification.

---

END OF ARCHITECTURE
