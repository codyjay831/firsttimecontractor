"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { 
  LogIn, 
  LogOut, 
  User as UserIcon,
  Loader2,
  Check
} from "lucide-react";
import { useState, useEffect } from "react";

export function UserAccountControl() {
  const { data: session, status } = useSession();
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      // Use microtask or timeout to avoid synchronous setState in effect
      const syncTimer = setTimeout(() => setIsSyncing(true), 0);
      const timer = setTimeout(() => setIsSyncing(false), 2000);
      return () => {
        clearTimeout(syncTimer);
        clearTimeout(timer);
      };
    }
  }, [status]);

  if (status === "loading") {
    return (
      <Button variant="ghost" size="sm" disabled className="h-8 w-8 p-0">
        <Loader2 className="h-4 w-4 animate-spin" />
      </Button>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex items-center gap-2">
        <span className="hidden lg:inline text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
          Sign in to save progress
        </span>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => signIn()}
          className="gap-2 h-8 text-xs font-medium"
        >
          <LogIn className="h-3.5 w-3.5" />
          Sign In
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-muted/50 text-[10px] font-medium text-muted-foreground border border-border/50">
        {isSyncing ? (
          <>
            <Loader2 className="h-3 w-3 animate-spin" />
            <span>Syncing</span>
          </>
        ) : (
          <>
            <Check className="h-3 w-3 text-green-500" />
            <span>Synced</span>
          </>
        )}
      </div>

      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20">
          <UserIcon className="h-4 w-4" />
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => signOut()}
          className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
          title="Sign out"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
