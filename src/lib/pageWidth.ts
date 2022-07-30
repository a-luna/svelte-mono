import type { Writable } from "svelte/store";
import { writable } from "svelte/store";

function syncWidth(el: HTMLBodyElement): Writable<number> {
  return writable<number>(null, (set) => {
    if (!el) {
      return;
    }
    const ro = new ResizeObserver(() => el && set(el.offsetWidth));
    ro.observe(el);
    return () => ro.disconnect();
  });
}

const getPageWidth = (): Writable<number> => {
  if (typeof window !== "undefined") {
    const body = document.getElementsByTagName("body")[0];
    return body ? syncWidth(body) : null;
  }
};

export const pageWidth = getPageWidth();
