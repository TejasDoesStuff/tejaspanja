import Image from "next/image";
import Link from "next/link";
import ProjectCard from "../components/projectCard";
import BackButton from "../components/backButton";
import { memo } from "react";

interface ProjectsProps {
  setCurrentPage: (page: string) => void;
}

function Projects({ setCurrentPage }: ProjectsProps) {

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-150 h-100 bg-transparent overflow-hidden font-sans text-[#010101] flex flex-col rounded border-2 border-black transform translate-z-0"
    >
      <div className="w-full h-6 border-b-2 border-black flex items-center justify-between px-1 bitcount">
        <div className="flex flex-row items-center gap-2">
          <h1 className="font-extrabold text-center">MUSIC</h1>
        </div>
        <BackButton setCurrentPage={setCurrentPage} page={'projects'}/>
      </div>
      <div className="p-2 pt-1 overflow-auto h-full">
        Coming soon...
      </div>
    </div>
  );
}

export default memo(Projects);