# GUEST_SESSION_BEHAVIOR.canon.md
Version: 1.0  
Status: CANON — LOCKED  
Project: Firsttimecontractor  
Scope: Guest Usage, Temporary Data, Session Handling

---

## 1. Purpose

Define how guest (unauthenticated) sessions behave so that:
- users can explore freely
- expectations are clear
- no misleading guarantees are implied
- login remains optional and trust-based

---

## 2. Core Rule (LOCKED)

> **Guest sessions are for exploration.  
> Persistence requires login.**

---

## 3. Allowed Guest Data (Temporary)

Guest sessions MAY temporarily store:
- current test progress
- current answers
- temporary flags or notes
- context selections (country/state/license)

Storage may use:
- in-memory state
- session storage
- local storage

---

## 4. Non-Guarantee Rule

Guest data:
- is not guaranteed
- may be cleared at any time
- is not recoverable

The UI MUST NOT alarm users about this.

---

## 5. Guest → Login Transition

When a guest attempts to save data:
- prompt login calmly
- explain purpose clearly

Allowed intent:
> “Sign in to save your progress and come back later.”

Forbidden:
- urgency
- warnings
- threats of data loss

---

## 6. No Forced Login (LOCKED)

The following are forbidden:
❌ Forced login to view questions  
❌ Forced login to read explanations  
❌ Forced login mid-test  
❌ Countdown-based demo locks  

---

## 7. Visual Indicators (Optional)

If a guest indicator is shown:
- keep it subtle
- informational only

Allowed:
- “Exploring as guest”

---

## 8. Canon Lock Statement

Any change that:
- treats guest access as a crippled trial,
- forces login for learning,
- or misrepresents persistence

is CANON-breaking and requires explicit re-ratification.

---

END OF CANON
