"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

/**
 * Dev-only component that logs when routes are committed.
 * Place near the top of the client tree (e.g., in AppShell).
 */
export function RouteLogger() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Log when route actually commits (pathname or search changes)
  useEffect(() => {
    console.log("[route] committed", pathname, searchParams.toString());
  }, [pathname, searchParams]);

  return null;
}
