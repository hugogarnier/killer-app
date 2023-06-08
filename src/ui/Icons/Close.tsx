import React, { FC } from 'react';

import Svg, { Path } from 'react-native-svg';

type CloseProps = {
  width?: number;
  height?: number;
  color?: string;
};
export const Close: FC<CloseProps> = ({ width = '24', height = '24', color = '#333333' }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M7.75745 16.2429L16.2427 7.75764"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.2426 16.2429L7.75733 7.75764"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
