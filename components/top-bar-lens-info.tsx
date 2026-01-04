"use client";

import * as React from "react";
import { useLens } from "@/lib/lens/use-lens";
import { Link2, Info } from "lucide-react";
import { Button } from "./ui/button";
import { LensChips } from "./lens/lens-chips";
import { SourceIndicator } from "./lens/source-indicator";

export function TopBarLensInfo() {
  const lens = useLens();
  const [isOpen, setIsOpen] = React.useState(false);

  if (!lens.state && !lens.licenseType) return null;

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Desktop View */}
      <div className="hidden lg:flex items-center gap-3 px-3 py-1.5 rounded-full bg-muted border border-border">
        <LensChips lens={lens} />
        <div className="h-4 w-px bg-border" />
        <SourceIndicator source={lens.source} />
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
            </div>
          </div>
        </>
      )}
    </div>
  );
}

