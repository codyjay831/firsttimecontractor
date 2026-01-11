import Link from "next/link";
import { Button } from "@/components/ui/button";

/**
 * TEMPORARY LANDING PAGE
 * This is a simple entry gate for the under-construction phase.
 * Can be removed once the full marketing site or app home is ready.
 */
export default function LandingPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center p-6 text-center bg-background">
      <div className="flex flex-col gap-8 md:gap-12 max-w-4xl">
        <div className="flex flex-col gap-2">
          <h1 className="text-5xl font-black tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl uppercase">
            Under Construction
          </h1>
          {/* Manual update date - update this when content changes */}
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground/80 uppercase tracking-widest font-semibold">
            Last updated: 1-11-2026
          </p>
        </div>
        
        <p className="text-xl text-muted-foreground md:text-2xl font-medium">
          Early access preview
        </p>

        <div className="flex justify-center mt-4">
          <Button asChild className="h-20 px-12 text-2xl font-bold rounded-full shadow-2xl hover:scale-105 transition-transform">
            <Link href="/app">
              ENTER →
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
