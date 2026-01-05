import { LensHeader } from "@/components/lens/lens-header";
import { FlashcardsSession } from "@/components/flashcards/flashcards-session";

export function FlashcardsPageContent() {
  return (
    <div className="flex flex-col gap-6">
      <LensHeader title="Flashcards" />
      <FlashcardsSession />
    </div>
  );
}

