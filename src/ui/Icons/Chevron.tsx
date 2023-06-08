import React, { FC } from 'react';

import Svg, { Path } from 'react-native-svg';

type ChevronProps = {
  width?: number;
  height?: number;
  color?: string;
};
export const Chevron: FC<ChevronProps> = ({ width = '24', height = '24', color = '#333333' }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path
        d="M9.5 17L14.2737 12.2263C14.3529 12.1471 14.3925 12.1075 14.4074 12.0618C14.4204 12.0216 14.4204 11.9784 14.4074 11.9382C14.3925 11.8925 14.3529 11.8529 14.2737 11.7737L9.5 7"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </Svg>
  );
};
