# Pricing System — Intentionally Dormant

Status: **Disabled by Design**

This application includes *design-time* pricing, Pro tier copy, and monetization guardrails **that are not active**.

This is intentional.

---

## Why Pricing Is Dormant

FirstTimeContractor is built to ensure:

* Users can pass their exam without paying
* Trust is not compromised by premature monetization
* Study quality is never affected by pricing pressure

Pricing and Pro features exist **only as future-ready scaffolding**.

They are:

* Documented
* Guardrailed
* Feature-flagged

They are **not live**.

---

## Activation Rules (Do Not Bypass)

Pricing **must not** appear unless **all** of the following are true:

* `pro_enabled === true`
* `pricing_visible === true`
* `payments_enabled === true`
* Canon documents updated and explicitly unfrozen

If any flag is false, pricing UI must render **nothing**.

---

## Contributor Warning

If you are reading this and thinking:

> "It would be easy to just show pricing here"

**Stop.**

Monetization decisions are canon-governed and intentional.

Any attempt to surface pricing without updating canon is considered a **trust violation**, not a feature improvement.

---

## Related Canon Files

* `PRICING.canon.md`
* `MONETIZATION_GUARDRAILS.canon.md`

Read these before touching anything related to pricing, Pro, or payments.

---

If pricing appears in the UI and you did not explicitly enable it, something is wrong.
