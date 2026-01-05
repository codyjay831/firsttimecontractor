"use client";

import { useState } from "react";
import { LensHeader } from "@/components/lens/lens-header";
import { FlashcardsSession } from "@/components/flashcards/flashcards-session";
import { DECKS } from "@/lib/flashcards/decks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function FlashcardsPageContent() {
  const [selectedDeckId, setSelectedDeckId] = useState(DECKS[0].id);

  const selectedDeck = DECKS.find((d) => d.id === selectedDeckId) || DECKS[0];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <LensHeader title="Flashcards" />
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">Deck:</span>
          <Select value={selectedDeckId} onValueChange={setSelectedDeckId}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select a deck" />
            </SelectTrigger>
            <SelectContent>
              {DECKS.map((deck) => (
                <SelectItem key={deck.id} value={deck.id}>
                  {deck.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <FlashcardsSession key={selectedDeckId} deck={selectedDeck} />
    </div>
  );
}

