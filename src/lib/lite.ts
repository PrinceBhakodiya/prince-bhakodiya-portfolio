import { useSyncExternalStore } from "react";

/** Whether the page runs in lite mode (phones, low-end machines, reduced motion). See layout.tsx. */
export function isLite() {
  return typeof document !== "undefined" && document.documentElement.classList.contains("lite");
}

const noopSubscribe = () => () => {};

/** isLite() as a hook; false during server render. */
export function useLite() {
  return useSyncExternalStore(noopSubscribe, isLite, () => false);
}
