"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import { MathUtils, Quaternion, Vector3 } from "three";
import type { Group, Mesh } from "three";

type SceneProps = {
  scrollProgress: MutableRefObject<number>;
  pointer: MutableRefObject<{ x: number; y: number }>;
};

const modulePositions: [number, number, number][] = [
  [-1.2, 1.1, -0.36],
  [1.18, 0.82, -0.42],
];

const connections: [number, number][] = [
  [0, 1],
];

const moduleScales = [0.84, 0.82] as const;
const panelHalfWidth = 0.46;
const panelHalfHeight = 0.31;

function panelPort(start: Vector3, end: Vector3, scale: number) {
  const direction = end.clone().sub(start).normalize();
  const xDistance = Math.abs(direction.x) > 0.001 ? (panelHalfWidth * scale) / Math.abs(direction.x) : Infinity;
  const yDistance = Math.abs(direction.y) > 0.001 ? (panelHalfHeight * scale) / Math.abs(direction.y) : Infinity;

  return start.clone().addScaledVector(direction, Math.min(xDistance, yDistance));
}

function connectionPorts(from: [number, number, number], to: [number, number, number], fromScale: number, toScale: number) {
  const source = new Vector3(...from);
  const target = new Vector3(...to);

  return {
    start: panelPort(source, target, fromScale),
    end: panelPort(target, source, toScale),
  };
}

function ProjectModule({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh>
        <boxGeometry args={[0.92, 0.62, 0.08]} />
        <meshStandardMaterial color="#d7d7d1" metalness={0.42} roughness={0.5} transparent opacity={0.08} depthWrite={false} />
      </mesh>
      <mesh position={[0, 0, 0.048]}>
        <boxGeometry args={[0.88, 0.58, 0.006]} />
        <meshBasicMaterial color="#f4f4ef" wireframe transparent opacity={0.17} depthWrite={false} />
      </mesh>
      <mesh position={[-0.27, 0.11, 0.06]}>
        <boxGeometry args={[0.22, 0.15, 0.012]} />
        <meshBasicMaterial color="#f2f2ed" transparent opacity={0.12} depthWrite={false} />
      </mesh>
      <mesh position={[0.1, 0.13, 0.06]}>
        <boxGeometry args={[0.3, 0.018, 0.012]} />
        <meshBasicMaterial color="#f4f4ef" transparent opacity={0.19} depthWrite={false} />
      </mesh>
      <mesh position={[0.03, -0.06, 0.06]}>
        <boxGeometry args={[0.43, 0.012, 0.012]} />
        <meshBasicMaterial color="#d6d6d0" transparent opacity={0.14} depthWrite={false} />
      </mesh>
      <mesh position={[-0.06, -0.18, 0.06]}>
        <boxGeometry args={[0.3, 0.012, 0.012]} />
        <meshBasicMaterial color="#d6d6d0" transparent opacity={0.11} depthWrite={false} />
      </mesh>
    </group>
  );
}

function Connection({ from, to, fromScale, toScale }: { from: [number, number, number]; to: [number, number, number]; fromScale: number; toScale: number }) {
  const { position, length, direction } = useMemo(() => {
    const { start, end } = connectionPorts(from, to, fromScale, toScale);
    const direction = end.clone().sub(start);
    const position = start.clone().add(end).multiplyScalar(0.5);

    return {
      position,
      length: direction.length(),
      direction: direction.normalize(),
    };
  }, [from, to, fromScale, toScale]);

  const axis = useMemo(() => new Vector3(0, 1, 0), []);
  const quaternion = useMemo(() => {
    const result = new Quaternion();
    result.setFromUnitVectors(axis, direction);
    return result;
  }, [axis, direction]);

  return (
    <mesh
      position={position}
      quaternion={quaternion}
    >
      <cylinderGeometry args={[0.008, 0.008, length, 6]} />
      <meshBasicMaterial color="#f0f0ea" transparent opacity={0.18} depthWrite={false} />
    </mesh>
  );
}

