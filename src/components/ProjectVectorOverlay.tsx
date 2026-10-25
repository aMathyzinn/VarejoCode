"use client";

import { useEffect, useRef, useState } from "react";

type OverlayKind = "services" | "testimonials" | "pricing";

// Ports are the visible outlines, shared by the route, signal and endpoint marker.
const servicePorts = {
  brief: [176, 300],
  browser: [340, 170],
  discord: [620, 170],
  phone: [292, 430],
  automation: [620, 430],
  data: [784, 300],
} as const;
const serviceHub = [480, 300] as const;

function serviceRoute(port: readonly [number, number], inbound = false) {
  const [start, end] = inbound ? [port, serviceHub] : [serviceHub, port];
  const bendX = (start[0] + end[0]) / 2;
  return `M${start[0]} ${start[1]}C${bendX} ${start[1]} ${bendX} ${end[1]} ${end[0]} ${end[1]}`;
}

const serviceRoutes = Object.entries(servicePorts).map(([name, port]) => ({
  name,
  port,
  path: serviceRoute(port, name === "brief"),
}));

export default function ProjectVectorOverlay({ kind }: { kind: OverlayKind }) {
  const overlayRef = useRef<SVGSVGElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (kind !== "services" || !overlayRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.18 }
    );

    observer.observe(overlayRef.current);
    return () => observer.disconnect();
  }, [kind]);

  if (kind === "services") {
    return (
      <svg ref={overlayRef} className={`vc-vector-overlay vc-vector-services${isInView ? " vc-vector-motion" : ""}`} viewBox="0 0 960 600" fill="none" aria-hidden="true">
        <g className="vc-vector-grid">
          <path d="M80 70v460M180 70v460M280 70v460M380 70v460M480 70v460M580 70v460M680 70v460M780 70v460M880 70v460" />
          <path d="M40 100h880M40 200h880M40 300h880M40 400h880M40 500h880" />
        </g>
        {serviceRoutes.map(({ name, path }, index) => (
          <g key={name}>
            <path className="vc-vector-route" d={path} />
            <path className="vc-vector-signal vc-vector-service-signal" pathLength="100" d={path} style={{ animationDelay: `${index * 1.5}s` }} />
          </g>
        ))}
        <g className="vc-vector-module vc-vector-browser">
          <rect x="180" y="114" width="160" height="112" rx="12" />
          <path d="M180 143h160M198 129h5M212 129h5M226 129h5" />
          <rect x="198" y="159" width="54" height="49" rx="4" />
          <path d="M265 166h55M265 182h38M265 198h46M209 176h31M209 190h23" />
        </g>
        <g className="vc-vector-module vc-vector-discord">
          <rect x="620" y="114" width="160" height="112" rx="12" />
          <path d="M620 143h160M638 129h5M652 129h5M666 129h5M639 164h61M639 182h120M639 200h83" />
          <circle cx="748" cy="165" r="10" /><path d="M743 165h10M748 160v10" />
        </g>
        <g className="vc-vector-module vc-vector-phone">
          <rect x="228" y="374" width="64" height="112" rx="11" />
          <path d="M250 388h20M241 405h38M241 420h38M241 435h38M241 450h25M254 473h12" />
          <rect x="238" y="399" width="44" height="61" rx="4" />
        </g>
        <g className="vc-vector-module vc-vector-automation">
          <rect x="620" y="374" width="160" height="112" rx="12" />
          <path d="M637 395h126M637 414h89M637 452h126M655 471h90" />
          <circle cx="651" cy="433" r="7" /><circle cx="749" cy="433" r="7" />
          <path d="M658 433h84" />
        </g>
        <g className="vc-vector-data">
          <ellipse cx="840" cy="264" rx="56" ry="14" />
          <path d="M784 264v72c0 8 25 14 56 14s56-6 56-14v-72M784 288c0 8 25 14 56 14s56-6 56-14M784 312c0 8 25 14 56 14s56-6 56-14" />
          <path d="M813 264h54" />
        </g>
        <g className="vc-vector-brief">
          <rect x="64" y="260" width="112" height="80" rx="10" />
          <path d="M82 280h76M82 300h54M82 320h66M120 340v20M101 360h38" />
        </g>
        <g className="vc-vector-points vc-vector-service-ports">
          {serviceRoutes.map(({ name, port }) => <circle key={name} cx={port[0]} cy={port[1]} r="4" />)}
          <circle cx={serviceHub[0]} cy={serviceHub[1]} r="6" />
        </g>
      </svg>
    );
  }

  if (kind === "testimonials") {
    return (
      <svg className="vc-vector-overlay vc-vector-testimonials" viewBox="0 0 760 420" fill="none" aria-hidden="true">
        <path d="M73 99h193a12 12 0 0 1 12 12v92a12 12 0 0 1-12 12H156l-42 31 8-31H73a12 12 0 0 1-12-12v-92a12 12 0 0 1 12-12Z" />
        <path d="M100 130h110M100 151h79M100 172h128" />
        <path d="M419 223h193a12 12 0 0 1 12 12v92a12 12 0 0 1-12 12H503l-42 31 8-31h-50a12 12 0 0 1-12-12v-92a12 12 0 0 1 12-12Z" />
        <path d="M446 254h110M446 275h79M446 296h128" />
        <path d="M278 157c63 0 68 112 141 112" strokeDasharray="5 8" />
        <circle cx="278" cy="157" r="5" /><circle cx="419" cy="269" r="5" />
      </svg>
    );
  }

  return (
    <svg className="vc-vector-overlay vc-vector-pricing" viewBox="0 0 800 350" fill="none" aria-hidden="true">
      <path d="M73 174h168M350 174h168M626 174h98" />
      <path d="m218 155 23 19-23 19M495 155l23 19-23 19M701 155l23 19-23 19" />
      <g className="vc-vector-node"><rect x="42" y="123" width="95" height="102" rx="8" /><path d="M62 149h55M62 172h35M62 195h47" /></g>
      <g className="vc-vector-node"><rect x="241" y="123" width="109" height="102" rx="8" /><path d="M264 149h64M264 172h44M264 195h57" /></g>
      <g className="vc-vector-node"><rect x="518" y="123" width="109" height="102" rx="8" /><path d="M541 149h64M541 172h44M541 195h57" /></g>
      <circle cx="73" cy="174" r="5" /><circle cx="295" cy="174" r="5" /><circle cx="572" cy="174" r="5" /><circle cx="724" cy="174" r="5" />
    </svg>
  );
}
