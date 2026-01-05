import { LensHeader } from "@/components/lens/lens-header";
import { ExamSession } from "@/components/exam/exam-session";

export function ExamPageContent() {
  return (
    <div className="flex flex-col gap-6">
      <LensHeader title="Exam simulation" />
      <ExamSession />
    </div>
  );
}

