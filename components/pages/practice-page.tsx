import { LensHeader } from "@/components/lens/lens-header";
import { PracticeSession } from "@/components/practice/practice-session";

export function PracticePageContent() {
  return (
    <div className="flex flex-col gap-6">
      <LensHeader title="Practice" />
      <PracticeSession />
    </div>
  );
}

