"use client";

import * as THREE from "three";
import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Stage, Html } from "@react-three/drei";
import {
  Scanline,
  Pixelation,
  Noise,
  EffectComposer,
  ChromaticAberration,
  Vignette,
  Bloom,
} from "@react-three/postprocessing";
import Image from "next/image";
import Link from "next/link";
import { useSpring, animated } from "@react-spring/three";
import Home from "./pages/home/page";
// import { Projects } from "./pages/projects/page";

function Model({ isZoomed, setIsZoomed }) {
  const { scene } = useGLTF("/tv.glb");
  const group = useRef();

  const handleClick = (e) => {
    e.stopPropagation();
    if (!isZoomed) {
      setIsZoomed(true);
    }
  };

  return (
    <group ref={group} onClick={handleClick}>
      <primitive object={scene} />
      {isZoomed && (
        <Html
          transform
          position={[0, 0.31, 0.11]}
          rotation={[Math.PI, Math.PI, Math.PI]}
          scale={0.09}
        >
          {/* <Home /> */}
          <iframe src="https://www.example.com" title="website" height="150" width="240"></iframe>
        </Html>
      )}
    </group>
  );
}

function ParallaxEffect({ children, isZoomed }) {
  const { camera } = useThree();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const zoomedOutPosition = [0, 0, 1];
  const zoomedInPosition = [0, 0.03, 0.6];

  const zoomedOutTarget = [0, 0, 0];
  const zoomedInTarget = [0, 0.03, 0];

  const { cameraPosition, cameraTarget } = useSpring({
    cameraPosition: isZoomed
      ? [zoomedInPosition[0], zoomedInPosition[1], zoomedInPosition[2]]
      : [zoomedOutPosition[0], zoomedOutPosition[1], zoomedOutPosition[2]],
    cameraTarget: isZoomed
      ? [zoomedInTarget[0], zoomedInTarget[1], zoomedInTarget[2]]
      : [zoomedOutTarget[0], zoomedOutTarget[1], zoomedOutTarget[2]],
    config: {
      mass: 1,
      tension: 180,
      friction: 30,
    },
  });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame(() => {
    const [x, y, z] = cameraPosition.get();
    const target = cameraTarget.get();

    const parallaxStrength = isZoomed ? 0.005 : 0.03;
    camera.position.set(
      x + mousePosition.x * parallaxStrength,
      y + mousePosition.y * parallaxStrength,
      z
    );
    camera.lookAt(...target);
  });

  return <>{children}</>;
}

function App() {
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      .folder-item {
        position: relative;
      }
      .folder-label {
        opacity: 0;
        transform: translateY(-5px);
        transition: opacity 0.2s ease-in-out, transform 0.3s ease-out;
        position: absolute;
        bottom: -15px;
      }
      .folder-item:hover .folder-label {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="App w-full h-screen relative">
      <div
        className="scanline-overlay absolute inset-0 pointer-events-none z-10 opacity-80"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1) 1px, transparent 1px, transparent 2px)",
          backgroundSize: "100% 2px",
        }}
      />

      <Canvas
        className="canvas1"
        dpr={[1, 2]}
        camera={{ fov: 45, position: [0, 0, 1] }}
        onPointerMissed={(e) => {
          if (isZoomed && !e.defaultPrevented) {
            setIsZoomed(false);
          }
        }}
      >
        <color attach="background" args={["#101010"]} />
        <EffectComposer>
          <Noise opacity={0.02} />
          <Scanline density={2} opacity={0.1} />
          <Pixelation granularity={3} />
          <ChromaticAberration offset={[0.001, 0.002]} />
          <Vignette offset={0.5} darkness={0.3} eskil={false} />
          <Bloom intensity={0.1} luminanceThreshold={0.2} />
          <ParallaxEffect isZoomed={isZoomed}>
            <Stage environment={null} adjustCamera={false}>
              <Model isZoomed={isZoomed} setIsZoomed={setIsZoomed} />
            </Stage>
          </ParallaxEffect>
        </EffectComposer>
      </Canvas>
      {!isZoomed && (
        <div className="absolute bottom-10 left-0 right-0 text-center text-white opacity-70">
          Click on the TV!
        </div>
      )}
    </div>
  );
}

export default App;
