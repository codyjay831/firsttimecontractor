"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  ClipboardCheck,
  Layers,
  RotateCcw,
  ScrollText,
  LayoutGrid,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLens } from "@/lib/lens/use-lens";
import { buildLensHref } from "@/lib/lens/href";

const navItems = [
  {
    label: "Study Hub",
    href: "/study",
    icon: LayoutGrid,
  },
  {
    label: "Practice",
    href: "/practice",
    icon: BookOpen,
  },
  {
    label: "Exam simulation",
    href: "/exam",
    icon: ClipboardCheck,
  },
  {
    label: "Flashcards",
    href: "/flashcards",
    icon: Layers,
  },
  {
    label: "Review mistakes",
    href: "/review",
    icon: RotateCcw,
  },
  {
    label: "State rules",
    href: "/state-rules",
    icon: ScrollText,
  },
];

export function LeftNav() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = React.useState(false);
  const lens = useLens();

  return (
    <aside
      className={cn(
        "relative z-50 flex h-full flex-col border-r border-border bg-sidebar transition-all duration-200",
        collapsed ? "w-14" : "w-56"
      )}
    >
      <div className="flex h-12 items-center justify-end border-b border-sidebar-border px-2">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setCollapsed(!collapsed)}
          title={collapsed ? "Expand navigation" : "Collapse navigation"}
        >
          {collapsed ? (
            <PanelLeft className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
        </Button>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-2">
        {navItems.map((item) => {
          const href = buildLensHref({ base: item.href, lens });
          const isActive = pathname === href || pathname === item.href;
          return (
            <Link
              key={item.href}
              href={href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground",
                collapsed && "justify-center px-0"
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

