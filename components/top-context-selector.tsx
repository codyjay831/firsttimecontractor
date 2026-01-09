"use client";

import { useTopContext } from "@/lib/top-context/use-top-context";
import { STATES, LICENSE_TYPES, TRADES } from "@/lib/top-context/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function TopContextSelector() {
  const { state, licenseType, trade, setState, setLicenseType, setTrade } = useTopContext();

  const handleStateChange = (v: string) => {
    const newValue = v === "none" ? null : v;
    if (process.env.NODE_ENV === "development") {
      console.log("[TopContextSelector] setState:", { from: state, to: newValue });
    }
    setState(newValue);
  };

  const handleLicenseChange = (v: string) => {
    const newValue = v === "none" ? null : v;
    if (process.env.NODE_ENV === "development") {
      console.log("[TopContextSelector] setLicenseType:", { from: licenseType, to: newValue });
    }
    setLicenseType(newValue);
  };

  const handleTradeChange = (v: string) => {
    const newValue = v === "none" ? null : v;
    if (process.env.NODE_ENV === "development") {
      console.log("[TopContextSelector] setTrade:", { from: trade, to: newValue });
    }
    setTrade(newValue);
  };

  return (
    <div className="flex items-center gap-2">
      <Select value={state || "none"} onValueChange={handleStateChange}>
        <SelectTrigger className="h-8 w-[130px]">
          <SelectValue placeholder="State" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">No State</SelectItem>
          {STATES.map((s) => (
            <SelectItem key={s.value} value={s.value}>
              {s.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={licenseType || "none"} onValueChange={handleLicenseChange}>
        <SelectTrigger className="h-8 w-[180px]">
          <SelectValue placeholder="License Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">No License</SelectItem>
          {LICENSE_TYPES.map((lt) => (
            <SelectItem key={lt.value} value={lt.value}>
              {lt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={trade || "none"} onValueChange={handleTradeChange}>
        <SelectTrigger className="h-8 w-[150px]">
          <SelectValue placeholder="Trade" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">No Trade</SelectItem>
          {TRADES.map((t) => (
            <SelectItem key={t.value} value={t.value}>
              {t.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

