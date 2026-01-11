# MONETIZATION GUARDRAILS CANON

Status: Locked
Scope: All current and future monetization

---

## Absolute Rules (Non-Negotiable)

* No paywalls on study content
* No locked questions or answers
* No difficulty gated by payment
* No scoring or pass-rate advantages
* No mid-question upsells
* No urgency language or countdown timers
* No fear-based copy ("Don’t fail again")

If Pro were removed entirely, the product must still feel complete.

---

## Allowed Monetization Surface Areas

Monetization may exist only in:

* Study planning
* Progress visualization
* Session continuity
* Guidance & recommendations
* Convenience features

Monetization may not alter:

* Question pools
* Difficulty distribution
* Exam logic
* Review logic

---

## UX Placement Rules

Allowed:

* Study Hub (informational)
* Post-session summaries
* Settings or account area

Forbidden:

* During active questions
* During answer selection
* During explanation review
* In error states

---

## Feature Flags

All monetization must be gated behind explicit flags.

Required flags:

```ts
pro_enabled = false
pricing_visible = false
payments_enabled = false
```

Defaults:

* All flags false
* Flags must be enabled together

---

## Analytics Guardrails

Analytics may only measure **interest**, never pressure.

Allowed events:

* Viewed Pro info modal
* Clicked "Learn more"
* Dismissed Pro info

Forbidden events:

* Time-to-upgrade pressure
* Question-level upgrade prompts
* Failure-based nudges

Analytics must:

* Be aggregated
* Be anonymous
* Never affect UX in-session

---

## Copy Review Standard

All monetization copy must pass this test:

> Would this still feel fair if the user never pays?

If the answer is no, the copy is rejected.

---
