"use client";

import * as React from "react";
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
import { buildLensHref, lensFromPathname } from "@/lib/lens/href";

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
  const selectorLens = useLens();

  // Ref-based navigation guard (more reliable than state for rapid clicks)
  const isNavigatingRef = React.useRef(false);
  const pendingHrefRef = React.useRef<string | null>(null);

  // Prefer lens from pathname to prevent nav jumping when selector changes
  const pathnameLens = lensFromPathname(pathname);
  const lens = pathnameLens ?? selectorLens;

  // Reset navigation lock when route commits (page load)
  React.useEffect(() => {
    isNavigatingRef.current = false;
    pendingHrefRef.current = null;
  }, [pathname]);

  const handleNavClick = (href: string) => {
    // Single-flight: ignore clicks while navigating
    if (isNavigatingRef.current) {
      if (process.env.NODE_ENV === "development") {
        console.log("[nav] Ignoring click - navigation in progress to:", pendingHrefRef.current);
      }
      return;
    }

    // Don't navigate if already on this route
    if (pathname.toLowerCase() === href.toLowerCase()) {
      return;
    }

    if (process.env.NODE_ENV === "development") {
      console.log("[nav] Starting navigation:", { from: pathname, to: href });
    }

    isNavigatingRef.current = true;
    pendingHrefRef.current = href;

    // Use hard navigation to bypass App Router issues
    // This is a workaround for RSC navigation not committing
    window.location.assign(href);
  };

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
          const pathLower = pathname.toLowerCase();
          const isActive = pathLower === href.toLowerCase() || pathLower === item.href.toLowerCase();
          return (
            <button
              key={item.href}
              type="button"
              onClick={() => handleNavClick(href)}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors text-left",
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
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

