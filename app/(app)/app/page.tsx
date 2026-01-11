import { LensHeader } from "@/components/lens/lens-header";

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <LensHeader title="Welcome" />
      <p className="text-muted-foreground">
        Select a study mode from the navigation to get started.
      </p>
    </div>
  );
}
