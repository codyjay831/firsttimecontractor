"use client";

import { useState } from "react";
import { Sparkles, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { getExplanation } from "@/lib/ai/explain";
import { PracticeQuestion } from "@/lib/practice/types";
import { cn } from "@/lib/utils";

interface AIAssistPanelProps {
  question: PracticeQuestion;
  userChoiceId: string | null;
}

export function AIAssistPanel({ question, userChoiceId }: AIAssistPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);

  const handleExplain = async () => {
    if (explanation) {
      setIsOpen(!isOpen);
      return;
    }

    setLoading(true);
    setIsOpen(true);
    try {
      const result = await getExplanation({ question, userChoiceId });
      setExplanation(result);
    } catch (error) {
      setExplanation("Sorry, I couldn't generate an explanation at this time.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden bg-primary/5 border-primary/20">
      <button
        onClick={handleExplain}
        disabled={loading}
        className="w-full flex items-center justify-between p-3 hover:bg-primary/10 transition-colors"
      >
        <div className="flex items-center gap-2 text-primary font-semibold text-sm">
          <Sparkles className="w-4 h-4" />
          <span>AI Assist (beta)</span>
        </div>
        <div className="flex items-center gap-2">
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin text-primary" />
          ) : isOpen ? (
            <ChevronUp className="w-4 h-4 text-primary" />
          ) : (
            <ChevronDown className="w-4 h-4 text-primary" />
          )}
          <span className="text-xs font-medium text-primary">
            {explanation ? (isOpen ? "Collapse" : "Show explanation") : "Explain this"}
          </span>
        </div>
      </button>

      {isOpen && (
        <div className="p-4 pt-0 text-sm leading-relaxed border-t border-primary/10 animate-in fade-in slide-in-from-top-1 duration-200">
          {loading ? (
            <div className="flex flex-col gap-2 py-4">
              <div className="h-4 w-3/4 bg-primary/10 rounded animate-pulse" />
              <div className="h-4 w-full bg-primary/10 rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-primary/10 rounded animate-pulse" />
            </div>
          ) : (
            <div className="prose prose-sm dark:prose-invert max-w-none pt-4">
              {explanation?.split("\n").map((line, i) => (
                <p key={i} className={cn(
                  line.startsWith("###") && "text-lg font-bold mt-4 mb-2",
                  line.startsWith("**") && "font-semibold"
                )}>
                  {line.replace(/^###\s+/, "").replace(/^\*\*(.*?)\*\*/g, "$1")}
                </p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

