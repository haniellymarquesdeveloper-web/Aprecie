import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";

function Field({ visible }) {
  if (!visible) return null;

  return (
    <>
      <color attach="background" args={["#87ceeb"]} />

      <mesh position={[2.2, -1.15, -8]}>
        <boxGeometry args={[22, 0.2, 20]} />
        <meshStandardMaterial color="#3fa34d" />
      </mesh>

      <mesh position={[6, 5, -10]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial color="#ffd54f" emissive="#ffd54f" />
      </mesh>
    </>
  );
}

function Door({ isOpen, onClick }) {
  const { rotation } = useSpring({
    rotation: isOpen ? [0, -1.35, 0] : [0, 0, 0],
    config: { tension: 120, friction: 18 },
  });

  return (
    <animated.group position={[1.6, -1, -3.75]} rotation={rotation}>
      <mesh position={[0.6, 1.25, 0]} onClick={onClick}>
        <boxGeometry args={[1.2, 2.5, 0.15]} />
        <meshStandardMaterial color="#5a2d12" />
      </mesh>

      <mesh position={[1.05, 1.25, 0.1]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial color="#d4af37" />
      </mesh>
    </animated.group>
  );
}

function CharacterModel() {
  return (
    <group>
      {/* corpo */}
      <mesh position={[0, 0.8, 0]}>
        <capsuleGeometry args={[0.35, 0.8, 8, 16]} />
        <meshStandardMaterial color="#4169e1" />
      </mesh>

      {/* cabeça */}
      <mesh position={[0, 1.55, 0]}>
        <sphereGeometry args={[0.32, 32, 32]} />
        <meshStandardMaterial color="#f2c6a0" />
      </mesh>

      {/* cabelo */}
      <mesh position={[0, 1.78, 0]}>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshStandardMaterial color="#3b2417" />
      </mesh>

      {/* braço esquerdo */}
      <mesh position={[-0.48, 0.85, 0]} rotation={[0, 0, -0.3]}>
        <capsuleGeometry args={[0.09, 0.55, 8, 16]} />
        <meshStandardMaterial color="#f2c6a0" />
      </mesh>

      {/* braço direito */}
      <mesh position={[0.48, 0.85, 0]} rotation={[0, 0, 0.3]}>
        <capsuleGeometry args={[0.09, 0.55, 8, 16]} />
        <meshStandardMaterial color="#f2c6a0" />
      </mesh>

      {/* perna esquerda */}
      <mesh position={[-0.15, 0.05, 0]}>
        <capsuleGeometry args={[0.1, 0.55, 8, 16]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>

      {/* perna direita */}
      <mesh position={[0.15, 0.05, 0]}>
        <capsuleGeometry args={[0.1, 0.55, 8, 16]} />
        <meshStandardMaterial color="#1f2937" />
      </mesh>
    </group>
  );
}

function CharacterController({ doorOpen }) {
  const characterRef = useRef();
  const keys = useRef({});

  useEffect(() => {
    const down = (e) => {
      keys.current[e.key.toLowerCase()] = true;
    };

    const up = (e) => {
      keys.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);

    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, []);

  useFrame((_, delta) => {
    if (!characterRef.current) return;

    const speed = 2.2;
    const pos = characterRef.current.position;

    let nextX = pos.x;
    let nextZ = pos.z;

    if (keys.current.w) nextZ -= speed * delta;
    if (keys.current.s) nextZ += speed * delta;
    if (keys.current.a) nextX -= speed * delta;
    if (keys.current.d) nextX += speed * delta;

    // limites da sala
    const insideRoom =
      nextX > -3.5 &&
      nextX < 3.5 &&
      nextZ > -3.4 &&
      nextZ < 3.4;

    // abertura da porta
    const nearDoor =
      nextX > 0.4 &&
      nextX < 1.8 &&
      nextZ <= -3.4;

    // se a porta estiver aberta, pode sair pela porta
    if (insideRoom || (doorOpen && nearDoor)) {
      pos.x = nextX;
      pos.z = nextZ;
    }

    // gira o boneco para a direção do movimento
    if (keys.current.w) characterRef.current.rotation.y = Math.PI;
    if (keys.current.s) characterRef.current.rotation.y = 0;
    if (keys.current.a) characterRef.current.rotation.y = -Math.PI / 2;
    if (keys.current.d) characterRef.current.rotation.y = Math.PI / 2;
  });

  return (
    <group ref={characterRef} position={[-2, -1, 0]}>
      <CharacterModel />
    </group>
  );
}

function Room({ isOpen, onDoorClick }) {
  return (
    <>
      <Field visible={isOpen} />

      <mesh position={[0, -1, 0]}>
        <boxGeometry args={[8, 0.2, 8]} />
        <meshStandardMaterial color="#bfa98a" />
      </mesh>

      <mesh position={[-2.4, 1, -4]}>
        <boxGeometry args={[3.2, 4, 0.2]} />
        <meshStandardMaterial color="#f2dfc6" />
      </mesh>

      <mesh position={[3.4, 1, -4]}>
        <boxGeometry args={[2.8, 4, 0.2]} />
        <meshStandardMaterial color="#f2dfc6" />
      </mesh>

      <mesh position={[1, 2.4, -4]}>
        <boxGeometry args={[1.6, 1.2, 0.2]} />
        <meshStandardMaterial color="#f2dfc6" />
      </mesh>

      <mesh position={[-4, 1, 0]}>
        <boxGeometry args={[0.2, 4, 8]} />
        <meshStandardMaterial color="#e8cfae" />
      </mesh>

      <CharacterController doorOpen={isOpen} />

      <Door isOpen={isOpen} onClick={onDoorClick} />
    </>
  );
}

export default function Scene() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Canvas camera={{ position: [0, 1.8, 6.5], fov: 48 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 6, 5]} intensity={1.5} />

      <Room isOpen={isOpen} onDoorClick={() => setIsOpen(true)} />

      <OrbitControls />
    </Canvas>
  );
}