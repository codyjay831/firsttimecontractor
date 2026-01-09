"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLens } from "@/lib/lens/use-lens";
import { useTopContext } from "@/lib/top-context/use-top-context";
import { lensFromPathname } from "@/lib/lens/href";
import { clearContext } from "@/lib/top-context/storage";
import { Link2, Info, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { LensChips } from "./lens/lens-chips";
import { SourceIndicator } from "./lens/source-indicator";

export function TopBarLensInfo() {
  const lens = useLens();
  const pathname = usePathname();
  const router = useRouter();
  const store = useTopContext();
  const [isOpen, setIsOpen] = React.useState(false);

  const pathnameLens = lensFromPathname(pathname);
  const isLensedUrl = !!pathnameLens;
  
  // Detect mismatch: URL has lens but selector has different or cleared values
  const selectorMismatch = isLensedUrl && (
    store.state !== pathnameLens.state ||
    store.licenseType !== pathnameLens.licenseType ||
    store.trade !== pathnameLens.trade
  );

  if (!lens.state && !lens.licenseType) return null;

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  const handleExitLens = () => {
    clearContext();
    router.push("/practice");
  };

  return (
    <div className="flex items-center gap-2">
      {/* Mismatch Banner - visible when selector differs from URL lens */}
      {selectorMismatch && (
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs">
          <Info className="h-3.5 w-3.5 shrink-0" />
          <span>
            Viewing lensed URL ({pathnameLens.state}/{pathnameLens.licenseType}
            {pathnameLens.trade && `/${pathnameLens.trade}`})
          </span>
        </div>
      )}

      {/* Desktop View */}
      <div className="hidden lg:flex items-center gap-3 px-3 py-1.5 rounded-full bg-muted border border-border">
        <LensChips lens={lens} />
        <div className="h-4 w-px bg-border" />
        <SourceIndicator source={lens.source} />
        {isLensedUrl && (
          <>
            <div className="h-4 w-px bg-border" />
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-xs gap-1.5 text-muted-foreground hover:text-foreground"
              onClick={handleExitLens}
              title="Exit lens and return to global navigation"
            >
              <LogOut className="h-3 w-3" />
              Exit lens
            </Button>
          </>
        )}
      </div>

      {/* Mobile Trigger */}
      <Button
        variant="ghost"
        size="icon-sm"
        className="lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
        title="View lens info"
      >
        <Info className="h-4 w-4" />
      </Button>

      {/* Copy Link Button (Always visible) */}
      <Button 
        variant="ghost" 
        size="icon-sm" 
        onClick={copyLink}
        title="Copy context link"
      >
        <Link2 className="h-3.5 w-3.5" />
      </Button>

      {/* Simple Mobile "Sheet" implementation */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm lg:hidden" 
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed inset-x-0 bottom-0 z-[70] flex flex-col gap-4 border-t border-border bg-background p-6 shadow-lg animate-in slide-in-from-bottom duration-200 lg:hidden">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Active Lens</h2>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                Close
              </Button>
            </div>
            
            <div className="flex flex-col gap-4">
              {/* Mismatch info for mobile */}
              {selectorMismatch && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-sm">
                  <Info className="h-4 w-4 shrink-0" />
                  <span>
                    Viewing lensed URL ({pathnameLens.state}/{pathnameLens.licenseType}
                    {pathnameLens.trade && `/${pathnameLens.trade}`}). Exit lens to return to global navigation.
                  </span>
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Source</span>
                <SourceIndicator source={lens.source} className="text-sm normal-case" />
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Segments</span>
                <LensChips lens={lens} chipClassName="h-6 px-2 text-xs" />
              </div>

              <Button 
                variant="outline" 
                className="w-full mt-2 gap-2" 
                onClick={() => {
                  copyLink();
                  setIsOpen(false);
                }}
              >
                <Link2 className="h-4 w-4" />
                Copy Shareable Link
              </Button>

              {isLensedUrl && (
                <Button 
                  variant="outline" 
                  className="w-full gap-2" 
                  onClick={() => {
                    handleExitLens();
                    setIsOpen(false);
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  Exit Lens
                </Button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

