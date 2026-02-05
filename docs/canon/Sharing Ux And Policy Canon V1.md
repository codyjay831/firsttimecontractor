# Sharing UX & Policy Canon v1.1 (Planned)

> **⚠️ PLANNED FEATURE**  
> This canon describes behavior for sharing features that are currently under development and not yet implemented in the production build.

**Project:** FirstTimeContractor (FTC)

**Purpose:**
Define how sharing works in-product so that:

* sharing intent is clear and bounded
* users feel encouraged (not restricted)
* authorship is preserved
* no ambiguous licensing language is required

The product design itself defines the sharing policy.

---

## 1. Core Principle (Planned)

> **Sharing will be enabled through explicit product features, not implied permission.**

If the app provides a Share action, that action will define:

* what can be shared
* how it is shared
* the intended scope (person-to-person learning)

Anything outside that mechanism is not granted by default.

---

## 2. What Sharing Is For

Sharing exists to support:

* personal study
* discussion with peers
* asking for help
* teaching or mentoring

Sharing does **not** exist to support:

* bulk redistribution
* content scraping
* commercial republishing
* rebranding as original work

This distinction is intended to be enforced by UX, not legal threats.

---

## 3. Share Button UX (Planned Design)

### Placement

* Visible on (Future):

  * individual questions
  * practice sets
  * exam results summaries
* Never hidden behind menus
* Icon + text label: **Share**

---

### Primary Share Action

Clicking **Share** will open a lightweight modal with:

**Title:**

> Share for study or discussion

**Options (device-aware):**

* Copy link
* Native OS share sheet (mobile)

No additional choices by default.

---

### Shared Link Behavior

Shared links should:

* open a **read-only view**
* clearly show context (question / set / result)
* not require login to view
* not allow bulk navigation or export

The link represents *one intentional share*, not a dataset.

---

## 4. Attribution (Planned)

Every shared view will include subtle attribution:

> Shared from FirstTimeContractor

Optional footer:

> Original questions by FirstTimeContractor

No watermarking. No obfuscation.

Attribution is informational, not punitive.

---

## 5. Answers & Explanations in Shared Views

Default behavior (Planned):

* Questions visible
* Answers hidden until user clicks **Reveal Answer**

Rationale:

* encourages discussion
* prevents answer farming
* mirrors real study behavior

This is UX protection, not DRM.

---

## 6. No Implicit License Language

The product **should not** use:

* "share freely"
* "open license"
* "royalty-free"
* "public domain"

All permissions are conveyed through:

* feature scope
* UI affordances
* contextual copy

---

## 7. Copy Standards (Planned Microcopy)

Allowed:

* "Share for study or discussion"
* "Send this question to a friend"
* "Discuss this question"

Forbidden:

* legal disclaimers in the modal
* warnings or threats
* long explanations of rights

If copy needs explanation, the UX is wrong.

---

## 8. Anti-Patterns (Future Hard Fails)

FTC should never:

* block copy/paste
* disable text selection
* add hidden watermarks
* inject aggressive copyright warnings
* shame users for sharing

Trust is part of the product.

---

## 9. Evidence of Intent (Planned)

Internally, FTC may log:

* share event (yes/no)
* content ID shared
* timestamp

This data is for:

* product insight
* abuse detection

Not for surveillance or enforcement.

---

## 10. Canon Summary (Planned)

* Sharing is intentional, scoped, and human
* UX defines permission boundaries
* Attribution is calm and persistent
* Learning is encouraged; exploitation is not

> **Good tools don’t threaten users — they guide them.**

— **END OF SHARING UX & POLICY CANON v1.1 (Planned)**
