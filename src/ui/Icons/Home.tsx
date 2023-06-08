import React, { FC } from 'react';

import Svg, { Path } from 'react-native-svg';

type HomeProps = {
  width?: number;
  height?: number;
  color?: string;
};
export const Home: FC<HomeProps> = ({ width = '24', height = '24', color = '#333333' }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 16.8095V19C12 20.1046 11.1046 21 10 21H7C5.89543 21 5 20.1046 5 19V13"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15 21H17C18.1046 21 19 20.1046 19 19V13"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M3 11L10.6713 4.18109C11.429 3.50752 12.571 3.50752 13.3287 4.18109L21 11"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
