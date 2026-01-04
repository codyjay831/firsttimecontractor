"use client";

import { useLens } from "@/lib/lens/use-lens";
import { Badge } from "@/components/ui/badge";
import { Link2 } from "lucide-react";
import { Button } from "./ui/button";

export function TopBarLensInfo() {
  const lens = useLens();

  if (!lens.state && !lens.licenseType) return null;

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <div className="flex items-center gap-2">
      <div className="hidden lg:flex items-center gap-1.5 px-2 py-1 rounded-full bg-muted border border-border">
        {lens.state && (
          <Badge variant="secondary" className="h-5 px-1.5 text-[10px] font-bold">
            {lens.state}
          </Badge>
        )}
        {lens.licenseType && (
          <Badge variant="outline" className="h-5 px-1.5 text-[10px]">
            {lens.licenseType}
          </Badge>
        )}
        {lens.trade && (
          <Badge variant="outline" className="h-5 px-1.5 text-[10px]">
            {lens.trade}
          </Badge>
        )}
      </div>
      <Button 
        variant="ghost" 
        size="icon-sm" 
        onClick={copyLink}
        title="Copy context link"
      >
        <Link2 className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}

