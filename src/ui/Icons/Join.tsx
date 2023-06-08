import React, { FC } from 'react';

import Svg, { Path } from 'react-native-svg';

type JoinProps = {
  width?: number;
  height?: number;
};
export const Join: FC<JoinProps> = ({ width = '30', height = '30' }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 30 30" fill="none">
      <Path
        d="M23.75 3.75H6.25C4.8625 3.75 3.75 4.8625 3.75 6.25V11.25H6.25V6.25H23.75V23.75H6.25V18.75H3.75V23.75C3.75 24.413 4.01339 25.0489 4.48223 25.5178C4.95107 25.9866 5.58696 26.25 6.25 26.25H23.75C24.413 26.25 25.0489 25.9866 25.5178 25.5178C25.9866 25.0489 26.25 24.413 26.25 23.75V6.25C26.25 5.58696 25.9866 4.95107 25.5178 4.48223C25.0489 4.01339 24.413 3.75 23.75 3.75ZM12.6 19.475L14.375 21.25L20.625 15L14.375 8.75L12.6 10.5125L15.8375 13.75H3.75V16.25H15.8375L12.6 19.475Z"
        fill="white"
      />
    </Svg>
  );
};
