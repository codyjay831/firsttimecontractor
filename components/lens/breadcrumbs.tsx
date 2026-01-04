"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";
import { buildLensHref } from "@/lib/lens/href";
import { useLens } from "@/lib/lens/use-lens";

const navItems = [
  { label: "Practice", href: "/practice" },
  { label: "Exam simulation", href: "/exam" },
  { label: "Flashcards", href: "/flashcards" },
  { label: "Review mistakes", href: "/review" },
  { label: "State rules", href: "/state-rules" },
];

export function Breadcrumbs() {
  const pathname = usePathname();
  const lens = useLens();

  const currentItem = navItems.find((item) => {
    // Check if pathname ends with the item.href or is the item.href
    // This handles both /practice and /CA/GEN_A/practice
    return pathname.endsWith(item.href);
  });

  const homeHref = buildLensHref({ base: "/", lens });

  return (
    <nav className="flex items-center gap-1.5 text-xs text-muted-foreground" aria-label="Breadcrumb">
      <Link
        href={homeHref}
        className="flex items-center gap-1 hover:text-foreground transition-colors"
      >
        <Home className="h-3 w-3" />
        <span>Home</span>
      </Link>

      {currentItem && (
        <>
          <ChevronRight className="h-3 w-3 shrink-0" />
          <span className="font-medium text-foreground">
            {currentItem.label}
          </span>
        </>
      )}
    </nav>
  );
}

