import { ReactNode } from "react";

interface ActionRowProps {
  children: ReactNode;
}

export function ActionRow({ children }: ActionRowProps) {
  return (
    <div className="flex items-center justify-end gap-3 py-2">
      {children}
    </div>
  );
}

