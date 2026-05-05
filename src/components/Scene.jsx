import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";

function Field({ visible }) {
  if (!visible) return null;

  return (
    <>
      <mesh position={[2.2, -1.15, -25]}>
        <boxGeometry args={[180, 0.2, 180]} />
        <meshStandardMaterial color="#1daf31" />
      </mesh>

      <mesh position={[10, 19, -40]}>
        <sphereGeometry args={[4, 62, 62]} />
        <meshStandardMaterial color="#ecb500" emissive="#e7ff0e" />
      </mesh>
    </>
  );
}

function Door({ isOpen, onClick }) {
  const { rotation } = useSpring({
    rotation: isOpen ? [0, -1.6, 0] : [0, 0, 0],
    config: { tension: 120, friction: 18 },
  });

  return (
    <animated.group position={[0, -1, -7.75]} rotation={rotation}>
      <mesh position={[0.4, 1.8, 0.39]} onClick={onClick}>
        <boxGeometry args={[3, 3.8, 0.18]} />
        <meshStandardMaterial color="#5a2d12" />
      </mesh>

      <mesh position={[1.2, 1.6, 0.35]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#ceca00" />
      </mesh>
    </animated.group>
  );
}

function Sofa() {
  return (
    <group position={[0.9, -0.55, 1]}>
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[4.6, 0.7, 1.2]} />
        <meshStandardMaterial color="#5a2d12" />
      </mesh>
      <mesh position={[0, 0.9, 0.55]}>
        <boxGeometry args={[3.9, 1, 0.4]} />
        <meshStandardMaterial color="#5a2d12" />
      </mesh>
      <mesh position={[-2, 0.65, 0]}>
        <boxGeometry args={[0.3, 0.8, 1.3]} />
        <meshStandardMaterial color="#5a2d12" />
      </mesh>
      <mesh position={[2, 0.65, 0]}>
        <boxGeometry args={[0.3, 0.8, 1.3]} />
        <meshStandardMaterial color="#5a2d12" />
      </mesh>
    </group>
  );
}

function Television() {
  return (
    <group position={[5.8, 0.2, -1]}>
      <mesh position={[0, 1.4, 0]}>
        <boxGeometry args={[0.18, 1.8, 3]} />
        <meshStandardMaterial color="#111111" />
      </mesh>

      <mesh position={[-0.11, 1.4, 0]}>
        <boxGeometry args={[0.05, 1.45, 2.55]} />
        <meshStandardMaterial color="#128acf" />
      </mesh>

      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[0.25, 0.25, 1.2]} />
        <meshStandardMaterial color="#111111" />
      </mesh>
    </group>
  );
}

