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
      className="lg:w-150 w-60 h-100 bg-white overflow-hidden font-sans text-[#010101] flex flex-col rounded border-2 border-black transform translate-z-0 shadow-lg"
    >
      <div className="w-full h-6 border-b-2 border-black flex items-center justify-between px-1 bitcount bg-gradient-to-r from-gray-50 to-gray-100">
        <h1 className="font-extrabold text-center text-xs sm:text-base">PROJECTS</h1>
        <BackButton setCurrentPage={setCurrentPage} page={'home'} />
      </div>
      
      <div className="p-4 flex flex-col w-full h-full overflow-y-auto relative">
        <p className="text-center text-xs sm:text-sm mb-4 text-gray-600">
          Check out some of my work! :D
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 flex-1">
          <div
            className="relative group flex flex-col items-center justify-center p-4 rounded-lg border-2 border-black hover:border-gray-700 hover:shadow-xl transition-all duration-300 cursor-pointer bg-gray-50 hover:bg-gradient-to-br hover:from-blue-500/10 hover:to-purple-500/10 hover:scale-105"
            onClick={() => setCurrentPage('code')}
          >
            <div className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-0.5 rounded-full font-bold">
              14
            </div>
            <div className="mb-2 transform group-hover:scale-110 transition-transform duration-300">
              <Image src="/document.svg" width={48} height={48} alt="Code" priority unoptimized />
            </div>
            <span className="font-bold text-sm sm:text-base text-center mb-1">Code</span>
          </div>

          <div
            className="relative group flex flex-col items-center justify-center p-4 rounded-lg border-2 border-black hover:border-gray-700 hover:shadow-xl transition-all duration-300 cursor-pointer bg-gray-50 hover:bg-gradient-to-br hover:from-pink-500/10 hover:to-red-500/10 hover:scale-105"
            onClick={() => setCurrentPage('music')}
          >
            <div className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-0.5 rounded-full font-bold">
              coming soon
            </div>
            <div className="mb-2 transform group-hover:scale-110 transition-transform duration-300">
              <Image src="/document.svg" width={48} height={48} alt="Music" priority unoptimized />
            </div>
            <span className="font-bold text-sm sm:text-base text-center mb-1">Music</span>
          </div>

          <div
            className="relative group flex flex-col items-center justify-center p-4 rounded-lg border-2 border-black hover:border-gray-700 hover:shadow-xl transition-all duration-300 cursor-pointer bg-gray-50 hover:bg-gradient-to-br hover:from-green-500/10 hover:to-teal-500/10 hover:scale-105"
            onClick={() => setCurrentPage('graphicdesign')}
          >
            <div className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-0.5 rounded-full font-bold">
              12
            </div>
            <div className="mb-2 transform group-hover:scale-110 transition-transform duration-300">
              <Image src="/document.svg" width={48} height={48} alt="Graphic Design" priority unoptimized />
            </div>
            <span className="font-bold text-sm sm:text-base text-center mb-1">Graphic Design</span>
          </div>

          <div
            className="relative group flex flex-col items-center justify-center p-4 rounded-lg border-2 border-black hover:border-gray-700 hover:shadow-xl transition-all duration-300 cursor-pointer bg-gray-50 hover:bg-gradient-to-br hover:from-orange-500/10 hover:to-yellow-500/10 hover:scale-105"
            onClick={() => setCurrentPage('research')}
          >
            <div className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-0.5 rounded-full font-bold">
              1
            </div>
            <div className="mb-2 transform group-hover:scale-110 transition-transform duration-300">
              <Image src="/document.svg" width={48} height={48} alt="Research" priority unoptimized />
            </div>
            <span className="font-bold text-sm sm:text-base text-center mb-1">Research</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Projects);
