import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";

function Tree({ position }) {
  return (
    <group position={position}>
      {/* Trunk */}
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 4, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      {/* Leaves */}
      <mesh position={[0, 4.5, 0]}>
        <sphereGeometry args={[1.5, 16, 16]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>
      <mesh position={[0, 5.5, 0]}>
        <sphereGeometry args={[1.2, 16, 16]} />
        <meshStandardMaterial color="#32CD32" />
      </mesh>
    </group>
  );
}

function Trees({ scale = 1 }) {
  const treePositions = [
    [-20 * scale, 0, -30 * scale],
    [25 * scale, 0, -35 * scale],
    [-30 * scale, 0, 20 * scale],
    [35 * scale, 0, 25 * scale],
    [0, 0, -50 * scale],
    [-40 * scale, 0, -10 * scale],
    [40 * scale, 0, -15 * scale],
    [-15 * scale, 0, 40 * scale],
    [20 * scale, 0, 45 * scale],
    [-35 * scale, 0, -40 * scale],
    [30 * scale, 0, 35 * scale],
    [10 * scale, 0, -55 * scale],
    [-25 * scale, 0, 50 * scale],
  ];

  return (
    <>
      {treePositions.map((pos, index) => (
        <Tree key={index} position={pos} />
      ))}
    </>
  );
}

function Field({ visible, scale = 1 }) {
  if (!visible) return null;

  return (
    <>
      <mesh position={[2.2 * scale, -1.15, -25 * scale]}>
        <boxGeometry args={[400 * scale, 0.2, 400 * scale]} />
        <meshStandardMaterial color="#1daf31" />
      </mesh>

      <mesh position={[10 * scale, 19, -40 * scale]}>
        <sphereGeometry args={[4, 62, 62]} />
        <meshStandardMaterial color="#ecb500" emissive="#e7ff0e" />
      </mesh>
    </>
  );
}

function Door({ isOpen, onClick, scale = 1 }) {
  const { rotation } = useSpring({
    rotation: isOpen ? [0, -Math.PI / 2, 0] : [0, 0, 0],
    config: { tension: 120, friction: 18 },
  });

  return (
    <group position={[-1.1 * scale, -1, -7.4 * scale]}>
      <animated.group rotation={rotation}>
        <mesh position={[1.5 * scale, 1.8, 0]} onClick={onClick}>
          <boxGeometry args={[3 * scale, 3.8, 0.18]} />
          <meshStandardMaterial color="#5a2d12" />
        </mesh>

        <mesh position={[2.5 * scale, 1.6, 0.12]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#ceca00" />
        </mesh>
      </animated.group>
    </group>
  );
}

function Sofa({ scale = 1 }) {
  return (
    <group position={[0.9 * scale, -0.55, 1 * scale]}>
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[4.6 * scale, 0.7, 1.2 * scale]} />
        <meshStandardMaterial color="#5a2d12" />
      </mesh>

      <mesh position={[0, 0.9, 0.55 * scale]}>
        <boxGeometry args={[3.9 * scale, 1, 0.4 * scale]} />
        <meshStandardMaterial color="#5a2d12" />
      </mesh>

      <mesh position={[-2 * scale, 0.65, 0]}>
        <boxGeometry args={[0.3 * scale, 0.8, 1.3 * scale]} />
        <meshStandardMaterial color="#5a2d12" />
      </mesh>

      <mesh position={[2 * scale, 0.65, 0]}>
        <boxGeometry args={[0.3 * scale, 0.8, 1.3 * scale]} />
        <meshStandardMaterial color="#5a2d12" />
      </mesh>
    </group>
  );
}

function Television({ scale = 1 }) {
  return (
    <group position={[5.8 * scale, 0.2, -1 * scale]}>
      <mesh position={[0, 1.4, 0]}>
        <boxGeometry args={[0.18 * scale, 1.8, 3 * scale]} />
        <meshStandardMaterial color="#111111" />
      </mesh>

      <mesh position={[-0.11 * scale, 1.4, 0]}>
        <boxGeometry args={[0.05 * scale, 1.45, 2.55 * scale]} />
        <meshStandardMaterial color="#aeb0b1" />
      </mesh>

      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[0.25 * scale, 0.25 * scale, 1.2 * scale]} />
        <meshStandardMaterial color="#111111" />
      </mesh>
    </group>
  );
}

