import React, { useState } from 'react';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ArticleIcon from '@mui/icons-material/Article';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

interface FileItemProps {
  name: string;
  onClick: (name: string) => void;
}

const FileItem: React.FC<FileItemProps> = ({ name, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const isDirectory = name.endsWith('/');

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`flex flex-col justify-center items-center cursor-pointer ${isHovered ? 'bg-gray-300' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(name)}
    >
      <div className="flex justify-center items-center">{
        isDirectory
          ? <FolderOpenIcon sx={{ fontSize: 60 }} />
          : isHovered ? <CloudDownloadIcon sx={{ fontSize: 60 }} /> : <ArticleIcon sx={{ fontSize: 60 }} />
      }</div>
      <div className="text-center">{name}</div>
    </div>
  );
};

export default FileItem;
