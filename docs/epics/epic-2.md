# EPIC 2: Lens-Aware Routing Strategy

## Overview
This document defines how routes in Firsttimecontractor carry lens context (State, License, Trade) via the URL in a non-breaking, read-only manner.

## Routing Structure
To maintain backward compatibility while supporting lens-aware URLs, we use a dual-routing approach:

1. **Standard Routes (Existing)**
   - `/practice`
   - `/exam`
   - `/flashcards`
   - etc.
   - *Behavior*: Uses `TopContext` (localStorage) for display.

2. **Lens-Prefixed Routes (New)**
   - `/[state]/[license]/practice`
   - `/[state]/[license]/[trade]/practice`
   - *Behavior*: URL parameters take priority over `TopContext` for display and link building.

## Resolution Priority (Display Only)
1. URL Parameters (`state`, `license`, `trade`) - if present in the current route.
2. `TopContext` (localStorage) - if no URL parameters are present.
3. Defaults (`null`) - fallback if both are missing.

## Implementation Detail
- Shared page components will be used to ensure the content remains identical between standard and lens-prefixed routes.
- A `useLens` hook will handle the resolution logic and provide the `ResolvedLens` to components.
- Navigation links will be generated using a `buildLensHref` utility to preserve context when moving between lens-aware pages.

