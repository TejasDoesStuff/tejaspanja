import { useState } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function MagneticButton({ children, className = "", onClick }: MagneticButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isHovered) setIsHovered(true);
    
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();

    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;

    const distanceX = e.clientX - buttonCenterX;
    const distanceY = e.clientY - buttonCenterY;

    button.style.transform = `translate(${distanceX / 6}px, ${distanceY / 6}px)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsHovered(false);
    e.currentTarget.style.transform = "translate(0, 0)";
  };

  const buttonClasses = `${className} ${isHovered ? 'rounded-[0%]' : 'rounded-[100%]'}`.trim();

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      style={{ 
        transition: "transform 0.2s ease-out, border-radius 0.2s ease-out",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}