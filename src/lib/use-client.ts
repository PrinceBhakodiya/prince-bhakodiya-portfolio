import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/** Whether a media query matches; always false during server render. */
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false
  );
}

/**
 * A string computed from the clock, refreshed every `intervalMs`.
 * Returns null during server render so the markup never mismatches.
 */
export function useClock(compute: () => string, intervalMs = 15_000) {
  return useSyncExternalStore(
    intervalMs > 0
      ? (onChange) => {
          const id = setInterval(onChange, intervalMs);
          return () => clearInterval(id);
        }
      : noopSubscribe,
    compute,
    () => null
  );
}
