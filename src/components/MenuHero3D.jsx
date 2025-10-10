// src/components/MenuHero3D.jsx
import React, { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, OrbitControls, ContactShadows } from '@react-three/drei';

// ===== Geometría: elipsoide con hendidura en “S” =====
function useCoffeeBeanGeometry() {
  return useMemo(() => {
    const g = new THREE.SphereGeometry(1, 128, 128);
    const pos = g.attributes.position;
    const n = pos.count;

    const sx = 1.25;  // largo
    const sy = 0.85;  // alto
    const sz = 0.8;   // ancho

    for (let i = 0; i < n; i++) {
      let x = pos.getX(i);
      let y = pos.getY(i);
      let z = pos.getZ(i);

      // Elipsoide base
      x *= sx; y *= sy; z *= sz;

      // Hendidura: centrada en Z≈0, con serpenteo sutil sobre X
      const sCurve = 0.18 * Math.sin(x * 1.6);
      const distToGroove = Math.abs(z + sCurve);
      const width = 0.22;
      const groove = Math.exp(-((distToGroove / width) ** 2));

      // Profundidad de la hendidura + “barriga” orgánica
      const depth = 0.38 * groove;
      const signY = Math.sign(y) || 1;
      y = signY * Math.max(0, Math.abs(y) - depth);

      const bulge = 0.06 * Math.cos((x / sx) * 1.2) * Math.cos((z / sz) * 1.2);
      y += bulge;

      // Suave taper en extremos
      const endTaper = Math.min(1, Math.abs(x) / (sx * 1.1));
      y *= (1 - 0.12 * endTaper);

      pos.setXYZ(i, x, y, z);
    }

    g.computeVertexNormals();
    return g;
  }, []);
}

function CoffeeBean({ onInteractChange }) {
  const geom = useCoffeeBeanGeometry();
  const ref = useRef();

  const [interacting, setInteracting] = useState(false);
  useEffect(() => { onInteractChange?.(interacting); }, [interacting, onInteractChange]);

  useFrame((_, dt) => {
    if (!ref.current || interacting) return;
    ref.current.rotation.y += 0.35 * dt;
    ref.current.rotation.x += 0.06 * dt;
  });

  const material = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#4a2b15'),
    roughness: 0.25,
    metalness: 0.1,
    clearcoat: 1.0,
    clearcoatRoughness: 0.12,
    sheen: 1.0,
    sheenRoughness: 0.6,
    sheenColor: new THREE.Color('#c58b55'),
    envMapIntensity: 1.2,
  }), []);

  return (
    <mesh
      ref={ref}
      geometry={geom}
      material={material}
      scale={0.98}
      rotation={[0.18, -0.4, 0]}
      onPointerDown={() => setInteracting(true)}
      onPointerUp={() => setInteracting(false)}
      onPointerOut={() => setInteracting(false)}
      castShadow
      receiveShadow
    />
  );
}

function Lights() {
  const { scene } = useThree();
  useEffect(() => { scene.background = null; }, [scene]);

  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight
        position={[4, 6, 6]}
        intensity={2.1}
        color={'#fff1d1'}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-5, 2, 3]} intensity={0.6} color={'#caa57a'} />
      <directionalLight position={[0, 1.2, -4]} intensity={0.85} color={'#bcd4ff'} />
    </>
  );
}

export default function MenuHero3D({ language = 'es' }) {
  const isMobile = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
  const [interacting, setInteracting] = useState(false);

  const labels = {
    es: 'Arrástrame • Gira el grano • Desliza para explorar',
    en: 'Drag me • Spin the bean • Scroll to explore',
  };

  // Cámara un poco más lejos para que el grano luzca más pequeño
  return (
    <div className="relative w-full h-[280px] sm:h-[320px] md:h-[360px]">
      <Canvas
        className="absolute inset-0"
        dpr={[1, 2]}
        shadows
        camera={{ position: [0, 0.6, 3.7], fov: 42 }}
        style={{ width: '100%', height: '100%', touchAction: 'none' }}
      >
        <Lights />
        <CoffeeBean onInteractChange={setInteracting} />

        <ContactShadows position={[0, -1.05, 0]} opacity={0.35} scale={7} blur={2.5} far={2} resolution={512} />
        <Environment preset="sunset" />

        {/* Controles: más sensible en móvil, sin pan/zoom */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.05}
          rotateSpeed={isMobile ? 3.0 : 1.8}
          minPolarAngle={0.35}
          maxPolarAngle={Math.PI - 0.35}
          onWheel={(e) => e?.stopPropagation?.()}
        />
      </Canvas>

      {/* Burbuja de ayuda */}
      <div
        className="
          pointer-events-none absolute left-1/2 -translate-x-1/2
          bottom-2 sm:bottom-3 max-w-[92%]
          rounded-full bg-white/90 backdrop-blur-xl
          px-3.5 py-1.5 text-center text-xs sm:text-sm font-semibold text-gray-800
          shadow-lg ring-1 ring-black/10
        "
      >
        {labels[language] || labels.es}
      </div>
    </div>
  );
}
