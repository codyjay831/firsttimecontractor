import { LensHeader } from "@/components/lens/lens-header";

export function FlashcardsPageContent() {
  return (
    <div className="flex flex-col gap-4">
      <LensHeader title="Flashcards" />
      <div className="rounded-lg border border-border bg-card p-6">
        <p className="text-muted-foreground">
          🚧 Under construction — Flashcards coming soon.
        </p>
      </div>
    </div>
  );
}

