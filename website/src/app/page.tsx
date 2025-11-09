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
import { useSpring, animated } from "@react-spring/three";

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

  const { scale } = useSpring({
    scale: isZoomed ? 2.5 : 1,
    config: {
      mass: 1,
      tension: 180,
      friction: 30,
    },
  });

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

  // the different pages of the website
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
    <animated.group ref={group} onClick={handleClick} scale={scale}>
      <primitive object={scene} />
      {isZoomed && (
        <Html
          transform
          position={[0, 0.31, 0.11]}
          rotation={[Math.PI, Math.PI, Math.PI]}
          scale={0.036}
        >
          {renderPage}
        </Html>
      )}
    </animated.group>
  );
}

function ParallaxEffect({ children, isZoomed }: { children: React.ReactNode; isZoomed: boolean }) {
  const { camera } = useThree();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const { cameraPosition, lookAtY } = useSpring({
    cameraPosition: isZoomed ? [0, .5, 2] : [0, 0, 1],
    lookAtY: isZoomed ? 0.4 : 0,
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
    const targetY = lookAtY.get();
    const parallaxStrength = isZoomed ? 0.005 : 0.03;
    camera.position.set(
      x + mousePosition.x * parallaxStrength,
      y + mousePosition.y * parallaxStrength,
      z
    );
    camera.lookAt(0, targetY, 0);
  });

  return <>{children}</>;
}

// attempt to fix the bad distortion at higher resolutions but didnt work lol
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

// ai generated function
function PerformanceMonitor({ 
  onLowPerformance 
}: { 
  onLowPerformance: () => void 
}) {
  const fpsHistory = useRef<number[]>([]);
  const lastTime = useRef(performance.now());
  const hasTriggered = useRef(false);

  useFrame(() => {
    const now = performance.now();
    const delta = now - lastTime.current;
    const fps = 1000 / delta;
    lastTime.current = now;

    fpsHistory.current.push(fps);
    if (fpsHistory.current.length > 60) {
      fpsHistory.current.shift();
    }

    if (!hasTriggered.current && fpsHistory.current.length >= 60) {
      const avgFps = fpsHistory.current.reduce((a, b) => a + b, 0) / fpsHistory.current.length;
      if (avgFps < 30) {
        hasTriggered.current = true;
        onLowPerformance();
      }
    }
  });

  return null;
}

type Notification = {
  id: number;
  message: string;
  timestamp: number;
  type?: 'system' | 'command' | 'error';
};

// terminal
function NotificationChat({ 
  notifications, 
  onCommand 
}: { 
  notifications: Notification[];
  onCommand: (cmd: string) => void;
}) {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [notifications]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onCommand(input.trim());
      setInput('');
    }
  };

  return (
    <div className="absolute bottom-4 left-4 z-30 w-[500px] max-w-[calc(100vw-2rem)] group">
      <div className="transition-opacity duration-300 opacity-30 group-hover:opacity-95">
        <div className="max-h-[200px] overflow-y-auto p-3 space-y-1">
          {notifications.map((notif) => (
            <div key={notif.id} className="animate-fade-in">
              <div className="flex items-start gap-2">
                <span className={`text-sm font-bold flex-shrink-0 ${
                  notif.type === 'command' ? 'text-cyan-400' : 
                  notif.type === 'error' ? 'text-red-400' : 
                  'text-green-500'
                }`} style={{ fontFamily: 'monospace' }}>
                  {notif.type === 'command' ? '$' : '>'}
                </span>
                <p className={`text-sm font-bold leading-relaxed ${
                  notif.type === 'error' ? 'text-red-400' : 'text-green-400'
                }`} style={{ fontFamily: 'monospace' }}>
                  {notif.message}
                </p>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="border-t-2 border-green-500 p-2 flex items-center gap-2">
          <span className="text-cyan-400 text-sm font-bold" style={{ fontFamily: 'monospace' }}>$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent text-green-400 text-sm font-bold outline-none"
            style={{ fontFamily: 'monospace' }}
            placeholder="type 'help' for commands..."
            autoComplete="off"
            spellCheck={false}
          />
        </form>
      </div>
    </div>
  );
}
// end terminal

function App() {
  const [isZoomed, setIsZoomed] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [scanlinesEnabled, setScanlinesEnabled] = useState(true);
  const [showPerformanceTip, setShowPerformanceTip] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [autoOptimized, setAutoOptimized] = useState(false);
  const [effects, setEffects] = useState({
    scanlines: true,
    scanlinesOverlay: true,
    noise: true,
    chromaticAberration: true,
    vignette: true,
    bloom: true,
  });
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const notificationId = useRef(0);

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
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateX(-20px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      .animate-fade-in {
        animation: fadeIn 0.3s ease-out;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

// commands/notifications
  const addNotification = (message: string, type: 'system' | 'command' | 'error' = 'system') => {
    const id = notificationId.current++;
    setNotifications(prev => [...prev, { id, message, timestamp: Date.now(), type }]);
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 10000);
  };

  const handleCommand = (cmd: string) => {
    addNotification(cmd, 'command');
    
    const [command, ...args] = cmd.toLowerCase().split(' ');
    
    switch(command) {
      case 'help':
        addNotification('Available commands:');
        addNotification('  toggle <effect>');
        addNotification('  effects')
        addNotification('  clear');
        break;
      
      case 'toggle':
        const effect = args[0];
        const effectMap: Record<string, keyof typeof effects> = {
          'scanlines': 'scanlines',
          'overlay': 'scanlinesOverlay',
          'noise': 'noise',
          'aberration': 'chromaticAberration',
          'vignette': 'vignette',
          'bloom': 'bloom',
        };
        
        if (effectMap[effect]) {
          const effectKey = effectMap[effect];
          const newState = !effects[effectKey];
          setEffects(prev => ({ ...prev, [effectKey]: newState }));
          addNotification(`${effect}: ${newState ? 'ON' : 'OFF'}`);
        } else {
          addNotification(`Uh oh! ${effect} doesn't exist :/ Type 'help'`, 'error');
        }
        break;
      
      case 'effects':
        addNotification('Current effect states:');
        addNotification(`  scanlines: ${effects.scanlines ? 'ON' : 'OFF'}`);
        addNotification(`  overlay: ${effects.scanlinesOverlay ? 'ON' : 'OFF'}`);
        addNotification(`  noise: ${effects.noise ? 'ON' : 'OFF'}`);
        addNotification(`  aberration: ${effects.chromaticAberration ? 'ON' : 'OFF'}`);
        addNotification(`  vignette: ${effects.vignette ? 'ON' : 'OFF'}`);
        addNotification(`  bloom: ${effects.bloom ? 'ON' : 'OFF'}`);
        break;
      
      case 'freddy_fazbear':
        addNotification('HAR HAR HAR HAR HAR HAR HAR HAR HAR HAR');
        break;
      
      case 'clear':
        setNotifications([]);
        break;
      
      default:
        addNotification(`Uh oh! ${command} doesn't exist :/`, 'error');
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      addNotification("Hi :)! Type 'help' for commands");
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);
// end command/notifications

  // ai generated function
  const handleLowPerformance = () => {
    setEffects(prev => ({
      ...prev,
      bloom: false,
      chromaticAberration: false,
    }));
    addNotification("Some effects disabled for better performance :(");
  };

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

      <NotificationChat notifications={notifications} onCommand={handleCommand} />

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
        <PerformanceMonitor onLowPerformance={handleLowPerformance} />
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
