"use client";

import * as THREE from "three";
import React, { useRef, useState, useEffect, useMemo } from "react";
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
import { useSpring } from "@react-spring/three";

import Home from "./pages/home";
import Projects from "./pages/projects";
import CodeProjects from "./pages/codeProjects";
import GraphicDesignProjects from "./pages/graphicDesignProjects";
import MusicProjects from "./pages/musicProjects";
import ResearchProjects from "./pages/researchProjects"

function Model({
  isZoomed,
  setIsZoomed,
  currentPage,
  setCurrentPage,
}: {
  isZoomed: boolean;
  setIsZoomed: React.Dispatch<React.SetStateAction<boolean>>;
  currentPage: string;
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { scene } = useGLTF("/tv.glb");
  const group = useRef<THREE.Group | null>(null);

  interface HandleClickEvent extends React.MouseEvent<THREE.Group, MouseEvent> {
    nativeEvent: MouseEvent & { preventDefault: () => void };
  }

  const handleClick = (e: HandleClickEvent): void => {
    e.stopPropagation();
    e.nativeEvent.preventDefault();
    if (!isZoomed) {
      setIsZoomed(true);
    }
  };

  const renderPage = useMemo(() => {
    switch(currentPage) {
      case 'projects':
        return <Projects setCurrentPage={setCurrentPage} />;
      case 'code':
        return <CodeProjects setCurrentPage={setCurrentPage} />;
      case 'music':
        return <MusicProjects setCurrentPage={setCurrentPage} />;
      case 'graphicdesign':
        return <GraphicDesignProjects setCurrentPage={setCurrentPage} />;
      case 'research':
        return <ResearchProjects setCurrentPage={setCurrentPage} />;
      case 'home':
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  }, [currentPage, setCurrentPage]);

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
          {renderPage}
        </Html>
      )}
    </group>
  );
}

function ParallaxEffect({ children, isZoomed }: { children: React.ReactNode; isZoomed: boolean }) {
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
    interface MousePosition {
      x: number;
      y: number;
    }

    const handleMouseMove = (event: MouseEvent): void => {
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
    const [targetX, targetY, targetZ] = cameraTarget.get();

    const parallaxStrength = isZoomed ? 0.005 : 0.03;
    camera.position.set(
      x + mousePosition.x * parallaxStrength,
      y + mousePosition.y * parallaxStrength,
      z
    );
    camera.lookAt(targetX, targetY, targetZ);
  });

  return <>{children}</>;
}

function BetterPixelation({ isZoomed }: { isZoomed: boolean }) {
  const { viewport } = useThree();
  
  const granularity = React.useMemo(() => {
    const baseGranularity = Math.max(1, Math.floor(viewport.width * 0.25));
    const maxGranularity = 8;
    const clampedBase = Math.min(baseGranularity, maxGranularity);
    return isZoomed ? Math.max(clampedBase * 1.5, 4) : clampedBase;
  }, [viewport.width, isZoomed]);

  return <Pixelation granularity={granularity} />;
}

