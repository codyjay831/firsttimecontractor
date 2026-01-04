"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function TopBar() {
  return (
    <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-border bg-background px-4">
      <div className="flex items-center gap-4">
        <Link href="/" className="hover:opacity-80 transition-opacity">
          <h1 className="text-lg font-semibold tracking-tight">
            Firsttimecontractor
          </h1>
        </Link>
        <span className="text-sm text-muted-foreground">
          | Select state and license
        </span>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
      </div>
    </header>
  );
}

