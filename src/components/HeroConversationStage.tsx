"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, BarChart3, Box, Check, Globe, Zap } from "lucide-react";
import LiveProjectChat from "@/components/LiveProjectChat";

export default function HeroConversationStage() {
  const scene = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = scene.current;
    if (!root) return;
    let inView = false;
    const update = () => { root.dataset.idleActive = String(inView && !document.hidden); };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    });
    observer.observe(root);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
      delete root.dataset.idleActive;
    };
  }, []);

  return (
    <div ref={scene} className="vc-console-wrap vc-hero-conversation" data-scroll-reveal="up" aria-label="Prévia ilustrativa do acompanhamento de um projeto">
      <div className="vc-hero-aura" aria-hidden="true" />
      <div className="vc-hero-floor-light" aria-hidden="true" />
      <div className="vc-orbit vc-orbit-one" aria-hidden="true" />
      <div className="vc-orbit vc-orbit-two" aria-hidden="true" />
      <div className="vc-hero-light-points" aria-hidden="true"><i /><i /><i /><i /></div>
      <svg className="vc-hero-connections" viewBox="0 0 640 620" fill="none" aria-hidden="true">
        <path d="M58 320V173Q58 153 78 153H180M455 162H565V425M468 310H593M474 448H565" />
        <circle cx="58" cy="153" r="4" /><circle cx="565" cy="162" r="3" />
        <circle cx="565" cy="310" r="3" /><circle cx="565" cy="448" r="3" />
      </svg>
      <div className="vc-hero-module vc-hero-module-scope" aria-hidden="true"><BarChart3 /><span>Escopo<br />definido</span></div>
      <div className="vc-hero-module vc-hero-module-site" aria-hidden="true"><Globe /><span>Site / Loja</span></div>
      <div className="vc-hero-module vc-hero-module-api" aria-hidden="true"><Box /><span>APIs / Integrações</span></div>
      <div className="vc-hero-module vc-hero-module-bot" aria-hidden="true"><Zap /><span>Bots e automações</span></div>
      <div className="vc-console">
        <div className="vc-hero-moving-sheen" aria-hidden="true" />
        <div className="vc-console-bar">
          <span /><span /><span /><p>varejocode / projeto-em-andamento</p>
          <em><i /> Em andamento</em>
        </div>
        <div className="vc-console-body"><LiveProjectChat /></div>
      </div>
      <div className="vc-float-card vc-float-card-bottom">
        <span className="vc-hero-confirmation"><Check /></span>
        <span>Próximo passo: análise do projeto</span><ArrowRight aria-hidden="true" />
      </div>
    </div>
  );
}
