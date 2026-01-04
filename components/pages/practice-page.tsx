import { LensHeader } from "@/components/lens/lens-header";

export function PracticePageContent() {
  return (
    <div className="flex flex-col gap-4">
      <LensHeader title="Practice" />
      <div className="rounded-lg border border-border bg-card p-6">
        <p className="text-muted-foreground">
          🚧 Under construction — Practice mode coming soon.
        </p>
      </div>
    </div>
  );
}

