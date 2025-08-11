import Image from "next/image";
import Link from "next/link";
import ProjectCard from "../components/projectCard";
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
        <div className="flex flex-row items-center gap-2">
          <h1 className="font-extrabold text-center">MUSIC</h1>
        </div>
        <BackButton setCurrentPage={setCurrentPage} page={'projects'}/>
      </div>
      <div className="p-2 pt-1 overflow-auto h-full">
        <ProjectCard title={"Osaka Dragons"} description={"A branding package created for a fictional womens soccer team: Osaka Dragons. Made for the FBLA Graphic Design event. Won 1st place states and top 15 nationals. Created by Tejas Panja, Iris Dey, and Shreyansi Swain"} date={"Dec 2024 - Jul 2025"} gh={""} category={"Simulation"} link={""} pic={"/particlesimpic.jpg"}/>
      </div>
    </div>
  );
}