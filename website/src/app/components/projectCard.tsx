import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function projectCard({
  title,
  date,
  category,
  description,
  link,
  gh,
  pic,
}) {
  const [expanded, setExpanded] = useState(false);

  const expand = (e) => {
    if (!expanded) {
      setExpanded(true);
    } else {
      setExpanded(false);
    }
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
            <div className="w-1/2">
              <Image
                src={pic}
                alt={title}
                width={120}
                height={90}
                className="w-full h-auto object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
