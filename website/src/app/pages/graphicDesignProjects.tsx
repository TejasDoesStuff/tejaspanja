import Image from "next/image";
import Link from "next/link";
import ProjectCard from "../components/projectCard";
import BackButton from "../components/backButton";
import { memo } from "react";

function Projects({ setCurrentPage }: { setCurrentPage: (page: string) => void }) {

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="lg:w-150 w-60 h-100 bg-transparent overflow-hidden font-sans text-[#010101] flex flex-col rounded border-2 border-black transform translate-z-0"
    >
      <div className="w-full h-6 border-b-2 border-black flex items-center justify-between px-1 bitcount">
        <div className="flex flex-row items-center gap-2">
          <h1 className="font-extrabold text-center text-xs sm:text-base">GRAPHIC DESIGN</h1>
        </div>
        <BackButton setCurrentPage={setCurrentPage} page={'projects'}/>
      </div>
      <div className="p-2 pt-1 overflow-auto h-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          <ProjectCard title={"Osaka Dragons"} description={"A branding package created for a fictional womens soccer team: Osaka Dragons. Made for the FBLA Graphic Design event. Won 1st place states and top 15 nationals. Created by Tejas Panja, Iris Dey, and Shreyansi Swain"} date={"Dec 2024 - Jul 2025"} gh={""} category={"Branding Package"} link={""} pic={["/gd/osakadragons1.jpg", "/gd/osakadragons2.jpg", "/gd/osakadragons3.jpg", "/gd/osakadragons4.jpg"]}/>
          <ProjectCard title={"JID"} description={"It's J-I-D baby, I'm just a few letters "} date={"Jul 2025"} gh={""} category={"Poster"} link={""} pic={"/gd/JID.png"}/>
          <ProjectCard title={"PEAK"} description={"The climax of your journey"} date={"Aug 2025"} gh={""} category={"Poster"} link={""} pic={"/gd/peak.png"}/>
          <ProjectCard title={"MF DOOM"} description={"all caps when you spell the mans name"} date={"Jun 2025"} gh={""} category={"Poster"} link={""} pic={"/gd/MFDOM.jpg"}/>
          <ProjectCard title={"moyai"} description={"i dont really know what I was doing"} date={"Jun 2025"} gh={""} category={"Poster"} link={""} pic={"/gd/moyai.png"}/>
          <ProjectCard title={"moo"} description={"i like cows"} date={"Jun 2025"} gh={""} category={"Poster"} link={""} pic={"/gd/moo.png"}/>
          <ProjectCard title={"Bloom"} description={""} date={"Apr 2025"} gh={""} category={"Poster"} link={""} pic={"/gd/bloom.png"}/>
          <ProjectCard title={"Call me?"} description={"please?"} date={"Apr 2025"} gh={""} category={"Poster"} link={""} pic={"/gd/Callme.png"}/>
          <ProjectCard title={"Electric Dreams"} description={"INDUSTRIAL ELECTRIC CO., INC"} date={"Apr 2025"} gh={""} category={"Poster"} link={""} pic={"/gd/electricdreams.png"}/>
          <ProjectCard title={"Flower Language"} description={"what language do the flowers speak?"} date={"Apr 2025"} gh={""} category={"Poster"} link={""} pic={"/gd/flowerlanguage.png"}/>
          <ProjectCard title={"peace"} description={"The greatest weapon against stress"} date={"Apr 2025"} gh={""} category={"Poster"} link={""} pic={"/gd/peace.png"}/>
          <ProjectCard title={"SUNflower"} description={"/'sʌnˌflaʊər/"} date={"Apr 2025"} gh={""} category={"Poster"} link={""} pic={"/gd/sunflower.png"}/>
        </div>
      </div>
    </div>
  );
}

export default memo(Projects);