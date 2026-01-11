import { ReactNode } from "react";

interface SectionCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  headerAction?: ReactNode;
}

export function SectionCard({ title, description, children, className, headerAction }: SectionCardProps) {
  return (
    <div className={`rounded-lg border border-border bg-card p-6 shadow-sm ${className || ""}`}>
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold leading-none tracking-tight">{title}</h3>
          {description && (
            <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        {headerAction && (
          <div className="shrink-0">
            {headerAction}
          </div>
        )}
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}

