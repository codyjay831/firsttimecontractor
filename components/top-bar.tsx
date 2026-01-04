"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { TopContextSelector } from "@/components/top-context-selector";
import { TopBarLensInfo } from "@/components/top-bar-lens-info";

export function TopBar() {
  return (
    <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-border bg-background px-4">
      <div className="flex items-center gap-6">
        <Link href="/" className="hover:opacity-80 transition-opacity flex-shrink-0">
          <h1 className="text-lg font-semibold tracking-tight">
            Firsttimecontractor
          </h1>
        </Link>
        <div className="hidden md:block h-6 w-px bg-border" />
        <div className="hidden md:block">
          <TopContextSelector />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <TopBarLensInfo />
        <ThemeToggle />
      </div>
    </header>
  );
}

