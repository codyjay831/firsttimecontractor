import { LensHeader } from "@/components/lens/lens-header";
import { SectionCard } from "@/components/scaffold/section-card";
import { EmptyState } from "@/components/scaffold/empty-state";
import { CheckCircle2, XCircle, Clock, BookOpen } from "lucide-react";

export function ReviewPageContent() {
  return (
    <div className="flex flex-col gap-6">
      <LensHeader title="Review mistakes" />

      <SectionCard title="Summary" description="Your performance overview.">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-lg border p-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              <span className="text-xs font-medium uppercase tracking-wider">Correct</span>
            </div>
            <div className="mt-1 text-2xl font-bold">0</div>
          </div>
          <div className="rounded-lg border p-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <XCircle className="h-4 w-4 text-destructive" />
              <span className="text-xs font-medium uppercase tracking-wider">Incorrect</span>
            </div>
            <div className="mt-1 text-2xl font-bold">0</div>
          </div>
          <div className="rounded-lg border p-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4 text-blue-500" />
              <span className="text-xs font-medium uppercase tracking-wider">Time</span>
            </div>
            <div className="mt-1 text-2xl font-bold">--:--</div>
          </div>
          <div className="rounded-lg border p-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <BookOpen className="h-4 w-4 text-purple-500" />
              <span className="text-xs font-medium uppercase tracking-wider">Accuracy</span>
            </div>
            <div className="mt-1 text-2xl font-bold">0%</div>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Missed topics">
        <EmptyState 
          icon={XCircle}
          title="No missed topics yet"
          description="Complete a practice session or exam simulation to see the topics you need to work on."
        />
      </SectionCard>

      <SectionCard title="Recommended next steps">
        <div className="space-y-3">
          <div className="flex items-start gap-3 rounded-md border p-3 opacity-70">
            <div className="mt-0.5 rounded-full bg-primary/10 p-1">
              <BookOpen className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Start a practice session</p>
              <p className="text-xs text-muted-foreground">Focus on your weakest areas to improve your score.</p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-md border p-3 opacity-70">
            <div className="mt-0.5 rounded-full bg-primary/10 p-1">
              <Clock className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Take a mock exam</p>
              <p className="text-xs text-muted-foreground">Simulate the real testing environment under time pressure.</p>
            </div>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}

