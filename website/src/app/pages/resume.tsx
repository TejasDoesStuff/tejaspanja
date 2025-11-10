import BackButton from "../components/backButton";
import { memo } from "react";
import { FaDownload } from "react-icons/fa";

interface AboutProps {
  setCurrentPage: (page: string) => void;
}

function About({ setCurrentPage }: AboutProps) {
  const resumePath = "/resume.pdf";

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="lg:w-150 w-60 h-100 bg-transparent overflow-hidden font-sans text-[#010101] flex flex-col rounded border-2 border-black transform translate-z-0"
    >
      <div className="w-full h-6 border-b-2 border-black flex items-center justify-between px-1 bitcount">
        <h1 className="font-extrabold text-center text-xs sm:text-base flex gap-2 items-center">
          RESUME
          <a
            href={resumePath}
            download="Tejas_Panja_Resume.pdf"
            className="hover:opacity-70 transition-opacity"
            title="Download Resume"
          >
            <FaDownload className="w-4 h-4" />
          </a>
        </h1>
        <div className="flex gap-2 items-center">
          <BackButton setCurrentPage={setCurrentPage} page={"home"} />
        </div>
      </div>

      <div className="p-4 h-full overflow-hidden">
        <iframe
          src={resumePath}
          className="w-full h-full border-0 rounded"
          title="Resume"
        />
      </div>
    </div>
  );
}

export default memo(About);