function Kitchen({ scale = 1 }) {
  return (
    <group position={[4.4 * scale, -0.8, 4.6 * scale]}>
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[4.6 * scale, 0.9, 0.8 * scale]} />
        <meshStandardMaterial color="#e8cfae" />
      </mesh>

      <mesh position={[-1.6 * scale, 1.15, 0]}>
        <boxGeometry args={[1.1 * scale, 0.12, 0.6 * scale]} />
        <meshStandardMaterial color="#111111" />
      </mesh>

      <mesh position={[1.4 * scale, 1.05, 0]}>
        <boxGeometry args={[1.2 * scale, 0.18, 0.65 * scale]} />
        <meshStandardMaterial color="#57504e" />
      </mesh>

      <mesh position={[0, 1.6, 0.05 * scale]}>
        <boxGeometry args={[4.6 * scale, 0.7, 0.45 * scale]} />
        <meshStandardMaterial color="#e8cfae" />
      </mesh>
    </group>
  );
}

function Chandelier() {
  return (
    <group position={[0, 4.1, 0]}>
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.8, 16]} />
        <meshStandardMaterial color="#111111" />
      </mesh>

      <mesh position={[0, -0.15, 0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial color="#ecb500" emissive="#e7ff0e" />
      </mesh>

      <pointLight position={[0, -0.3, 0]} intensity={1.2} distance={9} />
    </group>
  );
}

function SecondFloor({ scale = 1 }) {
  return (
    <group>
      <mesh position={[0, 3.05, 1 * scale]}>
        <boxGeometry args={[14 * scale, 0.22, 10 * scale]} />
        <meshStandardMaterial color="#ffbc2d" />
      </mesh>

      <mesh position={[-3.5 * scale, 4.6, 1 * scale]}>
        <boxGeometry args={[0.18, 3, 10 * scale]} />
        <meshStandardMaterial color="#e8cfae" />
      </mesh>

      <mesh position={[3.5 * scale, 4.6, 1 * scale]}>
        <boxGeometry args={[0.18, 3, 10 * scale]} />
        <meshStandardMaterial color="#e8cfae" />
      </mesh>

      <mesh position={[0, 4.6, 1 * scale]}>
        <boxGeometry args={[0.18, 3, 10 * scale]} />
        <meshStandardMaterial color="#e8cfae" />
      </mesh>

      <mesh position={[-5.2 * scale, 3.45, 1 * scale]}>
        <boxGeometry args={[1.5 * scale, 0.45, 2.2 * scale]} />
        <meshStandardMaterial color="#128acf" />
      </mesh>

      <mesh position={[5.2 * scale, 3.45, 1 * scale]}>
        <boxGeometry args={[1.5 * scale, 0.45, 2.2 * scale]} />
        <meshStandardMaterial color="#128acf" />
      </mesh>

      <mesh position={[-5.2 * scale, 4, 0.2 * scale]}>
        <boxGeometry args={[1.4 * scale, 0.4, 1.6 * scale]} />
        <meshStandardMaterial color="#cfa076" />
      </mesh>

      <mesh position={[5.2 * scale, 4, 0.2 * scale]}>
        <boxGeometry args={[1.4 * scale, 0.4, 1.6 * scale]} />
        <meshStandardMaterial color="#cfa076" />
      </mesh>
    </group>
  );
}

function Stairs({ scale = 1 }) {
  const steps = [];

  for (let i = 0; i < 12; i++) {
    steps.push(
      <mesh key={i} position={[-5.7 * scale, -0.8 + i * 0.32, (5.2 - i * 0.42) * scale]}>
        <boxGeometry args={[1.6 * scale, 0.2, 0.5 * scale]} />
        <meshStandardMaterial color="#5a2d12" />
      </mesh>
    );
  }

  return <group>{steps}</group>;
}

