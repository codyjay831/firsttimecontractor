import { LensHeader } from "@/components/lens/lens-header";
import { SectionCard } from "@/components/scaffold/section-card";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";

export function PracticePageContent() {
  return (
    <div className="flex flex-col gap-6">
      <LensHeader title="Practice" />
      
      <SectionCard title="Session setup" description="Customize your practice session.">
        <div className="flex flex-wrap gap-4">
          <div className="space-y-2">
            <span className="text-sm font-medium">Question count</span>
            <Select disabled>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="20 questions" />
              </SelectTrigger>
            </Select>
          </div>
          <div className="space-y-2">
            <span className="text-sm font-medium">Timer</span>
            <Select disabled>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="No timer" />
              </SelectTrigger>
            </Select>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Current question">
        <div className="space-y-4">
          <p className="text-sm leading-relaxed">
            The question text will appear here. This is a placeholder for the actual question content that will be loaded from the question pool.
          </p>
        </div>
      </SectionCard>

      <SectionCard title="Answer choices">
        <div className="grid gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3 rounded-md border p-3 hover:bg-accent/50 cursor-not-allowed opacity-70">
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium">
                {String.fromCharCode(64 + i)}
              </div>
              <span className="text-sm">Placeholder for answer choice {i}</span>
            </div>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Explanation">
        <div className="rounded-md bg-muted p-4 text-sm text-muted-foreground italic">
          Select an answer to view the detailed explanation for this question.
        </div>
      </SectionCard>

      <SectionCard title="Progress">
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>0 of 20 questions</span>
            <span>0% complete</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div className="h-full w-0 bg-primary" />
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

