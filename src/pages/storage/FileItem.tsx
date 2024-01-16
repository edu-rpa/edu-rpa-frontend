import React, { useState } from 'react';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton } from '@chakra-ui/react';
import SVGIcon from '@/components/Icons/SVGIcon';
import ImageFileIcon from '@/assets/svgs/file-icon-image.svg';
import XlsxFileIcon from '@/assets/svgs/file-icon-xlsx.svg';
import PdfFileIcon from '@/assets/svgs/file-icon-pdf.svg';
import TxtFileIcon from '@/assets/svgs/file-icon-txt.svg';
import DefaultFileIcon from '@/assets/svgs/file-icon-default.svg';

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

  const getFileIconSVG = (fileName: string) => {
    const fileExtension = fileName.split('.').pop();
    switch (fileExtension) {
      case 'png':
      case 'jpg':
      case 'jpeg':
      case 'gif':
        return ImageFileIcon;
      case 'xlsx':
      case 'xls':
        return XlsxFileIcon;
      case 'pdf':
        return PdfFileIcon;
      case 'txt':
        return TxtFileIcon;
      default:
        return DefaultFileIcon;
    }
  }

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
          <SVGIcon
            svgComponent={getFileIconSVG(name)}
            width='60px'
            height='60px'
          />
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
