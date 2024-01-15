import React, { useState } from 'react';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ArticleIcon from '@mui/icons-material/Article';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton } from '@chakra-ui/react';

interface FileItemProps {
  name: string;
  onClick: (name: string) => void;
  onClickDelete: (name: string) => void;
  isLoading?: boolean;
}

const FileItem: React.FC<FileItemProps> = ({
  name,
  onClick,
  onClickDelete,
  isLoading,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const isDirectory = name && name.endsWith('/');

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`flex flex-col justify-center items-center cursor-pointer ${
        isHovered ? 'bg-gray-300' : ''
      } ${isLoading ? 'opacity-50' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(name)}
      style={{ position: 'relative' }}>
      <div className="flex justify-center items-center">
        {isDirectory ? (
          <FolderOpenIcon sx={{ fontSize: 60 }} />
        ) : isHovered ? (
          <CloudDownloadIcon sx={{ fontSize: 60 }} />
        ) : (
          <ArticleIcon sx={{ fontSize: 60 }} />
        )}
      </div>
      <div className="text-center">{name}</div>
      {isHovered && (
        <IconButton
          aria-label="delete"
          size="sm"
          style={{ position: 'absolute', top: 0, right: 0 }}
          colorScheme="red"
          isRound
          variant="outline"
          icon={<ClearIcon />}
          onClick={(e) => {
            e.stopPropagation();
            onClickDelete(name);
          }}
        />
      )}
    </div>
  );
};

export default FileItem;
