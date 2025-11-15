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
      className="lg:w-150 w-60 h-100 bg-transparent overflow-hidden font-sans text-[#010101] flex flex-col rounded border-2 border-black transform translate-z-0"
      style={{
        imageRendering: "pixelated",
        willChange: "transform",
      }}
    >
      <div className="w-full h-6 border-b-2 border-black flex items-center justify-between px-1 bitcount">
        <div className="flex flex-row items-center gap-2">
          <h1 className="font-extrabold text-center text-xs sm:text-base">RESEARCH</h1>
        </div>
        <BackButton setCurrentPage={setCurrentPage} page={'projects'}/>
      </div>
      <div className="p-4 px-18 overflow-auto h-full">
        <ProjectCard title={"Novel Therapeutic Application of ChatGPT Through Prompt Engineering"} description={<>A research project focused around making ChatGPT better at providing mental health help via the use of prompt engineering. My research paper was selected for publication. By Tejas Panja</>} date={"Sep 2024 - Jun 2025"} gh={""} category={"Research"} link={"https://youtu.be/6xSXdI9edBE"} pic={["/research/csrsef1.jpg", "/research/csrsef2.jpg", "/research/csrsef3.jpg", "/research/csrsef4.jpg", "/research/csrsef5.jpg", "/research/csrsef6.jpg"]}/>
      </div>
    </div>
  );
}

export default memo(Projects);