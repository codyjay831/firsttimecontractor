# UI_STACK.canon.md
Version: 1.0  
Status: CANON — LOCKED  
Project: Firsttimecontractor  
Scope: UI Component System + Theming

---

## 1. Purpose

Lock the UI implementation stack for Firsttimecontractor to ensure:
- Consistency across the product
- Fast development with minimal UI drift
- Reliable accessibility and component behavior
- Clean, maintainable theming (Light/Dark)

---

## 2. Canon UI Stack

### 2.1 Component Library (LOCKED)
All UI components MUST be built using **shadcn/ui** components.

- Buttons, inputs, dialogs, sheets, dropdowns, tabs, alerts, toasts, etc.
- Any new UI element MUST either:
  1) use an existing shadcn/ui component, or  
  2) be composed from shadcn/ui primitives

---

## 3. Theming (LOCKED)

### 3.1 Supported Modes
Firsttimecontractor MUST support:
- **Light Mode**
- **Dark Mode**

### 3.2 Theming Method
Theming MUST be implemented using the standard shadcn approach:
- Tailwind + CSS variables / design tokens
- Theme changes affect the entire app globally
- Components must inherit theme automatically

---

## 4. Non-Negotiable Rules

### 4.1 No Custom UI Primitives
The following are explicitly forbidden:
- Creating custom Button/Input/Dialog primitives outside shadcn/ui patterns
- Forking the app into multiple parallel component systems

If a primitive is missing:
- add the corresponding shadcn/ui component OR
- extend it minimally while preserving the shadcn structure

---

### 4.2 No Per-Component Theme Hacks
Forbidden:
- Hardcoding colors per component for dark/light
- Inline style theming logic that bypasses tokens

Allowed:
- Token-level adjustments
- Global theme variables
- Tailwind class usage that references tokens

---

## 5. Composition Guidance (Allowed + Encouraged)

Custom UI should be created as **composed components** built from shadcn/ui:
- `LeftNav`
- `ContextBar`
- `LensList`
- `QuestionCard`
- `ExplanationBlock`
- `AttemptReview`

These are layouts/patterns, not primitives.

---

## 6. Canon Lock Statement

This UI stack is foundational for Firsttimecontractor.

Any change that:
- replaces shadcn/ui as the component system
- introduces a second competing component library
- removes light or dark mode support
- implements theming outside token-based globals

is CANON-breaking and requires explicit re-ratification.

---

END OF CANON
