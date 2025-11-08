import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ProjectCardProps {
  title: string;
  date: string;
  category: string;
  description: React.ReactNode;
  link?: string;
  gh?: string;
  pic: string | string[];
}

export default function projectCard({
  title,
  date,
  category,
  description,
  link,
  gh,
  pic,
}: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const expand = (e: React.MouseEvent<HTMLHeadingElement>) => {
    if (!expanded) {
      setExpanded(true);
    } else {
      setExpanded(false);
    }
  };

  const images = Array.isArray(pic) ? pic : [pic];

  const nextImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCurrentImageIndex((prev: number) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCurrentImageIndex((prev: number) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="mb-1 border-b">
      <div className="flex flex-row items-center justify-between -mb-0.5 " >
        <h2 className="font-bold cursor-pointer hover:scale-105 transition-all" onClick={expand}>{title}</h2>
        <div className="flex items-center gap-1">
          {link && (
            <Link
              href={link}
              target="_blank"
              className="hover:opacity-70 transition-all"
            >
              <Image
                src="/linksvg.svg"
                alt="github"
                width={8}
                height={8}
                className="cursor-pointer"
              />
            </Link>
          )}
          {gh && (
            <Link
              href={gh}
              target="_blank"
              className="hover:opacity-70 transition-all"
            >
              <Image
                src="/github.svg"
                alt="link"
                width={8}
                height={8}
                className="cursor-pointer"
              />
            </Link>
          )}
        </div>
      </div>
      <p className="text-[.50rem]">{date} • {category}</p>

      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          expanded ? "max-h-96 opacity-100 mt-1 mb-2" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-row justify-between items-start gap-2 overflow-hidden">
          <div className="w-1/2 h-auto">
            <p className="text-[.5rem]/2">{description}</p>
          </div>
          {pic && (
            <div className="w-1/2 relative group">
              <Image
                src={images[currentImageIndex]}
                alt={`${title} - Image ${currentImageIndex + 1}`}
                width={120}
                height={90}
                className="w-full h-auto object-cover"
                priority
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white px-1 py-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ←
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white px-1 py-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    →
                  </button>
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[.4rem] bg-black/50 text-white px-1 rounded">
                    {currentImageIndex + 1}/{images.length}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
