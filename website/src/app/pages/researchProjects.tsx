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
        willChange: "transform",
      }}
    >
      <div className="w-full h-6 border-b-2 border-black flex items-center justify-between px-1 bitcount">
        <div className="flex flex-row items-center gap-2">
          <h1 className="font-extrabold text-center">RESEARCH</h1>
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