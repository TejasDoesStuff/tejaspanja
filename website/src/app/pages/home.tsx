import Image from "next/image"

export default function Home({ setCurrentPage }) {
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
        <h1 className="font-extrabold text-center">TEJAS PANJA</h1>
        <h2 className="text-sm">hi</h2>
      </div>
      <div className="p-2 mb-2 flex justify-around w-full h-full items-center">
        <div 
          className="flex flex-col items-center hover:scale-110 transition-all duration-300 folder-item cursor-pointer"
          onClick={() => setCurrentPage('projects')}
        >
          <Image src="/folder.svg" width={40} height={40} alt="Projects" />
          <span className="folder-label text-sm">Projects</span>
        </div>
        <div 
          className="flex flex-col items-center m-1 hover:scale-110 transition-all duration-100 folder-item cursor-pointer"
          onClick={() => setCurrentPage('about')}
        >
          <Image src="/folder.svg" width={40} height={40} alt="About" />
          <span className="folder-label text-sm">About</span>
        </div>
        <div 
          className="flex flex-col items-center m-1 hover:scale-110 transition-all duration-100 folder-item cursor-pointer"
          onClick={() => setCurrentPage('skills')}
        >
          <Image src="/folder.svg" width={40} height={40} alt="Skills" />
          <span className="folder-label text-sm">Skills</span>
        </div>
        <div 
          className="flex flex-col items-center m-1 hover:scale-110 transition-all duration-100 folder-item cursor-pointer"
          onClick={() => setCurrentPage('contact')}
        >
          <Image src="/folder.svg" width={40} height={40} alt="Contact" />
          <span className="folder-label text-sm">Contact</span>
        </div>
      </div>
    </div>
  );
}
