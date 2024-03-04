import { DataTemplate, Rectangle } from '@/types/boundingBox';
import React, { useState, useEffect } from 'react';

type BoundingBoxProps = {
  imageUrl: string;
  dataTemplate: DataTemplate;
  onNewRectangle: (newRectangles: Rectangle) => void;
  onLabelChange: (oldLabel: string, newLabel: string, event: React.ChangeEvent<HTMLInputElement>) => void;
  onErrorImage?: () => void;
};

const BoundingBox: React.FC<BoundingBoxProps> = ({
  imageUrl,
  dataTemplate,
  onNewRectangle,
  onLabelChange,
  onErrorImage,
}) => {
  const [currentRect, setCurrentRect] = useState<Rectangle | null>(null);
  const [drawing, setDrawing] = useState(false);
  const [oldLabelToChange, setOldLabelToChange] = useState('');

  useEffect(() => {
    setCurrentRect(null);
  }, [dataTemplate]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const startX = e.clientX - rect.left;
    const startY = e.clientY - rect.top;
    setCurrentRect({
      left: startX,
      top: startY,
      right: startX,
      bottom: startY,
    });
    setDrawing(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!drawing) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    setCurrentRect((prevRect) => {
      if (!prevRect) return null;
      return {
        ...prevRect,
        right: currentX,
        bottom: currentY,
      };
    });
  };

  const handleMouseUp = () => {
    if (currentRect && currentRect.left !== currentRect.right) {
      onNewRectangle(currentRect);
    }
    setCurrentRect(null);
    setDrawing(false);
  };

  const handleLabelChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    oldLabel: string,
  ) => {
    setOldLabelToChange(oldLabel);
  };

  const getStyle = (rect: Rectangle) => {
    const width = rect.right - rect.left;
    const height = rect.bottom - rect.top;
    return {
      left: rect.left,
      top: rect.top,
      width: width,
      height: height,
      position: 'absolute',
      border: '2px solid red',
    } as React.CSSProperties;
  };

  return (
    <div
      className="relative w-full h-full select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}>
      <img
        src={imageUrl}
        alt="Bounding Box Target"
        className=""
        onError={onErrorImage}
      />
      {Object.keys(dataTemplate).map((label, index) => {
        const rect = dataTemplate[label];
        return (
          <div key={index} style={getStyle(rect)}>
            <input
              type="text"
              defaultValue={label}
              onChange={(e) => handleLabelChange(e, label)}
              onBlur={(e) => onLabelChange(oldLabelToChange, e.target.value, e)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.currentTarget.blur();
                }
              }}
              style={{
                position: 'absolute',
                width: '100%',
                minWidth: '50px',
                top: '-25px',
                border: 'none',
                padding: '2px',
                fontSize: 'small',
              }}
              placeholder="Label"
            />
          </div>
        )
      })}
      {currentRect && <div style={getStyle(currentRect)} />}
    </div>
  );
};

export default BoundingBox;
