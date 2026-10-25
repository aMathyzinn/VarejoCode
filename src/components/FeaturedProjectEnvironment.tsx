"use client";

import { Canvas } from "@react-three/fiber";
import { useMemo } from "react";
import { PlaneGeometry } from "three";

function Terrain() {
  const geometry = useMemo(() => {
    const ground = new PlaneGeometry(20, 18, 120, 100);
    ground.rotateX(-Math.PI / 2);
    const positions = ground.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const z = positions.getZ(i);
      const ridge = Math.sin(x * 2.7 + z * 1.8) * Math.cos(z * 3.1 - x);
      const detail = Math.sin(x * 13 + z * 9) * Math.cos(z * 17 - x * 7);
      positions.setY(i, ridge * 0.23 + detail * 0.095);
    }
    ground.computeVertexNormals();
    return ground;
  }, []);

  return (
    <mesh geometry={geometry} position={[0, -1.28, 0]}>
      <meshStandardMaterial color="#344b56" roughness={0.88} metalness={0.2} />
    </mesh>
  );
}

export default function FeaturedProjectEnvironment() {
  return (
    <Canvas
      camera={{ fov: 44, position: [0, 2.8, 6.8], near: 0.1, far: 35 }}
      onCreated={({ camera }) => camera.lookAt(0, 0.15, -0.7)}
      dpr={[1, 1.35]}
      frameloop="demand"
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      fallback={null}
    >
      <fog attach="fog" args={["#090808", 11, 20]} />
      <ambientLight intensity={0.7} color="#8bb4c2" />
      <directionalLight position={[3, 5, 2]} intensity={2.3} color="#b1e8ff" />
      <pointLight position={[-2.8, -0.3, 1]} intensity={45} distance={11} color="#13bdec" />
      <pointLight position={[3.1, 0.1, -0.8]} intensity={35} distance={10} color="#247fff" />
      <Terrain />
      {Array.from({ length: 15 }, (_, i) => (
        <mesh key={i} position={[(i % 5 - 2) * 1.5 + Math.sin(i * 2) * 0.3, -1.19, -0.8 + Math.floor(i / 5) * 1.1]} rotation={[0, i * 1.3, 0]} scale={[0.32 + (i % 3) * 0.12, 0.12, 0.3]}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#263e4a" roughness={0.9} metalness={0.2} flatShading />
        </mesh>
      ))}
      <mesh position={[0, 0.5, -2.6]}>
        <torusGeometry args={[3.1, 0.008, 6, 100]} />
        <meshBasicMaterial color="#4ccbea" transparent opacity={0.32} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.08, -0.1]}>
        <ringGeometry args={[2.35, 2.37, 80]} />
        <meshBasicMaterial color="#38c9f4" transparent opacity={0.35} />
      </mesh>
    </Canvas>
  );
}
