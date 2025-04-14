"use client";

import { useState, useEffect, useRef } from "react";

import Marquee from "react-fast-marquee";
import StickyButton from "./components/StickyButton";
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
      <div
        className="border-black dark:border-white border-4 h-full w-full flex flex-col backdrop-blur-3xl shadow-2xl"
        style={{
          backgroundImage: "url('/03.png')",
          backgroundRepeat: "repeat",
          backgroundSize: "1000px",
        }}
      >
        <div className="flex flex-col w-full h-auto">
          <h1 className="text-9xl font-bold pl-2 flex items-center justify-between gap-4">
            TEJAS PANJA
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
        <div>
          <Marquee
            className="text-xl uppercase bg-black dark:bg-white text-white dark:text-black"
            speed={35}
            autoFill={true}
          >
            / Coding // Videography // Music // Graphic Design /
          </Marquee>
        </div>
        <div className="p-4">
          <div className="text-4xl flex items-center">
            <h2 className="text-4xl w-1/4">i do cool things</h2>
            <div className="border-black border-2 w-full h-10 grid grid-cols-10">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="border border-black dark:border-white hover:bg-black dark:hover:bg-white transition-all"
                />
              ))}
            </div>
          </div>
          <div className="flex flex-row gap-6 mt-2">
            <p className="text-justify w-1/4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut,
              laudantium consequuntur dolore a, voluptatibus aspernatur eligendi
              enim quod suscipit maxime culpa rerum. Deserunt animi repudiandae,
              tenetur asperiores quae nesciunt laboriosam.
            </p>
            <div className="flex border-4 border-black w-3/4 justify-center items-center dark:border-white">
              <Marquee
                className="text-6xl uppercase text-black dark:text-white mx-2 scale-y-150"
                speed={60}
                autoFill={false}
              >
                <h2>Copyright © 2025 Tejas Panja</h2>
              </Marquee>
            </div>
          </div>
        </div>
        <div className="w-full h-full flex flex-col">
          <div className="grid grid-cols-5 grid-rows-5 w-full flex-grow">
            <div className="col-span-3 row-span-3 dark:border-white border-black border-2 border-t-4 border-l-0 flex justify-center items-center">
              <StickyButton className="bg-pink-400 dark:hover:bg-pink-500 dark:bg-black dark:border-white dark:border-4 text-white w-full h-full flex justify-center items-center text-5xl font-bold hover:z-50 overflow-hidden">
                <div
                  className="w-full h-full flex justify-center items-center"
                  style={{
                    backgroundImage: "url('/03.png')",
                    backgroundRepeat: "repeat",
                    backgroundSize: "1000px",
                  }}
                >
                  PROJECTS
                </div>
              </StickyButton>
            </div>

            <div className="col-span-2 row-span-5 dark:border-white border-black border-2 border-t-4 border-r-0 border-b-0 flex justify-center items-center">
              <StickyButton className="bg-blue-500 dark:border-white dark:border-4 dark:bg-white dark:text-black text-white w-full h-full flex justify-center items-center text-5xl font-bold hover:z-50 relative overflow-hidden">
                <Image
                  src="/headshot.png"
                  alt="Headshot"
                  fill
                  priority
                  className="object-cover dark:grayscale dark:hover:grayscale-0 transition-all"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </StickyButton>
            </div>

            <div className="col-start-3 col-span-1 row-span-2 dark:border-white border-black border-2 border-b-0 flex justify-center items-center">
              <StickyButton className="bg-yellow-500 dark:hover:bg-yellow-500 dark:bg-black dark:border-white dark:border-4 text-white w-full h-full flex justify-center items-center text-5xl font-bold hover:z-50 overflow-hidden">
                <div
                  className="w-full h-full flex justify-center items-center"
                  style={{
                    backgroundImage: "url('/03.png')",
                    backgroundRepeat: "repeat",
                    backgroundSize: "1000px",
                  }}
                >
                  RESUME
                </div>
              </StickyButton>
            </div>

            <div className="row-start-4 col-start-2 col-span-1 row-span-2 dark:border-white border-black border-2 border-b-0 flex justify-center items-center">
              <StickyButton className="bg-blue-500 dark:hover:bg-blue-500 dark:bg-black dark:border-white dark:border-4 text-white w-full h-full flex justify-center items-center text-5xl font-bold hover:z-50 overflow-hidden">
                <div
                  className="w-full h-full flex justify-center items-center"
                  style={{
                    backgroundImage: "url('/03.png')",
                    backgroundRepeat: "repeat",
                    backgroundSize: "1000px",
                  }}
                >
                  CONTACT
                </div>
              </StickyButton>
            </div>

            <div className="col-span-1 row-start-4 row-span-2 dark:border-white border-black border-2 border-l-0 border-b-0 flex justify-center items-center">
              <StickyButton className="bg-red-500 dark:hover:bg-red-500 dark:bg-black dark:border-white dark:border-4 text-white w-full h-full flex justify-center items-center text-5xl font-bold hover:z-50 overflow-hidden">
                <div
                  className="w-full h-full flex justify-center items-center"
                  style={{
                    backgroundImage: "url('/03.png')",
                    backgroundRepeat: "repeat",
                    backgroundSize: "1000px",
                  }}
                >
                  BLOG
                </div>
              </StickyButton>
            </div>
          </div>
        </div>
      </div>
      {/* <div
        className="fixed inset-0 pointer-events-none z-[998]"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: "url('/03.png')",
            backgroundRepeat: "repeat",
            backgroundSize: "1000px",
          }}
        />
      </div> */}
    </div>
  );
}
