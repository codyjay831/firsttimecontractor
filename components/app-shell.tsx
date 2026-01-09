"use client";

import { Suspense } from "react";
import { TopBar } from "@/components/top-bar";
import { LeftNav } from "@/components/left-nav";
import { SyncManager } from "@/components/auth/sync-manager";
import { RouteLogger } from "@/components/dev/route-logger";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col">
      <SyncManager />
      {process.env.NODE_ENV === "development" && (
        <Suspense fallback={null}>
          <RouteLogger />
        </Suspense>
      )}
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <LeftNav />
        <main className="relative z-0 flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}

