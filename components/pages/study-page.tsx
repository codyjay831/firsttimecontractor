"use client";

import Link from "next/link";
import { BookOpen, ClipboardCheck, Layers, RotateCcw } from "lucide-react";
import { LensHeader } from "@/components/lens/lens-header";
import { SectionCard } from "@/components/scaffold/section-card";
import { Button } from "@/components/ui/button";
import { useLens } from "@/lib/lens/use-lens";
import { buildLensHref } from "@/lib/lens/href";

export function StudyPageContent() {
  const lens = useLens();

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

