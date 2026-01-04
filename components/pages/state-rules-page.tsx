import { LensHeader } from "@/components/lens/lens-header";

export function StateRulesPageContent() {
  return (
    <div className="flex flex-col gap-4">
      <LensHeader title="State rules" />
      <div className="rounded-lg border border-border bg-card p-6">
        <p className="text-muted-foreground">
          🚧 Under construction — State rules reference coming soon.
        </p>
      </div>
    </div>
  );
}

