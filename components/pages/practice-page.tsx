import { LensReadout } from "@/components/lens-readout";

export function PracticePageContent() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold tracking-tight">Practice</h1>
      <LensReadout />
      <div className="rounded-lg border border-border bg-card p-6">
        <p className="text-muted-foreground">
          🚧 Under construction — Practice mode coming soon.
        </p>
      </div>
    </div>
  );
}

