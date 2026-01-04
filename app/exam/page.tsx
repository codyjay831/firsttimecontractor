import { ContextReadout } from "@/components/context-readout";

export default function ExamPage() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold tracking-tight">Exam simulation</h1>
      <ContextReadout />
      <div className="rounded-lg border border-border bg-card p-6">
        <p className="text-muted-foreground">
          🚧 Under construction — Exam simulation coming soon.
        </p>
      </div>
    </div>
  );
}
