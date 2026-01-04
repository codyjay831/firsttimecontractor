import { LensHeader } from "@/components/lens/lens-header";

export function ReviewPageContent() {
  return (
    <div className="flex flex-col gap-4">
      <LensHeader title="Review mistakes" />
      <div className="rounded-lg border border-border bg-card p-6">
        <p className="text-muted-foreground">
          🚧 Under construction — Mistake review coming soon.
        </p>
      </div>
    </div>
  );
}

