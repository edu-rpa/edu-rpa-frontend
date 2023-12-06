import { Rectangle } from '@/types/boundingBox';
import React, { useState, useEffect } from 'react';

type BoundingBoxProps = {
  imageUrl: string;
  rectangles: Rectangle[];
  onNewRectangle: (newRectangles: Rectangle | Rectangle[]) => void;
};

const BoundingBox: React.FC<BoundingBoxProps> = ({
  imageUrl,
  rectangles,
  onNewRectangle,
}) => {
  const [currentRect, setCurrentRect] = useState<Rectangle | null>(null);
  const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    setCurrentRect(null);
  }, [rectangles]);

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
      onNewRectangle([...rectangles, { ...currentRect, label: '' }]);
    }
    setCurrentRect(null);
    setDrawing(false);
  };

  const handleLabelChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedRectangles = rectangles.map((rect, idx) =>
      idx === index ? { ...rect, label: event.target.value } : rect
    );
    onNewRectangle(updatedRectangles);
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
      <img src={imageUrl} alt="Bounding Box Target" className="w-full h-auto" />
      {rectangles.map((rect, index) => (
        <div key={index} style={getStyle(rect)}>
          <input
            type="text"
            value={rect.label || ''}
            onChange={(e) => handleLabelChange(e, index)}
            style={{
              position: 'absolute',
              width: '30%',
              top: 0,
              border: 'none',
              padding: '2px',
              fontSize: 'small',
            }}
            placeholder="Label"
          />
        </div>
      ))}
      {currentRect && <div style={getStyle(currentRect)} />}
    </div>
  );
};

export default BoundingBox;
