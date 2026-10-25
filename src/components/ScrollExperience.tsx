"use client";

import Lenis from "lenis";
import { useEffect } from "react";

type RevealElement = HTMLElement | SVGElement;
type RevealState = { progress: number; verticalOffset: number; stagger: number };
const selector = "[data-scroll-reveal]";

export default function ScrollExperience() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let dispose: (() => void) | undefined;

    const configure = () => {
      dispose?.();
      dispose = undefined;
      if (preference.matches) return;

      const pending = new Map<RevealElement, RevealState>();
      const completed = new WeakSet<RevealElement>();
      const lenis = new Lenis({ duration: 1.1, easing: (progress) => 1 - Math.pow(1 - progress, 4), smoothWheel: true, syncTouch: false, anchors: true });
      let frame = 0;
      let dirty = true;

      const restore = (element: RevealElement) => {
        element.removeAttribute("data-scroll-state");
        element.style.removeProperty("--scroll-reveal-progress");
        element.classList.remove("is-visible");
        element.removeAttribute("data-scroll-observed");
      };

      const register = (root: ParentNode) => {
        const elements = Array.from(root.querySelectorAll<RevealElement>(selector));
        if (root instanceof Element && root.matches(selector)) elements.unshift(root as RevealElement);
        elements.forEach((element) => {
          if (pending.has(element) || completed.has(element) || element.hasAttribute("hidden")) return;
          restore(element);
          // Content already in view stays visible on mount and route changes.
          if (element.getBoundingClientRect().top < window.innerHeight * .94) {
            completed.add(element);
            return;
          }
          pending.set(element, {
            progress: 0,
            verticalOffset: element.dataset.scrollReveal === "up" ? 24 : 0,
            stagger: Number.parseFloat(getComputedStyle(element).getPropertyValue("--scroll-reveal-stagger")) || 0,
          });
          element.style.setProperty("--scroll-reveal-progress", "0");
          element.dataset.scrollState = "pending";
        });
        dirty = true;
      };

      const update = () => {
        const height = window.innerHeight;
        const distance = Math.min(240, height * .22);
        const updates: Array<[RevealElement, RevealState, number]> = [];
        // Batch measurements, compensating our own translation to avoid feedback.
        pending.forEach((state, element) => {
          if (!element.isConnected) { pending.delete(element); return; }
          if (element.hasAttribute("hidden")) return;
          const top = element.getBoundingClientRect().top - state.verticalOffset * (1 - state.progress);
          const progress = Math.max(state.progress, Math.min(1, Math.max(0, (height * .94 - top - state.stagger) / distance)));
          if (progress !== state.progress) updates.push([element, state, progress]);
        });
        updates.forEach(([element, state, progress]) => {
          state.progress = progress;
          if (progress >= 1 || element.matches(":focus-within")) {
            restore(element);
            pending.delete(element);
            completed.add(element);
          } else element.style.setProperty("--scroll-reveal-progress", progress.toFixed(4));
        });
      };

      const invalidate = () => { dirty = true; };
      const revealFocused = (event: FocusEvent) => {
        if (!(event.target instanceof Element)) return;
        const element = event.target.closest<RevealElement>(selector);
        if (!element || !pending.has(element)) return;
        restore(element);
        pending.delete(element);
        completed.add(element);
      };

      register(document);
      const mutations = new MutationObserver((records) => {
        records.forEach((record) => {
          if (record.type === "attributes" && record.target instanceof Element) register(record.target);
          else record.addedNodes.forEach((node) => { if (node instanceof Element) register(node); });
        });
        invalidate();
      });
      mutations.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["hidden"] });
      const resize = new ResizeObserver(invalidate);
      resize.observe(document.body);
      lenis.on("scroll", invalidate);
      window.addEventListener("scroll", invalidate, { passive: true });
      window.addEventListener("resize", invalidate);
      document.addEventListener("focusin", revealFocused);
      document.addEventListener("visibilitychange", invalidate);

      // A single clock drives Lenis and the scroll-derived reveal progress.
      const tick = (time: number) => {
        lenis.raf(time);
        if (dirty) { dirty = false; update(); }
        frame = window.requestAnimationFrame(tick);
      };
      frame = window.requestAnimationFrame(tick);

      dispose = () => {
        window.cancelAnimationFrame(frame);
        mutations.disconnect();
        resize.disconnect();
        lenis.destroy();
        window.removeEventListener("scroll", invalidate);
        window.removeEventListener("resize", invalidate);
        document.removeEventListener("focusin", revealFocused);
        document.removeEventListener("visibilitychange", invalidate);
        pending.forEach((_, element) => restore(element));
        document.documentElement.classList.remove("scroll-motion-ready");
      };
    };

    configure();
    preference.addEventListener("change", configure);
    return () => { preference.removeEventListener("change", configure); dispose?.(); };
  }, []);
  return null;
}
