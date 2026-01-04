"use client";

import { useParams } from "next/navigation";
import { useTopContext } from "../top-context/use-top-context";
import { resolveLens } from "./resolver";
import { ResolvedLens, LensParams } from "./types";

export function useLens(): ResolvedLens {
  const params = useParams() as LensParams;
  const store = useTopContext();

  return resolveLens(params, store);
}

