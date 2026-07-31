'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, useCursor, PerspectiveCamera } from '@react-three/drei';
import { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { MotionValue } from 'framer-motion';

function PCCabinet({ 
  scrollProgress, 
  isBooted 
}: { 
  scrollProgress: MotionValue<number>;
  isBooted: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const glassRef = useRef<THREE.Mesh>(null);
  const gpuRef = useRef<THREE.Group>(null);
  const ramRef = useRef<THREE.Group>(null);
  
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  // Use a ref for fan rotation so we can continuously spin them
  const fanRotationRef = useRef(0);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    // 1. Get Scroll Progress
    const scroll = scrollProgress.get();
    
    // Smooth scroll value (spring-like effect)
    // Actually Framer Motion already dampens useScroll if configured, 
    // but we can dampen the actual values in R3F.
    const isOpen = scroll > 0.1;

    // 2. Initial Boot Animation
    const targetScale = isBooted ? 1 : 0.95;
    const targetY = isBooted ? 0 : -2;
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 4 * delta);
    groupRef.current.position.y = THREE.MathUtils.damp(groupRef.current.position.y, targetY, 4, delta);

    // 3. Subtle rotation based on mouse position + scroll rotation
    const mouseRotationY = (state.pointer.x * Math.PI) / 12; // Very subtle
    const mouseRotationX = -(state.pointer.y * Math.PI) / 24;
    const scrollRotationY = scroll * (Math.PI / 4); // Rotate slightly when scrolling
    
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y, 
      mouseRotationY + scrollRotationY, 
      4, 
      delta
    );
    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x, 
      mouseRotationX, 
      4, 
      delta
    );

    // 4. Fans Animation
    if (isBooted) {
      // Base speed + extra speed if open
      const fanSpeed = isOpen ? 15 * delta : 5 * delta;
      fanRotationRef.current += fanSpeed;
    }

    // 5. Animate Glass Panel Opening (Scroll based)
    if (glassRef.current) {
      const targetGlassX = isOpen ? 3 : 0;
      const targetGlassZ = isOpen ? 1 : 1.25;
      glassRef.current.position.x = THREE.MathUtils.damp(glassRef.current.position.x, targetGlassX, 3, delta);
      glassRef.current.position.z = THREE.MathUtils.damp(glassRef.current.position.z, targetGlassZ, 3, delta);
      
      const targetOpacity = isOpen ? 0.05 : 0.4;
      (glassRef.current.material as THREE.Material).opacity = THREE.MathUtils.damp(
        (glassRef.current.material as THREE.Material).opacity, 
        targetOpacity, 
        3, 
        delta
      );
    }

    // 6. Animate GPU floating out
    if (gpuRef.current) {
      const targetGpuZ = isOpen ? 1.5 : 0;
      const targetGpuY = isOpen ? 0.5 : -0.5;
      gpuRef.current.position.z = THREE.MathUtils.damp(gpuRef.current.position.z, targetGpuZ, 2, delta);
      gpuRef.current.position.y = THREE.MathUtils.damp(gpuRef.current.position.y, targetGpuY, 2, delta);
    }
    
    // 7. Animate RAM floating out
    if (ramRef.current) {
      const targetRamZ = isOpen ? 1.2 : 0;
      const targetRamX = isOpen ? -1 : 0.5;
      const targetRamY = isOpen ? 1 : 0.8;
      ramRef.current.position.z = THREE.MathUtils.damp(ramRef.current.position.z, targetRamZ, 2, delta);
      ramRef.current.position.x = THREE.MathUtils.damp(ramRef.current.position.x, targetRamX, 2, delta);
      ramRef.current.position.y = THREE.MathUtils.damp(ramRef.current.position.y, targetRamY, 2, delta);
    }
  });

  return (
    <group 
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={[0.95, 0.95, 0.95]}
      position={[0, -2, 0]}
    >
      {/* Main Case Body (Matte White/Black contrast) */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 4.2, 2.6]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.7} metalness={0.1} />
      </mesh>
      
      {/* Interior cut-out (Dark) */}
      <mesh position={[0, 0, -1.2]} receiveShadow>
        <boxGeometry args={[2.9, 3.9, 0.2]} />
        <meshStandardMaterial color="#020617" roughness={0.9} />
      </mesh>

      {/* Front Panel Mesh/Grille */}
      <mesh position={[1.55, 0, 0]} receiveShadow>
        <boxGeometry args={[0.1, 3.9, 2.4]} />
        <meshStandardMaterial color="#0F172A" roughness={0.6} wireframe />
      </mesh>

      {/* 3x Front RGB Fans */}
      {[-1.2, 0, 1.2].map((y, i) => (
        <group key={i} position={[1.4, y, 0]} rotation={[0, 0, Math.PI / 2]}>
          <mesh>
            <cylinderGeometry args={[0.5, 0.5, 0.1, 32]} />
            <meshStandardMaterial color="#0F172A" roughness={0.8} />
          </mesh>
          <mesh 
            position={[0, 0.06, 0]} 
            onUpdate={(self) => {
              self.rotation.y = fanRotationRef.current;
            }}
          >
            <torusGeometry args={[0.45, 0.02, 16, 64]} />
            <meshBasicMaterial color={isBooted ? "#3B82F6" : "#0f172a"} />
          </mesh>
          <mesh 
            position={[0, 0.06, 0]}
            onUpdate={(self) => {
              self.rotation.y = -fanRotationRef.current;
            }}
          >
            <torusGeometry args={[0.2, 0.02, 16, 64]} />
            <meshBasicMaterial color={isBooted ? "#8B5CF6" : "#0f172a"} />
          </mesh>
        </group>
      ))}

      {/* Glass Panel */}
      <mesh ref={glassRef} position={[0, 0, 1.3]} castShadow>
        <boxGeometry args={[3, 4, 0.05]} />
        <meshPhysicalMaterial 
          color="#ffffff"
          transmission={1}
          opacity={0.4}
          transparent
          roughness={0.1}
          thickness={0.1}
        />
      </mesh>

      {/* Motherboard Base with fake traces */}
      <mesh position={[-0.2, 0.2, -1.0]} receiveShadow>
        <boxGeometry args={[2.2, 3.0, 0.1]} />
        <meshStandardMaterial color="#1E293B" roughness={0.8} metalness={0.5} />
      </mesh>
      
      {/* VRM Heatsinks */}
      <mesh position={[-1.1, 1.4, -0.9]} castShadow>
        <boxGeometry args={[0.3, 0.8, 0.2]} />
        <meshStandardMaterial color="#334155" roughness={0.4} metalness={0.8} />
      </mesh>
      <mesh position={[-0.2, 1.6, -0.9]} castShadow>
        <boxGeometry args={[1.2, 0.3, 0.2]} />
        <meshStandardMaterial color="#334155" roughness={0.4} metalness={0.8} />
      </mesh>

      {/* Floating Detailed GPU */}
      <group ref={gpuRef} position={[0, -0.6, 0]}>
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          {/* GPU Backplate */}
          <mesh castShadow receiveShadow position={[0, 0.2, 0]}>
            <boxGeometry args={[2.4, 0.05, 1.0]} />
            <meshStandardMaterial color="#94A3B8" roughness={0.4} metalness={0.6} />
          </mesh>
          {/* GPU Body */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[2.4, 0.4, 1.0]} />
            <meshStandardMaterial color="#0F172A" roughness={0.6} metalness={0.3} />
          </mesh>
          {/* GPU Side RGB Strip (GeForce RTX style) */}
          <mesh position={[0, 0, 0.51]}>
            <boxGeometry args={[2.2, 0.1, 0.01]} />
            <meshBasicMaterial color={isBooted ? "#3B82F6" : "#0f172a"} />
          </mesh>
          {isBooted && (
            <pointLight position={[0, 0, 0.6]} distance={2} intensity={2} color="#3B82F6" />
          )}
        </Float>
      </group>

      {/* Floating Detailed RAM */}
      <group ref={ramRef} position={[0.5, 0.8, 0]}>
        <Float speed={3} rotationIntensity={0.4} floatIntensity={0.3}>
          {[-0.15, -0.05, 0.05, 0.15].map((x, i) => (
            <group key={i} position={[x, 0, 0]}>
              <mesh castShadow receiveShadow>
                <boxGeometry args={[0.06, 0.8, 0.45]} />
                <meshStandardMaterial color="#1E293B" roughness={0.3} metalness={0.8} />
              </mesh>
              <mesh position={[0, 0.41, 0]}>
                <boxGeometry args={[0.04, 0.02, 0.43]} />
                <meshBasicMaterial color={isBooted ? (i % 2 === 0 ? "#8B5CF6" : "#EC4899") : "#0f172a"} />
              </mesh>
            </group>
          ))}
        </Float>
      </group>

      {/* CPU AIO Cooler Block */}
      <mesh position={[-0.4, 0.8, -0.9]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.2, 32]} />
        <meshStandardMaterial color="#0F172A" roughness={0.2} metalness={0.9} />
        {/* Infinity Mirror / RGB Logo Simulation */}
        <mesh position={[0, 0.11, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.02, 32]} />
          <meshBasicMaterial color={isBooted ? "#F43F5E" : "#0f172a"} />
        </mesh>
        <mesh position={[0, 0.12, 0]}>
          <ringGeometry args={[0.2, 0.22, 32]} />
          <meshBasicMaterial color={isBooted ? "#3B82F6" : "#0f172a"} />
        </mesh>
      </mesh>
      
      {/* AIO Tubes */}
      <mesh position={[-0.1, 1.2, -0.8]} rotation={[0, 0, Math.PI / 4]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 1.0, 16]} />
        <meshStandardMaterial color="#1E293B" roughness={0.9} />
      </mesh>
      <mesh position={[-0.25, 1.3, -0.7]} rotation={[0, 0, Math.PI / 4.5]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 1.1, 16]} />
        <meshStandardMaterial color="#1E293B" roughness={0.9} />
      </mesh>

      {/* Top AIO Radiator */}
      <mesh position={[0, 1.9, -0.5]} castShadow receiveShadow>
        <boxGeometry args={[2.0, 0.2, 1.0]} />
        <meshStandardMaterial color="#0F172A" roughness={0.8} />
      </mesh>

      {/* Power Supply Shroud */}
      <mesh position={[0, -1.6, -0.2]} castShadow receiveShadow>
        <boxGeometry args={[2.8, 0.8, 2.0]} />
        <meshStandardMaterial color="#1E293B" roughness={0.8} metalness={0.2} />
      </mesh>
      <mesh position={[0, -1.2, 0.8]}>
        <boxGeometry args={[2.8, 0.02, 0.05]} />
        <meshBasicMaterial color={isBooted ? "#3B82F6" : "#0f172a"} />
      </mesh>

    </group>
  );
}

export default function Hero3D({ scrollProgress, isBooted }: { scrollProgress: MotionValue<number>; isBooted: boolean }) {
  return (
    <div className="w-full h-full min-h-[600px]">
      <Canvas shadows camera={{ position: [5, 2, 6], fov: 45 }}>
        <PerspectiveCamera makeDefault position={[5, 2, 6]} fov={45} />
        
        {/* Lights */}
        <ambientLight intensity={isBooted ? 0.3 : 0.05} />
        <directionalLight 
          position={[5, 10, 5]} 
          intensity={isBooted ? 1.5 : 0.2} 
          castShadow 
          shadow-mapSize={1024}
        />
        <pointLight position={[-2, -2, -2]} intensity={isBooted ? 0.5 : 0.1} color="#3B82F6" />
        
        <PCCabinet scrollProgress={scrollProgress} isBooted={isBooted} />
        
        {/* Subtle environment map for reflections */}
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
