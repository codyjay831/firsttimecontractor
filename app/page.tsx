import { LensReadout } from "@/components/lens-readout";

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold tracking-tight">Welcome</h1>
      <LensReadout />
      <p className="text-muted-foreground">
        Select a study mode from the navigation to get started.
      </p>
    </div>
  );
}
