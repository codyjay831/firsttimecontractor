# Layout Density Canon (FTC)

## Goal
Reduce scroll + mouse travel; keep UI “close” on desktop while preserving mobile usability.

## Shell Structure
- AppShell provides chrome: TopBar + LeftNav + Main content region.
- Main must remain fluid (flex-1). Do not apply narrow containers to <main> itself.

## Canonical Content Wrapper
All page content should be visually constrained by an inner wrapper:

- `w-full max-w-[1400px] mx-auto px-6`

This wrapper may live in AppShell OR in a shared PageContainer used by all pages.

## Banned Patterns
- `container mx-auto` on main content
- `max-w-4xl/5xl/6xl` used globally
- stacked padding (e.g., TopBar px-8 AND Main p-8 AND Page px-8)
- whole-page vertical centering (`min-h-screen flex items-center justify-center`)

## Tablet Worst-Case Requirement
- On iPad landscape (~1024px), LeftNav expanded must not reduce main content to an unreadable narrow column.
- Acceptable solutions (choose one when implementing behavior changes):
  1) Nav collapses by default below lg
  2) Nav width reduces on tablet
  3) Nav becomes overlay/drawer on tablet

## Verification
Desktop 1440–1920:
- content occupies ~70–80% width and feels close

Tablet landscape ~1024:
- nav + content both usable

Mobile:
- content readable without horizontal scroll
