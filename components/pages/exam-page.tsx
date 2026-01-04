import { LensHeader } from "@/components/lens/lens-header";

export function ExamPageContent() {
  return (
    <div className="flex flex-col gap-4">
      <LensHeader title="Exam simulation" />
      <div className="rounded-lg border border-border bg-card p-6">
        <p className="text-muted-foreground">
          🚧 Under construction — Exam simulation coming soon.
        </p>
      </div>
    </div>
  );
}