function Kitchen() {
  return (
    <group position={[4.4, -0.8, 4.6]}>
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[4.6, 0.9, 0.8]} />
        <meshStandardMaterial color="#e8cfae" />
      </mesh>

      <mesh position={[-1.6, 1.15, 0]}>
        <boxGeometry args={[1.1, 0.12, 0.6]} />
        <meshStandardMaterial color="#111111" />
      </mesh>

      <mesh position={[1.4, 1.05, 0]}>
        <boxGeometry args={[1.2, 0.18, 0.65]} />
        <meshStandardMaterial color="#57504e" />
      </mesh>

      <mesh position={[0, 1.6, 0.05]}>
        <boxGeometry args={[4.6, 0.7, 0.45]} />
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

function SecondFloor() {
  return (
    <group>
      <mesh position={[0, 3.05, 1]}>
        <boxGeometry args={[14, 0.22, 10]} />
        <meshStandardMaterial color="#ffbc2d" />
      </mesh>

      <mesh position={[-3.5, 4.6, 1]}>
        <boxGeometry args={[0.18, 3, 10]} />
        <meshStandardMaterial color="#e8cfae" />
      </mesh>

      <mesh position={[3.5, 4.6, 1]}>
        <boxGeometry args={[0.18, 3, 10]} />
        <meshStandardMaterial color="#e8cfae" />
      </mesh>

      <mesh position={[0, 4.6, 1]}>
        <boxGeometry args={[0.18, 3, 10]} />
        <meshStandardMaterial color="#e8cfae" />
      </mesh>

      <mesh position={[-5.2, 3.45, 1]}>
        <boxGeometry args={[1.5, 0.45, 2.2]} />
        <meshStandardMaterial color="#128acf" />
      </mesh>

      <mesh position={[5.2, 3.45, 1]}>
        <boxGeometry args={[1.5, 0.45, 2.2]} />
        <meshStandardMaterial color="#128acf" />
      </mesh>

      <mesh position={[-5.2, 4, 0.2]}>
        <boxGeometry args={[1.4, 0.4, 1.6]} />
        <meshStandardMaterial color="#cfa076" />
      </mesh>

      <mesh position={[5.2, 4, 0.2]}>
        <boxGeometry args={[1.4, 0.4, 1.6]} />
        <meshStandardMaterial color="#cfa076" />
      </mesh>
    </group>
  );
}

function Stairs() {
  const steps = [];

  for (let i = 0; i < 12; i++) {
    steps.push(
      <mesh key={i} position={[-5.7, -0.8 + i * 0.32, 5.2 - i * 0.42]}>
        <boxGeometry args={[1.6, 0.2, 0.5]} />
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
      <mesh position={[0, 0.85, 0]}>
        <capsuleGeometry args={[0.35, 0.8, 8, 16]} />
        <meshStandardMaterial color="#13a2ce" />
      </mesh>

      <mesh position={[0, 1.55, 0]}>
        <sphereGeometry args={[0.32, 32, 32]} />
        <meshStandardMaterial color="#bd622e" />
      </mesh>

      <mesh position={[0, 1.82, -0.02]}>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      <mesh position={[-0.11, 1.58, 0.3]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      <mesh position={[0.11, 1.58, 0.3]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      <mesh ref={leftArmRef} position={[-0.48, 0.85, 0]} rotation={[0, 0, -0.3]}>
        <capsuleGeometry args={[0.09, 0.55, 8, 16]} />
        <meshStandardMaterial color="#bd622e" />
      </mesh>

      <mesh ref={rightArmRef} position={[0.48, 0.85, 0]} rotation={[0, 0, 0.3]}>
        <capsuleGeometry args={[0.09, 0.55, 8, 16]} />
        <meshStandardMaterial color="#bd622e" />
      </mesh>

      <mesh ref={leftLegRef} position={[-0.15, 0.08, 0]}>
        <capsuleGeometry args={[0.1, 0.55, 8, 16]} />
        <meshStandardMaterial color="#bd622e" />
      </mesh>

      <mesh ref={rightLegRef} position={[0.15, 0.08, 0]}>
        <capsuleGeometry args={[0.1, 0.55, 8, 16]} />
        <meshStandardMaterial color="#bd622e" />
      </mesh>
    </group>
  );
}

function CharacterController({ doorOpen, characterRef }) {
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

    setIsWalking(Boolean(walking));

    if (keys.current.w) nextZ -= speed * delta;
    if (keys.current.s) nextZ += speed * delta;
    if (keys.current.a) nextX -= speed * delta;
    if (keys.current.d) nextX += speed * delta;

    const insideHouse =
      nextX > -6.7 &&
      nextX < 6.7 &&
      nextZ > -7.4 &&
      nextZ < 6.7;

    const doorPassage =
      doorOpen &&
      nextX > -0.2 &&
      nextX < 2.1 &&
      nextZ > -10 &&
      nextZ < -7.1;

    const outsideField =
      doorOpen &&
      nextX > -80 &&
      nextX < 80 &&
      nextZ > -85 &&
      nextZ < -9.5;

    if (insideHouse || doorPassage || outsideField) {
      pos.x = nextX;
      pos.z = nextZ;

      const onStairs =
        pos.x > -6.6 &&
        pos.x < -4.7 &&
        pos.z > 0.4 &&
        pos.z < 5.4;

      if (onStairs) {
        const progress = (5.4 - pos.z) / 5;
        const stairHeight = -1 + progress * 4.05;
        pos.y += (stairHeight - pos.y) * 0.15;
      } else {
        const isSecondFloor =
          pos.y > 1.3 &&
          pos.x > -6.7 &&
          pos.x < 6.7 &&
          pos.z > -7.4 &&
          pos.z < 6.7;

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
    <group ref={characterRef} position={[-2, -1, 1]}>
      <CharacterModel isWalking={isWalking} />
    </group>
  );
}

function CameraController({ target }) {
  const controlsRef = useRef();

  useFrame(() => {
    if (!controlsRef.current || !target.current) return;

    const pos = target.current.position;

    controlsRef.current.target.lerp(
      {
        x: pos.x,
        y: pos.y + 1.2,
        z: pos.z,
      },
      0.08
    );

    controlsRef.current.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableRotate={true}
      enableZoom={true}
      minDistance={5}
      maxDistance={18}
      minPolarAngle={0.35}
      maxPolarAngle={Math.PI / 2.15}
    />
  );
}

function Room({ isOpen, onDoorClick, characterRef }) {
  return (
    <>
      <Field visible={isOpen} />

      <mesh position={[0, -1, 0]}>
        <boxGeometry args={[14, 0.2, 15]} />
        <meshStandardMaterial color="#ffbc2d" />
      </mesh>

      <mesh position={[-7, 1.4, 0]}>
        <boxGeometry args={[0.25, 4.8, 15]} />
        <meshStandardMaterial color="#e8cfae" />
      </mesh>

      <mesh position={[7, 1.4, 0]}>
        <boxGeometry args={[0.25, 4.8, 15]} />
        <meshStandardMaterial color="#e8cfae" />
      </mesh>

      <mesh position={[0, 1.4, 7.5]}>
        <boxGeometry args={[14, 4.8, 0.25]} />
        <meshStandardMaterial color="#e8cfae" />
      </mesh>

      <mesh position={[-3.8, 1.4, -7.5]}>
        <boxGeometry args={[6.2, 4.8, 0.25]} />
        <meshStandardMaterial color="#128acf" />
      </mesh>

      <mesh position={[4.2, 1.4, -7.5]}>
        <boxGeometry args={[5.4, 4.8, 0.25]} />
        <meshStandardMaterial color="#128acf" />
      </mesh>

      <mesh position={[0.6, 3.25, -7.5]}>
        <boxGeometry args={[2.7, 1.1, 0.25]} />
        <meshStandardMaterial color="#128acf" />
      </mesh>

      <mesh position={[0, 5.9, 0]}>
        <boxGeometry args={[14.4, 0.35, 15.4]} />
        <meshStandardMaterial color="#57504e" />
      </mesh>

      <SecondFloor />
      <Stairs />
      <Sofa />
      <Television />
      <Kitchen />
      <Chandelier />

      <CharacterController doorOpen={isOpen} characterRef={characterRef} />
      <Door isOpen={isOpen} onClick={onDoorClick} />

      {!isOpen && (
        <Html position={[0, 4.2, -2]} center>
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
        <Html position={[0, 6.6, -10]} center>
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
    </>
  );
}

export default function Scene() {
  const [isOpen, setIsOpen] = useState(false);
  const characterRef = useRef();

  return (
    <Canvas camera={{ position: [0, 6, 14], fov: 45 }}>
      <color attach="background" args={["#65d2fd"]} />

      <ambientLight intensity={0.75} />
      <directionalLight position={[8, 12, 6]} intensity={1.5} />

      <Room
        isOpen={isOpen}
        onDoorClick={() => setIsOpen((prev) => !prev)}
        characterRef={characterRef}
      />

      <CameraController target={characterRef} />
    </Canvas>
  );
}