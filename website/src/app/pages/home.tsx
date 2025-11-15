import Image from "next/image"
import { memo, useCallback, useState } from "react"

interface HomeProps {
  setCurrentPage: (page: string) => void;
}

interface FolderContent {
  name: string;
  count?: string | number;
  gradient: string;
  action?: 'navigate' | 'download';
  downloadUrl?: string;
}

interface FolderData {
  id: string;
  label: string;
  hasCarousel: boolean;
  contents?: FolderContent[];
}

const folderData: FolderData[] = [
  {
    id: 'projects',
    label: 'Projects',
    hasCarousel: true,
    contents: [
      { name: 'Code', count: 14, gradient: 'from-blue-500/10 to-purple-500/10', action: 'navigate' },
      { name: 'Music', gradient: 'from-pink-500/10 to-red-500/10', action: 'navigate' },
      { name: 'Graphic Design', count: 12, gradient: 'from-green-500/10 to-teal-500/10', action: 'navigate' },
      { name: 'Research', gradient: 'from-orange-500/10 to-yellow-500/10', action: 'navigate' },
    ]
  },
  {
    id: 'about',
    label: 'About',
    hasCarousel: false,
  },
  {
    id: 'resume',
    label: 'Resume',
    hasCarousel: true,
    contents: [
      { name: 'View Resume', gradient: 'from-indigo-500/10 to-blue-500/10', action: 'navigate' },
      { name: 'Download PDF', gradient: 'from-violet-500/10 to-purple-500/10', action: 'download', downloadUrl: '/resume.pdf' },
    ]
  },
  {
    id: 'blog',
    label: 'Blog',
    hasCarousel: false,
  },
];

function Home({ setCurrentPage }: HomeProps) {
  const [hoveredFolder, setHoveredFolder] = useState<string | null>(null);
  const [selectedContentIndex, setSelectedContentIndex] = useState<number>(0);

  const handlePageChange = useCallback((page: string) => {
    setCurrentPage(page);
  }, [setCurrentPage]);

  const handleContentClick = useCallback((folderId: string, content: FolderContent) => {
    if (content.action === 'download' && content.downloadUrl) {
      const link = document.createElement('a');
      link.href = content.downloadUrl;
      link.download = 'Tejas_Panja_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      if (folderId === 'projects') {
        setCurrentPage(content.name.toLowerCase().replace(' ', ''));
      } else {
        setCurrentPage(folderId);
      }
    }
  }, [setCurrentPage]);

  const handleFolderClick = useCallback((folder: FolderData) => {
    if (!folder.hasCarousel || hoveredFolder === folder.id) {
      handlePageChange(folder.id);
    }
  }, [hoveredFolder, handlePageChange]);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="lg:w-150 w-60 h-100 bg-transparent overflow-hidden font-sans text-[#010101] flex flex-col rounded border-2 border-black transform translate-z-0"
    >
      <div className="w-full h-6 border-b-2 border-black flex items-center justify-between px-1">
        <h1 className="font-extrabold text-center text-xs sm:text-base">TEJAS PANJA</h1>
        <h2 className="text-xs sm:text-sm">hi</h2>
      </div>
      <div className="p-2 flex flex-col sm:flex-row justify-around w-full h-full items-center gap-2 sm:gap-0 relative overflow-visible">
        {folderData.map((folder) => (
          <div
            key={folder.id}
            className="relative flex flex-col items-center z-10"
            onMouseEnter={() => {
              if (folder.hasCarousel) {
                setHoveredFolder(folder.id);
                setSelectedContentIndex(0);
              }
            }}
            onMouseLeave={() => {
              if (folder.hasCarousel) {
                setHoveredFolder(null);
                setSelectedContentIndex(0);
              }
            }}
          >
            <div 
              className={`flex flex-col items-center hover:scale-110 active:scale-95 transition-all duration-300 folder-item cursor-pointer will-change-transform ${
                hoveredFolder === folder.id ? 'scale-100' : ''
              }`}
              onClick={() => handleFolderClick(folder)}
            >
              <Image src="/folder.svg" width={64} height={64} alt={folder.label} priority unoptimized />
              <span className={`folder-label text-xs sm:text-sm ${hoveredFolder === folder.id ? '!opacity-100 !transform-none' : ''}`}>{folder.label}</span>
            </div>

            {folder.hasCarousel && folder.contents && (
              <div className={`absolute top-full mt-2 flex flex-col items-center justify-center transition-all duration-300 ${
                hoveredFolder === folder.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
              }`} style={{ width: '300px', height: '100px' }}>
                <div className="relative w-full h-full flex items-center justify-center overflow-visible">
                  {folder.contents.map((content, index) => {
                    const offset = index - selectedContentIndex;
                    const isCenter = offset === 0;
                    const opacity = isCenter ? 1 : 0.4;
                    const translateX = offset * 70;
                    
                    return (
                      <div
                        key={content.name}
                        className={`absolute flex flex-col items-center justify-center p-2 transition-all duration-300 cursor-pointer bg-gray-50 bg-gradient-to-br ${content.gradient} ${
                          isCenter ? 'scale-110 z-20' : 'scale-90 z-10'
                        }`}
                        style={{
                          opacity,
                          transform: `translateX(${translateX}px) scale(${isCenter ? 1.1 : 0.9})`,
                          boxShadow: isCenter ? '0 0 20px 4px rgba(59, 130, 246, 0.6), 0 0 40px 8px rgba(59, 130, 246, 0.4)' : 'none',
                          border: isCenter ? '3px solid rgb(59, 130, 246)' : '2px solid transparent',
                          width: '60px',
                          height: '60px',
                        }}
                        onMouseEnter={() => setSelectedContentIndex(index)}
                        onClick={() => handleContentClick(folder.id, content)}
                      >
                        {content.count && (
                          <div className="absolute -top-1 -right-1 bg-black text-white text-xs px-1.5 py-0.5 rounded-full font-bold z-10">
                            {content.count}
                          </div>
                        )}
                        <div className="mb-0.5">
                          <Image src="/document.svg" width={24} height={24} alt={content.name} priority unoptimized />
                        </div>
                        <span className="font-bold text-[10px] text-center leading-tight">{content.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(Home);
