"use client";

import { useState, useEffect, useRef } from "react";
import Marquee from "react-fast-marquee";
import StickyButton from "../components/StickyButton";
import Link from "next/link";
import Image from "next/image";
import confetti from "canvas-confetti";

export default function Home() {
  const smileyRef = useRef<HTMLImageElement>(null);

  const triggerConfetti = () => {
    if (!smileyRef.current) return;

    const rect = smileyRef.current.getBoundingClientRect();

    confetti({
      particleCount: 300,
      spread: 100,
      angle: 180,
      origin: {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      },
    });
  };

  const [tileCount, setTileCount] = useState(20);

  useEffect(() => {
    function calculateTilesNeeded() {
      const viewportWidth = window.innerWidth + 80;
      const viewportHeight = window.innerHeight + 80;

      let columns = 4;
      if (window.innerWidth >= 1280) columns = 12;
      else if (window.innerWidth >= 1024) columns = 10;
      else if (window.innerWidth >= 768) columns = 8;
      else if (window.innerWidth >= 640) columns = 6;
      const tileWidth = viewportWidth / columns;
      const rowsNeeded = Math.ceil(viewportHeight / tileWidth);
      setTileCount(columns * rowsNeeded);
    }

    calculateTilesNeeded();
    window.addEventListener("resize", calculateTilesNeeded);
    return () => window.removeEventListener("resize", calculateTilesNeeded);
  }, []);

  return (
    <div className="h-screen w-screen overflow-hidden p-10 bg-[#F1FAEE] dark:bg-black">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 pointer-events-none">
          {Array.from({ length: tileCount }).map((_, i) => (
            <div
              key={i}
              className="border border-black dark:border-white opacity-50 aspect-square"
            />
          ))}
        </div>
      </div>
      <div className="border-black dark:border-white border-4 h-full w-full flex flex-col backdrop-blur-3xl shadow-2xl relative overflow-hidden">
        <div
          className="w-full h-full inset-0 absolute pointer-events-none z-20"
          style={{
            backgroundImage: "url('/03.png')",
            backgroundRepeat: "repeat",
            backgroundSize: "1000px",
          }}
        />
        <div className="flex flex-col w-full h-auto">
          <h1 className="text-9xl font-bold pl-2 flex items-center justify-between gap-4">
            PROJECTS
            <Image
              src="/melting-smiley.svg"
              alt="Melting Smiley"
              width={0}
              height={0}
              className="w-28 h-28 dark:grayscale dark:hover:grayscale-0 transition-all cursor-pointer"
              onClick={triggerConfetti}
              ref={smileyRef}
            />
          </h1>
        </div>

        <div className="grid grid-cols-10 grid-rows-10 gap-2 w-full flex-1 p-2">
          <div className="border-4 border-black dark:border-white col-span-3 row-span-5 flex items-center justify-center relative">
            <Image
              src="/Projected-Globe-Wireframe.svg"
              alt="Globe Wireframe"
              width={0}
              height={0}
              className="w-full h-full object-cover dark:invert"
            />
          </div>
          <div className="border-4 border-black dark:border-white col-span-3 row-span-2 flex justify-center items-center">
            <div className="w-full h-full">
              <StickyButton className="dark:bg-black dark:border-4 dark:border-white bg-pink-400 text-white dark:text-black w-full h-full">
                <Link href="/projects/graphic-design">
                  <Marquee
                    speed={50}
                    gradient={false}
                    autoFill={true}
                    className="text-[#F1FAEE] dark:text-white text-6xl font-bold"
                  >
                    RAPHIC DESIGN · G
                  </Marquee>
                </Link>
              </StickyButton>
            </div>
          </div>

          <div className="border-4 border-black dark:border-white col-span-4 row-span-2 relative overflow-hidden">
            {(() => {
              const fib = [1, 1];
              for (let i = 2; i < 30; i++) {
                fib.push(fib[i - 1] + fib[i - 2]);
              }

              return fib.map((num, i) => {
                const base = 10;
                const width = num * base;
                const aspectRatio = i === 0 ? 0.4 : 1;

                return (
                  <div
                    key={i}
                    className="border-1 border-black dark:border-white absolute left-0 top-0 bottom-0 m-auto rounded-[100%]"
                    style={{
                      width: `${width}px`,
                      height: "100%",
                      aspectRatio: aspectRatio,
                      zIndex: fib.length - i,
                    }}
                  />
                );
              });
            })()}
          </div>

          <div className="border-4 border-black dark:border-white row-span-4 col-span-5 relative">
              <StickyButton className="w-full h-full dark:border-4 dark:border-white overflow-hidden dark:grayscale-100 dark:hover:grayscale-0 transition-all">
                <Image
                  src="/japanplaceholder.jpg"
                  alt="Japan Background"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex justify-center items-center">
                  <h1 className="text-6xl font-bold text-white drop-shadow-lg">
                    PROJECT 1
                  </h1>
                </div>
              </StickyButton>
          </div>

          <div className="border-4 border-black dark:border-white row-span-2 col-span-2">
            <div className="w-full h-full">
              <StickyButton className="dark:bg-black dark:border-4 dark:border-white bg-red-500 text-white dark:text-black w-full h-full">
                <Link href="/projects/music">
                  <Marquee
                    speed={90}
                    gradient={false}
                    autoFill={true}
                    className="text-[#F1FAEE] dark:text-white text-6xl font-bold"
                  >
                    USIC · M
                  </Marquee>
                </Link>
              </StickyButton>
            </div>
          </div>

          <div className="border-4 border-black dark:border-white row-span-2 col-span-2 overflow-hidden">
            Content 1
          </div>

          <div className="border-4 border-black dark:border-white row-span-5 col-span-3 relative">
            <StickyButton className="w-full h-full dark:border-4 dark:border-white overflow-hidden dark:grayscale-100 dark:hover:grayscale-0 transition-all">
              <Image
                src="/japanplaceholder.jpg"
                alt="Japan Background"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 flex justify-center items-center">
                <h1 className="text-6xl font-bold text-white drop-shadow-lg">
                  PROJECT 2
                </h1>
              </div>
            </StickyButton>
          </div>

          <div className="border-4 border-black dark:border-white row-span-4 col-span-1 relative overflow-hidden">
            <div className="w-full h-full bg-black text-white p-2 text-sm font-bold tracking-tight leading-tight uppercase overflow-hidden break-words">
              BRUTALIST WEB DESIGN IS HONEST. RAW. FUNCTION OVER FORM. CONTENT
              FIRST. ANTI-TEMPLATE. ANTI-TREND. THE GRID IS GOD.
            </div>
          </div>

          <div className="border-4 border-black dark:border-white row-span-4 col-span-3">
            <div className="w-full h-full">
              <StickyButton className="dark:bg-black dark:border-4 dark:border-white bg-blue-500 text-white dark:text-black w-full h-full">
                <Link href="/projects/coding">
                  <Marquee
                    speed={70}
                    gradient={false}
                    autoFill={true}
                    className="text-[#F1FAEE] dark:text-white text-6xl font-bold"
                  >
                    ODING · C
                  </Marquee>
                </Link>
              </StickyButton>
            </div>
          </div>

          <div className="border-4 border-black dark:border-white row-span-2 col-span-2 overflow-hidden">
            Content 3
          </div>

          <div className="border-4 border-black dark:border-white row-span-2 col-span-1"></div>

          <div className="border-4 border-black dark:border-white row-span-2 col-span-3">
            <div className="w-full h-full">
              <StickyButton className="dark:bg-black dark:border-4 dark:border-white bg-yellow-500 text-white dark:text-black w-full h-full">
                <Link href="/projects/videography">
                  <Marquee
                    speed={20}
                    gradient={false}
                    autoFill={true}
                    className="text-[#F1FAEE] dark:text-white text-6xl font-bold"
                  >
                    IDEOGRAPHY · V
                  </Marquee>
                </Link>
              </StickyButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
