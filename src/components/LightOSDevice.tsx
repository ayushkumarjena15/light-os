"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function LightOSDevice(props: any) {
  const outerRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const logoTexture = useTexture("/autometra_logo_transparent.png");

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.5;
    }
    if (outerRef.current) {
      outerRef.current.position.y = Math.sin(t * 2) * 0.05;
    }
    if (coreRef.current) {
      (coreRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 1 + Math.sin(t * 4) * 0.5;
    }
  });

  return (
    <group {...props} dispose={null} ref={outerRef}>
      {/* Main Enclosure */}
      <RoundedBox args={[1.6, 2.2, 0.8]} radius={0.15} smoothness={4} position={[0, 0, 0]}>
        <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.15} />
      </RoundedBox>

      {/* Front Glass Panel */}
      <RoundedBox args={[1.4, 2.0, 0.85]} radius={0.1} smoothness={4} position={[0, 0, 0.05]}>
        <meshPhysicalMaterial
          color="#1e3a8a"
          transmission={0.9}
          opacity={1}
          metalness={0.1}
          roughness={0.05}
          ior={1.5}
          thickness={0.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </RoundedBox>

      {/* Internal Smart Sensor Eye */}
      <mesh position={[0, 0.3, 0.2]} ref={coreRef}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={2}
          toneMapped={false}
        />
        <pointLight color="#60a5fa" intensity={1.5} distance={3} />
      </mesh>

      {/* Spinning Outer Ring */}
      <mesh position={[0, 0.3, 0.2]} ref={ringRef}>
        <torusGeometry args={[0.45, 0.02, 16, 64]} />
        <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Brand Logo */}
      <mesh position={[0, -0.65, 0.49]}>
        <planeGeometry args={[1.0, 1.0]} />
        <meshBasicMaterial map={logoTexture} toneMapped={false} transparent={true} />
      </mesh>

      {/* Heat Sinks / Side Panels */}
      <mesh position={[-0.82, 0, 0]}>
        <boxGeometry args={[0.05, 1.8, 0.5]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.4} />
      </mesh>
      <mesh position={[0.82, 0, 0]}>
        <boxGeometry args={[0.05, 1.8, 0.5]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.4} />
      </mesh>

      {/* Bottom Connectors / Antennas */}
      <mesh position={[-0.4, -1.2, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.4, 16]} />
        <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.5} />
      </mesh>
      <mesh position={[0.4, -1.2, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.4, 16]} />
        <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.5} />
      </mesh>

      {/* Top Antenna */}
      <mesh position={[0.6, 1.4, 0]}>
        <cylinderGeometry args={[0.03, 0.05, 0.8, 16]} />
        <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.5} />
      </mesh>
      {/* Top Antenna Tip (Red light) */}
      <mesh position={[0.6, 1.8, 0]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={2} />
      </mesh>

      {/* Indicator LEDs */}
      <mesh position={[-0.5, -0.7, 0.42]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="#10b981" emissive="#10b981" emissiveIntensity={2} />
      </mesh>
      <mesh position={[-0.3, -0.7, 0.42]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}
