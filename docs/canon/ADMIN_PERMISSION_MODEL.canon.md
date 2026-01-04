# ADMIN_PERMISSION_MODEL.canon.md
Version: 1.0  
Status: CANON — LOCKED  
Project: Firsttimecontractor  
Scope: Admin Roles, Permissions, Authority Boundaries

---

## 1. Purpose

Define the canonical **permission and authority model** for admin functionality so that:
- high-impact actions are controlled
- responsibilities are explicit
- mistakes are minimized
- future contributors cannot silently expand privileges

This canon governs **who can do what** in the Admin UI.

---

## 2. Core Principle (Non-Negotiable)

> **Authority must be explicit, minimal, and role-based.**

Permissions are granted by role, not convenience.

---

## 3. Canonical Roles

### 3.1 Viewer
Read-only access.

Allowed:
- View questions and other pool items
- View versions and status
- View lenses

Forbidden:
- Edit
- Publish
- Retire
- Import

---

### 3.2 Editor
Creates and edits draft content.

Allowed:
- Create new pool items (draft only)
- Edit draft pool items
- Run validation checks
- Preview rendering

Forbidden:
- Publish
- Retire
- Bulk publish
- Change status to active

---

### 3.3 Publisher
Controls what becomes visible to users.

Allowed:
- Publish draft items
- Retire active items
- Bulk publish
- Bulk retire

Requirements:
- Must see explicit confirmation dialogs
- Must acknowledge irreversible actions

---

### 3.4 Admin
Full system authority.

Allowed:
- All Editor + Publisher actions
- Manage lenses
- Perform bulk imports
- Manage permissions (future)

Admin role is intended for **very limited users**.

---

## 4. Permission Rules (LOCKED)

- Editors MUST NOT be able to publish or retire
- Publishers MUST NOT bypass confirmations
- No role may silently escalate privileges
- Permissions MUST be enforced server-side (UI alone is insufficient)

---

## 5. Role Visibility

Admin UI MUST:
- Clearly indicate current user role
- Disable forbidden actions visibly
- Explain why an action is unavailable (calm, factual copy)

Example:
> “Publishing requires Publisher permissions.”

---

## 6. Future Expansion Rule

New roles MAY be added only if:
- their scope is clearly narrower than Admin
- responsibilities do not overlap ambiguously
- changes are ratified as canon updates

---

## 7. Canon Lock Statement

Any change that:
- allows Editors to publish,
- hides authority boundaries,
- or bypasses role enforcement

is CANON-breaking and requires explicit re-ratification.

---

END OF CANON
