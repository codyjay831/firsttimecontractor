"use client";

import { useState, useEffect } from "react";
import { LensHeader } from "@/components/lens/lens-header";
import { LensPrompt } from "@/components/lens/lens-prompt";
import { FlashcardsSession } from "@/components/flashcards/flashcards-session";
import { getFlashcardDecksActive, loadPack } from "@/lib/content/load-packs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function FlashcardsPageContent() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    window.requestAnimationFrame(() => {
      setMounted(true);
    });
  }, []);

  // Use the default "core" pack for SSR to match what getActivePackId() returns on server
  const decks = mounted ? getFlashcardDecksActive() : loadPack("core").flashcardDecks;
  const [selectedDeckId, setSelectedDeckId] = useState<string | undefined>(undefined);

  // Sync selectedDeckId once mounted
  useEffect(() => {
    if (mounted && !selectedDeckId) {
      window.requestAnimationFrame(() => {
        setSelectedDeckId(decks[0]?.id);
      });
    }
  }, [mounted, decks, selectedDeckId]);

  const selectedDeck = decks.find((d) => d.id === (selectedDeckId || decks[0]?.id)) || decks[0];

  if (!mounted) {
    // Return a skeleton or null to avoid mismatching content during hydration
    // But since we want to avoid ANY mismatch, returning the server-side version 
    // is also fine if it's consistent.
    // However, the cleanest way to fix hydration errors is to render null or a skeleton until mounted.
    // But for SEO/Initial load, we might want to render the "core" version.
    // The issue is FlashcardsSession also uses state and might have its own issues.
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <LensHeader title="Flashcards" />
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">Deck:</span>
          <Select value={selectedDeckId || decks[0]?.id} onValueChange={setSelectedDeckId}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select a deck" />
            </SelectTrigger>
            <SelectContent>
              {decks.map((deck) => (
                <SelectItem key={deck.id} value={deck.id}>
                  {deck.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <LensPrompt />
      {selectedDeck && (
        <FlashcardsSession key={selectedDeck.id} deck={selectedDeck} />
      )}
    </div>
  );
}
