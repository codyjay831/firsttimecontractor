"use client";

import { useState } from "react";
import { LensHeader } from "@/components/lens/lens-header";
import { PracticeSession } from "@/components/practice/practice-session";
import { SAMPLE_PRACTICE_QUESTIONS } from "@/lib/practice/sample-questions";
import { PracticeQuestion } from "@/lib/practice/types";
import { Button } from "@/components/ui/button";
import { SectionCard } from "@/components/scaffold/section-card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Shuffle, Play, RotateCcw, BookOpen } from "lucide-react";
import { ActionRow } from "@/components/scaffold/action-row";
import { EmptyState } from "@/components/scaffold/empty-state";

function fisherYatesShuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function PracticePageContent() {
  const [isStarted, setIsStarted] = useState(false);
  const [count, setCount] = useState("10");
  const [shuffle, setShuffle] = useState(false);
  const [sessionQuestions, setSessionQuestions] = useState<PracticeQuestion[]>([]);
  const [sessionKey, setSessionKey] = useState(0);

  const handleStart = () => {
    let pool = [...SAMPLE_PRACTICE_QUESTIONS];
    if (shuffle) {
      pool = fisherYatesShuffle(pool);
    }
    const selected = pool.slice(0, parseInt(count));
    setSessionQuestions(selected);
    setIsStarted(true);
  };

  const handleNewSession = () => {
    setIsStarted(false);
    setSessionKey(prev => prev + 1);
  };

  return (
    <div className="flex flex-col gap-6">
      <LensHeader title="Practice" />
      
      {!isStarted ? (
        <div className="space-y-6">
          <SectionCard 
            title="Session Configuration" 
            description="Customize your practice session before starting."
          >
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end">
              <div className="space-y-2 flex-1">
                <div className="text-sm font-medium text-muted-foreground">Number of Questions</div>
                <Select value={count} onValueChange={setCount}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select count" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 Questions</SelectItem>
                    <SelectItem value="25">25 Questions</SelectItem>
                    <SelectItem value="50">50 Questions</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Question Order</div>
                <Button 
                  variant={shuffle ? "default" : "outline"} 
                  onClick={() => setShuffle(!shuffle)}
                  className="w-full gap-2 justify-start sm:justify-center"
                >
                  <Shuffle className="h-4 w-4" />
                  {shuffle ? "Shuffled" : "Sequential"}
                </Button>
              </div>
            </div>
          </SectionCard>

          <div className="flex flex-col items-center gap-6">
            <EmptyState
              icon={BookOpen}
              title="Ready to Practice?"
              description="Select your session options above to begin."
            />
            <Button size="lg" onClick={handleStart} className="gap-2">
              <Play className="h-4 w-4" />
              Start Session
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <ActionRow>
            <Button variant="ghost" size="sm" onClick={handleNewSession} className="gap-2 text-muted-foreground">
              <RotateCcw className="h-3.5 w-3.5" />
              Change Configuration
            </Button>
          </ActionRow>
          <PracticeSession 
            key={`${sessionKey}-${sessionQuestions.length}`} 
            questions={sessionQuestions} 
          />
        </div>
      )}
    </div>
  );
}

