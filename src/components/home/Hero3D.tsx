'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Lightformer, ContactShadows, Float, useCursor } from '@react-three/drei';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function PCCabinet({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (val: boolean) => void }) {
  const groupRef = useRef<THREE.Group>(null);
  const glassRef = useRef<THREE.Mesh>(null);
  const gpuRef = useRef<THREE.Group>(null);
  const ramRef = useRef<THREE.Group>(null);
  
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    // Subtle rotation based on mouse position
    const targetRotationY = (state.pointer.x * Math.PI) / 6;
    const targetRotationX = -(state.pointer.y * Math.PI) / 12;
    
    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetRotationY, 4, delta);
    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetRotationX, 4, delta);

    // Animate Glass Panel Opening
    if (glassRef.current) {
      const targetGlassX = isOpen ? 3 : 0;
      const targetGlassZ = isOpen ? 1 : 1.25;
      glassRef.current.position.x = THREE.MathUtils.damp(glassRef.current.position.x, targetGlassX, 3, delta);
      glassRef.current.position.z = THREE.MathUtils.damp(glassRef.current.position.z, targetGlassZ, 3, delta);
      (glassRef.current.material as THREE.Material).opacity = THREE.MathUtils.damp((glassRef.current.material as THREE.Material).opacity, isOpen ? 0.05 : 0.4, 3, delta);
    }

    // Animate GPU floating out when open
    if (gpuRef.current) {
      const targetGpuZ = isOpen ? 1.5 : 0;
      const targetGpuY = isOpen ? 0.5 : -0.5;
      gpuRef.current.position.z = THREE.MathUtils.damp(gpuRef.current.position.z, targetGpuZ, 2, delta);
      gpuRef.current.position.y = THREE.MathUtils.damp(gpuRef.current.position.y, targetGpuY, 2, delta);
    }
    
    // Animate RAM floating out
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
      onClick={() => setIsOpen(!isOpen)}
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
          <mesh position={[0, 0.06, 0]}>
            <torusGeometry args={[0.45, 0.02, 16, 64]} />
            <meshBasicMaterial color={isOpen ? "#3B82F6" : "#1e3a8a"} />
          </mesh>
          <mesh position={[0, 0.06, 0]}>
            <torusGeometry args={[0.2, 0.02, 16, 64]} />
            <meshBasicMaterial color={isOpen ? "#8B5CF6" : "#4c1d95"} />
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
        <Float speed={isOpen ? 3 : 0} rotationIntensity={isOpen ? 0.2 : 0} floatIntensity={isOpen ? 0.5 : 0}>
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
          {/* GPU Fans */}
          {[-0.8, 0, 0.8].map((x, i) => (
            <group key={i} position={[x, -0.21, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <mesh>
                <cylinderGeometry args={[0.35, 0.35, 0.05, 32]} />
                <meshStandardMaterial color="#1E293B" />
              </mesh>
              <mesh position={[0, 0.03, 0]}>
                <torusGeometry args={[0.3, 0.02, 16, 64]} />
                <meshBasicMaterial color={isOpen ? "#06B6D4" : "#164e63"} />
              </mesh>
            </group>
          ))}
          {/* GPU Side RGB Strip (GeForce RTX style) */}
          <mesh position={[0, 0, 0.51]}>
            <boxGeometry args={[2.2, 0.1, 0.01]} />
            <meshBasicMaterial color={isOpen ? "#3B82F6" : "#1e3a8a"} />
          </mesh>
          {isOpen && (
            <pointLight position={[0, 0, 0.6]} distance={2} intensity={2} color="#3B82F6" />
          )}
        </Float>
      </group>

      {/* Floating Detailed RAM */}
      <group ref={ramRef} position={[0.5, 0.8, 0]}>
        <Float speed={isOpen ? 4 : 0} rotationIntensity={isOpen ? 0.4 : 0} floatIntensity={isOpen ? 0.3 : 0}>
          {[-0.15, -0.05, 0.05, 0.15].map((x, i) => (
            <group key={i} position={[x, 0, 0]}>
              <mesh castShadow receiveShadow>
                <boxGeometry args={[0.06, 0.8, 0.45]} />
                <meshStandardMaterial color="#1E293B" roughness={0.3} metalness={0.8} />
              </mesh>
              <mesh position={[0, 0.41, 0]}>
                <boxGeometry args={[0.04, 0.02, 0.43]} />
                <meshBasicMaterial color={isOpen ? (i % 2 === 0 ? "#8B5CF6" : "#EC4899") : "#4c1d95"} />
              </mesh>
            </group>
          ))}
        </Float>
      </group>

      {/* CPU AIO Cooler Block */}
      <mesh position={[-0.4, 0.8, -0.9]} castShadow receiveShadow>
        <cylinderGeometry args={[0.35, 0.35, 0.2, 32]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#0F172A" roughness={0.2} metalness={0.9} />
        {/* Infinity Mirror / RGB Logo Simulation */}
        <mesh position={[0, 0.11, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.02, 32]} />
          <meshBasicMaterial color={isOpen ? "#F43F5E" : "#881337"} />
        </mesh>
        <mesh position={[0, 0.12, 0]}>
          <ringGeometry args={[0.2, 0.22, 32]} />
          <meshBasicMaterial color={isOpen ? "#3B82F6" : "#1e3a8a"} />
        </mesh>
      </mesh>
      
      {/* AIO Tubes (Simulated with simple cylinders angled up) */}
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
      {/* Top Radiator Fans */}
      {[-0.5, 0.5].map((x, i) => (
        <group key={i} position={[x, 1.8, -0.5]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh>
            <torusGeometry args={[0.4, 0.05, 16, 64]} />
            <meshBasicMaterial color={isOpen ? "#EC4899" : "#831843"} />
          </mesh>
        </group>
      ))}

      {/* Power Supply Shroud */}
      <mesh position={[0, -1.6, -0.2]} castShadow receiveShadow>
        <boxGeometry args={[2.8, 0.8, 2.0]} />
        <meshStandardMaterial color="#1E293B" roughness={0.8} metalness={0.2} />
      </mesh>
      <mesh position={[0, -1.2, 0.8]}>
        <boxGeometry args={[2.8, 0.02, 0.05]} />
        <meshBasicMaterial color={isOpen ? "#3B82F6" : "#1e3a8a"} />
      </mesh>

    </group>
  );
}

export default function Hero3D() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-full w-full bg-transparent" />;

  return (
    <div className="relative w-full h-[600px] md:h-[800px] flex items-center justify-center cursor-pointer">
      <Canvas shadows camera={{ position: [0, 0, 8], fov: 45 }}>
        <color attach="background" args={['#FAFBFD']} />
        
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={0.5} castShadow />
        
        <Environment preset="city">
          <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[10, 2, 1]} />
          <Lightformer intensity={2} rotation-y={-Math.PI / 2} position={[5, 1, -1]} scale={[10, 2, 1]} />
        </Environment>

        <PCCabinet isOpen={isOpen} setIsOpen={setIsOpen} />
        
        <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2} far={4} />
      </Canvas>

      {/* Overlay UI */}
      <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
        <div className={`transition-all duration-1000 transform ${isOpen ? 'translate-y-[-120px] opacity-100' : 'translate-y-0 opacity-0'}`}>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight font-heading text-center drop-shadow-xl mb-6">
            Performance. <span className="text-blue-600">Unleashed.</span>
          </h1>
        </div>
        
        <div className={`absolute bottom-20 transition-all duration-1000 transform delay-300 pointer-events-auto ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <Link href="/build-pc">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-10 py-6 text-lg font-bold shadow-2xl shadow-blue-500/50 hover:scale-105 transition-all">
              Build Your Dream PC
            </Button>
          </Link>
        </div>

        {!isOpen && (
          <div className="absolute bottom-20 text-gray-400 font-medium animate-bounce flex flex-col items-center gap-2">
            <span className="text-sm tracking-widest uppercase font-sans">Click to open</span>
          </div>
        )}
      </div>
    </div>
  );
}
