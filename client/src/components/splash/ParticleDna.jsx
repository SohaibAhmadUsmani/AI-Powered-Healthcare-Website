import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const NODES = 30;
const RADIUS = 1.8;
const HEIGHT = 3.5;

const upVec = new THREE.Vector3(0, 1, 0);

function createParticleTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext("2d");
  const g = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.15, "rgba(255,255,255,0.3)");
  g.addColorStop(0.5, "rgba(255,255,255,0.08)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 32, 32);
  return new THREE.CanvasTexture(canvas);
}

function ParticleDna() {
  const groupRef = useRef();
  const timeRef = useRef(0);
  const textureRef = useRef(null);

  if (!textureRef.current) textureRef.current = createParticleTexture();

  const { neighborMap } = useMemo(() => {
    const pos = [];
    const map = [];
    for (let i = 0; i < NODES; i++) {
      const t = (i / NODES) * Math.PI * 2;
      const y = (i / (NODES - 1) - 0.5) * HEIGHT;
      const s1 = new THREE.Vector3(RADIUS * Math.cos(t), y, RADIUS * Math.sin(t));
      const s2 = new THREE.Vector3(RADIUS * Math.cos(t + Math.PI), y, RADIUS * Math.sin(t + Math.PI));
      pos.push([s1, s2]);
      map.push({ s1, s2, idx: i });
    }
    return { nodePositions: pos, neighborMap: map };
  }, []);

  const ambientPositions = useMemo(() => {
    const count = 150;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 3 + Math.random() * 8;
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = Math.sin(a) * r;
    }
    return pos;
  }, []);

  const ambientColors = useMemo(() => {
    const count = 150;
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const isCyan = Math.random() < 0.6;
      col[i * 3] = isCyan ? 0.02 : 0.4;
      col[i * 3 + 1] = isCyan ? 0.71 : 0.22;
      col[i * 3 + 2] = isCyan ? 0.83 : 0.96;
    }
    return col;
  }, []);

  const orbitPositions = useMemo(() => {
    const count = 80;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = RADIUS * 1.2 + Math.random() * 1.5;
      const yOff = (Math.random() - 0.5) * HEIGHT * 0.8;
      pos[i * 3] = Math.cos(a) * r;
      pos[i * 3 + 1] = yOff;
      pos[i * 3 + 2] = Math.sin(a) * r;
    }
    return pos;
  }, []);

  const strand1Mat = useMemo(() => new THREE.MeshPhysicalMaterial({
    transparent: true, opacity: 0.45, roughness: 0.05, metalness: 0.0,
    clearcoat: 1.0, clearcoatRoughness: 0.08, color: "#06B6D4",
    envMapIntensity: 1.0, emissive: "#06B6D4", emissiveIntensity: 0.08,
    side: THREE.DoubleSide,
  }), []);

  const strand2Mat = useMemo(() => new THREE.MeshPhysicalMaterial({
    transparent: true, opacity: 0.35, roughness: 0.05, metalness: 0.0,
    clearcoat: 1.0, clearcoatRoughness: 0.12, color: "#8B5CF6",
    envMapIntensity: 0.8, emissive: "#8B5CF6", emissiveIntensity: 0.05,
    side: THREE.DoubleSide,
  }), []);

  const rungMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    transparent: true, opacity: 0.12, roughness: 0.2, metalness: 0,
    clearcoat: 0.3, color: "#94A3B8", emissive: "#06B6D4",
    emissiveIntensity: 0.03, side: THREE.DoubleSide,
  }), []);

  const sphereGeom = useMemo(() => new THREE.SphereGeometry(0.22, 24, 24), []);
  const rungGeom = useMemo(() => new THREE.CylinderGeometry(0.05, 0.05, 1, 6, 1), []);
  const backboneGeom = useMemo(() => new THREE.CylinderGeometry(0.04, 0.04, 1, 6, 1), []);

  useFrame((_, delta) => {
    timeRef.current += delta;
    const t = timeRef.current;

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.04;
      groupRef.current.position.y = Math.sin(t * 0.18) * 0.1;
      groupRef.current.scale.setScalar(1 + Math.sin(t * 0.22) * 0.004);
    }
  });

  return (
    <group ref={groupRef} scale={0.4}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[ambientPositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[ambientColors, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.05} sizeAttenuation transparent opacity={0.35}
          blending={THREE.AdditiveBlending} depthWrite={false}
          map={textureRef.current} vertexColors />
      </points>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[orbitPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.025} sizeAttenuation transparent opacity={0.12}
          blending={THREE.AdditiveBlending} depthWrite={false}
          color="#8B5CF6" map={textureRef.current} />
      </points>

      {neighborMap.map((n, i) => {
        const result = [];
        result.push(
          <mesh key={`s1-${i}`}
            geometry={sphereGeom} material={strand1Mat} position={n.s1} />,
          <mesh key={`s2-${i}`}
            geometry={sphereGeom} material={strand2Mat} position={n.s2} />
        );
        const mid = n.s1.clone().add(n.s2).multiplyScalar(0.5);
        const dir = n.s2.clone().sub(n.s1);
        const quat = new THREE.Quaternion().setFromUnitVectors(upVec, dir.clone().normalize());
        result.push(
          <mesh key={`rung-${i}`}
            geometry={rungGeom} material={rungMat} position={mid} quaternion={quat}
            scale={[1, dir.length(), 1]} />
        );
        if (i < NODES - 1) {
          const next = neighborMap[i + 1];
          const mkConn = (from, to, mat, k) => {
            const m = from.clone().add(to).multiplyScalar(0.5);
            const d = to.clone().sub(from);
            const q = new THREE.Quaternion().setFromUnitVectors(upVec, d.clone().normalize());
            return (
              <mesh key={k}
                geometry={backboneGeom} position={m} quaternion={q} scale={[1, d.length(), 1]}>
                <primitive object={mat} attach="material" />
              </mesh>
            );
          };
          result.push(mkConn(n.s1, next.s1, strand1Mat, `b1-${i}`));
          result.push(mkConn(n.s2, next.s2, strand2Mat, `b2-${i}`));
        }
        return result;
      })}
    </group>
  );
}

export default ParticleDna;
