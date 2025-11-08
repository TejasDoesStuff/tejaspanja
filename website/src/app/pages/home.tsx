import Image from "next/image"
import { memo, useCallback } from "react"

interface HomeProps {
  setCurrentPage: (page: string) => void;
}

function Home({ setCurrentPage }: HomeProps) {
  const handlePageChange = useCallback((page: string) => {
    setCurrentPage(page);
  }, [setCurrentPage]);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-[90vw] max-w-[240px] h-auto min-h-[150px] md:w-[240px] md:h-[150px]"
      style={{
        background: "transparent",
        overflow: "hidden",
        fontFamily: "Arial",
        color: "#010101",
        display: "flex",
        flexDirection: "column",
        borderRadius: "2px",
        border: "2px solid black",
        imageRendering: "auto",
        WebkitFontSmoothing: "antialiased",
        transform: "translateZ(0)",
      }}
    >
      <div className="w-full h-6 border-b-2 border-black flex items-center justify-between px-1 bitcount">
        <h1 className="font-extrabold text-center text-xs sm:text-base">TEJAS PANJA</h1>
        <h2 className="text-xs sm:text-sm">hi</h2>
      </div>
      <div className="p-2 mb-2 flex flex-col sm:flex-row justify-around w-full h-full items-center gap-2 sm:gap-0">
        <div 
          className="flex flex-col items-center hover:scale-110 active:scale-95 transition-all duration-300 folder-item cursor-pointer will-change-transform"
          onClick={() => handlePageChange('projects')}
        >
          <Image src="/folder.svg" width={40} height={40} alt="Projects" priority quality={75} unoptimized />
          <span className="folder-label text-xs sm:text-sm">Projects</span>
        </div>
        <div 
          className="flex flex-col items-center hover:scale-110 active:scale-95 transition-all duration-100 folder-item cursor-pointer will-change-transform"
          onClick={() => handlePageChange('about')}
        >
          <Image src="/folder.svg" width={40} height={40} alt="About" priority quality={75} unoptimized />
          <span className="folder-label text-xs sm:text-sm">About</span>
        </div>
        <div 
          className="flex flex-col items-center hover:scale-110 active:scale-95 transition-all duration-100 folder-item cursor-pointer will-change-transform"
          onClick={() => handlePageChange('skills')}
        >
          <Image src="/folder.svg" width={40} height={40} alt="Skills" priority quality={75} unoptimized />
          <span className="folder-label text-xs sm:text-sm">Skills</span>
        </div>
        <div 
          className="flex flex-col items-center hover:scale-110 active:scale-95 transition-all duration-100 folder-item cursor-pointer will-change-transform"
          onClick={() => handlePageChange('contact')}
        >
          <Image src="/folder.svg" width={40} height={40} alt="Contact" priority quality={75} unoptimized />
          <span className="folder-label text-xs sm:text-sm">Contact</span>
        </div>
      </div>
    </div>
  );
}

export default memo(Home);
