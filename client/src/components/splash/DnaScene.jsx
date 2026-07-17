import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import ParticleDna from "./ParticleDna";

function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 40 }}
      gl={{
        alpha: true,
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.0,
      }}
      onCreated={(state) => {
        state.gl.setClearColor(0x000000, 0);
      }}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        background: "transparent",
      }}
    >
      <ambientLight intensity={0.2} />
      <directionalLight position={[3, 4, 5]} intensity={0.5} color="#06B6D4" />
      <directionalLight position={[-3, -2, 4]} intensity={0.3} color="#8B5CF6" />

      <ParticleDna />

      <Environment>
        <Lightformer form="ring" color="#06B6D4" intensity={0.5} position={[0, 0, -6]} scale={8} />
        <Lightformer form="ring" color="#8B5CF6" intensity={0.3} position={[0, 0, 6]} scale={8} />
        <Lightformer form="rect" color="#FFFFFF" intensity={0.1} position={[0, 4, 0]} scale={[8, 8]} />
        <Lightformer form="rect" color="#06B6D4" intensity={0.06} position={[4, 0, 0]} scale={[5, 5]} />
        <Lightformer form="rect" color="#8B5CF6" intensity={0.04} position={[-4, 0, 0]} scale={[5, 5]} />
      </Environment>
    </Canvas>
  );
}

export default Scene;
