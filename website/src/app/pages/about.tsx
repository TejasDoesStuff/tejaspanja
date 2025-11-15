import Image from "next/image";
import BackButton from "../components/backButton";
import { memo, useState } from "react";
import { FaGithub, FaSoundcloud, FaYoutube, FaEnvelope } from "react-icons/fa";

interface AboutProps {
  setCurrentPage: (page: string) => void;
}

function About({ setCurrentPage }: AboutProps) {
  const [showPronunciation, setShowPronunciation] = useState(false);

  return (
    <>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <div
        onClick={(e) => e.stopPropagation()}
        className="lg:w-150 w-60 h-100 bg-transparent overflow-hidden font-sans text-[#010101] flex flex-col rounded border-2 border-black transform translate-z-0"
      >
        <div className="w-full h-6 border-b-2 border-black flex items-center justify-between px-1 bitcount">
          <h1 className="font-extrabold text-center text-xs sm:text-base">
            ABOUT ME
          </h1>
          <BackButton setCurrentPage={setCurrentPage} page={"home"} />
        </div>

        <div className="p-4 overflow-y-auto h-full flex gap-1">
          <div className="h-full w-1/3 flex-shrink-0">
            <div className="relative w-full h-full overflow-hidden rounded">
              <Image
                src="/IMG_8016 2.png"
                alt="me holding a lego set"
                height={500}
                width={500}
                className="object-cover object-[80%_center] w-full h-full"
              />
            </div>
          </div>

          <div className="w-2/3 flex flex-col gap-1">
            <div className="w-full flex-1 overflow-hidden rounded">
              <Image
                src="/IMG_4192.png"
                alt="me in some grass"
                height={500}
                width={500}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="flex flex-row gap-1 h-48">
              <div className="w-2/3 flex flex-col">
                <div className="leading-none">
                  <h2 className="font-bold text-2xl leading-none">
                    hi! i'm{" "}
                    <span 
                      className="relative inline-block cursor-help"
                      onMouseEnter={() => setShowPronunciation(true)}
                      onMouseLeave={() => setShowPronunciation(false)}
                    >
                      tejas
                      {showPronunciation && (
                        <span className="absolute -top-7 -left-2 bg-white text-black px-2 py-1 rounded text-xs whitespace-nowrap shadow-md z-50 animate-[fadeIn_0.2s_ease-in-out]">
                          (TAY-juhs)
                        </span>
                      )}
                    </span>{" "}
                    :D
                  </h2>
                  <p className="text-sm opacity-75">but you can call me tj :)</p>
                  <p className="text-md mt-1 text-justify">i'm pretty cool. i do cool things. these cool things include coding, music, graphic design, video editing, and more. this website is also pretty cool.</p>
                </div>
                <p className="text-sm opacity-75 mt-0.5 text-right">based in washington</p>
                <div className="flex gap-3 mt-1 justify-around">
                  <a href="https://github.com/tejasdoesstuff" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                    <FaGithub className="w-6 h-6"/>
                  </a>
                  <a href="https://soundcloud.com/tjtjtjtjtjtj" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                    <FaSoundcloud className="w-6 h-6"/>
                  </a>
                  <a href="https://youtube.com/@tejaspanja" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                    <FaYoutube className="w-6 h-6"/>
                  </a>
                  <a href="mailto:tejaspanja@gmail.com" className="hover:opacity-70 transition-opacity">
                    <FaEnvelope className="w-6 h-6"/>
                  </a>
                </div>
              </div>
              <div className="w-1/2 overflow-hidden rounded">
                <Image
                  src="/IMG_8720.png"
                  alt="me in a suit on a swing"
                  height={500}
                  width={500}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(About);
