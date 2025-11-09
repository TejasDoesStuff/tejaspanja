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
    >
      <div className="w-full h-6 border-b-2 border-black flex items-center justify-between px-1 bitcount">
        <div className="flex flex-row items-center gap-2">
          <h1 className="font-extrabold text-center text-xs sm:text-base">CODE</h1>
          <Link
              href="https://github.com/tejasdoesstuff"
              target="_blank"
              className="hover:opacity-70 transition-all"
            >
              <Image
                src="/github.svg"
                alt="link"
                width={16}
                height={16}
                className="cursor-pointer"
                unoptimized
              />
            </Link>
        </div>
        <BackButton setCurrentPage={setCurrentPage} page={'projects'}/>
      </div>
      <div className="p-2 pt-1 overflow-auto h-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          <ProjectCard title={"Particle Life Simulator"} description={<>A simple particle life simulator build in Java with JavaFX. <a className="underline hover:opacity-70 transition-all "href="https://www.youtube.com/watch?v=p4YirERTVF0" target="_blank" rel="noopener noreferrer">Based on Tom Mohr's rendition</a>. Created by Tejas Panja</>} date={"Mar 2025 - Present"} gh={"https://github.com/tejasdoesstuff/particle-sim"} category={"Simulation"} link={""} pic={"/particlesimpic.jpg"}/>
          <ProjectCard title={"A* Pathfinding Visualizer"} description={"A simple visualizer for the A* Pathfinding algorithm where you can draw walls and each tile is given a random weight. Created by Tejas Panja"} date={"Jul 2025 - Present"} gh={"https://github.com/tejasdoesstuff/astarpathfinding"} category={"Simulation"} link={""} pic={"/astarpathfindingpic.jpg"}/>
          <ProjectCard title={"World Generation Project"} description={"A project that uses perlin-noise and jMonkeyEngine to simulate the world generation of Minecraft. Created by Tejas Panja for APCSA."} date={"Jun 2025"} category={"Simulation"} gh={"https://github.com/TejasDoesStuff/Minecraft"} link={""} pic={"/minecraftpic.jpg"}/>
          <ProjectCard title={"Judgement Call"} description={"A game based around different ethical perspectives. Created by Tejas Panja, Inesh Dey, and Alexander Helfman for AP Lang."} date={"Feb 2025"} category={"Games"} gh={"https://github.com/tejasdoesstuff/ethics-game"} link={"https://somebody4545.github.io/judgement-call-build/"} pic={"/judgementcallpic.jpg"}/>
          <ProjectCard title={"Beacon"} description={<>A project that provides a platform for users to mark and rate urban locations based on their accessibility features. Created for the EmP Spring Hackfest 2025 by <a className="underline hover:opacity-70 transition-all "href="https://github.com/TheSigmaSociety" target="_blank" rel="noopener noreferrer">The Sigma Society</a></>} date={"Feb 2025"} category={"Hackathon"} gh={"https://github.com/TheSigmaSociety/Beacon"} link={""} pic={"/beaconpic.jpg"}/>
          <ProjectCard title={"Connext"} description={"A Tesla STEM job finding site for high schoolers. Created by Tejas Panja, Inesh Dey, and Anirudh Narasimhan for FBLA Website Coding and Development."} date={"Nov 2024 - Feb 2025"} category={"Website"} gh={"https://github.com/TejasDoesStuff/Website-Coding-and-Development"} link={""} pic={"/conextpic.jpg"}/>
          <ProjectCard title={"Bite Mark Analysis"} description={"A machine learning model that uses image recognition to collect class evidence from bite marks. Code done by Tejas Panja."} date={"Dec 2024 - Jan 2025"} category={"Machine Learning"} gh={"https://github.com/TejasDoesStuff/bite-mark-analysis"} link={""} pic={"/judgementcallpic.jpg"}/>
          <ProjectCard title={"FRC 5827 Website"} description={"A website built for the FRC Team 5827, Code Purple. Created by Tejas Panja and Omkar Page."} date={"Dec 2024 - Jan 2025"} category={"Website"} gh={"https://github.com/TejasDoesStuff/CodePurple"} link={"https://www.codepurple5827.com/"} pic={"/codepurplepic.jpg"}/>
          <ProjectCard title={"Planet Pathfinder"} description={<>A project that finds the most efficient pathway to explore multiple planets, starting on Earth. Won 3rd place in our division for the EmP Summer Hackfest. Created by <a className="underline hover:opacity-70 transition-all "href="https://github.com/TheSigmaSociety" target="_blank" rel="noopener noreferrer">The Sigma Society</a></>} date={"Sep 2024"} category={"Hackathon"} gh={"https://github.com/TheSigmaSociety/PlanetPathfinder"} link={""} pic={"/planetpathfinderpic.jpg"}/>
          <ProjectCard title={"Sustainability Scanner"} description={<>A project that scans grocery items and tells you how sustainable the item is. Won 2nd place overall for Hackabyte's Summer Online Hackathon by <a className="underline hover:opacity-70 transition-all "href="https://github.com/TheSigmaSociety" target="_blank" rel="noopener noreferrer">The Sigma Society</a></>} date={"Aug 2024"} category={"Hackathon"} gh={"https://github.com/TheSigmaSociety/SustainabilityScanner"} link={"https://www.youtube.com/watch?v=0KNaG2DckVo&feature=youtu.be"} pic={"/sustainabilityscannerpic.jpg"}/>
          <ProjectCard title={"GPA Wizard"} description={"A Tesla STEM GPA Calculator built using HTML, CSS, JS, and Python. Created by Tejas Panja, Kaushal Dabbiru, and Safwan Hasan for the Intro to Programming FBLA event. Won 2nd place regionals and 5th place states."} link={""} date={"Dec 2023 - Apr 2024"} category={"Website"} gh={"https://github.com/TejasDoesStuff/GPACalc"} pic={"/judgementcallpic.jpg"}/>
          <ProjectCard title={"Class Companion"} description={<>A project that provides speech to text translation and summarizes it into notes automatically. Won an Honorable Mention at the Hackabyte Spring Hackathon by <a className="underline hover:opacity-70 transition-all "href="https://github.com/TheSigmaSociety" target="_blank" rel="noopener noreferrer">The Sigma Society</a></>} date={"Apr 2024"} category={"Hackathon"} gh={"https://github.com/TheSigmaSociety/ClassCompanion"} link={"https://youtu.be/tFVflSP_E-A"} pic={"/classcompanionpic.jpg"}/>
          <ProjectCard title={"Priority Planner"} description={<>A project that automatically organizes your tasks based on your importance. Won 2nd place and a $60 cash prize within our division at the EmP Spring Hackfest 2024. Created by <a className="underline hover:opacity-70 transition-all "href="https://github.com/TheSigmaSociety" target="_blank" rel="noopener noreferrer">The Sigma Society</a></>} date={"Feb 2024"} category={"Hackathon"} gh={"https://github.com/TheSigmaSociety/PriorityPlanner"} link={""} pic={"/priorityplannerpic.jpg"}/>
          <ProjectCard title={"Bad Game Design"} description={"A game built for the GMTK GameJam 2023. My first complete game built on Unity, it was based on the theme \"Role Reversal\" and the player takes on the role of the level, trying to kill the runner. Code by Tejas Panja."} date={"Jul 2023"} category={"Games"} gh={""} link={"https://cyanixe.itch.io/bad-game-design"} pic={"/badgamedesignpic.jpg"}/>
        </div>
      </div>
    </div>
  );
}

export default memo(Projects);