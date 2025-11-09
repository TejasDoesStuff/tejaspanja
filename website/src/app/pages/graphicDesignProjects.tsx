import Image from "next/image";
import Link from "next/link";
import ProjectCard from "../components/projectCard";
import BackButton from "../components/backButton";
import { memo } from "react";

function Projects({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="w-150 h-100 bg-transparent overflow-hidden font-sans text-[#010101] flex flex-col rounded border-2 border-black transform translate-z-0"
    >
      <div className="w-full h-6 border-b-2 border-black flex items-center justify-between px-1 bitcount">
        <div className="flex flex-row items-center gap-2">
          <h1 className="font-extrabold text-center">GRAPHIC DESIGN</h1>
        </div>
        <BackButton setCurrentPage={setCurrentPage} page={'projects'}/>
      </div>
      <div className="p-2 pt-1 overflow-auto h-full">
        <div className="grid grid-cols-3 gap-2">
          <ProjectCard title={"Osaka Dragons"} description={"A branding package created for a fictional womens soccer team: Osaka Dragons. Made for the FBLA Graphic Design event. Won 1st place states and top 15 nationals. Created by Tejas Panja, Iris Dey, and Shreyansi Swain"} date={"Dec 2024 - Jul 2025"} gh={""} category={"Branding Package"} link={""} pic={["/osakadragons1.jpg", "/osakadragons2.jpg", "/osakadragons3.jpg", "/osakadragons4.jpg"]}/>
          <ProjectCard title={"J.I.D Poster"} description={"A poster I made of the rapper JID in a collage style"} date={"Jul 2025"} gh={""} category={"Poster"} link={""} pic={"/JID.png"}/>
          <ProjectCard title={"MF DOOM Poster"} description={"A poster I made of the rapper MF DOOM in a brutalist style"} date={"Jul 2025"} gh={""} category={"Poster"} link={""} pic={"/MFDOM.jpg"}/>
        </div>
      </div>
    </div>
  );
}

export default memo(Projects);