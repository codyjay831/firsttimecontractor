import { TopContextState, DEFAULT_CONTEXT, STORAGE_KEY, STORAGE_VERSION, StoredContext } from "./types";

export function loadContext(): TopContextState {
  if (typeof window === "undefined") return DEFAULT_CONTEXT;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return DEFAULT_CONTEXT;

    const parsed = JSON.parse(stored) as StoredContext;
    
    // Simple version check
    if (parsed.version !== STORAGE_VERSION) {
      return DEFAULT_CONTEXT;
    }

    return {
      state: parsed.state,
      licenseType: parsed.licenseType,
      trade: parsed.trade,
    };
  } catch (error) {
    console.error("Failed to load context from localStorage:", error);
    return DEFAULT_CONTEXT;
  }
}

export function saveContext(context: TopContextState) {
  if (typeof window === "undefined") return;

  try {
    const data: StoredContext = {
      ...context,
      version: STORAGE_VERSION,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save context to localStorage:", error);
  }
}

