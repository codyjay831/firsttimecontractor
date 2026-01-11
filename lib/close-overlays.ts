"use client";

type CloseHandler = () => void;

const handlers = new Set<CloseHandler>();

/**
 * Registers a callback to be executed when overlays should be closed.
 * Returns an unregister function.
 */
export function registerCloseHandler(handler: CloseHandler) {
  handlers.add(handler);
  return () => {
    handlers.delete(handler);
  };
}

/**
 * Executes all registered close handlers.
 * Call this before navigation to ensure overlays are cleaned up.
 */
export function requestCloseOverlays() {
  if (typeof window === "undefined") return;

  if (process.env.NODE_ENV === "development") {
    console.log("[close-overlays] Closing all registered overlays. Body lock state:", {
      scrollLocked: document.body.dataset.scrollLocked,
      pointerEvents: document.body.style.pointerEvents,
    });
  }
  
  handlers.forEach((handler) => {
    try {
      handler();
    } catch (e) {
      console.error("[close-overlays] Failed to execute close handler", e);
    }
  });
}
