import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function ParticleCloud() {
  const pointsRef = useRef(null);
  const positions = useMemo(() => {
    const count = 380;
    const values = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      const radius = 2.4 + Math.random() * 3.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      values[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      values[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.62;
      values[i * 3 + 2] = radius * Math.cos(phi);
    }

    return values;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.035 + state.pointer.x * 0.12;
    pointsRef.current.rotation.x = state.pointer.y * 0.08;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.029}
        color="#f5c451"
        transparent
        opacity={0.82}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function NeuralLines() {
  const lineRef = useRef(null);
  const positions = useMemo(() => {
    const values = [];
    const segments = 44;

    for (let i = 0; i < segments; i += 1) {
      const a = new THREE.Vector3(
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 3.6,
        (Math.random() - 0.5) * 5.2,
      );
      const b = a
        .clone()
        .add(new THREE.Vector3((Math.random() - 0.5) * 1.6, (Math.random() - 0.5) * 1.1, (Math.random() - 0.5) * 1.6));
      values.push(a.x, a.y, a.z, b.x, b.y, b.z);
    }

    return new Float32Array(values);
  }, []);

  useFrame((state) => {
    if (!lineRef.current) return;
    lineRef.current.rotation.y = state.clock.getElapsedTime() * -0.025;
    lineRef.current.position.x = state.pointer.x * 0.22;
    lineRef.current.position.y = state.pointer.y * 0.12;
  });

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <lineBasicMaterial color="#38bdf8" transparent opacity={0.24} blending={THREE.AdditiveBlending} />
    </lineSegments>
  );
}

function EnergyCore() {
  const groupRef = useRef(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.24 + state.pointer.x * 0.24;
    groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.18 + state.pointer.y * 0.14;
  });

  return (
    <group ref={groupRef} position={[1.55, 0.05, 0]}>
      <mesh>
        <icosahedronGeometry args={[0.98, 2]} />
        <meshStandardMaterial
          color="#171006"
          emissive="#f5c451"
          emissiveIntensity={0.46}
          roughness={0.24}
          metalness={0.78}
          transparent
          opacity={0.86}
        />
      </mesh>
      {[1.38, 1.78, 2.16].map((radius, index) => (
        <mesh key={radius} rotation={[Math.PI / 2 + index * 0.36, index * 0.18, 0]}>
          <torusGeometry args={[radius, 0.008 + index * 0.004, 8, 48]} />
          <meshBasicMaterial
            color={["#f5c451", "#38bdf8", "#e879f9"][index]}
            transparent
            opacity={index === 2 ? 0.18 : 0.3}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

export function HeroScene() {
  return (
    <Canvas
      className="h-full w-full"
      dpr={1}
      camera={{ position: [0, 0, 7], fov: 52 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance", stencil: false }}
      performance={{ min: 0.6 }}
    >
      <fog attach="fog" args={["#030508", 6.5, 13]} />
      <ambientLight intensity={0.72} />
      <pointLight position={[3, 2.2, 3.5]} intensity={14} color="#f5c451" distance={8} />
      <pointLight position={[-4, -2, 3]} intensity={8} color="#a78bfa" distance={10} />
      <ParticleCloud />
      <NeuralLines />
      <EnergyCore />
    </Canvas>
  );
}
