"use client";

import { useState, useEffect } from "react";
import { Sparkles, ChevronDown, ChevronUp, Loader2, Info, MessageSquare, HelpCircle, Lightbulb } from "lucide-react";
import { getExplanation, ExplanationDepth } from "@/lib/ai/explain";
import { PracticeQuestion } from "@/lib/practice/types";
import { cn } from "@/lib/utils";
import { useTutor } from "@/lib/ai/tutor-context";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface AIAssistPanelProps {
  question: PracticeQuestion;
  userChoiceId: string | null;
}

interface Message {
  role: "assistant" | "user";
  content: string;
}

export function AIAssistPanel({ question, userChoiceId }: AIAssistPanelProps) {
  const { tutorEnabled, setTutorEnabled, depth, setDepth } = useTutor();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [lastDepth, setLastDepth] = useState<ExplanationDepth | null>(null);

  // Clear messages if question changes or depth changes while tutor is enabled
  useEffect(() => {
    setMessages([]);
    setLastDepth(null);
  }, [question.id]);

  const handleExplain = async (overrideDepth?: ExplanationDepth) => {
    const targetDepth = overrideDepth || depth;
    
    setLoading(true);
    setIsOpen(true);
    try {
      const result = await getExplanation({ 
        question, 
        userChoiceId, 
        depth: targetDepth 
      });
      setMessages([{ role: "assistant", content: result }]);
      setLastDepth(targetDepth);
    } catch (error) {
      console.error("AI Explain Error:", error);
      setMessages([{ role: "assistant", content: "Sorry, I couldn't generate an explanation at this time." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleFollowUp = async (query: string) => {
    if (loading) return;

    const userMessage: Message = { role: "user", content: query };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      const result = await getExplanation({
        question,
        userChoiceId,
        depth,
        followUpQuery: query,
        history: messages
      });
      setMessages(prev => [...prev, { role: "assistant", content: result }]);
    } catch (error) {
      console.error("AI Follow-up Error:", error);
      setMessages(prev => [...prev, { role: "assistant", content: "I'm sorry, I encountered an error processing your follow-up." }]);
    } finally {
      setLoading(false);
    }
  };

  const togglePanel = () => {
    if (!isOpen && messages.length === 0) {
      handleExplain();
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden bg-primary/5 border-primary/20">
      <div className="flex items-center justify-between p-3 border-b border-primary/10">
        <button
          onClick={togglePanel}
          disabled={loading && messages.length === 0}
          className="flex items-center gap-2 text-primary font-semibold text-sm hover:opacity-80 transition-opacity"
        >
          <Sparkles className="w-4 h-4" />
          <span>AI Tutor</span>
          {loading && messages.length === 0 ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : isOpen ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-medium text-muted-foreground uppercase">Tutor Mode</span>
            <button
              onClick={() => setTutorEnabled(!tutorEnabled)}
              className={cn(
                "w-8 h-4 rounded-full transition-colors relative",
                tutorEnabled ? "bg-primary" : "bg-muted"
              )}
            >
              <div className={cn(
                "absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all",
                tutorEnabled ? "left-4.5" : "left-0.5"
              )} />
            </button>
          </div>

          {tutorEnabled && (
            <Select value={depth} onValueChange={(v) => setDepth(v as ExplanationDepth)}>
              <SelectTrigger size="sm" className="h-7 text-[10px] w-24">
                <SelectValue placeholder="Depth" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="brief">Brief</SelectItem>
                <SelectItem value="standard">Standard</SelectItem>
                <SelectItem value="deep">Deep</SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="p-4 space-y-4 animate-in fade-in slide-in-from-top-1 duration-200">
          <div className="flex items-center gap-2 p-2 rounded bg-amber-50 dark:bg-amber-950/20 text-[10px] text-amber-800 dark:text-amber-300 border border-amber-200/50 dark:border-amber-800/50">
            <Info className="w-3 h-3 flex-shrink-0" />
            <p>AI-generated content may be inaccurate. Use for educational guidance only.</p>
          </div>

          <div className="space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={cn(
                "flex flex-col gap-1",
                msg.role === "user" ? "items-end" : "items-start"
              )}>
                {msg.role === "assistant" && (
                  <span className="text-[10px] font-bold text-primary uppercase tracking-tighter">AI Assistant</span>
                )}
                <div className={cn(
                  "rounded-lg p-3 text-sm leading-relaxed",
                  msg.role === "user" 
                    ? "bg-primary text-primary-foreground ml-8" 
                    : "bg-background border border-primary/10 mr-8"
                )}>
                  {msg.role === "assistant" ? (
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      {msg.content.split("\n").map((line, j) => (
                        <p key={j} className={cn(
                          line.startsWith("###") && "text-base font-bold mt-2 mb-1",
                          line.startsWith("**") && "font-semibold"
                        )}>
                          {line.replace(/^###\s+/, "").replace(/^\*\*(.*?)\*\*/g, "$1")}
                        </p>
                      ))}
                    </div>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}
            
            {loading && messages.length > 0 && (
              <div className="flex justify-start">
                <div className="bg-background border border-primary/10 rounded-lg p-3 flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
          </div>

          {tutorEnabled && messages.length > 0 && !loading && (
            <div className="flex flex-wrap gap-2 pt-2 border-t border-primary/5">
              <Button 
                variant="outline" 
                size="sm" 
                className="h-7 text-[10px] gap-1.5"
                onClick={() => handleFollowUp("Can you explain why this is the case?")}
              >
                <HelpCircle className="w-3 h-3" />
                Why?
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-7 text-[10px] gap-1.5"
                onClick={() => handleFollowUp("Give me an example of this in practice.")}
              >
                <Lightbulb className="w-3 h-3" />
                Example?
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="h-7 text-[10px] gap-1.5"
                onClick={() => handleFollowUp("How does this apply to other trades?")}
              >
                <MessageSquare className="w-3 h-3" />
                Ask more
              </Button>
            </div>
          )}

          {!loading && lastDepth !== null && lastDepth !== depth && (
            <div className="pt-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-[10px] text-primary h-6 px-2"
                onClick={() => handleExplain()}
              >
                Regenerate with {depth} depth
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

