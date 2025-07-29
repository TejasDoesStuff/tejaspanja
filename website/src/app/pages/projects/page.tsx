import Image from "next/image";
import Link from "next/link";

export default function Projects() {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        width: 240,
        height: 150,
        background: "transparent",
        overflow: "hidden",
        fontFamily: "Arial",
        color: "#010101",
        display: "flex",
        flexDirection: "column",
        borderRadius: "2px",
        border: "2px solid black",
        imageRendering: "pixelated",
      }}
    >
      <div className="w-full h-6 border-b-2 border-black flex items-center justify-between px-1 bitcount">
        <h1 className="font-extrabold text-center">PROJECTS</h1>
        <Link href="/pages/home" className="text-sm hover:underline">back</Link>
      </div>
      <div className="p-2 overflow-auto h-full">
        <div className="mb-2 border-b pb-1">
          <h2 className="font-bold">Project 1</h2>
          <p className="text-xs">A cool project with fancy tech.</p>
        </div>
        <div className="mb-2 border-b pb-1">
          <h2 className="font-bold">Project 2</h2>
          <p className="text-xs">Another awesome project I worked on.</p>
        </div>
        <div className="mb-2 border-b pb-1">
          <h2 className="font-bold">Project 3</h2>
          <p className="text-xs">My latest work with amazing features.</p>
        </div>
      </div>
    </div>
  );
}