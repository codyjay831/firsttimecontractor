"use client";

import { useState, useMemo } from "react";
import { FlashcardDeck } from "@/lib/content/pack-types";
import { SectionCard } from "@/components/scaffold/section-card";
import { ActionRow } from "@/components/scaffold/action-row";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  CheckCircle2,
  Eye,
  EyeOff
} from "lucide-react";

type FlashcardRecord = {
  confidence: "know" | "unsure" | "dont_know" | null;
  seen: boolean;
};

export function FlashcardsSession({ deck }: { deck: FlashcardDeck }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [recordsById, setRecordsById] = useState<Record<string, FlashcardRecord>>({});

  const cards = deck.cards;
  const currentCard = cards[currentIndex];
  
  const currentRecord = recordsById[currentCard.id] || {
    confidence: null,
    seen: false,
  };

  // Derived state
  const counts = useMemo(() => {
    const records = Object.values(recordsById);
    return {
      total: cards.length,
      seen: records.filter(r => r.seen).length,
      know: records.filter(r => r.confidence === "know").length,
      unsure: records.filter(r => r.confidence === "unsure").length,
      dontKnow: records.filter(r => r.confidence === "dont_know").length,
    };
  }, [recordsById, cards.length]);

  // Handlers
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!currentRecord.seen) {
      setRecordsById(prev => ({
        ...prev,
        [currentCard.id]: {
          ...currentRecord,
          seen: true
        }
      }));
    }
  };

  const handleConfidence = (confidence: "know" | "unsure" | "dont_know") => {
    setRecordsById(prev => ({
      ...prev,
      [currentCard.id]: {
        ...currentRecord,
        confidence,
        seen: true
      }
    }));

    if (currentIndex < cards.length - 1) {
      handleNext();
    } else {
      setIsFinished(true);
    }
  };

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    } else {
      setIsFinished(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setIsFlipped(false);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsFinished(false);
    setRecordsById({});
  };

  if (isFinished) {
    return (
      <div className="flex flex-col gap-6">
        <SectionCard title="Deck Complete">
          <div className="flex items-center gap-4 py-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <div>
              <p className="text-lg font-medium">Session Summary</p>
              <p className="text-sm text-muted-foreground">You&apos;ve gone through the deck. Here are your results:</p>
            </div>
          </div>
        </SectionCard>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SectionCard title="Total Cards">
            <div className="text-3xl font-bold">{counts.total}</div>
          </SectionCard>
          <SectionCard title="Know">
            <div className="text-3xl font-bold text-green-600">{counts.know}</div>
          </SectionCard>
          <SectionCard title="Unsure">
            <div className="text-3xl font-bold text-amber-500">{counts.unsure}</div>
          </SectionCard>
          <SectionCard title="Don't Know">
            <div className="text-3xl font-bold text-destructive">{counts.dontKnow}</div>
          </SectionCard>
        </div>

        <SectionCard title="Completion">
            <div className="text-3xl font-bold">
              {Math.round((counts.seen / counts.total) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {counts.seen} of {counts.total} cards seen
            </p>
        </SectionCard>

        <ActionRow>
          <Button onClick={handleRestart} variant="outline" className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Restart Deck
          </Button>
        </ActionRow>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <SectionCard 
        title={`Card ${currentIndex + 1} of ${cards.length}`}
      >
        <div className="flex items-center justify-between">
           <div className="flex gap-2">
            {currentCard.difficulty && (
              <Badge variant="outline" className="capitalize">
                {currentCard.difficulty}
              </Badge>
            )}
            {currentCard.category && (
               <Badge variant="secondary" className="capitalize">
               {currentCard.category}
             </Badge>
            )}
          </div>
          {currentRecord.confidence && (
            <Badge className={cn(
              "capitalize",
              currentRecord.confidence === "know" && "bg-green-600 hover:bg-green-600",
              currentRecord.confidence === "unsure" && "bg-amber-500 hover:bg-amber-500",
              currentRecord.confidence === "dont_know" && "bg-destructive hover:bg-destructive"
            )}>
              {currentRecord.confidence.replace("_", " ")}
            </Badge>
          )}
        </div>
        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-secondary">
          <div 
            className="h-full bg-primary transition-all duration-300" 
            style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
          />
        </div>
      </SectionCard>

      <div className="grid gap-6 md:grid-cols-2">
        <SectionCard title="Front">
          <div className="flex min-h-[240px] flex-col items-center justify-center text-center p-8 bg-muted/30 rounded-lg border">
            <p className="text-xl font-semibold leading-relaxed">
              {currentCard.front}
            </p>
          </div>
        </SectionCard>

        <SectionCard title="Back">
          <div className={cn(
            "flex min-h-[240px] flex-col items-center justify-center text-center p-8 rounded-lg border transition-all duration-300",
            isFlipped ? "bg-primary/5 border-primary/20" : "bg-muted/10 border-dashed"
          )}>
            {isFlipped ? (
              <p className="text-lg leading-relaxed text-foreground">
                {currentCard.back}
              </p>
            ) : (
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <EyeOff className="h-8 w-8 opacity-20" />
                <p className="text-sm italic">Flip to reveal the answer</p>
              </div>
            )}
          </div>
        </SectionCard>
      </div>

      <ActionRow>
        <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Prev
            </Button>
            <Button
              variant="ghost"
              onClick={handleNext}
              className="gap-2"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-1 flex-wrap gap-2 justify-end">
            <Button 
              variant="outline" 
              onClick={handleFlip}
              className="gap-2 min-w-[100px]"
            >
              {isFlipped ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {isFlipped ? "Hide" : "Flip"}
            </Button>

            <div className="flex gap-2">
               <Button
                variant="secondary"
                disabled={!isFlipped}
                onClick={() => handleConfidence("dont_know")}
                className="bg-destructive/10 text-destructive hover:bg-destructive/20 border-destructive/20"
              >
                Don&apos;t know
              </Button>
              <Button
                variant="secondary"
                disabled={!isFlipped}
                onClick={() => handleConfidence("unsure")}
                className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 border-amber-500/20"
              >
                Unsure
              </Button>
              <Button
                variant="secondary"
                disabled={!isFlipped}
                onClick={() => handleConfidence("know")}
                className="bg-green-600/10 text-green-700 hover:bg-green-600/20 border-green-600/20"
              >
                Know
              </Button>
            </div>
          </div>
        </div>
      </ActionRow>
    </div>
  );
}

