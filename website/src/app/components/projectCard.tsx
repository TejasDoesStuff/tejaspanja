import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

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
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (expanded && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [expanded]);

  const expand = () => {
    setExpanded(!expanded);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setExpanded(false);
    }
  };

  const aspectRatios = expanded
    ? category === "Poster"
      ? "aspect-[3/4]"
      : "aspect-[16/7]"
    : "aspect-[16/9]";

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
    <>
      <div 
        ref={cardRef}
        className={`border-2 border-black cursor-pointer transition-all duration-300 hover:scale-105 rounded-tr-2xl rounded-tl-2xl overflow-hidden`}
        onClick={expand}
      >
        <div className={`relative group overflow-hidden ${aspectRatios}`}>
          <Image
            src={images[currentImageIndex]}
            alt={`${title} - Image ${currentImageIndex + 1}`}
            width={400}
            height={200}
            className="w-full h-full object-cover"
            priority
          />
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white px-2 py-3 text-sm opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ←
              </button>
              <button
                onClick={nextImage}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white px-2 py-3 text-sm opacity-0 group-hover:opacity-100 transition-opacity"
              >
                →
              </button>
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs bg-black/50 text-white px-2 py-1 rounded">
                {currentImageIndex + 1}/{images.length}
              </div>
            </>
          )}
        </div>

        <div className="p-2">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-bold text-sm">{title}</h2>
            <div className="flex items-center gap-1">
              {link && (
                <Link
                  href={link}
                  target="_blank"
                  className="hover:opacity-70 transition-all"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src="/linksvg.svg"
                    alt="link"
                    width={16}
                    height={16}
                    className="cursor-pointer"
                  />
                </Link>
              )}
              {gh && (
                <Link
                  href={gh}
                  target="_blank"
                  className="hover:opacity-70 transition-all"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src="/github.svg"
                    alt="github"
                    width={16}
                    height={16}
                    className="cursor-pointer"
                  />
                </Link>
              )}
            </div>
          </div>
          
          <p className="text-[.55rem] text-gray-600 mb-1">{date} • {category}</p>
        </div>
      </div>

      {expanded && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={handleOverlayClick}
        >
          <div className="bg-white border-black border-2 max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row gap-4 p-4 rounded-tr-4xl rounded-tl-4xl">
            <div className="relative flex-shrink-0 md:w-1/2 flex items-center justify-center">
              <Image
                src={images[currentImageIndex]}
                alt={`${title} - Image ${currentImageIndex + 1}`}
                width={400}
                height={533}
                className="w-full h-auto object-contain"
                priority
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white px-3 py-4"
                  >
                    ←
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white px-3 py-4"
                  >
                    →
                  </button>
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs bg-black/50 text-white px-2 py-1 rounded">
                    {currentImageIndex + 1}/{images.length}
                  </div>
                </>
              )}
            </div>
            <div className="md:w-1/2 flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-bold text-lg">{title}</h2>
              </div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs text-gray-600">{date} • {category}</p>
                <div className="flex gap-2">
                  {link && (
                    <Link
                      href={link}
                      target="_blank"
                      className="hover:opacity-70 transition-all"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Image src="/linksvg.svg" alt="link" width={16} height={16} />
                    </Link>
                  )}
                  {gh && (
                    <Link
                      href={gh}
                      target="_blank"
                      className="hover:opacity-70 transition-all"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Image src="/github.svg" alt="github" width={16} height={16} />
                    </Link>
                  )}
                </div>
              </div>
              <p className="leading-relaxed text-sm">{description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
