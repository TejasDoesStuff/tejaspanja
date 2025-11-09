import Image from "next/image";
import BackButton from "../components/backButton";
import { memo } from "react";

interface ProjectsProps {
  setCurrentPage: (page: string) => void;
}

function Projects({ setCurrentPage }: ProjectsProps) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="lg:w-150 w-60 h-100 bg-transparent overflow-hidden font-sans text-[#010101] flex flex-col rounded border-2 border-black transform translate-z-0"
    >
      <div className="w-full h-6 border-b-2 border-black flex items-center justify-between px-1 bitcount">
        <h1 className="font-extrabold text-center text-xs sm:text-base">PROJECTS</h1>
        <BackButton setCurrentPage={setCurrentPage} page={'home'} />
      </div>
      <div className="p-2 mb-2 flex flex-col sm:flex-row justify-around w-full h-full items-center gap-2 sm:gap-0">
        <div
          className="flex flex-col items-center hover:scale-110 transition-all duration-300 folder-item cursor-pointer will-change-transform"
          onClick={() => setCurrentPage("code")}
        >
          <Image src="/document.svg" width={40} height={40} alt="Projects" priority unoptimized />
          <span className="folder-label text-xs sm:text-sm">Code</span>
        </div>
        <div
          className="flex flex-col items-center hover:scale-110 transition-all duration-300 folder-item cursor-pointer will-change-transform"
          onClick={() => setCurrentPage("music")}
        >
          <Image src="/document.svg" width={40} height={40} alt="Projects" priority unoptimized />
          <span className="folder-label text-xs sm:text-sm">Music</span>
        </div>
        <div
          className="flex flex-col items-center hover:scale-110 transition-all duration-300 folder-item cursor-pointer will-change-transform"
          onClick={() => setCurrentPage("graphicdesign")}
        >
          <Image src="/document.svg" width={40} height={40} alt="Projects" priority unoptimized />
          <span className="folder-label text-xs sm:text-sm text-center leading-3">Graphic Design</span>
        </div>
        <div
          className="flex flex-col items-center hover:scale-110 transition-all duration-300 folder-item cursor-pointer will-change-transform"
          onClick={() => setCurrentPage("research")}
        >
          <Image src="/document.svg" width={40} height={40} alt="Projects" priority unoptimized />
          <span className="folder-label text-xs sm:text-sm">Research</span>
        </div>
      </div>
    </div>
  );
}

export default memo(Projects);
