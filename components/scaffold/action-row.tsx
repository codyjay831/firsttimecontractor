import { ReactNode } from "react";

interface ActionRowProps {
  children: ReactNode;
}

export function ActionRow({ children }: ActionRowProps) {
  return (
    <div className="flex items-center justify-end gap-4 py-4">
      {children}
    </div>
  );
}

