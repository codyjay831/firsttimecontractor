# MINIMAL_AUDIT_LOG.canon.md
Version: 1.0  
Status: CANON — LOCKED  
Project: Firsttimecontractor  
Scope: Audit Logging for Content Changes and Admin Actions

---

## 1. Purpose

Define a minimal audit log so that:
- critical changes are traceable
- mistakes can be reviewed
- accountability exists without heavy bureaucracy

This is **not** a compliance system — it is a safety net.

---

## 2. Core Rule (Non-Negotiable)

> **Any action that affects user-visible content MUST be logged.**

---

## 3. Actions That MUST Be Logged

- Publish
- Retire
- Bulk import
- Bulk publish
- Version-incrementing edits
- State scope changes

---

## 4. Required Audit Fields

Each audit entry MUST include:

- Action type
- Content ID
- State (if applicable)
- Previous status
- New status
- Previous version
- New version
- Admin user ID
- Timestamp

---

## 5. Optional (Recommended) Fields

- Short reason note (free text)
- Verification reference (internal)

---

## 6. Audit Log Visibility

- Audit logs are **admin-only**
- Logs are append-only
- Logs are never editable
- Logs are never deleted

---

## 7. What Audit Logs Are NOT

Audit logs are NOT:
- public change logs
- user-facing explanations
- discussion forums

They exist for **internal truth tracking only**.

---

## 8. Canon Lock Statement

Any change that:
- removes logging for critical actions,
- allows edits without trace,
- or makes logs mutable

is CANON-breaking and requires explicit re-ratification.

---

END OF CANON