function Signal({ from, to, fromScale, toScale, offset }: { from: [number, number, number]; to: [number, number, number]; fromScale: number; toScale: number; offset: number }) {
  const signal = useRef<Mesh>(null);
  const { start, end } = useMemo(() => connectionPorts(from, to, fromScale, toScale), [from, to, fromScale, toScale]);
  const current = useMemo(() => new Vector3(), []);

  useFrame(({ clock }) => {
    if (!signal.current) return;
    const progress = (clock.getElapsedTime() * 0.15 + offset) % 1;
    current.lerpVectors(start, end, MathUtils.smootherstep(progress, 0, 1));
    signal.current.position.copy(current);
    signal.current.scale.setScalar(0.7 + Math.sin(progress * Math.PI) * 0.5);
  });

  return (
    <mesh ref={signal}>
      <sphereGeometry args={[0.065, 12, 12]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.4} depthWrite={false} />
    </mesh>
  );
}

function Scene({ scrollProgress, pointer }: SceneProps) {
  const rig = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!rig.current) return;

    const scroll = scrollProgress.current;
    const targetRotationY = pointer.current.x * 0.12 - scroll * 0.24;
    const targetRotationX = -pointer.current.y * 0.07 + scroll * 0.05;
    const targetZ = scroll * 0.42;

    rig.current.rotation.y = MathUtils.damp(rig.current.rotation.y, targetRotationY, 3.2, delta);
    rig.current.rotation.x = MathUtils.damp(rig.current.rotation.x, targetRotationX, 3.2, delta);
    rig.current.position.z = MathUtils.damp(rig.current.position.z, targetZ, 2.8, delta);
    rig.current.position.y = MathUtils.damp(rig.current.position.y, -scroll * 0.18, 2.8, delta);
  });

  return (
    <group ref={rig} rotation={[-0.08, -0.18, 0]}>
      <ambientLight intensity={0.9} />
      <directionalLight position={[2, 3, 5]} intensity={1.8} color="#ffffff" />
      <pointLight position={[-2.4, -1, 2]} intensity={2.1} distance={5} color="#d6d6cf" />
      {modulePositions.map((position, index) => (
        <ProjectModule key={index} position={position} scale={moduleScales[index]} />
      ))}
      {connections.map(([fromIndex, toIndex]) => (
        <Connection key={`${fromIndex}-${toIndex}`} from={modulePositions[fromIndex]} to={modulePositions[toIndex]} fromScale={moduleScales[fromIndex]} toScale={moduleScales[toIndex]} />
      ))}
      {connections.map(([fromIndex, toIndex], index) => (
        <Signal key={`signal-${fromIndex}-${toIndex}`} from={modulePositions[fromIndex]} to={modulePositions[toIndex]} fromScale={moduleScales[fromIndex]} toScale={moduleScales[toIndex]} offset={index * 0.34} />
      ))}
    </group>
  );
}

export default function HeroProjectScene() {
  const rootRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const [canRender, setCanRender] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 960px)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const canvas = document.createElement("canvas");
    const hasWebGL = Boolean(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));

    const updateCapability = () => setCanRender(hasWebGL && desktop.matches && !reducedMotion.matches);
    updateCapability();
    desktop.addEventListener("change", updateCapability);
    reducedMotion.addEventListener("change", updateCapability);

    const updateScroll = () => {
      const heroHeight = Math.max(window.innerHeight * 0.9, 720);
      scrollProgress.current = MathUtils.clamp(window.scrollY / heroHeight, 0, 1);
    };

    const updatePointer = (event: PointerEvent) => {
      if (!finePointer.matches) return;
      pointer.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.08 });
    if (rootRef.current) observer.observe(rootRef.current);

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("pointermove", updatePointer, { passive: true });

    return () => {
      desktop.removeEventListener("change", updateCapability);
      reducedMotion.removeEventListener("change", updateCapability);
      observer.disconnect();
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("pointermove", updatePointer);
    };
  }, []);

  return (
    <div ref={rootRef} className="vc-project-scene" aria-hidden="true">
      {canRender && (
        <Canvas
          camera={{ fov: 35, position: [0, 0, 7] }}
          dpr={[1, 1.5]}
          frameloop={isVisible ? "always" : "never"}
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        >
          <Scene scrollProgress={scrollProgress} pointer={pointer} />
        </Canvas>
      )}
    </div>
  );
}
