import { Canvas } from "@react-three/fiber";

function Room() {
  return (
    <>
      {/* chão */}
      <mesh position={[0, -1, 0]}>
        <boxGeometry args={[8, 0.2, 8]} />
        <meshStandardMaterial color="#bfa98a" />
      </mesh>

      {/* parede fundo */}
      <mesh position={[0, 1, -4]}>
        <boxGeometry args={[8, 4, 0.2]} />
        <meshStandardMaterial color="#f2dfc6" />
      </mesh>

      {/* parede esquerda */}
      <mesh position={[-4, 1, 0]}>
        <boxGeometry args={[0.2, 4, 8]} />
        <meshStandardMaterial color="#e8cfae" />
      </mesh>

      {/* personagem (placeholder) */}
      <mesh position={[-2, -0.2, 0]}>
        <capsuleGeometry args={[0.35, 1.2, 8, 16]} />
        <meshStandardMaterial color="#5b7cfa" />
      </mesh>

      {/* porta */}
      <mesh position={[2.2, 0, -3.85]}>
        <boxGeometry args={[1.2, 2.5, 0.15]} />
        <meshStandardMaterial color="#6b3f1d" />
      </mesh>
    </>
  );
}

export default function Scene() {
  return (
    <Canvas camera={{ position: [0, 2, 7], fov: 50 }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 5, 4]} intensity={1} />

      <Room />
    </Canvas>
  );
}