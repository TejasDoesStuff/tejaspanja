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
        <h1 className="font-extrabold text-center">CODE</h1>
        <BackButton setCurrentPage={setCurrentPage} page={'projects'}/>
      </div>
      <div className="p-2 pt-1 overflow-auto h-full">
        <ProjectCard title={"Judgement Call"} description={"A game based around different ethical perspectives. Created by Tejas Panja, Inesh Dey, and Alexander Helfman for AP Lang."} date={"Feb 2025"} gh={"https://github.com/tejasdoesstuff/ethics-game"} link={"https://somebody4545.github.io/judgement-call-build/"} pic={"/judgementcallpic.jpg"}/>
        <ProjectCard title={"GPA Wizard"} description={"A Tesla STEM GPA Calculator built using HTML, CSS, JS, and Python. Created by Tejas Panja, Kaushal Dabbiru, and Safwan Hasan for the Intro to Programming FBLA event. Won 2nd place regionals and 5th place states."} link={""} date={"Dec 2023 - Apr 2024"} gh={"https://github.com/TejasDoesStuff/GPACalc"} pic={"/judgementcallpic.jpg"}/>
        <ProjectCard title={"World Generation Project"} description={"A project that uses perlin-noise and jMonkeyEngine to simulate the world generation of Minecraft. Created by Tejas Panja for APCSA."} date={"Jun 2025"} gh={"https://github.com/TejasDoesStuff/Minecraft"} link={""} pic={"/judgementcallpic.jpg"}/>
        <ProjectCard title={"Particle Sim"} description={"A simple particle physics simulator build in Java with JavaFX. Created by Tejas Panja"} date={"Mar 2025"} gh={"https://github.com/tejasdoesstuff/particle-sim"} link={""} pic={"/judgementcallpic.jpg"}/>
        <ProjectCard title={"Conext"} description={"A Tesla STEM job finding site for high schoolers. Created by Tejas Panja, Inesh Dey, and Anirudh Narasimhan for FBLA Website Coding and Development."} date={"Nov 2024 - Feb 2025"} gh={"https://github.com/TejasDoesStuff/Website-Coding-and-Development"} link={""} pic={"/judgementcallpic.jpg"}/>
        <ProjectCard title={"Bite Mark Analysis"} description={"A machine learning model that uses image recognition to collect class evidence from bite marks. Code done by Tejas Panja."} date={"Dec 2024 - Jan 2025"} gh={"https://github.com/TejasDoesStuff/bite-mark-analysis"} link={""} pic={"/judgementcallpic.jpg"}/>
      </div>
    </div>
  );
}