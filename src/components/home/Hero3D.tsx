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
      glassRef.current.material.opacity = THREE.MathUtils.damp(glassRef.current.material.opacity, isOpen ? 0.1 : 0.6, 3, delta);
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
      {/* Main Case Body (Matte White) */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[3, 4, 2.5]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.7} metalness={0.1} />
      </mesh>
      
      {/* Interior back panel (Dark) */}
      <mesh position={[0, 0, -1.2]} receiveShadow>
        <boxGeometry args={[2.8, 3.8, 0.1]} />
        <meshStandardMaterial color="#0F172A" roughness={0.9} />
      </mesh>

      {/* Glass Panel */}
      <mesh ref={glassRef} position={[0, 0, 1.25]} castShadow>
        <boxGeometry args={[2.9, 3.9, 0.05]} />
        <meshPhysicalMaterial 
          color="#ffffff"
          transmission={1}
          opacity={0.6}
          transparent
          roughness={0.1}
          thickness={0.1}
        />
      </mesh>

      {/* Motherboard Base */}
      <mesh position={[0, 0, -1.1]} receiveShadow>
        <boxGeometry args={[2.4, 3.2, 0.1]} />
        <meshStandardMaterial color="#1E293B" roughness={0.8} />
      </mesh>

      {/* Floating GPU */}
      <group ref={gpuRef} position={[0, -0.5, 0]}>
        <Float speed={isOpen ? 3 : 0} rotationIntensity={isOpen ? 0.2 : 0} floatIntensity={isOpen ? 0.5 : 0}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[2.2, 0.4, 0.8]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.4} metalness={0.3} />
          </mesh>
          {/* GPU RGB Strip */}
          <mesh position={[0, 0, 0.41]}>
            <boxGeometry args={[2, 0.05, 0.01]} />
            <meshBasicMaterial color={isOpen ? "#60A5FA" : "#1e3a8a"} />
          </mesh>
          {/* GPU Glow */}
          {isOpen && (
            <pointLight position={[0, 0, 0.5]} distance={2} intensity={2} color="#60A5FA" />
          )}
        </Float>
      </group>

      {/* Floating RAM */}
      <group ref={ramRef} position={[0.5, 0.8, 0]}>
        <Float speed={isOpen ? 4 : 0} rotationIntensity={isOpen ? 0.4 : 0} floatIntensity={isOpen ? 0.3 : 0}>
          <mesh castShadow receiveShadow position={[-0.1, 0, 0]}>
            <boxGeometry args={[0.05, 0.6, 0.4]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.3} metalness={0.5} />
          </mesh>
          <mesh castShadow receiveShadow position={[0.1, 0, 0]}>
            <boxGeometry args={[0.05, 0.6, 0.4]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.3} metalness={0.5} />
          </mesh>
          {/* RAM RGB */}
          <mesh position={[-0.1, 0.31, 0]}>
            <boxGeometry args={[0.03, 0.02, 0.38]} />
            <meshBasicMaterial color={isOpen ? "#2563EB" : "#1e3a8a"} />
          </mesh>
          <mesh position={[0.1, 0.31, 0]}>
            <boxGeometry args={[0.03, 0.02, 0.38]} />
            <meshBasicMaterial color={isOpen ? "#2563EB" : "#1e3a8a"} />
          </mesh>
        </Float>
      </group>

      {/* CPU Cooler */}
      <mesh position={[-0.3, 0.8, -0.8]} castShadow receiveShadow>
        <cylinderGeometry args={[0.3, 0.3, 0.4, 32]} />
        <meshStandardMaterial color="#0F172A" roughness={0.2} metalness={0.8} />
        {/* Cooler RGB Ring */}
        <mesh position={[0, 0.21, 0]}>
          <ringGeometry args={[0.25, 0.3, 32]} />
          <meshBasicMaterial color={isOpen ? "#60A5FA" : "#1e3a8a"} side={THREE.DoubleSide} />
        </mesh>
      </mesh>
    </group>
  );
}

export function Hero3D() {
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
