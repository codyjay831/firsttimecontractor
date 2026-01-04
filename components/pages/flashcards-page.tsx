import { LensHeader } from "@/components/lens/lens-header";
import { SectionCard } from "@/components/scaffold/section-card";
import { ActionRow } from "@/components/scaffold/action-row";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";

export function FlashcardsPageContent() {
  return (
    <div className="flex flex-col gap-6">
      <LensHeader title="Flashcards" />

      <SectionCard title="Deck selection" description="Choose a topic to study.">
        <Select disabled>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All topics" />
          </SelectTrigger>
        </Select>
      </SectionCard>

      <div className="grid gap-6 md:grid-cols-2">
        <SectionCard title="Card front">
          <div className="flex min-h-[200px] items-center justify-center text-center p-6 bg-muted/30 rounded-md border border-dashed">
            <p className="text-lg font-medium italic text-muted-foreground">
              Definition or question will appear here.
            </p>
          </div>
        </SectionCard>

        <SectionCard title="Card back">
          <div className="flex min-h-[200px] items-center justify-center text-center p-6 bg-primary/5 rounded-md border border-dashed">
            <p className="text-sm text-muted-foreground">
              Flip the card to see the answer or explanation.
            </p>
          </div>
        </SectionCard>
      </div>

      <ActionRow>
        <div className="flex w-full flex-wrap gap-3 justify-end">
          <Button variant="outline" disabled className="flex-1 sm:flex-none">
            Flip card
          </Button>
          <Button variant="secondary" disabled className="flex-1 sm:flex-none">
            I don't know this
          </Button>
          <Button disabled className="flex-1 sm:flex-none">
            I know this
          </Button>
        </div>
      </ActionRow>

      <SectionCard title="Up next">
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between rounded-md border p-3 opacity-50">
              <span className="text-sm truncate">Future card topic placeholder {i}</span>
              <div className="h-2 w-2 rounded-full bg-muted-foreground" />
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

