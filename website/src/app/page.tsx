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
import Resume from "./pages/resume";
import About from "./pages/about";
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
      mass: 1.2,
      tension: 150,
      friction: 26,
    },
  });

  // the different pages of the website
  const renderPage = useMemo(() => {
    switch(currentPage) {
      case 'projects':
        return <Projects setCurrentPage={setCurrentPage} />;
      case 'about':
        return <About setCurrentPage={setCurrentPage} />;
      case 'resume':
        return <Resume setCurrentPage={setCurrentPage} />;
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
    <animated.group ref={group} scale={scale}>
      {useMemo(() => {
        scene.traverse((child: any) => {
          if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({
              map: child.material.map || null,
              color: "white",
            });
          }
        });
        return null;
      }, [scene])}
      <primitive object={scene} />
      {isZoomed && (
        <Html
          transform
          position={[0, 0.31, 0.11]}
          rotation={[Math.PI, Math.PI, Math.PI]}
          scale={0.036}
          zIndexRange={[0, 0]}
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
    cameraPosition: isZoomed ? [0, .55, 1.6] : [0, 0, 3],
    lookAtY: isZoomed ? 0.47 : 0,
    config: isZoomed ? {
      mass: 1.2,
      tension: 150,
      friction: 26,
    } : {
      mass: 2,
      tension: 80,
      friction: 40,
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
    const parallaxStrength = isZoomed ? 0.005 : 0.08;
    
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
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
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

  const hasNotifications = notifications.length > 0;
  const shouldBeFullOpacity = hasNotifications || isHovered || isFocused;

  return (
    <div 
      className="absolute bottom-4 left-4 z-50 w-[500px] max-w-[calc(100vw-2rem)] group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`transition-opacity duration-300 ${shouldBeFullOpacity ? 'opacity-95' : 'opacity-30'} ${shouldBeFullOpacity ? 'bg-gray-900/80' : 'bg-transparent'} rounded-lg`}>
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
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
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

// intro effect
function FlickeringLight() {
  const lightRef = useRef<THREE.PointLight>(null);
  const [intensity, setIntensity] = useState(0);
  const [color, setColor] = useState("#000000");

  useEffect(() => {
    let timeouts: NodeJS.Timeout[] = [];

    const flickerPattern = [
      { t: 0,   value: 0.0,  color: "#000000" },
      { t: 600, value: 0.15, color: "#cccccc" },
      { t: 80,  value: 0.0,  color: "#000000" },
      { t: 160, value: 0.6,  color: "#dddddd" },
      { t: 90,  value: 0.1,  color: "#666666" },
      { t: 200, value: 1.2,  color: "#eeeeee" },
      { t: 110, value: 0.4,  color: "#bbbbbb" },
      { t: 150, value: 2.5,  color: "#ffffff" },
      { t: 80,  value: 0.8,  color: "#eeeeee" },
      { t: 200, value: 3.5,  color: "#eeddee" },
    ];

    let total = 0;
    flickerPattern.forEach((step) => {
      const timeout = setTimeout(() => {
        setIntensity(step.value);
        setColor(step.color);
        if (lightRef.current) lightRef.current.color.set(step.color);
      }, total + step.t);

      total += step.t;
      timeouts.push(timeout);
    });

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <>
      <pointLight
        ref={lightRef}
        position={[0, 2.5, 1]}
        intensity={intensity * 80}
        distance={8}
        decay={2}
        color={color}
      />

      <mesh position={[0, 2.5, 1]}>
        <planeGeometry args={[0.4, 0.4]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={Math.min(intensity * 0.8, 1)}
        />
      </mesh>

      <ambientLight intensity={0.02 + intensity * 0.08} />
    </>
  );
}

function ZoomEffect({ isActive }: { isActive: boolean }) {
  const linesRef = useRef<THREE.LineSegments>(null);
  const [particles] = useState(() => {
    const count = 500;
    const positions = new Float32Array(count * 6);
    const velocities = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const i6 = i * 6;
      const theta = Math.random() * Math.PI * 2;
      const radius = Math.random() * 5 + 1;
      
      const x = Math.cos(theta) * radius;
      const y = (Math.random() - 0.5) * 10;
      const z = Math.sin(theta) * radius - 10;
      
      positions[i6] = x;
      positions[i6 + 1] = y;
      positions[i6 + 2] = z;
      
      positions[i6 + 3] = x;
      positions[i6 + 4] = y;
      positions[i6 + 5] = z;
      
      velocities[i] = Math.random() * 1.5 + 1.5;
    }
    
    return { positions, velocities };
  });

  const [opacity, setOpacity] = useState(0);
  const opacityRef = useRef(0);

  useEffect(() => {
    if (isActive) {
      opacityRef.current = 1;
    }
  }, [isActive]);

  useFrame((state, delta) => {
    if (!linesRef.current) return;
    
    const targetOpacity = isActive ? 1 : 0;
    opacityRef.current += (targetOpacity - opacityRef.current) * delta * 5;
    setOpacity(opacityRef.current);
    
    if (opacityRef.current < 0.01) return;
    
    const positions = linesRef.current.geometry.attributes.position.array as Float32Array;
    
    for (let i = 0; i < positions.length / 6; i++) {
      const i6 = i * 6;
      const speed = particles.velocities[i] * delta * 120;
      
      positions[i6 + 2] += speed;
      positions[i6 + 5] += speed;
      
      const streakLength = Math.min(speed * 0.8, 2);
      positions[i6 + 5] = positions[i6 + 2] - streakLength;
      
      if (positions[i6 + 2] > 5) {
        const theta = Math.random() * Math.PI * 2;
        const radius = Math.random() * 5 + 1;
        const x = Math.cos(theta) * radius;
        const y = (Math.random() - 0.5) * 10;
        
        positions[i6] = x;
        positions[i6 + 1] = y;
        positions[i6 + 2] = -10;
        positions[i6 + 3] = x;
        positions[i6 + 4] = y;
        positions[i6 + 5] = -10;
      }
    }
    
    linesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles.positions, 3]}
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color="#ffffff"
        transparent
        opacity={opacity * 0.9}
        blending={THREE.AdditiveBlending}
        linewidth={2}
      />
    </lineSegments>
  );
}

function CameraShake({ isActive, intensity = 0.35 }: { isActive: boolean; intensity?: number }) {
  const { camera } = useThree();
  const originalPosition = useRef(new THREE.Vector3());
  const shakeIntensity = useRef(0);

  useEffect(() => {
    if (isActive) {
      originalPosition.current.copy(camera.position);
    }
  }, [isActive, camera]);

  useFrame((state, delta) => {
    if (isActive) {
      shakeIntensity.current = Math.min(shakeIntensity.current + delta * 3, 1);
    } else {
      shakeIntensity.current = Math.max(shakeIntensity.current - delta * 2, 0);
    }

    if (shakeIntensity.current === 0) return;

    const currentIntensity = intensity * shakeIntensity.current;

    const shake = {
      x: (Math.random() - 0.5) * currentIntensity,
      y: (Math.random() - 0.5) * currentIntensity,
      z: (Math.random() - 0.5) * currentIntensity * 0.5,
    };

    camera.position.x = originalPosition.current.x + shake.x;
    camera.position.y = originalPosition.current.y + shake.y;
    camera.position.z = originalPosition.current.z + shake.z;
  });

  return null;
}

function Hyperspace({ isActive }: { isActive: boolean }) {
  const lightRef = useRef<THREE.PointLight>(null);
  const [intensity, setIntensity] = useState(0);
  const intensityRef = useRef(0);

  useFrame((state, delta) => {
    const pulse = Math.sin(state.clock.elapsedTime * 20) * 0.5 + 0.5;
    const targetIntensity = isActive ? pulse * 150 : 0;
    
    intensityRef.current += (targetIntensity - intensityRef.current) * delta * 5;
    setIntensity(intensityRef.current);
  });

  return (
    <pointLight
      ref={lightRef}
      position={[0, 0, 2]}
      intensity={intensity}
      distance={15}
      color="#6699ff"
    />
  );
}

function App() {
  const [isZoomed, setIsZoomed] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [hyperspaceActive, setHyperspaceActive] = useState(false);
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
          addNotification(`Uh oh! ${effect} doesn't exist :/ type 'effects' for a list of effects`, 'error');
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

      case 'wut_da_helly':
        addNotification('erm wat da sigma');
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

  useEffect(() => {
    const slowZoomTimer = setTimeout(() => {
      setIsZoomed(false);
    }, 0);

    const intenseZoomTimer = setTimeout(() => {
      setHyperspaceActive(true);
      setIsZoomed(true);
    }, 3000);

    const endHyperspaceTimer = setTimeout(() => {
      setHyperspaceActive(false);
    }, 3600);

    return () => {
      clearTimeout(slowZoomTimer);
      clearTimeout(intenseZoomTimer);
      clearTimeout(endHyperspaceTimer);
    };
  }, []);

  return (
    <div className="w-full h-screen relative">
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
        camera={{ fov: 45, position: [0, 0, 5] }}
      >
        <color attach="background" args={["#101010"]} />
        <FlickeringLight />
        <PerformanceMonitor onLowPerformance={handleLowPerformance} />
        <EffectComposer>
          {effects.noise ? <Noise opacity={0.02}/> : <></>}
          {effects.scanlines ? <Scanline density={2} opacity={0.1}/> : <></>}
          <BetterPixelation isZoomed={isZoomed} />
          {effects.chromaticAberration ? <ChromaticAberration offset={[0.001, 0.002]} /> : <></>}
          {effects.vignette ? <Vignette offset={0.5} darkness={0.3} eskil={false} /> : <></>}
          {effects.bloom ? <Bloom intensity={0.1} luminanceThreshold={0.2} /> : <></>}
          <ParallaxEffect isZoomed={isZoomed}>
            <ZoomEffect isActive={hyperspaceActive} />
            <Hyperspace isActive={hyperspaceActive} />
            <CameraShake isActive={hyperspaceActive} intensity={0.5} />
            {/* <pointLight position={[0, 2, 1]} intensity={100} color="red" /> */}
            <Stage environment={null} intensity={0} shadows={false}>
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
    </div>
  );
}

export default App;