function CharacterModel({ isWalking }) {
  const bodyRef = useRef();
  const leftLegRef = useRef();
  const rightLegRef = useRef();
  const leftArmRef = useRef();
  const rightArmRef = useRef();

  useFrame(() => {
    const time = performance.now() * 0.008;

    if (!bodyRef.current) return;

    if (isWalking) {
      bodyRef.current.rotation.z = Math.sin(time) * 0.04;
      leftLegRef.current.rotation.x = Math.sin(time) * 0.5;
      rightLegRef.current.rotation.x = -Math.sin(time) * 0.5;
      leftArmRef.current.rotation.x = -Math.sin(time) * 0.4;
      rightArmRef.current.rotation.x = Math.sin(time) * 0.4;
    } else {
      bodyRef.current.rotation.z = 0;
      leftLegRef.current.rotation.x = 0;
      rightLegRef.current.rotation.x = 0;
      leftArmRef.current.rotation.x = 0;
      rightArmRef.current.rotation.x = 0;
    }
  });

  return (
    <group ref={bodyRef}>
      {/* Body */}
      <mesh position={[0, 0.85, 0]}>
        <capsuleGeometry args={[0.35, 0.8, 8, 16]} />
        <meshStandardMaterial color="#13a2ce" />
      </mesh>

      {/* Shirt */}
      <mesh position={[0, 1.1, 0]}>
        <boxGeometry args={[0.8, 0.6, 0.5]} />
        <meshStandardMaterial color="#ff6b6b" />
      </mesh>

      {/* Head */}
      <mesh position={[0, 1.55, 0]}>
        <sphereGeometry args={[0.32, 32, 32]} />
        <meshStandardMaterial color="#bd622e" />
      </mesh>

      {/* Hair */}
      <mesh position={[0, 1.75, 0]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color="#2d3436" />
      </mesh>

      {/* Face */}
      <mesh position={[0, 1.82, -0.02]}>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.11, 1.58, 0.3]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshStandardMaterial color="#111111" />
      </mesh>

      <mesh position={[0.11, 1.58, 0.3]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshStandardMaterial color="#111111" />
      </mesh>

      {/* Eyebrows */}
      <mesh position={[-0.11, 1.65, 0.28]}>
        <boxGeometry args={[0.06, 0.01, 0.02]} />
        <meshStandardMaterial color="#2d3436" />
      </mesh>

      <mesh position={[0.11, 1.65, 0.28]}>
        <boxGeometry args={[0.06, 0.01, 0.02]} />
        <meshStandardMaterial color="#2d3436" />
      </mesh>

      {/* Nose */}
      <mesh position={[0, 1.45, 0.32]}>
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshStandardMaterial color="#bd622e" />
      </mesh>

      {/* Mouth */}
      <mesh position={[0, 1.35, 0.3]}>
        <boxGeometry args={[0.05, 0.01, 0.02]} />
        <meshStandardMaterial color="#e17055" />
      </mesh>

      {/* Left Arm */}
      <group ref={leftArmRef} position={[-0.48, 0.85, 0]} rotation={[0, 0, -0.3]}>
        <mesh position={[0, 0, 0]}>
          <capsuleGeometry args={[0.09, 0.55, 8, 16]} />
          <meshStandardMaterial color="#bd622e" />
        </mesh>
        <mesh position={[0, -0.55, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#bd622e" />
        </mesh>
      </group>

      {/* Right Arm */}
      <group ref={rightArmRef} position={[0.48, 0.85, 0]} rotation={[0, 0, 0.3]}>
        <mesh position={[0, 0, 0]}>
          <capsuleGeometry args={[0.09, 0.55, 8, 16]} />
          <meshStandardMaterial color="#bd622e" />
        </mesh>
        <mesh position={[0, -0.55, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#bd622e" />
        </mesh>
      </group>

      {/* Left Leg */}
      <group ref={leftLegRef} position={[-0.15, 0.08, 0]}>
        <mesh position={[0, 0, 0]}>
          <capsuleGeometry args={[0.1, 0.55, 8, 16]} />
          <meshStandardMaterial color="#2d3436" />
        </mesh>
        <mesh position={[0, -0.55, 0.1]}>
          <boxGeometry args={[0.15, 0.05, 0.3]} />
          <meshStandardMaterial color="#111111" />
        </mesh>
      </group>

      {/* Right Leg */}
      <group ref={rightLegRef} position={[0.15, 0.08, 0]}>
        <mesh position={[0, 0, 0]}>
          <capsuleGeometry args={[0.1, 0.55, 8, 16]} />
          <meshStandardMaterial color="#2d3436" />
        </mesh>
        <mesh position={[0, -0.55, 0.1]}>
          <boxGeometry args={[0.15, 0.05, 0.3]} />
          <meshStandardMaterial color="#111111" />
        </mesh>
      </group>
    </group>
  );
}

function CharacterController({ doorOpen, characterRef, scale = 1 }) {
  const keys = useRef({});
  const [isWalking, setIsWalking] = useState(false);

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

    const speed = keys.current.shift ? 5 : 3;
    const pos = characterRef.current.position;

    let nextX = pos.x;
    let nextZ = pos.z;

    const walking =
      keys.current.w || keys.current.a || keys.current.s || keys.current.d;

    if (walking !== isWalking) {
      setIsWalking(Boolean(walking));
    }

    if (keys.current.w) nextZ -= speed * delta;
    if (keys.current.s) nextZ += speed * delta;
    if (keys.current.a) nextX -= speed * delta;
    if (keys.current.d) nextX += speed * delta;

    const insideHouse =
      nextX > -6.7 * scale &&
      nextX < 6.7 * scale &&
      nextZ > -7.4 * scale &&
      nextZ < 6.7 * scale;

    const doorPassage =
      doorOpen &&
      nextX > -1.1 * scale &&
      nextX < 2.4 * scale &&
      nextZ > -10 * scale &&
      nextZ < -7.1 * scale;

    const outsideField =
      doorOpen &&
      nextX > -180 &&
      nextX < 180 &&
      nextZ > -190 &&
      nextZ < -9.5;

    if (insideHouse || doorPassage || outsideField) {
      pos.x = nextX;
      pos.z = nextZ;

      const onStairs =
        pos.x > -6.6 * scale &&
        pos.x < -4.7 * scale &&
        pos.z > 0.4 * scale &&
        pos.z < 5.4 * scale;

      if (onStairs) {
        const progress = (5.4 * scale - pos.z) / (5 * scale);
        const stairHeight = -1 + progress * 4.05;
        pos.y += (stairHeight - pos.y) * 0.15;
      } else {
        const isSecondFloor =
          pos.y > 1.3 &&
          pos.x > -6.7 * scale &&
          pos.x < 6.7 * scale &&
          pos.z > -7.4 * scale &&
          pos.z < 6.7 * scale;

        const targetY = isSecondFloor ? 3.05 : -1;
        pos.y += (targetY - pos.y) * 0.08;
      }
    }

    if (keys.current.w) characterRef.current.rotation.y = Math.PI;
    if (keys.current.s) characterRef.current.rotation.y = 0;
    if (keys.current.a) characterRef.current.rotation.y = -Math.PI / 2;
    if (keys.current.d) characterRef.current.rotation.y = Math.PI / 2;
  });

  return (
    <group ref={characterRef} position={[-2 * scale, -1, 1 * scale]}>
      <CharacterModel isWalking={isWalking} />
    </group>
  );
}

function CameraController({ target, cameraMode, scale = 1 }) {
  const controlsRef = useRef();

  useFrame((state) => {
    if (!controlsRef.current) return;

    if (cameraMode === 'follow' && target.current) {
      const character = target.current.position;

      const isInside = character.x > -6.7 * scale && character.x < 6.7 * scale && character.z > -7.4 * scale && character.z < 6.7 * scale;

      const desiredPosition = isInside
        ? {
            x: character.x,
            y: character.y + 3,
            z: character.z + 5,
          }
        : {
            x: character.x,
            y: character.y + 5,
            z: character.z + 10,
          };

      state.camera.position.x +=
        (desiredPosition.x - state.camera.position.x) * 0.08;

      state.camera.position.y +=
        (desiredPosition.y - state.camera.position.y) * 0.08;

      state.camera.position.z +=
        (desiredPosition.z - state.camera.position.z) * 0.08;

      controlsRef.current.target.set(
        character.x,
        character.y + 1,
        character.z
      );
    }

    controlsRef.current.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={true}
      enableRotate={true}
      enableZoom={true}
      enableDamping={true}
      dampingFactor={0.05}
      minDistance={4}
      maxDistance={15}
      minPolarAngle={0}
      maxPolarAngle={Math.PI}
    />
  );
}

function Room({ isOpen, onDoorClick, characterRef, cameraMode }) {
  const SCALE = 2.5;
  return (
    <>
      <Field visible={isOpen} scale={SCALE} />
      <Trees scale={SCALE} />

      <mesh position={[0, -1, 0]}>
        <boxGeometry args={[14 * SCALE, 0.2, 15 * SCALE]} />
        <meshStandardMaterial color="#ffbc2d" />
      </mesh>

      <mesh position={[-7 * SCALE, 1.4, 0]}>
        <boxGeometry args={[0.25, 4.8, 15 * SCALE]} />
        <meshStandardMaterial color="#e8cfae" />
      </mesh>

      <mesh position={[7 * SCALE, 1.4, 0]}>
        <boxGeometry args={[0.25, 4.8, 15 * SCALE]} />
        <meshStandardMaterial color="#e8cfae" />
      </mesh>

      <mesh position={[0, 1.4, 7.5 * SCALE]}>
        <boxGeometry args={[14 * SCALE, 4.8, 0.25]} />
        <meshStandardMaterial color="#e8cfae" />
      </mesh>

      <mesh position={[-3.8 * SCALE, 1.4, -7.5 * SCALE]}>
        <boxGeometry args={[6.2 * SCALE, 4.8, 0.25]} />
        <meshStandardMaterial color="#128acf" />
      </mesh>

      <mesh position={[4.2 * SCALE, 1.4, -7.5 * SCALE]}>
        <boxGeometry args={[5.4 * SCALE, 4.8, 0.25]} />
        <meshStandardMaterial color="#128acf" />
      </mesh>

      <mesh position={[0.6 * SCALE, 3.25, -7.5 * SCALE]}>
        <boxGeometry args={[2.7 * SCALE, 1.1, 0.25]} />
        <meshStandardMaterial color="#128acf" />
      </mesh>

      <mesh position={[0, 5.9, 0]}>
        <boxGeometry args={[14 * SCALE, 0.35, 15 * SCALE]} />
        <meshStandardMaterial color="#57504e" />
      </mesh>

      <SecondFloor scale={SCALE} />
      <Stairs scale={SCALE} />
      <Sofa scale={SCALE} />
      <Television scale={SCALE} />
      <Kitchen scale={SCALE} />
      <Chandelier />

      <CharacterController doorOpen={isOpen} characterRef={characterRef} scale={SCALE} />
      <Door isOpen={isOpen} onClick={onDoorClick} scale={SCALE} />

      {!isOpen && (
        <Html position={[0, 4.2, -2 * SCALE]} center>
          <div
            style={{
              color: "white",
              background: "rgba(0,0,0,0.55)",
              padding: "10px 16px",
              borderRadius: "12px",
              fontFamily: "Arial",
              fontSize: "16px",
              whiteSpace: "nowrap",
            }}
          >
            Clique na porta para sair e apreciar a natureza
          </div>
        </Html>
      )}

      {isOpen && (
        <Html position={[0, 6.6, -10 * SCALE]} center>
          <div
            style={{
              color: "white",
              background: "rgba(0,0,0,0.35)",
              padding: "10px 20px",
              borderRadius: "14px",
              fontFamily: "Arial",
              fontSize: "24px",
              fontWeight: "bold",
              whiteSpace: "nowrap",
            }}
          >
            Aprecie a natureza ao seu redor e respire fundo
          </div>
        </Html>
      )}

      <Html position={[-6 * SCALE, 6, 7 * SCALE]} center>
        <div
          style={{
            color: "white",
            background: "rgba(0,0,0,0.7)",
            padding: "8px 12px",
            borderRadius: "8px",
            fontFamily: "Arial",
            fontSize: "14px",
          }}
        >
          Modo câmera: {cameraMode === 'follow' ? 'Seguir' : 'Livre'} (pressione C para alternar)
        </div>
      </Html>
    </>
  );
}

export default function Scene() {
  const [isOpen, setIsOpen] = useState(false);
  const [cameraMode, setCameraMode] = useState('follow');
  const characterRef = useRef();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === 'c') {
        setCameraMode(prev => prev === 'follow' ? 'free' : 'follow');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Canvas camera={{ position: [0, 6, 14], fov: 45 }}>
      <color attach="background" args={["#65d2fd"]} />

      <ambientLight intensity={0.75} />
      <directionalLight position={[8, 12, 6]} intensity={1.5} />

      <Room
        isOpen={isOpen}
        onDoorClick={() => setIsOpen((prev) => !prev)}
        characterRef={characterRef}
        cameraMode={cameraMode}
      />

      <CameraController target={characterRef} cameraMode={cameraMode} scale={2.5} />
    </Canvas>
  );
} 