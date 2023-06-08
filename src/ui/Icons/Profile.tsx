import React, { FC } from 'react';

import Svg, { Circle, Path } from 'react-native-svg';

type ProfileProps = {
  width?: number;
  height?: number;
  color?: string;
};
export const Profile: FC<ProfileProps> = ({ width = '30', height = '30', color = '#333333' }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 30 30" fill="none">
      <Circle cx="12" cy="7.5" r="3.5" stroke={color} strokeWidth="1.5" />
      <Path
        d="M5 20V17C5 15.3431 6.34315 14 8 14H16C17.6569 14 19 15.3431 19 17V20"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
