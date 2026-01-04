import { LensHeader } from "@/components/lens/lens-header";
import { SectionCard } from "@/components/scaffold/section-card";
import { ActionRow } from "@/components/scaffold/action-row";
import { Button } from "@/components/ui/button";
import { FlagIcon } from "lucide-react";

export function ExamPageContent() {
  return (
    <div className="flex flex-col gap-6">
      <LensHeader title="Exam simulation" />

      <SectionCard title="Exam instructions">
        <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
          <li>This simulation mimics the actual exam environment.</li>
          <li>You cannot pause the timer once the exam begins.</li>
          <li>You can flag questions to review them before final submission.</li>
          <li>Your results will be available immediately after completion.</li>
        </ul>
      </SectionCard>

      <SectionCard title="Timer">
        <div className="text-3xl font-mono font-bold tracking-tighter">
          02:00:00
        </div>
        <p className="text-xs text-muted-foreground">Time remaining</p>
      </SectionCard>

      <SectionCard title="Question">
        <div className="space-y-4">
          <p className="text-sm leading-relaxed">
            The exam question content will be displayed here in a formal format. Multiple choice options will follow standard exam protocols.
          </p>
          <div className="grid gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-3 rounded-md border p-3 cursor-not-allowed opacity-70">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium">
                  {String.fromCharCode(64 + i)}
                </div>
                <span className="text-sm">Exam option {i} placeholder</span>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>

      <ActionRow>
        <Button variant="outline" disabled size="sm">
          <FlagIcon className="mr-2 h-4 w-4" />
          Flag for review
        </Button>
        <Button disabled size="sm">
          Next question
        </Button>
      </ActionRow>

      <SectionCard title="Progress">
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Question 1 of 100</span>
            <span>1% complete</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div className="h-full w-[1%] bg-primary" />
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

