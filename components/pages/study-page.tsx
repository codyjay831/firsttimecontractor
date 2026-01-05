"use client";

import Link from "next/link";
import { BookOpen, ClipboardCheck, Layers, RotateCcw, PlayCircle, History } from "lucide-react";
import { LensHeader } from "@/components/lens/lens-header";
import { SectionCard } from "@/components/scaffold/section-card";
import { Button } from "@/components/ui/button";
import { useLens } from "@/lib/lens/use-lens";
import { buildLensHref } from "@/lib/lens/href";
import { useReview } from "@/components/review/use-review";
import { usePracticeSeed } from "@/components/practice/use-practice-seed";

export function StudyPageContent() {
  const lens = useLens();
  const { payload } = useReview();
  const { seed } = usePracticeSeed();

  const hasReview = (payload?.items?.length ?? 0) > 0;
  const hasSeed = !!seed;

  const studyModes = [
    {
      title: "Practice",
      description: "Study questions at your own pace with immediate feedback.",
      href: "/practice",
      icon: BookOpen,
      buttonText: "Start Practice",
    },
    {
      title: "Exam simulation",
      description: "Timed simulation of the actual exam environment.",
      href: "/exam",
      icon: ClipboardCheck,
      buttonText: "Take Exam",
    },
    {
      title: "Flashcards",
      description: "Quickly review key concepts and terminology.",
      href: "/flashcards",
      icon: Layers,
      buttonText: "Open Flashcards",
    },
    {
      title: "Review mistakes",
      description: "Focus on questions you've missed in past sessions.",
      href: "/review",
      icon: RotateCcw,
      buttonText: "Review Mistakes",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <LensHeader title="Study" />

      {(hasReview || hasSeed) && (
        <div className="flex flex-col gap-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground px-1">
            Continue Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hasReview && (
              <SectionCard 
                title="Continue Review" 
                description={`You have ${payload?.items.length} items waiting for review from your last session.`}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-center p-8 bg-primary/5 rounded-lg">
                    <History className="w-12 h-12 text-primary opacity-80" />
                  </div>
                  <Button asChild className="w-full" variant="default">
                    <Link href={buildLensHref({ base: "/review", lens })}>
                      Resume Review
                    </Link>
                  </Button>
                </div>
              </SectionCard>
            )}
            {hasSeed && (
              <SectionCard 
                title="Start Seeded Practice" 
                description={`A custom practice session is ready with ${seed.questions.length} questions.`}
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-center p-8 bg-primary/5 rounded-lg">
                    <PlayCircle className="w-12 h-12 text-primary opacity-80" />
                  </div>
                  <Button asChild className="w-full" variant="default">
                    <Link href={buildLensHref({ base: "/practice", lens })}>
                      Start Practice
                    </Link>
                  </Button>
                </div>
              </SectionCard>
            )}
          </div>
          <div className="h-2" /> {/* Spacer */}
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground px-1">
            All Study Modes
          </h2>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {studyModes.map((mode) => (
          <SectionCard 
            key={mode.href} 
            title={mode.title} 
            description={mode.description}
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-center p-8 bg-muted/50 rounded-lg">
                <mode.icon className="w-12 h-12 text-primary opacity-80" />
              </div>
              <Button asChild className="w-full">
                <Link href={buildLensHref({ base: mode.href, lens })}>
                  {mode.buttonText}
                </Link>
              </Button>
            </div>
          </SectionCard>
        ))}
      </div>
    </div>
  );
}

