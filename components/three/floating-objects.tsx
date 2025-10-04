"use client"

import { Canvas } from "@react-three/fiber"
import { Float, OrbitControls } from "@react-three/drei"
import { useMemo } from "react"

function GlowingBox({ position = [0, 0, 0], color = "#00f0ff" as string }) {
  return (
    <Float speed={2} floatIntensity={1.2} rotationIntensity={0.6}>
      <mesh position={position as any}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial emissive={color} emissiveIntensity={1.2} color="black" />
      </mesh>
    </Float>
  )
}

function GlowingSphere({ position = [0, 0, 0], color = "#00ffd0" as string }) {
  return (
    <Float speed={1.6} floatIntensity={0.8} rotationIntensity={0.4}>
      <mesh position={position as any}>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshStandardMaterial emissive={color} emissiveIntensity={1.1} color="black" />
      </mesh>
    </Float>
  )
}

export function FloatingObjects() {
  const items = useMemo(
    () => [
      { type: "box", position: [-1.4, 0.4, 0.6], color: "#00f0ff" },
      { type: "sphere", position: [1.2, -0.2, 0.4], color: "#39ff88" },
      { type: "box", position: [0.2, 0.9, -0.3], color: "#00ffd0" },
      { type: "sphere", position: [-0.3, -0.8, -0.5], color: "#00e5ff" },
    ],
    [],
  )

  return (
    <Canvas camera={{ position: [0, 0, 4.2], fov: 50 }}>
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 4, 4]} intensity={10} />
      <group>
        {items.map((it, idx) =>
          it.type === "box" ? (
            <GlowingBox key={idx} position={it.position as any} color={it.color} />
          ) : (
            <GlowingSphere key={idx} position={it.position as any} color={it.color} />
          ),
        )}
      </group>
      <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.6} />
    </Canvas>
  )
}
