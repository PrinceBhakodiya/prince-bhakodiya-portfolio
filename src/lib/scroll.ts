import type Lenis from "lenis";

let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

/** Smooth-scrolls to a section id, through Lenis when it is running. */
export function scrollToId(id: string, offset = -80) {
  const el = document.getElementById(id);
  if (!el) return;
  if (instance) {
    instance.scrollTo(el, { offset });
  } else {
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: "smooth" });
  }
}
