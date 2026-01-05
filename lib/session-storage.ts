const STORAGE_VERSION = "v1";

/**
 * Safely retrieves an item from sessionStorage with versioning.
 */
export function getSessionItem<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;

  try {
    const item = window.sessionStorage.getItem(`${STORAGE_VERSION}:${key}`);
    if (!item) return defaultValue;

    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Error reading sessionStorage key "${key}":`, error);
    return defaultValue;
  }
}

/**
 * Safely sets an item in sessionStorage with versioning.
 */
export function setSessionItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;

  try {
    window.sessionStorage.setItem(`${STORAGE_VERSION}:${key}`, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting sessionStorage key "${key}":`, error);
  }
}

/**
 * Safely removes an item from sessionStorage with versioning.
 */
export function removeSessionItem(key: string): void {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(`${STORAGE_VERSION}:${key}`);
}

/**
 * Clears all versioned items from sessionStorage.
 */
export function clearVersionedSessionStorage(): void {
  if (typeof window === "undefined") return;

  const keysToRemove: string[] = [];
  for (let i = 0; i < window.sessionStorage.length; i++) {
    const key = window.sessionStorage.key(i);
    if (key?.startsWith(`${STORAGE_VERSION}:`)) {
      keysToRemove.push(key);
    }
  }

  keysToRemove.forEach((key) => window.sessionStorage.removeItem(key));
}

