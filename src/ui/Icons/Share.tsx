import React, { FC } from 'react';

import Svg, { Path } from 'react-native-svg';

type ShareProps = {
  width?: number;
  height?: number;
  color?: string;
};
export const Share: FC<ShareProps> = ({ width = '24', height = '24', color = '#333333' }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9.53846 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V14.9804"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M15 4H20V9"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M19.5 4.5L12.5 11.5"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};
