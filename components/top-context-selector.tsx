"use client";

import { useState, useEffect } from "react";
import { useTopContext } from "@/lib/top-context/use-top-context";
import { 
  STATES, 
  LICENSE_TYPES, 
  TRADES,
  LICENSE_TYPES_BY_STATE,
  TRADES_BY_STATE
} from "@/lib/top-context/types";
import { registerCloseHandler } from "@/lib/close-overlays";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function TopContextSelector() {
  const { state, licenseType, trade, setState, setLicenseType, setTrade } = useTopContext();

  const [stateOpen, setStateOpen] = useState(false);
  const [licenseOpen, setLicenseOpen] = useState(false);
  const [tradeOpen, setTradeOpen] = useState(false);

  const selectedState = state?.toUpperCase() || "";
  const stateLicenseTypes = LICENSE_TYPES_BY_STATE[selectedState] ?? LICENSE_TYPES;
  const stateTrades = TRADES_BY_STATE[selectedState] ?? TRADES;

  // Register close handler to be called on navigation
  useEffect(() => {
    return registerCloseHandler(() => {
      setStateOpen(false);
      setLicenseOpen(false);
      setTradeOpen(false);
    });
  }, []);

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
      <Select 
        value={state || "none"} 
        onValueChange={handleStateChange}
        open={stateOpen}
        onOpenChange={setStateOpen}
      >
        <SelectTrigger className="h-8 w-[130px]">
          <SelectValue placeholder="State" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">No State</SelectItem>
          {STATES.map((s) => (
            <SelectItem key={s.id} value={s.id}>
              {s.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select 
        value={licenseType || "none"} 
        onValueChange={handleLicenseChange}
        open={licenseOpen}
        onOpenChange={setLicenseOpen}
      >
        <SelectTrigger className="h-8 w-[180px]">
          <SelectValue placeholder="License Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">No License</SelectItem>
          {stateLicenseTypes.map((lt) => (
            <SelectItem key={lt.id} value={lt.id}>
              {lt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select 
        value={trade || "none"} 
        onValueChange={handleTradeChange}
        open={tradeOpen}
        onOpenChange={setTradeOpen}
      >
        <SelectTrigger className="h-8 w-[150px]">
          <SelectValue placeholder="Trade" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">No Trade</SelectItem>
          {stateTrades.map((t) => (
            <SelectItem key={t.id} value={t.id}>
              {t.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

