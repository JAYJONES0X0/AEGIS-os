'use client';

import { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { 
  Float, 
  Environment, 
  OrbitControls,
  useTexture,
  Sphere,
  MeshDistortMaterial
} from '@react-three/drei';
import { motion } from 'motion/react';
import * as THREE from 'three';

// GPU Particle System Component
function Particles({ count = 2000 }: { count?: number }) {
  const mesh = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Random spherical distribution
      const radius = Math.random() * 20 + 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Color variation
      const intensity = Math.random() * 0.5 + 0.3;
      colors[i * 3] = intensity; // R
      colors[i * 3 + 1] = intensity * 0.8; // G  
      colors[i * 3 + 2] = intensity * 1.2; // B
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    return geometry;
  }, [count]);

  return (
    <points geometry={mesh} position={[0, 0, -10]}>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Floating AEGIS Sigil
function FloatingSigil() {
  return (
    <Float
      speed={1.5}
      rotationIntensity={0.2}
      floatIntensity={0.5}
      floatingRange={[1, 2]}
    >
      <mesh position={[0, 0, -5]} rotation={[0, 0, 0]}>
        <Sphere args={[1.5, 32, 32]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#7ee0ff"
            transparent
            opacity={0.1}
            distort={0.3}
            speed={2}
            roughness={0.1}
            metalness={0.8}
          />
        </Sphere>
      </mesh>
    </Float>
  );
}

// Parallax Planes
function ParallaxPlanes() {
  return (
    <group>
      {/* Background plane */}
      <mesh position={[0, 0, -15]} rotation={[0, 0, 0]}>
        <planeGeometry args={[30, 20]} />
        <meshBasicMaterial
          color="#0b0b0c"
          transparent
          opacity={0.05}
        />
      </mesh>
      
      {/* Mid plane */}
      <mesh position={[2, -1, -8]} rotation={[0.1, 0.2, 0]}>
        <planeGeometry args={[15, 10]} />
        <meshBasicMaterial
          color="#1a1a2e"
          transparent
          opacity={0.03}
        />
      </mesh>
    </group>
  );
}

// Main 3D Scene
function Scene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={0.5}
        color="#7ee0ff"
      />
      <pointLight 
        position={[-5, -5, 2]} 
        intensity={0.3}
        color="#a855f7"
      />
      
      {/* Environment */}
      <Environment preset="night" />
      
      {/* Scene Elements */}
      <Particles count={1500} />
      <FloatingSigil />
      <ParallaxPlanes />
      
      {/* Camera Controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
        autoRotate
        autoRotateSpeed={0.2}
      />
    </>
  );
}

// Loading Fallback
function SceneLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

// Main Background Component
export function AEBackground() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, ease: 'easeOut' }}
      className="fixed inset-0 z-0"
      style={{ background: 'radial-gradient(circle at 50% 50%, var(--surface-1) 0%, var(--bg) 100%)' }}
    >
      {/* Canvas Container */}
      <div className="absolute inset-0">
        <Suspense fallback={<SceneLoader />}>
          <Canvas
            camera={{
              position: [0, 0, 6],
              fov: 50,
              near: 0.1,
              far: 100
            }}
            style={{
              background: 'transparent',
              pointerEvents: 'none'
            }}
            dpr={[1, 2]}
            performance={{ min: 0.5 }}
          >
            <Scene />
          </Canvas>
        </Suspense>
      </div>
      
      {/* Noise Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-transparent to-transparent opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg)] via-transparent to-[var(--bg)] opacity-30" />
    </motion.div>
  );
}