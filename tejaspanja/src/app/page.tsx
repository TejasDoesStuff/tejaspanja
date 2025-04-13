"use client";

import Marquee from "react-fast-marquee";
import StickyButton from "./components/StickyButton";

export default function Home() {
  return (
    <div className="w-screen h-screen p-10">
      <div className="border-white border-4 w-full h-auto p-10 flex flex-col">
        <div className = "flex flex-row">
          <div className="w-1/2 p-6">
            <h1 className="text-9xl font-bold w-1/3">TEJAS PANJA</h1>
            <div className="w-3/4">
            <Marquee className="text-2xl" speed={35}>
              / Coding // Videography // Music // Graphic Design /{" "}
            </Marquee>
            </div>
            <p className="mt-6 text-md text-justify w-1/2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur error sequi velit nostrum alias consequatur sed aliquam. Commodi, minima et iste exercitationem dolorem officia necessitatibus eos optio voluptas. Debitis, repudiandae for monkey!
            </p>
            <StickyButton className="bg-black text-white p-4 border-white border-2 mt-10 text-2xl">
              See Work
            </StickyButton>
          </div>
          <div className="w-1/2 h-full flex justify-center items-center">
            <div className="border-white border-2 aspect-square w-full flex justify-center items-center text-3xl">
              Image Placeholder
            </div>
          </div>
        </div>

        <div></div>
      </div>
    </div>
  );
}
