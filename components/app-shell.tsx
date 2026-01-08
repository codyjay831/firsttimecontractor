"use client";

import { TopBar } from "@/components/top-bar";
import { LeftNav } from "@/components/left-nav";
import { SyncManager } from "@/components/auth/sync-manager";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col">
      <SyncManager />
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <LeftNav />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}

