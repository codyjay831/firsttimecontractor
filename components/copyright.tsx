import { cn } from "@/lib/utils";

interface CopyrightProps {
  className?: string;
}

export function Copyright({ className }: CopyrightProps) {
  return (
    <footer className={cn("text-center text-sm text-muted-foreground", className)}>
      <div className="max-w-2xl mx-auto space-y-1">
        <p>© 2026 FirstTimeContractor.com</p>
        <p className="whitespace-pre-line md:whitespace-normal">
          All questions, explanations, and study materials on this site{" "}
          <br className="md:hidden" />
          are original works created by FirstTimeContractor.
        </p>
        <p>Unauthorized commercial reuse is prohibited.</p>
      </div>
    </footer>
  );
}
