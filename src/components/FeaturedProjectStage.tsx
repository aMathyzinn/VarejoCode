"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { LockKeyhole } from "lucide-react";

const Environment = dynamic(() => import("./FeaturedProjectEnvironment"), { ssr: false });

class EnvironmentBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? null : this.props.children; }
}

export default function FeaturedProjectStage() {
  const stage = useRef<HTMLDivElement>(null);
  const [renderEnvironment, setRenderEnvironment] = useState(false);

  useEffect(() => {
    const root = stage.current;
    if (!root) return;
    const desktop = window.matchMedia("(min-width: 801px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const probe = document.createElement("canvas");
    const context = probe.getContext("webgl2");
    const hasWebGL = Boolean(context);
    context?.getExtension("WEBGL_lose_context")?.loseContext();
    let visible = false;
    let frame: number | null = null;

    const reset = () => {
      root.style.setProperty("--project-px", "0deg");
      root.style.setProperty("--project-py", "0deg");
    };
    const update = () => {
      setRenderEnvironment(visible && desktop.matches && hasWebGL && !reducedMotion.matches);
      if (!desktop.matches || reducedMotion.matches) reset();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    }, { rootMargin: "180px" });
    observer.observe(root);
    desktop.addEventListener("change", update);
    reducedMotion.addEventListener("change", update);

    const move = (event: PointerEvent) => {
      if (!desktop.matches || !finePointer.matches || reducedMotion.matches) return;
      if (frame !== null) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        frame = null;
        const bounds = root.getBoundingClientRect();
        root.style.setProperty("--project-px", `${((event.clientX - bounds.left) / bounds.width - 0.5) * 6}deg`);
        root.style.setProperty("--project-py", `${((event.clientY - bounds.top) / bounds.height - 0.5) * -4}deg`);
      });
    };
    const leave = () => {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
      reset();
    };
    root.addEventListener("pointermove", move, { passive: true });
    root.addEventListener("pointerleave", leave);
    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
      observer.disconnect();
      desktop.removeEventListener("change", update);
      reducedMotion.removeEventListener("change", update);
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div ref={stage} className="vc-featured-stage" data-scroll-reveal="up">
      <div className="vc-featured-halo" aria-hidden="true" />
      <div className="vc-featured-ground" aria-hidden="true" />
      <div className="vc-featured-environment" aria-hidden="true">
        {renderEnvironment && <EnvironmentBoundary><Environment /></EnvironmentBoundary>}
      </div>
      <div className="vc-featured-browser">
        <div className="vc-featured-window">
          <div className="vc-featured-chrome" aria-hidden="true">
            <div className="vc-featured-controls"><i /><i /><i /></div>
            <span><LockKeyhole /> amathyzin.com.br</span>
          </div>
          <Image src="/amathyzin.com.br.webp" alt="Captura real da página inicial do projeto aMathyzin" width={960} height={640} sizes="(max-width: 800px) 90vw, (max-width: 1400px) 55vw, 750px" />
        </div>
      </div>
      <p className="vc-featured-caption"><i aria-hidden="true" /> aMathyzin.com.br · Projeto em operação</p>
    </div>
  );
}
