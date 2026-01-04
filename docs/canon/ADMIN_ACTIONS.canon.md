# ADMIN_ACTIONS.canon.md
Version: 1.0  
Status: CANON — LOCKED  
Project: Firsttimecontractor  
Scope: Admin Actions, Confirmations, Publishing, Retirement, Imports

---

## 1. Purpose

Define canonical behavior and copy requirements for **high-impact admin actions** so that:
- consequences are explicit
- irreversible actions are clear
- admin mistakes are minimized
- behavior is consistent across the system

---

## 2. Actions Covered

This canon applies to:
- Publish
- Retire
- Bulk Import
- Bulk Publish
- Version-incrementing edits

---

## 3. Publish Action (LOCKED)

### Confirmation Required
Yes — always.

### Required Copy

**Title**
> Publish question

**Body**
> This will make the question visible to users.  
> The current version will be marked active.  
> This action cannot be undone.

**Buttons**
- Primary: **Publish**
- Secondary: **Cancel**

---

## 4. Retire Action (LOCKED)

### Confirmation Required
Yes — always.

### Required Copy

**Title**
> Retire question

**Body**
> This will remove the question from future tests.  
> Existing attempts and history will remain available.  
> This action cannot be undone.

**Buttons**
- Primary: **Retire**
- Secondary: **Cancel**

---

## 5. Bulk Import Action (LOCKED)

### Confirmation Required
Yes.

### Required Copy

**Title**
> Import questions

**Body**
> Imported questions will be validated and saved as drafts.  
> Invalid items will be rejected with errors.  
> Imported questions are not visible to users until published.

**Buttons**
- Primary: **Import**
- Secondary: **Cancel**

---

## 6. Bulk Publish Action (LOCKED)

### Confirmation Required
Yes.

### Required Copy

**Title**
> Publish selected questions

**Body**
> All selected questions will become visible to users.  
> Each question will be published at its current version.  
> This action cannot be undone.

**Buttons**
- Primary: **Publish**
- Secondary: **Cancel**

---

## 7. Version Change Notice (Required)

When an edit increments version, Admin UI MUST show:

> “This change will increment the question version.”

No soft wording is allowed.

---

## 8. Canon Lock Statement

Any change that:
- removes confirmations,
- softens consequence language,
- or alters required copy

is CANON-breaking and requires explicit re-ratification.

---

END OF CANON
