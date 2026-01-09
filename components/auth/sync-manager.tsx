"use client";

import { useSession } from "next-auth/react";
import { useEffect, useRef } from "react";
import { getSessionItem } from "@/lib/session-storage";
import { syncProgress } from "@/lib/content/sync";

const PROGRESS_STORAGE_KEY = "content_pack_progress";

export function SyncManager() {
  const { status } = useSession();
  const hasSyncedRef = useRef(false);
  const isSyncingRef = useRef(false);

  useEffect(() => {
    // Guard: only sync once per session, and prevent concurrent syncs
    if (status === "authenticated" && !hasSyncedRef.current && !isSyncingRef.current) {
      const localProgress = getSessionItem<Record<string, { correctQuestionIds: string[]; incorrectQuestionIds: string[] }>>(PROGRESS_STORAGE_KEY, {});
      
      if (Object.keys(localProgress).length > 0) {
        isSyncingRef.current = true;
        
        if (process.env.NODE_ENV === "development") {
          console.log("[SyncManager] Triggering syncProgress");
        }
        
        syncProgress(localProgress).then((result) => {
          isSyncingRef.current = false;
          if (result.success) {
            hasSyncedRef.current = true;
            if (process.env.NODE_ENV === "development") {
              console.log("[SyncManager] Sync completed successfully");
            }
          }
        }).catch(() => {
          isSyncingRef.current = false;
        });
      } else {
        hasSyncedRef.current = true;
      }
    } else if (status === "unauthenticated" && hasSyncedRef.current) {
      // Reset on logout so next login can sync again
      hasSyncedRef.current = false;
    }
  }, [status]);

  return null;
}

