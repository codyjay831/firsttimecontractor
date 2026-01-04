import { LensReadout } from "@/components/lens-readout";

export function StateRulesPageContent() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold tracking-tight">State rules</h1>
      <LensReadout />
      <div className="rounded-lg border border-border bg-card p-6">
        <p className="text-muted-foreground">
          🚧 Under construction — State rules reference coming soon.
        </p>
      </div>
    </div>
  );
}

