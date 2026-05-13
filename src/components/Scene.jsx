import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { useSpring, animated } from "@react-spring/three";

function Tree({ position, scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 2, 0]}>
        <cylinderGeometry args={[0.28, 0.35, 4, 10]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      <mesh position={[0, 4.3, 0]}>
        <sphereGeometry args={[1.45, 18, 18]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>

      <mesh position={[0, 5.2, 0]}>
        <sphereGeometry args={[1.1, 18, 18]} />
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
    [-36 * scale, 0, -42 * scale],
    [32 * scale, 0, 35 * scale],
  ];

  return (
    <>
      {treePositions.map((pos, index) => (
        <Tree key={index} position={pos} scale={1 + (index % 3) * 0.12} />
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

        <mesh position={[2.5 * scale, 1.6, 0.13]}>
          <sphereGeometry args={[0.09, 16, 16]} />
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
        <boxGeometry args={[0.25 * scale, 0.25, 1.2 * scale]} />
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
      <mesh position={[0, 0.85, 0]}>
        <capsuleGeometry args={[0.35, 0.8, 8, 16]} />
        <meshStandardMaterial color="#13a2ce" />
      </mesh>

      <mesh position={[0, 1.1, 0]}>
        <boxGeometry args={[0.8, 0.6, 0.5]} />
        <meshStandardMaterial color="#ff6b6b" />
      </mesh>

      <mesh position={[0, 1.55, 0]}>
        <sphereGeometry args={[0.32, 32, 32]} />
        <meshStandardMaterial color="#bd622e" />
      </mesh>

      <mesh position={[0, 1.78, -0.03]}>
        <sphereGeometry args={[0.34, 16, 16]} />
        <meshStandardMaterial color="#2d3436" />
      </mesh>

      <mesh position={[-0.11, 1.58, 0.3]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshStandardMaterial color="#111111" />
      </mesh>

      <mesh position={[0.11, 1.58, 0.3]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshStandardMaterial color="#111111" />
      </mesh>

      <mesh position={[0, 1.42, 0.32]}>
        <boxGeometry args={[0.12, 0.025, 0.025]} />
        <meshStandardMaterial color="#e17055" />
      </mesh>

      <group ref={leftArmRef} position={[-0.48, 0.88, 0]} rotation={[0, 0, -0.25]}>
        <mesh>
          <capsuleGeometry args={[0.09, 0.55, 8, 16]} />
          <meshStandardMaterial color="#bd622e" />
        </mesh>
      </group>

      <group ref={rightArmRef} position={[0.48, 0.88, 0]} rotation={[0, 0, 0.25]}>
        <mesh>
          <capsuleGeometry args={[0.09, 0.55, 8, 16]} />
          <meshStandardMaterial color="#bd622e" />
        </mesh>
      </group>

      <group ref={leftLegRef} position={[-0.15, 0.08, 0]}>
        <mesh>
          <capsuleGeometry args={[0.1, 0.55, 8, 16]} />
          <meshStandardMaterial color="#2d3436" />
        </mesh>
      </group>

      <group ref={rightLegRef} position={[0.15, 0.08, 0]}>
        <mesh>
          <capsuleGeometry args={[0.1, 0.55, 8, 16]} />
          <meshStandardMaterial color="#2d3436" />
        </mesh>
      </group>
    </group>
  );
}

function CharacterController({ doorOpen, characterRef, scale = 1, mobileControls }) {
  const keys = useRef({});
  const [isWalking, setIsWalking] = useState(false);
  const walkingRef = useRef(false);

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

    const controls = mobileControls || {
      forward: false,
      back: false,
      left: false,
      right: false,
    };

    const speed = keys.current.shift ? 6 : 4;
    const pos = characterRef.current.position;

    let nextX = pos.x;
    let nextZ = pos.z;

    const moveForward = keys.current.w || controls.forward;
    const moveBack = keys.current.s || controls.back;
    const moveLeft = keys.current.a || controls.left;
    const moveRight = keys.current.d || controls.right;

    const walking = Boolean(moveForward || moveBack || moveLeft || moveRight);

    if (walking !== walkingRef.current) {
      walkingRef.current = walking;
      setIsWalking(walking);
    }

    if (moveForward) nextZ -= speed * delta;
    if (moveBack) nextZ += speed * delta;
    if (moveLeft) nextX -= speed * delta;
    if (moveRight) nextX += speed * delta;

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
    }

    if (moveForward) characterRef.current.rotation.y = Math.PI;
    if (moveBack) characterRef.current.rotation.y = 0;
    if (moveLeft) characterRef.current.rotation.y = -Math.PI / 2;
    if (moveRight) characterRef.current.rotation.y = Math.PI / 2;
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
    if (!controlsRef.current || !target.current) return;

    const character = target.current.position;

    if (cameraMode === "follow") {
      const isInside =
        character.x > -6.7 * scale &&
        character.x < 6.7 * scale &&
        character.z > -7.4 * scale &&
        character.z < 6.7 * scale;

      const desiredPosition = isInside
        ? [character.x, character.y + 3.1, character.z + 5.5]
        : [character.x, character.y + 5, character.z + 10];

      state.camera.position.x += (desiredPosition[0] - state.camera.position.x) * 0.08;
      state.camera.position.y += (desiredPosition[1] - state.camera.position.y) * 0.08;
      state.camera.position.z += (desiredPosition[2] - state.camera.position.z) * 0.08;

      controlsRef.current.target.set(character.x, character.y + 1, character.z);
    }

    controlsRef.current.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableRotate={true}
      enableZoom={true}
      enableDamping={true}
      dampingFactor={0.05}
      minDistance={4}
      maxDistance={18}
      minPolarAngle={0.2}
      maxPolarAngle={Math.PI / 2.05}
    />
  );
}

function Room({ isOpen, onDoorClick, characterRef, mobileControls }) {
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

      <Sofa scale={SCALE} />
      <Television scale={SCALE} />
      <Kitchen scale={SCALE} />
      <Chandelier />

      <CharacterController
        doorOpen={isOpen}
        characterRef={characterRef}
        scale={SCALE}
        mobileControls={mobileControls}
      />

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
            Clique na porta ou toque em Abrir porta
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
              fontSize: "22px",
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
  const [cameraMode, setCameraMode] = useState("follow");
  const [mobileControls, setMobileControls] = useState({
    forward: false,
    back: false,
    left: false,
    right: false,
  });

  const characterRef = useRef();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === "c") {
        setCameraMode((prev) => (prev === "follow" ? "free" : "follow"));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const pressButton = (direction, value) => {
    setMobileControls((prev) => ({
      ...prev,
      [direction]: value,
    }));
  };

  const stopAllMovement = () => {
    setMobileControls({
      forward: false,
      back: false,
      left: false,
      right: false,
    });
  };

  const controlButtonStyle = {
    width: "58px",
    height: "58px",
    borderRadius: "50%",
    border: "none",
    background: "rgba(0,0,0,0.65)",
    color: "white",
    fontSize: "24px",
    fontWeight: "bold",
    touchAction: "none",
    userSelect: "none",
  };

  const actionButtonStyle = {
    padding: "14px 18px",
    borderRadius: "16px",
    border: "none",
    background: "rgba(0,0,0,0.72)",
    color: "white",
    fontWeight: "bold",
    fontSize: "14px",
    touchAction: "manipulation",
  };

  const mobileButtonEvents = (direction) => ({
    onPointerDown: (e) => {
      e.preventDefault();
      e.stopPropagation();
      pressButton(direction, true);
    },
    onPointerUp: (e) => {
      e.preventDefault();
      e.stopPropagation();
      pressButton(direction, false);
    },
    onPointerLeave: () => pressButton(direction, false),
    onPointerCancel: () => pressButton(direction, false),
  });

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
        touchAction: "none",
      }}
      onPointerUp={stopAllMovement}
      onPointerCancel={stopAllMovement}
    >
      <Canvas camera={{ position: [0, 6, 14], fov: 45 }}>
        <color attach="background" args={["#65d2fd"]} />

        <ambientLight intensity={0.75} />
        <directionalLight position={[8, 12, 6]} intensity={1.5} />

        <Room
          isOpen={isOpen}
          onDoorClick={() => setIsOpen((prev) => !prev)}
          characterRef={characterRef}
          mobileControls={mobileControls}
        />

        <CameraController target={characterRef} cameraMode={cameraMode} scale={2.5} />
      </Canvas>

      <div
        style={{
          position: "absolute",
          left: "18px",
          bottom: "28px",
          display: "grid",
          gridTemplateColumns: "58px 58px 58px",
          gridTemplateRows: "58px 58px",
          gap: "9px",
          zIndex: 100,
        }}
      >
        <div />

        <button style={controlButtonStyle} {...mobileButtonEvents("forward")}>
          ↑
        </button>

        <div />

        <button style={controlButtonStyle} {...mobileButtonEvents("left")}>
          ←
        </button>

        <button style={controlButtonStyle} {...mobileButtonEvents("back")}>
          ↓
        </button>

        <button style={controlButtonStyle} {...mobileButtonEvents("right")}>
          →
        </button>
      </div>

      <div
        style={{
          position: "absolute",
          right: "18px",
          bottom: "32px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          zIndex: 100,
        }}
      >
        <button style={actionButtonStyle} onClick={() => setIsOpen((prev) => !prev)}>
          {isOpen ? "Fechar porta" : "Abrir porta"}
        </button>

        <button
          style={actionButtonStyle}
          onClick={() =>
            setCameraMode((prev) => (prev === "follow" ? "free" : "follow"))
          }
        >
          {cameraMode === "follow" ? "Câmera Seguir" : "Câmera Livre"}
        </button>
      </div>
    </div>
  );
}
