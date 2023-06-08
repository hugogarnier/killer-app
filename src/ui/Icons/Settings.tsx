import React, { FC } from 'react';

import Svg, { Circle, Path } from 'react-native-svg';

type SettingsProps = {
  width?: number;
  height?: number;
  color?: string;
};
export const Settings: FC<SettingsProps> = ({ width = '24', height = '24', color = '#333333' }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="2.5" stroke={color} stroke-width="1.5" />
      <Path
        d="M9.10714 3L5.57143 5.17241C7.82143 9.2069 4.92857 9.82759 3 10.1379V14.1724C7.11429 14.4207 6.42857 17.3793 5.57143 18.8276L9.10714 21C11.6786 17.5241 14.0357 19.5517 14.8929 21L18.1071 18.8276C16.3071 14.8552 19.2857 14.069 21 14.1724V10.1379C16.8214 10.1379 17.3571 6.72414 18.1071 5.17241L14.8929 3C12.5786 6.97241 10.0714 4.65517 9.10714 3Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
