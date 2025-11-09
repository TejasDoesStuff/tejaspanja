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
      className="lg:w-150 w-60 h-100 bg-transparent overflow-hidden font-sans text-[#010101] flex flex-col rounded border-2 border-black transform translate-z-0"
    >
      <div className="w-full h-6 border-b-2 border-black flex items-center justify-between px-1">
        <h1 className="font-extrabold text-center text-xs sm:text-base">TEJAS PANJA</h1>
        <h2 className="text-xs sm:text-sm">hi</h2>
      </div>
      <div className="p-2 mb-2 flex flex-col sm:flex-row justify-around w-full h-full items-center gap-2 sm:gap-0">
        <div 
          className="flex flex-col items-center hover:scale-110 active:scale-95 transition-all duration-300 folder-item cursor-pointer will-change-transform"
          onClick={() => handlePageChange('projects')}
        >
          <Image src="/folder.svg" width={64} height={64} alt="Projects" priority unoptimized />
          <span className="folder-label text-xs sm:text-sm">Projects</span>
        </div>
        <div 
          className="flex flex-col items-center hover:scale-110 active:scale-95 transition-all duration-100 folder-item cursor-pointer will-change-transform"
          onClick={() => handlePageChange('about')}
        >
          <Image src="/folder.svg" width={64} height={64} alt="About" priority unoptimized />
          <span className="folder-label text-xs sm:text-sm">About</span>
        </div>
        <div 
          className="flex flex-col items-center hover:scale-110 active:scale-95 transition-all duration-100 folder-item cursor-pointer will-change-transform"
          onClick={() => handlePageChange('skills')}
        >
          <Image src="/folder.svg" width={64} height={64} alt="Skills" priority unoptimized />
          <span className="folder-label text-xs sm:text-sm">Skills</span>
        </div>
        <div 
          className="flex flex-col items-center hover:scale-110 active:scale-95 transition-all duration-100 folder-item cursor-pointer will-change-transform"
          onClick={() => handlePageChange('contact')}
        >
          <Image src="/folder.svg" width={64} height={64} alt="Contact" priority unoptimized />
          <span className="folder-label text-xs sm:text-sm rounded">Contact</span>
        </div>
      </div>
    </div>
  );
}

export default memo(Home);
