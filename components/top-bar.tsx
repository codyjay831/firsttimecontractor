"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { TopContextSelector } from "@/components/top-context-selector";
import { TopBarLensInfo } from "@/components/top-bar-lens-info";
import { UserAccountControl } from "@/components/auth/user-account-control";

interface TopBarProps {
  onMenuClick?: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
  return (
    <header className="sticky top-0 z-50 flex h-14 items-center justify-between border-b border-border bg-background px-4">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon-sm"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <Link href="/app" className="hover:opacity-80 transition-opacity flex-shrink-0">
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
        <div className="h-6 w-px bg-border mx-1" />
        <UserAccountControl />
        <ThemeToggle />
      </div>
    </header>
  );
}

