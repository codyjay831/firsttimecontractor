"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getSessionItem } from "@/lib/session-storage";
import { syncProgress } from "@/lib/content/sync";

const PROGRESS_STORAGE_KEY = "content_pack_progress";

export function SyncManager() {
  const { status } = useSession();
  const [hasSynced, setHasSynced] = useState(false);

  useEffect(() => {
    if (status === "authenticated" && !hasSynced) {
      const localProgress = getSessionItem<Record<string, { correctQuestionIds: string[]; incorrectQuestionIds: string[] }>>(PROGRESS_STORAGE_KEY, {});
      
      if (Object.keys(localProgress).length > 0) {
        syncProgress(localProgress).then((result) => {
          if (result.success) {
            setHasSynced(true);
            console.log("Progress synced to DB");
          }
        });
      } else {
        // Use a timeout to avoid synchronous setState warning
        const timer = setTimeout(() => setHasSynced(true), 0);
        return () => clearTimeout(timer);
      }
    } else if (status === "unauthenticated" && hasSynced) {
      // Use microtask or timeout to avoid synchronous setState warning
      const timer = setTimeout(() => setHasSynced(false), 0);
      return () => clearTimeout(timer);
    }
  }, [status, hasSynced]);

  return null;
}

