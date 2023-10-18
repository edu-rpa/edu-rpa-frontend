import React from 'react';

interface SVGIconProps {
  svgComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  width?: string;
  height?: string;
}

const SVGIcon: React.FC<SVGIconProps> = ({
  svgComponent: SVGComponent,
  width = '24px',
  height = '24px',
}) => {
  return <SVGComponent width={width} height={height} />;
};

export default SVGIcon;
