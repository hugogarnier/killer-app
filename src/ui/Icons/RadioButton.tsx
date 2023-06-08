import React, { FC } from 'react';

import Svg, { Circle, Rect } from 'react-native-svg';

type RadioButtonProps = {
  width?: number;
  height?: number;
  color?: string;
};
export const RadioButton: FC<RadioButtonProps> = ({
  width = '22',
  height = '22',
  color = '#333333',
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 22 22" fill="none">
      <Circle cx="11" cy="11" r="6" fill={color} />
      <Rect x="1" y="1" width="20" height="20" rx="10" stroke={color} />
    </Svg>
  );
};
