"use client";

import { SectionCard } from "@/components/scaffold/section-card";
import { Button } from "@/components/ui/button";
import { Trophy, X } from "lucide-react";

interface HardModeSuggestionProps {
  visible: boolean;
  onAccept: () => void;
  onDismiss: () => void;
}

export function HardModeSuggestion({ visible, onAccept, onDismiss }: HardModeSuggestionProps) {
  if (!visible) return null;

  return (
    <SectionCard 
      title="Ready for Hard Mode?" 
      className="border-primary/50 bg-primary/5 relative overflow-hidden"
    >
      <div className="absolute right-2 top-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-6 w-6 text-muted-foreground hover:text-foreground" 
          onClick={onDismiss}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Trophy className="h-6 w-6" />
        </div>
        
        <div className="flex-1 space-y-1">
          <p className="text-base text-muted-foreground leading-relaxed">
            You’re consistently performing well on medium questions. 
            Switching to harder scenarios can help prepare for real exam edge cases.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2 pt-2 sm:pt-0">
          <Button size="sm" onClick={onAccept} className="gap-2">
            Try Hard Mode
          </Button>
          <Button size="sm" variant="outline" onClick={onDismiss}>
            Keep current mix
          </Button>
        </div>
      </div>
    </SectionCard>
  );
}