function App() {
  const [isZoomed, setIsZoomed] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [scanlinesEnabled, setScanlinesEnabled] = useState(true);
  const [showPerformanceTip, setShowPerformanceTip] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [effects, setEffects] = useState({
    scanlines: true,
    scanlinesOverlay: true,
    noise: true,
    chromaticAberration: true,
    vignette: true,
    bloom: true,
  });

  const toggleEffect = (effect: keyof typeof effects) => {
    setEffects(prev => ({ ...prev, [effect]: !prev[effect] }));
  };

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
      .effects-panel {
        max-height: 0;
        overflow: hidden;
        transition: max-height 0.3s ease-in-out;
      }
      .effects-panel-container:hover .effects-panel {
        max-height: 400px;
      }
      .performance-tip {
        opacity: 1;
        transition: opacity 0.3s ease-out;
      }
      .performance-tip.fade-out {
        opacity: 0;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => setShowPerformanceTip(false), 300);
    }, 3000);

    const handleUserInteraction = () => {
      setIsFadingOut(true);
      setTimeout(() => setShowPerformanceTip(false), 300);
    };

    window.addEventListener('click', handleUserInteraction);
    window.addEventListener('keydown', handleUserInteraction);
    window.addEventListener('mousemove', handleUserInteraction, { once: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
      window.removeEventListener('mousemove', handleUserInteraction);
    };
  }, []);

  return (
    <div className="App w-full h-screen relative">
      {effects.scanlinesOverlay && (
        <div
          className="scanline-overlay absolute inset-0 pointer-events-none z-10 opacity-80"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(0,0,0,0.1), rgba(0,0,0,0.1) 1px, transparent 1px, transparent 2px)",
            backgroundSize: "100% 2px",
          }}
        />
      )}

      {showPerformanceTip && (
        <div 
          className={`performance-tip absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 bitcount ${isFadingOut ? 'fade-out' : ''}`}
          style={{ imageRendering: 'pixelated' }}
        >
          <div 
            className="border-2 border-black rounded-sm p-4"
            style={{ background: '#fff' }}
          >
            <div className="flex items-center gap-2">
              <p className="text-black text-sm font-bold">
                If performance is low, turn effects off
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="absolute top-4 right-4 z-20 bitcount effects-panel-container" style={{ imageRendering: 'pixelated' }}>
        <div className="border-2 border-black rounded-sm overflow-hidden" style={{ background: 'transparent' }}>
          <button
            className="w-full px-4 py-2 border-b-2 border-black text-black font-extrabold text-sm hover:bg-gray-200 transition-colors cursor-default"
            style={{ background: '#fff' }}
          >
            EFFECTS
          </button>
          
          <div className="effects-panel">
            <div className="p-3 space-y-2" style={{ background: '#fff' }}>
              <div className="flex items-center justify-between gap-4">
                <span className="text-black text-xs font-bold">Scanlines</span>
                <button
                  onClick={() => toggleEffect('scanlines')}
                  className="px-2 py-1 w-4 aspect-square border-2 border-black text-xs font-bold transition-colors"
                  style={{ 
                    background: effects.scanlines ? '#00ff00' : '#808080',
                    color: '#000'
                  }}
                >
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-black text-xs font-bold">Overlay</span>
                <button
                  onClick={() => toggleEffect('scanlinesOverlay')}
                  className="px-2 py-1 w-4 aspect-square border-2 border-black text-xs font-bold transition-colors"
                  style={{ 
                    background: effects.scanlinesOverlay ? '#00ff00' : '#808080',
                    color: '#000'
                  }}
                >
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-black text-xs font-bold">Abberation</span>
                <button
                  onClick={() => toggleEffect('chromaticAberration')}
                  className="px-2 py-1 w-4 aspect-square border-2 border-black text-xs font-bold transition-colors"
                  style={{ 
                    background: effects.chromaticAberration ? '#00ff00' : '#808080',
                    color: '#000'
                  }}
                >
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-black text-xs font-bold">Noise</span>
                <button
                  onClick={() => toggleEffect('noise')}
                  className="px-2 py-1 w-4 aspect-square border-2 border-black text-xs font-bold transition-colors"
                  style={{ 
                    background: effects.noise ? '#00ff00' : '#808080',
                    color: '#000'
                  }}
                >
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-black text-xs font-bold">Vignette</span>
                <button
                  onClick={() => toggleEffect('vignette')}
                  className="px-2 py-1 w-4 aspect-square border-2 border-black text-xs font-bold transition-colors"
                  style={{ 
                    background: effects.vignette ? '#00ff00' : '#808080',
                    color: '#000'
                  }}
                >
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-black text-xs font-bold">Bloom</span>
                <button
                  onClick={() => toggleEffect('bloom')}
                  className="px-2 py-1 w-4 aspect-square border-2 border-black text-xs font-bold transition-colors"
                  style={{ 
                    background: effects.bloom ? '#00ff00' : '#808080',
                    color: '#000'
                  }}
                >
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

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
          {effects.noise ? <Noise opacity={0.02}/> : <></>}
          {effects.scanlines ? <Scanline density={2} opacity={0.1}/> : <></>}
          <BetterPixelation isZoomed={isZoomed} />
          {effects.chromaticAberration ? <ChromaticAberration offset={[0.001, 0.002]} /> : <></>}
          {effects.vignette ? <Vignette offset={0.5} darkness={0.3} eskil={false} /> : <></>}
          {effects.bloom ? <Bloom intensity={0.1} luminanceThreshold={0.2} /> : <></>}
          <ParallaxEffect isZoomed={isZoomed}>
            <Stage environment={null}>
              <Model 
                isZoomed={isZoomed} 
                setIsZoomed={setIsZoomed}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
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
