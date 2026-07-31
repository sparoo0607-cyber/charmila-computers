'use client';

import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, Float, Sparkles, ContactShadows } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

// Placeholder PC Cabinet
function PCCabinet() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Slow idle rotation
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1, 0]}>
      {/* Main Chassis */}
      <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 3, 3]} />
        <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Tempered Glass Side Panel */}
      <mesh position={[0.76, 1.5, 0]} receiveShadow>
        <boxGeometry args={[0.02, 2.9, 2.9]} />
        <meshPhysicalMaterial 
          color="#000000" 
          transparent={true} 
          opacity={0.3} 
          roughness={0.1}
          metalness={0.1}
          transmission={0.9}
          ior={1.5}
        />
      </mesh>

      {/* Front Panel Mesh/Glow */}
      <mesh position={[0, 1.5, 1.51]}>
        <boxGeometry args={[1.4, 2.9, 0.05]} />
        <meshStandardMaterial color="#050505" />
      </mesh>

      {/* Internal Glow / RGB (Placeholder for Motherboard area) */}
      <mesh position={[0, 1.5, -0.5]}>
        <boxGeometry args={[1, 2, 2]} />
        <meshStandardMaterial color="#2563EB" emissive="#2563EB" emissiveIntensity={0.5} toneMapped={false} />
      </mesh>
    </group>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas shadows camera={{ position: [4, 2, 5], fov: 45 }}>
        <Suspense fallback={null}>
          <color attach="background" args={['#020817']} />
          <fog attach="fog" args={['#020817', 5, 15]} />
          
          <ambientLight intensity={0.5} />
          <spotLight position={[5, 5, 5]} intensity={1} castShadow penumbra={1} />
          <spotLight position={[-5, 5, -5]} intensity={0.5} color="#2563EB" />
          
          <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <PCCabinet />
          </Float>

          <Sparkles count={100} scale={5} size={2} speed={0.4} opacity={0.2} color="#2563EB" />
          <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2} far={4} />
          
          <Environment preset="studio" />
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            maxPolarAngle={Math.PI / 2} 
            minPolarAngle={Math.PI / 3} 
          />
        </Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
    </div>
  );
}
