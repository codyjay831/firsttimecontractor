# DEMO_MODE.canon.md
Version: 1.0  
Status: CANON — LOCKED  
Project: Firsttimecontractor  
Scope: Authentication Requirements, Demo Access, Guest Usage

---

## 1. Purpose

Define clear rules for demo and guest usage so that:
- users can explore and learn without friction
- login is never required just to understand the product
- accounts exist only to save progress and personalization
- trust is built before commitment

---

## 2. Core Rule (Non-Negotiable)

> **Login is required only to save data.  
> Login is NOT required to use the product.**

This principle applies across all public-facing features.

---

## 3. What Is Available Without Login (Demo Mode)

Unauthenticated users MUST be able to:

- View the homepage and positioning pages
- View “What we’re building”
- Explore practice questions (limited set or sample pool)
- Take practice tests (guided or exam-style)
- View explanations (textbook + human)
- Switch light/dark mode
- Select country/state/license context (temporary)

Demo users may freely explore without restriction or countdown timers.

---

## 4. What Requires Login (Explicit Boundary)

Authentication is required only for features that involve **persistence**:

- Saving progress
- Test history
- Weak-area tracking
- Flags and notes
- Resume last test
- Personalized recommendations

When a guest attempts to use these:
- Prompt login calmly
- Explain *why* login is needed

Example intent:
> “Create an account to save your progress and come back later.”

---

## 5. Guest Data Handling Rules

- Guest sessions may store temporary data (session/local storage)
- Guest data is:
  - non-guaranteed
  - non-portable
  - cleared on browser reset

The UI MUST make this implicit, not alarming.

---

## 6. No Forced Walls (Explicitly Forbidden)

The following are CANON-forbidden:

❌ Login required to view questions  
❌ Login required to read explanations  
❌ “Sign up to continue” hard stops mid-test  
❌ Countdown-based demo lockouts  
❌ Artificial feature crippling  

Exploration must feel complete, not baited.

---

## 7. Demo Labeling & Tone

If demo mode is labeled:
- Use calm language
- Avoid “trial” pressure

Allowed:
- “You’re exploring as a guest.”
- “Sign in to save your progress.”

Forbidden:
- “Upgrade now”
- “Trial expires”
- “Limited access”

---

## 8. Future Compatibility

This canon supports:
- waitlists
- early access
- invite-only admin tools
- public read-only demos

Without changing the rule:
> **Auth = persistence, not permission.**

---

## 9. Canon Lock Statement

Any change that:
- requires login for basic learning,
- blocks explanations behind auth,
- or introduces artificial demo limits

is CANON-breaking and requires explicit re-ratification.

---

END OF CANON
