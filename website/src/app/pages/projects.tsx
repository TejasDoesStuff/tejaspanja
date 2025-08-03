import Image from "next/image";
import BackButton from "../components/backButton";

export default function Projects({ setCurrentPage }) {
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
        <BackButton setCurrentPage={setCurrentPage} page={'home'} />
      </div>
      <div className="p-2 mb-2 flex justify-around w-full h-full items-center">
        <div
          className="flex flex-col items-center hover:scale-110 transition-all duration-300 folder-item cursor-pointer"
          onClick={() => setCurrentPage("code")}
        >
          <Image src="/document.svg" width={40} height={40} alt="Projects" />
          <span className="folder-label text-sm">Code</span>
        </div>
        <div
          className="flex flex-col items-center hover:scale-110 transition-all duration-300 folder-item cursor-pointer"
          onClick={() => setCurrentPage("music")}
        >
          <Image src="/document.svg" width={40} height={40} alt="Projects" />
          <span className="folder-label text-sm">Music</span>
        </div>
        <div
          className="flex flex-col items-center hover:scale-110 transition-all duration-300 folder-item cursor-pointer"
          onClick={() => setCurrentPage("code")}
        >
          <Image src="/document.svg" width={40} height={40} alt="Projects" />
          <span className="folder-label text-sm text-center leading-3">Graphic Design</span>
        </div>
        <div
          className="flex flex-col items-center hover:scale-110 transition-all duration-300 folder-item cursor-pointer"
          onClick={() => setCurrentPage("code")}
        >
          <Image src="/document.svg" width={40} height={40} alt="Projects" />
          <span className="folder-label text-sm">Research</span>
        </div>
      </div>
    </div>
  );
}
