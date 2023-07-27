import React, { FC } from 'react';

import Svg, { G, Path } from 'react-native-svg';

type WomanSitProps = {
  width?: number;
  height?: number;
  color?: string;
};
export const WomanSit: FC<WomanSitProps> = ({ width = '179', height = '146' }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 179 146" fill="none">
      <G clipPath="url(#clip0_1428_2293)">
        <Path
          d="M21.0004 138.933L173.527 138.517C173.717 138.516 173.904 138.468 174.07 138.375C174.237 138.283 174.377 138.15 174.478 137.989C177.047 133.898 191.701 106.235 149.193 64.0972C103.061 18.3669 53.8372 17.0615 33.2399 29.5916C13.1455 41.8307 -22.6711 68.5371 20.0321 138.388C20.1332 138.554 20.2755 138.692 20.445 138.787C20.6146 138.882 20.8059 138.932 21.0004 138.933Z"
          fill="white"
        />
        <Path
          d="M173.722 138.517H164.637L149.617 121.472L153.357 146L144.63 143.921L126.343 107.337C126.343 107.337 92.8871 77.6125 33.8716 76.7811L50.2879 35.0003L68.99 34.5845L102.654 79.899L144.837 79.6912L173.722 138.517Z"
          fill="#94C0FF"
        />
        <Path
          d="M78.5488 79.899V77.4047H108.028L127.174 43.7306H151.645L129.335 79.899H78.5488Z"
          fill="#DFE6EF"
        />
        <Path
          d="M105.563 77.4046L100.576 71.1687L81.8737 70.3372L80.311 77.4046H105.563Z"
          fill="#003480"
        />
        <Path
          d="M66.912 1.32618C66.912 1.32618 83.9517 1.32618 78.9645 21.6969C78.9645 21.6969 75.2241 36.6632 61.9248 32.5059C47.8649 28.1116 51.5347 13.3823 51.5347 13.3823C51.5347 13.3823 54.0283 0.494723 66.912 1.32618Z"
          fill="#003480"
        />
        <Path
          d="M66.912 12.9666H79.7957C79.7957 12.9666 79.3801 -1.1682 63.5872 0.0789867C63.5872 0.0789867 52.42 0.494717 50.795 15.3404C50.7273 15.9372 50.4557 16.4923 50.0261 16.9119C48.7793 18.1591 46.2316 21.0692 46.5475 24.1913C46.9631 28.1864 49.8225 29.442 50.7035 32.0901C51.1191 33.3373 50.7825 34.0856 50.7035 35.416C50.6329 36.605 49.8723 38.3261 48.6255 39.5733C46.6556 41.5438 46.1319 49.9665 51.9503 53.2923C51.9503 53.2923 61.0936 59.1126 64.0028 49.9665C64.3756 48.0499 64.4666 46.0892 64.2729 44.1463C64.2195 43.6047 64.2759 43.0578 64.4387 42.5385C64.6015 42.0192 64.8674 41.538 65.2205 41.1239C66.351 39.7687 67.9012 37.636 68.1588 35.8234C68.5038 33.3955 68.5744 31.8366 65.927 28.2571C64.6118 26.4581 63.9984 24.2406 64.2023 22.0212C64.4891 18.8741 67.3276 17.9554 66.912 12.9666Z"
          fill="#80E6FF"
        />
      </G>
    </Svg>
  );
};