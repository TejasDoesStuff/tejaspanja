import Image from "next/image";
import Link from "next/link";
import ProjectCard from "../components/projectCard";

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
        <h1 className="font-extrabold text-center">PROJECTS</h1>
        <button onClick={() => setCurrentPage('home')} className="text-sm hover:underline cursor-pointer">back</button>
      </div>
      <div className="p-2 pt-1 overflow-auto h-full">
        <ProjectCard title={"Judgement Call"} description={"A game based around different ethical perspectives. Created by Tejas Panja, Inesh Dey and Alexander Helfman for AP Lang"} date={"Feb 2025"} gh={"https://github.com/tejasdoesstuff/ethics-game"} link={"https://somebody4545.github.io/judgement-call-build/"} pic={"/judgementcallpic.jpg"}/>
        <ProjectCard title={"Judgement Call"} description={"A game based around different ethical perspectives. Created by Tejas Panja, Inesh Dey and Alexander Helfman for AP Lang"} date={"Feb 2025"} gh={"https://github.com/tejasdoesstuff/ethics-game"} link={"https://somebody4545.github.io/judgement-call-build/"} pic={"/judgementcallpic.jpg"}/>
        <ProjectCard title={"Judgement Call"} description={"A game based around different ethical perspectives. Created by Tejas Panja, Inesh Dey and Alexander Helfman for AP Lang"} date={"Feb 2025"} gh={"https://github.com/tejasdoesstuff/ethics-game"} link={"https://somebody4545.github.io/judgement-call-build/"} pic={"/judgementcallpic.jpg"}/>
        <ProjectCard title={"Judgement Call"} description={"A game based around different ethical perspectives. Created by Tejas Panja, Inesh Dey and Alexander Helfman for AP Lang"} date={"Feb 2025"} gh={"https://github.com/tejasdoesstuff/ethics-game"} link={"https://somebody4545.github.io/judgement-call-build/"} pic={"/judgementcallpic.jpg"}/>
        <ProjectCard title={"Judgement Call"} description={"A game based around different ethical perspectives. Created by Tejas Panja, Inesh Dey and Alexander Helfman for AP Lang"} date={"Feb 2025"} gh={"https://github.com/tejasdoesstuff/ethics-game"} link={"https://somebody4545.github.io/judgement-call-build/"} pic={"/judgementcallpic.jpg"}/>
      </div>
    </div>
  );
}