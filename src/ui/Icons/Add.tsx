import React, { FC } from 'react';

import Svg, { Path } from 'react-native-svg';

type AddProps = {
  width?: number;
  height?: number;
  color?: string;
};
export const Add: FC<AddProps> = ({ width = '24', height = '24', color = '#333333' }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 12L18 12"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 18L12 6"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
