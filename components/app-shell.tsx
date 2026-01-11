"use client";

import { useState, Suspense } from "react";
import { TopBar } from "@/components/top-bar";
import { LeftNav } from "@/components/left-nav";
import { SyncManager } from "@/components/auth/sync-manager";
import { RouteLogger } from "@/components/dev/route-logger";

/**
 * DESKTOP LAYOUT INVARIANTS
 *
 * - Keep the shell fluid (TopBar + LeftNav full-width/anchored)
 * - Constrain PAGE CONTENT inside <main> with max-w + mx-auto
 * - Avoid narrow containers in the shell
 * - Avoid stacked horizontal padding from nav + top bar + page
 * - Content must start at top (no vertical centering)
 * - Goal: reduce scroll and mouse travel, increase information density
 */

export function AppShell({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col bg-background">
      <SyncManager />
      {process.env.NODE_ENV === "development" && (
        <Suspense fallback={null}>
          <RouteLogger />
        </Suspense>
      )}
      <TopBar onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} />
      <div className="flex flex-1 overflow-hidden relative">
        <LeftNav 
          mobileOpen={mobileMenuOpen} 
          onMobileClose={() => setMobileMenuOpen(false)} 
        />
        {/* RULE: Desktop density = constrain content, not the viewport: main stays fluid (flex-1); inner content uses max-w-[1400px] mx-auto px-6 (no `container`, no padding stacks). */}
        {/* 
DESKTOP + TABLET LAYOUT GUARD (Do not regress)

Invariants:
- Do NOT add `container` / narrow `max-w-*` to <main>. Main must remain fluid (`flex-1`).
- Do NOT stack horizontal padding (TopBar + Main + Page). Prefer: TopBar px-4, Main p-0, inner wrapper px-6.
- Canonical content wrapper: `w-full max-w-[1400px] mx-auto px-6`.
- No whole-page vertical centering (`items-center/justify-center/place-items-center`).

Manual checks:
- Desktop (1440–1920): content feels close; reduced mouse travel; no “zoomed out” look.
- Tablet landscape (~1024): nav expanded still leaves usable content area.
- Mobile: readable without horizontal scroll.
*/}
        <main className="relative z-0 flex-1 overflow-auto">
          <div className="w-full max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
